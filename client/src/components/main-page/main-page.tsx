import React from 'react'
import { useHistory } from 'react-router-dom';
import './main-page.scss'

export const MainPage = () => {
    const history = useHistory();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 2
    };

    return (
        <div className="main-page-wrapper">
            <div className="game-rules" key={1}>
                <h1>GAME RULES</h1>
                <div>
                    This is a very popular children's game in Bulgaria, somehow similar and probably an ancestor to the
                    famous Mastermind -- guessing your oponent's number. Usually it is played with a sheet of paper and
                    a pen against another kid and the first kid to find the other's secret number, wins. This here is an
                    online version, you only guess the number chosen by the computer.
                    The goal of the game is to uncover the oponent's secret number with a minimal number of questions
                    (try with less than ten). The computer indicates the number of matches in your proposition.<br />
                    <span>Rules: </span><br />
                    <ul>
                        <li>All digits in the secret number are different.</li>
                        <li>The secret number cannot start with zero. (for the 'official' Bulls and cows)</li>
                        <li>If your try has matching digits on the exact places, they are Bulls.</li>
                        <li>If you have digits from the secret number, but not on the right places, they are Cows.</li>
                        <li>In the lower text area is added your proposition and the number of bulls and cows that match.</li>
                    </ul>
                    <span>In order to play, you must be logged in!</span>
                </div>
                <button onClick={() => history.push('/game')}>I UNDERSTAND</button>
            </div>
        </div>
    )
}