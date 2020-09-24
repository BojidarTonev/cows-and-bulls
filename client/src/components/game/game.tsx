import React, { useContext, useState } from 'react'
import { appContext, ApplicationStore } from '../../store/appStore';
import { observer } from 'mobx-react'
import axios from 'axios';
import './game.scss'

export const Game = observer(() => {
    const [attempts, setAttempts] = useState(1)
    const [hasWon, setHasWon] = useState(false);

    const store: ApplicationStore = useContext(appContext);

    const startGame = (e: any) => {
        e.preventDefault();

        setHasWon(false);
        setAttempts(1);

        let digits = null;
        const radioElements = document.getElementById('digits-input')?.children as any;
        for (let div of radioElements) {
            const inputElement = div.children[0];
            if (inputElement && inputElement.checked) {
                digits = inputElement.value
            }
        }

        if (!digits) {
            store.setError("Please select the number of digits you want to play with!");
            return
        }
        store.gameResopnses = [];
        store.setError("");
        store.isGameStarted = true;
        store.gameResopnses.push(`I am thinking of a ${digits}-digits number! =)`)
        store.setRandomGameNumber(digits);
        console.log('number -> ', store.gameNumber)
    }
    const submitAnswer = (e: any) => {
        e.preventDefault();
        store.setError("");

        const answerElement = document.getElementById("input-answer") as any;
        if (isNaN(answerElement.value)) {
            store.setError('The input must be a number!')
        }
        const hasSameValues = answerElement.value.split("").some(function (v: any, i: any, a: any) {
            return a.lastIndexOf(v) != i;
        })
        if (hasSameValues) {
            store.setError("Enter only different digits!")
        }
        if (answerElement.value.length != store.gameNumber.length) {
            store.setError("The entered number must have the same amount of digits as the game number!")
        }

        checkForCowsAndBulls(answerElement.value);
        answerElement.value = ''
    }
    const checkForCowsAndBulls = (inputNumber: any) => {
        setAttempts(attempts + 1);
        let bullsCount = 0;
        let cowsCount = 0;
        if (inputNumber == store.gameNumber) {
            store.gameResopnses.push(`You guessed the number with ${attempts} attempts. Congratulations!`)
            setHasWon(true);
            finishGame();
            return;
        }

        for (let i = 0; i < inputNumber.length; i++) {
            if (inputNumber[i] == store.gameNumber[i]) {
                bullsCount++
            }
            else if (store.gameNumber.indexOf(inputNumber[i]) > -1) {
                cowsCount++
            }
        }
        store.gameResopnses.push(`${bullsCount} bulls and ${cowsCount} cows.`)
    }
    const finishGame = (e?: any) => {
        e && e.preventDefault();
        if (!hasWon) {
            store.gameResopnses.push(`You give up? Looser. Attempts: ${attempts}`)
        }
        axios.post("https://localhost:5001/api/registergame", null, {
            params: {
                userId: store.user.id,
                moves: attempts,
                hasWon: hasWon
            }
        })

        store.isGameStarted = false;
    }

    return (
        <div className="game-wrapper">
            {store.user ? <><div style={{ color: 'red' }}>{store.error}</div>
                <div className="digits-options">A number with how many digits?</div>
                <form >
                    <div className="digits-input" id="digits-input">
                        <div className="radio-input">
                            <input name="digits-count" type="radio" value="3" />
                            <label htmlFor="digits-count">3</label>
                        </div>
                        <div className="radio-input">
                            <input name="digits-count" type="radio" value="4" />
                            <label htmlFor="digits-count">4</label>
                        </div>
                        <div className="radio-input">
                            <input name="digits-count" type="radio" value="5" />
                            <label htmlFor="digits-count">5</label>
                        </div>
                        <div className="radio-input">
                            <input name="digits-count" type="radio" value="6" />
                            <label htmlFor="digits-count">6</label>
                        </div>
                        <button onClick={(e) => startGame(e)}>NEW GAME</button>
                        <button onClick={(e) => { e.preventDefault(); store.gameResopnses = []; }}>CLEAR ALL</button>
                    </div>
                    <div className="input-and-btns">
                        <input type="text" placeholder="Your try.." className="input" id="input-answer" disabled={!store.isGameStarted} />
                        <button onClick={(e) => submitAnswer(e)} disabled={!store.isGameStarted}>GO</button>
                        <button onClick={(e) => { finishGame(e) }} disabled={!store.isGameStarted}>I GIVE UP</button>
                    </div>
                    <div className="result-section">
                        {store.gameResopnses.map((res: string) => (<p>{res}</p>))}
                    </div>
                </form></> : <>You have to be logged in, in order to play the game, sry! =)</>}
        </div >
    )
})