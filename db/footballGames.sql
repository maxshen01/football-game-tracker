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

--Seeded data
INSERT INTO results (home_team_id, away_team_id, home_team_goals, away_team_goals, result_date) VALUES
-- Round 1 (6 weeks ago)
(1, 2, 2, 1, CURRENT_DATE - INTERVAL '42 days'),
(3, 4, 1, 1, CURRENT_DATE - INTERVAL '42 days'),
(5, 6, 0, 3, CURRENT_DATE - INTERVAL '42 days'),
(7, 8, 2, 2, CURRENT_DATE - INTERVAL '42 days'),
(9, 10, 1, 0, CURRENT_DATE - INTERVAL '42 days'),
(11, 12, 0, 2, CURRENT_DATE - INTERVAL '42 days'),
(13, 14, 3, 1, CURRENT_DATE - INTERVAL '42 days'),
(15, 16, 1, 1, CURRENT_DATE - INTERVAL '42 days'),
(17, 18, 0, 0, CURRENT_DATE - INTERVAL '42 days'),
(19, 20, 2, 3, CURRENT_DATE - INTERVAL '42 days'),

-- Round 2 (5 weeks ago)
(1, 3, 1, 0, CURRENT_DATE - INTERVAL '35 days'),
(2, 4, 0, 2, CURRENT_DATE - INTERVAL '35 days'),
(5, 7, 2, 0, CURRENT_DATE - INTERVAL '35 days'),
(6, 8, 1, 1, CURRENT_DATE - INTERVAL '35 days'),
(9, 11, 0, 2, CURRENT_DATE - INTERVAL '35 days'),
(10, 12, 3, 2, CURRENT_DATE - INTERVAL '35 days'),
(13, 15, 1, 0, CURRENT_DATE - INTERVAL '35 days'),
(14, 16, 0, 1, CURRENT_DATE - INTERVAL '35 days'),
(17, 19, 2, 2, CURRENT_DATE - INTERVAL '35 days'),
(18, 20, 1, 0, CURRENT_DATE - INTERVAL '35 days'),

-- Round 3 (4 weeks ago)
(1, 4, 2, 1, CURRENT_DATE - INTERVAL '28 days'),
(2, 5, 1, 1, CURRENT_DATE - INTERVAL '28 days'),
(3, 6, 0, 3, CURRENT_DATE - INTERVAL '28 days'),
(7, 10, 2, 2, CURRENT_DATE - INTERVAL '28 days'),
(8, 9, 1, 0, CURRENT_DATE - INTERVAL '28 days'),
(11, 14, 0, 1, CURRENT_DATE - INTERVAL '28 days'),
(12, 13, 3, 1, CURRENT_DATE - INTERVAL '28 days'),
(15, 18, 2, 2, CURRENT_DATE - INTERVAL '28 days'),
(16, 17, 0, 0, CURRENT_DATE - INTERVAL '28 days'),
(19, 20, 1, 2, CURRENT_DATE - INTERVAL '28 days'),

-- Round 4 (3 weeks ago)
(1, 5, 3, 0, CURRENT_DATE - INTERVAL '21 days'),
(2, 6, 1, 1, CURRENT_DATE - INTERVAL '21 days'),
(3, 7, 2, 2, CURRENT_DATE - INTERVAL '21 days'),
(4, 8, 0, 0, CURRENT_DATE - INTERVAL '21 days'),
(9, 13, 1, 1, CURRENT_DATE - INTERVAL '21 days'),
(10, 14, 2, 0, CURRENT_DATE - INTERVAL '21 days'),
(11, 15, 0, 1, CURRENT_DATE - INTERVAL '21 days'),
(12, 16, 1, 2, CURRENT_DATE - INTERVAL '21 days'),
(17, 19, 2, 1, CURRENT_DATE - INTERVAL '21 days'),
(18, 20, 0, 3, CURRENT_DATE - INTERVAL '21 days'),

-- Round 5 (2 weeks ago)
(1, 6, 3, 0, CURRENT_DATE - INTERVAL '14 days'),
(2, 7, 1, 1, CURRENT_DATE - INTERVAL '14 days'),
(3, 8, 0, 2, CURRENT_DATE - INTERVAL '14 days'),
(4, 9, 2, 2, CURRENT_DATE - INTERVAL '14 days'),
(5, 10, 1, 0, CURRENT_DATE - INTERVAL '14 days'),
(11, 16, 0, 1, CURRENT_DATE - INTERVAL '14 days'),
(12, 17, 2, 2, CURRENT_DATE - INTERVAL '14 days'),
(13, 18, 1, 0, CURRENT_DATE - INTERVAL '14 days'),
(14, 19, 0, 3, CURRENT_DATE - INTERVAL '14 days'),
(15, 20, 2, 1, CURRENT_DATE - INTERVAL '14 days'),

-- Round 6 (last weekend)
(1, 7, 2, 2, CURRENT_DATE - INTERVAL '7 days'),
(2, 8, 1, 0, CURRENT_DATE - INTERVAL '7 days'),
(3, 9, 0, 1, CURRENT_DATE - INTERVAL '7 days'),
(4, 10, 2, 1, CURRENT_DATE - INTERVAL '7 days'),
(5, 11, 3, 0, CURRENT_DATE - INTERVAL '7 days'),
(6, 12, 1, 2, CURRENT_DATE - INTERVAL '7 days'),
(13, 19, 2, 2, CURRENT_DATE - INTERVAL '7 days'),
(14, 20, 0, 0, CURRENT_DATE - INTERVAL '7 days'),
(15, 16, 1, 1, CURRENT_DATE - INTERVAL '7 days'),
(17, 18, 0, 1, CURRENT_DATE - INTERVAL '7 days');
