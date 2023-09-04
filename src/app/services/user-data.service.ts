import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  displayedUsers: { firstName: string, lastName: string, userName: string, imageFromDb: string | null }[] = [];
  // chatInitiated: boolean = false;

  constructor() { }

  // addUser(user: { firstName: string, lastName: string, userName: string, imageFromDb: string | null, chatInitiated: boolean }) {
  //   var userExits = this.displayedUsers.some(x => x.firstName === user.firstName && x.lastName === user.lastName && x.userName === user.userName);
  //   if (!userExits) {
  //     this.chatInitiated ? this.displayedUsers.push(user) : this.displayedUsers.splice(0, 1, user);
  //   }
  // }

  addUser(user: { firstName: string, lastName: string, userName: string, imageFromDb: string | null}) {
    var userExits = this.displayedUsers.some(
      x => x.firstName === user.firstName 
      && x.lastName === user.lastName 
      && x.userName === user.userName);
    if (!userExits) {
      this.displayedUsers.splice(0, 1, user);
    }
  }
}
