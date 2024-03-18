import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, HttpClientModule, FileUploadModule, FormsModule, NgxExtendedPdfViewerModule],
  providers: [AppService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  file: any
  allFiles: any;
  createBucketName: any;
  chooseBucketName: any;
  chooseBucketNameToRead: any;
  chooseObjectNameToRead: any;
  chooseBucketFromDelete: any;
  chooseObjectToDelete: any;
  bucketName: any;
  allBuckets = [];
  allListsInBucket = [];
  objectFromBucketJpg: any;
  objectFromBucketText: any;
  objectFromBucketPdf: any;
  objectFromBucketDocx: any;
  objectFromBucketXlsx: any;
  objectFromBucketMp4: any;
  objectFromBucketMp3: any;


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
      this.allBuckets = data['bucketNames']
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

  chooseObjectNameToReadFunc(){

    let parts = this.chooseObjectNameToRead.split(".")

    for(let part of parts){
      switch(part){

        case "jpg": 
          this.appService.chooseObjectNameToReadFuncBlob(this.chooseBucketNameToRead, this.chooseObjectNameToRead).subscribe((data: Blob) =>{
          this.objectFromBucketText = false
          this.objectFromBucketDocx = false;
          this.objectFromBucketPdf = false;
          this.objectFromBucketXlsx = false;
          this.objectFromBucketMp4 = false;
          this.objectFromBucketMp3 = false;
          this.objectFromBucketJpg = URL.createObjectURL(data)
        })
        break;

        case "txt": 
        this.appService.chooseObjectNameToReadFuncText(this.chooseBucketNameToRead, this.chooseObjectNameToRead).subscribe((data: string) =>{
          this.objectFromBucketJpg = false;
          this.objectFromBucketText = data
          this.objectFromBucketDocx = false;
          this.objectFromBucketPdf = false;
          this.objectFromBucketXlsx = false;
          this.objectFromBucketMp4 = false;
          this.objectFromBucketMp3 = false;
        })

        break;

        case "pdf": 
          this.appService.chooseObjectNameToReadFuncBlob(this.chooseBucketNameToRead, this.chooseObjectNameToRead).subscribe((data: Blob) =>{
          this.objectFromBucketText = false
          this.objectFromBucketDocx = false;
          this.objectFromBucketXlsx = false;
          this.objectFromBucketMp4 = false;
          this.objectFromBucketJpg = false;
          this.objectFromBucketMp3 = false;
          this.objectFromBucketPdf = URL.createObjectURL(data)
        })
        break;

        case "mp4": 
        this.appService.chooseObjectNameToReadFuncBlob(this.chooseBucketNameToRead, this.chooseObjectNameToRead).subscribe((data: Blob) =>{
        this.objectFromBucketText = false
        this.objectFromBucketDocx = false;
        this.objectFromBucketPdf = false;
        this.objectFromBucketXlsx = false;
        this.objectFromBucketJpg = false
        this.objectFromBucketMp3 = false;
        this.objectFromBucketMp4 = URL.createObjectURL(data);
        })
        break;

        case "mp3": 
        this.appService.chooseObjectNameToReadFuncBlob(this.chooseBucketNameToRead, this.chooseObjectNameToRead).subscribe((data: Blob) =>{
        this.objectFromBucketText = false
        this.objectFromBucketDocx = false;
        this.objectFromBucketPdf = false;
        this.objectFromBucketXlsx = false;
        this.objectFromBucketMp4 = false
        this.objectFromBucketMp3 = URL.createObjectURL(data);
        this.objectFromBucketJpg = false
        })
        break;
      }
    }
  }
}
