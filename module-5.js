// Request and Response Objects

// Every route handler in Express receives two key objects: req and res.

// - req (Request Object): This object contains all the information about the incoming client request.
// It's like an object that the client sends to the server.

// You can use req to access things like:
// The data sent in the body (req.body).
// URL parameters (req.params).
// Query strings (req.query).
// Headers (req.headers).

// - res (Response Object): This object is what you use to send a response back to the client.

// You use methods on res to send data, set headers, and control the response.

// For example:

// res.send(): Sends a simple text or HTML response.
// res.json(): Sends a JSON object, which is very common for APIs.
// res.status(): Sets the HTTP status code (e.g., 200 for OK, 404 for Not Found).

// URL Parameters vs. Query Strings

// These are two different ways to send data in a URL.

// URL Parameters are used to identify a specific resource. They are part of the path itself and are denoted by a colon (:) in the route definition.
// Use case: Identifying a unique item.
// Example: app.get('/api/users/:id')

// In this route, :id is a parameter. If a client requests /api/users/123, the value 123 is available on the request object as req.params.id.

// Query Strings are used for optional data, filtering, or sorting. They start with a question mark (?) and follow a key=value format, with multiple pairs separated by an ampersand (&).

// Use case: Filtering a list or passing optional data.
// Example: app.get('/api/products')

// If a client requests /api/products?category=electronics&sort=price, the values electronics and price are available on the request object as req.query.category and req.query.sort.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// middleware syntax
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});

// req (request object): Contains information about the incoming request (headers, parameters, body, etc.). You can use this to perform any action on the request.
// res (response object): Used to send the response back to the client. You can also perform actions of the response before you send it back to the client.
// next (function): This function is called to pass control to the next middleware in the stack if the current one doesn't end the request-response cycle.

// Types of Middleware

// ExpressJS offers different types of middleware and you should choose the middleware based on functionality required.

// 1. Application-level Middleware
// Application-level middleware is bound to the entire Express application using app.use() or app.METHOD(). It executes for all incoming requests in the application, regardless of the specific path or HTTP method.

// This type of middleware is commonly used for tasks like logging, body parsing, authentication checks, or setting headers for every incoming request.

// app.use(express.json()); // Parses JSON data for every incoming request

// app.use(express.urlencoded()) //Parses URL-encoded data from every incoming request

// app.use((req, res, next) => {
//   console.log('Request received:', req.method, req.url);
//   next();
// });

// 2. Router-level Middleware
// Router-level middleware is applied to a specific router instance using router.use() or router.METHOD(). It only applies to routes defined within that particular router, making it perfect for modular applications where middleware is only relevant to specific groups of routes.

// This type of middleware is often used to group related routes (e.g., all routes related to authentication or user management) and apply middleware logic to them.

// const router = express.Router();

// // Apply middleware to only this router's routes
// router.use((req, res, next) => {
//   console.log('Router-specific middleware');
//   next();
// });

// router.get('/dashboard', (req, res) => {
//   res.send('Dashboard Page');
// });

// app.use('/user', router); // The middleware applies only to routes under "/user"

// 3. Error-handling Middleware
// Error-handling middleware is a special type of middleware used to catch and respond to errors during the request-response cycle. It is defined with four parameters: err, req, res, next.

// This middleware is essential for sending a consistent error response and avoiding unhandled exceptions that might crash the server.

// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error stack
//   res.status(500).send('Something went wrong!');
// });

// 4. Built-in Middleware
// Express provides built-in middleware to help with common tasks, like serving static files or parsing data.

// For example, express.static() serves files like images, and express.json() helps parse incoming JSON data.

// app.use(express.static('public')); // Serves static files from the "public" folder
// app.use(express.json()); // middleware ithat enables your server to understand the json data it receives and process that data

// 5. Third-party Middleware
// Third-party middleware is developed by external developers and packaged as npm modules. These middleware packages add additional functionality to your application, such as request logging, security features, or data validation.

// For example, the morgan middleware logs HTTP requests, and body-parser helps parse incoming request bodies for easier handling of form data.

// const morgan = require('morgan');
// app.use(morgan('dev')); // Logs HTTP requests using the "dev" format

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
