import { SettingComponent } from '../../start/setting/setting.component';
import { empty } from './constants';
import { State } from './interfaces';
import { moveElement, removeCompleteRows } from './actions';
import { showElement } from './html-renderer';
import { Subscription, Observable, interval } from 'rxjs';

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
    //return elementTable[number];
    state.element = elementTable[number];
    //state.element = this.findRandomElement(state);
}

export const setNewState = (state: State) => {
    document.querySelector('.tetrisInfo_text').innerHTML = '';
    removeCompleteRows(state);
    state.positionY = 0;
    state.positionX = Math.floor(SettingComponent.width / 2);
    state.element = findRandomElement(state);
    showElement(state);
}

export const changeIntervalFn = (val: number, state: State, gameInterval: Observable<number>, gameCounterSubscription: Subscription) => {
    if (state.isFinished === false) {
      gameInterval = interval(val);
      gameCounterSubscription = gameInterval.subscribe(n => {
        moveElement(state, gameCounterSubscription);

        if (state.positionY === 0) {
          gameCounterSubscription.unsubscribe();
          changeIntervalFn(250, state, gameInterval, gameCounterSubscription);
        }

      });
    }

  }



