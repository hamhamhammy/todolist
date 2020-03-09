# TodoList

## System Requirements
```
mac/windows/linux
Yarn, Node.js v8.14+
```


## Running the application
### Ensure Yarn and Node.js are installed on your system
### Do the following once
```
yarn install
yarn db-init
```

### For Dev
```
yarn dev
```

### For Prod Local
```
yarn prod-build
yarn prod-server-local
```

### For Prod
```
yarn prod
```

## Database

### Create the database
```
yarn db-init
```

### Seed the database with test data (optional)
```
yarn db-seed
```

### Clear the database
```
yarn db-clear
```

## Project setup

### Installs required dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```

### Builds and minifies for production
```
yarn prod-build
```

### Runs application in production mode (valid ssl certs required)
```
yarn prod-server
```

### Runs application in local production mode (fake ssl certs)
```
yarn prod-server-local
```

### Shortcut for build and run application in production mode
```
yarn prod
```

### Lints files
```
yarn lint
```

<br>

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
