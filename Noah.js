/* Noah.js

THis is the same javascript that we used before - just externalized into a file

same benefits as the css - re-use, efficiency, cleaner html, etc....

*/

function checkForm(){
	// comments in javascript the same as in java
	/* this entire html page is called a document... 
			- think of it like a large XML document with nodes and attributes
			- each node has the < > symbols and within may be many attributes
	*/

	//i can get a secific element, by querying the "DOM"  (document object model), i.e. the page
	// like this:

	// let's start by diabling the button - the default position
	document.getElementById("button1").disabled = true;

	// now only if they have entered a name AND selected an option will we enable the button
	var txtBox = document.getElementById("name");
	if (txtBox.value.length > 0){
		var selBox = document.getElementById("oList");
		if (selBox.selectedIndex != -1 && selBox.selectedIndex != 0){
			// here both have a value, let's enable the button
			document.getElementById("button1").disabled = false;		
		}
	}
}

function submitClicked(str){
	//alert(str);

	// let's get a bit more complicated... let's write some results to our 'resultsDIV'

	// get the results div element
	var rd = document.getElementById("results");

	// get the option element
	var op = document.getElementById("oList");

	// create our 'message'
	var message = "Results: " 
		+ document.getElementById("name").value 
		+ " : "
		+ op.value
		+ " ("
		+ op.options[op.selectedIndex].text
		+ " )";

	// add the message to the div
	rd.innerText = message;

	// we also need to make the results visible
	//object.style.visibility = "visible|hidden|collapse|inil|inherit"
	rd.style.visibility = "visible";

	// Find our form in the DOM using its class name.
	var form = document.getElementById('frmData');

	var jsonFrmData = {};

	jsonFrmData.name = form[0];
	jsonFrmData.option = form[1];
	jsonFrmData.dateTime = new Date().toLocaleString().replace(",","").replace(/:.. /," ");

	rd.innerHTML = rd.innerText + "<br><br>" + jsonFrmData.toLocaleString();

}

function getImageJsonData(){
	// this is a component that can make http request from javascript
	var xmlhttp = new XMLHttpRequest();
	var url = "HTML_lesson4_data.json";

	// this is called a 'callback'...
	// when the xmlhttp component identifies it's going through a statechange
	// it will call back to this function we have defined.
	xmlhttp.onreadystatechange = function() {
		// http.status == 200 means success
		// other you should know would be 400 (not found)
	    if (this.readyState == 4 && this.status == 200) {

	    	// xmlhttp.responseText is what was returned from the server
	    	// in our case, it is the json data
	        var skuArr = JSON.parse(this.responseText);
	        // let's create a string fo html to put in our results
		    var out = "";
		    var i;
		    for(i = 0; i < skuArr.length; i++) {
		        out += skuArr[i].display + '<br><img src="' + skuArr[i].url + '"></img><p>';
		    }
		    	
			// get the results div element
			var rd = document.getElementById("results");
		
		    // write our 'list' to the results div.
		    // since we have embedded some HTML, we need innerHTML rather than innerText
		    rd.innerHTML = out;

		    // show the div
		    rd.style.visibility = "visible";

	    }
	};

	// the http verbs are 'get' (to just request a document) or 'post' (if you want to push data up to the server)
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
