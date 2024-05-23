


export const apiConfig = {
    url:'http://localhost:3001',
    contentHeader:{
        'Content-Type':'application/json'
    },
    contentAuth:(token:string)=>({
        'Authorization':`Bearer ${token}`
    }),
    contentTypeAuth:(token:string)=>({
        'Conent-Type':'application/json',
        'Authorization':`Bearer ${token}`
    })
}