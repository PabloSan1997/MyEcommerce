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
    async addCategory(token:string, category:AddCategory){
        const ft = await fetch(`${apiConfig.url}/api/category`, {
            method:'POST',
            headers:{
                ...apiConfig.contentTypeAuth(token)
            },
            body:JSON.stringify(category)
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async deleteCategory(token:string, id:number):Promise<CaterogyResponse[]>{
        const ft = await fetch(`${apiConfig.url}/api/category/${id}`, {
            method:'DELETE',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return this.readCategories(token);
        throw await ft.json();
    }
    async editCategory(token:string, id:number, data:AddCategory):Promise<Category[]>{
        const ft = await fetch(`${apiConfig.url}/api/category/${id}`, {
            method:'PUT',
            headers:{
                ...apiConfig.contentTypeAuth(token)
            },
            body:JSON.stringify(data)
        });
        if(ft.ok) return this.readCategories(token);
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
    async addProduct(token:string, data:AddProduct):Promise<OneProduct>{
        const ft = await fetch(`${apiConfig.url}/api/product`,{
            method:'POST',
            headers:{
                ...apiConfig.contentTypeAuth(token)
            },
            body:JSON.stringify(data)
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async putProduct(token:string, id:number, data:PutProduct):Promise<OneProduct>{
        const ft = await fetch(`${apiConfig.url}/api/product/${id}`,{
            method:'PUT',
            headers:{
                ...apiConfig.contentTypeAuth(token)
            },
            body:JSON.stringify(data)
        });
        if(ft.ok) return ft.json();
        throw await ft.json();
    }
    async deleteProduct(token:string, id:number):Promise<void>{
        const ft = await fetch(`${apiConfig.url}/api/product/${id}`,{
            method:'DELETE',
            headers:{
                ...apiConfig.contentAuth(token)
            }
        });
        if(ft.ok) return;
        throw await ft.json();
    }
}