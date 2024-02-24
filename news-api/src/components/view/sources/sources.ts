import './sources.css';
import { NewSources } from '../../type';
import { getElementAndType } from '../news/news';

class Sources {
    draw(data: NewSources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: NewSources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            getElementAndType<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            getElementAndType<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElementAndType<HTMLElement>(document, '.sources').append(fragment);
    }
}

export default Sources;
