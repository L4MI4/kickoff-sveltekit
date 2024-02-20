// Env Variables
import { PUBLIC_AWS_S3_BUCKET_NAME } from '$env/static/public';

// Typs
import { type RequestHandler } from '@sveltejs/kit';

// Utils
import { error, json } from '@sveltejs/kit';
import { s3 } from '$lib/server/storage';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { fileType, destinationDirectory } = await request.json();

    const fileName = crypto.randomBytes(16).toString('hex');

    const fil = {
      Bucket: PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `${destinationDirectory}/${fileName}`,
      ContentType: fileType
    };

    const command = new PutObjectCommand(fil);
    const url = await getSignedUrl(s3, command, { expiresIn: 60000 });

    return json({
      presignedUrl: url,
      fileName
    });
  } catch (err) {
    console.log(err);
  }

  error(500, 'Something went wrong');
};
