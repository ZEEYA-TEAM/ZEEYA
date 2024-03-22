/*
RED: Added several security measures to enhance the protection of the server:

1. Helmet: Helmet is a middleware that sets various HTTP headers to secure the application by mitigating common security vulnerabilities.

2. Rate Limiting (express-rate-limit): This middleware limits the number of requests an IP address can make to the server within a specified time window, helping to prevent DoS (Denial of Service) attacks.

3. Request Rate Limiting (express-slow-down): Similar to rate limiting, this middleware slows down the responses for requests from an IP address once the request rate exceeds a specified threshold, further protecting against DoS attacks.

4. MongoDB Query Injection Protection (express-mongo-sanitize): This middleware sanitizes user-supplied data to prevent NoSQL query injection attacks against MongoDB databases.

5. XSS Protection (xss-clean): This middleware sanitizes user input to prevent cross-site scripting (XSS) attacks by escaping or removing potentially malicious HTML and JavaScript code.

6. HTTP Parameter Pollution Protection (hpp): This middleware prevents HTTP parameter pollution attacks by stripping or replacing duplicate query parameters and limiting parameter size to mitigate the risk of server-side processing vulnerabilities.

7. Compression (compression): This middleware compresses HTTP responses to reduce response size and improve server performance, while also mitigating some forms of DoS attacks by limiting the amount of data that needs to be transmitted.
*/
const express = require("express");
const axios = require("axios");
const helmet = require("helmet"); // Adding Helmet for security headers
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Adding rate limiting for DoS protection
const slowDown = require("express-slow-down"); // Adding request rate limiting
const mongoSanitize = require("express-mongo-sanitize"); // Adding MongoDB query injection protection
const xss = require("xss-clean"); // Adding XSS protection
const hpp = require("hpp"); // Adding HTTP Parameter Pollution protection
const compression = require("compression"); // Adding compression for response size reduction
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const loginController = require("./controllers/loginController");
const emailLoginController = require("./controllers/emailLoginController");


// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Apply Helmet middleware
app.use(compression()); // Apply compression middleware
app.use(bodyParser.urlencoded({ extended: true }));






// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request rate limiting
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests before rate limiting starts
  delayMs: () => 500, // add a 500ms delay per request above the limit
});
app.use(speedLimiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Login with username
app.post("/api/login", loginController.loginUser);

// Login with email and password
app.post("/api/loginByEmail", emailLoginController.loginByEmail);

// Constants for Notion API
const NOTION_API_BASE_URL = process.env.NOTION_API_BASE_URL;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID_1 = process.env.NOTION_DATABASE_ID_1;
const NOTION_DATABASE_ID_2 = process.env.NOTION_DATABASE_ID_2;
const NOTION_DATABASE_ID_3 = process.env.NOTION_DATABASE_ID_3;

const NOTION_DATABASE_IDS = [
  NOTION_DATABASE_ID_1,
  NOTION_DATABASE_ID_2,
  NOTION_DATABASE_ID_3,
];

// POST endpoint to interact with Notion API
app.post("/api/notion", async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid request body");
    }

    const promises = NOTION_DATABASE_IDS.map((Id) =>
      axios.post(`${NOTION_API_BASE_URL}/databases/${Id}/query`, req.body, {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      })
    );

    const responses = await Promise.all(promises);

    const aggregatedData = responses.map((response) => response.data);

    res.json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint to interact with Notion API
app.post("/api/notion", async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Invalid request body");
    }

    const promises = NOTION_DATABASE_IDS.map((Id) =>
      axios.post(`${NOTION_API_BASE_URL}/databases/${Id}/query`, req.body, {
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
      })
    );

    const responses = await Promise.all(promises);

    const aggregatedData = responses.map((response) => response.data);

    res.json(aggregatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.use(bodyParser.json());


// Define server port
const PORT = process.env.PORT || 3001;
// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
