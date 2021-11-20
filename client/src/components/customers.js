import React from "react";
import axios from "axios";
import Customer from "./customer";


const Customers = () => {
    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:5001/").then((res) => {
            if (res.status === 200) {
                setCustomers(res.data);
            }
        });
    }, []);
    const handleTransfer = (id, amount) => {
        let reciever = customers.find(customer => customer.id === parseInt(id));
        reciever.cash += parseInt(amount);
        console.log(customers);
        setCustomers([...customers,customers]);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2vh' }}>
            {
                customers && customers.length > 0 ? customers.map((customer) => {
                    return <Customer key={customer.id} id={customer.id} name={customer.name} cash={customer.cash} credit={customer.credit} handleTransferTrans={handleTransfer} />
                }) : <div>Loading...</div>
            }
        </div>
    )

}

export default Customers;