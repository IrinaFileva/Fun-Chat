import { BaseComponent } from "../../base-component";
import { header } from "./itemPageGame/header";
import { mainPageGame } from "./itemPageGame/main";

export const gamePage = new BaseComponent('div', 'pageGame').addElement();

gamePage.append(header, mainPageGame)