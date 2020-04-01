var express = require('express');
var router = express.Router();
var fetch=require('node-fetch')

/* GET users listing. */
router.get('/',async function(req, res, next) {
    const response = await fetch('https://api.covid19india.org/state_district_wise.json', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const body = await response.json();
    console.log(body['Tamil Nadu'].districtData)
    districtwise={}
    try{
        districtwise.Erode=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Chennai=body['Tamil Nadu'].districtData.Chennai.confirmed
        districtwise.Kancheepuram=body['Tamil Nadu'].districtData.Kancheepuram.confirmed
        districtwise.Coimbatore=body['Tamil Nadu'].districtData.Coimbatore.confirmed
        districtwise.Tirunelveli=body['Tamil Nadu'].districtData.Tirunelveli.confirmed
        districtwise.Tiruppur=body['Tamil Nadu'].districtData.Tiruppur.confirmed
        districtwise.Madurai=body['Tamil Nadu'].districtData.Madurai.confirmed
        districtwise.Salem=body['Tamil Nadu'].districtData.Salem.confirmed
        districtwise.Vellore=body['Tamil Nadu'].districtData.Vellore.confirmed
        districtwise.Tiruchirappalli=body['Tamil Nadu'].districtData.Tiruchirappalli.confirmed
        districtwise.Chengalpattu=body['Tamil Nadu'].districtData.Chengalpattu.confirmed
        districtwise.Thanjavur=body['Tamil Nadu'].districtData.Thanjavur.confirmed
        districtwise.Virudhunagar=body['Tamil Nadu'].districtData.Virudhunagar.confirmed
        districtwise.Karur=body['Tamil Nadu'].districtData.Karur.confirmed
        districtwise.Tiruvannamalai=body['Tamil Nadu'].districtData.Tiruvannamalai.confirmed
        districtwise.Vilupram=body['Tamil Nadu'].districtData.Vilupram.confirmed
        districtwise.Namakkal=body['Tamil Nadu'].districtData.Namakkal.confirmed
        districtwise.Kanniyakumari=body['Tamil Nadu'].districtData.Kanniyakumari.confirmed
        districtwise.Thoothukudi=body['Tamil Nadu'].districtData.Thoothukudi.confirmed
        districtwise.Dharmapuri=body['Tamil Nadu'].districtData.Dharmapuri.confirmed
        districtwise.Cuddalore=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Dindigul=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Nagapattinam=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Perambalur=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Ariyalur=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Pudukkottai=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Ramanathapuram=body['Tamil Nadu'].districtData.Erode.confirmed
        districtwise.Sivaganga=body['Tamil Nadu'].districtData.Erode.confirmed

    }
    catch(e){
        console.log(e)
    }
 
    var data=[{
        "id": "IN.TN.ER",
        "value": districtwise.Erode
      },
      {
        "id": "IN.TN.DI",
        "value": districtwise.Dindigul
      }, ,
      {
        "id": "IN.TN.CU",
        "value": districtwise.Cuddalore
      },
      {
        "id": "IN.TN.CO",
        "value":districtwise.Coimbatore
      },
      {
        "id": "IN.TN.DH",
        "value": districtwise.Dharmapuri
      },
      {
        "id": "IN.TN.TP",
        "value":districtwise.Tiruppur
      },
      {
        "id": "IN.TN.MA",
        "value": districtwise.Madurai
      },
      {
        "id": "IN.TN.NG",
        "value": districtwise.Nagapattinam
      },
      {
        "id": "IN.TN.NM",
        "value": districtwise.Namakkal
      },
      {
        "id": "IN.TN.PE",
        "value": districtwise.Perambalur
      },
      {
        "id": "IN.TN.AR",
        "value": districtwise.Ariyalur
      },
      {
        "id": "IN.TN.PU",
        "value": districtwise.Pudukkottai
      },
      {
        "id": "IN.TN.RA",
        "value": districtwise.Ramanathapuram
      },
      {
        "id": "IN.TN.SA",
        "value": districtwise.Salem
      },
      {
        "id": "IN.TN.SI",
        "value": districtwise.Sivaganga
      },
      {
        "id": "IN.TN.TJ",
        "value": districtwise.Thanjavur
      },
      {
        "id": "IN.TN.NI",
        "value": districtwise.Nilgris
      },
      {
        "id": "IN.TN.TH",
        "value": districtwise.Theni
      },
      {
        "id": "IN.TN.TL",
        "value": districtwise.Tirunelveli
      },
      {
        "id": "IN.TN.CH",
        "value": districtwise.Chennai
      },
      {
        "id": "IN.TN.TR",
        "value": districtwise.Tiruvarur
      },
      {
        "id": "IN.TN.TK",
        "value": districtwise.Thoothukudi
      },
      {
        "id": "IN.TN.TC",
        "value": districtwise.Tiruchirappalli
      },
      {
        "id": "IN.TN.TI",
        "value": districtwise.Tirunelveli
      },
      {
        "id": "IN.TN.TV",
        "value": districtwise.Tiruvannamalai
      },
      {
        "id": "IN.TN.VE",
        "value": districtwise.Vellore
      },
      {
        "id": "IN.TN.VL",
        "value": districtwise.Vilupram
      },
      {
        "id": "IN.TN.VR",
        "value": districtwise.Virudhunagar
      },
      {
        "id": "IN.TN.KC",
        "value": districtwise.Kanchipuram
      },
      {
        "id": "IN.TN.KI",
        "value": districtwise.Krishnagiri
      },
      {
        "id": "IN.TN.KR",
        "value": districtwise.Karur
      },
      {
        "id": "IN.TN.KK",
        "value": districtwise.Kanniyakumari
      }
    ]
  res.send(data)
});

module.exports = router;
