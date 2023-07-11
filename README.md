
# Medront Assignment

A React Native app which uses TMDB Api to fetch movie details and other features to display on the app.

## Features

* **Carousel Effect**
  ![Carousel](https://github.com/Harsh200112/Medront_Assignment/issues/1#issue-1798162970)
* **Like Movies And Cast**
  ![Like Feature](https://github.com/Harsh200112/Medront_Assignment/issues/1#issuecomment-1630201324)
* **Search Movies**
  ![Search Movies](https://github.com/Harsh200112/Medront_Assignment/issues/1#issuecomment-1630201751)
* **Other Features**
  ![Others](https://github.com/Harsh200112/Medront_Assignment/issues/1#issuecomment-1630202780)

## Dependencies

* **"@react-native-async-storage/async-storage": "^1.19.0"**

    This dependency is used to store the favorurite movies and cast to the favourite tab of the application. You can find the implementation of this feature in 'api/ liked.js' of this repository.

    Installation Process:-
    ```bash
    npm install @react-native-async-storage/async-storage
    ```
    For more Details visit:- [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/install/)


* **"@react-navigation/native": "^6.1.7", "@react-navigation/native-stack": "^6.9.13", "react-native-screens": "^3.22.1", "react-native-safe-area-context": "^4.6.4"**

    These four libraries have been used to implement the navigation process of the app to switch between different pages. And also provide a safe area for screen to display the content. You can find its implementation in the 'navigation/ navigation.js' file of this repository.

    Installation Process:-
    ```bash
    npm install @react-navigation/native
    npm install react-native-screens react-native-safe-area-context
    npm install @react-navigation/native-stack
    ```

    For more details visit:- [React Navigation](https://reactnavigation.org/docs/getting-started/)


* **"axios": "^1.4.0"**

    This dependency has been used to fetch the details of different movies and features from the TMDB's API. You can find it's implementation in the 'api/ moviedb.js' file of the repository.

    Installation Process:-
    ```bash
    npm i axios
    ```

    For more details visit:- [Axios](https://www.npmjs.com/package/axios)

* **"lodash": "^4.17.21"**

    This dependency is used to help in the implementation of search feature because on instantaneous change of text input in the search it is hazardous of the axios to fetch the details of the search hence to ease this process I have used the debounce method of this library to add a time delay of 400 msec for the input text to be changed.

    Installation Process:-
    ```bash
    npm i lodash
    ```
* **"nativewind": "^2.0.11"**

    This dependency is used to style different components of the react native application.

    Installation Process:-
    ```bash
    yarn add nativewind
    yarn add --dev tailwindcss
    ```
    After this run the below given command to get the 'tailwind.config.js' file
    ```bash
    npx tailwindcss init
    ```
    and Replace the content of tailwind.config.js file with the below given content:-
    ```bash
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    }
    ```
    After that update the 'babel.config.js' file
    ```bash
    module.exports = {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: ["nativewind/babel"],
    };
    ```

    For More Details Visit:- [Native Wind](https://www.nativewind.dev/quick-starts/react-native-cli)

* **"react": "18.1.0" And "react-native": "0.70.12"**

    These two are the versions of react and react-native that have been used to make this application.
## Usage
    
After You have installed all the above dependencies, inorder to run the application on a android studio virtual device run the below given command in the terminal of the application

```bash
npm run android
```

To Get the debug application:-
```bash
npm run clear
npm run build
```
After running the above commands you will get the debug application in **\android\app\build\outputs\apk\debug** folder of your project.

## Authors

- [Harsh Soni](https://github.com/Harsh200112)
- Email:- soni.18@iitj.ac.in

