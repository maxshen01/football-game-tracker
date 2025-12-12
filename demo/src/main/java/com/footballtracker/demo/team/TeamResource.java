package com.footballtracker.demo.team;

import com.footballtracker.demo.errorhandling.UserNotFoundException;
import com.footballtracker.demo.results.Result;
import com.footballtracker.demo.results.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class TeamResource {
    private TeamRepository teamRepository;
    private ResultRepository resultRepository;

    @Autowired
    public TeamResource(TeamRepository teamRepository, ResultRepository resultRepository) {
        this.teamRepository = teamRepository;
        this.resultRepository = resultRepository;
    }

    //Get all the teams in the league
    @GetMapping("/teams")
    public ResponseEntity<List<Team>> retrieveAllTeams() {
        List<Team> allTeams = teamRepository.findAll();

        if (allTeams.isEmpty()) {
            String message = String.format("No teams have been added to the database");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok().body(allTeams);
    }

    @GetMapping("/teams/{id}")
    public Team retrieveTeamById(@PathVariable int id) {
        Optional<Team> teamName = teamRepository.findById(id);

        if (teamName.isEmpty()) {
            String message = String.format("A team with this id does not exist");
            throw new UserNotFoundException(message);
        }

        return teamName.get();
    }

    //Get all the results of a specific team by id
    @GetMapping("/teams/{id}/results")
    public ResponseEntity<List<Result>> retreiveTeamResultsById(@PathVariable int id) {
        List<Result> resultsForTeam = resultRepository.findMatchesByTeamId(id);

        if (resultsForTeam.isEmpty()) {
            String message = String.format("No results exist for this team id");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok().body(resultsForTeam);
    }

}
