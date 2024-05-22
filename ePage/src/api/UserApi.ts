import { apiConfig } from "./apiConfig";



export class UserApi{
    async login(data:LoginRequest):Promise<LoginResposne>{
        const ft = await fetch(apiConfig.url, {
            method:'POST',
            headers:{
                ...apiConfig.contentHeader
            },
            body:JSON.stringify(data)
        });
        if(!ft.ok) {
            throw await ft.json();
        }
        return ft.json();
    }
    async register(data:Register):Promise<LoginResposne>{
        const ft = await fetch(apiConfig.url, {
            method:'POST',
            headers:{
                ...apiConfig.contentHeader
            },
            body:JSON.stringify(data)
        });
        if(!ft.ok) {
            throw await ft.json();
        }
        const response = await ft.json() as RegisterResponse;
        const gLogin:LoginRequest = {
            email:response.email,
            password:data.password
        }
        return this.login(gLogin);
    }
}