import { apiConfig } from "./apiConfig";



export class CarritoApi {
    async readCarrito(token: string): Promise<CarritoRespnse[]> {
        const ft = await fetch(`${apiConfig.url}/api/user/carrito`, {
            method: 'GET',
            headers: {
                ...apiConfig.contentAuth(token)
            }
        });
        if (ft.ok) return ft.json();
        throw await ft.json();
    }
    async addCarrito(token: string, carrito: SetCarrito): Promise<CarritoRespnse> {
        const ft = await fetch(`${apiConfig.url}/api/user/carrito`, {
            method: 'POST',
            headers: {
                ...apiConfig.contentTypeAuth(token)
            },
            body: JSON.stringify(carrito)
        });

        if (ft.ok) return ft.json();
        throw await ft.json();
    }
    async editCarrito(token:string, data:PatchCarrito, id:number):Promise<CarritoRespnse>{
        const ft = await fetch(`${apiConfig.url}/api/user/carrito/${id}`, {
            method: 'PATCH',
            headers: {
                ...apiConfig.contentTypeAuth(token)
            },
            body: JSON.stringify(data)
        });

        if (ft.ok) return ft.json();
        throw await ft.json();
    }
    async deleteCarrito(token:string, id:number):Promise<{id:number}>{
        const ft = await fetch(`${apiConfig.url}/api/user/carrito/${id}`, {
            method: 'DELETE',
            headers: {
                ...apiConfig.contentTypeAuth(token)
            }
        });

        if (ft.ok) return {id};
        throw await ft.json();
    }
}
