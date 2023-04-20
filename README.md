# **Example VUE SSR**
 
This is a simple Vue SSR application project that demonstrates how to create a basic Vue application with Server-Side Rendering (SSR). The basic architecture involves webpack to build both backend and frontend clients. Backend is composed of expressjs web server, that renders a Vue SSR application html and injects that into an ejs template. The result is then served as response from server. Once the client finished rendering, it runs the same Vue SSR application, this time on the client, to rehydrate the DOM and hook up all the events for reactivity to work. A couple of webpack loaders (compilers) are added for convenience, ex. sfc and babel. The project can be further evolved by introducing routing and code generation, just like any popular SSR framework would do.

## **Project Setup**

1. Clone this repository to your local machine using the command git clone https://github.com/gvanastasov/example-vue-ssr.git
2. Navigate to the project directory using the command cd vue-ssr-app
3. Install the dependencies using the command npm install

## **Getting Started**

To build the application, use the following command:
```ssh
npm run build
```

To run the application, use the following command:
```ssh
npm run start
```

This command will start the development server and you can access the application at http://localhost:8080.

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.