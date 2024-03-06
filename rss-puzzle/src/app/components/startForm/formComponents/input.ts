import { BaseComponent } from "../../../base-component";
import { ValuesAttributes,  } from "../../../types/interfaces";

export class AddInput{
    item: BaseComponent;

    constructor(elem: string, className: string ){
        this.item = new BaseComponent(elem, className);
    }

    setAttributesAndValues(values: ValuesAttributes): HTMLElement{
        const element: HTMLElement = this.item.addElement();
        element.setAttribute('type', values.type);
        element.setAttribute('required', values.required);
        if(values.autofocus)element.setAttribute('autofocus', values.autofocus);
        return element;
    }
}

export const inputName = new AddInput('input', 'input')
    .setAttributesAndValues({
        type: 'text',
        required: '',
        autofocus: 'autofocus'
    })

export const inputLastName = new AddInput('input', 'input')
    .setAttributesAndValues({
        type: 'text',
        required: ''
    })
