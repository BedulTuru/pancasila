const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const quiz = await prisma.quiz.findUnique({
    where: { slug: 'kuis-aljabar-linear' },
    include: { questions: { include: { options: true } } }
  });
  console.log(JSON.stringify(quiz, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
