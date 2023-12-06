// burger-menu //

const buttonBurgerMenu = document.querySelector('.header__button-menuBurger');
const lineTopInButtonBurger = document.querySelector('.line-top');
const lineBottomInButtonBurger = document.querySelector('.line-bottom');
const burgerMenu = document.querySelector('.header__nav-plus-button');
const listNavInBurgerMenu = document.querySelector('.nav__list');
const buttonMenu = document.querySelector('.header__button-menu');
const body = document.querySelector('.body');
const navItemsInBurger =document.querySelectorAll('.nav__item');
const buttonMenuInactive = document.querySelector('.header__button-menu-menu');

function removeClass(){
    lineTopInButtonBurger.classList.remove('rotate-top');
    lineBottomInButtonBurger.classList.remove('rotate-bottom');
    burgerMenu.classList.remove('burger__open');
    buttonMenu.classList.remove('button-menu__inBurger');
    body.classList.remove('overflow');
}


buttonBurgerMenu.addEventListener('click', () => {
    lineTopInButtonBurger.classList.toggle('rotate-top');
    lineBottomInButtonBurger.classList.toggle('rotate-bottom');
    burgerMenu.classList.toggle('burger__open');
    buttonMenu.classList.toggle('button-menu__inBurger');
    body.classList.toggle('overflow');
})

navItemsInBurger.forEach((elem) =>{
    elem.addEventListener('click', () => {
        removeClass();
    })
})

buttonMenuInactive.addEventListener('click', () => {
    removeClass();
})