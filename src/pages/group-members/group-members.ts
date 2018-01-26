import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Groups } from '../../providers/providers';
/**
 * Generated class for the GroupMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-members',
  templateUrl: 'group-members.html',
  providers: [Groups]
})
export class GroupMembersPage {
  group: any;
  tempMembers = [];
  students: any;
  allGroups: any;
  teacherID: any;

  constructor(public navCtrl: NavController, public _class: User, public navParams: NavParams, private _teacher: Groups, public viewCtrl: ViewController) {
    this.group =  navParams.get('group');
    this.allGroups = navParams.get('allGroups');
    this.temp(navParams.get('currentItems'));
    this.students = navParams.get('currentItems');
    this.teacherID = _class.getTeacher()._id;
  }

  ionViewDidLoad() {

  }

  temp(students) {
    for(let j=0; j<students.length; j++) {
      this.tempMembers.push({student: students[j]});
      let index = this.group.members.indexOf(students[j]._id);
      if(index > -1) {
        this.tempMembers[j]['in'] = true;
      } else {
        this.tempMembers[j]['in'] = false;
      }
    }
    return this.tempMembers;
  }

  updateGroup(temp) {
    let updatedMembers = [];
    for(let a=0; a<temp.length; a++) {
      if(temp[a].in) {
        updatedMembers.push(temp[a].student._id);
      }
    }
    this.saveGroup(updatedMembers);
  }

  saveGroup(newGroup) {
    let loc = this.allGroups.map(function(el) {
      return el.id;
    }).indexOf(this.group.id);
    this.allGroups[loc].members = newGroup;
    let tempTeacher = this._class.getTeacher();
    tempTeacher.groups = this.allGroups;
    this._class.setTeacher(tempTeacher);
    this._teacher.updateGroups(this.allGroups, this.teacherID);
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
