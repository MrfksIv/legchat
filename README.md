# Legendchat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2. It combines expressJS, socket.io and angular to create a simple chatting app with PWA features (save from web as app, caching for offline viewing, push notifications, etc.)

You will need to have installed nodeJS >= 8.9.0 (v10 recommended) as well as npm (Node Package Manager). Instead of plain Javascript, we will use TypeScript for the backend to enable static typing and other OO features (interfaces, abstract classes, etc.)

After you have node and npm installed, install globally the latest angular CLI via:
`npm install -g @angular/cli`

Also global install gulp to automate tasks:
`npm install -g gulp`

Start a new angular project in your current directory:
`ng new [project-name]`

Add Service Worker support to the application:
`ng add @angular/pwa --project [project-name]`

Install server dependencies (package.json was already created via the `ng new` command):
`npm install --save express socket.io @types/express @types/socket.io`

Install development dependencies:
`npm install --save-dev typescript gulp gulp-typescript`

Create the Typescript compiler Configuration:


## Development server

Run `node server` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build and/or `--aot` for ahead-of-time compilation.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


