// Prisma stub - will be replaced once `npx prisma generate` runs with DATABASE_URL
let prisma: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma: any | undefined };
  prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] });
  if (process.env.NODE_ENV !== "production") (globalThis as any).prisma = prisma;
} catch {
  // mock for build without DB
  prisma = {
    user: { findMany: async () => [], create: async () => ({}) },
    order: { findMany: async () => [], create: async () => ({}) },
    product: { findMany: async () => [] },
  };
}
export { prisma };
export async function ensureDb() {
  if (!process.env.DATABASE_URL) console.warn("[db] DATABASE_URL not set - mock mode");
}
