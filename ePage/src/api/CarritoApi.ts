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
}
