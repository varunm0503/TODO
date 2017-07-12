var model = {
	cats: [
			{
				name : "CAT1",
				count : 0,
				image: "img1.jpg"
			},
			{
				name : "CAT2",
				count : 0,
				image : "img2.jpg"
			},
			{
				name : "CAT3",
				count : 0,
				image : "img3.jpg"
			}
		  ],
	currentCat : 0,
	setCurrentCat : function(i){
		this.currentCat = i;
	},
	getAllCats : function(){
		return this.cats;
	},
	getCurrentCat : function(){
		return this.cats[this.currentCat];
	},
	incrementCounter : function(){
		this.cats[this.currentCat].count++;
	}
};

var octopus = {
	init : function(){
		model.setCurrentCat(0);
		viewList.init();
		this.setClickDoms();
		viewDetail.init();
	},

	getAllCats : function(){
		return model.getAllCats();
	},

	setClickDoms : function(){
		const catsListArea = document.getElementById("list");
		let allCatsLi = catsListArea.getElementsByClassName("catListElement");
		for(let i=0;i<allCatsLi.length;i++){
			var cat = i;
			allCatsLi[i].addEventListener('click',function(cat){
					return function(){
						model.setCurrentCat(cat);
						viewDetail.render();
					}
			}(cat));
		}	
	},

	setDomOnImage : function(catArea){
		let imgTag = document.getElementsByClassName("image")[0];
		imgTag.addEventListener('click',function(){
				model.incrementCounter();
				viewDetail.render();
		});
	},

	getCurrentCat : function(){
		return model.getCurrentCat();
	}


};

var viewList = {
	init: function(){
		const catsListArea = document.getElementById("list");
		let catsList = octopus.getAllCats(); 
		
		for(let i = 0; i < catsList.length; i++){
			let newNode = document.createElement("li");
			newNode.setAttribute("class","catListElement");
			newNode.innerHTML = catsList[i].name;
			catsListArea.appendChild(newNode);
		}
	}
};

var viewDetail = {
	init : function(){
		const catArea = document.getElementById("catArea");
		let cat = octopus.getCurrentCat();
		catArea.innerHTML = `<div class="name" > ${cat.name} </div> 
							<div class="image"><img src=${cat.image} height="120px" width="auto"></div> 
							<div class = "count" > ${cat.count} </div>`;
		octopus.setDomOnImage(catArea);
	},

	render : function(){
		const catArea = document.getElementById("catArea");
		let cat = octopus.getCurrentCat();
		catArea.getElementsByClassName("name")[0].innerHTML = cat.name;
		catArea.getElementsByClassName("image")[0].innerHTML = '<img src="' + cat.image + '" height="120px" width="auto">';
		catArea.getElementsByClassName("count")[0].innerHTML = cat.count;
	}
};

octopus.init();