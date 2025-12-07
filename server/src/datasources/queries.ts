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
    INSERT_TASK: `with new_task as (
                insert into tasks (title, description, priority, status, user_id, project_id)
                values ($1, $2, $3, $4, $5, $6)
                returning *
)
                select t.id, t.title, t.description, t.priority, t.status, t.user_id, t.project_id, u.user_full_name
                from new_task t
                inner join users u on u.id = t.user_id;`,
    DELETE_TASK_BY_ID: `delete from tasks where id = $1 RETURNING id`,
    DELETE_PROJECT_BY_ID: `DELETE FROM projects WHERE id = $1 RETURNING id`,
    UPDATE_PROJECT_BY_ID: `UPDATE projects SET title = $2, description = $3, priority = $4::priority_level WHERE id = $1 RETURNING *`,
    UPDATE_TASK_BY_ID: `with updated_task as (
                        UPDATE tasks SET 
                            title = $2, 
                            description = $3, 
                            priority = $4::priority_level, 
                            status = $5::status,
                            user_id = $6,
                            project_id = $7
                    WHERE id = $1 RETURNING *
                    )
                    select t.id, t.title, t.description, t.priority, t.status, t.user_id, t.project_id, p.title, u.user_full_name from updated_task t
                    left outer join projects p on t.project_id = p.id
                    left outer join users u on t.user_id = u.id`,
    SELECT_TASK_BY_ID: `SELECT
                            t.id,
                            t.title,
                            t.description,
                            t.priority,
                            t.status,
                            t.user_id,
                            t.project_id,
                            u.user_full_name
                        FROM
                            tasks t
                                INNER JOIN
                            users u ON t.user_id = u.id
                        WHERE
                            t.id = $1`,
    SELECT_PROJECT_BY_ID: `SELECT
                            p.id,
                            p.title,
                            p.description,
                            p.priority
                        FROM
                            projects p
                       WHERE
                           p.id = $1`,
    SELECT_TASK_BY_PROJECT_ID: `SELECT
                                    t.id,
                                    u.user_full_name,
                                    t.title,
                                    t.description,
                                    t.priority,
                                    t.status,
                                    t.user_id,
                                    t.project_id,
                                    p.title as project_name
                                FROM tasks t
                                        left outer join users u on u.id = t.user_id
                                        left outer join projects p on p.id = t.project_id
                                WHERE
                                    t.project_id = $1`
});