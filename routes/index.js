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
router.get('/', function(req, router_res, next) {
  const sheets = google.sheets({version: 'v4', auth: process.env.GOOGLE_API_KEY});
  var sheet_output = null;
  var graph_x = [];
  var graph_y = [];
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'A2:D100',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    sheet_output = res.data.values;
    if (sheet_output.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      sheet_output.map((row) => {
        console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`);
        graph_x.push(row[1]);
        graph_y.push(row[3]);
      });
      router_res.render('index', { title: 'Water Level Monitor', graph_x: graph_x.toString(), graph_y: graph_y.toString() });
    } else {
      console.log('No data found.');
    }
  });
});

module.exports = router;
