import { Component, OnInit, HostListener } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

import { State } from '../game-logic/interfaces';
import { SettingComponent } from 'src/app/start/setting/setting.component';
import { colorBoard, showElement, createBoard } from '../game-logic/html-renderer';
import { createMatrix, moveElement } from '../game-logic/actions';
import { setStartingElement, changeIntervalFn } from '../game-logic/game';
import { empty } from '../game-logic/constants';
import { changeDirectionOpposite, changeDirection } from '../game-logic/keyboard';


@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.less']
})
export class TetrisComponent implements OnInit {
  isSwitchedSideKeys: boolean = false;
  isRotateBtnClicked: boolean = false;
  slowDownTimesToUse: number = 4;
  boardContainer: HTMLElement;

  tetrisWidthSize: number = 200;
  tetrisHeightSize: number = 200;

  emptyArrayOfDics: number[] = [];

  gameInterval: Observable<number>;
  gameCounterSubscription: Subscription;

  gameState: State = {
    matrix: null,
    positionX: Math.floor(Number(SettingComponent.width / 2)),
    positionY: 0,
    element: null,
    elementNumber: null,
    points: 0,
    isFinished: false,
    board: null
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.isSwitchedSideKeys == true) {
      changeDirectionOpposite(this.gameState, event, this.gameInterval, this.gameCounterSubscription);
    } else {
      changeDirection(this.gameState, event, this.gameInterval, this.gameCounterSubscription);
    }

  }

  constructor() {
    this.tetrisHeightSize = SettingComponent.height * 20;
    this.tetrisWidthSize = SettingComponent.width * 20;
    this.boardContainer = document.querySelector('section#tetris');
    this.createEmptyArray();

  }

  ngOnInit() {
    this.startGame();
  }

  createEmptyArray() {
    const numberOfElements = SettingComponent.width * SettingComponent.height;
    this.emptyArrayOfDics = Array(numberOfElements).fill(empty);
  }

  startGame() {
    this.gameState.matrix = createMatrix();
    setStartingElement(this.gameState);
    while (this.gameState.elementNumber === 8) {
      setStartingElement(this.gameState);
    }
    createBoard(this.gameState);
    showElement(this.gameState);
    changeIntervalFn(250, this.gameState, this.gameInterval, this.gameCounterSubscription);
  }

  handleRotateButton() {
    this.isRotateBtnClicked = !this.isRotateBtnClicked;
    this.isSwitchedSideKeys = !this.isSwitchedSideKeys;


    //   document.querySelector('#tetris').style.transform = document.querySelector('#tetris').style.transform == 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    //   e.target.innerText = document.querySelector('#tetris').style.transform == 'rotate(180deg)' ? ;
    // });
  }

  handleChageKeysButton() {
    this.isSwitchedSideKeys = this.isSwitchedSideKeys == false ? true : false;
  }

  handleSlowDownButton($event: Event) {
    this.slowDownTimesToUse--;
    this.gameCounterSubscription.unsubscribe();
    changeIntervalFn(1000, this.gameState, this.gameInterval, this.gameCounterSubscription);
    // e.target.disabled = true;
    // e.target.innerText = `Slow down (${this.slowDownTimesToUse} to use)`;
  }

}

