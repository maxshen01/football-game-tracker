package com.footballtracker.demo.results;

import com.footballtracker.demo.leaguetable.LeagueTable;
import com.footballtracker.demo.results.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    //Custom query to search home and away id's for value
    @Query("SELECT r FROM results r WHERE r.home_team_id = :team_id OR r.away_team_id = :team_id")
    List<Result> findMatchesByTeamId(@Param("team_id") int team_id);

    //Custom query to return an object containing the objects of league positions
    @Query(value =
    """
    SELECT
        t.team_id,
        t.team_name,

        -- Total games played
        SUM(CASE
                WHEN t.team_id = r.home_team_id OR t.team_id = r.away_team_id
                THEN 1
                ELSE 0
            END) AS games_played,

        -- Wins
        COALESCE(SUM(
                CASE
                    WHEN (t.team_id = r.home_team_id AND r.home_team_goals > r.away_team_goals)
                      OR (t.team_id = r.away_team_id AND r.away_team_goals > r.home_team_goals)
                    THEN 1
                    ELSE 0
                END
            ), 0) AS wins,

        -- Draws
        COALESCE(SUM(
                CASE
                    WHEN r.home_team_goals = r.away_team_goals
                    THEN 1
                    ELSE 0
                END
            ), 0) AS draws,

        -- Losses
        COALESCE(SUM(
                CASE
                    WHEN (t.team_id = r.home_team_id AND r.home_team_goals < r.away_team_goals)
                      OR (t.team_id = r.away_team_id AND r.away_team_goals < r.home_team_goals)
                    THEN 1
                    ELSE 0
                END
            ), 0) AS losses,

        -- Goals For
        SUM(CASE
                WHEN t.team_id = r.home_team_id THEN r.home_team_goals
                ELSE r.away_team_goals
            END) AS goals_for,

        -- Goals Against
        SUM(CASE
                WHEN t.team_id = r.home_team_id THEN r.away_team_goals
                ELSE r.home_team_goals
            END) AS goals_against,

        -- Points
        SUM(
            CASE
                WHEN (t.team_id = r.home_team_id AND r.home_team_goals > r.away_team_goals)
                  OR (t.team_id = r.away_team_id AND r.away_team_goals > r.home_team_goals)
                THEN 3
                WHEN r.home_team_goals = r.away_team_goals
                THEN 1
                ELSE 0
            END
        ) AS points

    FROM teams t
    JOIN results r
        ON t.team_id = r.home_team_id OR t.team_id = r.away_team_id
    GROUP BY t.team_id, t.team_name
    ORDER BY points DESC;
    """,
            nativeQuery = true)
    List<LeagueTable> getLeagueTable();

}
