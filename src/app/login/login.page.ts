import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToolService } from '../tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string
  postForm: any;
  submitted: boolean;
  students: any = [{
    "id": 16113001,
    "first_name": "Ahmed",
    "last_name": "Tambaya",
    "email": "btambaya@gmail.com",
    "gender": "Male",
    "level": 3,
    "courses": [
      1, 2, 3
    ],
    "password": "password"
  }, {
    "id": 16113002,
    "first_name": "Glyn",
    "last_name": "Blanch",
    "email": "gblanch1@tuttocitta.it",
    "gender": "Male",
    "level": 3,
    "courses": [
      1, 3
    ],
    "password": "password"
  }, {
    "id": 16113003,
    "first_name": "Amelita",
    "last_name": "Fingleton",
    "email": "afingleton2@blogspot.com",
    "gender": "Female",
    "level": 1,
    "courses": [
      1, 2
    ],
    "password": "3MK3Ldgb"
  }, {
    "id": 16113004,
    "first_name": "Curtice",
    "last_name": "Chancelier",
    "email": "cchancelier3@blogtalkradio.com",
    "gender": "Male",
    "level": 2,
    "courses": [
      2, 3
    ],
    "password": "1tPs5Mfm"
  }, {
    "id": 16113005,
    "first_name": "Yehudi",
    "last_name": "Bowhay",
    "email": "ybowhay4@wisc.edu",
    "gender": "Male",
    "level": 2,
    "courses": [
      1, 2, 3
    ],
    "password": "e0SpJdg4"
  }, {
    "id": 16113006,
    "first_name": "Thomas",
    "last_name": "Gosnold",
    "email": "tgosnold5@chron.com",
    "gender": "Male",
    "level": 1,
    "courses": [
      1, 2
    ],
    "password": "KsE7mmMrKJ"
  }, {
    "id": 16113007,
    "first_name": "Fields",
    "last_name": "Aggott",
    "email": "faggott6@wikimedia.org",
    "gender": "Male",
    "level": 4,
    "courses": [
      1, 3
    ],
    "password": "4JqA4E"
  }, {
    "id": 16113008,
    "first_name": "Virgilio",
    "last_name": "Tremontana",
    "email": "vtremontana7@issuu.com",
    "gender": "Male",
    "level": 4,
    "courses": [
      2, 3
    ],
    "password": "yup0PN81q"
  }, {
    "id": 16113009,
    "first_name": "Jo-anne",
    "last_name": "Jillett",
    "email": "jjillett8@home.pl",
    "gender": "Female",
    "level": 4,
    "courses": [
      1, 2
    ],
    "password": "YmDkZu7neT"
  }, {
    "id": 16113010,
    "first_name": "Osborn",
    "last_name": "Dumpleton",
    "email": "odumpleton9@t.co",
    "gender": "Male",
    "level": 3,
    "courses": [
      1, 2, 3
    ],
    "password": "OsW48oelf"
  }];
  staff = [{
    "id": 182001,
    "first_name": "Mallissa",
    "last_name": "Orleton",
    "email": "morleton0@usnews.com",
    "password": "c0kL4h"
  }, {
    "id": 182002,
    "first_name": "Eldon",
    "last_name": "Napoli",
    "email": "enapoli1@admin.ch",
    "password": "lWw6QIsS9Mt"
  }, {
    "id": 182003,
    "first_name": "Beatriz",
    "last_name": "Duetschens",
    "email": "bduetschens2@slate.com",
    "password": "JcAicx"
  }]
  constructor(private formBuilder: FormBuilder, private router: Router, private tool: ToolService, private menuCtrl: MenuController, private loadingController: LoadingController) {
    let user = localStorage.getItem('user')
    let student = localStorage.getItem('students')
    let staff = localStorage.getItem('staff')
    if (user) {
      this.router.navigate(["courses"]);
    }

    if (!staff) {
      localStorage.setItem('staff', JSON.stringify(this.staff))
    }
    if (!student) {
      localStorage.setItem('students', JSON.stringify(this.students))
    }



  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.postForm = this.formBuilder.group({
      id: ["", [Validators.required]],
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

    let user;
    let student;
    let staff;
    student = this.students.filter(stu => stu.id == this.postForm.value.id && stu.password == this.postForm.value.password)
    staff = this.staff.filter(staff => staff.id == this.postForm.value.id && staff.password == this.postForm.value.password)

    if (student.length != 0) {
      localStorage.setItem('user', JSON.stringify(student[0]));
      localStorage.setItem('type', 'student')
      this.tool.presentToastWithOptions('Login successful', 500, 'success');
      this.router.navigate(["courses"]);


    } else if (staff.length != 0) {
      localStorage.setItem('user', JSON.stringify(staff[0]));
      localStorage.setItem('type', 'staff')
      this.tool.presentToastWithOptions('Login successful', 500, 'success');
      this.router.navigate(["courses"]);

    } else {
      this.tool.presentToastWithOptions('Incorrect ID or pasword', 500, 'danger');
      return
    }

    // localStorage.setItem('type', this.type)

  }
}
