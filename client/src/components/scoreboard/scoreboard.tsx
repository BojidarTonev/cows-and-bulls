import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./scoreboard.scss";
import { appContext, ApplicationStore } from "../../store/appStore";
import { observer } from "mobx-react";

export interface IScoreboardData {
  place: number;
  username: string;
  winCount: number;
  summedAttempts: number;
}

export const Scoreboard = observer(() => {
  const store: ApplicationStore = useContext(appContext);
  useEffect(() => {
    axios.get("https://localhost:5001/api/scoreboard").then((res) => {
      const scoreboardItems = res.data.map((item: any, index: any) => (
        <tr>
          <td>{index + 1}</td>
          <td>{item.username}</td>
          <td>{item.winCount}</td>
          <td>{item.summedAttempts}</td>
        </tr>
      ));

      console.log(scoreboardItems);
      store.setScoreboard(scoreboardItems);
    });
  }, []);
  return (
    <div className="scoreboard-wrapper">
      <h1>SCOREBOARD</h1>
      <div className="scoreboard">
        <table>
          <thead>
            <tr>
              <td>Place</td>
              <td>Username</td>
              <td>Win count</td>
              <td>Summed attempts</td>
            </tr>
          </thead>
          <tbody>{store.scoreBoard}</tbody>
        </table>
      </div>
    </div>
  );
});
