const express = require('express');
const multer = require('multer');
const path = require('path');
const docxToPdf = require('docx-pdf');

const app = express();

app.use(express.static("uploaded"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploaded");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/docxtopdf", upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files uploaded.");
    }

    const processFile = (index) => {
        if (index >= req.files.length) {
            res.status(200).send("Files converted successfully");
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
            processFile(index + 1);
        });
    };

    processFile(0);
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.code === 'FILE_TYPE_ERROR') {
        res.status(400).send(err.message);
    } else {
        res.status(500).send('Something went wrong.');
    }
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});