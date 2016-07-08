# webpack-es6-template

## 简介

简单的一个webpack es6模板，用来运行es6代码

## package.json

    {
        "name": "webpack-es6",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "dev": "webpack --watch",
            "server": "webpack-dev-server --inline --hot --color --port 8082"
        },
        "author": "",
        "license": "ISC",
        "devDependencies": {
            "babel-core": "^6.10.4",
            "babel-loader": "^6.2.4",
            "babel-polyfill": "^6.9.1",
            "babel-preset-es2015": "^6.9.0",
            "babel-preset-stage-0": "^6.5.0",
            "webpack": "^1.13.1",
            "webpack-dev-server": "^1.14.1"
        }
    }


## 使用说明

    git clone https://github.com/bear-front-end/webpack-es6-template.git

    cd webpack-es6-template

    npm install

    npm run server or npm run dev
