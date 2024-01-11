import Paw from "./Paw";
import {ReducerWithoutAction, useEffect, useReducer, useState} from "react";

function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export enum ScreenSide {
    Left,
    Right,
    Top,
    Bottom
}

const PAW_WIDTH = 50
const PAW_HEIGHT = 50

const reducer: ReducerWithoutAction<ScreenSide> = () => getRandom(0, 3)

export default function PawsContainer() {
    const [side, randomSide] = useReducer(reducer, reducer(0))

    const [x, setX] = useState(-PAW_WIDTH);
    const [y, setY] = useState(-PAW_HEIGHT);
    const [a, setA] = useState(0);

    const [ticks, tick] = useReducer((prevState) => prevState + 1, 0)

    useEffect(() => {
        switch (side) {
            case ScreenSide.Left:
                setX(-PAW_WIDTH)
                setY(getRandom(0, window.innerHeight - PAW_HEIGHT))
                setA(90)
                break;
            case ScreenSide.Top:
                setY(-PAW_HEIGHT)
                setX(getRandom(0, window.innerWidth - PAW_WIDTH))
                setA(180)
                break
            case ScreenSide.Right:
                setX(window.innerWidth)
                setY(getRandom(0, window.innerHeight - PAW_HEIGHT))
                setA(270)
                break
            case ScreenSide.Bottom:
                setY(window.innerHeight)
                setX(getRandom(0, window.innerWidth - PAW_WIDTH))
                setA(0)
                break
        }
    }, [side])

    const loop = ()=> {
        switch (side) {
            case (ScreenSide.Left):
                if (x > window.innerWidth) {
                    randomSide()
                    return;
                }
                setX(x + PAW_WIDTH)
                break
            case (ScreenSide.Right):
                if (x < 0) {
                    randomSide()
                    return;
                }
                setX(x - PAW_WIDTH)
                break
            case (ScreenSide.Top):
                if (y > window.innerHeight) {
                    randomSide()
                    return;
                }
                setY(y + PAW_HEIGHT)
                break
                case (ScreenSide.Bottom):
                    if (y < 0) {
                        randomSide()
                        return;
                    }
                    setY(y - PAW_HEIGHT)
                    break
        }
    }


    useEffect(loop, [ticks]);

    useEffect(() => {
        const id = setInterval(tick, 500)
        return () => clearInterval(id)
    }, []);

    return <>
        <Paw a={a} y={y} x={x} />
    </>
}