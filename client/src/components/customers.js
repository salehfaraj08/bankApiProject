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
    }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:'2vh' }}>
            {
                customers && customers.length > 0 ? customers.map((customer) => {
                    return <Customer key={customer.id} id={customer.id} name={customer.name} cash={customer.cash} credit={customer.credit} />
                }) : <div>Loading...</div>
            }
        </div>
    )

}

export default Customers;