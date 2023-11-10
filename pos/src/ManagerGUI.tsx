import React, { useRef, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
//import axios, { AxiosResponse, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Popup from 'reactjs-popup';
import InventoryComponent from './Components/Inventory';

const ManagerGUI = () => {
  // Manages start/end date in the Order History Tab
  const [order_start_date, set_order_start_date] = useState('');
  const [order_end_date, set_order_end_date] = useState('');

  const order_ref1 = useRef(null);
  const order_ref2 = useRef(null);

  const change_order_start_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    set_order_start_date(e.target.value);
  };
  const change_order_end_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    set_order_end_date(e.target.value);
  };

  // Manages start/end date in Reports Tab for any reports that require a date
  const [report_start_date, set_report_start_date] = useState('');
  const [report_end_date, set_report_end_date] = useState('');

  const report_ref1 = useRef(null);
  const report_ref2 = useRef(null);

  const change_report_start_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    set_report_start_date(e.target.value);
  };
  const change_report_end_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    set_report_end_date(e.target.value);
  };
  
  const generate_order_history = () => {
    // query for order history data based on startDate and endDate (Teresa)

  }

  // Reports 
  const generateProductReport = () => {
    // query for product report data
  }

  const generateSellsTogether = () => {
    // query for whatsellstogether report data (Teresa)
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
      <Tabs defaultActiveKey={1}> 
        <Tab eventKey={1} title="Inventory"> 
        <InventoryComponent />
        </Tab> 
        <Tab eventKey={2} title="Order History"> 

          <p>Start Date: <input type="date" onChange={change_order_start_date} ref={order_ref1} /></p>
          <p>End Date: <input type="date" onChange={change_order_end_date} ref={order_ref2} /></p>

          <button onClick={generate_order_history}>Generate Order History</button>

        </Tab> 
        <Tab eventKey={3} title="Employees"> 
          Employee Table goes here.

        </Tab>
        <Tab eventKey={4} title="Reports"> 
          <p>Start Date: <input type="date" onChange={change_report_start_date} ref={report_ref1} /></p>
          <p>End Date: <input type="date" onChange={change_report_end_date} ref={report_ref2} /></p>
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
              // table goes here for What Sells together report (Teresa)
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