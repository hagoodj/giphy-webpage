var gifs = ["test button"];

function displayGif() {

    var userGif =  $(this).attr("data-name")
    console.log(userGif);

};

// Function for displaying gif buttons
function renderButtons() {

    // Deletes the gifs prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Loops through the array of movies
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

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".gif", displayGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();