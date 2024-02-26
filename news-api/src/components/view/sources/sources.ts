import { NewsSources, Category } from '../../type';
import { getElementAndType } from '../../utilities';
import './sources.css';

class Sources {
    public draw(data: NewsSources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        const category: string[] = Object.values(Category);
        category.forEach((value: string): void => {
            const categoryClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const buttonCategoryTitle = getElementAndType<HTMLElement>(categoryClone, '.source__item-name');
            buttonCategoryTitle.textContent = value;
            buttonCategoryTitle.classList.add('button_category-title');
            getElementAndType<HTMLElement>(categoryClone, '.source__item').classList.add('button_category');
            fragment.append(categoryClone);
        });
        const main = getElementAndType<HTMLElement>(document, '.source__buttons-category');
        main.append(fragment);
        const sources = getElementAndType<HTMLElement>(document, '.sources');
        main.addEventListener('click', (e) => {
            const targetElem = e.target as NonNullable<Node>;
            const text = targetElem.textContent?.trim();

            if (text) {
                const filteredData = data.filter((elem) => text === 'All' || elem.category === text.toLowerCase());
                const filteredFragment = document.createDocumentFragment();
                filteredData.forEach((item: NewsSources) => {
                    const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                    getElementAndType<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
                    getElementAndType<HTMLElement>(sourceClone, '.source__item').setAttribute(
                        'data-source-id',
                        item.id
                    );

                    filteredFragment.append(sourceClone);
                });

                while (sources.firstChild) {
                    sources.removeChild(sources.firstChild);
                }
                sources.append(filteredFragment);
            }
        });

        data.forEach((item: NewsSources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            getElementAndType<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            getElementAndType<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        sources.append(fragment);
    }
}

export default Sources;
