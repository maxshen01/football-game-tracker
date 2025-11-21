package com.footballtracker.demo.results;

import com.footballtracker.demo.errorhandling.UserNotFoundException;
import com.footballtracker.demo.leaguetable.LeagueTable;
import com.footballtracker.demo.results.Result;
import com.footballtracker.demo.team.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ResultResource {

    private ResultRepository resultRepository;

    @Autowired
    public ResultResource(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @GetMapping("/results")
    public ResponseEntity<List<Result>> retrieveAllResults() {
        List<Result> allResults = resultRepository.findAll();

        if (allResults.isEmpty()) {
            String message = String.format("No results have been added to the database");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok().body(allResults);
    }

    @GetMapping("/results/leaguetable")
    public List<LeagueTable> retrieveLeagueTable() {
        List<LeagueTable> table = resultRepository.getLeagueTable();
//
//        ArrayList<LeagueTable> table = new ArrayList<LeagueTable>();
//
//        for (int i = 0; i < sqlOutput.size(); i++) {
//            LeagueTable team = new LeagueTable();
//
//            team.setTeam_name(sqlOutput.get(i).getString("team_name"));
//
//            table.add(team);
//        }

        return table;
    }

}
