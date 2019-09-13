var gifs = ["Dwight Schrute", "Michael Scott", "Jim Halpert", "Jim and Pam", "The Office Halloween"];

// Captures the gif name from the data-attribute
function displayGif() {

  $("#gif-view").empty();

    var userGif =  $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&limit=10&q=" + userGif;

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;

      // for loop adding gifs and ratings to html divs
      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");

        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $('<img>');

        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url)
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gifState");

        gifDiv.append(p);
        gifDiv.addClass("gifRating");
        gifDiv.append(gifImage);

        $("#gif-view").prepend(gifDiv);

      }

      // event listener that assigns a variable 'state' the value of the data-state attribute of the button clicked
      // if the state is still, the gif will animate, if the state is animate, the gif will stop
      $(".gifState").on("click", function() {
  
        var state = $(this).attr("data-state");
  
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  
      });

    });

};

// Function for displaying gif buttons
function renderButtons() {

    // Deletes the gif buttons prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    $("#gif-view").empty();

    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each gif in the array
        var newButton = $("<button>");
        // Adds a class of gif to our button
        newButton.addClass("gif");
        // Added a data-attribute
        newButton.attr("data-name", gifs[i]);
        // Provided the initial button text
        newButton.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(newButton);
        
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {

    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);
    console.log(gifs);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();

 



// animation
consoleText(['The Office. '], 'text',['white']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}