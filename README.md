## This app is developed for Hublio as interview task

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

