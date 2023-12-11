import products from './products.json' assert {type: "json"};

const wrapperCardsProducts = document.querySelector('.menu__product-cards__wrapper');
const buttonCoffee = document.querySelector('.button__coffee');
const buttonTea = document.querySelector('.button-tea');
const buttonDessert = document.querySelector('.button-deserts');
const updatesButton = document.querySelector('.menu__offer__button-updates');
const backgroundModal = document.querySelector('.modal__wrapper');
const modalWindow = document.querySelector('.modal-product');
const body = document.querySelector('.body');
const buttonCloseInModal = document.querySelector('.modal-product__button-close');
const imageModal = document.querySelector('.modal-product__image');
const nameProductInModal = document.querySelector('.modal-product__title');
const descriptionProductInModal = document.querySelector('.modal-product__offer');
const buttonsSizeText = document.querySelectorAll('.size__button__text');
const circlesInButtonSize = document.querySelectorAll('.size__button__circle');
const buttonsAdditivesText = document.querySelectorAll('.additives__button__text');
const totalPrice = document.querySelector('.modal-product__total-sum_result');
const buttonSmallCoffee = document.querySelector('.button__s');
const buttonMediumCoffee = document.querySelector('.button__m');
const buttonLargeCoffee = document.querySelector('.button__l');
const buttonAdditive1 = document.querySelector('.button__1');
const buttonAdditive2 = document.querySelector('.button__2');
const buttonAdditive3 = document.querySelector('.button__3');


function searchCategory(str){
    return products.filter(x => x.category === str);
};

function clearField(){
    wrapperCardsProducts.style.opacity = '0';
    wrapperCardsProducts.style.visibility = 'hidden';
    wrapperCardsProducts.innerHTML = '';
    wrapperCardsProducts.style.transition = 'opacity 0.5s';
}

function showField() {
    wrapperCardsProducts.style.visibility = 'visible';
    wrapperCardsProducts.style.opacity = '1';
    wrapperCardsProducts.style.transition = 'opacity 0.5s';
}

function activeButton(btn1, btn2, btn3, classN){
    btn1.classList.add(classN);
    btn2.classList.remove(classN);
    btn3.classList.remove(classN);
}


function disableButton(btn1, btn2, btn3){
    btn1.setAttribute('disabled', 'disabled')
    btn2.removeAttribute('disabled')
    btn3.removeAttribute('disabled')
}

function checkClass(){
    if(buttonAdditive1.classList.contains('modal__button_active')){
        buttonAdditive1.classList.remove('modal__button_active');
    };
    if(buttonAdditive2.classList.contains('modal__button_active')){
        buttonAdditive2.classList.remove('modal__button_active');
    };
    if(buttonAdditive3.classList.contains('modal__button_active')){
        buttonAdditive3.classList.remove('modal__button_active');
    };
};


function makeCardProduct(categoryName){
   
    for (let i = 0; i < searchCategory(categoryName).length; i++){
    
        const article = document.createElement('article');
        article.className ='product-card__container';
        wrapperCardsProducts.append(article);

            const image = document.createElement('div');
            image.className = 'product__image';
            image.style.backgroundImage = `url(${searchCategory(categoryName)[i].src})`;
            article.append(image);

                const wrapperDescription = document.createElement('div');
                wrapperDescription.className = 'product__description';
                article.append(wrapperDescription);

                    const wrapperTitle = document.createElement('div');
                    wrapperTitle.className = 'product__description__name';
                    wrapperDescription.append(wrapperTitle);
               
                        const titleProduct = document.createElement('h2');
                        titleProduct.className = 'product__description__name-title';
                        titleProduct.innerHTML = searchCategory(categoryName)[i].name;
                        wrapperTitle.append(titleProduct);

                        const offerProduct = document.createElement('div');
                        offerProduct.className = 'product__description__name-offer';
                        offerProduct.innerHTML = searchCategory(categoryName)[i].description;
                        wrapperTitle.append(offerProduct);
            
                    const payProduct = document.createElement('p');
                    payProduct.className = 'product__description__price';
                    payProduct.innerHTML = `$${searchCategory(categoryName)[i].price}`;
                    wrapperDescription.append(payProduct);

        const cardsProducts = document.querySelectorAll('.product-card__container');
            for(let i = 5; i <= cardsProducts.length; i++){
                article.className = 'product-card__container card__none';
            };  
    };
};

