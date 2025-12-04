export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash)
            VALUES ($1, $2) 
            RETURNING id, email, created_at
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
    SELECT_ALL_PROJECTS: `
        select pr.id, pr.title, pr.description, pr.priority
        from projects pr
    `,
    INSERT_PROJECT: `INSERT INTO projects (title, description, priority) VALUES ($1, $2, $3) RETURNING id, title, description, priority`,
});