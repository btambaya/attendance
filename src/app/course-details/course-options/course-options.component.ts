import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
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

  constructor(private navParams: NavParams, private qrScanner: QRScanner) {
    this.userType = localStorage.getItem('type');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.lecture = navParams.get('lecture');
    this.course = navParams.get('course');

  }

  ngOnInit() {

  }
  sendQR() {
    let dets = { course: this.course, lecture: this.lecture, student: this.user.id }

    var qr = new QRious({
      value: 'https://github.com/neocotic/qrious'
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
  attend() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }
}
