var gifs = ["dog"];

// Captures the gif name from the data-attribute
function displayGif() {

    var userGif =  $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userGif + "&limit=1&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4";

    // Creates AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);



    });

};

// Function for displaying gif buttons
function renderButtons() {

    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

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