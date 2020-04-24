import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  postForm: any;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, private menuCtrl: MenuController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.postForm = this.formBuilder.group({
      name: ["", [Validators.required,]],
      email: ["", [Validators.required, Validators.email]],
      regNo: ["", [Validators.required]],
      department: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }
  get f() {
    return this.postForm.controls;
  }
  async register() {
    const loading = await this.loadingController.create({
      message: "Logging in",
      duration: 3000
    });

    await loading.present();
    this.submitted = true;
    // this.showMsg = false;
    console.log(this.postForm.value);
    if (this.postForm.invalid) {
      console.log("invalid");
      // this.submitted = false;
      loading.dismiss();

      return;
    }

  }
}
