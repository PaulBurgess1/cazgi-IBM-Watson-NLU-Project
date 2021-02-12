const express = require('express');
const app = new express();
//Step 3
const dotenv =require('dotenv');
dotenv.config()

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
//Step 3 end

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    //return res.send({"happy":"90","sad":"10"});
    const emotionURL = {
        'url': req.query.url,
        'features': {
        'emotion': {
        'limit': 5
        }
    }//
    };//JSON
    let iNLU = getNLUInstance();
    iNLU.analyze(emotionURL)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });
});//url emotion

app.get("/url/sentiment", (req,res) => {
   const sentimentURL = {
        'url': req.query.url,
        'features': {
        'sentiment': {
        }
    }//
    };//JSON
    let iNLU = getNLUInstance();
    iNLU.analyze(sentimentURL)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});//url sentiment

app.get("/text/emotion", (req,res) => {
    const emotionTXT = {
        'text': req.query.text,
        'features': {
        'emotion': {
        'limit': 5
        }
    }//
    };//JSON
    let iNLU = getNLUInstance();
    iNLU.analyze(emotionTXT)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });

});//text emotion

app.get("/text/sentiment", (req,res) => {
    //return res.send("text sentiment for "+req.query.text);
    const sentimentTXT = {
        'text': req.query.text,
        'features': {
        'sentiment': {
        }
    }//
    };//JSON
    let iNLU = getNLUInstance();
    iNLU.analyze(sentimentTXT)
        .then(analysisResults => {
            //console.log(JSON.stringify(analysisResults, null, 2));
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error:', err);
        });
});//text senti

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
