/*------------------------------- BOTTOM BUTTONS STYLE -----------------------------------*/
export function buttonsStyle(array, object, type) {
	array.forEach((checkbox) => {
		if (checkbox === document.getElementById(`${1+object.index}`+type)){
			checkbox.classList.add('active');
		} else {
			checkbox.classList.remove('active');
		}
		object.left.style.opacity = '1';
		object.right.style.opacity = '1';
	});
	if (object.slider.style.transform === `translateX(${(-1)*object.width*(object.len - object.len)}px)`) {
		object.left.style.opacity = '0.5';
		object.right.style.opacity = '1';
	}
	if (object.slider.style.transform === `translateX(${(-1)*object.width*(object.len-1)}px)`) {
		object.left.style.opacity = '1';
		object.right.style.opacity = '0.5';
	}
}

export function createElementsAndChackboxs(n, create, type, object, url) {
    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        create(res);
    })
    .then((res) => {
        // console.log(object.slider.children.length);
        object.len = Math.ceil(object.slider.children.length/n);
        // console.log(object.len);
        const place = document.querySelector(`#buttons_${type}`);
        for (let i=1; i<=object.len; i++) {
            const checkbox =  `<li><button class="checkbox ${type} ${i===1 ? 'active' : ''}" id="${i}${type}" name="button checkbox"></button></li>`;
            place.insertAdjacentHTML('beforeend', checkbox);
        }
    })
    .then(() => {
        object.checks = document.querySelectorAll(`.${type}`);
        for (let i=0; i<object.len; i++) {
            document.getElementById(`${1+i}`+type).onclick = () => {
                if (object.slider.style.transform !== `translateX(${(-1)*object.width * i}px)`){
                    object.index = i;
                    object.slider.style.transform = `translateX(${(-1)*object.width * object.index}px)`;
                    buttonsStyle(object.checks, object, type);
                }
            };
        }
    });
}

/*------------------------------- SCROLL LEFT ---------------------------------------------*/
export function left(object, type) {
	if (object.slider.style.transform === `translateX(${(-1)*object.width*(object.len - object.len)}px)`) {
        buttonsStyle(object.checks, object, type);
        return
    } else if (object.slider.style.transform === `translateX(${(-1)*object.width * object.index}px)`) {
        object.index--;
        object.slider.style.transform = `translateX(${(-1)*object.width * object.index}px)`;
    }
    buttonsStyle(object.checks, object, type);
}
/*------------------------------- SCROLL RIGHT ---------------------------------------------*/
export function right(object, type) {
	if (object.slider.style.transform === `translateX(${(-object.width*(object.len-1))}px)`){
		buttonsStyle(object.checks, object, type);
		return
	} else if (object.slider.style.transform === `translateX(${(-object.width * object.index)}px)`){
		object.index++;
		object.slider.style.transform = `translateX(${(-object.width * object.index)}px)`;
	}
	buttonsStyle(object.checks, object, type);
}