import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Accounts/auth.service';
import { OrderService } from 'src/app/services/Orders/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfiles: any = {};
  constructor(private UserProfile: OrderService) { }

  ngOnInit(): void {
    this.SingleUserProfileData();
  }

  SingleUserProfileData() {
    this.UserProfile.UserProfileData().subscribe(
      res => {
        this.userProfiles = res;
        console.log(this.userProfiles)

      })

  }

}

