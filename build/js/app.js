(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "71cc959b4ba8cbc249d542d1d95ae51395cd315c";

},{}],2:[function(require,module,exports){
var key = require('./../.env').apiKey; //imports the api key saved in the .env file
var githubRepos = function(username) {
        // loads data from github when a user
        return $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response) {
                    // gets the contents in the repos id and sets the content to empty
                    $("#repos").html(" ");
                    console.log(response);
                    //This function now calculates the length of the response and if  length is greater than 0 Github Respositories is appended appends
                    if (response.length > 0) {
                        var description = " ";
                        $("#repos").append("<h1 id='repo-title'><span class='title'></span>Github Repositories</h1>");
                        //This function loops through each response and when the github username is found then moments.js is used to display when a repo was created and updated
                        $.each(response, function(index) {
                            var created = moment(this.created_at).format('MMMM Do YYYY, h a');
                            var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
                            if (this.description !== null) {
                                description = this.description;
                            }
                            $("#repos").append("<div class='col-md-12'>" + "<h1><a href='" + this.url + "'><span class='title'></span> " + this.name + "</a></h1>" + "<div class='col-md-12'>" + "<p>Created: " + created + "</p>" + "<p>Updated: " + updated + "</p>" + "</div>" + "<div class='col-md-12'>" + "<p>" + description + "</p>" + "</div>" +
                                "</div>");
                        })
                    }
                     else {
                        // This section of the code gets all the contents that are within the user id
                        $("#user").html("<h1 class='center'>USER NOT FOUND</h1>");
                        $.each(response, function(i)
                          {
                        }).fail(function(error) {
                        console.log(error.responseJSON.message);
                      }
                    )}
                  }
                )};
                    //This exports the githubRepos variable to be used by other elements.
                     exports.repoModule = githubRepos;

},{"./../.env":1}],3:[function(require,module,exports){
//imports the backend js properties
var githubRepos = require('./../js/backend.js').repoModule;

// This function animates the form
$('.message a').click(function () {
    $('form').animate({
        height: "toggle"
        , opacity: "toggle"
    }, "slow");
});

//Collects what the user inputs in the form
$(function () {
    $("#results").hide();
    $("#search").submit(function (event) {
        event.preventDefault();
        var username = $("#input").val();
        $("#results").hide(function () {
            //Use a promise to prevent fading conflicts
            githubRepos(username).then(function () {
                $("#results").show();
            });
        });
    });
});

},{"./../js/backend.js":2}]},{},[3]);
