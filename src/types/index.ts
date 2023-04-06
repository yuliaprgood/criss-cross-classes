export type PlayerType = 'X' | 'O';

export type SquareValue = PlayerType | null;

export type SquaresState = {
    squares: SquareValue[];
}

