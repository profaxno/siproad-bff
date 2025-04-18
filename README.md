<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# siproad-bff
Api central del sistema siproad que coordina la comunicación hacia las apis admin, products, sales, expenses.

```
- Lenguaje: Nodejs (Nest), typescript.
- Tecnologias: Docker.
```

## Configuración ambiente dev

### Configuración de la api
* Tener Nest CLI instalado ```npm i -g @nestjs/cli```
* Clonar el proyecto.
* Clonar el archivo __.env.template__ y renombrar la copia a ```.env```
* Configurar los valores de las variables de entornos correspondientes ```.env```
* Actualizar node_modules ```npm install```
* Abrir Docker Desktop (configuración del docker se encuentra en el README del repo siproad-admin-api)
* Crear contenedor de api ```docker-compose -p dev-siproad up -d```

## Configuración ambiente stg

### Configuración de la api
* Apuntar el archivo .env a las variables de staging.
* Crear contenedor de api ```docker-compose -p stg-siproad up -d```
