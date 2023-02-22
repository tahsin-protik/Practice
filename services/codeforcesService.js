const axios = require('axios');

async function userFetch(){
        const response = await fetch("https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false");
        const result = await response.json();
        return result;
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
    return data;
}

//Task no 2...


async function findMatch(data,org){
    const users= await findingResult(org);
    let i,j,u_sz=users.length,d_sz=data.data.result.rows.length;
    console.log(d_sz, u_sz);
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
    const ranklist= await findMatch(result,org);
    
    // To save data...
    const fs= require('fs');
    const path = require('path')
    let file_name = "updatedRanklist.json";
    fs.writeFileSync( path.join(__dirname,`../sample_data/`, file_name) , JSON.stringify(ranklist));
}
module.exports={userFetch,filtering,findingResult,createRank,findMatch};