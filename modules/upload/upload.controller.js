const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
const publicUrl = process.env.PUBLIC_URL;

exports.uploadFile = async (req, res) => {
  const key = `${Date.now()}-${req.file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: "pos-system",
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  });
  await s3.send(command);
  const url = `${publicUrl}/${key}`;
  res.status(201).json({
    msg: "upload image successful!",
    url: url,
    key: key,
  });
  res.send("Upload file");
};

exports.deleteFile = async (req, res) => {
  const key = req.params.key;
  const command = new DeleteObjectCommand({
    Bucket: "pos-system",
    Key: key,
  });

  await s3.send(command);
  res.status(200).json({
    msg: "Image deleted successfull",
  });
};
