# How to build a chatroom with HTML, SASS/SCSS, Angular.js, Node.js, Express.js, Knex.js, Postgresql, Bcrypt.js, Cookie-session, and Socket.io
### I will also include how to deploy this application to heroku and will include some basic git commands

### Take note that the terminal commands I will be using are for mac osx terminals/computers and may or may not need to be tweaked for windows/other operating systems

#### I would say this is an intermediate level walkthrough and will take some time to complete. My intention behind this walkthrough isn't necessarily just to have a working chatroom, but to cover a broad range of technologies and provide a strong base for developers to learn how to make all sorts of applications.

#### Setup:
* You will need to have node installed, the express generator, git, postgresql, and to get those programs I would recommend downloading the xcode command line tools(from the apple app store), and also getting homebrew installed into machine.
* Get brew - http://brew.sh/
* $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
* $ brew update
* $ brew install git
* $ brew install node
* $ brew install postgres
* If you need more help with postgres: http://exponential.io/blog/2015/02/21/install-postgresql-on-mac-os-x-via-brew/
* http://expressjs.com/en/starter/generator.html
* $ npm install express-generator -g
* If you need a text editor try: https://atom.io/
* $ brew install heroku-toolbelt
* $ heroku update
* If you haven't already, sign up for heroku(heroku.com) and you'll need to give them your credit card number - They won't charge you because we'll be only using the free heroku setup. They only charge if you choose to upgrade a website to a paid package.
* I would also recommend getting the Oh My Zsh command line package which makes working in your terminal a nicer experience.
* sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

## After the initial setup of your development environment is complete we can now get started

