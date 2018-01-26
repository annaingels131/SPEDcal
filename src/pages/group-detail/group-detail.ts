import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { Group } from '../../models/group';
import { Groups } from '../../providers/providers';
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { TodaysSchedulePage } from '../todays-schedule/todays-schedule';
import { GroupMembersPage } from '../group-members/group-members';
/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
  providers: [Groups, Items],
})
export class GroupDetailPage {
  group: any;
  students: any;
  members = [];
  item: any;
  allGroups: any;

  constructor(
    public navCtrl: NavController,
    public groups: Groups,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
  ) {
      this.group = navParams.get('group') || 0;
      this.students = navParams.get('currentItems');
      this.allGroups = navParams.get('allGroups');
      this.getMembers(navParams.get('currentItems'));
  }

  ionViewDidLoad() {
  }

  getMembers(students){
    for(let i=0; i<students.length; i++) {
      if(this.group.members.indexOf(students[i]._id) > -1) {
        this.members.push(students[i]);
      }
    }
    return this.members;
  }

  openSchedule(student: Item) {
    let modal = this.modalCtrl.create('TodaysSchedulePage', {
      item: student
    });
    modal.present();
    modal.onDidDismiss(() => {

    });
  }

  editGroup() {
    let modal = this.modalCtrl.create('GroupMembersPage', {
      currentItems: this.students, group: this.group, allGroups: this.allGroups
    });
    modal.present();
    modal.onDidDismiss(() => {
      this.viewCtrl.dismiss();
    });
  }



}
