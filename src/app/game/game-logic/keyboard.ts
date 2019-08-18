import { Router } from '@angular/router';

import { SettingComponent } from '../../start/setting/setting.component';
import { State, Key } from './interfaces';

import { rotateElement, checkLeftCollision, checkRightCollision, checkRotatedCollision } from './collision';
import { changeIntervalFn, showElement } from './actions';
import { hideElement } from './html-renderer';

export const changeDirection = (state: State, key: Key, router: Router) => {
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
            state.gameCounterSubscription.unsubscribe();
            changeIntervalFn(50, state, router);
            break;
    }
}

export const changeDirectionOpposite = (state: State, key: Key, router: Router) => {
    switch (key.code) {
        case 'ArrowRight':
            if ((state.positionX >= 1) && (!checkLeftCollision(state))) {
                hideElement(state);
                state.positionX -= 1;
                showElement(state);
            }
            break;

        case 'ArrowLeft':
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
            state.gameCounterSubscription.unsubscribe();
            changeIntervalFn(50, state, router);
            break;
    }
}