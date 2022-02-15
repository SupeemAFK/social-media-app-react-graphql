const path = require('path');
const { Storage } = require("@google-cloud/storage");

const gc = new Storage({
    keyFilename: path.join(__dirname, "../social-app-338108-e4e7bb3d6d1f.json"),
    projectId: "social-app-338108"
})

const bucket = gc.bucket("social-app-files");

const uploadImage = (file) => new Promise((resolve, reject) =>{
    const { createReadStream, filename } = file
    createReadStream()
    .pipe(
        bucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true
        })
    )
    .on("error", (err) => reject(err))
    .on("finish", resolve(`https://storage.googleapis.com/${bucket.name}/${filename}`))
});

const uploadBlob = (blob) => new Promise((resolve, reject) =>{
    const filename = blob.filename
    const readStream = blob.stream();
    const writeStream = bucket.file(filename).createWriteStream({ resumable: false, gzip: true })
    readStream
    .pipe(writeStream)
    .on("error", (err) => reject(err))
    .on("finish", resolve(`https://storage.googleapis.com/${bucket.name}/${filename}`))
});

module.exports = { uploadImage, uploadBlob }