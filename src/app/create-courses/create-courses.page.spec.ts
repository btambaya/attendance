import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCoursesPage } from './create-courses.page';

describe('CreateCoursesPage', () => {
  let component: CreateCoursesPage;
  let fixture: ComponentFixture<CreateCoursesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCoursesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
