import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastComponent } from './toast/toast.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { IssuesComponent } from './issues/issues.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpService } from './shared/services/http/http.service';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { LoadingScreenService } from './shared/services/loading-screen/loading-screen.service';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueCreditItemComponent } from './issue-credit-item/issue-credit-item.component';
import { ToastService } from './shared/services/toast/toast.service';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    LoadingScreenComponent,
    IssuesComponent,
    HeaderComponent,
    IssueCardComponent,
    IssueDetailComponent,
    IssueCreditItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
  ],
  providers: [
    HttpService,
    LoadingScreenService,
    ToastService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
