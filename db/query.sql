-- SELECT *
-- FROM employee
-- JOIN role ON employee.role_id = role.id;

-- View all roles
-- SELECT role.id, title, name AS department, salary
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT employee.id, employee.first_name, employee.last_name
-- FROM employee
-- JOIN employee manager ON employee.manager_id = manager_id;

-- View all employees
SELECT role.id, first_name, last_name, title, name AS department, salary, manager_id
FROM employee
JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;

-- View all departments
-- SELECT *
-- FROM department