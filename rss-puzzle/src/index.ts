import './global.css';
import { startForm } from "./app/components/startForm/form";
import { startPage } from './app/components/startPage/page';


if(!localStorage.getItem('IF-Puzzle')){
    document.body.append(startForm);
}
else{
    document.body.append(startPage)
}