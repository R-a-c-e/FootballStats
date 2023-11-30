import { Client } from 'pg';

export default defineNuxtPlugin(nuxtApp => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'football_stats',
        port: 5432
    })

    client.connect();
})