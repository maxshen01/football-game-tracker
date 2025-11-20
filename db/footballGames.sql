DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS teams;

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
    result VARCHAR(255) NOT NULL,
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


INSERT INTO results (home_team_id, away_team_id, home_team_goals, away_team_goals, result, result_date) VALUES
-- Round 1 (6 weeks ago)
(1, 2, 2, 1, 'Home Win', CURRENT_DATE - INTERVAL '42 days'),
(3, 4, 1, 1, 'Draw', CURRENT_DATE - INTERVAL '42 days'),
(5, 6, 0, 3, 'Away Win', CURRENT_DATE - INTERVAL '42 days'),
(7, 8, 2, 2, 'Draw', CURRENT_DATE - INTERVAL '42 days'),
(9, 10, 1, 0, 'Home Win', CURRENT_DATE - INTERVAL '42 days'),
(11, 12, 0, 2, 'Away Win', CURRENT_DATE - INTERVAL '42 days'),

-- Round 2 (5 weeks ago)
(13, 14, 3, 1, 'Home Win', CURRENT_DATE - INTERVAL '35 days'),
(15, 16, 1, 1, 'Draw', CURRENT_DATE - INTERVAL '35 days'),
(17, 18, 0, 0, 'Draw', CURRENT_DATE - INTERVAL '35 days'),
(19, 20, 2, 3, 'Away Win', CURRENT_DATE - INTERVAL '35 days'),
(1, 3, 1, 0, 'Home Win', CURRENT_DATE - INTERVAL '35 days'),
(2, 4, 0, 2, 'Away Win', CURRENT_DATE - INTERVAL '35 days'),

-- Round 3 (4 weeks ago)
(5, 7, 2, 0, 'Home Win', CURRENT_DATE - INTERVAL '28 days'),
(6, 8, 1, 1, 'Draw', CURRENT_DATE - INTERVAL '28 days'),
(9, 11, 0, 2, 'Away Win', CURRENT_DATE - INTERVAL '28 days'),
(10, 12, 3, 2, 'Home Win', CURRENT_DATE - INTERVAL '28 days'),
(13, 15, 1, 0, 'Home Win', CURRENT_DATE - INTERVAL '28 days'),
(14, 16, 0, 1, 'Away Win', CURRENT_DATE - INTERVAL '28 days'),

-- Round 4 (3 weeks ago)
(17, 19, 2, 2, 'Draw', CURRENT_DATE - INTERVAL '21 days'),
(18, 20, 1, 0, 'Home Win', CURRENT_DATE - INTERVAL '21 days'),
(1, 5, 0, 1, 'Away Win', CURRENT_DATE - INTERVAL '21 days'),
(2, 6, 3, 1, 'Home Win', CURRENT_DATE - INTERVAL '21 days'),
(3, 7, 2, 2, 'Draw', CURRENT_DATE - INTERVAL '21 days'),
(4, 8, 0, 0, 'Draw', CURRENT_DATE - INTERVAL '21 days'),

-- Round 5 (2 weeks ago)
(9, 13, 1, 1, 'Draw', CURRENT_DATE - INTERVAL '14 days'),
(10, 14, 2, 0, 'Home Win', CURRENT_DATE - INTERVAL '14 days'),
(11, 15, 0, 1, 'Away Win', CURRENT_DATE - INTERVAL '14 days'),
(12, 16, 1, 2, 'Away Win', CURRENT_DATE - INTERVAL '14 days'),
(17, 1, 2, 1, 'Home Win', CURRENT_DATE - INTERVAL '14 days'),
(18, 2, 0, 3, 'Away Win', CURRENT_DATE - INTERVAL '14 days'),

-- Round 6 (last weekend)
(3, 9, 1, 2, 'Away Win', CURRENT_DATE - INTERVAL '7 days'),
(4, 10, 0, 0, 'Draw', CURRENT_DATE - INTERVAL '7 days'),
(5, 11, 3, 1, 'Home Win', CURRENT_DATE - INTERVAL '7 days'),
(6, 12, 2, 2, 'Draw', CURRENT_DATE - INTERVAL '7 days'),
(7, 13, 0, 1, 'Away Win', CURRENT_DATE - INTERVAL '7 days'),
(8, 14, 1, 0, 'Home Win', CURRENT_DATE - INTERVAL '7 days'),

-- Extra matches if needed
(15, 19, 2, 1, 'Home Win', CURRENT_DATE - INTERVAL '7 days'),
(16, 20, 0, 0, 'Draw', CURRENT_DATE - INTERVAL '7 days'),
(17, 3, 1, 2, 'Away Win', CURRENT_DATE - INTERVAL '7 days'),
(18, 4, 0, 1, 'Away Win', CURRENT_DATE - INTERVAL '7 days'),
(1, 6, 3, 0, 'Home Win', CURRENT_DATE - INTERVAL '7 days'),
(2, 5, 1, 1, 'Draw', CURRENT_DATE - INTERVAL '7 days');

