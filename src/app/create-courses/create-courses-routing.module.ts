import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCoursesPage } from './create-courses.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCoursesPageRoutingModule {}
