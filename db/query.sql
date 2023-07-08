-- SELECT *
-- FROM employee
-- JOIN role ON employee.role_id = role.id;

-- View all roles
-- SELECT role.id, title, name AS department, salary
-- FROM role
-- JOIN department ON role.department_id = department.id;

SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary AS salary, department.name AS department, IFNULL(CONCAT(mans.first_name, " ", mans.last_name), "No Manager") AS manager
FROM employee emp
LEFT JOIN employee mans ON emp.manager_id = mans.id JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id

-- View all employees
-- SELECT role.id, first_name, last_name, title, name AS department, salary, manager_id
-- FROM employee
-- JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;


-- View all departments
-- SELECT *
-- FROM department