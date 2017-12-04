import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { TodaysSchedulePage } from '../todays-schedule/todays-schedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  providers: [Items]
})
export class ItemDetailPage {
  @ViewChild('barCanvas') barCanvas;

  barChart: any;
  iconsMonday = [];
  iconsTuesday = [];
  iconsWednesday =[];
  iconsThursday = [];
  iconsFriday = [];
  item: any;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    students: Items) {
      this.item = navParams.get('item') || students.defaultItem;
      console.log('data', students.query());

      //generates number place hold on itemReorder
      for (let x=0; x <10; x++){
        this.iconsMonday.push(x)
        this.iconsTuesday.push(x)
        this.iconsWednesday.push(x)
        this.iconsThursday.push(x)
        this.iconsFriday.push(x)

    }
  }

  openItem() {
        let modal = this.modalCtrl.create('TasksPage');
        console.log("working");
        modal.present();
      }

  openSchedule() {
            let modal = this.modalCtrl.create('TodaysSchedulePage');
            console.log("working");
            modal.present();
          }

  ionViewDidLoad() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [{
          label: 'Percentage done',
          data: [100, 90, 30, 80, 50],
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
    let element = this.iconsMonday[indexes.from];
    this.iconsMonday.splice(indexes.from, 1);
    this.iconsMonday.splice(indexes.to, 0, element);
    console.log("Monday", indexes)
  }
  reorderIconsTuesday(indexes) {
    let element = this.iconsTuesday[indexes.from];
    this.iconsTuesday.splice(indexes.from, 1);
    this.iconsTuesday.splice(indexes.to, 0, element);
    console.log("Tuesday", indexes)
  }
  reorderIconsWednesday(indexes) {
    let element = this.iconsWednesday[indexes.from];
    this.iconsWednesday.splice(indexes.from, 1);
    this.iconsWednesday.splice(indexes.to, 0, element);
    console.log("Wednesday", indexes)
  }
  reorderIconsThursday(indexes) {
    let element = this.iconsThursday[indexes.from];
    this.iconsThursday.splice(indexes.from, 1);
    this.iconsThursday.splice(indexes.to, 0, element);
    console.log("Thursday", indexes)
  }
  reorderIconsFriday(indexes) {
    let element = this.iconsFriday[indexes.from];
    this.iconsFriday.splice(indexes.from, 1);
    this.iconsFriday.splice(indexes.to, 0, element);
    console.log("friday", indexes)
  }

}
