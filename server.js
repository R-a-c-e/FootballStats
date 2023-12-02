const express = require('express');
const { Pool } = require('pg');

const app = express();
const ports = {
	server: 3001,
	react: 3000,
	database: 5432
};

// PostgreSQL configuration
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'nflstats',
	password: 'pizza',
	port: ports.database,
});

const queries = {
	offense_passing: (year) => (`
		SELECT 
			t.t_name AS team,
			off.op_year AS year,
			off.op_att AS attempts,
			off.op_cmp AS completions,
			off.op_yds AS yards,
			off.op_td AS touchdowns,
			off.op_int AS interceptions,
			off.op_1st AS firstdowns,
			off.op_20_plus AS twentyplus,
			off.op_40_plus AS fortyplus,
			off.op_lng AS longest,
			off.op_sack AS sacks
		FROM offensive_plays AS off
		JOIN team AS t ON off.op_team_id=t.t_id 
		WHERE off.op_playtype_id=0 and off.op_year=${year};
	`),
	offense_rushing: (year) => (`
		SELECT 
			t.t_name AS team,
			off.op_year AS year,
			off.op_att AS attempts,
			off.op_yds AS yards,
			off.op_td AS touchdowns,
			off.op_1st AS firstdowns,
			off.op_20_plus AS twentyplus,
			off.op_40_plus AS fortyplus,
			off.op_lng AS longest,
			off.op_fum AS fumbles
		FROM offensive_plays AS off
		JOIN team AS t ON off.op_team_id=t.t_id 
		WHERE off.op_playtype_id=1 and off.op_year=${year};
	`),
	offense_total_scoring: (year) => (`
		SELECT 
			t.t_name AS team,
			off.op_year AS year,
			SUM(CASE WHEN off.op_playtype_id=1 THEN off.op_td ELSE 0 END) AS rush_touchdowns,
			SUM(CASE WHEN off.op_playtype_id=0 THEN off.op_td ELSE 0 END) AS pass_touchdowns,
			SUM(CASE WHEN off.op_playtype_id IN (0,1) THEN off.op_td ELSE 0 END) AS total_touchdowns
			FROM offensive_plays AS off
		JOIN team AS t ON off.op_team_id=t.t_id 
		WHERE off.op_year=${year}
		GROUP BY t.t_name, off.op_year, t.t_id
		ORDER BY t.t_id ASC;
	`),
	defense_passing: (year) => (`
		SELECT 
			t.t_name AS team,
			def.dp_year AS year,
			def.dp_att AS attempts,
			def.dp_cmp AS completions,
			def.dp_yds AS yards,
			def.dp_td_allowed AS touchdowns_allowed,
			def.dp_1st AS firstdowns
		FROM defensive_plays as def
		JOIN team AS t ON def.dp_team_id=t.t_id 
		WHERE def.dp_playtype_id=0 and def.dp_year=${year};
	`),
	defense_rushing: (year) => (`
		SELECT 
			t.t_name AS team,
			def.dp_year AS year,
			def.dp_att AS attempts,
			def.dp_yds AS yards,
			def.dp_td_allowed AS touchdowns_allowed,
			def.dp_1st AS firstdowns
		FROM defensive_plays as def
		JOIN team AS t ON def.dp_team_id=t.t_id 
		WHERE def.dp_playtype_id=1 and def.dp_year=${year};
	`),
	defense_misc: (year) => (`
		SELECT 
			t.t_name AS team,
			def.dp_year AS year,
			def.dp_sack AS sacks,
			dt.dt_ff AS forced_fumbles,
			dt.dt_fr AS fumbles_recovered,
			dt.dt_fr_td AS fumbles_touchdowns,
			dt.dt_int AS interceptions,
			dt.dt_int_td AS pick_6,
			dt.dt_safety AS safeties
		FROM defense_turnovers as dt
		JOIN defensive_plays as def ON def.dp_team_id=dt.dt_team_id
		JOIN team AS t ON def.dp_team_id=t.t_id 
		WHERE def.dp_year=${year} and dt.dt_year=${year} and def.dp_sack>0;
	`),
	special_teams_scoring: (year) => (`
		SELECT
			t.t_name AS team,
			st.st_year AS year,
			st.st_xp_md AS xp_made,
			st.st_lng AS long,
			st.st_2pt_md AS twopt_made,
			st.st_fg_blk as field_goal_blocked,
			fgtemp.att AS fg_attempts,
			fgtemp.made AS fg_made
		FROM Special_Teams AS st
		JOIN Team AS t ON st.st_team_id=t.t_id
		JOIN 
			(SELECT 
				fg.fg_team_id as tid, 
				sum(fg.fg_att) as att, 
				sum(fg.fg_made) as made
			FROM Field_Goals AS fg
			WHERE fg.fg_year=${year}
			GROUP BY fg.fg_team_id
			ORDER BY fg.fg_team_id ASC)
		AS fgtemp
		ON st.st_team_id=fgtemp.tid
		WHERE st.st_year=${year};
	`),
	special_teams_kickoffs: (year) => (`
		SELECT
			t.t_name AS team,
			k.k_ko AS num_kickoffs,
			k.k_tb AS num_touchbacks,
			k.k_ret AS opp_num_returns,
			k.k_yds AS kickoff_yards_allowed,
			k.k_ret_avg AS avg_return_allowed,
			k.k_osk AS offside_att,
			k.k_osk_rec AS offside_succ,
			k.k_oob AS num_oob,
			k.k_td AS ret_td_allowed,
			kr.kr_ret AS num_returns,
			kr.kr_yds AS num_yards,
			kr.kr_td AS num_touchdowns,
			kr.kr_lng AS longest_return,
			kr.kr_fc AS num_fair_catch,
			kr.kr_fum AS num_fumbles
		FROM Team as t
		JOIN Kickoff as k on t.t_id=k.k_team_id
		JOIN Kickoff_Return as kr on t.t_id=kr.kr_team_id
		WHERE k.k_year=${year} and kr.kr_year=${year};
	`),
	special_teams_punts: (year) => (`
		SELECT
			t.t_name AS team,
			p.p_net_yds AS net_yards,
			p.p_punts AS num_punts,
			p.p_yds AS punt_yards,
			p.p_in_20 AS num_inside_20,
			p.p_oob AS num_oob,
			p.p_dn AS punts_downed,
			p.p_tb AS num_touchbacks,
			p.p_fc AS num_fair_catch,
			p.p_ret AS num_returned,
			p.p_rety AS num_ret_yards,
			p.p_td AS num_ret_tds,
			p.p_p_blk AS num_blocks,
			pr.pr_ret AS off_returns,
			pr.pr_yds AS off_ret_yds,
			pr.pr_td AS off_ret_td,
			pr.pr_20_plus AS off_20_plus,
			pr.pr_40_plus AS off_40_plus,
			pr.pr_lng AS off_long,
			pr.pr_fc AS off_fair_catch,
			pr.pr_fum AS off_fum
		FROM Team AS t
		JOIN Punt AS p ON t.t_id=p.p_team_id
		JOIN Punt_Return AS pr ON t.t_id=pr.pr_team_id
		WHERE p.p_year=${year} AND pr.pr_year=${year};
	`)
};

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", `http://localhost:${ports.react}`);
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Access-Control-Allow-Headers"
	);
	next();
});

// Example endpoint
app.get('/api/data', async(req, res) => {
	try {
		if (!("year" in req.query) || !("key" in req.query)) {
			res.json();
			return;
		}
		if (!(req.query.key in queries)) {
			res.json();
			return;
		}
		const result = await pool.query(queries[req.query.key](req.query.year));
		res.json(result.rows);
	} catch (error) {
		console.error('Error executing query', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.listen(ports.server, () => {
	console.log(`Server is running on port ${ports.server}`);
});