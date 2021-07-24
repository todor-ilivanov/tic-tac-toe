import React, { useEffect, useState } from 'react';
import { BoardState, initBoard, updateBoardState } from '../models/BoardState';
import { Player } from '../models/Player';
import { hasWinner, hasNoWinner } from '../utils/gameUtils';
import Board from './Board';
import GameOptions from './GameOptions';

const Game = () => {

    const [boardSize, setBoardSize] = useState<number>(3);
    const [boardState, setBoardState] = useState<BoardState>();
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [winner, setWinner] = useState<Player | undefined>();
    const [isDraw, setIsDraw] = useState<boolean>(false);

    useEffect(() => {
        setBoardState(initBoard(boardSize));
    }, [boardSize]);

    const handleBoardStateChange = (row: number, col: number, currentPlayer: Player) => {
        if(boardState === undefined) {
            console.error("Board state is undefined.");
            return;
        }
        const newState: BoardState = updateBoardState(boardState, row, col, currentPlayer);
        checkIfGameFinished(newState);
        setBoardState(newState);
        switchPlayer(currentPlayer);
    };

    const checkIfGameFinished = (boardState: BoardState) => {
        const winnerExists = hasWinner(boardState);
        const noPossibleWinnerExists = hasNoWinner(boardState);
        if(winnerExists) {
            setWinner(currentPlayer);
        } else if(noPossibleWinnerExists) {
            setIsDraw(true);
        }
    };
    
    const handleBoardSizeChange = (size: number) => {
        setBoardSize(size);
        resetGame(size);
    };

    const handleStartingPlayerChange = (player: Player) => {
        setCurrentPlayer(player);
        resetGame(boardSize);
    };

    const switchPlayer = (currentPlayer: Player) => {
        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
    };

    const resetGame = (boardSize: number) => {
        setWinner(undefined);
        setIsDraw(false);
        setBoardState(initBoard(boardSize));
    };

    return (
        <>
            <div className="game">
                <div className="game-options">
                    <GameOptions
                        handleBoardSizeChange={handleBoardSizeChange}
                        handleStartingPlayerChange={handleStartingPlayerChange}
                    />
                </div>
                <div className="game-board">
                    <Board
                        gameFinished={winner !== undefined || isDraw}
                        currentPlayer={currentPlayer}
                        boardState={boardState}
                        handleBoardStateChange={handleBoardStateChange}
                    />
                </div>
                <div className="game-finished">
                    {
                        winner && <div>{winner} wins!</div>
                    }
                    {
                        isDraw && <div>Draw!</div>
                    }
                    {
                        (winner || isDraw) &&
                        <button
                            className="reset-button"
                            onClick={() => resetGame(boardSize)}
                        >
                            Start Over
                        </button>
                    }
                </div>
            </div>
        </>
    );
};

export default Game;