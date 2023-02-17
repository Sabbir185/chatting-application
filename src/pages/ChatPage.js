import React, { useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const fetchData = async () => {
        const data = await axios.get('/api/data');
        console.log(data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <div>
            <p>chatting</p>
        </div>
    );
};

export default ChatPage;