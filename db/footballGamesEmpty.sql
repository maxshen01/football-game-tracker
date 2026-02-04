--Remove previous tables if needed
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS teams;

--create the tables
CREATE TABLE teams (
    team_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL
);

CREATE TABLE results (
    result_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    home_team_goals INT CHECK (home_team_goals >= 0),
    away_team_goals INT CHECK (away_team_goals >= 0),
    result_date date not null,
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id) ON DELETE CASCADE
);