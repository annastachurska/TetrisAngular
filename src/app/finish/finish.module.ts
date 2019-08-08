import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishRoutingModule } from './finish-routing.module';
import { RewardComponent } from './reward/reward.component';

@NgModule({
  declarations: [RewardComponent],
  imports: [
    CommonModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
