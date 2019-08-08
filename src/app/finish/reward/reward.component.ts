import { Component, OnInit } from '@angular/core';
import { uglyWords, jokesTable } from './data-reward';
import { RewardService } from './reward.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.less']
})
export class RewardComponent implements OnInit {
  dataJoke: string = '';
  isInappropriate: boolean = false;

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
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

