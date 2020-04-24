import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CourseOptionsComponent } from './course-options/course-options.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  userType: any;
  coursesD: any = [{
    title: "Introduction to Programming",
    code: "CSC 102",
    credit_unit: "3"
  },
  {
    title: "Object Oriented Programming",
    code: "CSC 203",
    credit_unit: "3"
  },
  {
    title: "Relational Databases",
    code: "CSC 403",
    credit_unit: "4"
  }
  ];
  courses: any;
  load: any;
  constructor(private router: Router, private popoverController: PopoverController) {
    let courses = JSON.parse(localStorage.getItem('courses'));
    this.load = JSON.parse(localStorage.getItem('load'));
    if (this.load == null) {
      this.load = [];
    }
    if (courses == null) {
      this.courses = this.coursesD;
      localStorage.setItem('courses', JSON.stringify(this.coursesD))
    }
    else {
      this.courses = courses
    }
  }

  ngOnInit() {
    this.userType = localStorage.getItem('type')
    console.log(this.userType);
  }
  createCourse() {
    this.router.navigate(['create-courses'])
  }
  addCourse() {
    this.router.navigate(['add-course'])
  }
  calculateAttendance(course) {
    let attended = 0

    course.forEach(element => {
      if (element.status == true)
        attended++
    });

    let per = attended / course.length * 100;
    return per
  }
  async presentPopover(code, ev: any) {
    const popover = await this.popoverController.create({
      component: CourseOptionsComponent,
      componentProps: {
        code: code
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
