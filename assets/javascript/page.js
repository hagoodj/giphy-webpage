var gifs = [];

// This function handles events where the add movie button is clicked
$("#add-gif").on("click", function(event) {

    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifs.push(gif);
    console.log(gifs);

});