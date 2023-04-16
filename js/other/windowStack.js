"use strict";
var windowStacks = [];
function windowCreate(sId, bShow) {
	var oWindow = new windowStack(document.getElementById(sId));
	if (bShow) {
		oWindow.show();
	}
	return oWindow;
}
function windowStack(element) {
	if (element != null && typeof element == "object") {
		this.lastOpacity = null;
		this.domObject = element;
		this.hadFocus = true;
		this.hookedMouse = false;
		var thisObj2 = this;
		this.events = [
		];
	}
}
windowStack.prototype.registerMouseEvents = function () {
	if (!this.hookedMouse) {
		this.hookedMouse = true;
		var eventIndex = null;
		for (eventIndex in this.events) {
			addEvent(this.events[eventIndex][0], document, this.events[eventIndex][1]);
		}
		this.center();
	}
}
windowStack.prototype.unregisterMouseEvents = function () {
	if (this.hookedMouse) {
		this.hookedMouse = false;
		var eventIndex = null;
		for (eventIndex in this.events) {
			removeEvent(this.events[eventIndex][0], document, this.events[eventIndex][1]);
		}
	}
}
windowStack.prototype.getStyleFloatOf = function (propertyNameOf, JSpropertyNameOf) {
	try {
		var dirtyValue = window.getComputedStyle(this.domObject, null).getPropertyValue(propertyNameOf);
	}
	catch (error) {
		try {
			var dirtyValue = this.domObject.currentStyle.getAttribute(JSpropertyNameOf);	/*JS object notation style keywords, not the CSS keywords!*/
		}
		catch (error) {
			cout(error.message, 2);
		}
	}
	var cleanValue = parseFloat((dirtyValue != null && dirtyValue.length) ? dirtyValue : "0");
	return (!isNaN(cleanValue) && cleanValue != -1) ? cleanValue : 0;	/*Note: Opera gives -1, not NaN for cleanValue when no number is found.*/
}
windowStack.prototype.lostFocus = function () {
	if (this.hadFocus) {
		this.domObject.style.zIndex = 1;
		this.hadFocus = false;
	}
}
windowStack.prototype.interceptOpacity = function () {
	if (this.lastOpacity != null) {
		this.lastOpacity.bDoneRun = true;
		return this.lastOpacity.RefOpacityAREABegin;
	}
	var sampledOpacity = this.getStyleFloatOf("opacity", "opacity") * 100;
	return (sampledOpacity > 0) ? sampledOpacity : 100;	/*Dirty opacity first-set for IE*/
}
windowStack.prototype.center = function () {
	return
}
windowStack.prototype.hide = function () {
	this.domObject.style.display = "none";
	this.unregisterMouseEvents();
}
windowStack.prototype.show = function () {
	this.domObject.style.display = "block";
	this.registerMouseEvents();
}
function popupMenu(oClick, oMenu) {
	this.clickElement = oClick;
	this.menuElement = oMenu;
	var thisObj2 = this;
	this.eventHandle = [
		function (event) { thisObj2.startPopup(event); },
		function (event) { thisObj2.endPopup(event); }
	];
	this.open = false;
	addEvent("click", this.clickElement, this.eventHandle[0]);
}
popupMenu.prototype.startPopup = function (event) {
	if (!this.open) {
		this.open = true;
		this.menuElement.style.display = "block";
		removeEvent("click", this.clickElement, this.eventHandle[0]);
		this.position(event);
		addEvent("mouseout", this.menuElement, this.eventHandle[1]);
	}
}
popupMenu.prototype.endPopup = function (event) {
	if (this.open) {
		if (mouseLeaveVerify(this.menuElement, event)) {
			this.open = false;
			this.menuElement.style.display = "none";
			removeEvent("mouseout", this.menuElement, this.eventHandle[1]);
			addEvent("click", this.clickElement, this.eventHandle[0]);
		}
	}
}
popupMenu.prototype.position = function (event) {
	return
}
