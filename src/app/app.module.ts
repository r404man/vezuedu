import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { CardComponent } from './components/card/card.component';
import { MainComponent } from './components/pages/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { ConfirmationComponent } from './components/pages/confirmation/confirmation.component';
import { SuccessComponent } from './components/pages/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    DetailsComponent,
    CardComponent,
    MainComponent,
    OrderComponent,
    ConfirmationComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
