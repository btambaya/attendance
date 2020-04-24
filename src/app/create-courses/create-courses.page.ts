import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.page.html',
  styleUrls: ['./create-courses.page.scss'],
})
export class CreateCoursesPage implements OnInit {
  postForm: any;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, public toastController: ToastController, private menuCtrl: MenuController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.postForm = this.formBuilder.group({
      title: ["", [Validators.required,]],
      code: ["", [Validators.required]],
      credit_unit: ["", [Validators.required]],

    });
  }
  get f() {
    return this.postForm.controls;
  }
  async createCourse() {
    const loading = await this.loadingController.create({
      message: "Creating Course ",
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
    let courses = JSON.parse(localStorage.getItem('courses'));
    // console.log(this.postForm.value);

    courses.push(this.postForm.value);
    localStorage.setItem('courses', JSON.stringify(courses))
    this.presentToast()

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your course have been created.',
      duration: 2000,
      color: "success"
    });
    toast.present();
  }
}