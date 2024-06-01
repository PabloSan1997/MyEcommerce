import { apiConfig } from "./apiConfig";



export class ProductApi{
    async readCategories(token:string):Promise<CaterogyResponse[]>{
        const ft = await fetch(`${apiConfig.url}/api/category`, {
            method:'GET',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async readOneCategory(token:string, category:string):Promise<OneCategoryResponse>{
        const ft = await fetch(`${apiConfig.url}/api/category/name?category=${category}`, {
            method:'GET',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async readProducts(token:string):Promise<ProductResponse[]>{
        const ft = await fetch(`${apiConfig.url}/api/product`, {
            method:'GET',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async readOneProduct(token:string, id:number):Promise<OneProduct>{
        const ft = await fetch(`${apiConfig.url}/api/product/${id}`, {
            method:'GET',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    
}