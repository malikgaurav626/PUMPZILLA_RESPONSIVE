import pkg from 'pg';
const { Pool } = pkg;

// Create a PostgreSQL connection pool
const database = new Pool({
    user: process.env.POSTGRES_USER,      // PostgreSQL username from environment
    host: process.env.POSTGRES_HOST,      // Host from environment
    database: process.env.POSTGRES_DB,    // Database name from environment
    password: process.env.POSTGRES_PASSWORD,  // Password from environment
    port: process.env.POSTGRES_PORT || 5432,  // Default PostgreSQL port
});

// Export the connection pool to use it in other files
export default database;
