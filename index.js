//For "Auto Generate"
var tempImageSources = [ 
	['Scene', 'interface-image-samples/alex-ryan2.jpg'],
	['Scene', 'interface-image-samples/ben-pep.jpg'],
	['Scene', 'interface-image-samples/bruno12.jpg'],
	['Scene', 'interface-image-samples/gundogan.jpg']
];

//For "Add"
var selectedShots = [
	['Shot', 'video-shots/ball4.jpg'],
	['Shot', 'video-shots/Cazorla-Arteta.jpg'],
	['Shot', 'video-shots/etihad6.jpg'],
	['Shot', 'video-shots/giggs-moyes.jpg'],
	['Shot', 'video-shots/gomez-morata.jpg'],
	['Shot', 'video-shots/jens2.jpg'],
	['Shot', 'video-shots/norwood-sharp.jpg']
];


window.addEventListener('load', function () {
	document.getElementById("editable-story-plot").style.display = "none";
	document.getElementById("video-shot-selector").style.display = "none";
})


function autoGenerateHandler() {
	//alert("Vse");
	//document.getElementById("story-plot").innerHTML="<img src='interface-image-samples/alex-ryan2.jpg' />";
	//document.getElementById("story-plot").innerHTML="<img src='interface-image-samples/ben-pep.jpg' />";

	document.getElementById("story-plot").innerHTML = "";
	//var narrativeValue = document.getElementById("narrative-value").value;
	//var narrativeValueElements = narrativeValue.split("-");


	for (var i = 0; i < tempImageSources.length; i++) {
		var div = document.createElement('div');
		div.setAttribute("class", "scene-shot");
		div.style.height = "110px";
		div.style.width = "195px";


		var paragraph = document.createElement('p');
		paragraph.setAttribute("class", "scene-number");
		paragraph.innerHTML = tempImageSources[i][0] + ' ' + (i + 0);
		div.appendChild(paragraph);

		var img = document.createElement('img');
		img.style.width = "100%";
		img.style.height = "100%";
		img.src = tempImageSources[i][1];
		div.appendChild(img);
		document.getElementById('story-plot').appendChild(div);
	}

	document.getElementById("btn-story-edit").disabled = false;
	document.getElementById("btn-story-edit").style.backgroundColor = 'blue';


}

/*Draw/redraw the story shots from a given array*/
function storyEditHandler() {


	document.getElementById("video-story-plot-auto-generator").style.display = "none";
	document.getElementById("btn-check-result").disabled = false;
	document.getElementById("btn-check-result").style.backgroundColor = 'blue';

	document.getElementById("editable-story-plot").style.display = "";

	var i = 0;

	for (i; i < tempImageSources.length; i++) {
		
		// Edit Div containing Paragraph, Image, Remove Button 
		var editableDiv = document.createElement('div');
		editableDiv.setAttribute("class", "editable-scene-shot");
		editableDiv.style.height = "180px";
		editableDiv.style.width = "195px";

		var paragraph = document.createElement('p');
		paragraph.setAttribute("class", "editable-scene-number");
		paragraph.innerHTML = tempImageSources[i][0] + ' ' + (i + 0);
		

		var imageContainerDiv = document.createElement('div');
		imageContainerDiv.setAttribute("class", "editable-scene-image-container");
		imageContainerDiv.style.height = "110px";
		imageContainerDiv.style.width = "195px";

		var img = document.createElement('img');
		img.style.width = "100%";
		img.style.height = "100%";
		img.src = tempImageSources[i][1];
		imageContainerDiv.appendChild(img);

		var removeButton = document.createElement('button');
		removeButton.setAttribute("id", "remove-button-" + i);
		removeButton.style.width = "100%";
		removeButton.style.height = "25px";
		removeButton.style.marginTop = "10px";
		removeButton.style.backgroundColor = "green";
		removeButton.style.clear = "both";
		removeButton.style.float = "left";
		removeButton.innerHTML = "Remove";

		//Click Even Listener for Remove Button
		//removeButton.addEventListener("click", removeButtonHandler(removeButton.id));
		removeButton.setAttribute("onclick", "removeButtonHandler(event)");

		// Initialize Editable Div with Paragraph, Image, Remove Button 
		editableDiv.appendChild(paragraph);
		editableDiv.appendChild(imageContainerDiv);
		editableDiv.appendChild(removeButton);        

		

        document.getElementById('editable-story-plot').appendChild(addButtonCreator(i));
		document.getElementById('editable-story-plot').appendChild(editableDiv);

	}

    document.getElementById('editable-story-plot').appendChild(addButtonCreator(i));


}


function addButtonCreator(i) {
	// Div containing only Add Button
	var addButtonDiv = document.createElement('div');
	addButtonDiv.setAttribute("class", "add-button-div");
	addButtonDiv.style.height = "180px";
	addButtonDiv.style.width = "30px";

	// Add button
	var addButton = document.createElement('button');
	addButton.setAttribute("id", "add-button-" + i);
	addButton.setAttribute("class", "add-button-cls")
	addButton.style.width = "30px";
	addButton.style.height = "110px";
	addButton.style.marginTop = "0px";
	addButton.style.backgroundColor = "blue";
	addButton.style.color = "white";		
	addButton.innerHTML = "<span id=\"span-button-" + i + "\" class=\"add-button-text\" style=\"color:white\">Add</span>";
	
    //Click Even Listener for Add Button
	addButton.setAttribute("onclick", "addButtonHandler(event)");

    //Initialize Add Button Div with Add Button
	addButtonDiv.appendChild(addButton);

	return addButtonDiv;


}


