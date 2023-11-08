import React, { useRef, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
//import axios, { AxiosResponse, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Popup from 'reactjs-popup';

const ManagerGUI = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dateInputRef1 = useRef(null);
  const dateInputRef2 = useRef(null);


  const changeStartDate = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setStartDate(e.target.value);
  };

  const changeEndDate = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEndDate(e.target.value);
  };

  const generate_order_history = () => {
    // query for order history data based on startDate and endDate
  }

  const generateProductReport = () => {
    // query for product report data
  }

  const generateSellsTogether = () => {
    // query for whatsellstogether report data
  }

  const generateExcessReport = () => {
    // query for excess report data
  }

  const generateRestockReport = () => {
    // query for restock report data
  }

  return(
    <div style={{ display: 'block', width: 700, padding: 30}} className='manager'> 
      <h4>Manager GUI</h4> 
      <Tabs defaultActiveKey="1"> 
        <Tab eventKey="1" title="Inventory"> 
          Inventory go here. 
          
        </Tab> 
        <Tab eventKey="2" title="Order History"> 

          <p>Start Date: <input type="date" onChange={changeStartDate} ref={dateInputRef1} /></p>
          <p>End Date: <input type="date" onChange={changeEndDate} ref={dateInputRef2} /></p>

          <button onClick={generate_order_history}>Generate Order History</button>

        </Tab> 
        <Tab eventKey="3" title="Employees"> 
          Employee Table goes here.

        </Tab>
        <Tab eventKey="4" title="Reports"> 
        <Popup trigger=
            {<button> Product Report </button>} 
            modal nested onOpen={generateProductReport}>
            {
              // table goes here for Product Report 
            }
        </Popup>
        <Popup trigger=
            {<button> What Sells Together Report </button>} 
            modal nested onOpen={generateSellsTogether}>
            {
              // table goes here for What Sells together report
            }
        </Popup>
        <Popup trigger=
            {<button> Excess Report </button>} 
            modal nested onOpen={generateExcessReport}>
            {
              // table goes here for Excess Report
            }
        </Popup>
        <Popup trigger=
            {<button> Restock Report </button>} 
            modal nested onOpen={generateRestockReport}>
            {
              // table goes here for Restock Report
            }
        </Popup>
        </Tab>  
      </Tabs> 
    </div> 
  );
}
export default ManagerGUI;