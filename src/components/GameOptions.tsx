import React from 'react';

import Select from 'react-select';
import { Player } from '../models/Player';

const boardSizes = [3, 4, 5, 6, 7, 8, 9, 10];
const sizeOptions = boardSizes.map(size => {
    return { label: `${size}x${size}`, value: size };
});

const playerOptions = [
    { label: 'X', value: 'X' },
    { label: 'O', value: 'O' }
];

type GameOptionsProps = {
    handleStartingPlayerChange: (currentPlayer: Player) => void;
    handleBoardSizeChange: (size: number) => void;
};

const GameOptions = (props: GameOptionsProps) => {

    const { handleBoardSizeChange, handleStartingPlayerChange } = props;

    return (
        <>
            <div className={"board-size-select"}>
                <p>Choose a board size: </p>
                <Select
                    defaultValue={sizeOptions[0]}
                    onChange={(event) =>
                        event ?
                            handleBoardSizeChange(event.value) :
                            console.error("Error changing board size.")
                    }
                    options={sizeOptions}
                />
            </div>
            <div className={"starting-player-select"}>
                <p>Choose who starts: </p>
                <Select
                    defaultValue={playerOptions[0]}
                    onChange={(event) =>
                        event ?
                            handleStartingPlayerChange(event.value as Player) :
                            console.error("Error changing starting player.")
                    }
                    options={playerOptions}
                />
            </div>
        </>);
};

export default GameOptions;