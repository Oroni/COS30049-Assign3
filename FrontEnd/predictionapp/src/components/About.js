import React, { useState } from 'react';
import './styles/About.css';

const About = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="about-container">
            <h1>About Us</h1>

            <section>
                <h2 onClick={() => toggleSection('welcome')}>Welcome to the X-Airlines Flight Delay & Fare Prediction System</h2>
                {activeSection === 'welcome' && (
                    <p>
                        The <strong>X-Airlines Flight Delay & Fare Prediction System</strong> is a cutting-edge tool designed specifically for X-Airlines employees to assist with data analysis related to flight delays and fare pricing. Using historical flight data and machine learning algorithms, this system identifies key features that influence delays and fare fluctuations, providing actionable insights to help optimize operations and improve customer satisfaction.
                    </p>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('mission')}>Our Mission</h2>
                {activeSection === 'mission' && (
                    <p>
                        At X-Airlines, we aim to optimize every aspect of our operations—from flight schedules to fare pricing. This system helps X-Airlines employees understand the critical factors behind flight delays and fare fluctuations. By analyzing key data points, we empower our analysts with the insights they need to improve scheduling, reduce delays, and set competitive and profitable pricing strategies.
                    </p>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('features')}>Key Features</h2>
                {activeSection === 'features' && (
                    <ul>
                        <li><strong>Predict Flight Delays:</strong> Uses historical flight data to predict the likelihood and duration of delays, considering factors like airport congestion, weather, and airline-specific performance.</li>
                        <li><strong>Analyze Flight Fares:</strong> Identifies pricing patterns and the features that contribute to fare fluctuations (seasonality, demand, route popularity, etc.).</li>
                        <li><strong>Feature Impact Analysis:</strong> Examines which features have the most significant impact on delays and fares.</li>
                        <li><strong>Actionable Insights:</strong> Provides easy-to-understand, data-driven insights that enable better operational decision-making.</li>
                    </ul>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('howItWorks')}>How It Works</h2>
                {activeSection === 'howItWorks' && (
                    <ol>
                        <li><strong>Input Key Data:</strong> Enter relevant details such as departing and arriving airports, airline information, month, and year.</li>
                        <li><strong>Analyze Data:</strong> The system processes historical data and uses machine learning models to predict flight delays and analyze fare trends.</li>
                        <li><strong>View Results:</strong> Get predictions on delays and fare fluctuations, along with insights into contributing factors.</li>
                        <li><strong>Make Data-Driven Decisions:</strong> Use the insights to make informed decisions on scheduling, pricing, and resource planning.</li>
                    </ol>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('technology')}>Technology Behind the System</h2>
                {activeSection === 'technology' && (
                    <p>
                        The system utilizes advanced data analytics and machine learning techniques to process and analyze large datasets related to flight operations. By training predictive models on historical flight data, we generate accurate predictions of delays and fare trends. The system evaluates key factors such as weather conditions, route popularity, aircraft type, and historical performance to deliver clear insights.
                    </p>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('whyUse')}>Why Use This System?</h2>
                {activeSection === 'whyUse' && (
                    <ul>
                        <li><strong>Data-Driven Insights:</strong> Uncover hidden patterns and correlations in the data affecting delays and fare pricing.</li>
                        <li><strong>Optimized Operations:</strong> Improve scheduling and resource allocation by understanding the root causes of delays.</li>
                        <li><strong>Competitive Advantage:</strong> Set competitive fares by understanding market dynamics and customer behavior.</li>
                        <li><strong>Cost Efficiency:</strong> Manage costs and maximize revenue by making informed decisions regarding delays and pricing.</li>
                    </ul>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('team')}>Our Team</h2>
                {activeSection === 'team' && (
                    <p>
                        The <strong>X-Airlines Flight Delay & Fare Prediction System</strong> was developed by a team of data scientists, software engineers, and aviation experts dedicated to helping X-Airlines enhance its operational efficiency and customer service. We continue to collaborate closely with X-Airlines to enhance the system, integrate new data sources, and deliver more powerful predictive insights.
                    </p>
                )}
            </section>

            <section>
                <h2 onClick={() => toggleSection('contact')}>Contact Us</h2>
                {activeSection === 'contact' && (
                    <p>
                        For support or inquiries, please reach out to our team at <a href="mailto:support@x-airlines.com">support@x-airlines.com</a> or contact your internal IT support for assistance.
                    </p>
                )}
            </section>
        </div>
    );
};

export default About;
