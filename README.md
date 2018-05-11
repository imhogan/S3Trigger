# S3Trigger
A simple Node.js Lambda function to create an S3 File which can trigger an S3 Event. This allows for a long running lambda process to be triggered by brief synchronous call from the front end.

See https://github.com/imhogan/RESTFetcher/tree/master/Samples/Qrvey3 and https://s3-ap-southeast-2.amazonaws.com/au-com-thinkronicity-opencode-apse2/CloudFormation/au-com-thinkronicity-RESTFetcher-Sample-Qrvey3-3-apigateway-v1.0.1.template for an example which uses this. 