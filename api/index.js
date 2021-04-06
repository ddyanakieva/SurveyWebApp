require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.API_PORT || 8080;
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => 
    res.send('File upload API ready for use'));
app.listen(port, () => 
    console.log(`File uploader API listening on port ${port}`));


// writing to firebase storage
const { Storage } = require('@google-cloud/storage');
// Create new storage instance with Firebase project credentials
const firebaseStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
// Create a bucket associated to Firebase storage bucket
const firebaseBucket = firebaseStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

// Initiating a memory storage engine to store files as Buffer objects
const firebaseUploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 512 * 512, // keep images size < 5 MB
    },
});

// Upload endpoint to send file to Firebase storage bucket
// change 'image' to something more meaningful
app.post('/api/upload', firebaseUploader.single('image'), async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send('Error, could not upload file');
        return;
      }
  
      // Create new blob in the bucket referencing the file
      const blob = firebaseBucket.file(req.file.originalname);
  
      // Create writable stream and specifying file mimetype
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
        // settings
        // If there's an error
        blobStream.on('error', (err) => next(err));
        // If all is good and done
        blobStream.on('finish', () => {
            // Assemble the file public URL
            // encodeURI - to cover cases where the file name had whitespaces or other characters needing to be encoded
            const publicUrl = 
            `https://firebasestorage.googleapis.com/v0/b/${firebaseBucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            // Return the file name and its public URL
            // for you to store in your own database
            res.status(200).send({ 
                fileName: req.file.originalname,
                fileLocation: publicUrl
            });
        });
        // When there is no more data to be consumed from the stream the end event gets emitted
        blobStream.end(req.file.buffer);

    } catch (error) {
      res.status(400).send(`Error, could not upload file: ${error}`);
      return;
    }
  });
  
  app.listen(port, () =>
    console.log(`File uploader API listening on port ${port}`)
  );
