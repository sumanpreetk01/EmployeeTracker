const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const questions = [{
    type: 'list',
    name: 'selection',
    message: 'What would you like to do?',
    choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments','Add department']
}]

const addDeptQuestions = ({
    type:'input',
    name:'deptName',
    message:'What is the name of the department?'
})

const addRoleQuestions = (departmentOptions)=>[{
    type:'input',
    name:'roleName',
    message:'What is the name of the role?'
},{
    type:'input',
    name: 'salaryAmount',
    message:'What is the salary of the role?'
},{
    type:'list',
    name:'newRoleDept',
    message: 'Which department does the role belong to?',
    choices: departmentOptions.map((department)=>({
        name:department.name,
        value:department.id
    }))
}]

const addEmplQuestions = (roleOptions, managerOptions)=>[{
    type: 'input',
    name: 'newFirstName',
    message:`What is the employee's first name?`
},
{
    type: 'input',
    name: 'newLastName',
    message:`What is the employee's last name?`
},
{
    type: 'list',
    name: 'newRole',
    message:`What is the employee's role?`,
    choices:roleOptions.map((role)=>({
        name:role.title,
        value:role.id
    }))
},
{
    type: 'list',
    name: 'newManager',
    message:`Who is the employee's manager?`,
    choices: managerOptions
}]

const updateEmplQuestions = (employeeOptions,roleOptions)=>[{
    type:'list',
    name:'updatedEmployeeName',
    message:`Which employee's role do you want to update?`,
    choices:employeeOptions.map((employee)=>({
        name:`${employee.first_name} ${employee.last_name}`
    }))
},
{
    type:'list',
    name:'updatedEmployeeRole',
    message:`Which role do you want to assign the selected employee?`,
    choices:roleOptions.map((role) => ({
        name: role.title,
        value: role.id,
      })),
}]


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:', err);
    }else{
        console.log('Connected to employee_db.')
    }
})

function init(){
    inquirer
    .prompt(questions)
    .then((response) =>{
        const {selection} = response;
        switch(selection){
            case 'View all employees': viewAllEmployees();
            break;
            case 'Add employee': addEmployee();
            break;
            case 'Update employee role': updateEmployeeRole();
            break;
            case 'View all roles': viewAllRoles();
            break;
            case 'Add role': addRole();
            break;
            case 'View all departments': viewAllDepartments();
            break;
            case 'Add department': addDepartment();
            break;
            default: console.log('Invalid selection');
            
        }
    })
}

async function viewAllDepartments(){
    try {
       const query = await db.promise().query(`SELECT * FROM department`);
        console.table(query[0])
    } catch (error) {
        console.log(error)
    }
}

async function viewAllEmployees(){
    try {
       const query = await db.promise().query(`SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary AS salary, department.name AS department, IFNULL(CONCAT(mans.first_name, " ", mans.last_name), "No Manager") AS manager
        FROM employee emp
        LEFT JOIN employee mans ON emp.manager_id = mans.id JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id`);
        console.table(query[0])
    } catch (error) {
        console.log(error)
    }
}

async function addEmployee() {
    try {
      const [employeeRows, _] = await db.promise().query(`SELECT * FROM employee`);
      const [roleRows, __] = await db.promise().query(`SELECT * FROM role`);
  
      const roleOptions = roleRows.map((role) => ({
        id: role.id,
        title: role.title,
      }));
  
      const managerOptions = employeeRows.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      }));
  
      var employeeQuestions = addEmplQuestions(roleOptions, managerOptions);
      const response = await inquirer.prompt(employeeQuestions);
      console.log(response);
      await db.promise().query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [response.newFirstName, response.newLastName, response.newRole, response.newManager]
      );
      viewAllEmployees();
    } catch (error) {
      console.error(error);
    }
  }
  

async function updateEmployeeRole(){
    try {
        const [employeeRows,_] = await db.promise().query(`SELECT * FROM employee`);
        const [roleRows,__] = await db.promise().query(`SELECT * FROM role`);

        const employeeOptions = employeeRows.map((employee)=>({
            id:employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
        }));

        const roleOptions = roleRows.map((role)=>({
            id:role.id,
            title:role.title,
        }))
       
        const updateQuestions = updateEmplQuestions(employeeOptions,roleOptions);
        const {updatedEmployeeName, updatedEmployeeRole} = await inquirer.prompt(updateQuestions);

        const selectedEmployee = employeeOptions.find((employee) => `${employee.first_name} ${employee.last_name}` === updatedEmployeeName);

        await db.promise().query(`UPDATE employee SET role_id=? WHERE id=?`,[updatedEmployeeRole, selectedEmployee.id]);
        console.log('Employee role updated successfully!');
        viewAllEmployees();
    } catch (error) {
        console.log(error)
    }
}

async function addRole(){
    try {
        const [departmentRows, _] = await db.promise().query("Select * FROM department")
        var roleQuestions = addRoleQuestions(departmentRows)
        const answers = await inquirer.prompt(roleQuestions)
        console.log(answers)
        await db.promise().query(`INSERT INTO role(title,salary,department_id) VALUES(?,?,?)`,[answers.roleName,answers.salaryAmount,answers.newRoleDept])
        viewAllRoles()
    } catch (error) {
        console.log(error)
    }
};

async function addDepartment(){
    try {
        const response = await inquirer.prompt(addDeptQuestions)
        await db.query(`INSERT INTO department(name) VALUES(?)`, [response.deptName]);
        console.log('Department added successfully!')
        console.table(response);
        viewAllDepartments()
    } catch (error) {
        console.error(error)
    }

    }

async function viewAllRoles(){
    try {
         const query = await db.promise().query(`SELECT role.id, title, name AS department, salary FROM role JOIN department ON role.department_id = department.id`);
         console.table(query)
    } catch (error) {
        console.error(error)
    }
};

init()