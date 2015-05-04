console.log('The DOM is ready...');

// img = "http://i.imgur.com/B9rFVPm.jpg?1";
var addRest = $('#create_rest');
var template = $('script[data-id="template"]').text();
var container = $('.ui.twelve.column.centered.stackable.grid');
var row = $('.ui.row');
var top = $('.ui.padded.twelve.grid');
var form = $('script[data-id="form"]').text();
var table = $('script[data-id="table"]').text();

// LOGIC
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
    console.log(data);
    var restaurantsListed = Mustache.render(template, data);
    console.log('new restaurant created!');
    container.append(restaurantsListed);
  }); // end of done
} //end of moreRest

// shows homepage
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
  // adds new restaurant template into html content
  $('.ui.mini.green.button').on('click', oneMoreRest);
} //end of letsGoHome function

// view single restaurant
function getOneRest(id){
  $.ajax({
    method: 'GET',
    url: '/restaurants/' + id,
  }).done(function(data){
    var renderedForm = Mustache.render(form, data);
    addRest.remove();
    container.html('');
    container.append(renderedForm);
    // updates restaurant current info when clicking blue button
    $('.ui.row').on('click', '.ui.tiny.blue.button', function(){
      var restName = $('h3.ui.header').text().trim();
      var restCuisine = $('span.cuisine').text().trim();
      var restLocation = $('span.location').text().trim();
      // variables replacing old info with new info
      var newInfo ={
        name: restName,
        cuisine: restCuisine,
        location: restLocation
      };
      // data replacement happens here
      $.ajax({
        method: 'PUT',
        url: '/restaurants/' + id,
        data: newInfo
      }).done(function(){
        console.log('Job well done!');
        console.log('Restaurant updated!');
      });
    });
  });
} // end of getOneRest function



var routes = {
  '/restaurants': letsGoHome, // invokes function for homepage view
  '/restaurants/:id': getOneRest // invokes function for restaurant view
}; //end of routes object
var router = Router(routes)
router.init();

