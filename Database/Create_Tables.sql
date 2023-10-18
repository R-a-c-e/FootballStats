CREATE TABLE Team (
	t_id SERIAL PRIMARY KEY,
	t_location CHAR(20),
	t_name CHAR(15),
	t_logo CHAR(100)
);

CREATE TABLE Play_Type (
	pt_id SERIAL PRIMARY KEY,
	pt_name CHAR(7)
);

CREATE TABLE Side (
	s_id SERIAL PRIMARY KEY,
	s_name CHAR(15)
);

CREATE TABLE Offensive_Plays (
	op_id SERIAL PRIMARY KEY,
	op_team_id INTEGER,
	op_year INTEGER,
	op_playtype_id INTEGER,
	op_att INTEGER,
	op_cmp INTEGER,
	op_yds INTEGER,
	op_20_plus INTEGER,
	op_40_plus INTEGER,
	op_lng INTEGER,
	op_1st INTEGER,
	op_td INTEGER,
	op_fum INTEGER,
	op_int INTEGER,
	op_sack INTEGER,
	CHECK (op_att >= 0),
	CHECK (op_cmp >= 0),
	CHECK (op_yds >= 0),
	CHECK (op_20_plus >= 0),
	CHECK (op_40_plus >= 0),
	CHECK (op_lng >= 0),
	CHECK (op_1st >= 0),
	CHECK (op_td >= 0),
	CHECK (op_fum >= 0),
	CHECK (op_int >= 0),
	CHECK (op_sack >= 0),
	CHECK (op_year >= 1970)
);

CREATE TABLE Defensive_Plays (
	dp_id SERIAL PRIMARY KEY,
	dp_team_id INTEGER,
	dp_year INTEGER,
	dp_playtype_id INTEGER,
	dp_att INTEGER,
	dp_cmp INTEGER,
	dp_yds INTEGER,
	dp_1st INTEGER,
	dp_td_allowed INTEGER,
	dp_sack INTEGER,
	CHECK (dp_att >= 0),
	CHECK (dp_cmp >= 0),
	CHECK (dp_yds >= 0),
	CHECK (dp_1st >= 0),
	CHECK (dp_td_allowed >= 0),
	CHECK (dp_sack >= 0),
	CHECK (dp_year >= 1970)
);

CREATE TABLE Defense_Turnovers (
	dt_id SERIAL PRIMARY KEY,
	dt_team_id INTEGER,
	dt_year INTEGER,
	dt_ff INTEGER,
	dt_fr INTEGER,
	dt_fr_td INTEGER,
	dt_int INTEGER,
	dt_int_yds INTEGER,
	dt_int_td INTEGER,
	dt_safety INTEGER,
	CHECK (dt_ff >= 0),
	CHECK (dt_fr >= 0),
	CHECK (dt_fr_td >= 0),
	CHECK (dt_int >= 0),
	CHECK (dt_int_yds >= 0),
	CHECK (dt_int_td >= 0),
	CHECK (dt_safety >= 0),
	CHECK (dt_year >= 1970)
);

CREATE TABLE Downs (
	d_id SERIAL PRIMARY KEY,
	d_team_id INTEGER,
	d_year INTEGER,
	d_side_id INTEGER,
	d_3rd_att INTEGER,
	d_3rd_md INTEGER,
	d_4th_att INTEGER,
	d_4th_md INTEGER,
	d_scrm_plys INTEGER,
	CHECK (d_3rd_att >= 0),
	CHECK (d_3rd_md >= 0),
	CHECK (d_4th_att >= 0),
	CHECK (d_4th_md >= 0),
	CHECK (d_scrm_plys >= 0),
	CHECK (d_year >= 1970)
);

CREATE TABLE Special_Teams (
	st_id SERIAL PRIMARY KEY,
	st_team_id INTEGER,
	st_year INTEGER,
	st_xp_md INTEGER,
	st_xp_pct REAL,
	st_2pt_md INTEGER,
	st_lng INTEGER,
	st_fg_blk INTEGER,
	CHECK (st_xp_md >= 0),
	CHECK (st_xp_pct >= 0),
	CHECK (st_2pt_md >= 0),
	CHECK (st_lng >= 0),
	CHECK (st_fg_blk >= 0),
	CHECK (st_year >= 1970)
);

