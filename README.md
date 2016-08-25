# My Private Label

Table of contents
- [Pre-setup](#pre-setup)
  - [Proxy-setup](#proxy-setup)
- [Setup](#setup)
  - [SentryConfig](#sentry-config)
- [Workspace](#workspace)
- [Tools and Testing](#tools-and-testing)
- [Resources](#angular-2-typescript-resources)
- [Known Issues](#known-issues)

## Pre-setup

Before you get started with the frontend project you will probably need to get node installed and you will need to set up your proxy.

### Proxy setup

Go to the start menu and in the search bar search for the following: __Edit environment variables for your account__. Add two new environment variables as follows:

- HTTP_PROXY : http://{USER_ID}:{PASSWORD}@webproxy.sentry.com:80
- HTTPS_PROXY : http://{USER_ID}:{PASSWORD}@webproxy.sentry.com:80

Replace {USER_ID{} with you user id and {PASSWORD} with your LAN password.
Next run the following command to set up the rest of the proxies you'll need: `node proxy_setup.js`

If you need to unset the proxy you can run the following command: `node proxy_setup.js -d`

## Setup

In order to build anything you will first need to run the following command `npm install`. This will install typings after it finishes so you don't have to do it manually.

Once you have installed everything without getting any errors you should be able to build. Run `npm run build:dev` to build the assets. If this runs without any issues then you should be able to run the dev server. Try running `npm run serve`. Go to http://localhost:8888 and you should see the dashboard. You should be able to make changes in the src folder and the app will reload when it's done rebuilding.

There are a few more npm commands set up in the package.json file. You can go in there and check them out and any that you should be added.

### Sentry Config

The sentry.config.json file is provided so that you can have some control over the way the dev server runs. Here's a quick rundown of what properties mean:

- `webpackPort`: the port that the dev server should run on (default is 8888)

- `apiPort`: the port that the backend server is running on so that calls to the backend can be proxied to the backend

- `nodeEnv`: the environment that gets injected into the source javascript. It changes a few things that affect performance on the frontend.

- `apiEnv`: the api environment to point to when making requests.

- `brand`: tells the webpack server what brand to load.

## Workspace

Since this project will only have front end assets you will not need to use an IDE for development. You are welcome to use one but it's kind of overkill for our purposes. Instead, I recommend using one of the following editors:

- __[Atom](https://atom.io/)__ : Developed by Github, it has plenty of awesome plugins, themes, and other customization features. In my opinion, it has everything you would want and more. _(This is my top choice.)_
- __[Visual Studio Code](https://code.visualstudio.com/)__ : Developed by Microsoft (they also develop Typescript), this editor is newer but sticks to the same style as Atom. It's simple and has a lot of functionality and plugins as well.
- __[Sublime Text 3](https://www.sublimetext.com/3)__ : Developed by some guy. It's been one of the most popular editors for the last few years and for good reason. Same as the others, it has a lot of functionality and plugins. One quirk is the annoying prompt you get every 50 or so saves that asks you to buy a license. You can ignore it every time if you want, or you can try to get Sentry to get you a license.
- Notepad.exe : Or you can just use Notepad.exe.

With the exception of Notepad, these editors allow you to take full advantage of Typescript by giving you autocomplete, linting, and code highlighting.

## Tools and Testing

When you are running the dev build or the dev server you have access to some debugging tools that Angular provides. Please refer to [this document](https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md) for more information about what debugging tools they provide and how to use them.

We are using Karma-Webpack in order to keep our server setups consistent. You may find a lot of documentation referring to testing in Angular that uses Systemjs such as [this one](https://medium.com/google-developer-experts/angular-2-unit-testing-with-jasmine-defe20421584#.4lh72t3ng). The general content about how to write tests will work but there might be some extra setup required to run the tests.

## Angular 2/Typescript Resources

Here's a list of useful resources related to Angular 2 and Typescript

- In order to keep code consistent and clean please refer to the official  [Angular 2 Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
- The [Angular 2 cheatsheat](https://angular.io/docs/ts/latest/guide/cheatsheet.html) is your friend.

## Known issues

IE9 and older don't support the History API. This would be fine if Angular's router also had a fallback to full page turns. It seems that as of rc-4 their fallback solution is to actually switch to hash routing. However, it is only updating the location to use paths but is then failing to parse the hash locationn and therefore directing to the NotFoundComponent. For now just avoid developing in IE9 mode.


## Acknowledgements

Here's a list of projects/resources that were used to write this project.

- https://github.com/AngularClass/angular2-webpack-starter
- https://github.com/angular/angular2-seed
