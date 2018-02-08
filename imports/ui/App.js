import { Template } from 'meteor/templating';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
//import Task from './Task.js';

var bold = false;
var italic = false;
var underline = false;
var box = false;
var color = '';

Template.formTemplate.events({
	
	'keydown'(event){
		if(event.which == 13 || event.which == 32){
			event.preventDefault();
			handleSubmit(event);
		}
	}
});


class App extends Component {

	renderBold(event){

		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";
		
		// Set the active style to bold
		if(ReactDOM.findDOMNode(this.refs.activeBold).innerHTML == ""){
			ReactDOM.findDOMNode(this.refs.activeBold).innerHTML = "bold ";
		} else {
			ReactDOM.findDOMNode(this.refs.activeBold).innerHTML = "";
		}

		// if we are unable to take away and active style this isn't needed
		if(bold){ 	bold = false; } 
		else { 		bold = true; }
	}
	renderItalic(event){ 

		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";

		if(ReactDOM.findDOMNode(this.refs.activeItalic).innerHTML == ""){
			ReactDOM.findDOMNode(this.refs.activeItalic).innerHTML = "italic ";
		} else {
			ReactDOM.findDOMNode(this.refs.activeItalic).innerHTML = "";
		}

		if(italic){	italic = false; } 
		else {		italic = true; }
	}
	renderUnderline(event){ 

		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";

		if(ReactDOM.findDOMNode(this.refs.activeUnderline).innerHTML == ""){
			ReactDOM.findDOMNode(this.refs.activeUnderline).innerHTML = "underline ";
		} else {
			ReactDOM.findDOMNode(this.refs.activeUnderline).innerHTML = "";
		}

		if(underline){	underline = false; } 
		else {			underline = true;  }
	}
	renderBox(event){

		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";

		if(ReactDOM.findDOMNode(this.refs.activeBox).innerHTML == ""){
			ReactDOM.findDOMNode(this.refs.activeBox).innerHTML = "box ";
		} else {
			ReactDOM.findDOMNode(this.refs.activeBox).innerHTML = "";
		}
		
		if(box){
			box = false;
		} else {
			box = true;
		}
	}
	renderBlue(event){
		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";
		ReactDOM.findDOMNode(this.refs.activeColor).innerHTML = "blue ";
		color = "color:blue;";
	}
	renderRed(event){
		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";
		ReactDOM.findDOMNode(this.refs.activeColor).innerHTML = "red ";
		color = "color:red;";
	}
	renderGreen(event){
		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = " ";
		ReactDOM.findDOMNode(this.refs.activeColor).innerHTML = "green ";
		color = "color:green;";
	}
	renderClearAllText(event){ 
		
		if(confirm("Do you want to delete all content?")) {
			ReactDOM.findDOMNode(this.refs.textField).innerHTML = "";
			ReactDOM.findDOMNode(this.refs.textInput).value = ""; 
		} 
	}
	// Handling the submit of the textField
	handleSubmit(event){
		event.preventDefault();

		// Find the text field via the React ref
		var Value = ReactDOM.findDOMNode(this.refs.textInput).value;
		ReactDOM.findDOMNode(this.refs.textInput).value = '';

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
		// Set the textInput to the textFiled
		if (ReactDOM.findDOMNode(this.refs.textField).innerHTML == ""){
			ReactDOM.findDOMNode(this.refs.textField).innerHTML = "<span style=" + style + color + ">" + Value + " </span>";
		} else {
			ReactDOM.findDOMNode(this.refs.textField).innerHTML += "<span style=" + style + color + ">" + Value + " </span>";
		}

		// reset the active styles
		ReactDOM.findDOMNode(this.refs.activeDefault).innerHTML = "no font effects active";
		ReactDOM.findDOMNode(this.refs.activeBold).innerHTML = "";
		ReactDOM.findDOMNode(this.refs.activeItalic).innerHTML =  "";
		ReactDOM.findDOMNode(this.refs.activeUnderline).innerHTML = "";
		ReactDOM.findDOMNode(this.refs.activeBox).innerHTML = "";
		ReactDOM.findDOMNode(this.refs.activeColor).innerHTML = "";
	}
	// render the HTML Template
	render() {

	    return (
	    	<div ref="container" id="container">
		      	<p id="header"><b>Welcome to MeteorEditor 1.0!</b></p>
		      	<div>
		        	<button ref="bold" id="bold" onClick={this.renderBold.bind(this)} >Bold</button>
		        	<button ref="italic" id="italic" onClick={this.renderItalic.bind(this)} >Italic</button>
		        	<button ref="underline" id="underline" onClick={this.renderUnderline.bind(this)} >Underline</button>
		      	</div>
		      	<br/>
		      	<div id="inline_As">
		        	<a href="#" onClick={this.renderBox.bind(this)} id="box" ref="box">A</a>
		        	<a href="#" onClick={this.renderRed.bind(this)} id="red" ref="red">A</a> 
		        	<a href="#" onClick={this.renderGreen.bind(this)} id="green" ref="green">A</a> 
		        	<a href="#" onClick={this.renderBlue.bind(this)} id="blue" ref="blue">A</a>
		      	</div>
		      	<p>Current status:  
		      		<span id="gray" ref="activeDefault"> no font effects active</span>
		      		<span ref="activeBold"></span>
		      		<span ref="activeItalic"></span>
		      		<span ref="activeUnderline"></span>
		      		<span ref="activeBox"></span>
		      		<span ref="activeColor"></span>
		      	</p>
		      	<br/><br/>
		      	<p ref="textField"></p>
		      	<form id="formInput" ref="formInput" onSubmit={this.handleSubmit.bind(this)}>
			        <input 
			            type="text" 
			            ref="textInput" />
			    </form>
			    <br/><br/>
			    <button ref="clearAllText" onClick={this.renderClearAllText.bind(this)} >Clear All Text</button>
  	      		<br/><br/>
		    </div>
	    );
	}	
}

export default withTracker(() => {
	return {};
})(App);
