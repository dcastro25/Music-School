import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
    pgPool?: Pool;
};

function createPrismaClient() {
    const pool =
        globalForPrisma.pgPool ??
        new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            idleTimeoutMillis: 30_000,
            connectionTimeoutMillis: 10_000,
        });

    pool.on("error", (err) => {
        console.error("[PG_POOL_ERROR]", err);
    });

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.pgPool = pool;
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}