import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StartRoutingModule } from './start-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [WelcomeComponent, SettingComponent],
  imports: [
    CommonModule,
    StartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StartModule { }
