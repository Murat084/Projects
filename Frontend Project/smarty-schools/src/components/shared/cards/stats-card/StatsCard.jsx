import { Spinner } from "react-bootstrap";

const StatsCard = ({ title, count, icon }) => {
    return (
        <div className="stats-card_container bg-light shadow-sm">
            <div className="stats-card_outer-circle">
                <div className="stats-card_inner-circle">
                    <span className="bg-light">{icon}</span>
                </div>
            </div>
            <div className="stats-card_content">
                <h3>{title}</h3>
                <div className="stats-card_total">
                    {count || (
                        <Spinner animation="border" variant="secondary" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
