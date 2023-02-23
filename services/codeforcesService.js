const axios = require('axios');
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function userFetch(){
    try{
        const response = await axios.get("https://codeforces.com/api/user.ratedList?activeOnly=false&includeRetired=false");
        const result = response.data;
        return result;
    }
    catch(err){
        console.log(err);
    }
        
}

async function filtering(data,org){
    let i,sz=data.result.length;
    const result=[];
    for(i=0;i<sz;i++){
        if(data.result[i].organization==org) result.push(data.result[i]);
    }
    return result;
}

async function findingResult(org){
    const result= await userFetch();
    const data = await filtering(result,org);
    // For data save...
    const fs= require('fs');
    const path = require('path')
    let file_name = "userdata.json";
    fs.writeFileSync( path.join(__dirname,`../sample_data/`, file_name) , JSON.stringify(data));

    let i,n=data.length;

    for(let i in data){
        try{
        await prisma.userTable.create({
            data: {
              handle: data[i].handle,
              organization: data[i].organization,
              fullName: data[i].firstName+' '+data[i].lastName
            }
        })
        }
        catch(err){
            console.log(err,data[i].handle);
        }

    }

    return data;
}

//Task no 2...


async function findMatch(data,org){
    const users= await findingResult(org);
    let i,j,u_sz=users.length,d_sz=data.data.result.rows.length;
    //console.log(d_sz, u_sz);
    const res=[];
    for(i=0;i<u_sz;i++){
        for(j=0;j<d_sz;j++){
            if(users[i].handle==data.data.result.rows[j].party.members[0].handle) {
                let c={
                    handle: data.data.result.rows[j].party.members[0].handle,
                    rank: data.data. result.rows[j].rank,
                    solve_count: data.data.result.rows[j].problemResults.length,
                    penalty: data.data.result.rows[j].penalty
                }
                res.push(c);
            }
        }
    }
    return res;
}

async function createRank(contestNo,org){
    const result = await axios.get('https://codeforces.com/api/contest.standings?contestId='+contestNo+'&from=1');
    const res= await findMatch(result,org);
    
    // To save data...
    let i,n=res.length;
    for(i=0;i<n;i++){
        await prisma.RankList.create({
            data: {
              Id: i+1,
              handle: res[i].handle,
              rank: res[i].rank,
              solve_count: res[i].solve_count,
              penalty: res[i].penalty,
              contest_id: contestNo
            },
        })
    }
}

module.exports={userFetch,filtering,findingResult,createRank,findMatch};