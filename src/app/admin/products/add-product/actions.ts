"use server";

import { generateUniqueFileName } from "@/utils/generate-unique-file-name";
import prisma from "@/utils/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Product } from "@prisma/client";

// TODO: Implement next auth
// import { auth } from "@/auth"

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

const maxFileSize = 1024 * 1024 * 10; // 10MB

export const getSignedURL = async (
  type: string,
  size: number,
  checksum: string,
) => {
  // TODO: Check auth
  // const session = await auth()
  // if (!session) {
  //    return { failure: "Not authenticated" }
  // }
  //
  //

  if (!acceptedTypes.includes(type)) {
    return { failure: "Invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "File too large" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: generateUniqueFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      // TODO: Change to shopId of current shop
      shopId: "1",
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 });

  const newMediaRef = await prisma.media.create({
    data: {
      type: type.startsWith("image") ? "image" : "video",
      url: signedUrl.split("?")[0],
      shopId: 1,
    },
  });

  return { success: { url: signedUrl, mediaId: newMediaRef.id } };
};

export const addProduct = async (
  data: Omit<Product, "id"> & { mediaId?: number },
) => {
  const newProduct = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      draft: data.draft,
      shopId: data.shopId,
      categoryId: data.categoryId,
    },
  });

  if (data.mediaId !== undefined && newProduct) {
    const productId = newProduct.id;

    await prisma.productMedia.create({
      data: {
        productId,
        mediaId: data.mediaId,
      },
    });
  }
};
