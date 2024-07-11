

export const showTotalProducts = {
    total:12,
     generateArray:(total:number):Array<number>=>{
        const limit = Math.ceil(total/showTotalProducts.total);
        const res = [];
        for(let i=0;i<limit;i++){
            res.push(i);
        }
        return res;
    }
}