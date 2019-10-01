## This app is developed for Hublio as interview task

## Steps to run this app
    $npm init
    $npm install express mongodb mongoose bcryptjs validator jsonwebtoken dotenv nodemon
    $nodemon index.js | $node index.js 

## MongoDB Atlas link needs to be updated with your own link .env
    Example link: mongodb+srv://farhan:<PASSWORD>@cluster0-mdz7y.mongodb.net/test?retryWrites=true&w=majority

## API LIST
## Register user 
3 fields are must name, email & password, post it as raw body with type json
    POST localhost:4000/users 
## Login User 
2 fields are must email & password, post it as raw body with type json
    POST localhost:4000/users/login
## User Profile 
    GET  localhost:4000/users/me
## Update user profile
jwt and raw body with type json
    POST localhost:4000/users/me/update
## Logout user
    POST localhost:4000/user/me/logout
    POST localhost:4000/user/me/logoutall

