![alt text](https://github.com/raymond301/characterbuilder/blob/master/config/homePage.png "Main Screenshot")

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

### Cloning My GitHub Repository
You can also use Git to directly clone the MEAN.JS repository:
```
$ https://github.com/raymond301/characterbuilder.git characterbuilder
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop you MEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower installcommand to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it! your application should be running by now, to proceed with your development check the other sections in this documentation. 
If you encounter any problem try the Troubleshooting section.

## Addition Details

Mean.js
https://github.com/meanjs/generator-meanjs#express-model-sub-generator
http://meanjs.org/docs.html#getting-started
http://scotch.io/bar-talk/setting-up-a-mean-stack-single-page-application

Mongoose:
http://mongoosejs.com/docs/schematypes.html


https://www.npmjs.org/package/node-mongo-seeds   ---unfinished
https://github.com/toymachiner62/node-mongo-seeds
```
mongodb://localhost:27017/<your_db_name>
Run $ seed to seed your mongodb with all your data from your /seeds folder.
    or
http://stackoverflow.com/questions/19441228/insert-json-file-into-mongodb
mongoimport --db mycharacterbuilder-dev --collection personalities --file /Users/m088378/IdeaProjects/characterbuilder/seeds/personalities.json
```

**Contact Me for seed files**
*raymond.moore301@gmail.com*

TODO:
  1. Finish Character Sheet report
  2. decide if character building should be 1-x mutliple choice forms, or 1 question at a time?
  3. add spider graph for alignment
  4. add question analysis, what is the collection of impacts for every single permustation of q&a
