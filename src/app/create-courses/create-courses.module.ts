import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCoursesPageRoutingModule } from './create-courses-routing.module';

import { CreateCoursesPage } from './create-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCoursesPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [CreateCoursesPage]
})
export class CreateCoursesPageModule { }
