

export const converTime=(data:string):string=>{
    const date = new Date(data);
    return date.toLocaleDateString();
}