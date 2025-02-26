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


## Captain Routes

### Register Captain
`POST /captains/register`

#### Request Body
```json
{
  "fullname": {
    "firstname": string,    // required, min 3 chars
    "lastname": string      // optional, min 3 chars
  },
  "email": string,         // required, unique, valid email format
  "password": string,      // required, min 6 chars
  "vehicle": {
    "color": string,       // required, min 3 chars
    "plate": string,       // required, min 3 chars, unique
    "capacity": number,    // required, numeric value
    "vehicleType": string  // required, enum: ["car", "motorcycle", "auto"]
  }
}

##Success Response (201 Created)
{
  "token": "jwt_token_string",
  "captain": {
    "_id": "string",
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
    }
  }
}

## Login Captain
POST /captains/login

Request Body{
  "email": string,    // required, valid email
  "password": string  // required, min 6 chars
}

## Success Response (200 OK)

{
  "token": "jwt_token_string",
  "captain": {
    // same as register response
  }
}

## Get Captain Profile
GET /captains/profile

Headers

Authorization: Bearer <jwt_token>  // required

## Success Response (200 OK)

{
  "captain": {
    // same as register response without token
  }
}

## Logout Captain
GET /captains/logout

Headers

Authorization: Bearer <jwt_token>  // required

##Success Response (200 OK)
{
  "message": "Logout successfully"
}

##Error Responses
Validation Error (400)

{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}

##Authentication Error (401)
{
  "message": "Unauthorized"
}

##Conflict Error (400)
{
  "message": "Captain already exist"
}

##Security Features
Password hashing using bcrypt
JWT authentication
Token blacklisting on logout
Cookie-based token storage

## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

### Example Response

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

### Example Response

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```


## `/rides/get-fare` Endpoint

### Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization:

 Bear

er <token>`

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Example Response

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```