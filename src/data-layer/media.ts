"use server";

import { auth } from "@/utils/auth";
import { generateUniqueFileName } from "@/utils/generate-unique-file-name";
import prisma from "@/utils/prisma";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { redirect } from "next/navigation";

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
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

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

export const removeMediaFiles = async ({
  shopId,
  mediaFiles,
  productId,
}: {
  shopId: number;
  mediaFiles: number[];
  productId: number;
}): Promise<void> => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  if (!shopId) {
    throw new Error("shopId is required");
  }

  const mediaFileUrls = await prisma.media.findMany({
    where: {
      id: {
        in: mediaFiles,
      },
    },
    select: {
      url: true,
    },
  });

  const deleteProductConnection = prisma.productMedia.deleteMany({
    where: {
      productId,
      mediaId: {
        in: mediaFiles,
      },
    },
  });

  const deleteMediaFiles = prisma.media.deleteMany({
    where: {
      shopId,
      id: {
        in: mediaFiles,
      },
    },
  });

  await prisma.$transaction([deleteProductConnection, deleteMediaFiles]);

  const keysToDelete = mediaFileUrls.map((m) => ({
    Key: m.url.split("/").pop()!,
  }));

  const deleteObjectsCommand = new DeleteObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: keysToDelete,
      Quiet: true,
    },
  });

  await s3.send(deleteObjectsCommand);
};
