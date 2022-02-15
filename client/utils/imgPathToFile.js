export async function urlToFile(imageURL) {
    const bucketName = imageURL.split('/')[3]
    const fileName = imageURL.split('/')[4]

    const file = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${fileName}?alt=media`)
        .then(res => res.blob())
        .then(blobFile => new File([blobFile], fileName, {type: blobFile.type}))
        
    return file
}