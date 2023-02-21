const dd=require('./sample_data/performance.json');
const cf=require('./services/codeforcesService.js');
const sorting=require('./services/sorting.js');
    
    const data= sorting.sortRes(dd.data);

    const fs= require('fs');
    const path = require('path')
    let file_path = "/Practice/";
    let file_name = "result.json";

    fs.writeFileSync( path.join(__dirname,'/sample_data/', file_name) , JSON.stringify(data));
    //console.log(output);

    cf.findingResult("Rajshahi University of Engineering and Technology");



