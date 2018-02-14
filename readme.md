# Chat Application with Nodejs
This is my first Nodejs application. I like the idea and how fast and clean is the code. I used follwing technologies and libraries for this app:
* node
* express
* socket.io
* mongodb => used mlab for hosting database and mongoose package for coding

## Pre requirements
You need `Nodejs` and `npm` (Node Package Manager) installed in your system.

In order to run the server I am using `nodemon`. You can install it globally with this command:
```
npm install -g nodemon
```

## Installation
* Development 
In order to install the project you need to run the follwing command:
```
npm install
```
* Production
Run this command which exclude the `DEV Dependencies`
```
npm install --production
```
With the --production flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies.

* Result
Run `nodemon ./server.js` in terminal and navigate to `http://localhost:3002` in browser to see the application.

## Testing
For testing, we are going to use `Jasmine` which is part of `Dev Dependencies`. Run follwing command and see the result.
```
npm test
```

Tests don't cover all the project as it was my first node project and very new to Jasmine.