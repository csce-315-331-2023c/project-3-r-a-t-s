import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Employee.css';
import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Dispatch, SetStateAction} from 'react';

interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

interface AdminProps {
    isAdmin: string;
    setIsAdmin: React.Dispatch<React.SetStateAction<string>>;
  }

interface EmployeeProps {
    adminProps: AdminProps;
}
  
const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="EmployeeDeletePopup">
                <div>{message}</div>
                <div className="ConfirmEmployee-btn">
                    <button className="delete" onClick={onConfirm}>Delete</button>
                </div>
                <div className="ConfirmEmployee-btn">
                    <button className="cancel" onClick={onCancel}>Cancel</button>
                </div>
        </div>
    );
};

const EmployeeComponent: React.FC<EmployeeProps> = ({ adminProps }) => {
    console.log("Employe Admin State (Employee.tsx) : ", adminProps.isAdmin);

    useEffect(() => {
        generate_employee_info();
    }, []);

    const [query, setQuery] = useState(''); 

    interface EmployeeData {
        employee_id: number;
        first_name: string;
        last_name: string;
        salary: string;
        hours_per_week: string;
        manager_id: string;
        username: string;
        password: string;
    }
    
    interface AddEmployee {
        FirstName: string;
        LastName: string;
        Salary: string;
        Hours: string;
        ManagerID: string;
        Username: string;
        Password: string;
    }
    interface EditEmployee {
        FirstName: string;
        LastName: string;
        Salary: string;
        Hours: string;
        ManagerID: string;
        Password: string;
    }

    const [employeeList, setEmployeeList] = useState<EmployeeData[]>([]);
    const [availableManagerIds, setAvailableManagerIds] = useState([]);
    const [newEmployee, setNewEmployee] = useState<AddEmployee>({FirstName: '', LastName: '', Salary: '', Hours: '', ManagerID: '', Username: '', Password: '',});
    const [showInputFields, setShowInputFields] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({FirstName: '', LastName: '', Salary: '', Hours: '', ManagerID: '', Password: '',});
    const [errorManagerID, setErrorManagerID] = useState<string>('');

    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof AddEmployee) => {
        const { value } = e.target;
        setNewEmployee((prevNewEmployee) => ({ ...prevNewEmployee, [fieldName]: value }));
    };

    const [employeeToDeleteId, setEmployeeToDeleteId] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false);

    const handleDeleteClick = (employeeId: number) => {
        setEmployeeToDeleteId(employeeId);
        setShowPopup(true);
    };

    const handleCancelDelete = () => {
        setEmployeeToDeleteId(0);
        setShowPopup(false);
    };

    const handleDeleteEmployee = async () => {
        if (employeeToDeleteId !== 0) {
            const employeeId = employeeToDeleteId;
            try {
                await remove_employee(employeeId);
                // Update the employee list to reflect the deletion
                setEmployeeList((prevEmployeeList) =>
                    prevEmployeeList.filter((employee) => employee.employee_id !== employeeId)
                );
                console.log(`Employee with ID ${employeeId} deleted`);
            } catch (error) {
                console.error(`Error deleting employee with ID ${employeeId}:`, error);
            }
            setEmployeeToDeleteId(0);
            setShowPopup(false);
        }
    };

    // Function to Generate Employees' Information
    const generate_employee_info = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios 
        //.post('http://127.0.0.1:5000/api/manager/get_employee_list',config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/get_employee_list`, config)
        .then((response) => {
            setEmployeeList(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error with Generating Employee Information:', error);
        })
    };  

    //Function To Add Employee
    const add_employee = async () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios
        // .post('http://127.0.0.1:5000/api/manager/add_employee', newEmployee, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/add_employee`, newEmployee, config)
        .then((response) => {
            console.log(response.data.message); 
            // Check for available_manager_ids in the response
            const ids = response.data.available_manager_ids;
            if (ids) {
                setAvailableManagerIds(ids);
                setErrorManagerID('Unavailable Manager ID! Please Choose From Available IDs: ' + ids.join(', '));
            }
            else {
                setAvailableManagerIds([]);
                setErrorManagerID('');                
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
        // .post('http://127.0.0.1:5000/api/manager/remove_employee', employeeId, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_employee`, employeeId, config)
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
        // .post('http://127.0.0.1:5000/api/manager/update_employee', requestData, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/update_employee`, requestData, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Updating Employee Information:', error);
        });
    };

    const handleSubmitNewEmployee = async (newEmployee: AddEmployee) => {
        try {
            await add_employee();

            if (availableManagerIds.length === 0) {
                await generate_employee_info();
                console.log("Submit List", employeeList);

                setNewEmployee({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                ManagerID: '',
                Username: '',
                Password: '',
                });

                setShowInputFields(false);
            }
        } catch (error) {
            console.error('Error with Adding Employee:', error);
        }
    };

    // Function to add a new row for employee
    const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowInputFields(true);
    };
    // Function to delete the new row for new employee
    const handleCancelRow = () => {
        setShowInputFields(false);
    };
    
    const handleEdit = (employeeId: number) => {
        setEditingEmployeeId(employeeId);
        const employeeToEdit = employeeList.find((employee) => employee.employee_id === employeeId);
        if (employeeToEdit) {
          setEditedData({
            FirstName: employeeToEdit.first_name,
            LastName: employeeToEdit.last_name,
            Salary: employeeToEdit.salary,
            Hours: employeeToEdit.hours_per_week,
            ManagerID: employeeToEdit.manager_id,
            Password: employeeToEdit.password,
          });
        }
    };
    const handleSaveEdit = async (employeeId: number, editedData : EditEmployee) => {
        try {
            await update_employee(employeeId);
            await generate_employee_info();
            setEditedData({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                ManagerID: '',
                Password: '',
            });
            setEditingEmployeeId(null);
        } catch (error) {
            console.error('Error with Updating Employee:', error);
        }
    };

    const handleCancelEdit = async (employeeId: number) => {
        try {
            await generate_employee_info();
        
            setEditedData({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                ManagerID: '',
                Password: '',
            });
            setEditingEmployeeId(null);
        } catch (error) {
            console.error('Error with Canceling Edit Employee:', error);
        }
    };

    return (
        <div> 
            <div className='Search-Container'>
                <form> <input className="searchForm"  type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
                    placeholder='Search by Employee Last Name...'/> 
                </form>
            </div> 

            <div className="add-container">
                {(adminProps.isAdmin === 'Yes') && 
                    <span>
                        <button className="btn btn-success" style={{marginTop: "-1vh"}} onClick={handleAddRow}>
                            <IoPersonAddSharp className="add-icon" />
                            Add Employee
                        </button>
                    </span>
                }
            </div> <br/> <br/>

            <div style={{overflow: "scroll", height: "50vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
                {!!employeeList.length && (
                    <table className='table table-striped w-100'>
                        <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Salary</th>
                            <th>Hours Per Week</th>
                            <th>Manager ID</th>
                            <th>UserID</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList.filter((item) => { 
                            return query.toLowerCase() === '' ? item: item.last_name.toLowerCase().includes(query.toLowerCase())
                        }).map((employee: EmployeeData) => (
                        <tr key={employee.employee_id}>
                        <td>{employee.employee_id}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.LastName} onChange={(e) => setEditedData({ ...editedData, LastName: e.target.value })} required className='input-forms'/> : employee.last_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.FirstName} onChange={(e) => setEditedData({ ...editedData, FirstName: e.target.value })} required className='input-forms'/> : employee.first_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Salary} onChange={(e) => setEditedData({ ...editedData, Salary: e.target.value })} required className='input-forms'/> : employee.salary}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Hours} onChange={(e) => setEditedData({ ...editedData, Hours: e.target.value })} required className='input-forms'/> : employee.hours_per_week}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.ManagerID} onChange={(e) => setEditedData({ ...editedData, ManagerID: e.target.value })} required className='input-forms'/> : employee.manager_id}</td>
                        <td>{employee.username}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Password} onChange={(e) => setEditedData({ ...editedData, Password: e.target.value })} required className='input-forms'/> : '*'.repeat(employee.password.length + 2)}</td>
                        <td style={{width: "10vw"}}>
                                {editingEmployeeId === employee.employee_id ? (
                                    <span>
                                        <MdCancel className="cancel-icon" onClick={() => handleCancelEdit(employee.employee_id)}/>
                                        <FiSave className="save-icon" onClick={() => handleSaveEdit(employee.employee_id, editedData)} />
                                    </span>
                                ) : (
                                    <span>
                                        {(adminProps.isAdmin === 'Yes') && 
                                        <BsFillTrashFill className="delete-btn"
                                            onClick={() => handleDeleteClick(employee.employee_id)}
                                        />
                                        }
                                        <BsFillPencilFill className="edit-btn"
                                            onClick={() => handleEdit(employee.employee_id)}
                                        />
                                    </span>
                                )}
                        </td>
                        </tr>
                        ))}
                        {showPopup && (
                            <Popup
                            message="Delete Employee?"
                            onConfirm={handleDeleteEmployee}
                            onCancel={handleCancelDelete}
                            />
                        )}
                        {showInputFields && (
                            <tr>
                                <td>{employeeList.length > 0 ? employeeList[employeeList.length - 1].employee_id + 1 : 1}</td>
                                <td>
                                    <input
                                        type="text" name="LastName" value={newEmployee.LastName} placeholder="Last Name" onChange={(e) => handleAddInputChange(e, 'LastName')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="FirstName" value={newEmployee.FirstName} placeholder="First Name" onChange={(e) => handleAddInputChange(e, 'FirstName')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="Salary" value={newEmployee.Salary} placeholder="Salary" onChange={(e) => handleAddInputChange(e, 'Salary')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="Hours" value={newEmployee.Hours} placeholder="Hours Per Week" onChange={(e) => handleAddInputChange(e, 'Hours')} required className='input-forms'/>
                                </td>
                                <td>
                                    <div className='MangerID-Container'>
                                        <input type="text" name="ManagerID" value={newEmployee.ManagerID} placeholder="Manager ID" onChange={(e) => handleAddInputChange(e, 'ManagerID')} required className='input-forms'/>
                                        {errorManagerID && <span className='Error-MangerID'>{errorManagerID}</span>}
                                    </div>
                                </td>
                                <td>
                                    {/* <input type="text" name="UserName" value={newEmployee.Username} placeholder="UserName (4 Digit)" onChange={(e) => handleAddInputChange(e, 'Username')} required /> */}
                                </td>
                                <td>
                                    <input type="text" name="text" value={newEmployee.Password} placeholder="Password (4 Digit)" onChange={(e) => handleAddInputChange(e, 'Password')} required className='input-forms'/>
                                </td>
                                
                                <td>
                                    <span className="submit-container">
                                        <FaRegCheckCircle className="submit-icon" onClick={() => handleSubmitNewEmployee(newEmployee)} />
                                        <MdCancel className="cancel-icon" onClick={() => handleCancelRow()} />
                                    </span>
                                </td>
                            </tr>
                            )}
                        </tbody>

                        {/* {(adminProps.isAdmin === 'Yes') && 
                            <div className="add-container">
                                <span>
                                    <button className="add-row-btn" onClick={handleAddRow}>
                                        <IoPersonAddSharp className="add-icon" />
                                        Add Employee
                                    </button>
                                </span>
                            </div>
                        }
                            */}
                    </table>                        
                )}
            </div>
        </div>
    );
};
export default EmployeeComponent;
