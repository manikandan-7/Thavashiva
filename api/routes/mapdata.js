var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data=[{
        "id": "IN.TN.ER",
        "value": "432"
      },
      {
        "id": "IN.TN.DI",
        "value": "120"
      }, ,
      {
        "id": "IN.TN.CU",
        "value": "0"
      },
      {
        "id": "IN.TN.CO",
        "value": "0"
      },
      {
        "id": "IN.TN.DH",
        "value": "0"
      },
      {
        "id": "IN.TN.TP",
        "value": "0"
      },
      {
        "id": "IN.TN.MA",
        "value": "0"
      },
      {
        "id": "IN.TN.NG",
        "value": "0"
      },
      {
        "id": "IN.TN.NM",
        "value": "0"
      },
      {
        "id": "IN.TN.PE",
        "value": "0"
      },
      {
        "id": "IN.TN.AR",
        "value": "0"
      },
      {
        "id": "IN.TN.PU",
        "value": "0"
      },
      {
        "id": "IN.TN.RA",
        "value": "0"
      },
      {
        "id": "IN.TN.SA",
        "value": "0"
      },
      {
        "id": "IN.TN.SI",
        "value": "0"
      },
      {
        "id": "IN.TN.TJ",
        "value": "0"
      },
      {
        "id": "IN.TN.NI",
        "value": "0"
      },
      {
        "id": "IN.TN.TH",
        "value": "0"
      },
      {
        "id": "IN.TN.TL",
        "value": "0"
      },
      {
        "id": "IN.TN.CH",
        "value": "0"
      },
      {
        "id": "IN.TN.TR",
        "value": "0"
      },
      {
        "id": "IN.TN.TK",
        "value": "0"
      },
      {
        "id": "IN.TN.TC",
        "value": "0"
      },
      {
        "id": "IN.TN.TI",
        "value": "0"
      },
      {
        "id": "IN.TN.TV",
        "value": "0"
      },
      {
        "id": "IN.TN.VE",
        "value": "0"
      },
      {
        "id": "IN.TN.VL",
        "value": "0"
      },
      {
        "id": "IN.TN.VR",
        "value": "0"
      },
      {
        "id": "IN.TN.KC",
        "value": "0"
      },
      {
        "id": "IN.TN.KI",
        "value": "70"
      },
      {
        "id": "IN.TN.KR",
        "value": "0"
      },
      {
        "id": "IN.TN.KK",
        "value": "0"
      }
    ]
  res.send(data)
});

module.exports = router;
