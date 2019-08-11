import { rotateElement } from './actions';
import { brick } from './constants';
import { State } from './interfaces';

export const checkRotatedCollision = (state: State) => {
    let rotated = rotateElement(state);
    for (let j = rotated.length - 1; j >= 0; j--) {
        for (let i = 0; i < rotated[j].length; i++) {
            if ((rotated[j][i] == 1) && (state.matrix[state.positionY + j][state.positionX + i] == 1)) {
                return true;
            }
        }
    }
    return false;
}

export const checkLeftCollision = (state: State) => {
    for (let j = state.element.length - 1; j >= 0; j--) {
        for (let i = 0; i < state.element[j].length; i++) {
            if ((state.element[j][i] === brick) && (state.matrix[state.positionY + j][state.positionX + i - 1] === brick)) {
                return true;
            }
        }
    }
    return false;
}

export const checkRightCollision = (state: State) => {
    for (let j = state.element.length - 1; j >= 0; j--) {
        for (let i = 0; i < state.element[j].length; i++) {
            if ((state.element[j][i] === brick) && (state.matrix[state.positionY + j][state.positionX + i + 1] === brick)) {
                return true;
            }
        }
    }
    return false;
}

export const checkCollisionWithMatrix = (state: State) => {
    for (let j = state.element.length - 1; j >= 0; j--) {
        for (let i = 0; i < state.element[0].length; i++) {
            if ((state.element[j][i] === brick) && (state.matrix[state.positionY + j + 1][state.positionX + i] === brick)) {
                return true;
            }
        }
    }
    return false;
}