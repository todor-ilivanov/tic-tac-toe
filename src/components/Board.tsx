import React from 'react';
import { BoardState } from '../models/BoardState';
import { Player } from '../models/Player';
import { SquareState } from '../models/SquareState';
import Square from './Square';

type BoardProps = {
    gameFinished: boolean;
    currentPlayer: Player;
    boardState: BoardState | undefined;
    handleBoardStateChange: (row: number, col: number, currentPlayer: Player) => void;
};

const Board = (props: BoardProps) => {

    const { gameFinished, currentPlayer, boardState, handleBoardStateChange } = props;

    const handleSquareClick = (row: number, col: number, value: SquareState) => {
        value === undefined ?
            handleBoardStateChange(row, col, currentPlayer) :
            console.log(`Square [${row}, ${col}] is already taken.`);
    };

    const renderSquare = (row: number, col: number, value: SquareState) => {
        return (
            <Square
                value={value}
                isDisabled={gameFinished}
                onClick={() => handleSquareClick(row, col, value)}
            />
        );
    };

    return (
        <div>
            {
                <div className="game-state">
                    {
                        !gameFinished ? `${currentPlayer} to play` : 'Game Finished!'
                    }
                </div>
            }
            {

                boardState && boardState.map((row, rowIdx) =>
                    <div key={rowIdx} className="board-row">
                        {
                            row.map((value, colIdx) =>
                                <span key={`${rowIdx}-${colIdx}`}>
                                    {renderSquare(rowIdx, colIdx, value)}
                                </span>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Board;