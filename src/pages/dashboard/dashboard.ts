import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListMasterPage} from '../list-master/list-master';


@IonicPage()
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  teacher: any;
  constructor(
    public navCtrl: NavController, public navParams: NavParams
  ){

  }

  openStudents() {
    this.navCtrl.push('ListMasterPage');
  }

  openGroups() {
    this.navCtrl.push('GrouplistPage');
  }


}
