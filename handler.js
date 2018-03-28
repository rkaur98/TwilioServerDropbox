'use strict';
let AWS = require('aws-sdk'),
    s3 = new AWS.S3(),
    documentClient = new AWS.DynamoDB.DocumentClient(); 


const accountSid = 'SID_TWILIO';
const authToken = 'TOKEN_TWILIO';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

module.exports.filestrack = (event, context, callback) => {
  
  let params = {
    TableName : "dropbox-file-table1"
  };
  
  documentClient.scan(params, function(err, data){
    if (err) callback(err, null);
    else callback(null, data);
    
  });

};


module.exports.postprocess = (event) => {
  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const filesize = record.s3.object.size;
    const eventtime = record.eventTime;
    const eventname = record.eventName;
    const date = eventtime.substr(0, 10);
    const time = eventtime.substr(11,8);
    const event = eventname.split(":");

    let notify = "Null";

    if(event[0] == "ObjectCreated"){
      notify = 'Notification from Twilio: ' + filename + " added to S3 bucket";
    }
    else{
      notify = 'Notification from Twilio: ' + filename + " deleted from S3 bucket";
    }
    

    const params = {
      TableName: 'dropbox-file-table1',
      Item: {
        "fileName" : filename,
        "filesize": filesize,
        "eventtime": time,
        "Date": date,
        "eventname": event[0]
      }
    }

    documentClient.put(params, (err, data) => {
      
      console.log("data updated")
    })

    client.messages.create({        
        to: '+17789520032',
        from: '+16042451612',
        body: notify
    }).then((message) => console.log(message.sid));

  });
};
