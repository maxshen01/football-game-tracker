future:
add a switch button for home and away
order the league table by goal difference
order results by date, currently only ordered by result_id
let the delete result page select 2 teams
add search team function on home page
program in date of create result to be todays date?
clear button for create a result form

nice to haves:
form diagram on table
be able to sort table based on one of the columns
filter tables for home and away
list top goalscorers (unlikely)
account/login page to identify who can delete results
add chatgpt for fun lol, ai chatbox

now:
fix styling of prem table and create result form

bugs
you can select "select a team" on the away team if a home team has been selected
navbar becomes black when screen is small.
localhost:3000 no longer shows the index page automatically

API implementation:
implement functionality to populate the database using an api instead of sample/filler sql.
The api for use is:

https://api.football-data.org/v4/competitions/PL/matches?season=2025

to get all the matches, past, present and future for this season.

to populate the database, we need to convert the json data:

Json ---> Java object matching Json object ---> Java (springboot) entity matching db --->
db entries.
