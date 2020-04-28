import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseDetails'
})
export class CourseDetailsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
