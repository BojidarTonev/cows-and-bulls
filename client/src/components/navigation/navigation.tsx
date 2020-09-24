import { observer } from 'mobx-react';
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { appContext, ApplicationStore } from '../../store/appStore';
import './navigation.scss'

export const Navigation = observer(() => {
    const history = useHistory();
    const store: ApplicationStore = useContext(appContext);

    return (
        <div className="navigation-wrapper">
            <Link to="/game">Start Game</Link>
            <Link to="/scoreboard">Scoreboard</Link>
            <h1 onClick={() => history.push("/")}>Bulls and Cows</h1>
            {store.user ? (
                <>
                    <Link to="/" onClick={() => store.user = null}>Logout</Link>
                </>
            ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
        </div>
    )
})