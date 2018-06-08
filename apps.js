$(document).ready(function() {
    var topics = ["Full Metal Alchemist", "Rick & Morty", "FLCL", "Final Fantasy", "Street Fighter", "Mortal Kombat", "Legend of Zelda", "Archer"];
    var limit = "&limit=10";
    
    var key = "&api_key=GTYjtGYuFiDKjDDhKlGnrG12FwmXz9OC";
    
    function displayInfo() {
        
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
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicDiv.append(p);
            topicDiv.append(topicImage);
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
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      function addNew () {
        event.preventDefault();
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
        

         for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicDiv.append(p);
            topicDiv.append(topicImage);
            $("#gifs-appear-here").prepend(topicDiv);
         }
        
      });
    }
      //$("#add-gif").on("click", function(event) {
       // event.preventDefault();

        // This line grabs the input from the textbox
       // var topic = $("#gif-input").val().trim();

        // The topic from the textbox is then added to our array
       // topics.push(topic);
        //console.log(topic);

        // Calling renderButtons which handles the processing of our topics array
        //renderButtons();
        //displayInfo();

      //});

      // Generic function for displaying the topic info.
      $(document).on("click", ".topic", displayInfo);
      $(document).on("click", "#add-gif", addNew);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      console.log(topics);
    });