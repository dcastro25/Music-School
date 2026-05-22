import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.course.createMany({
    data: [
      {
        courseName: "Producción Musical",
        category: "produccion",
        description: "Aprende a producir música desde cero",
        price: 200000,
        duration: "3_meses",
        level: "basico",
        slug: "produccion-musical",
      },
      {
        courseName: "Teoría Musical",
        category: "teoria",
        description: "Fundamentos de la música",
        price: 150000,
        duration: "2_meses",
        level: "intermedio",
        slug: "teoria-musical",
      },
    ],
  });

  console.log("✅ Seed completado");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });