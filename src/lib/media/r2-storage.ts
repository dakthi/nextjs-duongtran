import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
const bucketName = process.env.R2_BUCKET_NAME
const publicBaseUrl = process.env.R2_PUBLIC_URL

export const r2Client = new S3Client({
  region: process.env.R2_REGION || "auto",
  endpoint: accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined,
  credentials: {
    accessKeyId: accessKey || "",
    secretAccessKey: secretKey || "",
  },
})

export function isR2Configured(): boolean {
  return Boolean(accountId && accessKey && secretKey && bucketName)
}

export async function uploadToR2(
  key: string,
  buffer: Buffer,
  contentType: string,
  metadata?: Record<string, string>
): Promise<{ key: string; url: string }> {
  if (!isR2Configured()) {
    throw new Error("R2 storage is not configured")
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    Metadata: metadata,
  })

  await r2Client.send(command)

  const url = publicBaseUrl
    ? `${publicBaseUrl.replace(/\/$/, "")}/${key}`
    : await getSignedUrl(r2Client, new GetObjectCommand({ Bucket: bucketName, Key: key }), { expiresIn: 60 * 60 * 24 * 7 })

  return { key, url }
}

export async function deleteFromR2(key: string): Promise<void> {
  if (!isR2Configured()) {
    throw new Error("R2 storage is not configured")
  }

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  await r2Client.send(command)
}

export function generateR2Key(filename: string, folder: string = "uploads"): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, "_")
  return `${folder}/${timestamp}_${random}_${sanitized}`
}

export function extractKeyFromUrl(url: string): string | null {
  if (!url) return null

  if (publicBaseUrl && url.startsWith(publicBaseUrl)) {
    return url.replace(`${publicBaseUrl.replace(/\/$/, "")}/`, "")
  }

  try {
    const parsed = new URL(url)
    const parts = parsed.pathname.split("/")
    if (parts.length > 2) {
      return parts.slice(2).join("/")
    }
  } catch (error) {
    console.error("Failed to parse R2 URL", error)
  }

  return null
}
