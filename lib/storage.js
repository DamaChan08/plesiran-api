const {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
	r2AccessKey,
	r2Bucket,
	r2SecretKey,
	r2Endpoint,
} = require("#config/vars");
const { fileMimeType } = require("#utils/helper");

const _s3Client = new S3Client({
	region: "auto",
	endpoint: r2Endpoint,
	credentials: {
		accessKeyId: r2AccessKey,
		secretAccessKey: r2SecretKey,
	},
});

const putObject = async (key, body) => {
	const command = new PutObjectCommand({
		Bucket: r2Bucket,
		Key: key,
		Body: body,
	});
	return await _s3Client.send(command);
};

const getUrlSigned = async (key) => {
	return getSignedUrl(
		_s3Client,
		new GetObjectCommand({
			Bucket: r2Bucket,
			Key: key,
		}),
		{
			expiresIn: 300,
		},
	);
};

const generateUploadUrl = async (key) => {
	const mimeType = fileMimeType?.get(
		"." + key?.split(".")?.pop()?.toLowerCase(),
	);
	if (!mimeType) {
		throw new Error("Invalid file type");
	}

	const command = new PutObjectCommand({
		Bucket: r2Bucket,
		Key: key,
		ContentType: mimeType,
	});
	return await getSignedUrl(_s3Client, command, { expiresIn: 300 });
};

module.exports = { putObject, getUrlSigned, generateUploadUrl };
