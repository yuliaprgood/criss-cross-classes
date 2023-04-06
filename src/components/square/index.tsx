import React from "react";
import {SquareValue} from "../../types";
import clsx from "clsx";

type SquareItemProps = {
    value: SquareValue;
    onClick: () => void;
    highlighted?: boolean;
}

// функция просто возвращает разметку
export function Square({ onClick, value, highlighted = false}: SquareItemProps ) {

    return (
        <button className={clsx('square', highlighted && 'square-highlighted')} onClick={onClick}>
            {value}
        </button>
    );
}
