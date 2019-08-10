import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less']
})
export class SettingComponent implements OnInit {
  static width: number = 10;
  static height: number = 10;
  boardSize: FormGroup = new FormGroup({
    width: new FormControl('', [Validators.required, Validators.min(10), Validators.max(20)]),
    height: new FormControl('', [Validators.required, Validators.min(10), Validators.max(20)])
  });

  constructor(private router: Router ) { }

  ngOnInit() {
  }

  onSubmit(boardSize: any) {
    SettingComponent.width = boardSize.width;
    SettingComponent.height = boardSize.height;
    this.router.navigate(['game']);
  }
}
