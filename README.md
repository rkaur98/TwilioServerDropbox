# TwilioServerDropbox

Created mini dropbox using S3, DynamoDB and Serverless framework.

If a new file is added or deleted to/from S3 bucket a record of this is added to DynamoDB database and message is send to phone number via Twilio.

API link to track record in database: https://208qln7b45.execute-api.us-east-2.amazonaws.com/dev/filestrack-endpoint
