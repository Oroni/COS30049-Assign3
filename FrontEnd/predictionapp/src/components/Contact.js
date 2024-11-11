import React from 'react';
import './styles/Contact.css';  // Link to your CSS for styling

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>

            <section>
                <h2>Our Support Team</h2>
                <p>
                    For support or inquiries regarding the X-Airlines Flight Delay & Fare Prediction System, please feel free to reach out to us. Our team is ready to assist you with any questions or issues you might have.
                </p>

                <ul>
                    <li><strong>Email:</strong> <a href="mailto:support@x-airlines.com">support@x-airlines.com</a></li>
                    <li><strong>Phone:</strong> +1 234 567 890</li>
                    <li><strong>Address:</strong> 123 Airline Blvd, City, Country</li>
                </ul>
            </section>

            <section>
                <h2>Business Inquiries</h2>
                <p>
                    If you're interested in business partnerships or have questions regarding X-Airlines' operations and services, please reach out to our business development team.
                </p>

                <ul>
                    <li><strong>Email:</strong> <a href="mailto:business@x-airlines.com">business@x-airlines.com</a></li>
                    <li><strong>Phone:</strong> +1 234 567 891</li>
                </ul>
            </section>

            <section>
                <h2>Contact Form</h2>
                <p>
                    If you'd prefer to send us a message directly, please fill out the contact form below, and we'll get back to you as soon as possible.
                </p>
                
                <form className="contact-form">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" required />
                    
                    <label for="email">Your Email:</label>
                    <input type="email" id="email" name="email" required />
                    
                    <label for="message">Your Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                    
                    <button type="submit">Send Message</button>
                </form>
            </section>

            <section>
                <h2>Follow Us</h2>
                <p>Stay updated with the latest news and updates from X-Airlines by following us on our social media channels:</p>
                <ul className="social-links">
                    <li><a href="https://facebook.com/xairlines" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://twitter.com/xairlines" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://linkedin.com/company/xairlines" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
            </section>
        </div>
    );
};

export default Contact;
