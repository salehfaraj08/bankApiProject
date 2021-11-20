import React, { useRef } from "react";
import axios from "axios";

const Customer = ({ name, id, cash, credit, handleTransferTrans }) => {
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
        newCredit: '',
        transferAmount: '',
        recieverId: ''
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
        setAmounts({
            ...amounts, amountOfCash: '',
            withdrawAmount: '',
            newCredit: '',
            transferAmount: '',
            recieverId: ''
        })
    }
    const handleTransactionSend = (type) => {
        console.log(type);
        if (type === 'deposit') {
            axios.put(`http://localhost:5001/bank/deposit/${customer.id}`, {
                amountOfCash: amounts.amountOfCash
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    let tmpCustomer = { ...customer };
                    tmpCustomer.cash += parseInt(amounts.amountOfCash);
                    setCustomer(tmpCustomer);
                    setAmounts({ ...amounts, amountOfCash: '' });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (type === 'withdraw') {
            axios.put(`http://localhost:5001/bank/withdraw/${customer.id}`, {
                withdrawAmount: amounts.withdrawAmount
            }).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    let tmpCustomer = { ...customer };
                    tmpCustomer.cash -= parseInt(amounts.withdrawAmount);
                    setCustomer(tmpCustomer);
                    setAmounts({ ...amounts, withdrawAmount: '' });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (type === 'transferMoney') {
            axios.put(`http://localhost:5001/bank/transfer/${customer.id}/${amounts.recieverId}`, {
                transferAmount: amounts.transferAmount
            }).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    handleTransferTrans(amounts.recieverId, amounts.transferAmount);
                    // let tmpCustomer = { ...customer };
                    // tmpCustomer.cash -= parseInt(amounts.transferAmount);
                    // setCustomer(tmpCustomer);
                    // setAmounts({ ...amounts, transferAmount: '', recieverId: '' });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (type === 'update credit') {
            axios.put(`http://localhost:5001/bank/updateCredit/${customer.id}`, {
                newCredit: amounts.newCredit
            }).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    let tmpCustomer = { ...customer };
                    tmpCustomer.credit += parseInt(amounts.newCredit);
                    setCustomer(tmpCustomer);
                    setAmounts({ ...amounts, newCredit: '' });
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
            ,<input className='customeBtn' type='button' value='transferMoney' onClick={handletransactionType} />
        </div>
        {
            transactionType === 'deposit' ? <div>
                <input placeholder='enter deposit amount' type='text' value={amounts.amountOfCash} name='amountOfCash' onChange={textHandler} />
                <input className='customeBtn' type='button' value='submit' onClick={() => handleTransactionSend('deposit')} />
                <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
            </div>
                : transactionType === 'withdraw' ? <div>
                    <input placeholder='enter withdraw amount' type='text' value={amounts.withdrawAmount} name='withdrawAmount' onChange={textHandler} />
                    <input className='customeBtn' type='button' value='submit' onClick={() => handleTransactionSend('withdraw')} />
                    <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
                </div>
                    : transactionType === 'update credit' ? <div>
                        <input placeholder='enter update credit amount' type='text' value={amounts.newCredit} name='newCredit' onChange={textHandler} />
                        <input className='customeBtn' type='button' value='submit' onClick={() => handleTransactionSend('update credit')} />
                        <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
                    </div>
                        : transactionType === 'transferMoney' ? <div>
                            <input placeholder='enter the desired amount' type='text' value={amounts.transferAmount} name='transferAmount' onChange={textHandler} />
                            <input placeholder='enter id of receiver' type='text' value={amounts.recieverId} name='recieverId' onChange={textHandler} />
                            <input className='customeBtn' type='button' value='submit' onClick={() => handleTransactionSend('transferMoney')} />
                            <input className='customeBtn' type='button' value='cancel' onClick={cancelHandler} />
                        </div>
                            : <div></div>
        }
    </div>
}

export default Customer;