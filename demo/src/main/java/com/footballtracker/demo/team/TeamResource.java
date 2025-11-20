package com.footballtracker.demo.team;

import com.footballtracker.demo.errorhandling.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class TeamResource {
    private TeamRepository teamRepository;

    @Autowired
    public TeamResource(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping("/teams")
    public ResponseEntity<List<Team>> retrieveAllTeams() {
        List<Team> allTeams = teamRepository.findAll();

        if (allTeams.isEmpty()) {
            String message = String.format("No teams have been added to the database");
            throw new UserNotFoundException(message);
        }

        return ResponseEntity.ok().body(allTeams);
    }

//    @GetMapping("/leaguetable")
//    public List<Team> retrieveLeagueTable() {
//
//    }

}
