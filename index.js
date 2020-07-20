const engines = require('consolidate');
const express = require("express");
var path = require('path');
var fs = require('fs');
var recursive = require('recursive-readdir-synchronous')
var img_path = "D:/Downloads/no hentai";

var app = new express();

app.engine('html', engines.htmling);

app.use(express.static('../'));

app.set("view engine", "ejs");

var dbg = "";
var count = 0;

var list = [];
var saya_list = [];

list = fs.readdirSync(img_path + "/");

blocking = true

saya_list = recursive(img_path + "/Saya_fox/");

for(i = 0; i < saya_list.length; i++)
{
	saya_list[i] = saya_list[i].substr(img_path.length);
}
saya_list = sortByTime(saya_list);

for(i = 0; i < saya_list.length; i++)
{
	saya_list[i] = saya_list[i].substr("/Saya_fox/".length);
}


function sortByTime(files, prefix){
	t = files.map(fileName => {
			return {
			name: fileName,
			time: fs.statSync(img_path + "/" + fileName).mtime.getTime()
			};
	})
	.sort(function (a, b) {
	return b.time - a.time; })
	.map(function (v) {
	return v.name; })
	.filter(v => v !== undefined && v !== "undefined" && v.includes("."));

	return t;
}

list = sortByTime(list);

var lower = 100;
var upper = 250;

list = shuffle(list);
saya_list = shuffle(saya_list);

list = list.filter(file => file !== undefined)

app.get("/view/:img/auto", (req, res) => {
	var index = req.params.img;
	var myImg = list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index_auto", {
		img: myImg,
		index: index,
		maxIndex: list.length,
		imgtype: type
	});
});

app.get("/view/auto", (req, res) => {
	var index = 0;
	var myImg = list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index_auto", {
		img: myImg,
		index: index,
		maxIndex: list.length,
		imgtype: type
	});
});

app.get("/view/:img", (req, res) => {
	var index = req.params.img;
	var myImg = list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index", {
		img: myImg,
		index: index,
		maxIndex: list.length,
		imgtype: type
	});
});

app.get("/view", (req, res) => {
	var index = 0;
	var myImg = list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index", {
		img: myImg,
		index: index,
		maxIndex: list.length,
		imgtype: type
	});
});

app.get("/saya", (req, res) => {
	var index = 0;
	var myImg = saya_list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index_saya", {
		img: myImg,
		index: index,
		maxIndex: saya_list.length,
		imgtype: type
	});
});

app.get("/saya/:img", (req, res) => {
	var index = req.params.img;
	var myImg = saya_list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index_saya", {
		img: myImg,
		index: index,
		maxIndex: saya_list.length,
		imgtype: type
	});
});

app.get("/", (req, res) => {
	var index = 0;
	var myImg = list[index];
	var type = 0;
	if(myImg.substr(myImg.length - 3, 3) == "mp4" || myImg.substr(myImg.length - 4, 4) == "webm")
	{
		type = 1;
	}
	res.render("index", {
		img: myImg,
		index: index,
		maxIndex: list.length,
		imgtype: type
	});
});

app.get("/debug/", (req, res) => {

	var s = "";

	list.forEach((file, index) => {
		s += "Index " + index + " = File " + file + "<br>";
	})

	var style = `<html><head><style>html,
		body {
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #EFEFEF;
		}

		.content {
		padding: 0;
		display: block;
		margin: 0 auto;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		cursor: pointer;

		position: fixed;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);

		background-size: cover;
		}

		div {
		border: 2px solid black;
		padding: 15px;
		margin: 10px;
		} </style></head>`;

	res.send(style + "<body><div>" + s + "</div><br><div>" + dbg + "</div><br><div>" + count + "|" + list.length + "</div></body></html>");
});


/* , (err, html) => {
		console.log(html);
		console.log(list);
		res.send(html);
	 */

app.listen("8080", () => {

});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
	return array
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}