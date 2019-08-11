import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { uglyWords, jokesTable } from './data-reward';
import { RewardService } from './reward.service';
import { TetrisComponent } from 'src/app/game/tetris/tetris.component';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.less']
})
export class RewardComponent implements OnInit {
  dataJoke: string = '';
  isInappropriate: boolean = false;
  points: number;

  constructor(private rewardService: RewardService, private router: Router) { }

  ngOnInit() {
    if (TetrisComponent.finalPoints === -1) {
      this.router.navigate(['init']);
    }
    this.points = TetrisComponent.finalPoints;
    this.handleJoke();
  }

  handleJoke() {
    this.rewardService.getJoke().subscribe(reward => {
      this.dataJoke = Object.assign({}, reward)['value'];
      uglyWords.forEach(element => {
        if (this.dataJoke.indexOf(element) !== -1) {
          this.isInappropriate = true;
          let randomNumber = Math.floor(Math.random() * 3);
          this.dataJoke = jokesTable[randomNumber];
        }
      });

    }, error => {
      let randomNumber = Math.floor(Math.random() * 3);
      this.dataJoke = jokesTable[randomNumber];
      this.isInappropriate = true;

    })
  }

}