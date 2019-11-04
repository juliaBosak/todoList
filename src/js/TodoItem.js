class TodoItem {
	title = '';
	description = '';
	priority = 'high';
	status = 'open';
	/**
	 *
	 * @type {null | HTMLElement}
	 */
	node = null;
	titleNode;
	descriptionNode;
	priorityNode;
	statusButtonNode;
	doneButtonNode;
	editButtonNode;
	deleteButtonNode;
	statusPopupElement;

	constructor(app) {
		this.render();
		this.app = app;
	}

	render() {
		this.node = document
			.getElementById('card-template')
			.firstElementChild
			.cloneNode(true);
		this.titleNode = this.node.getElementsByClassName('card__title')[0];
		this.descriptionNode = this.node.getElementsByClassName('card__description')[0];
		this.priorityNode = this.node.getElementsByClassName('card__priority')[0];
		this.statusButtonNode = this.node.getElementsByClassName('status-button')[0];
		[
			this.doneButtonNode,
			this.editButtonNode,
			this.deleteButtonNode,
		] = this.node.getElementsByClassName('card__status-button');

		this.statusPopupElement = this.node.getElementsByClassName('card__status-popup')[0];

		this.statusButtonNode.addEventListener('click', (event) => {
			this.statusPopupElement.classList.remove('hidden');
			this.statusPopupElement.classList.add('show');
			event.stopPropagation();
			const func = () => {
				this.closeStatusPopup();
				document.body.removeEventListener('click', func);
			};
			document.body.addEventListener('click', func);
		});

		this.doneButtonNode.addEventListener('click', () => {
			this.node.classList.add('done');
			this.status = 'done';
			this.editButtonNode.disabled = true;
		});

		this.deleteButtonNode.addEventListener('click', () => {
			this.app.deleteItem(this);
		});

		this.editButtonNode.addEventListener('click', () => {
			this.app.todoItemPopup.show(this);
		});
	}

	setValue() {
		this.titleNode.textContent = this.title;
		this.descriptionNode.textContent = this.description;
		this.priorityNode.textContent = this.priority;
	}

	closeStatusPopup() {
		this.statusPopupElement.classList.remove('show');
		this.statusPopupElement.classList.add('hidden');
	}

}

export default TodoItem;
