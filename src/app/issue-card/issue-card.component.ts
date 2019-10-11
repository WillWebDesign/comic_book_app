import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss'],
})
export class IssueCardComponent {
  @Input() issueData: any;

  issuePrefix = '4000';

  constructor(public router: Router) {}

  goToIssueDetail(id) {
    const issueId = `${this.issuePrefix}-${id}`;
    this.router.navigate([`issue/${issueId}`]);
  }
}
