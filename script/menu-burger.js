const menu_burger = document.querySelector("#menu_burger");
const menu_window = document.querySelector("#menu_window");

menu_burger.onclick = () => {
	if (menu_burger.className === 'link'){
		menu_burger.className = 'link_active';
		menu_window.style.display = 'block';
	} else {
		menu_burger.className = 'link';
		menu_window.style.display = 'none';
	}
}

document.querySelectorAll('.punct_in_menu_window').forEach((elem) => {
	elem.firstElementChild.onclick = () => {
		menu_burger.className = 'link';
		menu_window.style.display = 'none';
	}
});