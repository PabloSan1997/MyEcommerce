# Servicio

En esta sección se encuentran los archivos y codigo para el funcionamiento del servidor de la aplicación

## Tecnologías

- **Lenguaje:**  Java
- **Framework:** Spring boot, Spring Security, Spring Data JPA, Postgres Driver, MySql Driver,  io.jsonwebtoken
- **Base de datos:** Posgresql, MySql
- **Entorno**: Openjdk 21
- **Herramientas:** Docker compose
- **Producción:** [Render.com](https://render.com/ "Render.com")

## Datos y relaciones

[![Tablas](../capturas/tablas.png "Tablas")](../tables.txt "Tablas")

## Soliditudes

### Crear roles

Crea los roles y el usuario administrador en la base de datos si no existen.

#### Ruta

```http
GET /api/user/roles
```

#### Respuesta


```json
{
	"message": "Operacion exitosa"
}
```

### Login

Authentica un usuario y crea su token;

#### Ruta

```http
POST /login
```

#### Headers

```json
{
    "Content-Type":"application/json"
}
```


#### Cuerpo

```json
{
	"email":"string",
	"password":"string"
}
```

#### Respuesta 

```json
{
	"email": "string",
	"nickname": "string",
	"token": "string"
}
```


### Registar

Registrar un nuevo usuario

#### Ruta

```http
POST /api/user/register
```

#### Headers

```json
{
    "Content-Type":"application/json"
}
```


#### Cuerpo

```json
{
	"email":"string",
    "nickname":"string",
	"password":"string"
}
```

#### Respuesta 

```json
{
	"id": "number",
	"email": "string",
	"name": "string",
	"enable": "boolean",
	"createAt": "string",
	"updateAt": "string",
	"roles": [
		{
			"id": "number",
			"name": "USER"
		}
	]
}
```

### Checar Admin

Saber si un usuario es administrador.

#### Ruta

```http
GET /api/user/view
```

#### Role

`USER`

#### Headers

```json
{
    "Authorization":"Bearer (token)"
}
```

#### Respuesta

```json
{
    "isAdmin":"boolean"
}
```

### Obtener informacion

Obtener la informacion de un usuario con el token

#### Ruta

```http
GET /api/user/info
```

#### Role

`USER`

#### Headers

```json
{
    "Authorization":"Bearer (token)"
}
```

#### Respuesta

```json
{
	"eamil": "string",
	"name": "string"
}
```


### Agragar Categoía

Agregar una categoría nueva

#### Ruta

```http
POST /api/category
```

#### Role

`ADMIN`

#### Headers

```json
{
    "Content-Type":"application/json",
    "Authorization": "Bearer (token)"
}
```

#### Cuerpo

```json
{
	"name":"string",
	"urlImage":"string"
}
```

#### Respuesta

```json
{
	"id": "number",
	"name": "string",
	"urlImage": "string",
	"products": null
}
```

### Editar Categoria

Borra categoria existente junto con todos sus productos relacionados
#### Ruta

```http
PUT /api/category/{id}
```

#### Role

`ADMIN`

#### Headers

```json
{
    "Content-Type":"application/json",
    "Authorization": "Bearer (token)"
}
```

#### Cuerpo

```json
{
	"name":"string",
	"urlImage":"string"
}
```

#### Respuesta

```json
{
	"id": "number",
	"name": "string",
	"urlImage": "string"
}
```

#### Borrar Categoria

Borra Categoria existente junto a todos sus productos relacionados

#### Ruta

```http
DELETE /api/category/{id}
```

#### Role

`ADMIN`

#### Headers

```json
{
    "Authorization": "Bearer (token)"
}
```


#### Respuesta

`204 No Conent`

### Obtener categorias

Obtener la lista de categorias

#### Rutas

```http
GET /api/category
```

#### Role

`USER`

#### Headers

```json
{
    "Authorization": "Bearer (token)"
}
```

#### Respuesta

```json
[
    {
		"id": "number",
		"name": "string",
		"urlImage": "string"
	}
]
```

### Obtener una categoria

Obtener una sola categoria con sus productos relacionados

#### Rutas

```http
GET /api/category/name?category={name}&page={page}&size={size}
```

#### Headers

```json
{
    "Authorization": "Bearer (token)"
}
```

#### Role

`USER`

#### Respuesta

```json
{
	"id": "number",
	"name": "string",
	"urlImage": "string",
	"products": [
		{
			"id": "number",
			"name": "string",
			"price": "number",
			"inStock": true,
			"urlImage": "string",
			"createAt": "string"
		}
	]
}
```

### Agregar producto

Se agregan nuevos poductos, aunque es necesario que exsista categorias para generar esta solicitud.

Para que la solicitud no salte error, en la propiedad `imagen` tiene que se un array string con solo tres elementos.

#### Ruta

```http
POST /api/product
```

#### Role

`ADMIN`

#### Header

```json
{
    "Content-Type":"application/json",
    "Authorization": "Bearer (token)"
}
```

#### Cuerpo

```json
{
	"name":"string",
	"price":"number",
	"urlImage":"string",
	"description":"string",
	"specifications":"string",
	"imagenes": ["string X3"],
	"category":"Comida"
}
```

#### Respuesta

```json
{
	"id": "number",
	"name": "string",
	"price": "number",
	"inStock": "boolean",
	"urlImage": "sting",
	"createAt": "sting",
	"updateAt": "sting",
	"category": {
		"id": "number",
		"name": "string",
		"urlImage": "string"
	},
	"productDescription": {
		"id": "number",
		"description": "string",
		"specifications": "string",
		"imagenes": [
			"string",
			"string",
			"string"
		],
		"updateAt": "string"
	}
}
```

### Editar Producto

Editar un producto existente.

#### Ruta

```http
PUT /api/product/{id}
```

#### Role

`ADMIN`

#### Headers

```json
{
    "Content-Type":"application/json",
    "Authorization":"Bearer (token)"
}
```

#### Cuerpo

```json
{
	"name":"string",
	"price":"number",
	"urlImage":"string",
	"description":"string",
	"specifications":"string",
	"imagenes": ["string X3"],
	"category":"string",
	"inStock":"boolean"
}
```

#### Respuesta

```json
{
    "id":"number",
	"name":"string",
	"price":"number",
	"urlImage":"string",
	"description":"string",
	"specifications":"string",
	"imagenes": ["string X3"],
	"category":"string",
	"inStock":"boolean"
}
```

### Eliminar Producto

Elimina un producto existente

#### Ruta

```http
DELETE /api/product/{id}
```

#### Role

`ADMIN`

#### Headers

```json
{
    "Authorization":"Bearer (token)"
}
```

#### Respuesta

`204 No Content`

### Obtener Productos

Obtener una lista de productos

#### Ruta

```http
GET /api/product?size={size}&page={page}
```

#### Role

`USER`

#### Headers

```json
{
    "Authorization":"Bearer (token)"
}
```

#### Respuesta

```json
[
	{
		"id": "number",
		"name": "string",
		"price": "number",
		"inStock": "boolean",
		"urlImage": "string",
		"category": "string",
		"createAt": "string"
	}
]
```

### Obtener un Product

Obtener toda la informacion de un solo producto

#### Ruta

```http
GET /api/product/{id}
```

#### Role

`USER`

#### Headers

```json
{
    "Authorization":"Bearer (token)"
}
```

#### Respuesta

```json
{
	"id": "number",
	"name": "string",
	"price": "number",
	"inStock": "boolean",
	"urlImage": "string",
	"createAt": "string",
	"updateAt": "string",
	"category": {
		"id": "number",
		"name": "string",
		"urlImage": "string"
	},
	"productDescription": {
		"id": "number",
		"description": "string",
		"specifications": "string",
		"imagenes": ["string x3"],
		"updateAt": "string"
	}
}
```

### Agregar a carrito

Agregar elemento a la lista de productos que se compraran

#### Ruta

```http
POST /api/user/carrito
```

#### Role

`USER`

#### Headers

```json
{
    "Content-Type":"application/json",
    "Authentication":"Bearer (token)"
}
```

#### Cuerpo

```json
{
    {
	"total":"number",
	"productId":"number"
    }
}

```

#### Respuesta

```json
{
	"id": "number",
	"total": "number",
	"price": "number",
	"createAt": "string",
	"updateAt": "string",
	"totalPrice": "number",
	"products": {
		"id": "number",
		"name": "string",
		"price": "number",
		"inStock": true,
		"urlImage": "string",
		"createAt": "string"
	},
	"user": {
		"id": "number",
		"email": "string",
		"name": "string"
	}
}
```

### Editar Carrito

Cambiar la cantidad de un producto en la lista del carrito

#### Ruta

```http
PATCH /api/user/carrito/{id}
```

#### Role

`USER`

#### Headers

```json
{
    "Content-Type":"application/json",
    "Authentication":"Bearer (token)"
}
```

#### Cuerpo

```json
{
    {
	"total":"number"
    }
}

```

#### Respuesta

```json
{
	"id": "number",
	"total": "number",
	"price": "number",
	"createAt": "string",
	"updateAt": "string",
	"totalPrice": "number",
	"products": {
		"id": "number",
		"name": "string",
		"price": "number",
		"inStock": true,
		"urlImage": "string",
		"createAt": "string"
	},
	"user": {
		"id": "number",
		"email": "string",
		"name": "string"
	}
}
```

### Eliminar Carrito

Eliminar un producto de la lista carrito

#### Ruta

```http
DELETE /api/user/carrito/{id}
```

#### Role

`USER`

#### Headers

```json
{
    "Authentication":"Bearer (token)"
}
```


#### Respuesta

`204 No Content`


### Eliminar Carrito

Obtener la lista del carrito

#### Ruta

```http
GET /api/user/carrito
```

#### Role

`USER`

#### Headers

```json
{
    "Authentication":"Bearer (token)"
}
```


#### Respuesta

```json
{
		"id": "number",
		"total": "number",
		"price": "number",
		"createAt": "string",
		"updateAt": "string",
		"totalPrice": "number",
		"products": {
			"id": "number",
			"name": "string",
			"price": "number",
			"inStock": "boolean",
			"urlImage": "string",
			"createAt": "string"
		},
		"user": {
			"id": "number",
			"email": "string",
			"name": "string"
		}
	}
```

