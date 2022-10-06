// https://run.mocky.io/v3/275cc213-7485-4396-b1ba-
import * as slider from "./slider.js";

class Bouquet {
    constructor(bouquets){
        this.image = bouquets.image;
        this.name = bouquets.name;
        this.flovers = bouquets.flovers;
        this.price = bouquets.price;
    }
    createCard() {
        const article = `
        <li class="commodity_card">
            <img src="${this.image}" height="55">
            
            <h4 class="commodity_name">${this.name}:</h4>
            <p class="commodity_flowers">${this.flovers}</p>
            <p class="commodity_price">${this.price} грн</p>
            
            <button class="btn_in_basket">В кошик</button>
        </li>
        `;
        
        const card = document.createElement('template');
        card.innerHTML = article;
        
        return card.content;
    }
}

const comdt = { index: 0, };

function createCTLG(cards) {
    const element = document.getElementById('catalog');
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => {
        fragment.appendChild(new Bouquet(card).createCard());
    });
    element.appendChild(fragment);
}



document.addEventListener('DOMContentLoaded', async () => {
    comdt.width = document.querySelector('.div_catalog').clientWidth+15;
    comdt.slider = document.querySelector('#catalog');
    comdt.widthCTLG = document.querySelector('#catalog').clientWidth;    
	comdt.left = document.querySelector('#left_catalog');
	comdt.right = document.querySelector('#right_catalog');
		
	/*------------------------------- BOTTOM BUTTONS -----------------------------------*/
	slider.createElementsAndChackboxs(
        6, 
        createCTLG, 
        'ctlg', 
        comdt, 
        'https://run.mocky.io/v3/275cc213-7485-4396-b1ba-c1969194d67f'
    );
});



/*------------------------------- SCROLL LEFT ---------------------------------------------*/
document.querySelector('#left_catalog').addEventListener('click', () => {
    slider.left(comdt, 'ctlg');
});
/*------------------------------- SCROLL RIGHT ---------------------------------------------*/
document.querySelector('#right_catalog').addEventListener('click', () => {
	slider.right(comdt, 'ctlg');
});
