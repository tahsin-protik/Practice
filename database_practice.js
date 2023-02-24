"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield prisma.RankList.update({
            where: { Id: 1 },
            data: { handle: 'Abdur_Rahman_Shajib' },
        });
        fetchData();
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield prisma.RankList.findMany();
        //console.log(data);
    });
}
function Delete() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.RankList.deleteMany({});
        //     await prisma.RankList.delete({
        //     where: {
        //       Id: 2
        //     }
        //   })
    });
}
Delete();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.RankList.create({
            data: {
                handle: 'Alice',
                rank: 1,
                solve_count: 7,
                penalty: 1700
            },
        });
        fetchData();
    });
}
update();
