import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../shared/services/toast/toast.service';
import { Subscription } from 'rxjs';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  faTimes = faTimes;
  toastSubscription: Subscription;
  toast: any = {
    active: false,
    message: '',
    type: '',
  };

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService.toastStatus.subscribe(
      /* istanbul ignore next */
      (value) => {
        this.toast = value;
      },
    );
  }

  close() {
    this.toastService.dismiss();
  }

  iconHandler(type: any) {
    return type === 'success' ? faCheck : faExclamationTriangle;
  }
}
