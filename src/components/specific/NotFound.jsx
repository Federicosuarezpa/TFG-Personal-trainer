import '../../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">¡Ups! The requested URL was not found on this server.</p>
                <a href="/" className="not-found-link">Back to home</a>
            </div>
        </div>
    );
};

export default NotFound;
