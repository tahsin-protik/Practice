function sortRes(dd){
    dd.sort(function(a,b){
        if(a.solve>b.solve) return -1;
        if(a.solve<b.solve) return 1;
        if(a.solve==b.solve){
            if(a.penalty<b.penalty) return -1;
            else return 1;
        }
    });
    return dd;
}
module.exports={sortRes};