import { Request, Response, NextFunction } from "express";
import xss from "xss";

export function sanitize(
  request: Request,
  response: Response,
  next: NextFunction
) {
  function sanitizeObject(object: Record<string, unknown>) {
    if (!object || typeof object !== "object") return;

    for (const key in object) {
      if (typeof object[key] === "string") {
        object[key] = xss(object[key]);
      }
    }
  }

  sanitizeObject(request.body);
  sanitizeObject(request.query);
  sanitizeObject(request.params);

  next();
}

/* ---------------------------------- NOTE ---------------------------------- */
// const obj = { name: "Sule DELET * FROM users;" };
// obj.name = xss(obj.name);
