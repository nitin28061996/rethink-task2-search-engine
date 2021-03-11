# Project Overview

This project is developed as part of Rethink coding challenge. This app is primarily developed to show on how to effectively work with larger datasets and run the application smoothly without breaking the DOM. The data consists of 1 Million people records which consists of a person's first name, last name, address, email. This application is connected to elasticsearch cluster which is used for faster and efficient retrieval of large data. Server-side pagination is used to display the data without breaking the DOM and smooth running of the application interface.

## To run Front End(React Project):

In the project directory, you can run:

### 1.`npm install` 
 Install the node modules
 
### 2.`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## To run Back End (Node.js Project):

Go to the backend folder of the project directory, you can run:

### 1. `npm install`

Instal the node modules

### 2. `npm run start`

Runs the app in the development mode.\
The server runs at [http://localhost:4000](http://localhost:4000).

### Assumptions

This project requires elasticsearch installed locally on the system. You can download the elasticsearch from https://www.elastic.co/downloads/elasticsearch.

Steps to run elasticsearch locally and index the data:

1. To run Elasticsearch on Windows system, from the unzipped directory, run bin\elasticsearch.bat from the command line.For every other OS, run ./bin/elasticsearch from the terminal. At this point it should be running on your system.To check connection, go to [http://localhost:9200](http://localhost:9200).
2. From the backend folder, run the "script.sh" file. This script file create an index with name "people" and bulk inserts the 1 Million records into the elasticsearch cluster.

## Output

![Alt text](output.png?raw=true "Output")
