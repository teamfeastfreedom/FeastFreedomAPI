# This is the Nodejs API for Feast Freedom project!!
<br>
<b>run these installs to get all required dependencies</b><br>

 * npm install body-parser --save
 * npm install nodemon
 * npm install dotenv --save
 * npm install express --save
 * npm install fs --save
 * npm install mongoose --save
 * npm install email-validator

## Creating a new user creates a Mongo database (FeastFreedom) and a new collection (users)
### How to create a new user in Postman?

 1. Start MongoDB with 'mongod' command<br>
 2. Start API with 'npm start' command<br>
 3. Pass the fields in *x-www-from-urlencoded* body in Postman<br>
 4. send http POST request to: http://localhost:2000/api/auth/signup
<br>
You may configure the LocalHost Port by changing the value for 'PORT' in .env file<br>

## Database Models 
### 'users' collection

 * UserName
 * Email
 * Password
 * Question1
 * Answer1
 * Question2
 * Answer2

### 'kitchens'

 * KitchenName
 * Email
 * Password
 * KitchenType
 * OpenTime
 * CloseTime
 * ImagePath