import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import './OrderHistory.css';

/**
 * Represents the Order History Component.
 * @returns {JSX.Element} React component.
 */
const OrderHistoryComponent: React.FC = () => {
    
    const [query, setQuery] = useState(''); 

    const date = new Date();
    const date_today = date.toISOString().slice(0, 10);
    date.setUTCDate(date.getUTCDate() - 7);
    const date_month_ago = date.toISOString().slice(0, 10);

    // Manages start/end date in the Order History Tab
    const [order_start_date, set_order_start_date] = useState(date_month_ago);
    const [order_end_date, set_order_end_date] = useState(date_today);

    const order_ref1 = useRef(null);
    const order_ref2 = useRef(null);

    /**
     * Handles the change event for the start date.
     * @param {Object} e - The event object.
     */
    const change_order_start_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        set_order_start_date(e.target.value);
    };

    /**
     * Handles the change event for the end date.
     * @param {Object} e - The event object.
     */
    const change_order_end_date = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        set_order_end_date(e.target.value);
    };

    /**
     * Represents the structure of an order.
     */
    interface OrderData {
        order_id: number;
        employee_id: number;
        order_total: number;
        date: string;
        menu_items : string
    }
    
    const [orderHistory, setOrderHistory] = useState<OrderData[]>([]);

    /**
     * Fetches order history data based on the selected date range.
     */
    const generate_order_history = async () => {
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
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/get_order_history`, requestDates, config)
        .then((response) => {
          setOrderHistory(response.data);
          console.log("Successfully generated Order Data");
        })
        .catch((error) => {
          console.error('Error with Order History:', error);
        });
    };  

    /**
     * Fetches order history data when the component mounts and when the date range changes.
     */
    // useEffect(() => {
    //   generate_order_history();
    // }, [])

    useEffect(() => {
        generate_order_history();
        console.log("Fetching Order History");
    }, [order_end_date, order_start_date])
   
     /**
     * Renders the OrderHistoryComponent.
     */
    return (
        <div>  
            <p style={{marginTop: "1vh"}}>
            <b>Start Date:</b> <input type="date" onChange={change_order_start_date} ref={order_ref1} value={order_start_date} /> &nbsp;
            <b>End Date:</b> <input type="date" onChange={change_order_end_date} ref={order_ref2} value={order_end_date}/>
            </p>

            <div className='Search-Container'>
              <form> <input className='searchForm'  type="search" value={query} onChange={(e) => setQuery(e.target.value)} 
              placeholder=' Search by Date (YYYY-MM-DD)...'/> </form>
            </div>

          <div style={{overflow: "scroll", height: "65vh", width:"95vw", margin: "0px auto 0px auto", border: "3px solid black"}}>
            {!!orderHistory.length && (
                    <div > 
                    <table className='table table-striped w-100'>
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Employee ID</th>
                            <th>Order Total</th>
                            <th>Date</th>
                            <th>Menu Items</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderHistory.filter((item) => { 
                            return query.toLowerCase() === '' ? item: item.date.toString().includes(query.toLowerCase())
                        })
                        .map((order: OrderData) => (
                        <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.employee_id}</td>
                        <td>{order.order_total.toFixed(2)}</td>
                        <td>{order.date}</td>
                        <td style={{maxWidth: "50vw"}}>{order.menu_items}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
            )}
            </div>
        </div>
    );
};
export default OrderHistoryComponent;
