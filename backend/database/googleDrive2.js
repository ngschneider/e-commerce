const {JWT} = require('google-auth-library');
const keys = require('./credentials.json');

async function main() {

  const client = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({url});

  console.log(res.data);
}

main().catch(console.error);