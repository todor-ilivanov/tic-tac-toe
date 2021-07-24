import React from 'react';
import { SquareState } from '../models/SquareState';

type SquareProps = {
    value: SquareState;
    isDisabled: boolean;
    onClick: () => void;
};

const Square = (props: SquareProps) => {

    const { value, isDisabled, onClick } = props;

    return (
        <button
            disabled={isDisabled}
            className="square"
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;