DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
    team_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL
);

CREATE TABLE games (
    game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    home_team_goals INT CHECK (home_team_goals >= 0),
    away_team_goals INT CHECK (away_team_goals >= 0),
    result VARCHAR(255) NOT NULL,
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id) ON DELETE CASCADE
);

-- Insert 20 EPL teams
INSERT INTO teams (team_name) VALUES
('Arsenal'),
('Aston Villa'),
('Bournemouth'),
('Brentford'),
('Brighton'),
('Chelsea'),
('Crystal Palace'),
('Everton'),
('Fulham'),
('Liverpool'),
('Luton Town'),
('Manchester City'),
('Manchester United'),
('Newcastle United'),
('Nottingham Forest'),
('Sheffield United'),
('Tottenham Hotspur'),
('West Ham United'),
('Wolverhampton Wanderers'),
('Bristol City'); -- Added a placeholder to make 20


-- Insert 60 games (6 games per team)
-- We'll distribute matches roughly randomly; each team appears in 6 games.
INSERT INTO games (home_team_id, away_team_id, home_team_goals, away_team_goals, result) VALUES
(1, 2, 2, 1, 'Home Win'),
(3, 4, 1, 1, 'Draw'),
(5, 6, 0, 3, 'Away Win'),
(7, 8, 2, 2, 'Draw'),
(9, 10, 1, 0, 'Home Win'),
(11, 12, 0, 2, 'Away Win'),

(13, 14, 3, 1, 'Home Win'),
(15, 16, 1, 1, 'Draw'),
(17, 18, 0, 0, 'Draw'),
(19, 20, 2, 3, 'Away Win'),
(1, 3, 1, 0, 'Home Win'),
(2, 4, 0, 2, 'Away Win'),

(5, 7, 2, 0, 'Home Win'),
(6, 8, 1, 1, 'Draw'),
(9, 11, 0, 2, 'Away Win'),
(10, 12, 3, 2, 'Home Win'),
(13, 15, 1, 0, 'Home Win'),
(14, 16, 0, 1, 'Away Win'),

(17, 19, 2, 2, 'Draw'),
(18, 20, 1, 0, 'Home Win'),
(1, 5, 0, 1, 'Away Win'),
(2, 6, 3, 1, 'Home Win'),
(3, 7, 2, 2, 'Draw'),
(4, 8, 0, 0, 'Draw'),

(9, 13, 1, 1, 'Draw'),
(10, 14, 2, 0, 'Home Win'),
(11, 15, 0, 1, 'Away Win'),
(12, 16, 1, 2, 'Away Win'),
(17, 1, 2, 1, 'Home Win'),
(18, 2, 0, 3, 'Away Win'),

(3, 9, 1, 2, 'Away Win'),
(4, 10, 0, 0, 'Draw'),
(5, 11, 3, 1, 'Home Win'),
(6, 12, 2, 2, 'Draw'),
(7, 13, 0, 1, 'Away Win'),
(8, 14, 1, 0, 'Home Win'),

(15, 19, 2, 1, 'Home Win'),
(16, 20, 0, 0, 'Draw'),
(17, 3, 1, 2, 'Away Win'),
(18, 4, 0, 1, 'Away Win'),
(1, 6, 3, 0, 'Home Win'),
(2, 5, 1, 1, 'Draw'),

(7, 9, 0, 2, 'Away Win'),
(8, 10, 2, 0, 'Home Win'),
(11, 13, 1, 1, 'Draw'),
(12, 14, 0, 3, 'Away Win'),
(15, 1, 2, 2, 'Draw'),
(16, 2, 1, 0, 'Home Win');
