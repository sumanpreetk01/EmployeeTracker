const questions = [{
    type: 'list',
    name: 'selection',
    message: 'What would you like to do?',
    choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments','Add department']
}]

const addDeptQuestions = [{
    type:'input',
    name:'deptName',
    message:'What is the name of the department?'
}]

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

module.exports = {questions,addDeptQuestions,addRoleQuestions,addEmplQuestions,updateEmplQuestions}

