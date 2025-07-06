const EventCard = ({ day, description, date, variant }) => {
    return (
        <div
            className={`upcoming-events_card rounded-3 p-3 shadow-sm border-${variant} bg-${variant}-subtle fw-normal d-flex flex-column gap-3`}>
            <h4 className="fs-6 fw-bold m-0">{day}</h4>
            <p className="m-0 fst-italic">{description}</p>
            <p className="m-0 text-end">{date}</p>
        </div>
    );
};

export default EventCard;
