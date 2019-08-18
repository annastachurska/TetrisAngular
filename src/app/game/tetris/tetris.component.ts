import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SettingComponent } from 'src/app/start/setting/setting.component';
import { State } from '../game-logic/interfaces';

import { createMatrix, setStartingElement, changeIntervalFn, showElement } from '../game-logic/actions';
import { createBoard } from '../game-logic/html-renderer';
import { changeDirectionOpposite, changeDirection } from '../game-logic/keyboard';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.less']
})
export class TetrisComponent implements OnInit, OnDestroy {
  static finalPoints: number = -1;

  tetrisWidthSize: number = 200;
  tetrisHeightSize: number = 200;
  rotateStyle: string = 'rotate(0deg)';

  gameState: State = {
    matrix: null,
    positionX: Math.floor(Number(SettingComponent.width / 2)),
    positionY: 0,
    element: null,
    elementNumber: null,
    points: 0,
    isFinished: false,
    board: null,
    gameInterval: null,
    gameCounterSubscription: null,
    isSwitchedSideKeys: false,
    isRotateBtnClicked: false,
    slowDownTimesToUse: 4
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.gameState.isSwitchedSideKeys === true) {
      changeDirectionOpposite(this.gameState, event, this.router);
    } else {
      changeDirection(this.gameState, event, this.router);
    }
  }

  constructor(private router: Router) {
    this.tetrisHeightSize = SettingComponent.height * 20;
    this.tetrisWidthSize = SettingComponent.width * 20;
  }

  ngOnInit() {
    this.startGame();

  }

  ngOnDestroy() {
    TetrisComponent.finalPoints = this.gameState.points;
  }

  startGame() {
    this.gameState.matrix = createMatrix();
    setStartingElement(this.gameState);
    while (this.gameState.elementNumber === 8) {
      setStartingElement(this.gameState);
    }
    createBoard(this.gameState);
    showElement(this.gameState);
    changeIntervalFn(250, this.gameState, this.router);
  }

  handleRotateButton() {
    this.gameState.isRotateBtnClicked = !this.gameState.isRotateBtnClicked;
    this.gameState.isSwitchedSideKeys = !this.gameState.isSwitchedSideKeys;
    this.rotateStyle = this.gameState.isRotateBtnClicked ? 'rotate(180deg)' : 'rotate(0deg)';
  }

  handleChageKeysButton() {
    this.gameState.isSwitchedSideKeys = this.gameState.isSwitchedSideKeys == false ? true : false;
  }

  handleSlowDownButton($event: Event) {
    this.gameState.slowDownTimesToUse--;
    this.gameState.gameCounterSubscription.unsubscribe();
    changeIntervalFn(1000, this.gameState, this.router);
    // e.target.disabled = true;
  }

}



