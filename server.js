const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const questions = [{
    type: 'list',
    name: 'selection',
    message: 'What would you like to do?',
    choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments','Add department']
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

function viewAllEmployees(){
    const query = `SELECT role.id, first_name, last_name, title, name AS department, salary, manager_id
    FROM employee
    JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id`;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function addEmployee(){
    const query = ``;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function updateEmployeeRole(){
    const query = ``;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function addRole(){
    const query = ``;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function viewAllDepartments(){
    const query = `SELECT *
    FROM department`;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function addDepartment(){
    const query = ``;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

function viewAllRoles(){
    const query = `SELECT role.id, title, name AS department, salary
    FROM role
    JOIN department ON role.department_id = department.id`;

    db.query(query,(err,employees)=>{
        if(err){
            console.log(err)
        }else{
            console.table(employees)
        };
    });
};

init()