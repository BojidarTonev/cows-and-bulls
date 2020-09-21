import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './navigation.scss'

export const Navigation = () => {
    const history = useHistory();
    return (
        <div className="navigation-wrapper">
            <Link to="/game">Start Game</Link>
            <Link to="/scoreboard">Scoreboard</Link>
            <h1 onClick={() => history.push("/")}>Bulls and Cows</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}