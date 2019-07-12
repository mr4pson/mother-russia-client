import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubscriberService } from '../_services/subscriber.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  subscribeFormShow: boolean = false;
  email: string;
  onPopupClose(event) {
    this.subscribeFormShow = event.active;
  }
  subscribeForm = new FormGroup({
    email: new FormControl('')
  });
  constructor(
    private subscriberService: SubscriberService
  ) { }

  ngOnInit() {
  }
  onSubscribe() {
    this.subscriberService.createItem('/subscribe/?email='+this.subscribeForm.value['email']).subscribe(
      result => {
        this.email = '';
        this.subscribeFormShow = true;
      }, 
      error => {
        console.log("Error in recieving data");
      }
    );
  }
}
