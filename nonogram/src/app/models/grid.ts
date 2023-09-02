export default interface Grid {
    Height: number;
    Width: number;
    data: hints | sequence;
}

//let a: Grid = {Height:3, Width: 4, data: {sequence:"ffff"}}


type hints = {
    horizontalHints: Array<Array<number>>
    verticalHints: Array<Array<number>>
}

type sequence = {
    sequence: string
}