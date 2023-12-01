<script setup>
import { Client } from 'pg';
</script>

<script>
// filters
//const selectedYear = ref();
//const selectedSide = ref();


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'football_stats',
    password: 'password',
    port: 5432
});
client.connect();
let side = await client.query('SELECT * FROM side')
let defense_turnovers = await client.query('SELECT * FROM defense_turnovers ')
let teams = await client.query('SELECT * FROM team ')
await client.end()

const attribute = 's_name'
const attribute2 = 't_name'

/*async function runDynamicQuery(selectedYear) { 

}*/

</script>

<template>
    <header class="bg-green-500 text-white p-4 text-center shadow-lg">
        <h1 class="text-2xl font-semibold">NFL Team Stats</h1>
      </header>
    <div>
        <li v-for="(row, index) in side.rows" :key="index">
            {{ row[attribute] }}
        </li>
        <li v-for="(row, index) in teams.rows" :key="index">
            {{ row[attribute2] }}
        </li>
    </div>
</template>