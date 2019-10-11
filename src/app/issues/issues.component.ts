import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { LoadingScreenService } from '../shared/services/loading-screen/loading-screen.service';

import {
  map,
  tap,
  scan,
  mergeMap,
  throttleTime,
  catchError,
} from 'rxjs/operators';
import { ToastService } from '../shared/services/toast/toast.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;
  layaut = 'grid';

  theEnd = false;
  issuesData: any;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  constructor(
    public http: HttpService,
    public loading: LoadingScreenService,
    public toast: ToastService,
  ) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap((n) => this.getIssues(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {}),
    );

    this.infinite = batchMap.pipe(map((v) => Object.values(v)));
  }

  getIssues(offset = null) {
    console.log(offset);
    this.loading.startLoading();
    const path = 'issues/';
    const data = {
      format: 'json',
      offset,
    };
    return this.http.get(path, data).pipe(
      tap((res: any) =>
        res.results.length ? null : (this.theEnd = true),
      ),
      map((res: any) => {
        this.loading.stopLoading();
        return res.results.reduce((acc: any, cur: any) => {
          const id = cur.id;
          const curData = cur;
          return { ...acc, [id]: curData };
        }, {});
      }),
      catchError((err) => {
        this.loading.stopLoading();
        this.toast.present({
          message: 'Oops, something went wrong. try again!',
          type: 'error',
        });
        return throwError(err);
      }),
    );
  }

  nextBatch(e: any, offset: any) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.offset.next(offset);
    }
  }
}