* Make a directory in your terminal and cd into it
```
$ mkdir yourAppName
$ cd yourAppName
```
* Use your express generator package to initialize an express app in your new directory(we'll start with handlebars but remove it later)
```
$ express --hbs --git .
```
* That command adds all of the basic components for an express app in your current directory using handlebars(hbs) as your view engine and also adds a .gitignore file for you

* Now we can make our first git commit to start tracking our progress with the git version control software, also we will need to run npm install to properly download all of the packages express.js needs to work

```
$ npm install
$ git init
$ git add -A
$ git commit -m"Initial commit"
```
* You will now need to download another package to run your server so that you can see what you're doing from the browser:
```
$ npm install -g nodemon
```
* After you get that installed, you should now be able to run the nodemon command in the main file of your directory and then go to localhost:3000 in your browser to see the base of your express app:
```
$ nodemon
```
* In the browser type localhost:3000 in your url and you should see this:

```
Express

Welcome to Express
```
* Once you're there, open a new tab in your terminal using the 'cmd + t' shortcut and leave nodemon running on the other tab. Whenever you save new changes in your text editor, nodemon will restart automatically in order to show you the current state of your application in localhost:3000

* Open your directory in whatever text editor you prefer, if you're using atom you can use this command from within the root directory of your application in the terminal:

```
$ atom .
```

* Open the app.js file and remove these lines:

```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
```
* We are going to use Angular.js as our front end so we don't need handlebars at all

* Also delete the views folder inside of your application

```
$ rm -rf views
```
* Now open up your routes/index.js file and replace this:

```
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```
* With this(this is called a wildcard route because the \'\*' catches all improperly typed urls and sends the index.html file):

```
//Keep at the bottom of your index.js routes file always (right above the module.exports line)
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});
```

* This will make sure your server(express) will properly serve your Angular index.html file no matter what, and because we're not going to be rendering server side handlebars files we were able to remove the previous rendering code in the index.js routes file

# Angular setup

* You can now think of your public folder as your front end container, that is where all of your angular/html/scss will be contained

* First create an index.html file in your public folder

```
$ touch public/index.html
```

* Then create your angular files in the public/javascripts folder

```
$ touch public/javascripts/module.js
$ touch public/javascripts/controllers.js
$ touch public/javascripts/routes.js
```

* Insert this into your public/index.html file

```
<!DOCTYPE html>
<html lang="en" ng-app="chatApp">
<head>
  <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-route.js"></script>

  <link rel="stylesheet" href="/stylesheets/style.css">

  <title>Chatroom</title>

  <base href="/">

</head>
<body ng-cloak>

  <ng-view></ng-view>

  <script src="/javascripts/module.js"></script>
  <script src="/javascripts/controllers.js"></script>
  <script src="/javascripts/routes.js"></script>
</body>
</html>

```

* This will serve as your template view file, if you insert any additional html here, it will be present on every angular partial you add. For instance a navbar that you want to be on every page could be inserted above the <ng-view></ng-view> element.


#### For those of you new to angular, I'll just point out a few things here.
* First of all you need the angular cdns, in this case I used the main angular cdn and also brought in the angular-route cdn so we can allow users to switch between different pages. There are many more cdns available, though I won't go into those now.
* Next, I added the ng-app attribute to the html element which correlates to the name of our angular module(which will will get to soon) and lets angular know where our application begins.
* Next is the ng-cloak attribute which makes sure there is no flashes of angular bracket syntax shown the the user(don't worry if that doesn't makes sense right now)
* Next is the ng-view element which is where angular-routes will insert your html partials into in order to give the illusion that you are on a website with many pages. When actually angular is just moving html snippets in and out of the ng-view element, thus creating the effect of the single page application.
* And of course, we need to pull in our angular files so I added them with script tags on the bottom of the index.html file

* Now let's make a partials folder and create a couple of files within it:

```
$ mkdir public/partials/
$ touch public/partials/landing.html public/partials/chat.html
```
* The landing.html partial will serve as our login/register page and the chat.html partial will be, you guessed it, our chatroom page

* We will need to do a few more steps to really see the results of our setup
* In your public/javascripts/module.js file insert this line:

```
var app = angular.module('chatApp', ['ngRoute']);
```

* Here we define our angular module, give it a name, and define its dependencies, which in this case is angular routes('ngRoute')

* Now in your public/javascripts/routes.js file insert this code:

```
app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/partials/landing.html',
    controller: 'MainController'
  })
  .when('/chat', {
    templateUrl: '/partials/chat.html',
    controller: 'MainController'
  })
  .otherwise({redirectTo:'/'});
  $locationProvider.html5Mode(true);

})
```
* This will define which partials will be inserted into the ng-view element depending on the url the users of the website will visit. It also determines which controller the partial will be utilizing. For simplicity sake, we will just have 1 large controller for this whole application.

* Something else to point out,
```
 $locationProvider.html5Mode(true);
```
 in our public/javascripts/routes.js file in combination with
```
 <base href="/">
```
 in our public/index.html and
```
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});
```
 which we inserted into our routes/index.js file will have the effect of removing the default hashtags in angular urls(if you're new to angular, you now know a solution to a problem you've never encountered before).

* Now the final step of our angular setup process is to create our controller and test it all out in the browser

* Insert this code into your public/javascripts/controllers.js file:

 ```
 app.controller('MainController', function($scope, $http){
   $scope.message = "Test Message";
 })
 ```
* Now that we created our controller for our partials and also added a property to the angular $scope object called message, we can render the $scope.message property in our public/partials/landing.html file by simply adding this line to the top of the file(we don't need any other html setup in our partials, just add that one line and nothing else):

```
{{message}}
```

* Now if you didn't forget anything, you should be able to refresh localhost:3000 in the browser and see this line of text(nodemon must be running your server still):

```
Test Message
```

* If you made it to this step with success, I would recommend marking this spot in time with git in the terminal:

```
$ git add -A
$ git commit -m"Finished express/angular setup"
```

# SASS/SCSS Setup
* In order to complete this setup(at least the way I'm doing it) you'll need to install another package
```
$ npm install -g node-sass
```
* Node-sass will process your scss code into regular css and add it to your main public/stylesheets/style.css file

* Before we can do that though, we'll need the sass folder/files:

```
$ mkdir public/sass
$ mkdir public/sass/components
$ touch public/sass/style.scss
$ touch public/sass/components/_base.scss
```

* I'm not going to go to deep into SASS/SCSS in this walkthrough but will go through the basic setup process,  and will mainly use regular css syntax

* Insert this line into your public/sass/style.scss file in order to use the code in your public/sass/components/\_base.scss file
```
@import 'components/base';
```
* Before we test to make sure we set it up correctly, you'll need to reserve another tab in your terminal for node-sass to compile your styling when you're working on this app. In that new terminal tab(in the root directory of this application) run this command:

```
$ node-sass --watch public/sass/style.scss -o public/stylesheets/
```
* This will watch your style.scss file and output the compiled css code into your main style.css file

* If you insert this code into your public/sass/components/\_base.scss file and save it, you should see some green text in the terminal tab that is running your node-sass command:

```
body{
  background-color: dodgerblue;
  color: white;
}
```
* Now if you refresh localhost:3000 in the browser you should see a blue background and your $scope.message text should be colored white. That is about the extent I will explain SASS/SCSS in this walkthrough, I have another more in depth walkthrough if you are interested in going deeper into that topic. Keep your node-sass tab running so that you can continue to style your pages from the public/sass/components/\_base.scss file. While node-sass compiles your scss code into regular css code and outputs it into your public/stylesheets/style.css file.

* Link to page with SASS/SCSS walkthrough: http://www.akyunaakish.com/blog/introtosass

# Checking connection to between express and angular

* Open your routes/index.js file and insert this code above your wildcard route(the route using the\'\*', and below line 2):

```
router.get('/test', function(req,res,next){
  res.json('Test');
})
```
* Change your controller(in your public/javascripts/controllers.js file) to look like this:
```
app.controller('MainController', function($scope, $http){
  $http.get('/test').then(function(response){
      $scope.message = response.data;
  })
})
```

* This will send a get request to your express route and set your $scope.message variable to the string that you sent back when you made the '/test' express route.

* If you refresh localhost:3000 you should only see the text 'Test' on your page. If you have that then you have a proper connection between your front end(angular) and your backend(node/express)

# Setting up socket.io to communicate back and forth between your front end and back end
* Install socket.io in the terminal from the root directory of your application:
```
$ npm install --save socket.io
```

* Create a lib folder in the root directory of your application and make an io.js file inside of it:
```
$ mkdir lib
$ touch lib/io.js
```
* Open your www file within your bin directory and add this to line 10(under the http variable):

```
var io = require('../lib/io');
```

* Then go down to around line 28/29 and replace this:
```
server.listen(port);
```
* With this:
```
var listener = server.listen(port);
io.attach(listener);
```

* Those steps allow socket.io to be directly connected to your server and allows you to write socket.io code within your lib/io.js file

* Go back into your lib/io.js file and insert this code:
```
var io = require('socket.io')();

io.on('connection', function (socket) {

  socket.emit('messageFeed', {test: 'messageExample'});

});

module.exports = io;

```
* This brings requires the socket.io module and then when a user connects to your server, that users socket will emit a json object with a key of test and string of 'messageExample' to the socket event of 'messageFeed'. You need to name your socket events so your front end can target the direct event. The module.exports completes the connection of your io.js file with your bin/www server file.

* Now lets hook socket.io up to angular. Remember your angular index.html file? You wrote this near the bottom of that file:
```
<script src="/javascripts/module.js"></script>
<script src="/javascripts/controllers.js"></script>
<script src="/javascripts/routes.js"></script>
```
* You'll need to add one line above that which will load the socket.io file:
```
<script src="/socket.io/socket.io.js"></script>
<script src="/javascripts/module.js"></script>
<script src="/javascripts/controllers.js"></script>
<script src="/javascripts/routes.js"></script>
```

* Go back to your controller in angular and add this code to respond to the socket.io event coming from the backend:
```
app.controller('MainController', function($scope, $http){

  $http.get('/test').then(function(response){
    $scope.message = response.data;
  })

  //create a variable to use socket.io
  var socket = io();
  //this is where you define a response behavior when the 'messageFeed' socket event is fired from the backend, in this case we set the data send from the backend to a $scope //variable $scope.chatMessages
  socket.on('messageFeed', function (data) {
    $scope.chatMessages = data;

    // use $scope.apply in order to make sure the view is updated
    // because this event was fired outside of Angular's digest
    $scope.$apply();
  })


})
```

* Now go to your public/partials/landing.html file and make sure it looks like this so you can render the test property of your socket event(which will fire immediately the way we set it up):
```
{{message}}

{{chatMessages.test}}
```
* Go refresh localhost:3000 and you should see this text:
```
Test messageExample
```
* If you're there congrats you've just connected socket.io from your back-end to your front-end ! Git add and git commit, it's a good milestone.

# Knex.js/postgresql setup
* This is where we will set up our database.
* Just a brief explanation of knex.js: Knex.js is an abstraction on pg( a postgresql database driver), postgresql is an abstraction on SQL and finally we have SQL itself which this whole knex/pg/postgresql infrastructure is built on top of. Knex.js allows for easier interaction between you and your Postgresql database - in a nut shell.

* You will need to get knex and pg installed as well as initialize knex like so:
```
$ npm install --save knex@0.9.0
$ npm install --save pg
$ knex init
```
* At the time of writing this, the newest version of knex had some issues, so to get past that I specifically installed version 0.9.0. But this may soon not be an issue so you could potentially leave off the \@0.9.0 - if you get some issues try downgrading and see if that helps.

* After writing knex init you should see this output in the terminal:
```
Created ./knexfile.js
```

* Open your new knexfile.js and replace all of the code inside with this:
```
module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex-chat',
    pool: {
      min: 2,
      max: 10
    }
  }

};
```
* To keep it simple, we'll just use one database environment(development), define postgresql as our "client". Then define our connection to your local knex-chat database. Try not to worry too much about the pool for this walkthrough. Research it if you're curious. You don't actually have a knex-chat database yet, so let's create it so knex will know what you're talking about.

* In the terminal run this command to create your knex-chat database:
```
$ createdb knex-chat
```
* Now we'll use knex to create a migrations folder and make a create_humans migrations file from within the terminal with this command:
```
$ knex migrate:make create_chat
```
* Now you should have a newly created migrations folder in your application. Open the file within it and you should see something like this:
```
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {

};
```
* This is where we can define our schemas, lets create the schema for a users table and a messages table:
```
//We will use this to create 2 tables, users and messages. The messages table will //contain userIds so we can track who wrote each message to properly display the //username and the message together when we render the messages with angular

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.timestamps();
  })
  .createTable('messages', function (table) {
    table.increments();
    table.integer('userId');
    table.string('message');
    table.timestamps();
  })
};

//Leave exports.down blank for now
exports.down = function(knex, Promise) {

};

```

* Now if you run this command, your schema should be correctly established in your local knex-chat postgresql database:
```
$ knex migrate:latest
```

* Note: If you make a mistake here you will have to remove your local db and start over with the migrations process by deleting the entire migrations file and running this command in the terminal:
```
$ dropdb knex-humans
```
* Then you'll have to run the knex migrate commands again. Hopefully you won't need to know that but that's how to do that if you need to .
