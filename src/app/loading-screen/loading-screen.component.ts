import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from '../shared/services/loading-screen/loading-screen.service';


@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading: any = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {

  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
      (value) => {
        console.log('loading', value);
        this.loading = value;
      },
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
