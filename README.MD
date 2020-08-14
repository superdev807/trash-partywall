# Trash PartyWall Tech Assignment

## Project Install

    npm install
    npm start

## Used Technologies

    Node.js/Express
    MongoDB

## API Urls

### User

    Login
    http://localhost:4000/api/user/login - POST API
        Requiring Fields
            Email
            Password

    Register
    http://localhost:4000/api/user/register - POST API
        Requiring Fields
            Email
            Password

### Item

    Get Items
    http://localhost:4000/api/item/ - GET

    Create Items
    http://localhost:4000/api/item/create - POST
        Requiring Fields
        - Food
            type
            name
            description
            weight
        - Drink
            type
            name
            volume

    Remove Items
    http://localhost:4000/api/item/remove/:id - DELETE
    id - object id of the item
