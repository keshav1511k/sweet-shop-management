require("dotenv").config();

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleSweets = [
  { name: "Kaju Katli", category: "Premium Box", price: 420, quantity: 20 },
  { name: "Gulab Jamun", category: "Classic Favorites", price: 260, quantity: 30 },
  { name: "Motichoor Ladoo", category: "Festival Specials", price: 320, quantity: 24 },
  { name: "Rasgulla", category: "Bengali Delights", price: 280, quantity: 18 },
  { name: "Milk Cake", category: "Traditional Bites", price: 350, quantity: 16 },
];

async function seedAdminUser() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const adminName = process.env.SEED_ADMIN_NAME || "Sweet Shop Admin";

  if (!adminEmail || !adminPassword) {
    console.log("Skipping admin seed: SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set.");
    return;
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`Admin user already exists for ${adminEmail}.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${adminEmail}`);
}

async function seedSampleSweets() {
  const sweetCount = await prisma.sweet.count();

  if (sweetCount > 0) {
    console.log("Skipping sweet seed: sweets already exist.");
    return;
  }

  await prisma.sweet.createMany({ data: sampleSweets });
  console.log(`Seeded ${sampleSweets.length} sample sweets.`);
}

async function main() {
  await seedAdminUser();
  await seedSampleSweets();
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
