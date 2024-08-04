# Fintech-Platform

## Setup Instructions for Both Backend and Frontend
### Backend Setup
1. Install Node.js and npm.
  
2. Initialize the Project:
    Create a new directory for your project and initialize a new Node.js project.
    ```
    mkdir fintech-platform
    cd fintech-platform
    npm init -y
    ```
    
3. Install Dependencies:
    Install the necessary dependencies such as Express.js, body-parser, and cors.
    npm install express body-parser cors
   
4. Create server.js:
    Create a file named server.js
   
5. Start the Server:
    Run the server using Node.js.
    ```
    node server.js
    ```
   
### Frontend Setup

1. Create HTML File:
    Create an index.html file

2. Create JavaScript File:
    Create a scripts.js file to handle dynamic content loading.
   
## Detailed API Documentation
### API Endpoints
#### 1. Register User: Endpoint - POST /register
Request Body:
```
{
  "username": "string",
  "password": "string"
}
```

Response:

200 OK: Registration successful
```
{
"message": "Registration successful"
}
```
400 Bad Request: Username and password are required.
```
{
  "message": "Username and password are required"
}
```

#### 2. Login User: Endpoint - POST /login**

Request Body:

```
{
  "username": "string",
  "password": "string"
}
```

Response:
200 OK: Login successful.

```
{
  "message": "Login successful"
}
```

400 Bad Request: Invalid username or password.

```
{
  "message": "Invalid username or password"
}
```

#### 3. Deposit Funds: Endpoint - POST /deposit**

Description: Deposits funds into a user’s account.

Request Body:

{
  "username": "string",
  "amount": "number"
}

Response:

Success: 200 OK
```
{
  "message": "Deposit successful",
  "new_balance": "number"
}
```

Error: 400 Bad Request
```
{
  "error": "User not found"
}
```

#### 4. Withdraw Funds: Endpoint - POST /withdraw**

Description: Withdraws funds from a user’s account.

Request Body:

```
{
  "username": "string",
  "amount": "number"
}
```

Response:

Success: 200 OK
```
{
  "message": "Withdrawal successful",
  "new_balance": "number"
}
```

Error: 400 Bad Request
```
{
  "error": "Insufficient balance"
}
```


## Design Decisions and Assumptions
1. Technology Stack:
    Backend: Hasura GraphQL Engine for providing GraphQL APIs over a PostgreSQL database.
    Frontend: Vanilla JavaScript, HTML, and CSS for simplicity and ease of understanding.
    Database: PostgreSQL for reliable data storage and efficient querying.
2. Security:
    Passwords are stored in plain text in this example for simplicity. In a real-world application, passwords should be hashed using a library like bcrypt before 
    storing them in the database.
    Hasura's admin secret is used to secure the GraphQL API. In production, more granular roles and permissions should be defined.
3. User Authentication:
    Basic username and password authentication is implemented. This can be extended to use JWT tokens for more secure and scalable authentication.
   
4. Frontend-Backend Communication:
    Fetch API is used for making HTTP requests from the frontend to the Hasura GraphQL API.
    CORS is enabled on the backend to allow requests from the frontend.
   
5. Error Handling:
    Basic error handling is implemented to return appropriate HTTP status codes and error messages for invalid requests.
   
6. User Experience:
    The frontend dynamically updates the content to show registration and login forms and interacts with the backend for user authentication.
