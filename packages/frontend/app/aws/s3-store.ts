import AWS from 'aws-sdk';

process.env.AWS_PROFILE = 'frontend';

AWS.config.update({ region: 'eu-west-1' });

const s3 = new AWS.S3();

const getFileFromS3 = (filename: string): Promise<string> => {
    const params = {
        Bucket: 'aws-frontend-store',
        Key: filename,
    };

    // aws sdk implements retry/backoff behavior for us, see config values like:
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#maxRetries-property

    return s3
        .getObject(params)
        .promise()
        .then(data => {
            if (data.Body !== undefined) {
                return data.Body.toString();
            }
            throw Error('Failed to get data from S3');
        });
};

export { getFileFromS3 };