function removeButtonHandler(e) {
	
	var element = e.target || e.srcElement;
    //get clicked element's ID
    var id = element.id.split("-")[2];
    

    //execute Remove
    tempImageSources.splice(id, 1);
     
    if (tempImageSources.length == 0) 
    	globalAddButtonClicked = -1;

    //clear the displayed screen of scenes
    document.getElementById('editable-story-plot').innerHTML="";

    // redraw the editable scenes shots
    storyEditHandler();

    if (globalAddButtonClicked != -1) { 

	    document.getElementById("add-button-" + globalAddButtonClicked).style.backgroundColor = "red";
	    
	}


}

var globalAddButtonClicked = -1;

function addButtonHandler(e) {
	//document.getElementById("btn-check-result").style.display = "none";
	document.getElementById("video-shot-selector").style.display = "";

	var element = e.target || e.srcElement;
    //get clicked element's ID
    var id = element.id.split("-")[2];

    if (globalAddButtonClicked != -1) { 

	    document.getElementById("add-button-" + globalAddButtonClicked).style.backgroundColor = "blue";
	    
	}

	globalAddButtonClicked = id;

	document.getElementById("add-button-" + id).style.backgroundColor = "red";
    //create Search field Div containing Span, Input, Search Button to browse for Video Shots Scenes   


}

function searchButtonHandler() {
	//In order to make this function work
	// Id of Clicked Add Button should be global somehow
	// so Search Button will bring results depeneding on that ID of Add Button!

	//Below code follows scenario after qeuary already got executed
	document.getElementById("video-story-plot-auto-generator").style.display = "none";
	document.getElementById("btn-check-result").disabled = false;
	document.getElementById("btn-check-result").style.backgroundColor = 'blue';

	document.getElementById("selectable-shot-displayer").style.display = "";
	document.getElementById("selectable-shot-displayer").innerHTML = "";


	var i;

	for (i = 0; i < selectedShots.length; i++) {

		
		// Edit Div containing Paragraph, Image, Remove Button 
		var selectableDiv = document.createElement('div');
		selectableDiv.setAttribute("class", "editable-scene-shot");
		selectableDiv.style.height = "180px";
		selectableDiv.style.width = "195px";

		var paragraph = document.createElement('p');
		paragraph.setAttribute("class", "editable-scene-number");
		paragraph.innerHTML = selectedShots[i][0] + ' ' + (i + 0);
		

		var imageContainerDiv = document.createElement('div');
		imageContainerDiv.setAttribute("class", "editable-scene-image-container");
		imageContainerDiv.style.height = "110px";
		imageContainerDiv.style.width = "195px";

		var img = document.createElement('img');
		img.style.width = "100%";
		img.style.height = "100%";
		img.src = selectedShots[i][1];
		imageContainerDiv.appendChild(img);

		var selectButton = document.createElement('button');
		selectButton.setAttribute("id", "select-button-" + i);
		selectButton.style.width = "100%";
		selectButton.style.height = "25px";
		selectButton.style.marginTop = "10px";
		selectButton.style.backgroundColor = "blue";
		selectButton.style.color = "white";
		selectButton.style.clear = "both";
		selectButton.style.float = "left";
		selectButton.innerHTML = "Select";



		//Click Even Listener for Remove Button
		//removeButton.addEventListener("click", removeButtonHandler(removeButton.id));
		selectButton.setAttribute("onclick", "selectButtonHandler(event)");

		// Initialize Editable Div with Paragraph, Image, Remove Button 
		selectableDiv.appendChild(paragraph);
		selectableDiv.appendChild(imageContainerDiv);
		selectableDiv.appendChild(selectButton);        

		

        
		document.getElementById('selectable-shot-displayer').appendChild(selectableDiv);

	}   


}


function selectButtonHandler(e) {

	var element = e.target || e.srcElement;
    //get clicked element's ID
    var id = element.id.split("-")[2];

     //add to this id in tempImageSources => selectedShots[id]
     //refresh div

     /*arr.splice(index, 0, item); will insert item into arr at the 
     specified index (deleting 0 items first, that is, it's just an insert).*/

    tempImageSources.splice(globalAddButtonClicked, 0, selectedShots[id]);


	//clear the displayed screen of scenes
	document.getElementById('editable-story-plot').innerHTML="";
	//globalAddButtonClicked = globalAddButtonClicked + 1;

	// redraw the editable scenes shots
	storyEditHandler();

	document.getElementById("add-button-" + globalAddButtonClicked).style.backgroundColor = "red";


}

function cancelButtonHandler() {
	document.getElementById("video-shot-selector").style.display = "none";
	globalAddButtonClicked = -1;
	document.getElementById('editable-story-plot').innerHTML="";

	storyEditHandler();

	document.getElementById("selectable-shot-displayer").style.display = "none";

}