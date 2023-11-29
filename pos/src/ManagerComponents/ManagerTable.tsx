import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Employee.css';
import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FiSave } from "react-icons/fi";

interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
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

const ManagerTableComponent: React.FC = () => {
    const [query, setQuery] = useState(''); 

    useEffect(() => {
        generate_manager_info();
    }, []);

    interface ManagerData {
        manager_id: number;
        last_name: string;
        first_name: string;
        salary: string;
        hours_per_week: string;
        email: string;
        admin: string;
    }

    interface AddManager {
        last_name: string;
        first_name: string;
        salary: string;
        hours_per_week: string;
        email: string;
        admin: string;
    }

    interface EditManager {
        last_name: string;
        first_name: string;
        salary: string;
        hours_per_week: string;
        email: string;
        admin: string;
    }

    const [managerList, setManagerList] = useState<ManagerData[]>([]);
    
    const [availableManagerIds, setAvailableManagerIds] = useState([]);
    const [newManager, setNewManager] = useState<AddManager>({last_name: '', first_name: '', salary: '', hours_per_week: '', email: '', admin: ''});
    const [showInputFields, setShowInputFields] = useState(false);
    const [editingManagerId, setEditingManagerId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({last_name: '', first_name: '', salary: '', hours_per_week: '', email: '', admin: ''});
    const [errorManagerID, setErrorManagerID] = useState<string>('');


    const generate_manager_info = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios 
        .post('http://127.0.0.1:5000/api/manager/get_manager_list',config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/get_manager_list`, config)
        .then((response) => {
            setManagerList(response.data);
            // console.log(response.data);
            console.log("Successfully generated Manager Information");
        })
        .catch((error) => {
            console.error('Error with Generating Manager Information:', error);
        })
    }

    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof AddManager) => {
        const { value } = e.target;
        setNewManager((prevNewManager) => ({ ...prevNewManager, [fieldName]: value }));
    };

    const [ManagerToDeleteId, setManagerToDeleteId] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false);

    
    const handleDeleteClick = (id: number) => {
        setManagerToDeleteId(id);
        setShowPopup(true);
    };


    const handleCancelDelete = () => {
        setManagerToDeleteId(0);
        setShowPopup(false);
    };

    const handleDeleteManager = async () => {
        if (ManagerToDeleteId != 0) {
            const managerID = ManagerToDeleteId;
            try {
                await remove_manager(managerID);
                setManagerList((prevMaanagerList) =>
                    prevMaanagerList.filter((manager) => manager.manager_id !== managerID)
                );
                console.log(`Manager with ID ${managerID} deleted`);
            } catch (error) {
                console.error(`Error deleting Manager with ID ${managerID}:`, error);
            }
            setManagerToDeleteId(0);
            setShowPopup(false);
        }
    };

    //Function To Add Manager
    const add_manager = async () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios
        .post('http://127.0.0.1:5000/api/manager/add_manager', newManager, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/add_manager`, newManager, config)
        .then((response) => {
            console.log(response.data.message); 
            // Check for available_manager_ids in the response
        })
        .catch((error) => {
            console.error('Error with Adding Manager:', error);
        });
    };

    //Function to Remove Manager
    const remove_manager = async (managerID : number) => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        .post('http://127.0.0.1:5000/api/manager/remove_manager', managerID, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_manager`, managerID, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Removing Manager:', error);
        });
    };

    const update_manager = async (managerID : number) => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const requestData = {
            ...editedData,
            manager_id: managerID,
        };
        //Send Post rquest to Flask API
        await axios
        .post('http://127.0.0.1:5000/api/manager/update_manager', requestData, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager/update_manager`, requestData, config)
        .then((response) => {
            console.log(response.data.message); 
        })
        .catch((error) => {
            console.error('Error with Updating Manager Information:', error);
        });
    };

    const handleSubmitNewManager = async (newManager: AddManager) => {
        try {
            await add_manager();

            if (availableManagerIds.length == 0) {
                await generate_manager_info();
                console.log("Submit List", managerList);

                setNewManager({
                first_name: '',
                last_name: '',
                salary: '',
                hours_per_week: '',
                email: '',
                admin: '',
                });

                setShowInputFields(false);
            }
        } catch (error) {
            console.error('Error with Adding Manager:', error);
        }
    };

    // Function to add a new row for Manager
    const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowInputFields(true);
    };
    // Function to delete the new row for new Manager
    const handleCancelRow = () => {
        setShowInputFields(false);
    };
    

    const handleEdit = (managerID: number) => {
        setEditingManagerId(managerID);
        const managerToEdit = managerList.find((manager) => manager.manager_id === managerID);
        if (managerToEdit) {
          setEditedData({
            first_name: managerToEdit.first_name,
            last_name: managerToEdit.last_name,
            salary: managerToEdit.salary,
            hours_per_week: managerToEdit.hours_per_week,
            email: managerToEdit.email,
            admin: managerToEdit.admin,
          });
        }
    };
    const handleSaveEdit = async (managerID: number, editedData : EditManager) => {

        try {
            await update_manager(managerID);
     
            await generate_manager_info();
            
            setEditedData({
            first_name: '',
            last_name: '',
            salary: '',
            hours_per_week: '',
            email: '',
            admin: '',
            });
            setEditingManagerId(null);
        } catch (error) {
            console.error('Error with Updating Manager:', error);
        }
    };



    return (
        <div>
            <div> 
            <div className='Search-Container'>
                    Search: <form> <input className="searchForm" style={{width: "370px"}} type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
                                placeholder='Manager Last Name...'/> 
                            </form>
            </div>
            <div style={{height: "fit-content"}}>
            {!!managerList.length && (
                    <div className="order-table-section">
                    <table className='table table-striped w-100'>
                        <thead>
                        <tr>
                            <th>Manager ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Salary</th>
                            <th>Hours Per Week</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {managerList.filter((item) => { 
                            return query.toLowerCase() === '' ? item: item.last_name.toLowerCase().includes(query.toLowerCase())
                        }).map((manager: ManagerData) => (
                        <tr key={manager.manager_id}>
                        <td>{manager.manager_id}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.last_name} onChange={(e) => setEditedData({ ...editedData, last_name: e.target.value })} required/> : manager.last_name}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.first_name} onChange={(e) => setEditedData({ ...editedData, first_name: e.target.value })} required/> : manager.first_name}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.salary} onChange={(e) => setEditedData({ ...editedData, salary: e.target.value })} required/> : manager.salary}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.hours_per_week} onChange={(e) => setEditedData({ ...editedData, hours_per_week: e.target.value })} required/> : manager.hours_per_week}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} required/> : manager.email}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.admin} onChange={(e) => setEditedData({ ...editedData, admin: e.target.value })} required/> : manager.admin}</td>
                        <td>
                            <span>
                                <BsFillTrashFill className="delete-btn"
                                    onClick={() => handleDeleteClick(manager.manager_id)}
                                />
                                <BsFillPencilFill className="edit-btn"
                                    onClick={() => handleEdit(manager.manager_id)}
                                />
                                {editingManagerId === manager.manager_id && (
                                    <FiSave className="save-icon" onClick={() => handleSaveEdit(manager.manager_id, editedData)} />
                                )}
                            </span>
                        </td>
                        </tr>
                        ))}
                       {showPopup && (
                            <Popup
                            message="Delete Manager?"
                            onConfirm={handleDeleteManager}
                            onCancel={handleCancelDelete}
                            />
                        )}
                        {showInputFields && (
                            <tr>
                                <td>{managerList.length > 0 ? managerList[managerList.length - 1].manager_id + 1 : 1}</td>
                                <td>
                                    <input
                                        type="text" name="LastName" value={newManager.last_name} placeholder="Last Name" onChange={(e) => handleAddInputChange(e, 'last_name')} required />
                                </td>
                                <td>
                                    <input type="text" name="FirstName" value={newManager.first_name} placeholder="First Name" onChange={(e) => handleAddInputChange(e, 'first_name')} required />
                                </td>
                                <td>
                                    <input type="text" name="Salary" value={newManager.salary} placeholder="Salary" onChange={(e) => handleAddInputChange(e, 'salary')} required />
                                </td>
                                <td>
                                    <input type="text" name="Hours" value={newManager.hours_per_week} placeholder="Hours Per Week" onChange={(e) => handleAddInputChange(e, 'hours_per_week')} required />
                                </td>
                                <td>
                                    <input type="text" name="text" value={newManager.email} placeholder="Email" onChange={(e) => handleAddInputChange(e, 'email')} required />
                                </td>
                                <td>
                                    <input type="text" name="text" value={newManager.admin} placeholder="Admin" onChange={(e) => handleAddInputChange(e, 'admin')} required />
                                </td>
                                
                                <td>
                                    <span className="submit-container">
                                        <FaRegCheckCircle className="submit-icon" onClick={() => handleSubmitNewManager(newManager)} />
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
                                    Add Manager
                                </button>
                            </span>
                        </div>
                        
                    </table>
                    </div>
            )}
            </div>
        </div>
        </div>

    );
};
export default ManagerTableComponent;
