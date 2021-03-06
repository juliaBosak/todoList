import TodoItemPopup from "./TodoItemPopup";
import TodoItem from "./TodoItem";

class App {
	todoItems = [];
	todoItemsNode = document.getElementById('todo-items');
	statusSelect = document.getElementById('status-select');
	prioritySelect = document.getElementById('priority-select');
	searchInput = document.getElementById('search-field');


	constructor() {
		this.addCreateButtonHandler();
		this.todoItemPopup = new TodoItemPopup((item) => {
			this.todoItems.push(item);
			this.renderItemList();
		});
		this.addOptionsHandlers();
		this.addSearchHandlers();
	}

	addCreateButtonHandler() {
		const createButton = document.getElementById('createButton');
		createButton.addEventListener('click', () => {
			this.todoItemPopup.show(new TodoItem(this));
		});
	}

	renderItemList() {
		this.todoItemsNode.innerHTML = '';
		let filteredItems = this.todoItems;
		if (this.statusSelect.value) {
			filteredItems = filteredItems.filter((item) => item.status === this.statusSelect.value);
		}
		if (this.prioritySelect.value) {
			filteredItems = filteredItems.filter((item) => item.priority === this.prioritySelect.value);
		}
		if (this.searchInput.value) {
			filteredItems = filteredItems.filter((item) => item.title.startsWith(this.searchInput.value));
		}
		filteredItems.forEach((item) => this.todoItemsNode.appendChild(item.node));
	}

	deleteItem(item) {
		this.todoItems.splice(this.todoItems.indexOf(item), 1);
		this.renderItemList();
	}

	addSearchHandlers() {
		this.statusSelect.addEventListener('change', () => this.renderItemList());
		this.prioritySelect.addEventListener('change', () => this.renderItemList());
		this.searchInput.addEventListener('input', () => this.renderItemList());
	}
	addOptionsHandlers() {
		const selects = document.getElementsByTagName('select');
		for (let index = 0; index < selects.length; index++) {
			const selectOptions = selects[index].options;
			selectOptions[selects[index].selectedIndex].hidden = true;
			selects[index].addEventListener('change', () => {
				const selectedIndex = selects[index].selectedIndex;
				for (let optionIndex = 0; optionIndex < selectOptions.length; optionIndex += 1) {
					if (optionIndex === selectedIndex) {
						selectOptions[selectedIndex].hidden = true;
					}
					else {
						selectOptions[optionIndex].hidden = false;
					}
				}
			})
		}
	}
}

export default App;
