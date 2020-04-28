import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

declare let Email: any;
declare let QRious: any;
@Component({
  selector: 'app-course-options',
  templateUrl: './course-options.component.html',
  styleUrls: ['./course-options.component.scss'],
})
export class CourseOptionsComponent implements OnInit {
  userType: string;
  course: any;
  lecture: any;
  user: any;

  constructor(private navParams: NavParams, private popoverController: PopoverController, private barcodeScanner: BarcodeScanner) {
    this.userType = localStorage.getItem('type');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.lecture = navParams.get('lecture');
    this.course = navParams.get('course');

  }

  ngOnInit() {

  }
  sendQR() {
    let dets = JSON.stringify({ course: this.course, lecture: this.lecture });

    var qr = new QRious({
      value: dets,

    });
    let data = qr.toDataURL();
    console.log(data);

    Email.send({
      Host: 'smtp.mailgun.org',
      Username: 'postmaster@citizensraffle.org',
      Password: '6c6d6efbcc3e57a5b6bf4ef5a3ab3e1f-65b08458-ec1161c1',
      To: 'somto8000@gmail.com',
      From: `Nile University`,
      Subject: 'Your Lecture Attendance QRCode',
      Body: '<i>Below is the Qr code for attendance for your lecture holding on ${this.course.date}, ${this.course.time},  <br> <br> ${data} '
    }).then(message => {
      console.log('email sent');
    });

  }
  async attend() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.dismsiss(barcodeData)
    }).catch(err => {
      console.log('Error', err);
    });

  }
  async dismsiss(data) {
    await this.popoverController.dismiss(JSON.parse(data.text));
  }
}
