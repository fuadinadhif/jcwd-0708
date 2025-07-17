import { Request, Response, NextFunction } from "express";
import { isValid, parseISO, endOfDay } from "date-fns";

import pool from "../configs/db.config.js";
import { Transaction, TransactionQuery } from "../types/transaction.js";

export async function getAllTransactions(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const {
      startDate,
      endDate,
      category,
      page = "1",
      limit = "2",
    } = request.query as TransactionQuery;

    if (
      (startDate && !isValid(new Date(startDate))) ||
      (endDate && !isValid(new Date(endDate)))
    ) {
      return response.status(400).json({ message: "Invalid date query" });
    }

    const currentPage = parseInt(page);
    const pageSize = parseInt(limit);

    if (isNaN(currentPage) || isNaN(pageSize)) {
      return response
        .status(400)
        .json({ message: "Invalid pagination parameters" });
    }

    const values = [];
    let whereClause = "WHERE 1=1";
    let valuesIndex = 1;

    if (startDate) {
      whereClause += ` AND created_at >= $${valuesIndex++}`;
      values.push(startDate);
    }

    if (endDate) {
      whereClause += ` AND created_at <= $${valuesIndex++}`;
      values.push(endDate);
    }

    if (category) {
      whereClause += ` AND category = $${valuesIndex++}`;
      values.push(category);
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM transactions ${whereClause}`,
      values
    );
    const totalItem = parseInt(countResult.rows[0].count);
    const totalPage = Math.ceil(totalItem / pageSize);
    const offset = (currentPage - 1) * pageSize;

    values.push(pageSize, offset);

    const result = await pool.query(
      `SELECT * FROM transactions
      ${whereClause}
      LIMIT $${valuesIndex++} OFFSET $${valuesIndex}
      `,
      values
    );
    let transactions = result.rows;

    response.status(200).json({
      data: transactions,
      page: currentPage,
      limit: pageSize,
      totalPage,
      totalItem,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTotalTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { startDate, endDate, category } = request.query as TransactionQuery;

    if (
      (startDate && !isValid(new Date(startDate))) ||
      (endDate && !isValid(new Date(endDate)))
    ) {
      return response.status(400).json({ message: "Invalid date query" });
    }

    const values = [];
    let whereClause = "WHERE 1=1";
    let valuesIndex = 1;

    if (startDate) {
      whereClause += ` AND created_at >= $${valuesIndex++}`;
      values.push(startDate);
    }

    if (endDate) {
      whereClause += ` AND created_at <= $${valuesIndex++}`;
      values.push(endDate);
    }

    if (category) {
      whereClause += ` AND category = $${valuesIndex++}`;
      values.push(category);
    }

    const total = await pool.query(
      `SELECT SUM(nominal) FROM transactions ${whereClause}`,
      values
    );

    response.status(200).json({
      total: total.rows[0].sum,
      startDate,
      endDate,
      category: category || "all",
    });
  } catch (error) {
    next(error);
  }
}

export async function getTransactionById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const transaction = await pool.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [id]
    );

    if (!transaction) {
      return response
        .status(404)
        .json({ message: `Transaction with id: ${id} does not exist` });
    }

    response.status(200).json(transaction.rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, nominal, type, category } = request.body;

    if (!title || !nominal || !type || !category) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    const newTransaction = await pool.query(
      `INSERT INTO transactions (title, nominal, type, category)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, nominal, type, category]
    );

    response.status(201).json({
      message: "Successfully created new transaction",
      transaction: newTransaction.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function editTransaction(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const { title, nominal, type, category } = request.body;

    const fields = [];
    let values = [];
    let valuesIndex = 1;

    if (title) {
      fields.push(`title = $${valuesIndex++}`);
      values.push(title);
    }
    if (nominal) {
      fields.push(`nominal = $${valuesIndex++}`);
      values.push(nominal);
    }
    if (type) {
      fields.push(`type = $${valuesIndex++}`);
      values.push(type);
    }
    if (category) {
      fields.push(`category = $${valuesIndex++}`);
      values.push(category);
    }

    values.push(id);

    const transaction = await pool.query(
      `
      UPDATE transactions
      SET ${fields.join(", ")}
      WHERE id = $${valuesIndex}
      RETURNING *
      `,
      values
    );

    response.status(200).json({
      message: "Successfully edit transaction",
      transaction: transaction.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllTransactions(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await pool.query(`DELETE FROM transactions`);
    response.status(200).json({ message: "Successfully delete all cashflow" });
  } catch (error) {
    next(error);
  }
}

export async function deleteTransactionById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const result = await pool.query(
      `DELETE FROM transactions WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return response
        .status(404)
        .json({ message: `Transaction with id: ${id} does not exist` });
    }

    response.status(200).json({ message: "Successfully deleted transaction" });
  } catch (error) {
    next(error);
  }
}
