const express = require('express');
const multer = require('multer');
const path = require('path');
const docxToPdf = require('docx-pdf');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const UserModel = require('./app/model/user');
const UserRoute = require('./app/routes/User')
const UserController = require('./app/controllers/User');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
app.use('/user',UserRoute)
app.use(express.static("uploaded"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploaded");
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/[-:]/g, ''); // Use ISO format without separators
        cb(null, timestamp + '_' + file.originalname);
    },
});


const upload = multer({
    storage: storageConfig,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();
        if (extname !== '.docx') {
            const err = new Error('Only .docx files are allowed');
            err.code = 'FILE_TYPE_ERROR';
            return cb(err);
        }
        cb(null, true);
    }
});


// MongoDB Connection URI
const uri = 'mongodb://localhost:27017/webka';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


// Middleware to check if user is logged in
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "register.html"));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//conversion
app.post("/docxtopdf", upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded.");
    }

    const convertedFiles = [];

    const processFile = (index) => {
        if (index >= req.files.length) {
            res.status(200).send(convertedFiles);
            return;
        }

        const file = req.files[index];
        const outputFilepath = path.join("converted", Date.now() + "_" + file.originalname.replace(/\.docx$/, ".pdf"));

        docxToPdf(file.path, outputFilepath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Conversion failed.");
                return;
            }

            console.log(`File ${file.originalname} converted to PDF`);
            convertedFiles.push(outputFilepath);
            processFile(index + 1);
        });
    };

    processFile(0);
});

//download
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, filename);
    res.download(filePath);
});

app.use('/users', UserRoute);
app.post('/register', UserController.create);
app.post('/login', UserController.login);

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
