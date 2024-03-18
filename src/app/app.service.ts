import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  createBucketAndUploadFile(uploadFile, bucketName){
    return this.httpClient.post(`http://localhost:3000/uploads/${bucketName}`,  uploadFile)
  }

  getAllBuckets(){
    return this.httpClient.get("http://localhost:3000/gridStorage")
  }

  getAllListsInBucket(bucketName){
    return this.httpClient.get(`http://localhost:3000/gridStorage/${bucketName}`)
  }

  deleteObjectFromBucket(chooseBucketFromDelete, chooseObjectToDelete){
    return this.httpClient.delete(`http://localhost:3000/gridStorage/${chooseBucketFromDelete}/${chooseObjectToDelete}`)
  }

  chooseObjectNameToReadFuncBlob(chooseBucketNameToRead, chooseObjectNameToRead){
    return this.httpClient.get(`http://localhost:3000/gridStorage/${chooseBucketNameToRead}/${chooseObjectNameToRead}`, {
      responseType: 'blob'
    })
  }

  chooseObjectNameToReadFuncText(chooseBucketNameToRead, chooseObjectNameToRead){
    return this.httpClient.get(`http://localhost:3000/gridStorage/${chooseBucketNameToRead}/${chooseObjectNameToRead}`, {
      responseType: 'text'
    })
  }
}
