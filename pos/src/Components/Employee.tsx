import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './OrderHistory.css';

const EmployeeComponent: React.FC = () => {

    useEffect(() => {
        generate_employee_info();
    }, []);

    const [query, setQuery] = useState(''); 


    const [isLoading, setIsLoading] = useState(false);

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

    //Logs The Employee Input 
    const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("InputEmployee", inputEmployee)
        add_employee()
        setShowAddForm(false)
    };
    const handleRemoveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("RemoveEmployee", removeEmployee)
        remove_employee()
        setShowRemoveForm(false)
    };

    // Function to Generate Employees' Information
    const generate_employee_info = async () => {
        setIsLoading(true);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        // .post('http://127.0.0.1:5000/api/manager/get_employee_list',config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/get_employee_list`, config)
        .then((response) => {
            setEmployeeList(response.data);
            // console.log(response.data); 
            console.log("Successfully generated Employee data");
        })
        .catch((error) => {
            console.error('Error with Generating Employee Information:', error);
        });
        setIsLoading(false);    
    };  

    //Function To Add Employee
    const add_employee = async () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        //.post('http://127.0.0.1:5000/api/manager/add_employee', inputEmployee, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/add_employee`, inputEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
            generate_employee_info();
        })
        .catch((error) => {
            console.error('Error with Adding Employee:', error);
        });
    };

    //Function to Remove Employee
    const remove_employee = async () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        //.post('http://127.0.0.1:5000/api/manager/remove_employee', removeEmployee, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_employee`, removeEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
            generate_employee_info();

        })
        .catch((error) => {
            console.error('Error with Removing Employee:', error);
        });
    };
    
    return (
        <div> 
            <br />
            <div>   
                <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-success">Add Employee</button>
                <button onClick={() => setShowRemoveForm(!showRemoveForm)} className="btn btn-danger">Remove Employee</button>  
            </div>

            <br />
            <form> <input style={{width: "370px"}} type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
            placeholder='Search by Employee Last Name...'/> </form>

            {showAddForm && (
                <div>   
                    <br /> 
                    <h5>Add New Employee</h5>
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
                        <br />
                        <button type="submit" className="btn btn-secondary">Add Employee</button>
                    </form>
                </div> 
            )}

            {showRemoveForm && (
                <div>
                    <br />
                    <h5>Remove Employee</h5>
                    <form onSubmit={handleRemoveSubmit}>
                        {removeEmployee.map((removeEmployeeInfo, i) => (
                        <div key={i}>    
                            <input name="EmployeeID" placeholder="Employee ID" value={removeEmployeeInfo.EmployeeID} onChange={(e) => handleRemoveInput(e,i)} required/>
                        </div>
                        ))}
                        <br />
                        <button type="submit" className="btn btn-secondary">Remove Employee</button>
                    </form>
                </div>     
            )}
            <br /> {isLoading ? "Loading...": ""}
            {!!employeeList.length && (
                    <div className="order-table-section">
                    <table className='table table-striped w-100'>
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
                        {employeeList.filter((item) => { 
                            return query.toLowerCase() === '' ? item: item.last_name.toLowerCase().includes(query.toLowerCase())
                        }).map((employee: EmployeeData) => (
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
                    </div>
            )}
        </div>
    );
};
export default EmployeeComponent;
