import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './OrderHistory.css';
import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { FcPlus } from "react-icons/fc";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        salary: string;
        hours_per_week: string;
        manager_id: string;
    }
    
    interface AddEmployee {
        LastName: string;
        FirstName: string;
        Salary: string;
        Hours: string;
        ManagerID: string;
    }

    const [employeeList, setEmployeeList] = useState<EmployeeData[]>([]);
    const [availableManagerIds, setAvailableManagerIds] = useState([]);
    const [newEmployee, setNewEmployee] = useState<AddEmployee>({LastName: '', FirstName: '', Salary: '', Hours: '', ManagerID: '',});
    const [showInputFields, setShowInputFields] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({LastName: '', FirstName: '', Salary: '', Hours: '', ManagerID: '',});

    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof AddEmployee) => {
        const { value } = e.target;
        setNewEmployee((prevNewEmployee) => ({ ...prevNewEmployee, [fieldName]: value }));
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            // Assuming remove_employee is asynchronous and handles individual deletions
            await remove_employee(employeeId);
            // Update the employee list to reflect the deletion
            setEmployeeList((prevEmployeeList) =>
                prevEmployeeList.filter((employee) => employee.employee_id !== employeeId)
            );
            console.log(`Employee with ID ${employeeId} deleted`);
        } catch (error) {
            console.error(`Error deleting employee with ID ${employeeId}:`, error);
        }
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
        .post('http://127.0.0.1:5000/api/manager/get_employee_list',config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/get_employee_list`, config)
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
        .post('http://127.0.0.1:5000/api/manager/add_employee', newEmployee, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/add_employee`, inputEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
            // Check for available_manager_ids in the response
            const ids = response.data.available_manager_ids;
            if (ids) {
                console.log('Available Manager IDs:', ids);
                setAvailableManagerIds(ids);
            }
        })
        .catch((error) => {
            console.error('Error with Adding Employee:', error);
        });
    };

    //Function to Remove Employee
    const remove_employee = async (employeeId : number) => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        .post('http://127.0.0.1:5000/api/manager/remove_employee', employeeId, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_employee`, removeEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Removing Employee:', error);
        });
    };
    //Function to Remove Employee
    const update_employee = async (employeeId : number) => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const requestData = {
            ...editedData,
            employee_id: employeeId,
        };
        //Send Post rquest to Flask API
        await axios
        .post('http://127.0.0.1:5000/api/manager/update_employee', requestData, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/update_employee`, requestData, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Updating Employee Information:', error);
        });
    };

    const handleSubmitNewEmployee = async (newEmployee: AddEmployee) => {
        const inputEmployee = {
            LastName: newEmployee.LastName,
            FirstName: newEmployee.FirstName,
            Salary: newEmployee.Salary,
            Hours: newEmployee.Hours,
            ManagerID: newEmployee.ManagerID,
        };

        try {
            await add_employee();
            
            setEmployeeList((prevEmployeeList) => [
                ...prevEmployeeList,
                {
                employee_id: prevEmployeeList.length > 0 ? prevEmployeeList[prevEmployeeList.length - 1].employee_id + 1 : 1,
                last_name: newEmployee.LastName,
                first_name: newEmployee.FirstName,
                salary: newEmployee.Salary,
                hours_per_week: newEmployee.Hours,
                manager_id: newEmployee.ManagerID,
                },
            ] as EmployeeData[] );
            setNewEmployee({
            LastName: '',
            FirstName: '',
            Salary: '',
            Hours: '',
            ManagerID: '',
            });
            setShowInputFields(false);

        } catch (error) {
            console.error('Error with Adding Employee:', error);
        }
    };

    // Function to add a new row for employee
    const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowInputFields(true);
    };

    const handleEdit = (employeeId: number) => {
        setEditingEmployeeId(employeeId);
        const employeeToEdit = employeeList.find((employee) => employee.employee_id === employeeId);
        if (employeeToEdit) {
          setEditedData({
            LastName: employeeToEdit.last_name,
            FirstName: employeeToEdit.first_name,
            Salary: employeeToEdit.salary,
            Hours: employeeToEdit.hours_per_week,
            ManagerID: employeeToEdit.manager_id,
          });
        }
    };
    const handleSaveEdit = async (employeeId: number, editedData : AddEmployee) => {

        try {
            await update_employee(employeeId);
     
            await generate_employee_info();
            
            setEditedData({
            LastName: '',
            FirstName: '',
            Salary: '',
            Hours: '',
            ManagerID: '',
            });
            setEditingEmployeeId(null);
        } catch (error) {
            console.error('Error with Updating Employee:', error);
        }
    };
    
    return (
        <div> 
            <form> <input style={{width: "370px"}} type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
            placeholder='Search by Employee Last Name...'/> </form>

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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList.filter((item) => { 
                            return query.toLowerCase() === '' ? item: item.last_name.toLowerCase().includes(query.toLowerCase())
                        }).map((employee: EmployeeData) => (
                        <tr key={employee.employee_id}>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.LastName} onChange={(e) => setEditedData({ ...editedData, LastName: e.target.value })} /> : employee.last_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.FirstName} onChange={(e) => setEditedData({ ...editedData, FirstName: e.target.value })} /> : employee.first_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Salary} onChange={(e) => setEditedData({ ...editedData, Salary: e.target.value })} /> : employee.salary}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Hours} onChange={(e) => setEditedData({ ...editedData, Hours: e.target.value })} /> : employee.hours_per_week}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.ManagerID} onChange={(e) => setEditedData({ ...editedData, ManagerID: e.target.value })} /> : employee.manager_id}</td>
                        <td>
                            <span>
                                <BsFillTrashFill className="delete-btn"
                                    onClick={() => handleDeleteEmployee(employee.employee_id)}
                                />
                                <BsFillPencilFill className="edit-btn"
                                    onClick={() => handleEdit(employee.employee_id)}
                                />
                                {editingEmployeeId === employee.employee_id && (
                                    <button onClick={() => handleSaveEdit(employee.employee_id, editedData)}>Save</button>
                                )}
                            </span>
                        </td>
                        </tr>
                        ))}
                        {showInputFields && (
                            <tr>
                                <td>{employeeList.length > 0 ? employeeList[employeeList.length - 1].employee_id + 1 : 1}</td>
                                <td>
                                    <input
                                        type="text" name="LastName" value={newEmployee.LastName} placeholder="Last Name" onChange={(e) => handleAddInputChange(e, 'LastName')} required />
                                </td>
                                <td>
                                    <input type="text" name="FirstName" value={newEmployee.FirstName} placeholder="First Name" onChange={(e) => handleAddInputChange(e, 'FirstName')} required />
                                </td>
                                <td>
                                    <input type="text" name="Salary" value={newEmployee.Salary} placeholder="Salary" onChange={(e) => handleAddInputChange(e, 'Salary')} required />
                                </td>
                                <td>
                                    <input type="text" name="Hours" value={newEmployee.Hours} placeholder="Hours Per Week" onChange={(e) => handleAddInputChange(e, 'Hours')} required />
                                </td>
                                <td>
                                    <input type="text" name="ManagerID" value={newEmployee.ManagerID} placeholder="Manager ID" onChange={(e) => handleAddInputChange(e, 'ManagerID')} required />
                                </td>
                                
                                <td>
                                    <span>
                                        <button className="submit-btn" onClick={() => handleSubmitNewEmployee(newEmployee)}>
                                        Submit
                                        </button>
                                    </span>
                                </td>
                            </tr>
                            )}
                            <td>
                                <span className="icon-container">
                                    <button className="add-row-btn" onClick={handleAddRow}>
                                        <FcPlus className="add-icon" />
                                        Add Employe
                                    </button>
                                </span>
                            </td>
                        </tbody>
                    </table>
                    </div>
            )}
        </div>
    );
};
export default EmployeeComponent;
