import React, { useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import 'reactjs-popup/dist/index.css';
import './Manager.css';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InventoryComponent from './Components/Inventory';
import OrderHistoryComponent from './Components/OrderHistory';
import EmployeeComponent from './Components/Employee';
import MenuComponent from './Components/Menu';


const ManagerGUI: React.FC = () => {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  }

  const[table, setTable]= useState([ <div><br/><p>Select a Start and End date to generate the Reports!!!</p></div>]);
  const[selected_report, set_selected_report] = useState(-1);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (selected_report === 1) {
      createProductReportTable();
    }
    else if (selected_report === 2) {
      createWhatSellsTogetherTable();
    }
    else if (selected_report === 3) {
      createExcessTable();
    }
    else if (selected_report === 4) {
      createRestockTable();
    }
  }, [query])


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

  useEffect(() => {
    generateProductReport();
    generateExcessReport();
    generateRestockReport();
    generateSellsTogetherReport();
  }, [report_start_date, report_end_date]);
   

  // Reports 
  interface ProductReportData {
    menu_item_name: string;
    menu_items: number;
  }
  const [productReport, setProductReport] = useState<ProductReportData[]>([]);
    const generateProductReport = async() => {
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      // console.log("Invalid Dates selected");
      return;
    }
    else {
      setProductReport([]);
      const requestDates = {
        startDate: report_start_date,
        endDate: report_end_date, 
      };
      const config = {
          headers: {
              'Content-Type': 'application/json',
          },
      };
      axios
        .post('http://127.0.0.1:5000/api/manager_reports/get_product_report', requestDates, config)
        // .post(`https://pos-backend-3c6o.onrender.com/api/manager_reports/get_product_report`, requestDates, config)
        .then((response) => {
          
          setProductReport(response.data.report);
          // console.log(productReport)
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
  const generateSellsTogetherReport = async() => {
    // query for whatsellstogether report data
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      // console.log("Invalid Dates selected");
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
        // .post('http://127.0.0.1:5000/api/manager_reports/WhatSellsTogether', requestDates, config)
        .post(`https://pos-backend-3c6o.onrender.com/api/manager_reports/WhatSellsTogether`, requestDates, config)
        .then((response) => {
          // Check if response.data is an object (dictionary)
          if (typeof response.data === 'object') {
            // Convert dictionary to array of objects
            const pairsArray: PairData[] = Object.entries(response.data).map(([str_pair, count]) => ({str_pair,count: Number(count), }));
            // Set the state with the converted array
            pairsArray.sort((a, b) => b.count - a.count);
            setPairs(pairsArray);
            console.log("Successfully generated What Sells together");
          } else {
            console.error('Invalid data format received from the API');
          }
        })
        .catch((error) => {
          console.error('Error with What Sells Together Report:', error);
        });
    }
  }

  interface ExcessReportData {
    ingredient_name: string;
    amount_sold: number;
    current_quantity: number;
  }
  const [excessReport, setExcessReport] = useState<ExcessReportData[]>([]);
  const generateExcessReport = async () => {
    // query for excess report data
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      // console.log("Invalid Dates selected");
      return;
    }

    try {
      // const response = await axios.post("http://127.0.0.1:5000/api/manager_reports/get_excess_report", {
      const response = await axios.post('https://pos-backend-3c6o.onrender.com/api/manager_reports/get_excess_report', {

        startDate: report_start_date,
        endDate: report_end_date,
      });
      setExcessReport(response.data.excess_report);
      console.log('Successfully generated Excess Report');
    } catch (error) {
      console.error("Failed to fetch excess report:", error);
    }
  };

  interface RestockReportData {
    // ingredient_id: number;
    name: string;
    quantity: number;
    threshold: number;
  }
  const [restockReport, setRestockReport] = useState<RestockReportData[]>([]);
 
  const generateRestockReport = async () => {
    if (report_start_date > report_end_date || report_end_date.length === 0 || report_start_date.length === 0) {
      // console.log("Invalid Dates selected");
      return;
    }
    
    try {
      // const response = await axios.post("http://127.0.0.1:5000/api/manager_reports/get_restock_report");
      const response = await axios.post('https://pos-backend-3c6o.onrender.com/api/manager_reports/get_restock_report');
      // console.log(response.data);
      setRestockReport(response.data.restock_report);
      console.log("Successfully generated Restock Report");
    } catch (error) {
      console.error("Failed to fetch Restock Report:", error);
    }
  };

  const createProductReportTable = () => {
    set_selected_report(1);
    setTable([<div style={{overflow: 'scroll', height: 750}}> <br />
              <table className='table table-striped w-100'>
                <thead>
                  <tr>
                    <th>Menu Item Name</th>
                    <th> Quantity </th>
                  </tr>
                </thead>
                <tbody>
                  {productReport.filter((item) => { 
                    return query.toLowerCase() === '' ? item: item.menu_item_name.toLowerCase().includes(query.toLowerCase())
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.menu_item_name}</td>
                      <td>{item.menu_items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>]);
  }

  const createWhatSellsTogetherTable = () => {
    set_selected_report(2);
    setTable([<div> <br />
      <table className='table table-striped w-100'>
          <thead>
          <tr>
              <th>Pair</th>
              <th>Frequency</th>
          </tr>
          </thead>
          <tbody>
              {pairs.filter((item) => { 
                  return query.toLowerCase() === '' ? item: item.str_pair.toLowerCase().includes(query.toLowerCase())
              })
              .map((pair : PairData) => (
              <tr key={pair.str_pair}>
              <td>{pair.str_pair}</td>
              <td>{pair.count}</td>
              </tr>
              ))}
          </tbody>
      </table>
    </div>]);
  }

  const createExcessTable = () => {
    set_selected_report(3);
    setTable([<div style={{overflow: 'scroll', height: 750}}>
              <br />
              <table className="table table-striped w-100">
                <thead>
                  <tr>
                    <th>Ingredient Name</th>
                    <th>Amount Sold</th>
                    <th>Current Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {excessReport.filter((item) => { 
                    return query.toLowerCase() === '' ? item: item.ingredient_name.toLowerCase().includes(query.toLowerCase())
                  })
                  .map((item) => (
                    <tr key={item.ingredient_name}>
                      <td>{item.ingredient_name}</td>
                      <td>{item.amount_sold}</td>
                      <td>{item.current_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>]);
  }

  const createRestockTable = () => {
    set_selected_report(4);
    setTable([<div style={{overflow: 'scroll', height: 750}}> <br />
              {restockReport && restockReport.length > 0 ? (
                <table className='table table-striped w-100'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restockReport.filter((item) => { 
                    return query.toLowerCase() === '' ? item: item.name.toLowerCase().includes(query.toLowerCase())
                  })
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No items to restock.</p>
              )}
            </div>]);
  }

  return(
    <div style={{ display: 'block', padding: 30}} className='manager'> 

      <h4 style={{textAlign: 'center', background: 'white', padding: 25}}>
      <button onClick={goback} style={{marginRight: 300, paddingRight: 30, paddingLeft: 30, padding: 10}}> Back </button>
      <u style={{fontSize: 50, marginRight: 300}}>Manager Dashboard</u>
      </h4>       
      <Tabs defaultActiveKey={1} > 
        <Tab eventKey={1} title="Inventory"> 
        <InventoryComponent />
        </Tab> 
        
        <Tab eventKey={2} title="Order History"> 
        <OrderHistoryComponent />
        </Tab> 

        <Tab eventKey={5} title="Menu"> 
        <MenuComponent />
        </Tab>

        <Tab eventKey={3} title="Employees"> 
        <EmployeeComponent />
        </Tab>

        <Tab eventKey={4} title="Reports"> 
          <br />
          <p>
          Start Date: <input type="date" onChange={change_report_start_date} ref={report_ref1}/> &nbsp;
          End Date: <input type="date" onChange={change_report_end_date} ref={report_ref2}/>
          </p>

          <form> <input style={{width: "370px"}} type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
          placeholder='Search by Name...'/> </form>
          <br />
          
          <div>
          <button className="btn btn-secondary" onClick={createProductReportTable}> Product Report </button>
          <button className="btn btn-secondary" onClick={createWhatSellsTogetherTable}> What Sells Together Report </button>
          <button className="btn btn-secondary" onClick={createExcessTable}> Excess Report </button>
          <button className="btn btn-secondary" onClick={createRestockTable}> Restock Report </button>
          </div>
          
          <div>
            {table}
          </div>
        
        </Tab>
      </Tabs> 
      
    </div> 
  );
}
export default ManagerGUI;
