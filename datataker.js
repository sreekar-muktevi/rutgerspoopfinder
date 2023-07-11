const http = require('https');

function getTranslocData(whichdata) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'transloc-api-1-2.p.rapidapi.com',
      port: null,
      path: `/${whichdata}.json?agencies=1323`,
      headers: {
        'X-RapidAPI-Key': '2db6175e9bmsh7aab84ab1852e64p1da0cdjsnd0476b706254',
        'X-RapidAPI-Host': 'transloc-api-1-2.p.rapidapi.com'
      }
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.on('error', function (err) {
      reject(err);
    });

    req.end();
  });
}

// Usage
const whichdata = "arrival-estimates";

getTranslocData(whichdata)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
