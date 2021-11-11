## Running the server
### !!! Read before running the servers !!!
### !!! BEFORE THE RUNNING: !!!
### !!! Make sure you have MySQL on your computer !!!

Repeat the steps under by the following order:

### Step 1
Check if the Node modules folders are installed, if not:
```
npm install
```

### Step 3
Create the scheme
```
npx prisma generate
```

### Step 4
Push the scheme to MySQL
```
npx prisma db push
```

### Step 2
Compile and run the servers
```
node app.js
```

In the terminal you should you should see "Port **{Port Number}** is up!", meanning the server is working

## DB server
### Schemas
* **User** - containe the type of user and personal information.
* **Post** - containe the post information.
* **Friend** - have the relation by the users.

### Routers
Routers used in the server
* **CRUD** - basic create, read, update and delete for the user, post or friend DB Table.
* **DB router** - send the user, post or friend data and create data to the DB table.


### Services
* **DBService** - The manager of the CRUD of DB data, hold the functions to create and update elements.
* **MailService** - make the reset password.

### Routers
Routers used in the server
* **AdminRouterService** - an interval, based the manager of permissions for admins.
* **FeedRouterService** - an interval, based the manager routing between DBservice and function.
* **FriendRouterService** -  an interval, based the manager routing between DBservice and function.
* **PostRouterService** -  an interval, based the manager routing between DBservice and function.
* **UserRouterService** -  an interval, based the manager routing between DBservice and function.



## Built With
* [cors](https://www.npmjs.com/package/cors) - The cross origin resource sharing used
* [express](https://www.npmjs.com/package/express) - The framework used
* [Prisma](https://www.npmjs.com/package/mongoose) - The DB object modeling used
* [socket.io](https://www.npmjs.com/package/socket.io) - The socket used
* [body-parser](https://www.npmjs.com/package/body-parser) - The parsing middelware
* [axios](https://www.npmjs.com/package/axios) - The http middelware
* [bcrypt](https://www.npmjs.com/package/bcrypt) - The encrypt the password.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Json Web Token to endrypt the data between server and client.
* [morgan](https://www.npmjs.com/package/morgan) - The Server Logger.
* [pug](https://www.npmjs.com/package/pug) - HTML Pgae for reset password.
* [nodemailer](https://www.npmjs.com/package/JSDOM) -work with Pug.
* [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream).
* [jquery](https://www.npmjs.com/package/rotating-file-stream) -querys for MySql Server for information .
* [JSDOM](https://www.npmjs.com/package/JSDOM) - querys for MySql Server for information .

## Author
* **Dor Schreiber** - *Server and Client work.*
* **Netanel Benglsdorf** - *Server and Client work.*
