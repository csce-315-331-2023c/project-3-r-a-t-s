import React, { useRef, useState} from 'react';
import 'reactjs-popup/dist/index.css';
import './Manager.css';
import axios, { AxiosResponse, AxiosError } from 'axios';
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
  interface ProductReportData {
    menu_item: string;
    quantity: number;
  }
  const [productReport, setProductReport] = useState<ProductReportData[]>([]);
  const generateProductReport = () => {
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      console.log("Invalid Dates selected");
      return;
    }
    else {
      console.log("Generating Product Report...");
      console.log(report_start_date + " to " + report_end_date)

      // Set the Content-Type header to application/json
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };
      // Send a POST request to the Flask API
      axios
        //.post('http://127.0.0.1:5000/api/manager/get_product_report', {report_start_date, report_end_date}, config)
        .post(`https://pos-backend-3c6o.onrender.com/api//manager/get_product_report  `, {report_start_date, report_end_date}, config)
        .then((response) => {
          setProductReport(response.data);
          console.log(response.data); 
        })
        .catch((error) => {
          console.error('Failed to generate Product Report: ', error);
        });
    };  
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
          Employee Table goes here.

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
              <div>
                <h2>Product Report</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Menu Item</th>
                      <th> Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productReport.map((product: ProductReportData) => (
                      <tr key={product.menu_item}>
                        <td>{product.menu_item}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
        <Tab eventKey={5} title="Menu"> 
        <MenuComponent />
        </Tab>
      </Tabs> 
    </div> 
  );
}
export default ManagerGUI;