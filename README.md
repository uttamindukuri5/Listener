# Listener

## Description:
This app will just listen for any POST request sent to the server, and store the request body in a file. It will currently only store XML or JSON. There is a JSON file that maps the ip address to the customer name. So when a request is sent, it will first retrieve the ip address of that user and check the json file to see if it matches. If it does match it will create a file name, in that file name will contain the person name. If it does not contain it, it will create a file name with that ip address.
## Prerequisite
1. Need to have **NodeJS** and **NPM**. Here are the installation process to install NodeJS and NPM: https://www.npmjs.com/get-npm

## How to start the application
1.  Open a Command Prompt/Terminal and naviagate to the root folder. Run the command ```npm i```
2. To start the application, run ```npm start``` in the root folder. 