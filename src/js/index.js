const createButton = document.getElementById('createButton');
const overlay = document.getElementById('overlay');
const popup = overlay.getElementsByClassName('popup')[0];
const cancelButton = document.getElementById('cancel-button');
const saveButton = document.getElementById('save-button');
const statusButton = document.getElementsByClassName('status-button')[0];
const statusPopup = document.getElementsByClassName('card__status-popup')[0];
createButton.addEventListener('click', (event) => {
	event.preventDefault();
	popup.classList.remove('zoomOut');
	popup.classList.add('zoomIn');
	overlay.classList.remove('hidden');
	overlay.classList.add('show');
});

const closePopup = function() {
	popup.classList.remove('zoomIn');
	popup.classList.add('zoomOut');
		setTimeout(() => {
			overlay.classList.remove('show');
			overlay.classList.add('hidden');
		}, 350);
};

cancelButton.addEventListener('click', (event) => {
	event.preventDefault();
	closePopup();
});

saveButton.addEventListener('click', (event) => {
	event.preventDefault();
	closePopup();
});

statusButton.addEventListener('click', (event) => {
	event.preventDefault();
	statusPopup.classList.remove('fadeOut');
	statusPopup.classList.add('fadeIn');
	statusPopup.classList.remove('hidden');
	statusPopup.classList.add('show');
});
statusPopup.addEventListener('click', (event) => {
	if (event.target.tagName !== 'BUTTON') {
		console.log(event.target.tagName);
		return;
	}
	statusPopup.classList.remove('fadeIn');
	statusPopup.classList.add('fadeOut');
	setTimeout(() => {
		statusPopup.classList.remove('show');
		statusPopup.classList.add('hidden');
	}, 150);
});
