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


    //CUstom query to get the league table
    @Query(value = """
    SELECT
        t.team_id,
        t.team_name,
    
        SUM(CASE
                    WHEN (t.team_id = r.home_team_id OR t.team_id = r.away_team_id)
        THEN 1
        ELSE 0
        END) AS games_played,
    
        COALESCE(
                SUM(CASE
                        WHEN
                        (t.team_id = r.home_team_id AND r.result ='Home Win') OR
                    (t.team_id = r.away_team_id AND r.result ='Away Win')
        THEN 1
        ELSE 0
        END), 0
                ) AS wins,
    
        COALESCE(
                SUM(CASE
                        WHEN
                        (t.team_id = r.home_team_id AND r.result ='Draw') OR
                    (t.team_id = r.away_team_id AND r.result ='Draw')
        THEN 1
        ELSE 0
        END), 0
                ) AS draws,
    
        COALESCE(
                SUM(CASE
                        WHEN
                        (t.team_id = r.home_team_id AND r.result ='Away Win') OR
                    (t.team_id = r.away_team_id AND r.result ='Home Win')
        THEN 1
        END), 0
                ) AS losses,
    
        SUM(CASE
                    WHEN t.team_id = r.home_team_id THEN r.home_team_goals
                    ELSE r.away_team_goals
                    END) AS goals_for,
    
        SUM(CASE
                    WHEN t.team_id = r.home_team_id THEN r.away_team_goals
                    ELSE r.home_team_goals
                    END) AS goals_against,
    
        SUM(CASE
                    WHEN
                    (t.team_id = r.home_team_id AND r.result ='Home Win') OR
                    (t.team_id = r.away_team_id AND r.result ='Away Win')
        THEN 3
        WHEN
                (t.team_id = r.home_team_id OR t.team_id = r.away_team_id)
        AND r.result = 'Draw' THEN 1
        ELSE 0
        END) AS points
    
        FROM teams t
        JOIN results r
        ON t.team_id = r.home_team_id OR t.team_id = r.away_team_id
        GROUP BY t.team_id, t.team_name
        ORDER BY points DESC;
    """, nativeQuery = true)
    List<LeagueTable> getLeagueTable();

}
