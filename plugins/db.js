import { Client } from 'pg';

export default defineNuxtPlugin(nuxtApp => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'football_stats',
        password: 'password',
        port: 5432
    })

    client.connect();
})