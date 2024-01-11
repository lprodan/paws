import React, {ReducerWithoutAction, useState} from 'react';
import './App.css';
import Duration from "./Duration";
import {useEffect, useReducer} from "react";
import ThemeChangeIcon from "./ThemeChangeIcon";
import PawsContainer from "./PawsContainer";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const now = dayjs()
const marDay = '2019-03-28 11:00:00'
const relDay = '2017-12-26 23:00:00'
const convDay = '2017-12-15 10:27:44'

const initialState = {
    marr: dayjs.duration(now.diff(marDay)),
    rel: dayjs.duration(now.diff(relDay)),
    met: dayjs.duration(now.diff(convDay))
}

const reducer: ReducerWithoutAction<typeof initialState> =  (prevState) => {
    return {
        marr: prevState.marr.add(1, 'second'),
        rel: prevState.rel.add(1, 'second'),
        met: prevState.met.add(1, 'second')
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [themeChanger, setThemeChanger] = useState(false)

    useEffect(() => {
        const id = setInterval(() => {
            dispatch()
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    const changeBG = () => {
        setThemeChanger(!themeChanger)
    }

  return <div className={themeChanger ? "dark" : "light"}>
          <PawsContainer />
          <div className="container">
              <div className='btn-container'>
                  <ThemeChangeIcon onClick={changeBG} />
              </div>
              <div className='dates'>
                  <table>
                      <tr className='date'>
                          <td colSpan={12} className='title'>We know each other for: </td>
                      </tr>
                      <Duration value={state.met} />
                      <tr className='date'>
                          <td colSpan={12} className='title'>We are in relationship for: </td>
                      </tr>
                      <Duration value={state.rel} />
                      <tr className='date'>
                          <td colSpan={12} className='title'>We are married for: </td>
                      </tr>
                      <Duration value={state.marr} />
                  </table>
              </div>
          </div>
      </div>
}

export default App;
