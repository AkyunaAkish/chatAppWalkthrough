# How to build a basic chatroom with HTML, SASS/SCSS, Angular.js, Node.js, Express.js, Knex.js, and Socket.io
### I will also include how to deploy this application to heroku and will include some basic git commands

### Take note that the terminal commands I will be using are for mac osx terminals/computers
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

## After the initial setup of your development environment we can now get started

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

* Now we can make our first git commit to start tracking our progress with the git version control software, also we will need to run npm install to properly download all of the package express needs to work

```
$ npm install
$ git init
$ git add -A
$ git commit -m"Initial commit"
```
