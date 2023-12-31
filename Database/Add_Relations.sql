ALTER TABLE Offensive_Plays
ADD FOREIGN KEY (op_team_id) REFERENCES Team(t_id),
ADD FOREIGN KEY (op_playtype_id) REFERENCES Play_Type(pt_id);

ALTER TABLE Defensive_Plays
ADD FOREIGN KEY (dp_team_id) REFERENCES Team(t_id),
ADD FOREIGN KEY (dp_playtype_id) REFERENCES Play_Type(pt_id);

ALTER TABLE Defense_Turnovers
ADD FOREIGN KEY (dt_team_id) REFERENCES Team(t_id);

ALTER TABLE Defensive_Plays
ADD FOREIGN KEY (dp_team_id) REFERENCES Team(t_id),
ADD FOREIGN KEY (dp_playtype_id) REFERENCES Play_Type(pt_id);

ALTER TABLE Downs
ADD FOREIGN KEY (d_team_id) REFERENCES Team(t_id),
ADD FOREIGN KEY (d_side_id) REFERENCES Side(s_id);

ALTER TABLE Special_Teams
ADD FOREIGN KEY (st_team_id) REFERENCES Team(t_id);

ALTER TABLE Field_Goals
ADD FOREIGN KEY (fg_team_id) REFERENCES Team(t_id),
ADD FOREIGN KEY (fg_range) REFERENCES FG_Ranges(fgr_id);

ALTER TABLE Kickoff
ADD FOREIGN KEY (k_team_id) REFERENCES Team(t_id);

ALTER TABLE Kickoff_Return
ADD FOREIGN KEY (kr_team_id) REFERENCES Team(t_id);

ALTER TABLE Punt
ADD FOREIGN KEY (p_team_id) REFERENCES Team(t_id);

ALTER TABLE Punt_Return
ADD FOREIGN KEY (pr_team_id) REFERENCES Team(t_id);
