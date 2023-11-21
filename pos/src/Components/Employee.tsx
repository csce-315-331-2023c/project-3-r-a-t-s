import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Employee.css';
import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const Popup: React.FC<PopupProps> = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="EmployeeDeletePopup">
          <p>{message}</p>
          <button className="ConfirmEmployeeDelete-btn" onClick={onConfirm}>Delete</button>
          <button className="CancelmployeeDelete-btn" onClick={onCancel}>Cancel</button>
      </div>
    );
  };

const EmployeeComponent: React.FC = () => {

    useEffect(() => {
        generate_employee_info();
    }, []);

    const [query, setQuery] = useState(''); 

    const [isLoading, setIsLoading] = useState(false);

    interface EmployeeData {
        employee_id: number;
        first_name: string;
        last_name: string;
        salary: string;
        hours_per_week: string;
        manager_id: string;
    }
    
    interface AddEmployee {
        FirstName: string;
        LastName: string;
        Salary: string;
        Hours: string;
        ManagerID: string;
    }

    const [employeeList, setEmployeeList] = useState<EmployeeData[]>([]);
    const [availableManagerIds, setAvailableManagerIds] = useState([]);
    const [newEmployee, setNewEmployee] = useState<AddEmployee>({FirstName: '', LastName: '', Salary: '', Hours: '', ManagerID: '',});
    const [showInputFields, setShowInputFields] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({FirstName: '', LastName: '', Salary: '', Hours: '', ManagerID: '',});
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
        if (employeeToDeleteId != 0) {
            const employeeId = employeeToDeleteId;
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
            setEmployeeToDeleteId(0);
            setShowPopup(false);
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
        axios
        .post('http://127.0.0.1:5000/api/manager/add_employee', newEmployee, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/add_employee`, inputEmployee, config)
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
            FirstName: newEmployee.FirstName,
            LastName: newEmployee.LastName,
            Salary: newEmployee.Salary,
            Hours: newEmployee.Hours,
            ManagerID: newEmployee.ManagerID,
        };

        try {
            await add_employee();

            if (availableManagerIds.length == 0) {
                setEmployeeList((prevEmployeeList) => [
                    ...prevEmployeeList,
                    {
                    employee_id: prevEmployeeList.length > 0 ? prevEmployeeList[prevEmployeeList.length - 1].employee_id + 1 : 1,
                    first_name: newEmployee.FirstName,
                    last_name: newEmployee.LastName,
                    salary: newEmployee.Salary,
                    hours_per_week: newEmployee.Hours,
                    manager_id: newEmployee.ManagerID,
                    },
                ] as EmployeeData[] );
                setNewEmployee({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                ManagerID: '',
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
          });
        }
    };
    const handleSaveEdit = async (employeeId: number, editedData : AddEmployee) => {

        try {
            await update_employee(employeeId);
     
            await generate_employee_info();
            
            setEditedData({
            FirstName: '',
            LastName: '',
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
            <div className='Search-Container'>
                    Search: <form> <input className="searchForm" style={{width: "370px"}} type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
                                placeholder='Employee Last Name...'/> 
                            </form>
            </div>

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
                        <td>{employee.employee_id}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.LastName} onChange={(e) => setEditedData({ ...editedData, LastName: e.target.value })} required/> : employee.last_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.FirstName} onChange={(e) => setEditedData({ ...editedData, FirstName: e.target.value })} required/> : employee.first_name}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Salary} onChange={(e) => setEditedData({ ...editedData, Salary: e.target.value })} required/> : employee.salary}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.Hours} onChange={(e) => setEditedData({ ...editedData, Hours: e.target.value })} required/> : employee.hours_per_week}</td>
                        <td>{editingEmployeeId === employee.employee_id ? <input type="text" value={editedData.ManagerID} onChange={(e) => setEditedData({ ...editedData, ManagerID: e.target.value })} required/> : employee.manager_id}</td>
                        <td>
                            <span>
                                <BsFillTrashFill className="delete-btn"
                                    onClick={() => handleDeleteClick(employee.employee_id)}
                                />
                                <BsFillPencilFill className="edit-btn"
                                    onClick={() => handleEdit(employee.employee_id)}
                                />
                                {editingEmployeeId === employee.employee_id && (
                                    <FiSave className="save-icon" onClick={() => handleSaveEdit(employee.employee_id, editedData)} />
                                )}
                            </span>
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
                                    <div className='MangerID-Container'>
                                        <input type="text" name="ManagerID" value={newEmployee.ManagerID} placeholder="Manager ID" onChange={(e) => handleAddInputChange(e, 'ManagerID')} required />
                                        {errorManagerID && <span className='Error-MangerID'>{errorManagerID}</span>}
                                    </div>
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
                        <div className="add-container">
                            <span>
                                <button className="add-row-btn" onClick={handleAddRow}>
                                    <IoPersonAddSharp className="add-icon" />
                                    Add Employee
                                </button>
                            </span>
                        </div>
                        
                    </table>
                    </div>
            )}
        </div>
    );
};
export default EmployeeComponent;
