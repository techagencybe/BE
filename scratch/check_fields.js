const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_Vcdr9SEy0WAx@ep-tiny-hat-ancnhhaj.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"
    }
  }
});

async function main() {
  try {
    const study = await prisma.caseStudy.findFirst();
    console.log('Case Study keys:', study ? Object.keys(study) : 'No data');
  } catch (err) {
    console.log('Error:', err.message);
  }
}

main().finally(() => prisma.$disconnect());
