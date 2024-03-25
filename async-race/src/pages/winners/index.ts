import { textPagingPageWinners, titlePageWinners } from '../../shared/ui/text';
import { PageWinners } from './winners';

export const containerPageWinner = new PageWinners('div', 'container__page winners no-visible', 'winners', [
  titlePageWinners,
  textPagingPageWinners,
]);
