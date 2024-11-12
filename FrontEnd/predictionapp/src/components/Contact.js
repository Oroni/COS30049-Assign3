import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setStatus('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('Please enter a valid email address.');
            return;
        }

        setStatus('Sending your message...');

        setTimeout(() => {
            setStatus('Thank you for contacting us!');
            setName('');
            setEmail('');
            setMessage('');
        }, 2000);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Contact Us</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '10px', width: '100%', margin: '10px 0' }}
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px', width: '100%', margin: '10px 0' }}
                />
                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ padding: '10px', width: '100%', height: '100px', margin: '10px 0' }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Send Message
                </button>
            </form>
            {status && <p style={{ marginTop: '10px', color: status.includes('Thank') ? 'green' : 'red' }}>{status}</p>}

            <p style={{ marginTop: '20px' }}>
                For support or inquiries about the system, please reach out to us at{' '}
                <a href="mailto:support@xairlines.com" style={{ color: '#007BFF' }}>support@xairlines.com</a>.
            </p>

            <div style={{ marginTop: '20px' }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
                    {/* Twitter SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path fill="#1DA1F2" d="M23.5 4.9c-.9.4-1.8.7-2.8.8 1-1.2 1.8-2.7 2.1-4.3-.9.5-1.8.8-2.8 1-1-.9-2.4-1.4-3.7-1.3-1.3 0-2.5.5-3.4 1.4-1.1.9-1.6 2.3-1.6 3.7 0 .3.1.6.2.9-2.7-.1-5.1-1.4-6.7-3.4-.3.5-.5 1.1-.5 1.7 0 1.2.6 2.3 1.5 3-1-.1-1.9-.3-2.7-.7v.1c0 1.7 1.2 3.2 2.8 3.5-1 .3-2.1.4-3.2.1.9 2.7 3.4 4.7 6.3 4.8-2.3 1.8-5.2 2.7-8.1 2.5 2.7 1.7 5.9 2.6 9.2 2.6 11.1 0 17.2-9.2 17.2-17.1 0-.3 0-.6-.1-.9.6-.4 1.2-.9 1.7-1.5z"/>
                    </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
                    {/* Facebook SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path fill="#3b5998" d="M22 12c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zM12 5c-.7 0-1.4.1-2 .3v1.6h1.4c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2h-1.4v4h2.6v-4.1c.1-.3.1-.7.1-1 0-1.6-1.4-2.9-3.1-2.9h-3.1c-1.7 0-3.1 1.3-3.1 2.9v7.8h2.6v-7.8c0-.3.1-.6.3-.8.3-.2.6-.3.9-.3.6 0 1.1.3 1.4.7.2.3.3.7.3 1v4h2.6v-4.1c.1-.3.1-.7.1-1 0-1.6-1.4-2.9-3.1-2.9h-3.1c-1.7 0-3.1 1.3-3.1 2.9v7.8h2.6v-7.8c0-.3.1-.6.3-.8.3-.2.6-.3.9-.3.6 0 1.1.3 1.4.7.2.3.3.7.3 1v4h2.6v-4.1c.1-.3.1-.7.1-1 0-1.6-1.4-2.9-3.1-2.9h-3.1c-1.7 0-3.1 1.3-3.1 2.9v7.8h2.6v-7.8c0-.3.1-.6.3-.8.3-.2.6-.3.9-.3.6 0 1.1.3 1.4.7.2.3.3.7.3 1"/>
                    </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
                    {/* LinkedIn SVG Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path fill="#0A66C2" d="M4.5 3c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm0 2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5c.3 0 .5.2.5.5s-.2.5-.5.5zm11.4 1.7c-.5 0-.9.2-1.3.5-.6-.3-1.2-.5-1.8-.5-.3 0-.6.1-.9.2-.6-.9-1.6-1.5-2.7-1.5-2.2 0-4 1.8-4 4s1.8 4 4 4c1.1 0 2.2-.5 3-.9.4.5.9.9 1.5 1.1.2.1.5.1.7.1 2.2 0 3.9-1.8 3.9-4s-1.8-4-3.9-4zm-.1 6.9c-.5 0-.9-.1-1.3-.4-.4-.3-.7-.7-.7-1.1 0-.4.3-.8.7-1.1.4-.3.8-.4 1.3-.4 1.2 0 2.2.9 2.2 2.2 0 1.3-.9 2.2-2.2 2.2zm-11.6-6.9h3.7v11h-3.7v-11zm-1.1 0h-3.5v11h3.5v-11z"/>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Contact;
