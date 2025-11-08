import 'dotenv/config'; // <-- load .env variables first
import { PrismaClient } from "../src/generated/prisma/client";
const prisma = new PrismaClient();


async function main() {
  console.log("🌱 Seeding Status data...");

  const statuses = [
    { statusName: "Pending" },
    { statusName: "Ongoing" },
    { statusName: "Completed" },
    { statusName: "Cancelled" },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { statusName: status.statusName },
      update: {},
      create: status,
    });
  }

  console.log("✅ Status seeding complete!");

  const arenas = [
    { arenaName: "A" },
    { arenaName: "B" },
    { arenaName: "C" },
    { arenaName: "D" },
  ];

  for (const arena of arenas) {
    await prisma.arena.upsert({
      where: { arenaName: arena.arenaName },
      update: {},
      create: arena,
    });
  }

  console.log("✅ Arena seeding complete!");

  const teams = [
    { teamName: "Team A" },
    { teamName: "Team B" },
    { teamName: "Team C" },
    { teamName: "Team D" },
  ];

  for (const team of teams) {
    await prisma.team.upsert({
      where: { teamName: team.teamName },
      update: {},
      create: team,
    });
  }

  console.log("✅ Team seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
