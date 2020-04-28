import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CourseOptionsComponent } from './course-options/course-options.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  course: any;
  staff: any;
  students: any;
  currentStaff: any;
  regStudents: any;
  userType: any;
  user: any;
  courses: any;

  constructor(private route: ActivatedRoute, private popoverController: PopoverController, private router: Router) {
    this.students = JSON.parse(localStorage.getItem('students'));
    this.staff = JSON.parse(localStorage.getItem('staff'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userType = localStorage.getItem('type');
    let courses = JSON.parse(localStorage.getItem('courses'));
    this.courses = courses
    console.log(this.courses);

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let course = this.router.getCurrentNavigation().extras.state.course;
        this.course = course;
        console.log(course);

      }
    });
    this.currentStaff = this.staff.filter(staff => this.course.lecturer_id == staff.id);
    this.regStudents = this.students.filter(student => student.courses.includes(this.course.id));

    console.log(this.currentStaff);

  }
  async presentPopover(cdata, ev: any) {
    const popover = await this.popoverController.create({
      component: CourseOptionsComponent,
      componentProps: {
        course: this.course.id,
        lecture: cdata.id
      },
      event: ev,
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    popover.onDidDismiss().then(data => {
      if (data.data != undefined) {

        console.log(data);
        let att = data.data
        console.log(att);
        cdata.attendance.push(this.user.id);

        // let att =  JSON.parse(data.text)
        this.courses.forEach(el => {
          if (el.id == att.course) {
            console.log(el);

            el.lectures.forEach(element => {
              if (element.id == att.lecture) {
                console.log(el);

                element.attendance.push(this.user.id);
              }
            });
          }
        });

        localStorage.setItem('courses', JSON.stringify(this.courses));
      }
    });
    return await popover.present();
  }
  calculateAttendance(course) {
    let attended = 0


    let per = course.attendance.length / this.regStudents.length * 100;
    return per
  }
  calculateStudentAttendance(course) {
    return course.attendance.includes(this.user.id);
  }

}
