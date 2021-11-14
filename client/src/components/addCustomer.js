import axios from "axios";
import React from "react";
const AddCustomer = () => {
    const [customer, setCustomer] = React.useState({
        passportId: '',
        name: ''
    });
    const [isAdded, setIsAdded] = React.useState();
    const textHandler = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
        console.log(e.target.name, e.target.value);
    }

    const addCustomer = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/', customer).then(res => {
            if (res.status === 200) {
                setIsAdded(true);
            }
        }).catch(err=>{
            console.log(err);
            setIsAdded(false);
        })
    }
    return <div>
        <h1>add customer</h1>
        <div>
            <form onSubmit={addCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                <input placeholder='enter passport id' required type={'text'} name={'passportId'} value={customer.passportId} onChange={textHandler} />
                <input placeholder='enter your name' required type={'text'} name={'name'} value={customer.name} onChange={textHandler} />
                <input type={'submit'} value={'submit'} />
            </form>
            {
                isAdded ? <div>the customer have been added succesfully</div> : isAdded === false ? <div>these customer is already exist</div> : <div></div>
            }
        </div>
    </div>
}
export default AddCustomer;