import { BoardState } from '../models/BoardState';
import { SquareState } from '../models/SquareState';

export const hasWinner = (boardState: BoardState): boolean => {
    return checkRows(boardState) || checkCols(boardState) || checkDiagonals(boardState);
};

export const hasNoWinner = (boardState: BoardState): boolean => {
    return boardState.flatMap(square => square).every(square => square !== undefined);
};

const areAllSquaresIdentical = (stateArray: SquareState[]) => {
    return stateArray?.every(square => square !== undefined && square === stateArray[0]);
};

const getBoardColumn = (boardState: BoardState, col: number) => {
    return boardState.map(row => row[col]);
};

const checkRows = (boardState: BoardState): boolean => {
    return boardState.some(
        row => areAllSquaresIdentical(row)
    );
};

const checkCols = (boardState: BoardState): boolean => {
    const cols = boardState.map((_, idx) => getBoardColumn(boardState, idx));
    return cols.some(
        col => areAllSquaresIdentical(col)
    );
};

const checkDiagonals = (boardState: BoardState): boolean => {
    const diagonal1: SquareState[] = [];
    const diagonal2: SquareState[] = [];

    for(let row = 0, col = boardState.length - 1; row < boardState.length && col >= 0; row++, col--) {
        diagonal1.push(boardState[row][row]);
        diagonal2.push(boardState[row][col]);
    }

    return areAllSquaresIdentical(diagonal1) || areAllSquaresIdentical(diagonal2);
};