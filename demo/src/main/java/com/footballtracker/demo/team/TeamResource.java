package com.footballtracker.demo.team;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TeamResource {
    private TeamRepository teamRepository;

    @Autowired
    public TeamResource(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @GetMapping("/teams")
    public List<Team> retrieveAllTeams() {
        return teamRepository.findAll();
    }

}
