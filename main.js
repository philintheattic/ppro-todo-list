
const listContainer = document.getElementById("listContainer");
const addbtn = document.getElementById("addbtn");
const delbtn = document.getElementById("delbtn");
const inputlistname = document.getElementById("input-list-name");
const allcontent = document.getElementById("allcontent");
const tasksContainer = document.querySelector("[data-tab-content]");
const tasktemplate = document.getElementById("task-template");
const input = document.getElementById("input");

const apple = document.getElementById("apple");
const philly = document.getElementById("philly");
const responses = ["⁽ᵇˡᵉᵇ⁾", "⁽ᴰᵃⁿᵏᵉ ᴮʳᵘᵈᵉʳ⁾", "⁽ᵃᵃᵃʰ ˡᵉᶜᵏᵉʳ⁾", "⁽ᴱʰʳᵉ⁾", "⁽ʸᵉᵃʰ⁾", "⁽ᵒᵏᵃʸ ˡᵉᵗ'ˢ ᵍᵒ⁾", "ichachakch"];


const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedlistid"
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedlistid = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);



listContainer.addEventListener("click", e => {
	if (e.target.tagName.toLowerCase() === "li") {
		selectedlistid = e.target.dataset.listId;
		save_and_render();
	}
})

listContainer.addEventListener("contextmenu", e => {
	e.preventDefault();
	console.log("rechtsklick");
	if (e.target.tagName.toLowerCase() === "li") {
		//selectedlistid = e.target.dataset.listId;
		lists = lists.filter(list => list.id !== e.target.dataset.listId);
		selectedlistid = null;
		//console.log(selectedlistid);
		save_and_render();
	}
})

tasksContainer.addEventListener("click", e => {
	if (e.target.tagName.toLowerCase() === "input") {
		const selectedlist = lists.find(list => list.id === selectedlistid);
		const selectedtask = selectedlist.tasks.find(task => task.id === e.target.id);
		selectedtask.complete = e.target.checked;
		save();
	}
})

tasksContainer.addEventListener("dragstart", e => {
	if (e.target.classList.contains("task")) {
		e.dataTransfer.setData("text", e.target.querySelector("input").id);
		console.log(e.dataTransfer.getData("text"));
		e.target.classList.add("dragging-task");
	}
})

tasksContainer.addEventListener("dragend", e => {
	if (e.target.classList.contains("task")) {
		//e.dataTransfer.setData("text", e.target.querySelector("input").id);
		//console.log(e.dataTransfer.getData("text"));
		e.target.classList.remove("dragging-task");
	}
})

delbtn.addEventListener("click", e => {
	lists = lists.filter(list => list.id !== selectedlistid);
	selectedlistid = null;
	save_and_render();	
})




function save() {
	localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
	localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedlistid);
}

function save_and_render() {
	save();
	render();
}

function render() {
	clearElements(listContainer);
	renderlists();
	const selectedlist = lists.find(list => list.id === selectedlistid)
	if (selectedlistid == null) {
		//selectedlist = lists[lists.length - 1];
		allcontent.style.display = "none";
		input.disabled = true;
	} else {
		allcontent.style.display = "";
		clearElements(tasksContainer);
		rendertasks(selectedlist);
		input.disabled = false;
	}
	
}

function rendertasks(selectedlist) {
	selectedlist.tasks.forEach(task => {
		const taskelement = document.importNode(tasktemplate.content, true);
		const checkbox = taskelement.querySelector("input");
		checkbox.id = task.id;
		checkbox.checked = task.complete;
		const label = taskelement.querySelector("label")
		label.htmlFor = task.id;
		label.append(task.name);
		//taskelement.setAttribute("draggable=true");
		tasksContainer.appendChild(taskelement);
		//if (checkbox.checked) {
		//	label.classList.add("completed");
		//}
	})
}

function renderlists() {
	if(lists.length === 0) {
		window.localStorage.clear();
		listContainer.insertBefore(addbtn, null);
		listContainer.insertBefore(inputlistname, addbtn);
		
		
	}
	
	lists.forEach(list => {
		let node = document.createElement("li");
		node.dataset.listId = list.id;
		node.classList.add("list-name");
		node.innerText = list.name;
		if (list.id === selectedlistid) {
		//if (list.id === Date.now().toString() || list.id === selectedlistid) {
			node.classList.add("active-list")
		}
		
		listContainer.append(node);
		listContainer.insertBefore(addbtn, null);
		listContainer.insertBefore(inputlistname, addbtn);
	})
}
			
function clearElements(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
}

function show_element(element) {
	element.style.display = "block";
	element.focus();
}

function hide_element(element) {
	element.style.display = "none";

}

function create_list(name) {
	return ({id: Date.now().toString(), name:name, tasks: []})
}	

render();

addbtn.addEventListener("click", function() {
	show_element(inputlistname);
});

inputlistname.addEventListener("change", function() {
	const listname = inputlistname.value;
	const list = create_list(listname)
	hide_element(inputlistname);
	inputlistname.value = "";
	lists.push(list);
	save_and_render();
	console.log(lists);
})

input.addEventListener("change", function() {
	const taskname = input.value;
	const task = create_task(taskname)
	hide_element(inputlistname);
	input.value = "";
	const selectedlist = lists.find(list => list.id === selectedlistid);
	selectedlist.tasks.push(task);
	save_and_render();
	console.log(lists);
})

function create_task(name) {
	return { id: Date.now().toString(), name: name, complete: false }
}


function get_response() {
	var rand = Math.floor(Math.random() * responses.length);
	return responses[rand];
}

apple.addEventListener("dragstart", e => {
	console.log("jetzt wird gedragt!");
	e.target.classList.add("dragging");
	var appleid = e.dataTransfer.setData("text", "1");
	console.log(e.dataTransfer.getData("text"));
})

apple.addEventListener("dragend", e => {
	console.log("jetzt wird nich mehr gedragt!");
	e.target.classList.remove("dragging");
})

philly.addEventListener("dragover", e => {
	e.preventDefault();
	console.log("jetzt wirds ernst...");
})

philly.addEventListener("drop", e => {
	console.log("drop");
	var response = document.createTextNode(get_response());
	philly.appendChild(response);
	setTimeout( () => {
		philly.removeChild(response);
	}, 3000);
	const selectedlist = lists.find(list => list.id === selectedlistid);
	selectedlist.tasks = selectedlist.tasks.filter(task => task.id !== e.dataTransfer.getData("text"));
	save_and_render();
})