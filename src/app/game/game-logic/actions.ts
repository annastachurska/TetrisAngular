import { Router } from '@angular/router';

import { SettingComponent } from '../../start/setting/setting.component';
import { TetrisComponent } from '../tetris/tetris.component';

import { empty, brick } from './constants';
import { State } from './interfaces';
import { setNewState } from './game';
import { hideElement, showElement, colorBoard } from './html-renderer';
import { checkCollisionWithMatrix } from './collision';

export const createMatrix = () => {
    return Array(SettingComponent.height).fill(empty).map(el => Array(SettingComponent.width).fill(empty));
}

export const detonateBomb = (state: State) => {
    const newMatrix = state.matrix;
    const neightbourItems = [[state.positionY - 1, state.positionX - 1], [state.positionY - 1, state.positionX],
    [state.positionY - 1, state.positionX + 1], [state.positionY, state.positionX - 1],
    [state.positionY, state.positionX], [state.positionY, state.positionX + 1], [state.positionY + 1, state.positionX - 1],
    [state.positionY + 1, state.positionX], [state.positionY + 1, state.positionX + 1]
    ];

    neightbourItems.forEach(element => {
        if (element[0] >= 0 && element[0] < SettingComponent.height && element[1] >= 0 && element[1] < SettingComponent.width) {
            newMatrix[element[0]][element[1]] = 0;
        }
    });
    state.matrix = newMatrix;
    colorBoard(state);
}

export const rotateElement = (state: State) => {
    const rotatedElement = [];
    for (let i = 0; i < state.element[0].length; i++) {
        let rotatedElementLine = [];
        for (let j = state.element.length - 1; j >= 0; j--) {
            rotatedElementLine.push(state.element[j][i]);
        }
        rotatedElement.push(rotatedElementLine);
    }
    return rotatedElement;
}

export const addElementToMatrix = (state: State) => {
    state.element.forEach((row, rowi) => {
        row.forEach((col, coli) => {
            if (state.element[rowi][coli] === brick) {
                state.matrix[rowi + state.positionY][coli + state.positionX] = 1;
            }
        });
    });
}

export const moveElement = (state: State, router: Router) => {
    if (((state.positionY + 1) <= SettingComponent.height - state.element.length) && (!checkCollisionWithMatrix(state))) {
        hideElement(state);
        state.positionY += 1;
        showElement(state);
    } else {
        if (state.positionY === 0) {
            state.isFinished = true;
            finishGame(state, router);
        }

        if (state.elementNumber === 8) {
            detonateBomb(state);
        } else {
            addElementToMatrix(state);
        }

        setNewState(state);
    }
}

const finishGame = (state: State, router: Router) => {
    state.gameCounterSubscription.unsubscribe();
    router.navigate(['finish']);
    TetrisComponent.finalPoints = state.points;
}

export const removeCompleteRows = (state: State) => {
    const toRemove = [];
    const newMatrix =[];

    for (let i=0; i<state.matrix.length; i++) {
        let sum = state.matrix[i].reduce((prev, next) => {return prev + next});
        if (sum == state.matrix[i].length) {
            toRemove.push(1);
            let newMatrixRaw = new Array(SettingComponent.width).fill(0);
            newMatrix.push(newMatrixRaw);
            state.points++;
        } else {
            toRemove.push(0);
        }
    }

    let numberOfCompleteRows = toRemove.reduce((prev, next) => {return prev + next});
    if (numberOfCompleteRows>0) {
        for (let i=0; i<state.matrix.length; i++) {
            if (toRemove[i] == 0) {
                newMatrix.push(state.matrix[i]);
            }
        }
        state.matrix = newMatrix;
        colorBoard(state);
    }
}