const Cloud = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, './cloud-storage.key.json');

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'iron-wave-294200',
});

const upload = (async (fileData,fileName) => {
    let bucket = storage.bucket("exitium-files");
    let b = bucket.file(fileName).save(fileData);
    
    console.log("asdf");
});

const retriveURL = 1;

exports.upload = upload;
exports.retriveURL = retriveURL;