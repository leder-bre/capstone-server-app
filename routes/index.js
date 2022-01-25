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
  var graph_x = [];
  var graph_y = [];
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
        graph_x.push(formattedDate);
        graph_y.push(row[3]);
      });
      router_res.render('index', { title: 'Water Level Monitor', graph_x: graph_x.toString(), graph_y: graph_y.toString() });
    } else {
      console.log('No data found.');
    }
  });
});

module.exports = router;
