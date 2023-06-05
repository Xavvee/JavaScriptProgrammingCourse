import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

let students = [
    {
          fname: 'Jan',
          lname: 'Kowalski'
    },
    {
          fname: 'Anna',
          lname: 'Nowak'
    },
];

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views')); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */
/* Determining the contents of the middleware stack */
/* ************************************************ */

app.use(morgan('dev')); // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
app.use(express.static(path.join(__dirname, 'public'))); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

const staticFilesPath = path.join(__dirname, 'public');
const imgPath = path.join(staticFilesPath, 'img');

// Create the 'img' directory if it does not exist
if (!fs.existsSync(imgPath)) {
  fs.mkdirSync(imgPath);
}

// Copy an image to the 'img' directory
const imageImgPath = path.join(__dirname, 'public', 'img', 'image.jpg');
const destinationImgPath = path.join(imgPath, 'image.jpg');
fs.copyFileSync(imageImgPath, destinationImgPath);


/* ******** */
/* "Routes" */
/* ******** */

/* ---------------- */
/* Route "GET('/')": */
/* ---------------- */
app.get('/', function (request, response) {
    // Rendering the view "index" if the relative URL is '/', and the GET method was used to send data to the server
    response.render('index', { students: students });
});

/* ---------------------- */
/* Route "GET('/submit')" */
/* ---------------------- */
app.get('/submit', function (request, response) {
    response.set('Content-Type', 'text/plain');
    response.render('submit', {name: request.query.name}); // Render the 'submit' view
});


app.post('/', function (request, response) {
    response.set('Content-Type', 'text/plain')
    const name = request.body.name;
    response.render('Hello', { title: 'Hello', name: name });
});

/* ************************************************ */
// The application is to listen on port number ...
const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log(`The server was started on port ${PORT}`);
    console.log('To stop the server, press "CTRL + C"');
});
