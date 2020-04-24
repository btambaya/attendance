import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private toastController: ToastController) { }

  async presentToastWithOptions(text, duration, color) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      color: color,
      duration: duration
      // buttons: [
      //   {
      //     side: 'start',
      //     icon: 'star',
      //     text: 'Favorite',
      //     handler: () => {
      //       console.log('Favorite clicked');
      //     }
      //   }, {
      //     text: 'Done',
      //     role: 'cancel',
      //     handler: () => {
      //       console.log('Cancel clicked');
      //     }
      //   }
      // ]
    });
    toast.present();
  }
}
