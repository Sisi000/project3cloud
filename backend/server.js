const {format} = require('util');
const express = require('express');
const Multer = require('multer');
const sharp = require('sharp');

const {Storage} = require('@google-cloud/storage');

let keyFilename = "mykey.json";
// Instantiate a storage client
const storage = new Storage({ keyFilename });

const app = express();
app.use(express.json());

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
   limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket("project3-inc");


// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('image'), async(req, res, next) => {
 
  const blob = bucket.file(req.file.originalname);

  // Create a new blob in the bucket and upload the file data.
  const blobStream = blob.createWriteStream();
  
  blobStream.on('error', err => {
    next(err);
  
  });
  
  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });
  
  blobStream.end(req.file.buffer);

});


app.listen(8080, () => console.log("listening on port 8080"))