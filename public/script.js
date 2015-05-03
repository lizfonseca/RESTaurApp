console.log('The DOM is ready...');

// julias img = "http://i.imgur.com/B9rFVPm.jpg?1";

var template = $('script[data-id="template"]').text();
var container = $('.ui.twelve.column.centered.stackable.grid');
var form = $('script[data-id="form"]').text();
var table = $('script[data-id="table"]').text();

// adds new restaurant template into html content
$('.ui.mini.green.button').on('click', function(){
  $.ajax({
    method: 'POST',
    url: '/restaurants',
    data: {
      name: 'name here',
      location: 'location here',
      cuisine: 'cuisine here',
      image_url: 'http://i.imgur.com/zmjZLb0.jpg?1'
    }
  }).done(function(data){
    var restaurantsListed = Mustache.render(template, data);
    // console.log(html);
    console.log('new restaurant created!');
    container.append(restaurantsListed);
  });
});
// view a restaurant's information
container.on('click', $('.ui.segment'), function(){
  $.ajax({
    method: 'GET',
    url: '/restaurants/' + id,
  }).done(function(data){
    console.log(data);
    // var renderedForm = Mustache.render(form,{
    //   name: name,
    //   location: location,
    //   cuisine: cuisine,
    //   itemInfo: data
    // });
    // container.append(renderedForm);
  });
});

// show list of restaurants / main content
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