import products from './products.json' assert {type: "json"};

const wrapperCardsProducts = document.querySelector('.menu__product-cards__wrapper');
const buttonCoffee = document.querySelector('.button__coffee');
const buttonTea = document.querySelector('.button-tea');
const buttonDessert = document.querySelector('.button-deserts');
const updatesButton = document.querySelector('.menu__offer__button-updates');

function searchCategory(str){
    return products.filter(x => x.category === str);
};

function clearField(){
    wrapperCardsProducts.style.opacity = '0';
    wrapperCardsProducts.style.visibility = 'hidden';
    wrapperCardsProducts.innerHTML = '';
    wrapperCardsProducts.style.transition = 'opacity 0.5s';
}
function showField () {
    wrapperCardsProducts.style.visibility = 'visible';
    wrapperCardsProducts.style.opacity = '1';
    wrapperCardsProducts.style.transition = 'opacity 0.5s';
}

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
                    payProduct.innerHTML = searchCategory(categoryName)[i].price;
                    wrapperDescription.append(payProduct);

        const cardsProducts = document.querySelectorAll('.product-card__container');
            for(let i = 5; i <= cardsProducts.length; i++){
                article.className = 'product-card__container card__none';
            };  
    };
};


makeCardProduct('coffee');

setTimeout(showField, 200);

buttonCoffee.addEventListener('click',() => {
    clearField();
    makeCardProduct('coffee');
    setTimeout(showField, 200);
    updatesButton.classList.remove('card__none');
});

buttonTea.addEventListener('click', () => {
    clearField();
    makeCardProduct('tea');
    setTimeout(showField, 200);
    updatesButton.classList.add('card__none');
});

buttonDessert.addEventListener('click', () => {
    clearField();
    makeCardProduct('dessert');
    setTimeout(showField, 200);
    updatesButton.classList.remove('card__none');
});

window.addEventListener('resize', () => {
    const cardsProducts = document.querySelectorAll('.product-card__container');
    if (window.innerWidth <= 768 && cardsProducts.length > 4){
        updatesButton.classList.remove('card__none');
        for(let i = 4; i <= cardsProducts.length; i++){
            cardsProducts[i].style.display = 'none';
        };   
    }else {
        updatesButton.classList.add('card__none');
        cardsProducts.forEach((x) => x.style.display = 'flex');
    };
});

updatesButton.addEventListener('click', () =>{
    const cardsProducts = document.querySelectorAll('.product-card__container');
    cardsProducts.forEach((x) => x.style.display = 'flex');
    updatesButton.classList.add('card__none');
});
