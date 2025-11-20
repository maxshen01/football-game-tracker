package com.footballtracker.demo.results;

import com.footballtracker.demo.results.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    //Custom query to search home and away id's for value
    @Query("SELECT r FROM results r WHERE r.home_team_id = :team_id OR r.away_team_id = :team_id")
    List<Result> findMatchesByTeamId(@Param("team_id") int team_id);

}
