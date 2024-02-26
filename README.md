### Documentation for server.js

#### Dependencies
- `express`: A Node.js web application framework for building web applications and APIs.
- `multer`: Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `path`: A Node.js module for handling file paths.
- `docx-pdf`: A module for converting DOCX files to PDF format.
- `fs`: The built-in Node.js file system module for interacting with the file system.
- `mongodb`, `mongoose`: MongoDB database drivers for Node.js and ODM (Object Data Modeling) library for MongoDB.
- `express-session`: Middleware for managing user sessions in Express applications.
- `UserModel`, `UserRoute`, `UserController`: Modules for handling user-related operations such as model, routing, and controller.
- `dbConfig`: Configuration file for the MongoDB database connection.

#### Express App Configuration
- `express.static("uploaded")`: Serves static files from the "uploaded" directory.
- `express.json()` and `express.urlencoded()`: Middleware to parse JSON and URL-encoded request bodies.
- `session`: Configures Express to use sessions for managing user authentication.
- `multer` configuration: Defines settings for file storage, limiting file size, and filtering file types to `.docx` files.

MongoDB Database Setup
1. Full Installation Process
To set up MongoDB locally:

Visit the MongoDB website and download the appropriate version for your operating system.
Follow the installation instructions provided for your OS.
Once installed, start the MongoDB server.
2. Registration for MongoDB Atlas
If you choose to use MongoDB Atlas:

Go to the MongoDB Atlas website and sign up for an account.
Follow the steps to create a new cluster.
3. Creation of Clusters
Once logged in to MongoDB Atlas:

Create a new cluster by selecting the desired cloud provider, region, and configuration options.
Follow the setup instructions provided to deploy your cluster.
Creating Controllers for Each Model
1. Showing Controllers or Relationship of Collections to Advanced Functionality
Each model (e.g., UserModel) typically has an associated controller (e.g., UserController) responsible for handling CRUD operations and other business logic.
Controllers interact with the database (via models) to perform operations such as creating, reading, updating, and deleting data.
2. Describing the Work of Controllers or Relationships of Collections
Controllers handle incoming requests from routes, process the data (if necessary), and interact with the database using the associated model.
They encapsulate the logic for manipulating data, enforcing business rules, and handling errors.
Creating Endpoints (Routes) to Link Controllers with Your Server
1. Connecting to the Database
The MongoDB connection is established using the MongoDB Node.js driver or Mongoose.
The connection URI is specified, and the connection is established either locally or via MongoDB Atlas.
2. Describing the Connection to the Database
The connection to the database is established when the server starts up.
Mongoose or the MongoDB Node.js driver handles the connection and provides methods for interacting with the database.
3. Using Data from the Database in the Application
Data from the database is typically used within route handlers or controller methods to respond to client requests.
For example, when a user registers or logs in, their information is stored or retrieved from the database.
4. Describing this Process
When a request is received at a specific endpoint (route), the corresponding controller method is invoked.
The controller method interacts with the database as needed, performing CRUD operations or other actions.
Once the operation is complete, the controller sends a response back to the client with the appropriate data or status code.
Linking Your Website with Created Endpoints
1. Correct Interaction Between Frontend, Backend, and Database
Frontend forms or UI elements submit requests to the backend server via HTTP methods (e.g., POST, GET).
Backend routes (endpoints) receive these requests, process them using controllers, and interact with the database as necessary.
Data retrieved from the database is then sent back to the frontend as JSON or HTML, depending on the request.
2. Describing this Process
Frontend code (HTML, CSS, JavaScript) contains forms or UI elements that interact with the backend via AJAX requests or form submissions.
Backend routes handle these requests, execute the necessary logic using controllers, and respond with data or status codes.
The frontend updates accordingly based on the received response, providing a seamless interaction between the user, backend server, and database.

#### Middleware
- `requireLogin`: Middleware function to check if a user is logged in by verifying the existence of a user session.

#### Routes
- `GET /register`: Renders the registration form.
- `GET /`: Renders the index page.
- `POST /docxtopdf`: Endpoint for converting uploaded DOCX files to PDF format.
- `GET /download/:filename`: Endpoint for downloading files from the server.
- `POST /register`: Endpoint for user registration.
- `POST /login`: Endpoint for user login.

#### Server Initialization
- Starts the Express server on port 3000.

### Documentation for index.js

#### HTML Form
- Provides a form for uploading DOCX files for conversion to PDF.
- Includes JavaScript for form validation and submission via AJAX.

#### JavaScript
- Validates file selection and size before form submission.
- Submits the form data to the server using Fetch API.
- Displays download links for converted PDF files returned by the server.

### Documentation for register.js

#### HTML Forms
- Provides forms for user registration and login.
- Includes JavaScript for toggling between registration and login forms.

#### JavaScript
- Enables toggling between registration and login forms when respective links are clicked.
