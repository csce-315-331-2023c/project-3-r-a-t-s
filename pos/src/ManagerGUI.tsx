import React, { useRef, useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
//import axios, { AxiosResponse, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Popup from 'reactjs-popup';
import axios from 'axios';

const ManagerGUI: React.FC = () => {
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
 
  interface OrderData {
    order_id: number;
    employee_id: number;
    order_total: number;
    date: string;
  }
  const [orderHistory, setOrderHistory] = useState<OrderData[]>([]);
 
  const generate_order_history = (order_start_date : string, order_end_date : string) => {
    // query for order history data based on startDate and endDate
    const requestDates = {
      startDate: order_start_date,
      endDate: order_end_date, 
    };
    const config = {
      headers: {
        'Contest-Type': 'application/json',
      },
    };
    //Send Post rquest to Flask API
    axios
      //.post('http://127.0.0.1:5000/api/manager/get_order_history', requestDates, config)
      .post(`https://pos-backend-3c6o.onrender.com/api//manager/get_order_history`, requestDates, config)
      .then((response) => {
        setOrderHistory(response.data);
        console.log(response.data); 
      })
      .catch((error) => {
        console.error('Error with Order History:', error);
      });
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
          Inventory go here. 
        </Tab> 
        <Tab eventKey={2} title="Order History"> 

          <p>Start Date: <input type="date" onChange={change_order_start_date} ref={order_ref1} /></p>
          <p>End Date: <input type="date" onChange={change_order_end_date} ref={order_ref2} /></p>

          <button onClick={() => generate_order_history(order_start_date, order_end_date)}>Generate Order History</button>
          {!!orderHistory.length && (
            <div className="order-table-section">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Employee ID</th>
                    <th>Order Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                {orderHistory.map((order: OrderData) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.employee_id}</td>
                  <td>{order.order_total}</td>
                  <td>{order.date}</td>
                </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
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