import https from 'https';

https.get('https://ibb.co/bZ4n26R', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="(.*?)"/);
    if (match) {
      console.log(match[1]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', (err) => {
  console.log(err.message);
});
