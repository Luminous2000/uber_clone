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

### Login User
Authenticates a user and returns a JWT token.

#### Endpoint

#### Request Body
```json
{
  "email": "string",     // required
  "password": "string"   // required, min 6 characters
}
```
#### Headers
Content-Type: application/json

#### Success Response
**Code**: 200 OK

#### Success Response
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
Code: 400 BAD REQUEST
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}

Code: 401 UNAUTHORIZED
{
  "message": "Invalid email or password"
}

#### Validation Rules
- Email must be valid
- Password must be at least 6 characters long
#### Example Request

curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
  '

#### Authentication Flow
User submits email and password
System validates input format
System checks if email exists
System verifies password using bcrypt
On success, returns JWT token and user data

### Example Response

-`user` (object):
    -`fullname` (object),
     -`firstname` (string): User's first name (minmum 3 character),
     -`lastname` (string): User's last name (minimum 3 character),
    -`email` (string): User's email address (must be valid email),
    -`password` (string): User's password (minimum 6 character),
- `token` (string): JWT Token



Document GET /users/profile endpoint

Add authentication requirement
Describe response format
Add example request with token
### Logout User
Logs out the user by clearing the token cookie and blacklisting the current token.

#### Endpoint
GET /users/logout

#### Headers
Authorization: Bearer <jwt_token>

#### Success Response
**Code**: 200 OK


Add authentication requirement
Describe cookie clearing
Document token blacklisting
Add example request

### Get User Profile
Returns the authenticated user's profile information.

#### Endpoint

GET /users/profile


#### Headers
Authorization: Bearer <jwt_token>


#### Success Response
**Code**: 200 OK
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "_id": "string"
}

#### Error Response
**Code**: 401 UNAUTHORIZED

{
  "message": "Unauthorized"
}

Example Request
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer your_jwt_token"

Logout User
Logs out the user by clearing the token cookie and blacklisting the current token.

Endpoint
GET /users/logout

Headers

Authorization: Bearer <jwt_token>

Success Response
Code: 200 OK

{
  "message": "Logged out successfully"
}

Error Response
Code: 401 UNAUTHORIZED

{
  "message": "Unauthorized"
}

Security Features
Clears authentication cookie
Blacklists the JWT token
Requires valid authentication

#### Example Request

curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer your_jwt_token"

    # Captain Endpoints
  
  ### Register Captain
  Creates a new captain account with vehicle details.
  
  #### Endpoint

  POST /captains/register
    
  #### Request Body
  ```json
  {
    "fullname": {
      "firstname": string,    // required, min 3 characters
      "lastname": string      // optional, min 3 characters if provided
    },
    "email": string,         // required, must be unique
    "password": string,      // required, min 6 characters
    "vehicle": {
      "color": string,       // required, min 3 characters
      "plate": string,       // required, min 3 characters
      "capacity": number,    // required, numeric
      "vehicleType": string  // required, enum: ['car','motorcycle','auto']
    }
  }

#### Validation Rules
- Email must be valid and unique
- Firstname must be at least 3 characters long
- Password must be at least 6 characters long
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters
- Vehicle capacity must be numeric
- Vehicle type must be one of: car, motorcycle, auto

#### Success Response
**Code**: 201 CREATED

{
  "token": "jwt_token_string",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "_id": "string"
  }
}

#### Error Response
**Code**: 400 BAD REQUEST

{
  "errors": [
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}

Example Request

curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Black",
      "plate": "DL1RTA3123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'

