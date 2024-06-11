import { storageLogin } from "./storage"

export const initialOneProduct:OneProduct= {
    id: 0,
    name: "",
    price: 0,
    inStock: false,
    urlImage: "",
    createAt: "",
    updateAt: "",
    category: {
        id: 0,
        name: "",
        urlImage: ""
    },
    productDescription: {
        id: 0,
        description: "",
        specifications: "",
        imagenes: [],
        updateAt: ""
    }
}

export const initialCategory: OneCategoryResponse = {
    id: 0,
    name: "",
    urlImage: "",
    products: []
}

export const initialState:InitialSateHome = {
    token: storageLogin.read(),
    userInfo: {
        eamil: "",
        name: ""
    },
    categories: [],
    products: [],
    oneCategory: initialCategory,
    oneProduct: initialOneProduct,
    message: '',
    isAdmin: false,
    carrito: [],
    loading: false
}


//---------------Form inital state--------------

export const initialStateFomrs:InitialStateFomrs = {
    login: {
        email: "",
        password: ""
    },
    register: {
        email: "",
        password: "",
        name: ""
    },
    carrito: {
        total: 0,
        productId: 0
    },
    pCarrito: {
        total: 0
    },
    category: {
        name: "",
        urlImage: ""
    },
    product: {
        name: "",
        price: 0,
        urlImage: "",
        description: "",
        specifications: "",
        category: "",
        image1: "",
        image2: "",
        image3: ""
    },
    putProduct: {
        inStock: false,
        name: "",
        price: 0,
        urlImage: "",
        description: "",
        specifications: "",
        image1: '',
        image2: '',
        category: "",
        image3: ""
    }
}