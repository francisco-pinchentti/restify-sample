# README.md

A restify + sequelizejs REST API sample/project seed

## Installation

```bash
npm install
```

### external dependencies

* mysql (dev using MariaDB 10)

### npm dependencies

* restify
* joi
* lodash
* bluebird
* sequelizejs
* econsole
* passport-jwt
* jwt
* cli-table

## Configuration

The main configuration file is *config.json* located inside the application root directory.

## Running

```bash
npm start
```

### Debugging

```bash
npm run debug
```

## Implementation notes and conventions used

### Modules

The application is composed by a collection of modules. Each module is meant to encapsulate a resource.
Modules are mostly an association of models, services, controllers and validation rules.

### Endpoints and controllers

Each module probably will expose many endpoints. Those endpoints and their validators are automatically mapped to the server at startup time following a simple convention:

http method		| restify verb	| controller method name
--------------|---------------|-----------------------
POST			    | post			    | create
PUT				    | put			      | update
DELETE			  | del			      | delete
GET	(single)	| get			      | get
GET (many)		| get			      | list

GET operation can provide a resource id. PUT and DELETE operations ALWAYS use a resource id. In other words no bulk update or delete operations are supported.
Currently list -or GET many- operations are the only ones supporting "querystring filtering".
See *lib/sequelizeQueryMiddleware.js* for details on this.

#### Authentication

Provided via *passport-jwt*, all methods in a controller whose module has a **requiresAuth** attribute will require a JWT on the **authorization** header immediately followed by the token.
The script *gen-token-sample.js* is provided to quickly generate a suitable token.

### Models

Models are loaded at application startup time before the rest of the module's components.
To be automatically loaded a model filename *must* end in *Model.js*. See *lib/db.js* for more info on this.

## Misc

### Documentation

Generate with gulp (gulp-cli must installed globally) with:

```bash
gulp doc
```

On windows, you may need to run:

```cmd
npm link gulp-eslint
npm link gulp-util
npm link eslint
```

To enable gulp tasks to run.