function fillModal(categoryName, nameCoffee){
    
    let productInfo,
        circleInner,
        price;
     
    
    for (let i = 0; i < searchCategory(categoryName).length; i++){
        let categoryProduct = searchCategory(categoryName);
        if (categoryProduct[i].name === nameCoffee){
            productInfo = categoryProduct[i];
        }; 
    };
    
    imageModal.setAttribute('src', productInfo.src);
    nameProductInModal.innerText = productInfo.name;
    descriptionProductInModal.innerText = productInfo.description;
    
    buttonsSizeText.forEach((x, i) => {  
        circleInner = circlesInButtonSize[i].innerText.toLowerCase();
        x.innerText = productInfo.sizes[circleInner].size;
    });

    buttonsAdditivesText.forEach((x, i) => { 
        x.innerText = productInfo.additives[i].name;
    });
    
    totalPrice.innerText = `$${productInfo.price}`;

    disableButton(buttonSmallCoffee, buttonMediumCoffee, buttonLargeCoffee);

    
     function sumPrice(){
        if(buttonAdditive3.classList.contains('modal__button_active') && 
            buttonAdditive2.classList.contains('modal__button_active') && 
            buttonAdditive1.classList.contains('modal__button_active')){
                price += 1.50;
        };
        if(buttonAdditive1.classList.contains('modal__button_active') && !buttonAdditive2.classList.contains('modal__button_active') && !buttonAdditive3.classList.contains('modal__button_active')|| 
            buttonAdditive2.classList.contains('modal__button_active') && !buttonAdditive1.classList.contains('modal__button_active') && !buttonAdditive3.classList.contains('modal__button_active')||
            buttonAdditive3.classList.contains('modal__button_active') && !buttonAdditive2.classList.contains('modal__button_active') && !buttonAdditive1.classList.contains('modal__button_active')){
                price += 0.50;
        };
        if(buttonAdditive2.classList.contains('modal__button_active') && buttonAdditive3.classList.contains('modal__button_active') && !buttonAdditive2.classList.contains('modal__button_active')|| 
            buttonAdditive2.classList.contains('modal__button_active') && buttonAdditive1.classList.contains('modal__button_active') && !buttonAdditive3.classList.contains('modal__button_active')|| 
            buttonAdditive1.classList.contains('modal__button_active') && buttonAdditive2.classList.contains('modal__button_active') && !buttonAdditive3.classList.contains('modal__button_active')){
                price += 1.00;
        };  
    };
    
    buttonSmallCoffee.addEventListener('click', () => {
        activeButton(buttonSmallCoffee, buttonMediumCoffee, buttonLargeCoffee, 'modal__button_active');
        disableButton(buttonSmallCoffee, buttonMediumCoffee, buttonLargeCoffee);
        price = Number(productInfo.price);
        sumPrice();
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    });
    
    buttonMediumCoffee.addEventListener('click', () => {
        activeButton(buttonMediumCoffee, buttonSmallCoffee, buttonLargeCoffee, 'modal__button_active');
        disableButton(buttonMediumCoffee, buttonSmallCoffee, buttonLargeCoffee);
        totalPrice.innerText = productInfo.price;
        price = Number(productInfo.price) + 0.50;
        sumPrice();
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    });
    
    buttonLargeCoffee.addEventListener('click', () => {
        activeButton(buttonLargeCoffee, buttonSmallCoffee, buttonMediumCoffee, 'modal__button_active');
        disableButton(buttonLargeCoffee, buttonMediumCoffee, buttonSmallCoffee);
        totalPrice.innerText = productInfo.price;
        price = Number(productInfo.price) + 1;
        sumPrice();
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    });
};
    

