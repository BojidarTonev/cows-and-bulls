import React from 'react'
import './game.scss'

export const Game = () => {
    return (
        <div className="game-wrapper">
            <div className="digits-options">A number with how many digits?</div>
            <form >
                <div className="digits-input">
                    <div className="radio-input">
                        <input name="three-digits" type="radio" value="3" />
                        <label htmlFor="three-digits">3</label>
                    </div>
                    <div className="radio-input">
                        <input name="three-digits" type="radio" value="3" />
                        <label htmlFor="three-digits">4</label>
                    </div>
                    <div className="radio-input">
                        <input name="three-digits" type="radio" value="3" />
                        <label htmlFor="three-digits">5</label>
                    </div>
                    <div className="radio-input">
                        <input name="three-digits" type="radio" value="3" />
                        <label htmlFor="three-digits">6</label>
                    </div>
                    <button>NEW GAME</button>
                    <button>CLEAR ALL</button>
                </div>
                <div className="input-and-btns">
                    <input type="text" placeholder="Your try.." className="input" />
                    <button>GO</button>
                    <button>I GIVE UP</button>
                </div>
                <div className="result-section">
                </div>
            </form>
        </div>
    )
}