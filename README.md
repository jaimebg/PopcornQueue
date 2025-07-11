# PopcornQueue 🍿

PopcornQueue is a **React Native** mobile application that displays the most popular movies of the moment according to [The Movie Database (TMDb)](https://www.themoviedb.org/ "null").

## 🖼️ Screenshots
![Home](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Home.png "Home") ![Details](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details.png "Details")![Details 2](https://github.com/jaimebg/PopcornQueue/raw/main/screenshots/Details2.png "Details 2")


## 🛠️ Technical Decisions Made

This project was built with a focus on simplicity, efficiency and a modern development experience.

- **State Management:** The React `useState` hook was implemented to manage the local state of components. For an application of this scale, it is a lightweight and efficient solution without the need for external libraries such as Redux.
    
- **Styles:** I used **flat CSS** with a modular structure. Each component has its own `.css` file, which keeps styles organized and avoids conflicts.

- **Validation:** **Zod** was used to validate the data received from TMDB, making it easy to catch errors.
    
- **External API:** All movie and series information is obtained from **API of The Movie Database (TMDb)**.
    

## 🚀 Installation and Local Usage Instructions.

1.  **Clone the repository:**
    
    ```
    git clone https://github.com/jaimebg/PopcornQueue.git
    cd PopcornQueue
    
    ```
    
2.  **Install the dependencies:** The project uses ``npm` to manage the packages.
    
    ```
 	npm install
    
    ```
3.  **Install cocoapods:** In order to compile the iOS version you need to do this.

	```
	cd ios
	pod install

	```
    
4.  **Set the environment variables:** You will need an API Key from The Movie Database. Create an `.env` file in the root of your project. Add your API Key to the file as follows:
    
    ```
    TMDB_API_KEY = "eyJhb..."
    ```
    
5.  **Run the project:**
    
    ```
    npm run ios
    npm run android
    ```
