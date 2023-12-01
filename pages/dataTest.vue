<script setup>
import { Client } from 'pg';
</script>

<script>
// filters
//const selectedYear = ref();
//const selectedSide = ref();


const client = new Client({
    user: 'peter',
    host: 'localhost',
    database: 'peter',
    password: 'password',
    port: 5432
});
client.connect();
const queryString = "SELECT t.t_name AS team, off.op_year AS year, off.op_att AS attempts, off.op_cmp AS completions, off.op_yds AS yards, off.op_td AS touchdowns, off.op_int AS interceptions, off.op_1st AS firstdowns, off.op_20_plus AS twentyplus, off.op_40_plus AS fortyplus, off.op_lng AS longest, off.op_sack AS sacks FROM offensive_plays AS off JOIN team AS t ON off.op_team_id=t.t_id WHERE off.op_playtype_id=0 and off.op_year=2022";
const testQuery = await client.query(queryString);
console.log(testQuery.rows)
await client.end()

const attribute = 's_name'
const attribute2 = 't_name'
const teamLogo = 't_logo'

/*async function runDynamicQuery(selectedYear) { 

}*/

</script>

<template>
    <header class="bg-green-500 text-white p-4 text-center shadow-lg">
        <h1 class="text-2xl font-semibold">NFL Team Stats</h1>
      </header>
    <div>
        

        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Year</th>
                    <th>Passing Yards</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in testQuery.rows">
                    <td>{{ row.team }}</td>
                    <td>{{ row.year }}</td>
                    <td>{{ row.yards }}</td>
                </tr>
            </tbody>
        </table>
        <!--li v-for="(row, index) in side.rows" :key="index">
            {{ row[attribute] }}
        </li>
        <li v-for="(row, index) in teams.rows" :key="index">
            {{ row[attribute2] }}
            <img :src=row[teamLogo] contain height="50px" width="50px"/>
        </li-->
    </div>
</template>