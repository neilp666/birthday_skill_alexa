"use strict";
var Alexa = require("alexa-sdk");
exports.handler = function(event,context,callback) {
  var alexa = Alexa.handler(event,context,callback);
  alexa.dynamoDBTableName = "MyBirthdays";
  alexa.appId = "";
  alexa.registerHandlers(Handler);
  alexa.execute();
};

var Handler = {
  'LaunchRequest': function () {
    this.emit(':askWithCard', 'You can ask me to remember your friends and families birthdays','Ask me to remember you friends and famliys birthdays', 'Birthday Reminder', 'Ask me to remember your Friends & Families Birthdays!');
  },
  'AddBirthdayIntent': function () {
    var BirthdayName = this.event.request.intent.slots.name.value;
    var BirthdayDate = this.event.request.intent.slots.birthday.value;
    if(this.attributes.Place === undefined){
      this.attributes.Place = {};
   }
    this.attributes.Place[BirthdayName] = BirthdayDate;
    this.emit(':tell', 'I will remember that ' + BirthdayName + ' Birthday is on' + BirthdayDate);
  },
  "TellBirthdayIntent" : function(){
    var BirthdayName = this.event.request.intent.slots.name.value;
        if(this.attributes.Place[BirthdayName]){
            this.emit(':tell', + BirthdayName + " is in " + this.attributes.Place[BirthdayName] );
        }else{
            this.emit(':tell', "I don't know where your " + BirthdayName + " is ");
        }
    },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', 'Ok Cancel');
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':tell', 'Help');
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'Stop');
  }
};
