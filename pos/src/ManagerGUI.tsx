import React, { useRef, useState} from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
//import axios, { AxiosResponse, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Popup from 'reactjs-popup';
//import axios from 'axios';
import InventoryComponent from './Components/Inventory';
import OrderHistoryComponent from './Components/OrderHistory';
import MenuComponent from './Components/Menu';

const ManagerGUI: React.FC = () => {

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
        <OrderHistoryComponent />
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
        <Tab eventKey={5} title="Menu"> 
        <MenuComponent />
        </Tab>
      </Tabs> 
    </div> 
  );
}
export default ManagerGUI;