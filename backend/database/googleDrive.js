const Cloud = require('@google-cloud/storage');
const path = require('path');

const serviceKey = path.join(__dirname, './cloud-storage.key.json');

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'iron-wave-294200',
});

(async () => {
    let bucket = storage.bucket("exitium-files");
    let b = bucket.file("test").save("asdf");
    
    console.log("asdf");
})();

