# README.md

Restify and sequelize REST API sample.

## Installation

```bash
npm install
```

## Direct dependencies

* restify
* joi
* lodash
* mysql
* econsole
* sequelize

## Configuration

The main configuration file is *config.json* located inside the application root directory.

## Running

```bash
npm start
```

## Implementation notes and conventions used

### Modules

The application is composed by a collection of modules. Each module is meant to encapsulate a resource.
Modules are mostly an association of models, services, controllers and validation rules.

### Endpoints and controllers

Each module probably will expose many endpoints. Those endpoints and their validators are automatically mapped to the server at startup time following a simple convention:

http method		| restify verb	| controller method name
----------------|---------------|-----------------------
POST			| post			| create
PUT				| put			| update
DELETE			| del			| delete
GET	(single)	| get			| get
GET (many)		| get			| list

GET operation can provide a resource id. PUT and DELETE operations ALWAYS use a resource id. In other words no bulk update or delete operations are supported.
Currently list -or GET many- operations are the only ones supporting "querystring filtering".
See *lib/sequelizeQueryMiddleware.js* for details on this.

### Models

Models are loaded at application startup time before the rest of the module's components. To be automatically loaded a model filename *must* end in *Model.js*. See *lib/db.js* for more info on this.
