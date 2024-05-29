


export const apiConfig = {
    url:import.meta.env.DEV?'http://localhost:3001':'https://eccomersserivce.onrender.com',
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