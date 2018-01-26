import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { TodaysSchedulePage } from '../todays-schedule/todays-schedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  providers: [Items]
})
export class ItemDetailPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  item: any;
  form: FormGroup;
  student: any;
  calendar: any;
  calMonday: any;
  calTuesday: any;
  calWednesday: any;
  calThursday: any;
  calFriday: any;
  groups = [];

  percents = [
    {
      all:0,
      com:0
    },
    {
      all:0,
      com:0
    },
    {
      all:0,
      com:0
    },
    {
      all:0,
      com:0
    },
    {
      all:0,
      com:0
    }
  ];
  nums = [];

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public _teacher: User,
    public students: Items) {
      this.getStudentGroups(navParams.get('item'));
      this.student = navParams.get('item');
      this.item = navParams.get('item') || students.defaultItem;
      this.getTaskStatus();
      this.setPercents();
      // calls tasks for individual days
      this.calMonday = this.student.calendar[0].tasks;
      this.calTuesday = this.student.calendar[1].tasks;
      this.calWednesday = this.student.calendar[2].tasks;
      this.calThursday = this.student.calendar[3].tasks;
      this.calFriday = this.student.calendar[4].tasks;
  }

  _getAllGroupIndexes(arr, val) {
    let indexes = [], i, j;
    for(i=0; i < arr.length; i++){
      for(j=0; j < arr[i].members.length; j++)
        if (arr[i].members[j] === val)
          indexes.push(i);
    }
    return indexes;
  }

  getStudentGroups(student) {
    let all = this._teacher.getTeacher().groups;
    let locs = this._getAllGroupIndexes(all, student._id);
    for(let a=0; a<all.length; a++){
      if(all[a].members.indexOf(student._id)> -1)
        this.groups.push({id: all[a].id, name: all[a].name})
    }
    console.log(this.groups);
    return this.groups;
  }

  openItem(item: Item, day) {
     let modal = this.modalCtrl.create('TasksPage', {
       item: item, day: day
     });
     modal.present();
   }

  openSchedule(item: Item) {
    let modal = this.modalCtrl.create('TodaysSchedulePage', {
      item: this.item
    });
    modal.present();
    modal.onDidDismiss(() => {
      this.getTaskStatus();
      this.setPercents();
      this.ionViewDidLoad();
    });
  }

  resetCalendar() {
    for(let i=0; i<5; i++){
      for(let j=0; j<this.item.calendar[i].tasks.length; j++){
        this.item.calendar[i].tasks[j].completed = false;
      }
    }
    this.students.updateCal(this.item, this.item._id);
  }

  resetWeek() {
    this.resetCalendar();
    this.graphRefresh();
  }

  graphRefresh() {
    for(let i=0; i<5; i++){
      for(let j=0; j<this.item.calendar[i].tasks.length; j++){
        this.percents[i].all = this.item.calendar[i].tasks.length;
          this.percents[i].com=0;
      }
    }
    this.setPercents();
    this.ionViewDidLoad();
  }

  getTaskStatus() {
    this.resetTask();
    for(let i=0; i<5; i++){
      for(let j=0; j<this.item.calendar[i].tasks.length; j++){
        this.percents[i].all = this.item.calendar[i].tasks.length;
        if(this.item.calendar[i].tasks[j].completed){
          this.percents[i].com+=1;
        }
      }
    }
  }

  resetTask() {
    for(let i=0; i<5; i++){
      for(let j=0; j<this.item.calendar[i].tasks.length; j++){
        this.percents[i].all = this.item.calendar[i].tasks.length;
        this.percents[i].com=0;
      }
    }
  }

  setPercents() {
    this.nums=[];
    for(let l=0; l<this.percents.length;l++){
      this.nums.push((this.percents[l].com/this.percents[l].all)*100);
    }
  }

  updateCal(calendar){
    this.students.updateCal(calendar, this.student._id);
  }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [{
          label: 'Percentage done',
          data: [this.nums[0], this.nums[1], this.nums[2], this.nums[3], this.nums[4]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
    	     display: false
         },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              min: 0,
              max: 100,
              callback: function(value) {return value + "%"}
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage"
       }
          }]
        }
      }

    });
  }

  reorderIconsMonday(indexes) {
    let element = this.calMonday[indexes.from];
    this.calMonday.splice(indexes.from, 1);
    this.calMonday.splice(indexes.to, 0, element);
    this.students.updateCal(this.item, this.item._id);
  }
  reorderIconsTuesday(indexes) {
    let element = this.calTuesday[indexes.from];
    this.calTuesday.splice(indexes.from, 1);
    this.calTuesday.splice(indexes.to, 0, element);
    this.students.updateCal(this.item, this.item._id);
  }
  reorderIconsWednesday(indexes) {
    let element = this.calWednesday[indexes.from];
    this.calWednesday.splice(indexes.from, 1);
    this.calWednesday.splice(indexes.to, 0, element);
    this.students.updateCal(this.item, this.item._id);
  }
  reorderIconsThursday(indexes) {
    let element = this.calThursday[indexes.from];
    this.calThursday.splice(indexes.from, 1);
    this.calThursday.splice(indexes.to, 0, element);
    this.students.updateCal(this.item, this.item._id);
  }
  reorderIconsFriday(indexes) {
    let element = this.calFriday[indexes.from];
    this.calFriday.splice(indexes.from, 1);
    this.calFriday.splice(indexes.to, 0, element);
    this.students.updateCal(this.item, this.item._id);
  }
}