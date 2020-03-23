var express = require('express');
var cron = require("node-cron");
const https = require('https');
const { createAudio } = require('node-mp3-player')
const Audio = createAudio();

app = express();


// schedule tasks to be run on the server
cron.schedule("*/5 * * * * *", function () {

    console.log("running a task every 5 seconds");
  https.get('https://stores-api.zakaz.ua/stores/48201070/delivery_schedule/plan/?coords=50.43098990000001,30.5371437', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {

      let notify = !!(JSON.parse(data).flatMap(col => col.items).filter(i => i.is_open === true).length);
      if(notify === false){
        // const myFile = Audio('/Users/odash/Documents/Документы — Oleg\'s MacBook Pro/Projects/Projects/check-delivery/SoundHelix-Song-9.mp3')
        myFile.play() // plays the file
      }
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});

app.listen(3128);

