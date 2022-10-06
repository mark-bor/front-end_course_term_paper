import * as slider from "./slider.js";

class Feedback {
    constructor(feedbacks){
        this.photo = feedbacks.photo;
        this.text = feedbacks.body;
        this.name = feedbacks.name;
        this.date = feedbacks.date;
    }
    createFeedback() {
        const article = `
            <li class="feedback">
                <img src="${this.photo===undefined? 'images/users_portrait.png': this.photo}" alt="person" width="100" height="100">
                <div class="text_in_feedback">
                    <p>“${this.text}”</p>
                    <h6>${this.name} ${this.date}</h6>
                </div>
            </li>
        `;
        
        const feedback = document.createElement('template');
        feedback.innerHTML = article;
        
        return feedback.content;
    }
}

const fdbck = { index: 0 };

function createFDBCK(feedbacks) {
    const element = document.getElementById('feedbacks');
    const fragment = document.createDocumentFragment();
    feedbacks.forEach((card) => {
        fragment.appendChild(new Feedback(card).createFeedback());
    });
    element.appendChild(fragment);
}



document.addEventListener('DOMContentLoaded', () => {
    fdbck.width = document.querySelector('.div_feedbacks').clientWidth;
    fdbck.slider = document.querySelector('#feedbacks');
    fdbck.widthCTLG = document.querySelector('#feedbacks').clientWidth;    
	fdbck.left = document.querySelector('#left_feedback');
	fdbck.right = document.querySelector('#right_feedback');

	/*------------------------------- BOTTOM BUTTONS -----------------------------------*/
	slider.createElementsAndChackboxs(
        2, 
        createFDBCK, 
        'fdbck', 
        fdbck, 
        'https://run.mocky.io/v3/05199ad5-d4c4-4a10-94a0-32329c0a6f80'
    );
});



/*------------------------------- SCROLL LEFT ---------------------------------------------*/
document.querySelector('#left_feedback').addEventListener('click', () => {
    slider.left(fdbck, 'fdbck');
});
/*------------------------------- SCROLL RIGHT ---------------------------------------------*/
document.querySelector('#right_feedback').addEventListener('click', () => {
	slider.right(fdbck, 'fdbck');
});

document.querySelector('#send_feedback').addEventListener('click', () => {
    fdbck.name = document.querySelector('#name_for_feedback');
    fdbck.text = document.querySelector('#text_for_feedback');
    if (!fdbck.name.value | !fdbck.text.value) {
        !fdbck.name.value? fdbck.name.style.border = '1px solid #FF5555': fdbck.name.style.border = '1px solid #8FD855';
        !fdbck.text.value? fdbck.text.style.border = '1px solid #FF5555': fdbck.text.style.border = '1px solid #8FD855';
        return;
    }
    fdbck.name.style.border = '1px solid #8FD855';
    fdbck.text.style.border = '1px solid #8FD855';

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    
    const feedback = {
        "photo": "images/users_portrait.png",
        "body": fdbck.text.value,
        "name": fdbck.name.value,
        "date": `${day<10? `0${day}`: day}.${(month+1)<10? `0${month}`: month}.${date.getFullYear()}`
    }
    fdbck.slider.innerHTML = '';
    
    fetch('https://run.mocky.io/v3/05199ad5-d4c4-4a10-94a0-32329c0a6f80', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((res) => {
        createFDBCK(res);
        fdbck.name.style.border = 'none';
        fdbck.text.style.border = 'none';
        fdbck.name.value = '';
        fdbck.text.value = '';
    })
    .catch((err) => console.log(err));
    
});