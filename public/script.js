console.log('The DOM is ready...');

var addRest = $('#create_rest');
var template = $('script[data-id="template"]').text();
var container = $('.ui.twelve.column.centered.stackable.grid');
var form = $('script[data-id="form"]').text();
var table = $('script[data-id="table"]').text();

// LOGIC
// adds new restaurant 
function oneMoreRest(){
  $.ajax({
    method: 'POST',
    url: '/restaurants',
    data: {
      name: 'name here',
      location: 'location here',
      cuisine: 'cuisine here',
      image_url: 'http://i.imgur.com/zmjZLb0.jpg?1'
    } // end of ajax req
  }).done(function(data){
    var restaurantsListed = Mustache.render(template, data);
    console.log('new restaurant created!');
    container.append(restaurantsListed);
  }); // end of done
} //end of moreRest

// shows main page
function letsGoHome(){
  $.ajax({
    method:'GET',
    url: '/restaurants',
  }).done(function(restaurants){
      var restEls = [];

      restaurants.forEach(function(restaurant){
        var html = Mustache.render(template, restaurant);
        restEls.push(html);
      });
      container.append(restEls);
  });
  // adds new restaurant when clicking green button
  $('.ui.mini.green.button').on('click', oneMoreRest);
} //end of letsGoHome function

// manipulate single restaurant
function getOneRest(rest_id){
  $.ajax({
    method: 'GET',
    url: '/restaurants/' + rest_id,
  }).done(function(data){
  // view single restaurant
    var renderedForm = Mustache.render(form, data);
    addRest.remove();
    container.html('');
    container.append(renderedForm);
    // updates restaurant current info when clicking blue button
    $('.ui.row').on('click', '.ui.tiny.blue.button', function(){
      // variables replacing old info with new info
      var restName = $('h3.ui.header').text().trim();
      var restCuisine = $('span.cuisine').text().trim();
      var restLocation = $('span.location').text().trim();
      var restImage = $('span.image').text().trim();
      var newRestaurant ={
        name: restName,
        cuisine: restCuisine,
        location: restLocation,
        image_url: restImage
      };
      // data replacement happens here
      $.ajax({
        method: 'PUT',
        url: '/restaurants/' + rest_id,
        data: newRestaurant
      }).done(function(){
        console.log('Job well done!');
        console.log('Restaurant updated!');
      });
    });
    // deletes current restaurant when clicking red button
    $('.ui.row').on('click', '.ui.tiny.negative.button', function(){
      $.ajax({
        method: 'DELETE',
        url: '/restaurants/' + rest_id,
      }).done(function(){
        // hides restaurant form on restaurants view
        $(document).find('.rest_form').html('');
      });
    });
    // adds menu item into restuarant
    $('.ui.row').on('click', '.ui.tiny.positive.submit.button', function(){
      $.ajax({
        method: 'POST',
        url: '/items' 
      }).done(function(){
        var itemImg = $('input.item_image').val();
        var itemName = $('input.item_name').val();
        var itemPrice = $('input.item_price').val();
        var itemOrder = $('input.item_order').val();
        // var newItem {

        // }
      }).done(function(data){
        console.log(data);
      })
    })





    
  });
} // end of getOneRest function




var routes = {
  '/restaurants': letsGoHome, // invokes function for homepage view
  '/restaurants/:id': getOneRest // invokes function for restaurant view
}; //end of routes object
var router = Router(routes)
router.init();

