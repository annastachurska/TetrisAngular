import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { TetrisComponent } from './tetris/tetris.component';

@NgModule({
  declarations: [TetrisComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
