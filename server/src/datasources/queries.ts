export const QUERIES = Object.freeze({
    INSERT_NEW_USER: `
            INSERT INTO users (email, password_hash, user_full_name)
            VALUES ($1, $2, $3) 
            RETURNING id, email, created_at
        `,
    SELECT_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
    SELECT_ALL_PROJECTS: `
        select pr.id, pr.title, pr.description, pr.priority
        from projects pr
    `,
    INSERT_PROJECT: `INSERT INTO projects (title, description, priority) VALUES ($1, $2, $3) RETURNING id, title, description, priority`,
    SELECT_ALL_TASKS: `
       select t.id,
           u.user_full_name,
           t.title,
           t.description,
           t.priority,
           t.status,
           t.user_id,
           t.project_id,
           p.title as project_name
        from tasks t
                 left outer join users u on u.id = t.user_id
                 left outer join projects p on p.id = t.project_id 
    `,
    SELECT_ALL_USERS: `
        select u.id,
               u.user_full_name
        from users u`,
    INSERT_TASK: `insert into tasks (title, description, priority, status, user_id, project_id) 
        values ($1, $2, $3, $4, $5, $6) returning id, title, description, priority, status, user_id, project_id`
});