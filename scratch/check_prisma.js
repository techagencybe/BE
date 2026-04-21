const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Models available in prisma client:');
  console.log(Object.keys(prisma).filter(k => !k.startsWith('_')));
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
