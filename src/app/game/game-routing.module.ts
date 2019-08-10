import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TetrisComponent } from './tetris/tetris.component';

const routes: Routes = [
  {
    path: '',
    component: TetrisComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
