import React, {useRef, useState} from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistoryComponent: React.FC = () => {
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

    interface OrderData {
        order_id: number;
        employee_id: number;
        order_total: number;
        date: string;
        menu_items : string
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
        .post(`https://pos-backend-3c6o.onrender.com/api/manager/get_order_history`, requestDates, config)
        .then((response) => {
          setOrderHistory(response.data);
          console.log(response.data); 
        })
        .catch((error) => {
          console.error('Error with Order History:', error);
        });
    };  
   
    return (
        <div>  
          <br />  
            <p>
            Start Date: <input type="date" onChange={change_order_start_date} ref={order_ref1} /> &nbsp;
            End Date: <input type="date" onChange={change_order_end_date} ref={order_ref2} />
            </p>
            <button onClick={() => generate_order_history(order_start_date, order_end_date)} className="btn btn-secondary">
              Generate Order History</button>
            {!!orderHistory.length && (
                    <div className="order-table-section"> <br />
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
                        {orderHistory.map((order: OrderData) => (
                        <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.employee_id}</td>
                        <td>{order.order_total}</td>
                        <td>{order.date}</td>
                        <td>{order.menu_items}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
            )}
        </div>
    );
};
export default OrderHistoryComponent;
