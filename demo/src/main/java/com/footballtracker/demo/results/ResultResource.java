package com.footballtracker.demo.results;

import com.footballtracker.demo.errorhandling.UserNotFoundException;
import com.footballtracker.demo.results.Result;
import com.footballtracker.demo.team.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
