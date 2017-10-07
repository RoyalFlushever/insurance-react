# Ovation

```
All development must be done in new branch from develop branch
```

## Installation

### Environment

Node : 6.11.0 ( LTS)

My SQL 5.7

### Clone

```
git clone git@git.thecodingmachine.com:tcm-projects/ovatio.git
```

### Npm

```
npm install
```

### Compile

```
webpack
```
watch version 
```
webpack --watch
```


### Config

Copy ./config/_config.json in ./config/config.json

Include your database configuration


### Migration

To update right and role
```
npm run update
```

Before use migration, install sequelize cli : 

```
npm install sequelize-cli
or
npm install  -g equelize-cli

```

```
http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-cli
```

To initialise dataBase and migrate it
```
npm run migrate
```

Generate Data
```
npm run seed
```

### install bower components

```
bower install
```

### Start

```
npm start
```

## Methodology

Each time models is create or modify, create a patch 
```
http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-cli
```

### Documentation
```
"node_modules/.bin/jsdoc" -c doc.conf --verbose
```
