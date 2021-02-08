const {google} = require('googleapis');
var googleAuth = require('google-auth-library');

const auth1 = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
const drive = google.drive({
    version: 'v3',
    auth: auth1
  });
  async function start() {
    const res = await drive.files.create({
        requestBody: {
        name: 'Test',
        mimeType: 'text/plain'
        },
        media: {
        mimeType: 'text/plain',
        body: 'Hello World'
        }
    });
}


start();