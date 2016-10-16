## DateRange-Picker-Ex
[![GitHub issues](https://img.shields.io/github/issues/Adam5Wu/DateRange-Picker-Ex.svg)](https://github.com/Adam5Wu/DateRange-Picker-Ex/issues)
[![GitHub forks](https://img.shields.io/github/forks/Adam5Wu/DateRange-Picker-Ex.svg)](https://github.com/Adam5Wu/DateRange-Picker-Ex/network)
[![License](https://img.shields.io/github/license/Adam5Wu/DateRange-Picker-Ex.svg)](./LICENSE.txt)
![Bower version](https://img.shields.io/bower/v/daterange-picker-ex.svg?maxAge=3600)

DateRange-Picker-Ex is a jQuery plugin that allows user to select a date range.

It is nearly complete rewrite of the original [jQuery Date Range Picker Plugin](https://github.com/longbill/jquery-date-range-picker).

New features:
- Robust internal date keeping logics, based of MomentJS
- Improved UI visual experiences and interactive control experiences
	- React to window scrolling and resizing, maintain widget visibility
	- Localized calendar month, date formatting and start-of-week, based on MomentJS
- Specializes date range entrying, leave the time entry to [TimeDropper-Ex](https://github.com/Adam5Wu/TimeDropper-Ex)

## [Documentation & Demo](https://adam5wu.github.io/DateRange-Picker-Ex/)

## License
This project is released under MIT LICENSE

## Setup for Development
* Install node.js
	* [Ubuntu/Mac](https://github.com/creationix/nvm)
	* [Windows](https://nodejs.org/en/download/)
* Update npm to latest version
	```
	npm install -g npm
	```
	
* Install gulp v3.9.1 (global install)
	```
	npm install -g gulp@3.9.1
	```
	
* Clone this project
	```
	git clone https://github.com/Adam5Wu/DateRange-Picker-Ex.git
	cd DateRange-Picker-Ex
	```
	
* Install local dependencies
	```
	npm install
	```
	
* Build minified sources
	```
	gulp
	```