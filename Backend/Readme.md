# Backend API Documentation

## Authentication Endpoints

### Register User
Creates a new user account in the system and returns an authentication token.



#### Request Body
```json
{
  "fullname": {
    "firstname": string,    // required, min 3 characters
    "lastname": string      // optional, min 3 characters if provided
  },
  "email": string,         // required, must be unique
  "password": string       // required, min 6 characters
}
#### Headers
Content-Type: application/json

#### Success Response

Code: 201 CREATED
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
#### Error Response

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}

#### Validation Rules
- Email must be valid and unique
- Firstname must be at least 3 characters long
- Password must be at least 6 characters long
- Lastname if provided must be at least 3 characters long

#### Example Request

curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'


  #### Security
- Password is hashed using bcrypt before storage
- JWT token is generated using environment variable JWT_SECRET
- Email uniqueness is enforced at database level
#### Database Schema
 User data is stored in MongoDB with the following schema:

- fullname
-- firstname (String, required, min: 3)
-- lastname (String, optional, min: 3)
- email (String, required, unique)
- password (String, required, select: false)
- socketId (String, optional)

### Example Response

-`user` (object):
    -`fullname` (object),
     -`firstname` (string): User's first name (minmum 3 character),
     -`lastname` (string): User's last name (minimum 3 character),
    -`email` (string): User's email address (must be valid email),
    -`password` (string): User's password (minimum 6 character),
- `token` (string): JWT Token