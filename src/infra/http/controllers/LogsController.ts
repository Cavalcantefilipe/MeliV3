import type { Request, Response } from "express";
import { readFile } from "node:fs/promises";
import { Logger } from "../../../shared/logger.js";

export const LogsController = {
  async list(req: Request, res: Response) {
    try {
      const path = Logger.getInstance().getLogFilePath();
      const content = await readFile(path, "utf-8");
      const lines = content.split("\n").filter(Boolean);
      const sortedDesc = lines.reverse();
      res.json({ logs: sortedDesc });
    } catch (e: any) {
      // If file doesn't exist yet, return empty
      res.json({ logs: [] });
    }
  },
};


