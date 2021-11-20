const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const createFile = () => {
    fs.stat('./Customers.json', (err, stats) => {
        if (err) {
            console.log(err);
        }
        if (!stats) {
            fs.writeFile('./Customers.json', JSON.stringify({ customers: [] }), (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('file created');
            });
        }
    });
}
createFile();
const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./Customers.json', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data.toString()));
            }
        })
    });
}
app.get('/', async (req, res) => {
    let file = await getAllCustomers();
    return res.send(file.customers);
});
///get customer by id
app.get('/getCustomer/:id', async (req, res) => {
    const { id } = req.params;
    let file = await getAllCustomers();
    const customer = file.customers.find(customer => customer.id === parseInt(id));
    if (customer) {
        return res.send(customer);
    }
    else {
        return res.status(400).json({ error: 'Customer is not exist' });
    }
});

app.post('/', async (req, res) => {
    const { passportId, name } = req.body, cash = 0, credit = 0;
    let file = await getAllCustomers();
    const customer = file.customers.find(customer => customer.passportId === passportId);
    if (customer) {
        return res.status(400).json({ error: 'Customer is already exist' });
    }
    let AllUsers = file.customers;
    if (AllUsers.length > 0) {
        AllUsers.push({
            id: AllUsers[AllUsers.length - 1].id + 1,
            passportId,
            name,
            cash,
            credit
        });
    }
    else {
        AllUsers.push({
            id: 0,
            passportId,
            name,
            cash,
            credit
        });
    }

    fs.writeFile('./Customers.json', JSON.stringify(file), (err) => {
        if (err) {
            console.log(err);
        }
    });
    return res.status(200).json({ success: 'Customer added successfully' })
});

app.put('/bank/deposit/:id', async (req, res) => {
    const { id } = req.params;
    const amountOfCash = parseInt(req.body.amountOfCash);
    let file = await getAllCustomers();
    let customer = file.customers.find(customer => customer.id === parseInt(id));
    if (!customer) {
        return res.status(400).json({ error: 'customer is not exist' })
    }
    if (amountOfCash > 0) {
        customer.cash += amountOfCash
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'cash updated successfully' });
    }
    else {
        return res.status(400).json({ error: 'cannot deposit a negative number' })
    }
});

app.put('/bank/updateCredit/:id', async (req, res) => {
    const { id } = req.params;
    const newCredit = parseInt(req.body.newCredit);
    let file = await getAllCustomers();
    let customer = file.customers.find(customer => customer.id === parseInt(id));
    if (!customer) {
        return res.status(400).json({ error: 'customer is not exist' })
    }
    if (newCredit > 0) {
        customer.credit += newCredit
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'credit updated successfully' });
    }
    else {
        return res.status(400).json({ error: 'cannot update a negative number to credit' })
    }
});

app.put('/bank/withdraw/:id', async (req, res) => {
    const { id } = req.params;
    const withdrawAmount = parseInt(req.body.withdrawAmount);
    let file = await getAllCustomers();
    let customer = file.customers.find(customer => customer.id === parseInt(id));
    if (!customer) {
        return res.status(400).json({ error: 'customer is not exist' })
    }
    if (withdrawAmount <= customer.cash && withdrawAmount > 0) {
        customer.cash -= withdrawAmount;
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'withdraw money successfully' });
    }
    else if (customer.cash + customer.credit >= withdrawAmount && withdrawAmount > 0) {
        customer.cash -= withdrawAmount;
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'withdraw money successfully' });
    }
    else {
        return res.status(400).json({ error: 'cannot withdraw there is no enough money/credit' })
    }
});

////tranfer from customer to another
app.put('/bank/transfer/:id/:recieverId', async (req, res) => {
    const { id, recieverId } = req.params;
    const transferAmount = parseInt(req.body.transferAmount);
    let file = await getAllCustomers();
    let customer = file.customers.find(customer => customer.id === parseInt(id));
    let reciever = file.customers.find(customer => customer.id === parseInt(recieverId));
    if (!customer || !reciever) {
        return res.status(400).json({ error: 'customer is not exist' })
    }
    if(customer.passportId===reciever.passportId){
        return res.status(400).json({ error: 'cannot transfer from customer to the same customer' })
    }
    if (transferAmount <= customer.cash && transferAmount > 0) {
        customer.cash -= transferAmount;
        reciever.cash += transferAmount;
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'tranfered money successfully' });
    }
    else if (customer.cash + customer.credit >= transferAmount && transferAmount > 0) {
        customer.cash -= transferAmount;
        reciever.cash += transferAmount;
        fs.writeFile('Customers.json', JSON.stringify(file), (err) => {
            if (err) {
                console.log(err);
            }
        })
        return res.status(200).json({ success: 'tranfered money successfully' });
    }
    else {
        return res.status(400).json({ error: 'cannot tranfer there is no enough money/credit' })
    }
});

app.listen(5001, () => console.log(`Listening on port 5001`));