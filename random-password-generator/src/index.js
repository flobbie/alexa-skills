'use strict';
var Alexa = require('alexa-sdk');
var generatePassword = require('password-generator');

var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "SKILL_NAME": "Random password generator",
            "GET_PASSWORD_MESSAGE": "Here is your password: ",
            "HELP_MESSAGE": "You can ask me for an random password",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "SKILL_NAME": "Random password generator",
            "GET_PASSWORD_MESSAGE": "Here is your password: ",
            "HELP_MESSAGE": "You can ask me for an random password",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!"
        }
    },
    "de-DE": {
        "translation": {
            "SKILL_NAME": "Zufalls-Passwort Generator",
            "GET_PASSWORD_MESSAGE": "Hier ist dein Passwort: ",
            "HELP_MESSAGE": "Frage mich einfach nach einen zufällig Passwort",
            "HELP_REPROMPT": "Wie kann ich dir helfen?",
            "STOP_MESSAGE": "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit('Welcome to random password generator');
    },
    'GetRandomPasswordIntent': function() {
        this.emit('GetRandomPassword');
    },
    'GetRandomPassword': function() {
        var passwordLength = 12;
        var password = generatePassword(passwordLength, false);

        var passwordSpeechOutput = password.replace(/(.{1})/g, '$1<break time="150ms"/>');
        var speechOutput = this.t("GET_PASSWORD_MESSAGE") + passwordSpeechOutput + ".";
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), "Test")
    },
    'AMAZON.HelpIntent': function() {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
