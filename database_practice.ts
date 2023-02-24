
require('dotenv').config()
const { PrismaClient }:any = require('@prisma/client')
const prisma:any = new PrismaClient()

async function update() {
    const post:any = await prisma.RankList.update({
      where: { Id: 1 },
      data: { handle: 'Abdur_Rahman_Shajib' },
    })
    fetchData()
}

async function fetchData(){
    let data:any = await prisma.RankList.findMany();
    //console.log(data);
}
async function Delete() {
    await prisma.RankList.deleteMany({})
    //     await prisma.RankList.delete({
//     where: {
//       Id: 2
//     }
//   })
}
Delete();

async function main() {
    await prisma.RankList.create({
      data: {
        handle: 'Alice',
        rank: 1,
        solve_count: 7,
        penalty: 1700
      },
    })
    fetchData();  
}
update();