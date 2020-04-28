import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailsPageRoutingModule } from './course-details-routing.module';

import { CourseDetailsPage } from './course-details.page';
import { CourseOptionsComponent } from './course-options/course-options.component';
import { AttendanceComponent } from './attendance/attendance.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailsPageRoutingModule
  ],
  declarations: [CourseDetailsPage, CourseOptionsComponent, AttendanceComponent],
  bootstrap: [CourseOptionsComponent, AttendanceComponent]
})
export class CourseDetailsPageModule { }
