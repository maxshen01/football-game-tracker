package com.footballtracker.demo.results;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity(name = "results")
public class Result {

    @Id
    private int result_id;

    @Min(value = 1, message= "min id is 1")
    @Max(value = 20, message = "max id is 20")
    private int home_team_id;

    @Min(value = 1, message= "min id is 1")
    @Max(value = 20, message = "max id is 20")
    private int away_team_id;

    @Positive(message = "goals must be positive")
    private int home_team_goals;

    @Positive(message = "goals must be positive")
    private int away_team_goals;

    @Size(min=4, message = "least number of letters for result is 4")
    private String result;

    @Past(message = "The match date must be in the past")
    private LocalDate result_date;

    protected Result() {

    }

    public Result(int away_team_id, int away_team_goals, int home_id, int home_team_goals, String result, LocalDate result_date, int result_id) {
        this.away_team_id = away_team_id;
        this.away_team_goals = away_team_goals;
        this.home_team_id = home_id;
        this.home_team_goals = home_team_goals;
        this.result = result;
        this.result_date = result_date;
        this.result_id = result_id;
    }

    public int getAway_team_id() {
        return away_team_id;
    }

    public void setAway_team_id(int away_team_id) {
        this.away_team_id = away_team_id;
    }

    public int getAway_team_goals() {
        return away_team_goals;
    }

    public void setAway_team_goals(int away_team_goals) {
        this.away_team_goals = away_team_goals;
    }

    public int getHome_id() {
        return home_team_id;
    }

    public void setHome_id(int home_id) {
        this.home_team_id = home_id;
    }

    public int getHome_team_goals() {
        return home_team_goals;
    }

    public void setHome_team_goals(int home_team_goals) {
        this.home_team_goals = home_team_goals;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public LocalDate getResult_date() {
        return result_date;
    }

    public void setResult_date(LocalDate result_date) {
        this.result_date = result_date;
    }

    public int getResult_id() {
        return result_id;
    }

    public void setResult_id(int result_id) {
        this.result_id = result_id;
    }

    @Override
    public String toString() {
        return "Result{" +
                "away_team_id=" + away_team_id +
                ", result_id=" + result_id +
                ", home_id=" + home_team_id +
                ", home_team_goals=" + home_team_goals +
                ", away_team_goals=" + away_team_goals +
                ", result='" + result + '\'' +
                ", result_date=" + result_date +
                '}';
    }
}
