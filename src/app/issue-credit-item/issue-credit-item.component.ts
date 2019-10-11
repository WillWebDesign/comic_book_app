import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { ToastService } from '../shared/services/toast/toast.service';
import { LoadingScreenService } from '../shared/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-issue-credit-item',
  templateUrl: './issue-credit-item.component.html',
  styleUrls: ['./issue-credit-item.component.scss'],
})
export class IssueCreditItemComponent implements OnInit {
  @Input() creditType: any;
  @Input() creditId: any;
  @Input() creditPrefix: any;

  credit: any;

  constructor(
    public http: HttpService,
    public toast: ToastService,
    public loading: LoadingScreenService,
  ) {}

  ngOnInit() {
    this.getIssueCredits(
      this.creditType,
      this.creditId,
      this.creditPrefix,
    );
  }
  getIssueCredits(
    creditType: string,
    creditId: string,
    creditPrefix: string,
  ) {
    const id = `${creditPrefix}-${creditId}`;
    const path = `${creditType}/${id}/`;
    const data = {
      format: 'json',
    };
    this.loading.startLoading();
    this.http.get(path, data).subscribe(
      (res: any) => {
        this.loading.stopLoading();
        this.credit = res.results;
      },
      (err) => {
        this.loading.stopLoading();
        this.toast.present({
          message: 'Oops, something went wrong. try again!',
          type: 'error',
        });
        console.error(err);
      },
    );
  }
}
