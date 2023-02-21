async function userFetch(){
        const response = await fetch("https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false");
        const result = await response.json();
        return result;
}
   // userFetch();
    //console.log(result);

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
    //console.log(result.result[typeof(result));
    const data = await filtering(result,org);
    //console.log(data);
    // For data save...
    const fs= require('fs');
    const path = require('path')
    let file_name = "userdata.json";
    fs.writeFileSync( path.join(__dirname,`../sample_data/`, file_name) , JSON.stringify(data));
}
module.exports={userFetch,filtering,findingResult};