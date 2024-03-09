import './global.css';
import { startForm } from "./app/components/startForm/form";

if(!localStorage.getItem('IF-Puzzle')){
    document.body.append(startForm);
}