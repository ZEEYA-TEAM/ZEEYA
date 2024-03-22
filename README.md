# Project Overview

This Node.js project creates a secure and efficient web server with user authentication and data management capabilities, leveraging the Express framework and the Notion API. It incorporates various security measures and optimizations to ensure a robust web application.


## Key Features

- **Security Measures**: Implements Helmet, rate limiting, and data sanitization to protect against common web vulnerabilities such as XSS, NoSQL injection, and DoS attacks.
- **User Authentication**: Provides login functionality, supporting both username and email/password combinations. It validates users by interacting with user credentials stored in a Notion database.
- **API Integration**: Demonstrates integration with external APIs, particularly the Notion API for user data management and authentication.
- **Performance Optimization**: Uses compression to reduce the size of HTTP responses, enhancing the server's performance.

## Requirements

- **Node.js**: Version 21.6.2 or newer.
- **Dependencies**: Includes necessary npm packages like express, axios, bcrypt, dotenv, and others focused on security and performance.
- **Environment Variables**: Utilizes environment variables to manage configuration settings such as API keys and database IDs securely.

## Configuration

Set up environment variables for the Notion API base URL (`NOTION_API_BASE_URL`), Notion API key (`NOTION_API_KEY`), and database IDs (`EMAIL_PASSWORD_DATABASE_ID`, `NOTION_DATABASE_ID_2`) to enable user authentication and data retrieval functionalities.

## Running the Server

1. Ensure Node.js and npm are installed.
2. Install the required dependencies by running `npm install`.
3. Configure the necessary environment variables.
4. Start the server with `node server.js`.

This project is a starting point for building secure and efficient web applications with user authentication capabilities, emphasizing the importance of security and performance in web development.
=======
Därefter kan utvecklingsservern startas med:
`npm start`

