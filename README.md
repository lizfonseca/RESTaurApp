#RESTaurApp
#####A management application for restaurant owners

##Structure
####General
The application will initially feature a list of restaurants owned by the user. When navigating a restaurant, menu items with their corresponding information will be displayed.

####Technical
This illustration below shows how the database holds the application's information:

+ The restaurants table only holds the general information of each restaurant: a unique id key, the name, the corresponding location, the cuisine type, and an image.

+ The items table holds more specific information of each restaurant (menu items) - each menu item will contain the following: a unique id key, the key for its corresponding restaurant, item name, its price, the order count (number of times the item has been ordered), and an image.

<img src="http://i.imgur.com/7hADqRv.png"/>

######_The relationship between both tables is the following: restaurants table is the parent of the items table._

##User Stories
The application can be accessed via IP address and port:

 _IP: _

 _Port: 3000_


 #####Restaurants page
 <img src="http://i.imgur.com/4CJCn4B.png">


 #####Items page
 <img src="http://i.imgur.com/euTKp9R.png">


 ##Tools & Resources


 ##Download


   If you would like to try the application, go to:

   https://github.com/lizfonseca/RESTaurApp

   + Click on the 'Download as zip' button located on the right margin.

   + Unzip files

   + Open the html file

   + Open browser window and type the following:

   ``` localhost:3000 ```
