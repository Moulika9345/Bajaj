import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState({
        alphabets: false,
        numbers: false,
        highest: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.parse(input);
            const result = await axios.post('https://bajaj-nine-alpha.vercel.app/bfhl', { data: jsonData });
            setResponse(result.data);
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        const filteredResponse = {};
        if (filter.numbers) filteredResponse.numbers = response.numbers;
        if (filter.alphabets) filteredResponse.alphabets = response.alphabets;
        if (filter.highest) filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div>
            <h1>API Client</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON here'
                    rows='5'
                    cols='50'
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.numbers}
                        onChange={() => setFilter({ ...filter, numbers: !filter.numbers })}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.alphabets}
                        onChange={() => setFilter({ ...filter, alphabets: !filter.alphabets })}
                    />
                    Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.highest}
                        onChange={() => setFilter({ ...filter, highest: !filter.highest })}
                    />
                    Highest Lowercase Alphabet
                </label>
            </div>
            <div>
                {renderResponse()}
            </div>
        </div>
    );
};

export default App;
