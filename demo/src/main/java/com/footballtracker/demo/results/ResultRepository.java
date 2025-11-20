package com.footballtracker.demo.results;

import com.footballtracker.demo.results.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Integer> {

}
