import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {

  if (!process.env.SERVICE_PASSWORD || !process.env.PASS_SALT) {
    throw new Error("Problem with Password.");
  }

  const user = await prisma.superUser.create({
    data: {
      type: "Admin",
      password: await bcrypt.hash(
        process.env.SERVICE_PASSWORD.trim(),
        parseInt(process.env.PASS_SALT.trim())
      ),
    },
  });

  console.log(user);
}

main()
    .catch((err) => {
        console.log(err.message)
    })
    .finally(() =>
        prisma.$disconnect()
    )