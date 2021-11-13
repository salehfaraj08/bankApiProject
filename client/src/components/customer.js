import React from "react";
import axios from "axios";

const Customer = ({ name, id, cash, credit }) => {
    const [customer, setcustomer] = React.useState({
        id,
        name,
        cash,
        credit
    });

    const [transactionType, setTransactionType] = React.useState('');
    const handletransactionType = (e) => {
        setTransactionType(e.target.value);
    }
    const cancelHandler = () => {
        setTransactionType('');
    }
    return <div>
        <div style={{ display: 'flex', gap: '1vw' }}>
            <span>name : {customer.name}</span>
            <span>,cash : {customer.cash}</span>
            <span>,credit:{customer.credit}</span>
            ,<input className='customeBtn' type='button' value='deposit' onClick={handletransactionType} />
            ,<input className='customeBtn' type='button' value='withdraw' onClick={handletransactionType} />
            ,<input className='customeBtn' type='button' value='update credit' onClick={handletransactionType} />
        </div>
        {
            transactionType === 'deposit' ? <div>
                <input placeholder='enter deposit amount' type='text' />
                <input className='customeBtn' type='button' value='submit' />
                <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler}/>
            </div>
                : transactionType === 'withdraw' ? <div>
                    <input placeholder='enter withdraw amount' type='text' />
                    <input className='customeBtn' type='button' value='submit' />
                    <input className='customeBtn' type='button' value='cancel' />
                </div>
                    : transactionType === 'update credit' ? <div>
                        <input placeholder='enter update credit amount' type='text' />
                        <input className='customeBtn' type='button' value='submit' />
                        <input className='customeBtn' type='button' value='cancel' />
                    </div>
                        : <div></div>
        }
    </div>
}

export default Customer;