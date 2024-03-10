import { BaseComponent } from "../../base-component";
import { header } from "./itemPageGame/header";

export const gamePage = new BaseComponent('div', 'pageGame').addElement();

gamePage.append(header)