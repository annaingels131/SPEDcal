import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Items } from '../../providers/providers';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
  providers: [Items]
})
export class TasksPage {
  student: any;
  calendar: any;
  today: any;
  day: any;
  allTasks = [
  {
    name:'Art and Crafts',
    in:false
  },
  {
    name:'Autism Class',
    in:false
  },
  {
    name:'Backpack Packup',
    in:false
  },
  {
    name:'Breakfast',
    in:false
  },
  {
    name:'Circle Time',
    in:false
  },
  {
    name:'Lunch',
    in:false
  },
  {
    name:'Therapy',
    in:false
  },
  {
    name:'PE',
    in:false
  },
  {
    name:'Potty',
    in:false
  },
  {
    name:'Reading',
    in:false
  },
  {
    name:'Recess',
    in:false
  },
  {
    name:'Screen Time',
    in:false
  },
  {
    name:'Sensory',
    in:false
  },
  {
    name:'Snack',
    in:false
  },
  {
    name:'Speech',
    in:false
  },
  {
    name:'Writing',
    in:false
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, public students: Items, public viewCtrl: ViewController
  ) {
    this.student = navParams.get('item');
    this.day = navParams.get('day')
    this.findTasks(navParams.get('item'));
  }

  // for loop that use .indexOf "name" change in bool in local arr obj
  findTasks(student) {
    for(let i=0; i<this.allTasks.length; i++) {
      let index = student.calendar[this.day].tasks.map(function(el) {
        return el.name.toLowerCase();
      }).indexOf(this.allTasks[i].name.toLowerCase());
      if(index > -1) {
        this.allTasks[i].in = true;
      }
    }
  }

  updateTasks() {
    for(let i=0; i<this.allTasks.length; i++) {
      let index = this.student.calendar[this.day].tasks.map(function(el) {
        return el.name.toLowerCase();
      }).indexOf(this.allTasks[i].name.toLowerCase());
      if (this.allTasks[i].in==true && index < 0) {
        this.student.calendar[this.day].tasks.push({name:this.allTasks[i].name, completed: false});
      } if (this.allTasks[i].in==false && index > -1) {
        this.student.calendar[this.day].tasks.splice(index,1);
      }
    }
    this.updateCal(this.student);
  }

  updateCal(student){
    this.students.updateCal(student, this.student._id);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
