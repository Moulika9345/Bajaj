const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const user_id = "john_doe_17091999";  

app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com", 
        roll_number: "ABCD123", 
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

