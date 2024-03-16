import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, HttpClientModule, FileUploadModule, FormsModule],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  file: any
  allFiles: any;
  createBucketName: any;
  chooseBucketName: any;
  chooseBucketFromDelete: any;
  chooseObjectToDelete: any;
  bucketName: any;
  allBuckets = [];
  allListsInBucket = [];

  constructor(private appService: AppService) {}
  ngOnInit(): void {}

  createBucketAndUploadFile(event){
    const formData = new FormData();
    formData.append('file', this.file); // Use 'file' as the key

    this.appService.createBucketAndUploadFile(formData, this.createBucketName).subscribe(data =>{
      console.log(data)
    })
  }

  UploadFile(event){
    const formData = new FormData();
    formData.append('file', this.file); // Use 'file' as the key

    this.appService.createBucketAndUploadFile(formData, this.bucketName).subscribe(data =>{
      console.log(data)
    })
  }

  uploadFileInBucket(event: any){
    this.file = event.target.files[0];
  }

  getAllBuckets(){
    this.appService.getAllBuckets().subscribe(data =>{
      this.allBuckets = data['allbuckets']
    })
  }

  getAllListsInBucket(){
    this.appService.getAllListsInBucket(this.chooseBucketName).subscribe(data =>{
      this.allListsInBucket = data['allListsInBucket']
    })
  }

  deleteObjectFromBucket(){
    this.appService.deleteObjectFromBucket(this.chooseBucketFromDelete, this.chooseObjectToDelete).subscribe(data =>{
      this.allListsInBucket = data['allListsInBucket']
    })
  }
}
