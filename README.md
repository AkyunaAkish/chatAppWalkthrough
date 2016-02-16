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
* With this:

```
//Keep at the bottom of your index.js routes file always (right about the module.exports line)
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
