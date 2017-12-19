import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  defaultItem: any = {  
  };
  data: any = [];
  teacher: any;

  constructor(public api: Api) { 
    this.teacher = {};
  }

  query(params?: any) {

    if (params) {

      return new Promise(resolve => {
        this.api.get('students', params)
          .map(res => {
            console.log("param",res);
            return res;
          })
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
      
    } else {

      return new Promise(resolve => {
        this.api.get('students')
          .map(res => {
            console.log(res);
            return res;
          })
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });

    }

  }

  updateCal(student: Item, id) {
    this.api.post('students/cal', student, id)
    .subscribe(data => {
      console.log(data);
   }, error => {
     console.log(error); 
   });
  }

  add(student: Item) {
    this.api.post('new/student', student)
    .subscribe(data => {
       console.log(data);
    }, error => {
      console.log(error); 
    });
  }

  delete(student: string) {
    this.api.delete('remove/student', student)
    .subscribe(data => {
       console.log(data);
    }, error => {
      console.log(error); 
    });
  }

}
