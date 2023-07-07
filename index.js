const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: '1',
    message: 'What would you like to do?',
    choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments','Add department']
}]

