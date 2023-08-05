import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({ data: [{ name: "Style_One", slug: "tech" }, { name: "Love", slug: "love" }] })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });