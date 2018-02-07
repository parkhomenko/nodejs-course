### Install dependencies
npm install

### Database
npm db:install - Creates a docker container from mysql image and creates a database
npm db:uninstall - Deletes a mysql docker container

### Migrations
npm db:start - Starts mysql container and creates tables with data  
npm db:stop - Stops mysql container and deletes data and tables from database

### Start dev server
npm start

### Start prod server
npm run start:lb

### Start all validations
npm run check

### Share a development site:
npm run share

### Swagger docs
http://localhost:3000/api-docs/
