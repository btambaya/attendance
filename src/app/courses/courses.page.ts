import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { PopoverController, NavController } from '@ionic/angular';
// import { CourseOptionsComponent } from './course-options/course-options.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  userType: any;
  courses: any = [{
    id: 1,
    title: "Introduction to Programming",
    code: "CSC 102",
    credit_unit: "3",
    lecturer_id: 182001,
    lectures: [
      { id: 1, attendance: [], date: "24-05-2020", time: "9am", venue: "A115", status: true, },
      { id: 2, attendance: [], date: "22-05-2020", time: "9am", venue: "A302", status: false },
      { id: 3, attendance: [], date: "19-05-2020", time: "9am", venue: "B304", status: true },
      { id: 4, attendance: [], date: "17-05-2020", time: "9am", venue: "B324", status: true },
    ]
  },
  {
    id: 2,
    title: "Object Oriented Programming",
    code: "CSC 203",
    credit_unit: "3",
    lecturer_id: 182002,
    attendance: [],
    lectures: [
      { id: 1, attendance: [], date: "23-05-2020", time: "9am", venue: "A115", status: true },
      { id: 2, attendance: [], date: "21-05-2020", time: "9am", venue: "A302", status: false },
      { id: 3, attendance: [], date: "17-05-2020", time: "9am", venue: "B304", status: true },
      { id: 4, attendance: [], date: "15-05-2020", time: "9am", venue: "B324", status: true },
    ]

  },
  {
    id: 3,
    title: "Relational Databases",
    code: "CSC 403",
    credit_unit: "4",
    lecturer_id: 182003,
    attendance: [],
    lectures: [
      { id: 1, attendance: [], date: "20-05-2020", time: "9am", venue: "A115", status: true },
      { id: 2, attendance: [], date: "18-05-2020", time: "9am", venue: "A302", status: false },
      { id: 3, attendance: [], date: "14-05-2020", time: "9am", venue: "B304", status: true },
      { id: 4, attendance: [], date: "12-05-2020", time: "9am", venue: "B324", status: true },
    ]
  }
  ];

  load: any;
  myCourses: any;
  user: any;
  type: any;
  constructor(private router: Router, private nav: NavController, private popoverController: PopoverController) {
    let courses = JSON.parse(localStorage.getItem('courses'));
    this.load = JSON.parse(localStorage.getItem('load'));
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.type = JSON.parse(localStorage.getItem('type'));
    if (this.load == null) {
      this.load = [];
    }
    if (courses == null) {
      this.myCourses = this.courses;
      localStorage.setItem('courses', JSON.stringify(this.courses))
    }
    else {
      this.courses = courses
      this.myCourses = courses
    }
  }

  ngOnInit() {
    console.log(this.user);

    this.userType = localStorage.getItem('type')
    console.log(this.userType);
    if (this.userType == 'staff')
      this.myCourses = this.courses.filter(course => course.lecturer_id == this.user.id);
    if (this.userType == 'student')
      this.myCourses = this.courses.filter(course => this.user.courses.includes(course.id));


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
      if (element.attendance.includes(this.user.id))
        attended++
    });

    let per = attended / course.length * 100;
    return per
  }

  openCourse(course) {
    let navigationExtras: NavigationExtras = {
      state: {
        course: course
      }
    };
    this.nav.navigateForward(['/course-details'], navigationExtras)

  }
}
