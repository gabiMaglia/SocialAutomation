import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString =
  process.env.NEXT_PUBLIC_DATABASE_URL 

console.log('🔌 Connecting to PostgreSQL...');

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(async (client) => {
    console.log('✅ Connected to PostgreSQL!');
    const res = await client.query('SELECT NOW()');
    console.log('🕒 Database time:', res.rows[0].now);
    client.release();
  })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
  });

export const db = drizzle(pool, { schema });
