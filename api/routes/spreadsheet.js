const { GoogleSpreadsheet } = require('google-spreadsheet');
var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    console.log('hiihhi')

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd');
doc.useServiceAccountAuth(require('./credentials.json'), function (err) {

    // Get all of the rows from the spreadsheet.
    doc.getRows(1, function (err, rows) {
      console.log(rows);
    })
 });

})
module.exports = router;

