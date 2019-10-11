import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toast = {
    active: false,
    message: '',
    type: '',
    handler: () => {},
  };
  toastStatus = new Subject();
  timeout;

  get toast(): any {
    return this._toast;
  }

  set toast(value) {
    this._toast = value;
    this.toastStatus.next(value);
  }

  present({
    message,
    duration = 3000,
    type = 'success',
    handler = () => {},
  }) {
    this.toast = {
      active: true,
      message,
      type,
      handler,
    };
    this.timeout = setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  dismiss() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.toast = {
      active: false,
      message: '',
      type: '',
      handler: () => {},
    };
  }
}
