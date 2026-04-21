import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
