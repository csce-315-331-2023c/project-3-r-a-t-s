import React, {useRef, useState} from 'react';
import axios from 'axios';
import './OrderHistory.css';

const EmployeeComponent: React.FC = () => {

    interface EmployeeData {
        employee_id: number;
        last_name: string;
        first_name: string;
        salary: number;
        hours_per_week: number;
        manager_id: number;
    }
    
    interface AddEmployee {
        LastName: string;
        FirstName: string;
        Salary: number;
        Hours: number;
        ManagerID: number;
    }
    interface RemoveEmployee {
        EmployeeID: number;
    }

    const [employeeList, setEmployeeList] = useState<EmployeeData[]>([]);
    const [inputEmployee, setEmployeeInput] = useState([ {LastName: '', FirstName: '', Salary: '', Hours: '', ManagerID: ''} ]);
    const [removeEmployee, setEmployeeRemove] =  useState([ {EmployeeID: ''} ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);

    //Logs What Input Field You Are On
    const handleAddInput = (e : React.ChangeEvent<HTMLInputElement>, i: number) => {
        let newForm = [...inputEmployee];
        newForm[i][e.target.name as keyof AddEmployee] = e.target.value;
        setEmployeeInput(newForm);
    };

    const handleRemoveInput = (e:  React.ChangeEvent<HTMLInputElement>, i: number) => {
        let newForm = [...removeEmployee];
        newForm[i][e.target.name as keyof RemoveEmployee] = e.target.value;
        setEmployeeRemove(newForm);
    };

    const handleRefresh = () => {
        generate_employee_info();
    }

    //Logs The Employee Input 
    const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("InputEmployee", inputEmployee)
        add_employee()
        setShowAddForm(false)
    };
    const handleRemoveSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("RemoveEmployee", removeEmployee)
        remove_employee()
        setShowRemoveForm(false)
    };

    // Function to Generate Employees' Information
    const generate_employee_info = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        .post('http://127.0.0.1:5000/api/manager/get_employee_list',config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/get_employee_list`, config)
        .then((response) => {
            setEmployeeList(response.data);
            console.log(response.data); 
        })
        .catch((error) => {
            console.error('Error with Generating Employee Information:', error);
        });
    };  

    //Function To Add Employee
    const add_employee = () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        .post('http://127.0.0.1:5000/api/manager/add_employee', inputEmployee, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/add_employee`, inputEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Adding Employee:', error);
        });
    };

    //Function to Remove Employee
    const remove_employee = () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        .post('http://127.0.0.1:5000/api/manager/remove_employee', removeEmployee, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_employee`, removeEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Removing Employee:', error);
        });
    };
    
    return (
        <div> 
            <div>   
                <button onClick={() => generate_employee_info()}>View Employees</button>
                <button onClick={() => setShowAddForm(true)}>Add Employee</button>
                <button onClick={() => setShowRemoveForm(true)}>Remove Employee</button>  
            </div>

            {showAddForm && (
                <div>
                    <h2>Add New Employee</h2>
                    <form onSubmit={handleAddSubmit}>
                        {inputEmployee.map((inputEmployeeInfo, i) => (
                        <div key={i}>
                            <input name="FirstName" placeholder="First Name" value={inputEmployeeInfo.FirstName} onChange={(e) => handleAddInput(e,i)} required />
                            <input name="LastName" placeholder="Last Name" value={inputEmployeeInfo.LastName} onChange={(e) => handleAddInput(e,i)} required/>
                            <input name="Salary" placeholder="Salary" value={inputEmployeeInfo.Salary} onChange={(e) => handleAddInput(e,i)} required/>
                            <input name="Hours" placeholder="Hours Per Week" value={inputEmployeeInfo.Hours} onChange={(e) => handleAddInput(e,i)} required />
                            <input name="ManagerID" placeholder="Manager ID" value={inputEmployeeInfo.ManagerID} onChange={(e) => handleAddInput(e,i)} required/>
                            {/* <TextField
                                name="ManagerID"
                                label="Manager ID"
                                variant="filled"
                                value={inputEmployeeInfo.ManagerID}
                                onChange = {event => handleChangeInput(index, event)}
                            /> */}
                        </div>
                        ))}
                        <button type="submit">Add Employee</button>
                    </form>
                </div> 
            )}

            {showRemoveForm && (
                <div>
                    <h2>Remove Employee</h2>
                    <form onSubmit={handleRemoveSubmit}>
                        {removeEmployee.map((removeEmployeeInfo, i) => (
                        <div key={i}>    
                            <input name="EmployeeID" placeholder="Employee ID" value={removeEmployeeInfo.EmployeeID} onChange={(e) => handleRemoveInput(e,i)} required/>
                        </div>
                        ))}
                        <button type="submit">Remove Employee</button>
                    </form>
                </div>     
            )}
            
            {!!employeeList.length && (
                    <div className="order-table-section">
                    <table className="order-table">
                        <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Salary</th>
                            <th>Hours Per Week</th>
                            <th>Manager ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList.map((employee: EmployeeData) => (
                        <tr key={employee.employee_id}>
                        <td>{employee.employee_id}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.hours_per_week}</td>
                        <td>{employee.manager_id}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={handleRefresh}>Refresh Employee Table</button> 
                    </div>
            )}
        </div>
    );
};
export default EmployeeComponent;