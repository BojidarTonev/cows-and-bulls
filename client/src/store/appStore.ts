import { observable, action } from "mobx";
import { createContext } from "react";
import { create, persist } from "mobx-persist";
import { IScoreboardData } from "../components/scoreboard/scoreboard";
import { checkForSameValues } from "../utils";

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});
export class ApplicationStore {
  @observable
  @persist("object")
  user: any = null;

  @observable
  scoreBoard: IScoreboardData[] = [];

  @observable
  gameNumber: string = "";

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
  @action
  setRandomGameNumber = (digits: number) => {
    let firstNumber = "1";
    let secondNumber = "9";
    for (let i = 0; i < digits - 1; i++) {
      firstNumber += "0";
      secondNumber += "0";
    }
    const number = Math.floor(
      Number(firstNumber) + Math.random() * Number(secondNumber)
    );
    const hasSameDigits = checkForSameValues(number.toString());
    if (hasSameDigits) {
      this.setRandomGameNumber(digits);
    } else {
      this.gameNumber = number.toString();
    }
  };
}

const appStore = new ApplicationStore();
hydrate("root", appStore);
export const appContext = createContext(appStore);
