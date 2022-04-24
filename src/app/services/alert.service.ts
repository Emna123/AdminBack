import { Injectable } from '@angular/core';
import { NbToastrService, NbIconConfig } from '@nebular/theme';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastrService: NbToastrService) {
  }
  //show alert function
  showToast(message) {
    const iconConfig: NbIconConfig = { icon: "checkmark-circle-outline", pack: 'eva' };

    this.toastrService.show('', `${message}`, iconConfig);
  }
}
