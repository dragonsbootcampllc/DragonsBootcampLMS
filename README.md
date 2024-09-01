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

Pre-Requisites:
Before running the code, ensure that the PostgreSQL user has been created and configured with appropriate permissions. Execute the following commands in your terminal:

Switch to the postgres user:
```bash
sudo -i -u postgres
```

Create a new PostgreSQL user (e.g., postgres):
```bash
createuser --interactive
Enter the role name: postgres
Is the new role a superuser? (n)
Can the role create databases? (y)
Can the role create more roles? (n)
```

Switch to the PostgreSQL command-line interface:
```bash
psql
```

Set the password for the postgres user:
```sql
ALTER USER postgres WITH PASSWORD 'the password in the .env file';
```

Grant all privileges on the target database to the postgres user:
```sql
GRANT ALL PRIVILEGES ON DATABASE learning_system TO postgres;
```

Exit the PostgreSQL CLI:
```sql
\q
```

Exit the postgres user session:
```bash
exit
```

Finally, run your server.

### you can use seeders to have a quick access to some default data in the database

> you need to run 

     npx sequelize-cli db:seed:all

> or to run a specific one 

     npx sequelize-cli db:seed --seed (filename)

> to create another seed file run 

     npx sequelize-cli seed:generate --name demo-user