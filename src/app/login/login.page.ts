import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string
  postForm: any;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private menuCtrl: MenuController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.postForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }
  get f() {
    return this.postForm.controls;
  }
  async login() {
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
    loading.dismiss();
    localStorage.setItem('type', this.type)
    this.router.navigate(["courses"]);

  }
}
