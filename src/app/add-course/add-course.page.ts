import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { AlertController, ToastController } from '@ionic/angular';
import { ToolService } from '../tool.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {
  searchControl: any;
  filteredItems: any;
  courses: any;
  load: any;


  constructor(private alertController: AlertController, private tools: ToolService, private toastController: ToastController) {
    this.courses = JSON.parse(localStorage.getItem('courses'));
    this.searchControl = new FormControl();
    let load = JSON.parse(localStorage.getItem('load'));
    if (load == null) {
      this.load = [];
    }
    else {
      this.load = load
    }
  }

  ngOnInit() {
    this.setFilteredItems("");

    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }
  setFilteredItems(searchTerm) {
    this.filteredItems = this.filterItems(searchTerm);
  }
  filterItems(searchTerm) {
    return this.courses.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  async addCourse(course) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Add this course to your course load?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            course.lectures = [
              { date: "24-04-2020", time: "9am", venue: "A115", status: true },
              { date: "22-04-2020", time: "9am", venue: "A302", status: false },
              { date: "19-04-2020", time: "9am", venue: "B304", status: true },
              { date: "17-04-2020", time: "9am", venue: "B324", status: true },
            ]
            this.load.push(course);
            localStorage.setItem('load', JSON.stringify(this.load));
            this.tools.presentToastWithOptions("Course added to your load", 500, 'success');

          }
        }
      ]
    });

    await alert.present();
  }

}