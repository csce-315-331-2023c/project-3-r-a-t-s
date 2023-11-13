import React, { useRef, useState} from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
import axios, { AxiosResponse, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Popup from 'reactjs-popup';
import InventoryComponent from './Components/Inventory';
import OrderHistoryComponent from './Components/OrderHistory';
import EmployeeComponent from './Components/Employee';
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
  interface ProductReportData {
    menu_item_name: string;
    menu_items: number;
  }
  const [productReport, setProductReport] = useState<ProductReportData[]>([]);
  const generateProductReport = () => {
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      console.log("Invalid Dates selected");
      return;
    }
    else {
      setProductReport([]);
      console.log("Generating Product Report...");
      console.log(report_start_date + " to " + report_end_date);

      const requestDates = {
        startDate: report_start_date,
        endDate: report_end_date, 
      };

      // Set the Content-Type header to application/json
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };
      // Send a POST request to the Flask API
      axios
        .post('http://127.0.0.1:5000/api/manager/get_product_report', requestDates, config)
        //.post(` https://pos-backend-3c6o.onrender.com/api//manager/get_product_report  `, {report_start_date, report_end_date}, config)
        .then((response) => {
          setProductReport(response.data.report);
          console.log('Successfully generated Product Report');
        })
        .catch((error) => {
          console.error('Failed to generate Product Report: ', error);
        });
    };    
  }

  interface PairData {
    str_pair: string;
    count: number;
  }
  const [pairs, setPairs] = useState<PairData[]>([]);
  const generateSellsTogetherReport = () => {
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      console.log("Invalid Dates selected");
      return;
    }
    else {
      const requestDates = {
        startDate: report_start_date,
        endDate: report_end_date, 
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //Send Post rquest to Flask API
      axios
        .post('http://127.0.0.1:5000/api/manager_reports/WhatSellsTogether', requestDates, config)
        //.post(`https://pos-backend-3c6o.onrender.com/api/manager_reports/WhatSellsTogether`, requestDates, config)
        .then((response) => {
          // Check if response.data is an object (dictionary)
          if (typeof response.data === 'object') {
            // Convert dictionary to array of objects
            const pairsArray: PairData[] = Object.entries(response.data).map(([str_pair, count]) => ({str_pair,count: Number(count), }));
            // Set the state with the converted array
            setPairs(pairsArray);
            console.log(pairsArray);
          } else {
            console.error('Invalid data format received from the API');
          }
        })
        .catch((error) => {
          console.error('Error with What Sells Together Report:', error);
        });
    }
  }

  const generateExcessReport = () => {
    // query for excess report data
  }

  const generateRestockReport = () => {
    // query for restock report data
  }

  return(
    <div style={{ display: 'block', padding: 30}} className='manager'> 
      <h4>Manager GUI</h4> 
      <Tabs defaultActiveKey={1}> 
        <Tab eventKey={1} title="Inventory"> 
        <InventoryComponent />
        </Tab> 
        <Tab eventKey={2} title="Order History"> 
        <OrderHistoryComponent />
        </Tab> 
        <Tab eventKey={3} title="Employees"> 
        <EmployeeComponent />

        </Tab>
        <Tab eventKey={4} title="Reports"> 
          <p>
          Start Date: <input type="date" onChange={change_report_start_date} ref={report_ref1}/>
          End Date: <input type="date" onChange={change_report_end_date} ref={report_ref2}/>
          </p>
        <Popup trigger=
            {<button> Product Report </button>} 
            modal nested onOpen={generateProductReport}>
            {
              <div style={{overflow: 'scroll', height: 800}}>
                <h2>Product Report</h2>
                <table className='tableContainer'>
                  <thead>
                    <tr>
                      <th>Menu Item Name</th>
                      <th> Quantity </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productReport.map((product: ProductReportData, index) => (
                      <tr key={index}>
                        <td>{product.menu_item_name}</td>
                        <td>{product.menu_items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
        </Popup>
        <Popup trigger= 
          {<button> What Sells Together Report </button>} 
          modal nested onOpen={generateSellsTogetherReport}>
          {
            <div>    
              <div className="order-table-section">
              <table className="order-table">
                  <thead>
                  <tr>
                      <th>Pair</th>
                      <th>Frequency</th>
                  </tr>
                  </thead>
                  <tbody>
                      {pairs.map((pair : PairData) => (
                      <tr key={pair.str_pair}>
                      <td>{pair.str_pair}</td>
                      <td>{pair.count}</td>
                      </tr>
                      ))}
                  </tbody>
              </table>
              </div>
            </div>
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