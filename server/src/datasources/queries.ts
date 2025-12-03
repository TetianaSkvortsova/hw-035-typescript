export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash)
            VALUES ($1, $2) 
            RETURNING id, email, created_at
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
});