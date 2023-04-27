const {
  ListObjectsCommand,
  S3Client,
  CopyObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  ListBucketsCommand,
} = require('@aws-sdk/client-s3')
const {
  S3_BUCKET,
  S3_REGION,
  S3_KEY,
  S3_PRIVATE,
  S3_ENDPOINT,
  S3_PUBLIC_ENDPOINT,
} = require('./constants')

class S3 {
  constructor() {
    this.bucketName = S3_BUCKET
    this.s3Client = new S3Client({
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_KEY,
        secretAccessKey: S3_PRIVATE,
      },
      endpoint: S3_ENDPOINT,
    })
  }

  async sendMedia({ folder, body, fileName, tag, ext }) {
    const link = `${folder}/${fileName}.${ext}`

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          ACL: 'public-read',
          Key: link,
          Body: body,
          Tagging: 'roadcast=' + tag,
        })
      )
      return `${S3_PUBLIC_ENDPOINT.replace(
        'BUCKETNAME',
        this.bucketName
      )}/${link}`
    } catch (e) {
      return e
    }
  }

  async deleteMedia(link) {
    const Key = link.replace(
      `${S3_PUBLIC_ENDPOINT.replace('BUCKETNAME', this.bucketName)}/`,
      ''
    )
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key,
        })
      )
      return true
    } catch (e) {
      return e
    }
  }

  async findOrCreateBucket() {
    const Name = this.bucketName
    try {
      const { Buckets } = await this.s3Client.send(new ListBucketsCommand({}))
      const bucketIsExist = Buckets.find((bucket) => bucket.Name === Name)
      if (!bucketIsExist) {
        await this.s3Client.send(new CreateBucketCommand({ Bucket: Name }))
      }
    } catch (e) {
      throw new Error(e)
    }
    return Name
  }

  async getAllFiles() {
    try {
      const { Contents } = await this.s3Client.send(
        new ListObjectsCommand({
          Bucket: this.bucketName,
        })
      )
      return Contents
    } catch (e) {
      throw new Error(e)
    }
  }
  async CopyBucket(BucketOrigin, BucketDestination) {
    try {
      const { Contents } = await this.s3Client.send(
        new ListObjectsCommand({
          Bucket: BucketOrigin,
        })
      )
      for (const file of Contents) {
        await this.s3Client.send(
          new CopyObjectCommand({
            Bucket: BucketDestination,
            CopySource: `${BucketOrigin}/${file.Key}`,
            Key: file.Key,
            ACL: 'public-read',
          })
        )
      }
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = { S3 }
