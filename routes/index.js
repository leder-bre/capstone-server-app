var express = require('express');
var router = express.Router();

require('dotenv').config();

const csv = require('csv-parser')
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { request } = require('http');
const moment = require('moment');

const currentFormatString = "MM/DD/YYYY hh:mm:ss";
const newFormatString     = "YYYY-MM-DD hh:mm:ss";

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

/* GET home page. */
router.get('/', function(req, router_res, next) {
  const sheets = google.sheets({version: 'v4', auth: process.env.GOOGLE_API_KEY});
  var sheet_output = null;
  var graph1_x = [];
  var graph1_y = [];
  var graph2_x = [];
  var graph2_y = [];
  var graph3_x = [];
  var graph3_y = [];
  sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'A2:D',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    sheet_output = res.data.values;
    if (sheet_output.length) {
      // Print columns A to D, and map corresponding output into array
      sheet_output.map((row) => {
        // console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}`); // uncomment to see GSheets info printed out
        var formattedDate = moment(row[1], currentFormatString).format(newFormatString); // format from GSheets format to Plotly format
        console.log("Row2:" + row[2].toString())
        if (row[2].toString() == '1') {
          console.log('1 ran')
          graph1_x.push(formattedDate);
          graph1_y.push(row[3]);
        } else if (row[2].toString() == '2') {
          graph2_x.push(formattedDate);
          graph2_y.push(row[3]);
        } else if (row[2].toString() == '3') {
          graph3_x.push(formattedDate);
          graph3_y.push(row[3]);
        } else {
          console.log("Invalid row in spreadsheet")
        }
      });
      router_res.render('index', { title: 'Water Level Monitor', graph1_x: graph1_x.toString(), graph1_y: graph1_y.toString(), graph2_x: graph2_x.toString(), graph2_y: graph2_y.toString(), graph3_x: graph3_x.toString(), graph3_y: graph3_y.toString() });
    } else {
      console.log('No data found.');
    }
  });
});

module.exports = router;
