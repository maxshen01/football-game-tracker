package com.footballtracker.demo.leaguetable;

public class LeagueTable {
    private int team_id;
    private String team_name;
    private Long games_played;
    private Long games_won;
    private Long games_drawn;
    private Long games_lost;
    private Long goals_for;
    private Long goals_against;
    private Long goal_difference;
    private Long points;

    public LeagueTable() {}

    public LeagueTable(int team_id, String team_name, Long games_played, Long games_won, Long games_drawn, Long games_lost, Long goals_for, Long goals_against, Long points) {
        this.team_id = team_id;
        this.team_name = team_name;
        this.games_played = games_played;
        this.games_won = games_won;
        this.games_drawn = games_drawn;
        this.games_lost = games_lost;
        this.goals_for = goals_for;
        this.goals_against = goals_against;
        this.goal_difference = goals_for - goals_against;
        this.points = points;
    }

    public int getTeam_id() {
        return team_id;
    }

    public Long getGames_drawn() {
        return games_drawn;
    }

    public void setGames_drawn(Long games_drawn) {
        this.games_drawn = games_drawn;
    }

    public Long getGames_lost() {
        return games_lost;
    }

    public void setGames_lost(Long games_lost) {
        this.games_lost = games_lost;
    }

    public Long getGames_played() {
        return games_played;
    }

    public void setGames_played(Long games_played) {
        this.games_played = games_played;
    }

    public Long getGames_won() {
        return games_won;
    }

    public void setGames_won(Long games_won) {
        this.games_won = games_won;
    }

    public Long getGoals_against() {
        return goals_against;
    }

    public void setGoals_against(Long goals_against) {
        this.goals_against = goals_against;
    }

    public Long getGoals_for() {
        return goals_for;
    }

    public void setGoals_for(Long goals_for) {
        this.goals_for = goals_for;
    }

    public Long getPoints() {
        return points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public void setTeam_id(int team_id) {
        this.team_id = team_id;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public Long getGoal_difference() {
        return goal_difference;
    }

    public void setGoal_difference(Long goal_difference) {
        this.goal_difference = goal_difference;
    }

    @Override
    public String toString() {
        return "LeagueTable{" +
                "games_drawn=" + games_drawn +
                ", team_id=" + team_id +
                ", team_name='" + team_name + '\'' +
                ", games_played=" + games_played +
                ", games_won=" + games_won +
                ", games_lost=" + games_lost +
                ", goals_for=" + goals_for +
                ", goals_against=" + goals_against +
                ", points=" + points +
                '}';
    }
}
