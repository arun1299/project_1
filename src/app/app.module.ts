import { INRModule_WO } from './pipe/INR/INR_wo.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/sharedIndex';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INRModule } from './pipe/INR/INR.module';
import { TooltipModule } from 'primeng/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule,INRModule,TooltipModule,MatTooltipModule,INRModule_WO],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
