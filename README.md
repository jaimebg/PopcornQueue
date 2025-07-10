
# PopcornQueue 🍿

PopcornQueue es una aplicación móvil que muestra las películas más populares del momento según [The Movie Database (TMDb)](https://www.themoviedb.org/ "null").

## 🖼️ Capturas de Pantalla
![Home](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Home.png "Home")  ![Details](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details.png "Details")![Details 2](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details2.png "Details 2")


## 🛠️ Decisiones Técnicas Tomadas

Este proyecto fue construido con un enfoque en la simplicidad, la eficiencia y una experiencia de desarrollo moderna.

-   **Gestión del Estado:** Se implementó el hook `useState` de React para gestionar el estado local de los componentes. Para una aplicación de esta escala, es una solución ligera y eficaz sin necesidad de librerías externas como Redux.
    
-   **Estilos:** Se utilizó **CSS plano** con una estructura modular. Cada componente tiene su propio archivo `.css`, lo que mantiene los estilos organizados y evita conflictos.

-   **Validación:** Para validar los datos recibidos de TMDB se utilizó **Zod**, facilitando así la captura de errores.
    
-   **API Externa:** Toda la información de las películas y series se obtiene de la **API de The Movie Database (TMDb)**.
    

## 🚀 Instrucciones de Instalación y Uso Local

1.  **Clona el repositorio:**
    
    ```
    git clone https://github.com/jaimebg/PopcornQueue.git
    cd PopcornQueue
    
    ```
    
2.  **Instala las dependencias:** El proyecto utiliza `npm` para gestionar los paquetes.
    
    ```
    npm install
    
    ```
3.  **Instala cocoapods:** Para poder compilar la versión de iOS es necesario hacer esto.

	```
	cd ios
	pod install

	```
    
4.  **Configura las variables de entorno:** Necesitarás una API Key de The Movie Database. Crea un archivo `.env` en la raíz del proyecto. Añade tu API Key al archivo de la siguiente manera:
    
    ```
    TMDB_API_KEY = "eyJhb..."
    ```
    
5.  **Ejecuta el proyecto:**
    
    ```
    npm run ios
    npm run android
    ```
    