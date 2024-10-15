# Proyecto: Divirtiéndonos con LoL

## Descripción
Este proyecto es una aplicación web que permite a los usuarios explorar y conocer diferentes campeones del juego League of Legends (LoL). Los usuarios pueden ver información detallada sobre cada campeón, incluyendo su nombre, imagen, origen, recursos, líneas, roles y dificultad de uso.

## Tecnologías Utilizadas
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB, Mongoose

## Estructura del Proyecto
El proyecto está organizado en las siguientes carpetas:

- `public/`: Contiene los archivos estáticos del frontend, incluyendo HTML, CSS y JavaScript.
- `models/`: Contiene los modelos de Mongoose para interactuar con la base de datos.
- `node_api/`: Contiene la lógica del servidor y las rutas de la API.
- `README.md`: Este archivo, que proporciona información sobre el proyecto.

## Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/germanmartini216/api_lol_divirtiendonos.git
   
   cd api_lol_divirtiendonos/node_api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos MongoDB. Asegúrate de tener MongoDB en funcionamiento y actualiza la cadena de conexión en el archivo de configuración.

4. Inicia el servidor:
   ```bash
   npm start
   ```

5. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en funcionamiento.

## Funcionalidades
- **Visualización de Campeones**: Los usuarios pueden ver una lista de campeones con su información básica.
- **Detalles del Campeón**: Al hacer clic en un campeón, se muestra información detallada sobre él.
- **Filtrado de Campeones**: Los usuarios pueden filtrar campeones según diferentes criterios.
