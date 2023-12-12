import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../services/main.service';
import { TopicService } from '../services/topic.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  contentTypes: string[] = ['Type 1', 'Type 2', 'Type 3'];
  programCourses: string[] = ['Course 1', 'Course 2', 'Course 3'];
  branches: string[] = ['Branch 1', 'Branch 2', 'Branch 3'];
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3'];
  subjects:any;
  topics:any
  allowDownload: boolean = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private mainService:MainService, private topicService: TopicService) { }


  formData = {
    programCourse: '',
    branch: '',
    semester: '',
    subjectTitle: '',
    subject:'',
    topic: '',
    title:'',
    contentType:'',
    allowDownload:"No"
  }
  ngOnInit() {
    
    this.getAllSubjects();
    
  }
  getAllSubjects(){
    this.mainService.getSubjects().subscribe((result)=>{
      this.subjects=result;
      console.log(result)
    })
  }

  getDataByTopics(id:any){
    console.log("id",id);
    this.topicService.getTopics(id).subscribe((result)=>{
    this.topics=result;
    console.log(result);
    })
  }
 
  submit() {
    
    this.arrangeData();
    this.mainService.saveAll(this.formData).subscribe(
      (response) => {
        console.log('Upload successful:', response);
        this.refreshPage();
      },
      (error) => {
        this.refreshPage();
      
      }
    );
  }
  updateAllowDownload(checked: boolean) {
    this.formData.allowDownload = checked ? 'Yes' : 'No';
  }
  refreshPage() {
    window.location.href = window.location.href;
  }

  arrangeData(){
    let sub;
    for(let i=0;i<this.subjects.length;i++){
        if(this.subjects[i].subjectId == this.formData.subject){
          sub = this.subjects[i].subjectTitle;
          break;
        }
    }
 
    this.formData.subjectTitle=sub;
   //console.log(this.formData);
  }
  }


