import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html',
  providers: [Items]
})
export class ListMasterPage {
  currentItems: any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.getEvents();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  doRefresh(refresh){
    setTimeout(() => {
      this.items.query().then(data => {
        this.currentItems = data;
      }); 
      refresh.complete();
     }, 1000);
  }

  getEvents() {
    this.items.query()
    .then(data => {
      this.currentItems = data;
    });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
        this.getEvents();
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(id, event) {
    this.items.delete(id);
    let index: number = this.currentItems.indexOf(event);
    this.currentItems.splice(index, 1);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
