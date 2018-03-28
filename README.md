# TwilioServerDropbox

Created mini dropbox using S3, DynamoDB and Serverless framework.

If a new file is added or deleted to/from S3 bucket a record of this is added to DynamoDB database and message is send to phone number via Twilio.

API link to track record in database: https://208qln7b45.execute-api.us-east-2.amazonaws.com/dev/filestrack-endpoint


![screenshot_20180328-130534](https://user-images.githubusercontent.com/24903839/38053908-339b0bde-328a-11e8-972e-97622cdd2f07.png)
