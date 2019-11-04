export default class TodoItemPopup {
	title;
	description;
	priority;
	overlayElement;
	popup;
	todoItem;

	constructor(onSaved) {
		this.onSaved = onSaved;
		this.getElements();
		this.addCancelHandler();
		this.addSubmitHandler();
	}

	getElements() {
		this.overlayElement = document.getElementById('overlay');
		this.title = document.getElementById('popup-title');
		this.description = document.getElementById('popup-description');
		this.priority = document.getElementById('popup-priority');
		this.popup = document.getElementById('popup');
	}

	show(item) {
		this.todoItem = item;
		this.title.value = item.title;
		this.description.value = item.description;
		this.priority.value = item.priority;
		this.popup.classList.remove('zoomOut', 'hidden');
		this.popup.classList.add('zoomIn', 'show');

		this.overlayElement.classList.remove('hidden');
		this.overlayElement.classList.add('show');
	}

	addCancelHandler() {
		const cancelButton = document.getElementById('cancel-button');

		cancelButton.addEventListener('click', () => {
			this.closePopup();
		});

	}

	addSubmitHandler() {
		const form = document.getElementById('popup-form');

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			if (form.reportValidity()) {
				this.todoItem.title = this.title.value;
				this.todoItem.description = this.description.value;
				this.todoItem.priority = this.priority.value;
				this.closePopup();
				this.todoItem.setValue();
				this.onSaved(this.todoItem);
			}
		});
	}

	closePopup() {
		this.popup.classList.remove('zoomIn');
		this.popup.classList.add('zoomOut');
		setTimeout( () => {
			this.overlayElement.classList.remove('show');
			this.overlayElement.classList.add('hidden');
			this.popup.classList.remove('show');
			this.popup.classList.add('hidden');
		}, 350);
	}


}

