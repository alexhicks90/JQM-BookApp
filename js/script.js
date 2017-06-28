/*
$(document).ready(function() {

	console.log("ready");
	// load a2.xml
	$.ajax({
		type:"POST", url: "a2.xml",
		datatype: "xml", success: parseXML
	});
});

*/

var xmlData;
var bookNum;

$(document).on("pagecreate", "#home", function () {
	console.log("Pulling data from XML file function loaded");
	
	// AJAX call
	$.ajax({
		type: "GET", url: "a2.xml", dataType: "xml",
		success: function (xml) {
			xmlData=xml; // xmlData is equal to the xml sent from the success function
			buildMenu(xml)
		}, 
		error: function (e) {
			alert(e.status + " - " + e.statusText);
		}
	});
});

function buildMenu(xml) {
	console.log("buildmenu");
	
	var i = 0;
	
	var sName = $(xml).find('sName');
	
	$("header").html("<h2>" + $(xml).find('title').text() + "</h2>");
	
	$("footer").html("<p>" + sName.text() + " - " + sName.attr("sNumber") + " | " +  sName.attr("sProgram") + "</p>");
	
	$("#book-navbar").append("<a href='#home' class='ui-btn-inline ui-corner-all'>Home</a>")
	
	
	$(xml).find("book").each(function () {
		
		$("#bookList").append("<li li-id='" + i + "'><a href='#bookPage' data-transition='flow'>" + $(this).find("bookName").text() + "</a></li>");
		$("#home-navbar").append("<a href='#bookPage' a-id='" + i + "' class='ui-btn-inline ui-corner-all'>" + $(this).find("bookName").text() + "</a>");
		
		i++;
	});
	
	
	$("#bookList").listview("refresh");
	$("#home-navbar").navbar("destroy");
	$("#home-navbar").navbar();
	
	$(document).on("click", "#bookList >li", function() {
		bookNum = $(this).closest("li").attr("li-id");
		parseXML(xmlData, bookNum);
	});
	
	$(document).on("click", "#home-navbar >a", function() {
		bookNum = $(this).closest("a").attr("a-id");
		parseXML(xmlData, bookNum);
	});
	
	$(document).on("click", "#reviewList >li", function() {
		bookNum = $(this).closest("li").attr("li-id");
		parseXML(xmlData, bookNum);
	});
	
	
	function parseXML(xml, bookNum) {
		$("#book-data").html("Book Name: " + $(xml).find("bookName:nth(" + bookNum + ")").text() + "<br>");
		$("#book-data").append("Author: " + $(xml).find("authorName:nth(" + bookNum + ")").text() + "<br>" +
			"Publisher: " + $(xml).find("publisherName:nth(" + bookNum + ")").text() + "<br>" +
			"Curent Price: " + $(xml).find("currentPrice:nth(" + bookNum + ")").text() + "<br>"
		);
		$("#book-data").append("<p>Book Plot: </p><p>" + $(xml).find("bookPlot:nth(" + bookNum + ")").text() + "</p>");
		$("#book-image").html("<img src='" + $(xml).find("bookName:nth(" + bookNum + ")").attr("bookImage") + "' width='184' height='280'>");
		
		
		$("#indigoLink").html("<a href='" + $(xml).find("book:nth(" + bookNum + ")").attr("bookLink") + "' class='ui-btn ui-btn-icon-top ui-icon-shop'>Indigo</a>");
			
		$("#homeLink").html("<a href='#home' class='ui-btn ui-btn-icon-top ui-icon-home'>Home</a>");
		
		$("#reviewLink").html("<a href='#review' class='ui-btn ui-btn-icon-top ui-icon-user'>Review</a>");
		
		$("#review").html("<section id='reviewContent' class='ui-content' role='main'><h2>" +  $(xml).find("bookName:nth(" 
			+ bookNum + ")").text() + " Review</h2></section>");
		$("#reviewContent").append("<p>" + $(xml).find("bookReview:nth(" + bookNum + ")").text() + "</p>");
		$("#reviewContent").append("<a class='ui-btn ui-btn-icon-top ui-icon-back' href=#bookPage>Return to " + $(xml).find("bookName:nth(" 
			+ bookNum + ")").text() + " Page</a>");
	}
	
}

