import { Component, OnInit, OnDestroy } from "@angular/core";
import { SubscribeService } from "../../shared/services/subscribe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactService } from "../../shared/services/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {

  process: boolean;
  contactForm: FormGroup;

  constructor(private readonly subscribeService: SubscribeService, private readonly contactService: ContactService, private readonly router: Router) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      message: new FormControl("", [Validators.required])
    });
  }


  sendmail = () => {
    window.localStorage.clear();
    this.process = true;
    const name = this.contactForm.get('name').value;
    const email = this.contactForm.get('email').value;
    const message = this.contactForm.get('message').value;
    this.contactService.sendMail(name, email, message).subscribe(x => {
      //console.log(x.message);
      //console.log(x);
      this.contactForm.reset();
      this.process = false;
      //this.router.navigate(['/contact']);

    });

  }
  get contact() { return this.contactForm.controls; }
}
