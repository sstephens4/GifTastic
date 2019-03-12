
    var characters = ["michael scott", "pam beesley", "jim halpert", "dwight schrute",
     "kevin malone", "kelly kapoor", "creed bratton", "holly flax"];

	// Add buttons for characters array
	function renderButtons() {
		$("#character-buttons").empty();
		for (i = 0; i < characters.length; i++) {
			$("#character-buttons").append("<button class='btn btn-success' data-person='" + characters[i] + "'>" + characters[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for input entered
	$("#add-input").on("click", function () {
		event.preventDefault();
		var person = $("#user-input").val().trim();
		characters.push(person);
		renderButtons();
		return;
	});

	

	


	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var person = $(this).attr("data-person");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			person + "&api_key=mtZj61EzbU2CrHtLwYVkgYz7JY6dhjG9&limit=10"

			console.log(person);

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#gifs").empty();
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var gifImg = $("<img>");

				gifImg.attr("src", results[i].images.original_still.url);
				gifImg.attr("data-still", results[i].images.original_still.url);
				gifImg.attr("data-animate", results[i].images.original.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("class", "gif");
				gifDiv.append(p);
				gifDiv.append(gifImg);
				$("#gifs").append(gifDiv);

				

				console.log(response);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	console.log(changeState);
	$(document).on("click", ".gif", changeState);

	