function openModal(categoryName, productsNames){
    
    const nameCardProduct = document.querySelectorAll('.product__description__name-title');

    productsNames.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            let product = nameCardProduct[i].innerHTML;
            activeButton(buttonSmallCoffee, buttonMediumCoffee, buttonLargeCoffee, 'modal__button_active');
            backgroundModal.classList.add('modal__open');
            modalWindow.classList.add('modal__open');
            body.classList.add('overflow');
            fillModal(categoryName, product);
        });
    });

    function closeModal(){
        backgroundModal.classList.remove('modal__open');
        modalWindow.classList.remove('modal__open');
        body.classList.remove('overflow');
    };

    backgroundModal.addEventListener('click', () => {
        closeModal();
        checkClass();
    });

    buttonCloseInModal.addEventListener('click', () => {
        closeModal();
        checkClass();
    });

    modalWindow.addEventListener('click', (event) => {
        event.stopPropagation();
    });

};

makeCardProduct('coffee');

setTimeout(showField, 200);

const productsCard = document.querySelectorAll('.product-card__container');

openModal('coffee', productsCard);


buttonCoffee.addEventListener('click',() => {
    clearField();
    makeCardProduct('coffee');
    setTimeout(showField, 200);
    activeButton(buttonCoffee, buttonTea, buttonDessert, 'menu__offer__button_active');
    disableButton(buttonCoffee, buttonTea, buttonDessert); 
    updatesButton.classList.remove('card__none');
    const productsCardCoffee = document.querySelectorAll('.product-card__container');
    openModal('coffee', productsCardCoffee);
});

buttonTea.addEventListener('click', () => {
    clearField();
    makeCardProduct('tea');
    setTimeout(showField, 200);
    activeButton(buttonTea, buttonCoffee, buttonDessert, 'menu__offer__button_active');
    disableButton(buttonTea, buttonCoffee, buttonDessert);
    updatesButton.classList.add('card__none');
    const productsCardTea = document.querySelectorAll('.product-card__container');
    openModal('tea', productsCardTea);
});

buttonDessert.addEventListener('click', () => {
    clearField();
    makeCardProduct('dessert');
    setTimeout(showField, 200);
    activeButton(buttonDessert, buttonTea, buttonCoffee, 'menu__offer__button_active');
    disableButton(buttonDessert, buttonTea, buttonCoffee);
    updatesButton.classList.remove('card__none');
    const productsCardDessert = document.querySelectorAll('.product-card__container');
    openModal('dessert',productsCardDessert);
});

updatesButton.addEventListener('click', () =>{
    const cardsProducts = document.querySelectorAll('.product-card__container');
    cardsProducts.forEach((x) => x.classList.remove('card__none'));
    updatesButton.classList.add('card__none');
});

window.addEventListener('resize', () => {
    const cardsProducts = document.querySelectorAll('.product-card__container');
    if (window.innerWidth <= 768 && cardsProducts.length > 4){
        updatesButton.classList.remove('card__none');
        const closeProduct = Array.from(cardsProducts).slice(4);
        closeProduct.forEach((x) => x.classList.add('card__none'));
    }else {
        updatesButton.classList.add('card__none');
        cardsProducts.forEach((x) => x.classList.remove('card__none'));
    };
});

buttonAdditive1.addEventListener('click', () => {
    let sumPrice = totalPrice.innerHTML.substring(1);

    buttonAdditive1.classList.toggle('modal__button_active');

    if(buttonAdditive1.classList.contains('modal__button_active')){
        let price = Number(sumPrice) + 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    }else{
        let price = Number(sumPrice) - 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    };
});
    
buttonAdditive2.addEventListener('click', () => {
    let sumPrice = totalPrice.innerHTML.substring(1);

    buttonAdditive2.classList.toggle('modal__button_active');

    if(buttonAdditive2.classList.contains('modal__button_active')){
        let  price = Number(sumPrice) + 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    }else{
        let  price = Number(sumPrice) - 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    };
});
    
buttonAdditive3.addEventListener('click', () => {
    let sumPrice = totalPrice.innerHTML.substring(1);

    buttonAdditive3.classList.toggle('modal__button_active');

    if(buttonAdditive3.classList.contains('modal__button_active')){
        let price = Number(sumPrice) + 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    }else{
        let price = Number(sumPrice) - 0.50;
        totalPrice.innerHTML = `$${price.toFixed(2)}`;
    };
});
