import { buttonPageGarage, buttonPageWinners } from '../../shared/ui/button';
import { Header } from './header';

export const header: Header = new Header('header', 'header', [buttonPageGarage, buttonPageWinners]);

header.addChildren();
