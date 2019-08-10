import { Subscription, Observable } from 'rxjs';

import { State, Key } from './interfaces';
import { SettingComponent } from '../../start/setting/setting.component';
import { rotateElement } from './actions';
import { hideElement, showElement } from './html-renderer';
import { checkLeftCollision, checkRightCollision, checkRotatedCollision } from './collision';
import { changeIntervalFn } from './game';

export const changeDirection = (state: State, key: Key, gameInterval: Observable<number>, gameCounterSubscription: Subscription) => {
    switch (key.code) {
        case 'ArrowLeft':
            if ((state.positionX >= 1) && (!checkLeftCollision(state))) {
                hideElement(state);
                state.positionX -= 1;
                showElement(state);
            }
            break;

        case 'ArrowRight':
            if ((state.positionX < (SettingComponent.width - state.element[0].length)) && (!checkRightCollision(state))) {
                hideElement(state);
                state.positionX += 1;
                showElement(state);
            }
            break;

        case 'ArrowUp':
            if ((state.positionX <= (SettingComponent.width - state.element.length))
                && (state.positionY <= (SettingComponent.height - state.element[0].length)) && (!checkRotatedCollision(state))) {
                hideElement(state);
                state.element = rotateElement(state);
                showElement(state);
            }
            break;

        case 'ArrowDown':
            gameCounterSubscription.unsubscribe();
            changeIntervalFn(50, state, gameInterval, gameCounterSubscription);
            break;
    }
}

export const changeDirectionOpposite = (state: State, key: Key, gameInterval: Observable<number>, gameCounterSubscription: Subscription) => {
    switch (key.code) {
        case 'ArrowLeft':
            if ((state.positionX >= 1) && (!checkLeftCollision(state))) {
                hideElement(state);
                state.positionX -= 1;
                showElement(state);
            }
            break;

        case 'ArrowRight':
            if ((state.positionX < (SettingComponent.width - state.element[0].length)) && (!checkRightCollision(state))) {
                hideElement(state);
                state.positionX += 1;
                showElement(state);
            }
            break;

        case 'ArrowUp':
            if ((state.positionX <= (SettingComponent.width - state.element.length))
                && (state.positionY <= (SettingComponent.height - state.element[0].length))
                && (!checkRotatedCollision(state))) {
                hideElement(state);
                state.element = rotateElement(state);
                showElement(state);
            }
            break;

        case 'ArrowDown':
            gameCounterSubscription.unsubscribe();
            changeIntervalFn(50, state, gameInterval, gameCounterSubscription);
            break;
    }
}