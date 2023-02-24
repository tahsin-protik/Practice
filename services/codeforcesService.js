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
const axios = require('axios');
// const sorting:any =require('./sorting.ts');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function userFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //const response:any = await axios.get("https://codeforces.com/api/user.ratedList?activeOnly=false&includeRetired=false");
            //const result:any = response.data;
            const result = yield prisma.userTable.findMany();
            //console.log(result);
            return result;
        }
        catch (err) {
            console.log("fuck error\n");
            return [];
        }
    });
}
// async function filtering(data : any,org : any){
//     let i,sz=data.length;
//     const result=[];
//     for(i=0;i<sz;i++){
//         if(data[i].organization==org) result.push(data[i]);
//     }
//     return result;
// }
// async function findingResult(org : String){
//     const result= await userFetch();
// const data = await filtering(result,org);
// For data save...
// const fs:any= require('fs');
// const path:any = require('path')
// let file_name:String = "userdata.json";
// fs.writeFileSync( path.join(__dirname,`../sample_data/`, file_name) , JSON.stringify(data));
// let i,n=data.length;
// for(let i in data){
//     try{
//     await prisma.userTable.create({
//         data: {
//           handle: data[i].handle,
//           organization: data[i].organization,
//           fullName: data[i].firstName+' '+data[i].lastName
//         }
//     })
//     }
//     catch(err:any){
//         console.log(err,data[i].handle);
//     }
// }
//     return data;
// }
//Task no 2...
function findMatch(data, org) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield userFetch(org);
        let i, j, u_sz = users.length, d_sz = data.data.result.rows.length;
        console.log(d_sz, u_sz);
        const res = [];
        for (i = 0; i < u_sz; i++) {
            for (j = 0; j < d_sz; j++) {
                if (users[i].handle == data.data.result.rows[j].party.members[0].handle) {
                    let counter = 0;
                    for (let y of data.data.result.rows[j].problemResults) {
                        if (y.points != 0)
                            counter++;
                    }
                    let c = {
                        handle: data.data.result.rows[j].party.members[0].handle,
                        rank: data.data.result.rows[j].rank,
                        //solve_count: data.data.result.rows[j].problemResults.length,
                        solve_count: counter,
                        penalty: data.data.result.rows[j].penalty
                    };
                    res.push(c);
                }
            }
        }
        return res;
    });
}
function createRank(contestNo, org) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield axios.get('https://codeforces.com/api/contest.standings?contestId=' + contestNo + '&from=1');
        const res = yield findMatch(result, org);
        console.log(res);
        // To save data...
        let i, n = res.length;
        for (i = 0; i < n; i++) {
            yield prisma.RankList.create({
                data: {
                    handle: res[i].handle,
                    rank: res[i].rank,
                    solve_count: res[i].solve_count,
                    penalty: res[i].penalty,
                    contest_id: contestNo
                },
            });
            //console.log(res[i].handle+' '+res[i].solve_count+' '+contestNo);
        }
    });
}
function getAlluser() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.RankList.findMany();
        //console.log(users);
        const flag = {};
        const solve = {};
        const penalty = {};
        const store = [];
        for (let x of users) {
            //console.log(x);
            //console.log(x.handle+' '+x.contest_id+' '+solve.has(x.handle));
            if (flag[x.handle]) {
                let y = solve[x.handle];
                //console.log(y);
                solve[x.handle] = x.solve_count + y;
                //let xx=x.solve+y;
                //console.log(x.handle+' '+xx);
                y = penalty[x.handle];
                penalty[x.handle] = x.penalty + y;
            }
            else {
                store.push(x.handle);
                flag[x.handle] = true;
                solve[x.handle] = x.solve_count;
                penalty[x.handle] = x.penalty;
            }
        }
        const answer = [];
        for (let x of store) {
            const temp = {
                handle: x,
                solve_count: solve[x],
                penalty: penalty[x]
            };
            answer.push(temp);
        }
        console.log(answer);
        //console.log(answer);
        // for(let key:String of solve.keys()){
        //     console.log(key);
        //     // const temp={
        //     //     handle: key,
        //     //     solve_count: solve.get(key),
        //     //     penalty: penalty.get(key)
        //     // }
        //     // answer.push(temp);
        // }
        //console.log(answer);
        // const fs:any= require('fs');
        // const path:any = require('path')
        // let file_name:String = "combineRankList.json";
        // fs.writeFileSync( path.join(__dirname,`../sample_data/`, file_name) , JSON.stringify(answer));
    });
}
function combineRank(arr, org) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(arr);
        //await prisma.RankList.deleteMany({});
        for (let x of arr) {
            //console.log(x);
            const y = yield prisma.RankList.findMany({
                where: {
                    contest_id: x,
                },
            });
            if (y.length == 0) {
                yield createRank(x, org);
            }
        }
        getAlluser();
    });
}
module.exports = { userFetch, createRank, findMatch, combineRank, getAlluser };
