import { SettingComponent } from '../../start/setting/setting.component';
import { State } from './interfaces';
import { brick, empty } from './constants';

import { index } from './game';

export const hideElement = (state: State) => {
    state.element.forEach((row, rowi) => {
        row.forEach((col, coli) => {
            if (state.element[rowi][coli] === brick) {
                let element = index(coli + state.positionX, rowi + state.positionY);
                state.board[element] = 'white';
            }
        })
    });
}

export const colorBoard = (state: State) => {
    for (let i = 0; i < SettingComponent.height; i++) {
        for (let j = 0; j < SettingComponent.width; j++) {
            let element = index(j, i);
            state.board[element] = state.matrix[i][j] === brick ? 'black' : 'white';
        }
    }
}

export const createBoard = (state: State) => {
    const numberOfElements = SettingComponent.width * SettingComponent.height;
    state.board = Array(numberOfElements).fill(empty);

    for (let i = 0; i < SettingComponent.height; i++) {
        for (let j = 0; j < SettingComponent.width; j++) {
            let element = index(j, i);
            state.board[element] = state.matrix[i][j] === brick ? 'black' : 'white';
        }
    }
}