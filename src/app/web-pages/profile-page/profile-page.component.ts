import { Component } from '@angular/core';

type activeTab = "editProfile" | "updatePin" | "changePassword" | "setImage" | "updateImage";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent {

  switchTabs: string = "editProfile";

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }
}
