console.log('Loading function');

var AWS = require('aws-sdk'); 

var s3 = new AWS.S3(); 


/**
 * Provide an event that contains the following keys:
 *
 *   - bucketname: the bucket name for the operation
 *   - keyname: the key name for the object
 *   - extension: extension for the object - will be prefixed with . if it exists
 *   - filetext: text string to write to the file
 *   - contentType: file content type
 *   - successMessage: message for success - optional
 *   - failMessage: message for fail - optional
 */
exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('Received context:', JSON.stringify(context, null, 2));
    
    var keyname = event.keyname+(event.extension?'.'+event.extension:'');

    var result = { 
         err: null
        ,success: "Successfully uploaded data to s3://"+event.bucketname+"/"+keyname
    };

    var params = {
         Bucket: event.bucketname
        ,Key: keyname
        ,Body: event.filetext
        ,ContentType: event.contentType
    };

    s3.putObject(params, function(err, data) {

      if (err) {       
          console.log(err);  
          
          if (event.failMessage) {
            result.err = event.failMessage;
          }
          else {
              result.err = err;
          }
      }
      else {   
        console.log(result.success);   
        if (event.successMessage) {
            result.success = event.successMessage;
        }
      }
        
    context.done(result.err, result.success);
   });
};