import { SquareState } from './SquareState';

export type BoardState = SquareState[][];

export const initBoard = (size: number): BoardState => {
    return new Array(size).fill(undefined).map(() =>
        new Array(size).fill(undefined)
    );
};

export const updateBoardState = (
    oldState: BoardState,
    row: number,
    col: number,
    currentPlayer: SquareState
): BoardState => {
    const newState: BoardState = [...oldState].map(row => [...row]);
    newState[row][col] = currentPlayer;
    return newState;
};