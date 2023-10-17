COPY Team FROM 'Tables/Teams.csv' DELIMITER ',' CSV HEADER;

COPY Play_Type FROM 'Tables/Playtype.csv' DELIMITER ',' CSV HEADER;

COPY Offensive_Plays FROM 'Tables/Offense.csv' DELIMITER ',' CSV HEADER;

COPY Defensive_Plays FROM 'Tables/Defense.csv' DELIMITER ',' CSV HEADER;

COPY Defense_Turnovers FROM 'Tables/Defense_Turnovers.csv' DELIMITER ',' CSV HEADER;

COPY Downs FROM 'Tables/Downs.csv' DELIMITER ',' CSV HEADER;

COPY Special_Teams FROM 'Tables/Special_Teams.csv' DELIMITER ',' CSV HEADER;

COPY Field_Goals FROM 'Tables/Field_Goals.csv' DELIMITER ',' CSV HEADER;

COPY FG_Ranges FROM 'Tables/FG_Ranges.csv' DELIMITER ',' CSV HEADER;

COPY Kickoff FROM 'Tables/Kickoff.csv' DELIMITER ',' CSV HEADER;

COPY Kickoff_Return FROM 'Tables/Kickoff_Return.csv' DELIMITER ',' CSV HEADER;

COPY Punt FROM 'Tables/Punt.csv' DELIMITER ',' CSV HEADER;

COPY Punt_Return FROM 'Tables/Punt_Return.csv' DELIMITER ',' CSV HEADER;

INSERT INTO Side (
	s_id,
	s_name
) VALUES (
	0,
	'Offense'
);

INSERT INTO Side (
	s_id,
	s_name
) VALUES (
	1,
	'Defense'
);

INSERT INTO Side (
	s_id,
	s_name
) VALUES (
	2,
	'Special Teams'
);