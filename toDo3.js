const types = {
	ALL: 'All',
	ARCHIVE: 'Archive',
	PENDING: 'Pending',
	DONE: 'Done'
};

var model = {
	
	count: 0,

	toDoNotes : [],

	currentType : "",

	types : [types.ARCHIVE,types.PENDING,types.DONE],

	init : function(){
		this.currentType = types.ALL;
		this.count = 0;
	},

	addNote : function(noteText){
		this.count++;

		let note  = {
			id: this.count,
			text : noteText,
			type : types.PENDING
		}
		this.toDoNotes.push(note);
		return note;
	},

	changeNoteType : function(noteId,newType){
		let intNoteId = parseInt(noteId);
		let note = this.toDoNotes.find( n => n.id === intNoteId);
		//let note = this.toDoNotes.filter( n => n.id === intNoteId)[0];
		note.type = newType;
	},

	getNotes : function(type){
		const allNotes = this.toDoNotes;
		return type === types.ALL ? allNotes : allNotes.filter(note => note.type === type); 
	},

	getTypes : function(){
		return this.types;
	},

	getType : function(i){
		return this.types[i];
	},

	getCurrentType : function(){
		return this.currentType;
	},

	setCurrentType : function(type){
		model.currentType = type;
	}

};

var octopus = {
	
	init: function(){
		view.init();
		model.init();
	},

	saveNoteAsPending : function(noteText){
		let note = model.addNote(noteText);
		view.createNewNoteNode(note);
	},

	getNotes : function(type){
		return model.getNotes(type);
	},

	getTypes : function(){
		return model.getTypes();
	},

	getType : function(i){
		return model.getType(i);
	},

	changeType : function(type){
		model.setCurrentType(type);
	},

	getCurrentType : function(){
		return model.getCurrentType();
	},

	changeNoteType : function(noteId, newType){
		model.changeNoteType(noteId, newType);
	},

	stringify: function(){
		var str = this.getCurrentType();
		str += "[";
		const allNotes = model.toDoNotes;
		for(let i =0;i<allNotes.length;i++){
			str += "{" + allNotes[i].id + " " + allNotes[i].text + " " + allNotes[i].type + "}"; 
		}
		str+="]"
		return str;
	}

};

var view = {

	init : function(){
		const toDoDiv = document.getElementById("TODO"); //let/consts
		const inputArea = toDoDiv.querySelector('.toDo__input');
		inputArea.addEventListener('keypress',function(e){
				var key = e.which || e.keyCode;
    			if (key === 13) { 
      				octopus.saveNoteAsPending(this.value);
    			}
		});

		const allTypes = document.querySelector('.tab');
		const that = this;

		for (var i=0;i<allTypes.children.length;i++){
			allTypes.children[i].addEventListener('click',function(index){
				const category = index === 0 ? types.ALL : octopus.getType(index-1);
				return function(){
					octopus.changeType(category);
					that.render();
				}
			}(i));
		}

		const notesArea = toDoDiv.querySelector('#notesArea');

		notesArea.addEventListener('click',function(e){
			const targetedDiv = e.target;
			if(targetedDiv.classList.contains("options__button")){
				const noteDiv = targetedDiv.parentNode.parentNode;
				const noteId = noteDiv.getAttribute("data-type");
				const options = noteDiv.children[1].children;
				const newType = e.target.getAttribute("data-type");

				octopus.changeNoteType(noteId,newType);

				for(let i=0;i<options.length;i++){	
					const type = options[i].getAttribute("data-type");
					if(type === newType){
						options[i].classList.add('disabled');
					} else {
						if(options[i].classList.contains('disabled')){
							options[i].classList.remove('disabled');
						}
					}
				}

				if(octopus.getCurrentType() !== types.ALL){
					noteDiv.parentNode.removeChild(noteDiv);
 				} 
			}
		});

	},

	createNewNoteNode : function(note){
		const notesArea = document.getElementById("notesArea");
 		notesArea.appendChild(this.createNoteNode(note));
	},

	createNoteNode: function(note){
		const allTypes = octopus.getTypes();
		const newNode = document.createElement('li');
		newNode.setAttribute("class","note");
		newNode.setAttribute("data-type",note.id);
		newNode.innerHTML = `<span class ="col-xs-8">${note.text}</span>
							<span class="options col-xs-4 btn-group">
							<button class="options__button btn btn-primary" data-type=${types.ARCHIVE}>Archive</button>
							<button class="options__button btn btn-primary" data-type=${types.PENDING}>Pending</button>
							<button class="options__button btn btn-primary" data-type=${types.DONE}>Done</button>
							</span>`;
		const options = newNode.querySelectorAll('.options__button');
		for (let j = 0;j< allTypes.length;j++){
 			if (allTypes[j] === note.type){
 				options[j].classList.add('disabled');
 			}
 		}
 		if(!(octopus.getCurrentType() === "All" || octopus.getCurrentType() === note.type)){
 			newNode.classList.add("note_displayNone");
 		} 
 		return newNode;
	},

	render: function(){
		//console.log(octopus.stringify());
		const type = octopus.getCurrentType();
		const tab = document.querySelector(".tab");
		for(let i =0;i<tab.children.length;i++){
			if(type === tab.children[i].getAttribute("data-type")){	
				tab.children[i].classList.add('active');
			} else {
				if(tab.children[i].classList.contains('active')){
					tab.children[i].classList.remove('active');
				}
			}
		}

		const notesArea = document.getElementById("notesArea");
		notesArea.innerHTML = "";
		const filteredNotes = octopus.getNotes(type);
		for(let j=0;j<filteredNotes.length;j++){
			this.createNewNoteNode(filteredNotes[j]);
		}

	}
};

octopus.init();


//Data manipulation library for append and other functions => something like jsonq

//Dont store dom
//Const vs let closure
//show state
//try and move content to html itself
//scss
//bootstrap
//I can add event listener on parent and fetch the dom where the event emerged from. 
//Use data-type to store data in html
//Use classes instaed of style.display. That way repaint and reflow cost is lower
//Template strings used

