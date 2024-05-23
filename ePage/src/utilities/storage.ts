

export const storageLogin = {
    save:(token:string)=>{
        localStorage.thelog = token;
    },
    read:():string=>{
        if(!localStorage.thelog){
            localStorage.thelog = '';
        }
        return localStorage.thelog;
    }
}