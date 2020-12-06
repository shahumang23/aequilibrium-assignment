# Aequilibrium Assignment:- Angular version 9.1.2
https://shahumang23.github.io/aequilibrium-assignment/
## Requirements

### The Castle Company

Aequilibrium is in the business of building castles (we really aren’t, but let’s pretend). Now, we also
believe in quality aesthetics, so we only want to build castles in two types of places:

a. Peaks
b. Valleys

Let’s say you have an array of integers that describes a stretch of land, where each integer represents the
current height of the land. Can you write a function that reads that array and returns the number of
castles that Aequilibrium should build on that stretch of land? You can write this solution in whatever
language you like and provide a way to test it.

You can make the following assumptions:

- You can always build a castle at the start of the array, provided it is non-empty
- You can always build a castle at the end of the array, provided it is non-empty
- We only want to build one castle per peak or valley.
- A peak is an integer or series of integers that is above the immediately preceding and following
ints. For example, in the sequence [2,6,6,6,3] the sequence of three 6s is a peak.
- A valley is an integer or series of integers that is below the immediately preceding and
following ints. For example, in the sequence [6,1,4] the "1" would be a valley.

### The Transformation Company

Aequilibrium does love transforming... people, lives, teams, companies. And there’s no better
representation of transformation than Hasbro’s Transformers, the classic television series featuring
heroic Autobots raging their battle to destroy the evil forces of the Deceptions.

The Transformers are at war and you are in charge of settling the score! For this part of the assignment
please build a web application that evaluates who wins a fight between the Autobots and the
Decepticons. You have the option to use any modern web framework. The input data can be static, there
is no need to persist any data or provide any back-end services. However, we will be testing the solution
against multiple use cases besides the basic example. Please include instructions on how to run and use
your solution.

***

## Getting Started

To get you started you can simply clone the `aequilibrium-assignment` repository and install the dependencies:

### Prerequisites

You need git to clone the `aequilibrium-assignment` repository.

### Clone `aequilibrium-assignment`

Clone the `aequilibrium-assignment` repository using git:

```
git clone https://github.com/shahumang23/aequilibrium-assignment.git
cd aequilibrium-assignment
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the Node package manager.

```
npm install
```

After that, you should find out that you have
below new folders in your project.

* `node_modules` - contains the npm packages for the tools we need

### Running the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
ng serve
```

Now browse to the app at [`http://localhost:4200/`].

### Running Unit Tests
The `aequilibrium-assignment` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. We provide a Karma configuration file to run them.

* The configuration is found at `karma.conf.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

***

## Components based architecture

Created components based architecture so in future we can use same components to another application or same application

Here i created 2 components

- Header
- Custom Text Area Box

***

## Useful links
[angular](https://angular.io/)

[jasmine](https://jasmine.github.io/)

[karma](https://karma-runner.github.io/)

[node](https://nodejs.org/)

[npm](https://www.npmjs.org/)

[typescript](https://www.typescriptlang.org/)

[webpack](https://webpack.js.org/)

[bootstrap](https://getbootstrap.com/)

