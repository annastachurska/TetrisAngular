import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: 'start',
    component: SettingComponent
  },
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
