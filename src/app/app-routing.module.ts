import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TetrisComponent } from './game/tetris/tetris.component';
import { RewardComponent } from './finish/reward/reward.component';

const routes: Routes = [
  {
    path: 'init',
    loadChildren: './start/start.module#StartModule'
  },
  {
    path: 'game',
    loadChildren: './game/game.module#GameModule'
  },
  {
    path: 'finish',
    loadChildren: './finish/finish.module#FinishModule'
  },
  {
    path: '',
    redirectTo: '/init',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
