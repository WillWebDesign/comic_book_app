import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/services/http/http.service';
import { ToastService } from '../shared/services/toast/toast.service';
import { LoadingScreenService } from '../shared/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
})
export class IssueDetailComponent {
  issueData: any;
  issueCreditsRequired = [
    {
      credit: 'character_credits',
      creditName: 'character',
      name: 'characters',
      prefix: '4005',
    },
    {
      credit: 'team_credits',
      creditName: 'team',
      name: 'teams',
      prefix: '4060',
    },
    {
      credit: 'location_credits',
      creditName: 'location',
      name: 'locations',
      prefix: '4020',
    },
  ];

  constructor(
    public route: ActivatedRoute,
    public http: HttpService,
    public toast: ToastService,
    public loading: LoadingScreenService,
  ) {
    const issueId = this.route.snapshot.paramMap.get('id');
    this.getIssueData(issueId);
  }

  getIssueData(issueId) {
    const path = `issue/${issueId}/`;
    const data = {
      format: 'json',
    };
    this.http.get(path, data).subscribe((res: any) => {
      this.issueData = res.results;
    });
  }

  emptyCredits() {
    let accum = 0;
    this.issueCreditsRequired.map(
      (issueCredit) => {
        this.issueData[issueCredit.credit].length
          ? accum++
          : (accum = accum);
      },
      (err: any) => {
        this.loading.stopLoading();
        this.toast.present({
          message: 'Oops, something went wrong. try again!',
          type: 'error',
        });
        console.error(err);
      },
    );
    return accum <= 0;
  }
}
