/// <reference types="vite/client" />

type InitialSateHome = {
    token: string,
    userInfo: {
        eamil: string,
        name: string
    }
    categories:CaterogyResponse[],
    products:ProductResponse[],
    oneCategory:OneCategoryResponse,
    oneProduct:OneProduct
}

type InitialStateFomrs = {
    login:LoginRequest,
    register:Register,
    carrito:PostCarrito,
    pCarrito:{
        total:number
    },
    category:AddCategory,
    product: AddProduct,
    putProduct:PutProduct,
    message:string
}

//------USER-------

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResposne {
    username: string;
    token: string;
}

interface Register {
    email: string;
    password: string;
    name: string;
}

interface RegisterResponse {
    id: number;
    email: string;
    name: string;
    enable: boolean;
    createAt: string;
    updateAt: string;
    roles: Role[];
}

interface Role {
    id: number;
    name: string;
}

interface ErrorDto {
    statusCode: number;
    error: string;
    message: string;
    date: number;
}


//----------Category------

interface CaterogyResponse {
    id: number;
    name: string;
    urlImage: string;
}

interface OneCategoryResponse {
    id: number;
    name: string;
    urlImage: string;
    products: CategoryProduct[];
}

interface AddCategory {
    name: string,
    urlImage: string
}

interface CategoryProduct {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    urlImage: string;
    createAt: Date;
}

interface Category {
    id: number;
    name: string;
    urlImage: string;
}

//-----Products---------
interface ProductResponse extends CategoryProduct {
    category: string;
}

interface AddProduct {
    name: string;
    price: number;
    urlImage: string;
    description: string;
    specifications: string;
    imagenes: string[];
    category: string;
}

interface PutProduct extends AddProduct {
    inStock: boolean;
}

interface OneProduct {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    urlImage: string;
    createAt: string;
    updateAt: string;
    category: Category;
    productDescription: ProductDescription;
}


interface ProductDescription {
    id: number;
    description: string;
    specifications: string;
    imagenes: string[];
    updateAt: string;
}

interface PostCarrito{
    total:number,
	productId:number
}