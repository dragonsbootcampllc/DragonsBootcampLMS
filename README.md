# Client
Project Guidelines
# Server
Project Guidelines
open termial to the Server Directory

> run

     npm i .
     
*to load all the packages to your device*

the project divided into some folders 

Controllers -> `That what you right the logic in the app like 'authController'`

Models -> `it is ovious we right out database schema , functions and triggers and so on`

Routes -> `where we handle our app routes like the 'authRoutes' has login route we tighed that into one file called index and use that in the server.js`

.env -> `that one is ovious too we use it to store global variables`

config -> `that where we have the configration for our database`


### you can use seeders to have a quick access to some default data in the database

> you need to run 

     npx sequelize-cli db:seed:all

> or to run a specific one 

     npx sequelize-cli db:seed --seed (filename)

> to create another seed file run 

     npx sequelize-cli seed:generate --name demo-user