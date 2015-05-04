console.log('The DOM is ready...');

// img = "http://i.imgur.com/B9rFVPm.jpg?1";
var addRest = $('#create_rest');
var template = $('script[data-id="template"]').text();
var container = $('.ui.twelve.column.centered.stackable.grid');
var row = $('.ui.row');
var top = $('.ui.padded.twelve.grid');
var form = $('script[data-id="form"]').text();
var table = $('script[data-id="table"]').text();



// view and edit a restaurant's information
// need to figure out how to retrieve id's per restaurant
// container.on('click', '.ui.raised.segment', function(e){
//   debugger;
//   var id = $(e.target).parents('.restaurant').attr('id');
//   $.ajax({
//     method: 'GET',
//     // url: '/restaurants/',
//     url: '/restaurants/' + id,
//   }).done(function(data){
//     var renderedForm = Mustache.render(form,{
//       name: data.name,
//       location: data.location,
//       cuisine: data.cuisine,
//     });
//     addRest.remove();
//     container.html('');
//     container.append(renderedForm);
//   });
// });

// // show list of restaurants / main content
// container.on('click','.ui.mini.black.icon.button', function(){
//   $.ajax({
//     method:'GET',
//     url: '/',
//   });
// .done(function(restaurants){
//       var restEls = [];
//       restaurants.forEach(function(restaurant){
//         var html = Mustache.render(template, restaurant);
//         restEls.push(html);
//       });
//       container.append(restEls);
//   });
// });
// show list of restaurants / main content

// var saver = $('.ui.tiny.blue.button');
// saver.on('click',function(){
//   console.log('banana');
// });



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

    $('.ui.row').on('click', '.ui.tiny.blue.button', function(){
      console.log($('h3.ui.header').text());
      console.log($('span.cuisine').text());
      console.log($('span.location').text());
    });
  });
}











var routes = {
  '/restaurants': letsGoHome, // invokes function for homepage view
  '/restaurants/:id': getOneRest // invokes function for restaurant view
}; //end of routes object
var router = Router(routes)
router.init();

