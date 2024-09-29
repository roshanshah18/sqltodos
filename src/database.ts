import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "password",
    port: 3306,
  });
  return conn;
}

export async function getAllTodos() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELECT * FROM todos");
  console.log("getAllTodos result", result[0]);
  return result[0];
}

export async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      created_at DATETIME DEFAULT(NOW())
    );
    `
  );
}

export async function createTodo(name: string) {
  const conn = await getMysqlConnection();

  await conn.query(`INSERT INTO todos (name) VALUES ('${name}') ;`);

  const result = await conn.query(
    `SELECT * FROM todos ORDER BY created_at DESC LIMIT 1 ;`
  );
  console.log(result);
  return result[0];
}

export async function gettodoId(id: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`SELECT * FROM todos WHERE id=${id}`);
  console.log("GetTodo by id is:", result[0]);
  return result[0];
}

export async function deleteTodo(id: number) {
  try {
    const conn = await getMysqlConnection();
    const result = await conn.query(`DELETE FROM todos WHERE id=${id}`);
    console.log("DeleteTodo by id is:", result[0]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export async function updatetodo(name: string, id: number) {
  const conn = await getMysqlConnection();

  await conn.query(`UPDATE todos SET name="${name}" WHERE id="${id}"`);

  const result = await conn.query(
    `SELECT * FROM todos ORDER BY created_at DESC LIMIT 1 ;`
  );
  console.log(result);
  return result[0];
}

async function main(id: number) {
  await createTodosTable();
  await getAllTodos();
  await gettodoId(id);
  await deleteTodo(id);
}
