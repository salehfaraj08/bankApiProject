import React from "react";
import axios from "axios";

const Customer = ({ name, id, cash, credit }) => {
    const [customer, setCustomer] = React.useState({
        id,
        name,
        cash,
        credit
    });

    const [transactionType, setTransactionType] = React.useState('');
    const [amounts, setAmounts] = React.useState({
        amountOfCash: '',
        withdrawAmount: '',
        newCredit: ''
    });
    const handletransactionType = (e) => {
        setTransactionType(e.target.value);
    }
    const textHandler = (e) => {
        setAmounts({
            ...amounts,
            [e.target.name]: e.target.value
        })
        console.log(amounts);

    }
    const cancelHandler = () => {
        setTransactionType('');
    }
    const handleTransactionSend = (type) => {
        if (type === 'deposit') {
            axios.put(`http://localhost:5001/bank/deposit/${customer.id}`, {
                amountOfCash: amounts.amountOfCash
            }).then((res) => {
                if (res.status === 200) {
                    setCustomer({ ...customer, cash: parseInt(amounts.amountOfCash) });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (type === 'withdraw') {
            axios.put(`http://localhost:5001/bank/withdraw/${customer.id}`, {
                withdrawAmount: amounts.withdrawAmount
            }).then((res) => {
                if (res.status === 200) {
                    setCustomer({ ...customer, cash: parseInt(cash - amounts.withdrawAmount) });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if ('update credit') {
            axios.put(`http://localhost:5001/bank/updateCredit/${customer.id}`, {
                newCredit: amounts.newCredit
            }).then((res) => {
                if (res.status === 200) {
                    setCustomer({ ...customer, credit: parseInt(amounts.newCredit) });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
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
                <input placeholder='enter deposit amount' type='text' value={amounts.amountOfCash} name='amountOfCash' onChange={textHandler} />
                <input className='customeBtn' type='button' value='submit' onClick={handleTransactionSend('deposit')} />
                <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
            </div>
                : transactionType === 'withdraw' ? <div>
                    <input placeholder='enter withdraw amount' type='text' value={amounts.withdrawAmount} name='withdrawAmount' onChange={textHandler} />
                    <input className='customeBtn' type='button' value='submit' onClick={handleTransactionSend('withdraw')} />
                    <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
                </div>
                    : transactionType === 'update credit' ? <div>
                        <input placeholder='enter update credit amount' type='text' value={amounts.newCredit} name='newCredit' onChange={textHandler} />
                        <input className='customeBtn' type='button' value='submit' onClick={handleTransactionSend('update credit')} />
                        <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
                    </div>
                        : <div></div>
        }
    </div>
}

export default Customer;