CREATE TABLE Field_Goals (
	fg_id SERIAL PRIMARY KEY,
	fg_team_id INTEGER,
	fg_year INTEGER,
	fg_att INTEGER,
	fg_made INTEGER,
	fg_range INTEGER,
	CHECK (fg_att >= 0),
	CHECK (fg_made >= 0),
	CHECK (fg_year >= 1970)
);

CREATE TABLE FG_Ranges (
	fgr_id SERIAL PRIMARY KEY,
	fgr_start_range INTEGER,
	fgr_end_range INTEGER,
	fgr_range CHAR(5),
	CHECK (fgr_start_range < fgr_end_range),
	CHECK (fgr_start_range >= 0),
	CHECK (fgr_end_range >= 0)
);

CREATE TABLE Kickoff (
	k_id SERIAL PRIMARY KEY,
	k_team_id INTEGER,
	k_year INTEGER,
	k_ko INTEGER,
	k_yds INTEGER,
	k_tb INTEGER,
	k_ret INTEGER,
	k_ret_avg INTEGER,
	k_osk INTEGER,
	k_osk_rec INTEGER,
	k_oob INTEGER,
	k_td INTEGER,
	CHECK (k_ko >= 0),
	CHECK (k_yds >= 0),
	CHECK (k_tb >= 0),
	CHECK (k_ret >= 0),
	CHECK (k_ret_avg >= 0),
	CHECK (k_osk >= 0),
	CHECK (k_osk_rec >= 0),
	CHECK (k_oob >= 0),
	CHECK (k_td >= 0),
	CHECK (k_year >= 1970)
);

CREATE TABLE Kickoff_Return (
	kr_id SERIAL PRIMARY KEY,
	kr_team_id INTEGER,
	kr_year INTEGER,
	kr_ret INTEGER,
	kr_yds INTEGER,
	kr_td INTEGER,
	kr_20_plus INTEGER,
	kr_40_plus INTEGER,
	kr_lng INTEGER,
	kr_fc INTEGER,
	kr_fum INTEGER,
	CHECK (kr_ret >= 0),
	CHECK (kr_yds >= 0),
	CHECK (kr_td >= 0),
	CHECK (kr_20_plus >= 0),
	CHECK (kr_40_plus >= 0),
	CHECK (kr_lng >= 0),
	CHECK (kr_fc >= 0),
	CHECK (kr_fum >= 0),
	CHECK (kr_year >= 1970)
);

CREATE TABLE Punt (
	p_id SERIAL PRIMARY KEY,
	p_team_id INTEGER,
	p_year INTEGER,
	p_net_yds INTEGER,
	p_punts INTEGER,
	p_yds INTEGER,
	p_in_20 INTEGER,
	p_oob INTEGER,
	p_dn INTEGER,
	p_tb INTEGER,
	p_fc INTEGER,
	p_ret INTEGER,
	p_rety INTEGER,
	p_td INTEGER,
	p_p_blk INTEGER,
	CHECK (p_net_yds >= 0),
	CHECK (p_punts >= 0),
	CHECK (p_yds >= 0),
	CHECK (p_in_20 >= 0),
	CHECK (p_oob >= 0),
	CHECK (p_dn >= 0),
	CHECK (p_tb >= 0),
	CHECK (p_fc >= 0),
	CHECK (p_ret >= 0),
	CHECK (p_rety >= 0),
	CHECK (p_td >= 0),
	CHECK (p_p_blk >= 0),
	CHECK (p_year >= 1970)
);

CREATE TABLE Punt_Return (
	pr_id SERIAL PRIMARY KEY,
	pr_team_id INTEGER,
	pr_year INTEGER,
	pr_ret INTEGER,
	pr_yds INTEGER,
	pr_td INTEGER,
	pr_20_plus INTEGER,
	pr_40_plus INTEGER,
	pr_lng INTEGER,
	pr_fc INTEGER,
	pr_fum INTEGER,
	CHECK (pr_ret >= 0),
	CHECK (pr_yds >= 0),
	CHECK (pr_td >= 0),
	CHECK (pr_20_plus >= 0),
	CHECK (pr_40_plus >= 0),
	CHECK (pr_lng >= 0),
	CHECK (pr_fc >= 0),
	CHECK (pr_fum >= 0),
	CHECK (pr_year >= 1970)
);

