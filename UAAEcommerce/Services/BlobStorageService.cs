using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace UAAEcommerce.Services
{
    public class BlobStorageService
    {
        private readonly string blobStorageConnectionString;
        private readonly string blobPath;
        public BlobStorageService()
        {
            blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=ecommerceuaa;AccountKey=6aYxndfr3+YzMTaHpzQ4pRTZGCzINhTrfwARwzEuNnOmPvotMsmmLzmjmlNwaPh+OgQpWdxFFAzK27FMNWVQEw==;EndpointSuffix=core.windows.net";
            blobPath = "https://ecommerceuaa.blob.core.windows.net/";
        }

        private async Task<CloudBlockBlob> GetBlockBlob(string blobName, string containerName, bool isPublic = false)
        {
            var container = await GetBlobContainer(containerName, isPublic);
            return container.GetBlockBlobReference(blobName);
        }

        private async Task<CloudBlobContainer> GetBlobContainer(string name, bool isPublic = false)
        {
            var account = CloudStorageAccount.Parse(blobStorageConnectionString);
            var container = account.CreateCloudBlobClient().GetContainerReference(name);
            await container.CreateIfNotExistsAsync(isPublic ? BlobContainerPublicAccessType.Blob : BlobContainerPublicAccessType.Off, null, null);
            return container;
        }

        public async Task UploadStream(Stream stream, string blobName, string containerName, string contentType, bool isPublic = false)
        {
            await UploadStream(stream, blobName, containerName, contentType, new Dictionary<string, string>(), isPublic);
        }

        public string GetBlobUrl(string blobName, string containerName)
        {
            return $"{blobPath}{containerName}/{blobName}";
        }

        public async Task UploadStream(Stream stream, string blobName, string containerName, string contentType, IReadOnlyDictionary<string, string> metadata, bool isPublic = false)
        {
            var blob = await GetBlockBlob(blobName, containerName, isPublic);
            stream.Position = 0;
            blob.Properties.ContentType = contentType;
            blob.Properties.CacheControl = "public, max-age=604800";
            if (metadata != null && metadata.Any())
            {
                foreach (var data in metadata)
                {
                    if (blob.Metadata.ContainsKey(data.Key))
                    {
                        blob.Metadata[data.Key] = data.Value;
                    }
                    else
                    {
                        blob.Metadata.Add(data.Key, data.Value);
                    }
                }
            }

            await blob.UploadFromStreamAsync(stream, stream.Length);
        }
        public async Task<Stream> DownloadBlobAsStream(string blobName, string containerName)
        {
            var blob = await GetBlockBlob(blobName, containerName);
            var ms = new MemoryStream();
            await blob.DownloadToStreamAsync(ms);
            ms.Position = 0;
            return ms;
        }
    }
}