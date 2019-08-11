import { interval } from 'rxjs';
import { Router } from '@angular/router';

import { SettingComponent } from '../../start/setting/setting.component';
import { State } from './interfaces';
import { moveElement, removeCompleteRows } from './actions';
import { showElement } from './html-renderer';

const elementTable = [
  [[1], [1], [1], [1]],
  [[1, 1], [1, 1]],
  [[1, 0], [1, 1], [1, 0]],
  [[0, 1, 0], [1, 1, 1], [0, 1, 0]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[1]]
];

export const index = (x, y) => {
  return x + (y * SettingComponent.width);
}

export const findRandomElement = (state: State) => {
  let number = Math.floor(Math.random() * 9);
  state.elementNumber = number;
  return elementTable[number];
}

export const setStartingElement = (state: State) => {
  let number = Math.floor(Math.random() * 9);
  state.elementNumber = number;
  state.element = elementTable[number];
}

export const setNewState = (state: State) => {
  document.querySelector('.tetrisInfo_text').innerHTML = '';
  removeCompleteRows(state);
  state.positionY = 0;
  state.positionX = Math.floor(SettingComponent.width / 2);
  state.element = findRandomElement(state);
  showElement(state);
}

export const changeIntervalFn = (val: number, state: State, router: Router) => {
  if (state.isFinished === false) {
    state.gameInterval = interval(val);
    state.gameCounterSubscription = state.gameInterval.subscribe(n => {
      moveElement(state, router);

      if (state.positionY === 0) {
        state.gameCounterSubscription.unsubscribe();
        changeIntervalFn(250, state, router);
      }
    });
  }
}



