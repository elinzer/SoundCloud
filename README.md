# About NotSoundCloud

NotSoundCloud is a web application inspired by SoundCloud, an application that allows users to upload their own music files and listen to other folks' music. <a href='https://my-soundcloud-clone.herokuapp.com/' target='_blank' >Click here to view the NotSoundCloud live site.</a>

## Project Wiki
See below links for this project's Wiki:
- <a href='https://github.com/elinzer/SoundCloud/wiki/Feature-List' target='_blank'>Feature List</a>
- <a href='https://github.com/elinzer/SoundCloud/wiki/Database-Schema'>Database Schema</a>
- <a href='https://github.com/elinzer/SoundCloud/wiki/API-Routes' target='_blank'>API Routes</a>
- <a href='https://github.com/elinzer/SoundCloud/wiki/Redux-State-Shape' target='_blank'>Redux Store State Shape</a>

## Languages, Frameworks, Libraries
### This project was built with:
<img src='https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black' />
<img src='https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white' />
<img src='https://img.shields.io/badge/Sequelize-52B0E7.svg?style=for-the-badge&logo=Sequelize&logoColor=white' />
<img src='https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black' />
<img src='https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white' />
<img src='https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white' />
<img src='https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white' />

## To run locally
To run locally on your machine
* Clone this repo
* ```cd``` into both the ```backend``` and ```frontend``` directories and run ```npm install```
* Inside ```/backend```, create a ```.env``` file and choose a port number and a database file (to view in your browser and have a local db):

``` 
   PORT=
   DB_FILE= 
   ```
* Still in ```/backend```, run the following commands to build the database and seed it with starter data:
```
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```
* Finally, run ```npm start``` in ```/backend``` first and then in the ```/frontend``` terminal to start the backend and frontend servers!

## Splash Page
<img width="1775" alt="Screen Shot 2022-10-26 at 11 52 25 AM" src="https://user-images.githubusercontent.com/101808290/198087606-12e25831-0841-47df-93ea-531a9b815587.png">

