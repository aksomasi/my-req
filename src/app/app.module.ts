import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { MyRequestComponent } from './components/my-request/my-request.component';
import { PortinDetailsComponent } from './components/portin-details/portin-details.component';
import { ProvideNumbersComponent } from './components/provide-numbers/provide-numbers.component';
import { RequestSummaryComponent } from './components/request-summary/request-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MyRequestComponent,
    ProvideNumbersComponent,
    CustomerDetailsComponent,
    PortinDetailsComponent,
    RequestSummaryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
