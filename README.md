•
Project Initialisation:
◦
The project begins with npm init to set up the package.json file.
◦
index.js is created as the main application file.
◦
Express.js is installed using npm install express to handle routing and server functionalities.
•
Directory Structure:
◦
The application uses a modular structure with dedicated folders for routes, controllers, views, and models. This separation of concerns helps organise the codebase.
•
Environment Variables for Port Configuration:
◦
Instead of hardcoding a port (e.g., 8000), the application is configured to use environment variables for the port. This is crucial for real-world deployment, as specific ports may not be available on cloud computing platforms.
•
View Engine Setup (EJS):
◦
EJS (Embedded JavaScript) is used as the server-side rendering engine.
◦
The view engine is set using app.set('view engine', 'ejs').
◦
The path to the views folder is configured using path.resolve(__dirname, 'views').
•
Partial Views for Reusability:
◦
To avoid code repetition across multiple web pages, common components (like headers, scripts, or navigation bars) are extracted into partials.
◦
A partials folder is created inside views.
◦
Files like head.ejs, scripts.ejs, and nav.ejs are created to store reusable HTML snippets (e.g., Bootstrap CDN links, navigation bar code).
◦
These partials are then included in main view files using the <%- include('partials/filename') %> syntax.
◦
Bootstrap is integrated using CDN links for styling and components like the navigation bar. The navigation bar is customised to display "Bloggify" and include links for "Home," "Add Blog," and conditional display for "Logout" (if logged in) or "Sign In/Sign Up" (if not logged in).
•
Development Dependencies (nodemon):
◦
nodemon is installed as a development dependency (npm install nodemon -D).
◦
The -D flag ensures that nodemon is only installed in the development environment, making the production build smaller.
◦
nodemon automatically restarts the server upon code changes, enhancing the development workflow.
◦
A dev script ("dev": "nodemon index.js") is added to package.json to easily run the application with nodemon.
•
User Model with Mongoose and Password Hashing:
◦
Mongoose is installed (npm install mongoose) to interact with MongoDB.
◦
A User schema is defined with fields:
▪
fullName: String, required.
▪
email: String, required, unique.
▪
password: String, required, hashed.
▪
salt: String, used for password hashing.
▪
profilePhoto: String, with a default path to default.png in a public/images folder.
▪
role: String, with an enum (allowed values) of user and admin, defaulting to user.
◦
Password Hashing Implementation:
▪
A pre('save') Mongoose middleware hook is used on the User schema.
▪
Before a user document is saved, this hook checks if the password has been modified.
▪
If modified, it generates a random salt.
▪
The user's plain-text password is then hashed using an algorithm (e.g., SHA256) in combination with the generated salt. This is done using crypto.createHmac().update(password).digest('hex').
▪
The original password is replaced with the hashed password and the generated salt is stored.
▪
This practice ensures that even if the database is breached, the original user passwords remain secure and unrecoverable.
•
User Authentication Routes (Sign Up & Sign In):
◦
Sign Up (/user/signup):
▪
A POST route handles user registration.
▪
It receives fullName, email, and password from the request body (req.body).
▪
A new user document is created using the User model.
▪
After successful creation, the user is redirected to the home page.
▪
express.urlencoded({ extended: false }) middleware is crucial for parsing form data from the request body.
◦
Sign In (/user/signin):
▪
A POST route handles user login.
▪
It expects email and password from the request.
▪
A static method matchPassword is added to the User schema. This method:
•
Finds a user by email.
•
If no user is found, it returns false or throws an error.
•
If found, it takes the provided password and hashes it using the stored salt of that user.
•
It then compares this newly generated hash with the stored hashed password.
•
If they match, it returns the user object (with password and salt undefined for security). Otherwise, it indicates an incorrect password.
▪
The sign-in route calls this matchPassword method to validate credentials.
•
MongoDB Connection:
◦
The application connects to MongoDB using mongoose.connect('mongodb://localhost:27017/bloggify').
