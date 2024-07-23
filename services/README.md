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
DELETE /api/category/{id}
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