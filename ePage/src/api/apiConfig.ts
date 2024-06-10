


export const apiConfig = {
    url:import.meta.env.DEV?'http://localhost:3001':'https://ecommerceservice.onrender.com',
    contentHeader:{
        'Content-Type':'application/json'
    },
    contentAuth:(token:string)=>({
        'Authorization':`Bearer ${token}`
    }),
    contentTypeAuth:(token:string)=>({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
    })
}