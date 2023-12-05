import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Employee.css';
import { BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs';
import { MdCancel } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { Dispatch, SetStateAction} from 'react';

/**
 * Props for the Popup component.
 * @interface
 * @property {string} message - The message to be displayed in the popup.
 * @property {() => void} onConfirm - Function to be called on confirm button click.
 * @property {() => void} onCancel - Function to be called on cancel button click.
 */
interface PopupProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Props for the Admin component.
 * @interface
 * @property {string} isAdmin - The admin status.
 * @property {React.Dispatch<React.SetStateAction<string>>} setIsAdmin - Function to set the admin status.
 */
interface AdminProps {
    isAdmin: string;
    setIsAdmin: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Props for the Manager component.
 * @interface
 * @property {AdminProps} adminProps - The admin props.
 */
interface ManagerProps {
    adminProps: AdminProps;
}

/**
 * Popup component for confirming actions.
 * @param {PopupProps} props - The props for the Popup component.
 * @returns {JSX.Element} The rendered Popup component.
 */
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

/**
 * ManagerTableComponent for displaying and managing manager information.
 * @param {ManagerProps} props - The props for the ManagerTableComponent.
 * @returns {JSX.Element} The rendered ManagerTableComponent.
 */
const ManagerTableComponent: React.FC<ManagerProps> = ({adminProps}) => {
    const [query, setQuery] = useState(''); 

    useEffect(() => {
        generate_manager_info();
    }, []);

    // useEffect to load employee data from local storage on component mount
    useEffect(() => {
        const storedManagerList = localStorage.getItem('managerList');
        if (storedManagerList) {
        setManagerList(JSON.parse(storedManagerList));
        }
    }, []);

    /**
     * Data structure for Manager.
     * @interface
     * @property {number} manager_id - The manager's ID.
     * @property {string} last_name - The manager's last name.
     * @property {string} first_name - The manager's first name.
     * @property {string} salary - The manager's salary.
     * @property {string} hours_per_week - The manager's hours per week.
     * @property {string} email - The manager's email.
     * @property {string} admin - The manager's admin status.
     */
    interface ManagerData {
        manager_id: number;
        last_name: string;
        first_name: string;
        salary: string;
        hours_per_week: string;
        email: string;
        admin: string;
    }

     /**
     * Data structure for adding a new manager.
     * @interface
     * @property {string} FirstName - The manager's first name.
     * @property {string} LastName - The manager's last name.
     * @property {string} Salary - The manager's salary.
     * @property {string} Hours - The manager's hours per week.
     * @property {string} Email - The manager's email.
     * @property {string} Admin - The manager's admin status.
     */
    interface AddManager {
        FirstName: string;
        LastName: string;
        Salary: string;
        Hours: string;
        Email: string;
        Admin: string;
    }

    /**
     * Data structure for editing an existing manager.
     * @interface
     * @property {string} FirstName - The manager's first name.
     * @property {string} LastName - The manager's last name.
     * @property {string} Salary - The manager's salary.
     * @property {string} Hours - The manager's hours per week.
     * @property {string} Email - The manager's email.
     * @property {string} Admin - The manager's admin status.
     */
    interface EditManager {
        FirstName: string;
        LastName: string;
        Salary: string;
        Hours: string;
        Email: string;
        Admin: string;
    }

    const [managerList, setManagerList] = useState<ManagerData[]>([]);
    const [newManager, setNewManager] = useState<AddManager>({FirstName: '', LastName: '', Salary: '', Hours: '', Email: '', Admin: '',});
    const [showInputFields, setShowInputFields] = useState(false);
    const [editingManagerId, setEditingManagerId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({FirstName: '', LastName: '', Salary: '', Hours: '', Email: '', Admin: '',});

    /**
     * Handles input change for adding a new manager.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @param {keyof AddManager} fieldName - The field name to update in the new manager data.
     */
    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof AddManager) => {
        const { value } = e.target;
        setNewManager((prevNewManager) => ({ ...prevNewManager, [fieldName]: value }));
    };

    const [ManagerToDeleteId, setManagerToDeleteId] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false);
    
    /**
     * Handles the click event to delete a manager.
     * @param {number} managerId - The ID of the manager to be deleted.
     */
    const handleDeleteClick = (managerId: number) => {
        setManagerToDeleteId(managerId);
        setShowPopup(true);
    };

    /**
     * Handles the cancel event for deleting a manager.
     */
    const handleCancelDelete = () => {
        setManagerToDeleteId(0);
        setShowPopup(false);
    };

     /**
     * Handles the deletion of a manager.
     */
    const handleDeleteManager = async () => {
        if (ManagerToDeleteId !== 0) {
            const managerID = ManagerToDeleteId;
            try {
                await remove_manager(managerID);
                setManagerList((prevMaanagerList) =>
                    prevMaanagerList.filter((manager) => manager.manager_id !== managerID)
                );
            } catch (error) {
                console.error(`Error deleting Manager with ID ${managerID}:`, error);
            }
            setManagerToDeleteId(0);
            setShowPopup(false);
        }
    };

    /**
     * Fetches manager information from the server and updates the state.
     */
    const generate_manager_info = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios 
        // .post('http://127.0.0.1:5000/api/manager/get_manager_list',config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/get_manager_list`, config)
        .then((response) => {
            setManagerList(response.data);
            // Save the manager data to local storage
            localStorage.setItem('managerList', JSON.stringify(response.data));
        })
        .catch((error) => {
            console.error('Error with Generating Manager Information:', error);
        })
    };

    /**
     * Adds a new manager by making a POST request to the server.
     */    
    const add_manager = async () => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        await axios
        // .post('http://127.0.0.1:5000/api/manager/add_manager', newManager, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/add_manager`, newManager, config)
        .then((response) => {
        })
        .catch((error) => {
            console.error('Error with Adding Manager:', error);
        });
    };

    /**
     * Removes a manager by making a POST request to the server.
     * @param {number} managerID - The ID of the manager to be removed.
     */    
    const remove_manager = async (managerID : number) => { 
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        //Send Post rquest to Flask API
        axios
        // .post('http://127.0.0.1:5000/api/manager/remove_manager', managerID, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/remove_manager`, managerID, config)
        .then((response) => {
        })
        .catch((error) => {
            console.error('Error with Removing Manager:', error);
        });
    };

    /**
     * Updates manager information by making a POST request to the server.
     * @param {number} managerID - The ID of the manager to be updated.
     */
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
        // .post('http://127.0.0.1:5000/api/manager/update_manager', requestData, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/update_manager`, requestData, config)
        .then((response) => {
            adminProps.setIsAdmin(response.data.isAdmin);
        })
        .catch((error) => {
            console.error('Error with Updating Manager Information:', error);
        });
    };

    /**
     * Handles the submission of new manager data.
     * @param {AddManager} newManager - The data of the new manager to be added.
     */
    const handleSubmitNewManager = async (newManager: AddManager) => {
        try {
            await add_manager();

            await generate_manager_info();

            setNewManager({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                Email: '',
                Admin: '',
            });

            setShowInputFields(false);
        } catch (error) {
            console.error('Error with Adding Manager:', error);
        }
    };

    /**
     * Displays input fields to add a new manager row.
     * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
     */
    const handleAddRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowInputFields(true);
    };

    /**
     * Cancels adding a new manager row.
     */
    const handleCancelRow = () => {
        setShowInputFields(false);
    };
    
    /**
     * Sets up the editing state for a manager.
     * @param {number} managerID - The ID of the manager to be edited.
     */
    const handleEdit = (managerID: number) => {
        setEditingManagerId(managerID);
        const managerToEdit = managerList.find((manager) => manager.manager_id === managerID);
        if (managerToEdit) {
          setEditedData({
            FirstName: managerToEdit.first_name,
            LastName: managerToEdit.last_name,
            Salary: managerToEdit.salary,
            Hours: managerToEdit.hours_per_week,
            Email: managerToEdit.email,
            Admin: managerToEdit.admin,
          });
        }
    };

    /**
     * Saves the edited data for a manager.
     * @param {number} managerID - The ID of the manager being edited.
     * @param {EditManager} editedData - The edited data for the manager.
     */
    const handleSaveEdit = async (managerID: number, editedData : EditManager) => {

        try {
            await update_manager(managerID);
            await generate_manager_info();
            setEditedData({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                Email: '',
                Admin: '',
            });
            setEditingManagerId(null);
        } catch (error) {
            console.error('Error with Updating Manager:', error);
        }
    };

    /**
     * Cancels the editing state for a manager.
     * @param {number} managerID - The ID of the manager being edited.
     */
    const handleCancelEdit = async (managerId: number) => {
        try {
            await generate_manager_info();
        
            setEditedData({
                FirstName: '',
                LastName: '',
                Salary: '',
                Hours: '',
                Email: '',
                Admin: '',
            });
            setEditingManagerId(null);
        } catch (error) {
            console.error('Error with Canceling Edit Manager:', error);
        }
    };

    return (
        <div>                
            <div className='Search-Container'>
                <form> <input className="searchForm"  type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
                    placeholder='Search by Manager Last Name...'/> 
                </form>
            </div>

            <div className="add-container">
                {(adminProps.isAdmin === 'Yes') && 
                    <span>
                        <button className="btn btn-success" style={{marginTop: "-1vh"}} onClick={handleAddRow}>
                            <IoPersonAddSharp className="add-icon" />
                            Add Manager
                        </button>
                    </span>
                }
            </div> <br/> <br/>

            <div style={{overflow: "scroll", height: "50vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
                {!!managerList.length && (
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
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.LastName} onChange={(e) => setEditedData({ ...editedData, LastName: e.target.value })} required className='input-forms'/> : manager.last_name}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.FirstName} onChange={(e) => setEditedData({ ...editedData, FirstName: e.target.value })} required className='input-forms'/> : manager.first_name}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.Salary} onChange={(e) => setEditedData({ ...editedData, Salary: e.target.value })} required className='input-forms'/> : manager.salary}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.Hours} onChange={(e) => setEditedData({ ...editedData, Hours: e.target.value })} required className='input-forms'/> : manager.hours_per_week}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.Email} onChange={(e) => setEditedData({ ...editedData, Email: e.target.value })} required className='input-forms'/> : manager.email}</td>
                        <td>{editingManagerId === manager.manager_id ? <input type="text" value={editedData.Admin} onChange={(e) => setEditedData({ ...editedData, Admin: e.target.value })} required className='input-forms'/> : manager.admin}</td>
                        {(adminProps.isAdmin === 'Yes') ? 
                            <td>
                                {editingManagerId === manager.manager_id ? (
                                    <span>
                                        <MdCancel className="cancel-icon" onClick={() => handleCancelEdit(manager.manager_id)}/>
                                        <FiSave className="save-icon" onClick={() => handleSaveEdit(manager.manager_id, editedData)} />
                                    </span>
                                ) : (
                                    <span>
                                        <BsFillTrashFill className="delete-btn"
                                            onClick={() => handleDeleteClick(manager.manager_id)}
                                        />
                                        <BsFillPencilFill className="edit-btn"
                                            onClick={() => handleEdit(manager.manager_id)}
                                        />
                                    </span>
                                )}
                            </td>
                            :
                            <td> ---</td>
                        }
                        {(adminProps.isAdmin === 'No') && 
                            <td>
                            Disabled
                            </td>
                        }
                        
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
                                        type="text" name="LastName" value={newManager.LastName} placeholder="Last Name" onChange={(e) => handleAddInputChange(e, 'LastName')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="FirstName" value={newManager.FirstName} placeholder="First Name" onChange={(e) => handleAddInputChange(e, 'FirstName')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="Salary" value={newManager.Salary} placeholder="Salary" onChange={(e) => handleAddInputChange(e, 'Salary')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="Hours" value={newManager.Hours} placeholder="Hours Per Week" onChange={(e) => handleAddInputChange(e, 'Hours')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="text" value={newManager.Email} placeholder="Email" onChange={(e) => handleAddInputChange(e, 'Email')} required className='input-forms'/>
                                </td>
                                <td>
                                    <input type="text" name="text" value={newManager.Admin} placeholder="Admin" onChange={(e) => handleAddInputChange(e, 'Admin')} required className='input-forms'/>
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
                    </table>
                )}
            </div>
        </div>
    );
};
export default ManagerTableComponent;
