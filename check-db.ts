import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.post.findMany()
  const studies = await prisma.caseStudy.findMany()
  
  console.log('--- BLOG POSTS ---')
  console.log(JSON.stringify(posts, null, 2))
  
  console.log('--- CASE STUDIES ---')
  console.log(JSON.stringify(studies, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
