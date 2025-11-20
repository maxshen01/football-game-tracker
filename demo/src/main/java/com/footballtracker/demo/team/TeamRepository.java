package com.footballtracker.demo.team;

import org.springframework.data.jpa.repository.JpaRepository;
import com.footballtracker.demo.team.Team;


public interface TeamRepository extends JpaRepository<Team, Integer> {

}
