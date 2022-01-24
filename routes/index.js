var express = require('express');
var router = express.Router();

require('dotenv').config();

const csv = require('csv-parser')
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { request } = require('http');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/* GET home page. */
router.get('/', function(req, res, next) {
  const sheets = google.sheets({version: 'v4', auth: process.env.GOOGLE_API_KEY});
  var sheet_output = null;
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'A1:D100',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    sheet_output = res.data.values;
    if (sheet_output.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      sheet_output.map((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`);
      });
    } else {
      console.log('No data found.');
    }
  });

  
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
    res.render('index', { title: 'Water Level Monitor' });
});

module.exports = router;
