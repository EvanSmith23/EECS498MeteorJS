import { Template } from 'meteor/templating';
import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
//import Task from './Task.js';

var bold = false;
var italic = false;
var underline = false;
var box = false;
var color = '';

Template.container.events({
	
	'keydown'(event){
		if(event.which == 13 || event.which == 32){
			event.preventDefault();

			var Value = document.getElementById('textInput').value;
			document.getElementById('textInput').value = "";

			var style = "";
			var textDecoration = "";

			// Check if any attributes are selected
			if(bold){		style += "font-weight:bold;"; } 
			if(italic){		style += "font-style:italic;"; }
			if(underline){ 	style += "text-decoration:underline;"; }
			if(box){		style += "border-style:solid;border-width:4px;" }
			// Set the styles back to false
			bold = false;
			italic = false;
			underline = false;
			box = false;

			// watch out for the span tags that already exist
			if(document.getElementById('textField').innerHTML == ""){
				document.getElementById('textField').innerHTML = "<span style=" + style + color + ">" + Value + " </span>";
			} else {
				document.getElementById('textField').innerHTML += "<span style=" + style + color + ">" + Value + " </span>";
			}

			document.getElementById('activeDefault').innerHTML = "no font effects active";
			document.getElementById('activeBold').innerHTML = "";
			document.getElementById('activeItalic').innerHTML =  "";
			document.getElementById('activeUnderline').innerHTML = ""; 
			document.getElementById('activeBox').innerHTML =  "";
			document.getElementById('activeColor').innerHTML = "";
		}
	},
	'click #bold' : function(event){
		
		document.getElementById("activeDefault").innerHTML = " ";

		if(document.getElementById("activeBold").innerHTML == ""){
			document.getElementById("activeBold").innerHTML = "Bold";
		} else {
			document.getElementById("activeBold").innerHTML  = "";
		}
		if(bold){ 	bold = false; } 
		else { 		bold = true; }
	},
	'click #italic' : function(event){
		document.getElementById("activeDefault").innerHTML  = " ";

		if(document.getElementById("activeItalic").innerHTML  == ""){
			document.getElementById("activeItalic").innerHTML = "Italic";
		} else {
			document.getElementById("activeItalic").innerHTML = "";
		}
		if(italic){ 	italic = false; } 
		else { 			italic = true; }
	},
	'click #underline' : function(event){
		document.getElementById("activeDefault").innerHTML  = " ";

		if(document.getElementById("activeUnderline").innerHTML  == ""){
			document.getElementById("activeUnderline").innerHTML  = "Underline";
		} else {
			document.getElementById("activeUnderline").innerHTML  = "";
		}
		if(underline){ 	underline = false; } 
		else { 			underline = true; }

	},
	'click #box' : function(event){
		document.getElementById("activeDefault").innerHTML  = " ";

		if(document.getElementById("activeBox").innerHTML  == ""){
			document.getElementById("activeBox").innerHTML  = "Box";
		} else {
			document.getElementById("activeBox").innerHTML  = "";
		}
		if(box){ 	box = false; } 
		else { 		box = true; }
	},
	'click #blue' :  function(event){
		document.getElementById("activeDefault").innerHTML  = " ";
		document.getElementById("activeColor").innerHTML = "Blue ";
		color = "color:blue;";
	},
	'click #green' :  function(event){
		document.getElementById("activeDefault").innerHTML  = " ";
		document.getElementById("activeColor").innerHTML = "Green ";
		color = "color:green;";
	},
	'click #red' :  function(event){
		document.getElementById("activeDefault").innerHTML  = " ";
		document.getElementById("activeColor").innerHTML = "Red ";
		color = "color:red;";
	},
	'click #clearAllText' : function(event){
		if(confirm("Do you want to delete all content?")) {
			document.getElementById("textField").innerHTML  = "";
			document.getElementById("textInput").innerHTML  = "";
		}
	}
});


class App extends Component {
	// render the HTML Template
	render() {
	    return (<div></div>);
	}	
}

export default withTracker(() => {
	return {};
})(App);
