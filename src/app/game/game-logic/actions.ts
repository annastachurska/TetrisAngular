import { Router } from '@angular/router';
import { interval } from 'rxjs';

import { SettingComponent } from '../../start/setting/setting.component';
import { empty, brick } from './constants';
import { State } from './interfaces';

import { hideElement, colorBoard } from './html-renderer';
import { checkCollisionWithMatrix } from './collision';
import { index } from './game';

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
}

export const removeCompleteRows = (state: State) => {
    const toRemove = [];
    const newMatrix = [];

    for (let i = 0; i < state.matrix.length; i++) {
        let sum = state.matrix[i].reduce((prev, next) => { return prev + next });
        if (sum == state.matrix[i].length) {
            toRemove.push(1);
            let newMatrixRaw = new Array(SettingComponent.width).fill(0);
            newMatrix.push(newMatrixRaw);
            state.points++;
        } else {
            toRemove.push(0);
        }
    }

    let numberOfCompleteRows = toRemove.reduce((prev, next) => { return prev + next });
    if (numberOfCompleteRows > 0) {
        for (let i = 0; i < state.matrix.length; i++) {
            if (toRemove[i] == 0) {
                newMatrix.push(state.matrix[i]);
            }
        }
        state.matrix = newMatrix;
        colorBoard(state);
    }
}

export const showElement = (state: State) => {
    state.element.forEach((row, rowi) => {
        row.forEach((col, coli) => {
            if (state.element[rowi][coli] === brick) {
                let element = index(coli + state.positionX, rowi + state.positionY);
                if (state.elementNumber === 8) {
                    state.board[element] = 'red';
                } else {
                    state.board[element] = 'black';
                }
            }
        });
    });
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