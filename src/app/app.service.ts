import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  createBucketAndUploadFile(uploadFile, bucketName){
    return this.httpClient.post(`http://localhost:3000/createBucketAndUploadFile/${bucketName}`,  uploadFile)
  }

  getAllBuckets(){
    return this.httpClient.get("http://localhost:3000/getAllBuckets")
  }

  getAllListsInBucket(bucketName){
    return this.httpClient.get(`http://localhost:3000/getAllListsInBucket/${bucketName}`)
  }

  deleteObjectFromBucket(chooseBucketFromDelete, chooseObjectToDelete){
    return this.httpClient.delete(`http://localhost:3000/deleteObjectFromBucket/${chooseBucketFromDelete}/${chooseObjectToDelete}`)
  }
}
