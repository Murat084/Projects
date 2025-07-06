import { EventCard } from "@/components";
import { eventCardData } from "@/constants/constants";
import { Button } from "react-bootstrap";

const buttonsArray = ["All", "Today", "Weekly", "Monthly"];

const UpcomingEvents = () => {
    return (
        <div className="upcoming-events_container d-flex flex-column rounded-3 bg-light flex-1 gap-3 p-3 shadow-sm">
            <h3 className="fs-5 fw-bold text-secondary">Upcoming Events</h3>
            <div className="d-flex justify-content-between gap-2">
                {buttonsArray.map((item) => (
                    <Button
                        key={item}
                        variant="secondary"
                        title={`${item} Upcoming Events`}
                        className="text-light fw-bold font-sm rounded-5 btn-tags">
                        {item}
                    </Button>
                ))}
            </div>
            <div className="d-flex flex-column flex-1 gap-3">
                {eventCardData.map((item) => (
                    <EventCard key={item._id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;
