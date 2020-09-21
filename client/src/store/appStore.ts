import { observable, action } from "mobx";
import { createContext } from "react";
import { IScoreboardData } from "../components/scoreboard/scoreboard";

export class ApplicationStore {
  @observable
  user: any = null;

  @observable
  scoreBoard: IScoreboardData[] = [];

  @observable
  gameResopnses: string[] = [];

  @observable
  isGameStarted: boolean = false;

  @observable
  error: string = "";

  @action appendGameResponse = (response: string) => {
    this.gameResopnses.push(response);
  };

  @action setScoreboard = (data: IScoreboardData[]) => {
    if (data) {
      this.scoreBoard = data;
    }
  };

  @action setError = (error: string) => {
    this.error = error;
  };
  @action clearError = () => {
    this.error = "";
  };

  @action startGame = () => {
    this.isGameStarted = true;
  };
  @action finishGame = () => {
    this.isGameStarted = false;
    this.gameResopnses = [];
  };
}

const appStore = new ApplicationStore();
export const appContext = createContext(appStore);
