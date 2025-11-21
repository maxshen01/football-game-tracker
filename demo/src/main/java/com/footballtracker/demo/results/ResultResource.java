package com.footballtracker.demo.results;

import com.footballtracker.demo.errorhandling.UserNotFoundException;
import com.footballtracker.demo.leaguetable.LeagueTable;
import com.footballtracker.demo.results.Result;
import com.footballtracker.demo.team.Team;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    //route to get all the results stored in the db
    @GetMapping("/results")
    public ResponseEntity<List<Result>> retrieveAllResults() {
        List<Result> allResults = resultRepository.findAll();

        if (allResults.isEmpty()) {
            String message = String.format("No results have been added to the database");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok().body(allResults);
    }

    //route to get an ordered list of objects for the table.
    @GetMapping("/results/leaguetable")
    public ResponseEntity<List<LeagueTable>> retrieveLeagueTable() {
        List<LeagueTable> table = resultRepository.getLeagueTable();

        if (table.size() != 20) {
            String message = String.format("The size of the table is incorrect");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok(table);
    }

    //route to create a new result
    @PostMapping("/results")
    public void createResult(@Valid @RequestBody Result newResult) {
        Result savedResult = resultRepository.save(newResult);
    }

}
