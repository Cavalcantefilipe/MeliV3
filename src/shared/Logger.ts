import { appendFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

export class Logger {
  private static instance: Logger | undefined;
  private readonly logDir: string;
  private readonly logFile: string;

  private constructor() {
    const root = process.cwd();
    this.logDir = path.resolve(root, "logs");
    this.logFile = path.resolve(this.logDir, "app.log");
  }

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  private async ensureLogDir() {
    try {
      await stat(this.logDir);
    } catch {
      await mkdir(this.logDir, { recursive: true });
    }
  }

  async log(message: string) {
    const ts = new Date().toISOString();
    const line = `[${ts}] ${message}\n`;
    await this.ensureLogDir();
    await appendFile(this.logFile, line, "utf-8");
  }

  getLogFilePath() {
    return this.logFile;
  }
}


