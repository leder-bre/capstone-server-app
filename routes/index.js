var express = require('express');
var router = express.Router();

const csv = require('csv-parser')
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  // const results = [];

  // fs.createReadStream('./public/DB_V2.csv')
  //   .pipe(csv())
  //   .on('data', (data) => results.push(data))
  //   .on('end', () => {
  //     console.log('csv parsed');
  //     var timestamps = [];
  //     var values = [];
  //     for (row in results) {
  //       timestamps.push(results[row]['TIME']);
  //       values.push(results[row]['VALUE']);
  //     }
  //     console.log(timestamps);
  //     console.log(values);
      
  //   });
    res.render('index', { title: 'Express' });
});

module.exports = router;
