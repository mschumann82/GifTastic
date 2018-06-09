$(document).ready(function() {
    var topics = ["Full Metal Alchemist", "Morty", "FLCL", "Final Fantasy", "Street Fighter", "Mortal Kombat", "Legend of Zelda", "Archer"];
    var limit = "&limit=10";
    
    var key = "&api_key=GTYjtGYuFiDKjDDhKlGnrG12FwmXz9OC";

    
    function displayInfo() {
        $("#gifs-appear-here").empty();
        
        var topic = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + key + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            

            var results = response.data;
        

         for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-state", "still");
            
            topicDiv.append(topicImage);
            topicDiv.append(p);
            $("#gifs-appear-here").prepend(topicDiv);
         }
        
      
    });


      }

      // Function for displaying topics as buttons
      function renderButtons() {

        // Deleting the buttons prior to adding new topics
        
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          
          a.addClass("topic");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i].toUpperCase());
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      function addNew () {
        event.preventDefault();
        $("#gifs-appear-here").empty();
        var input = $("#gif-input").val().trim();
        topics.push(input);
        console.log(input);
        renderButtons();
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + input + key + limit;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            console.log(topics);
        

         for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-state", "still");
            
            topicDiv.append(topicImage);
            topicDiv.append(p);
            $("#gifs-appear-here").prepend(topicDiv);
            
         }
        
      });
    }

    function animate() {
        var state = $(this).attr("data-state");
			    
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
        console.log("animate");
        

    }
      

      
      $(document).on("click", ".topic", displayInfo);
      $(document).on("click", "#add-gif", addNew);
      $(document).on("click", "img", animate);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      console.log(topics);
    });