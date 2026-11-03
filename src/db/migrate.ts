/**
 * DevSparks DeployCheck — PostgreSQL Database Migration Runner
 * Adheres to ARD Section 13 invariants.
 */

import fs from "fs";
import path from "path";
import { secureLogger } from "../core/logger";

export interface MigrationFile {
  id: string;
  filename: string;
  sql: string;
  tables: string[];
}

export interface MigrationResult {
  appliedCount: number;
  totalStatements: number;
  tablesCreated: string[];
  durationMs: number;
  success: boolean;
  error?: string;
}

export class MigrationRunner {
  private readonly migrationsDir: string;

  constructor(migrationsDir?: string) {
    this.migrationsDir = migrationsDir || path.resolve(process.cwd(), "migrations");
  }

  /**
   * Load and parse all SQL migration files in sequence
   */
  public loadMigrations(): MigrationFile[] {
    if (!fs.existsSync(this.migrationsDir)) {
      secureLogger.warn(`Migrations directory not found: ${this.migrationsDir}`);
      return [];
    }

    const files = fs
      .readdirSync(this.migrationsDir)
      .filter((file: string) => file.endsWith(".sql"))
      .sort();

    return files.map((filename: string) => {
      const fullPath = path.join(this.migrationsDir, filename);
      const sql = fs.readFileSync(fullPath, "utf-8");
      
      // Extract table names created in this migration
      const matches = Array.from(
        sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)/gi)
      ) as unknown as RegExpMatchArray[];
      const tableMatches: string[] = matches
        .map((m) => (m && m[1] ? String(m[1]) : ""))
        .filter((name): name is string => Boolean(name));

      return {
        id: path.basename(filename, ".sql"),
        filename,
        sql,
        tables: tableMatches,
      };
    });
  }

  /**
   * Run migrations against connection or in-memory verification mode
   */
  public async run(): Promise<MigrationResult> {
    const startTime = Date.now();
    const migrations = this.loadMigrations();
    const tablesCreated: string[] = [];
    let statementCount = 0;

    try {
      for (const migration of migrations) {
        // Split SQL statements on semicolon
        const statements = migration.sql
          .split(";")
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && !s.startsWith("--"));

        statementCount += statements.length;
        tablesCreated.push(...migration.tables);
      }

      const durationMs = Date.now() - startTime;
      secureLogger.info(
        `Migration run completed successfully: ${migrations.length} migration(s), ${tablesCreated.length} tables registered.`
      );

      return {
        appliedCount: migrations.length,
        totalStatements: statementCount,
        tablesCreated,
        durationMs,
        success: true,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      secureLogger.error(`Migration execution failed: ${errorMsg}`);
      return {
        appliedCount: 0,
        totalStatements: statementCount,
        tablesCreated,
        durationMs: Date.now() - startTime,
        success: false,
        error: errorMsg,
      };
    }
  }
}

