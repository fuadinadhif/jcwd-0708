import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import { isValid, parseISO, endOfDay } from "date-fns";

import { readCashflowFile, writeCashflowFile } from "../utils/cashflow.util.js";
import { Cashflow, CashflowQuery } from "../types/cashflow.type.js";

export async function getAllCashflow(
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
    } = request.query as CashflowQuery;

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

    let cashflow = await readCashflowFile();

    const filteredCashflow = cashflow.filter((item) => {
      const itemDate = new Date(item.date);

      if (startDate && new Date(startDate) > itemDate) return false;
      if (endDate && new Date(endDate) < itemDate) return false;
      if (category && category !== item.category) return false;

      return true;
    });

    const totalItem = filteredCashflow.length;
    const totalPage = Math.ceil(totalItem / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredCashflow.slice(
      startIndex,
      startIndex + pageSize
    );

    response.status(200).json({
      data: paginatedData,
      page: currentPage,
      limit: pageSize,
      totalPage,
      totalItem,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTotalCashflow(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { startDate, endDate, category } = request.query as CashflowQuery;

    if (
      (startDate && !isValid(new Date(startDate))) ||
      (endDate && !isValid(new Date(endDate)))
    ) {
      return response.status(400).json({ message: "Invalid date query" });
    }

    let cashflow = await readCashflowFile();

    const filteredCashflow = cashflow.filter((item) => {
      const itemDate = new Date(item.date);

      if (startDate && new Date(startDate) > itemDate) return false;
      if (endDate && endOfDay(parseISO(endDate)) < itemDate) return false;
      if (category && category !== item.category) return false;

      return true;
    });

    const total = filteredCashflow.reduce((acc, curr) => acc + curr.nominal, 0);

    response.status(200).json({ total, startDate, endDate, category });
  } catch (error) {
    next(error);
  }
}

export async function getCashFlowById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const cashflow = await readCashflowFile();
    const transaction = cashflow.find((item) => item.id === id);

    if (!transaction) {
      return response
        .status(404)
        .json({ message: `Transaction with id: ${id} does not exist` });
    }

    response.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function createCashflow(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { title, nominal, type, category } = request.body;

    if (!title || !nominal || !type || !category) {
      return response.status(400).json({ message: "Missing required fields" });
    }

    const cashflow = await readCashflowFile();
    const newTransaction: Cashflow = {
      id: uuid(),
      title,
      nominal,
      type,
      category,
      date: new Date().toISOString(),
    };

    cashflow.push(newTransaction);
    await writeCashflowFile(cashflow);

    response.status(201).json({
      message: "Successfully created new transaction",
      transaction: newTransaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function editCashflow(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const { title, nominal, type, category } = request.body;

    const cashflow = await readCashflowFile();
    const transactionIndex = cashflow.findIndex((item) => item.id === id);

    if (transactionIndex === -1) {
      return response
        .status(404)
        .json({ message: `Transaction with id: ${id} does not exists` });
    }

    const updatedTransaction: Partial<Cashflow> = {};

    if (title) updatedTransaction.title = title;
    if (nominal) updatedTransaction.nominal = nominal;
    if (type) updatedTransaction.type = type;
    if (category) updatedTransaction.category = category;

    cashflow[transactionIndex] = {
      ...cashflow[transactionIndex],
      ...updatedTransaction,
    };

    await writeCashflowFile(cashflow);

    response.status(200).json({
      message: "Successfully edit transaction",
      transaction: cashflow[transactionIndex],
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllCashflow(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await writeCashflowFile([]);
    response.status(200).json({ message: "Successfully delete all cashflow" });
  } catch (error) {
    next(error);
  }
}

export async function deleteCashflowById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;

    const cashflow = await readCashflowFile();
    const remainingCashflow = cashflow.filter((item) => item.id !== id);

    if (cashflow.length === remainingCashflow.length) {
      return response
        .status(404)
        .json({ message: `Transaction with id: ${id} does not exist` });
    }

    await writeCashflowFile(remainingCashflow);

    response.status(200).json({ message: "Successfully deleted transaction" });
  } catch (error) {
    next(error);
  }
}
