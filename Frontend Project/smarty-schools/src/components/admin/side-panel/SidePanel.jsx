import { useAuth } from "@/hooks/useAuth";
import { RiNotification4Fill } from "react-icons/ri";
import { Avatar, UpcomingEvents } from "@/components";

const SidePanel = () => {
    const { user } = useAuth();

    return (
        <div className="side-panel_container">
            <div
                className="d-flex rounded-3 bg-light gap-3 p-4 shadow-sm"
                style={{ minHeight: "100px" }}>
                <RiNotification4Fill
                    className="text-danger cursor-pointer"
                    title="Notifications"
                />
                <div className="d-flex align-items-center flex-1 gap-2">
                    <Avatar
                        src="/images/icons/icon-person.svg"
                        size={50}
                        className="border-3 text-secondary border"
                        alt={`${user.name} ${user.surname}`}
                        title={`${user.name} ${user.surname}`}
                    />
                    <div className="d-flex flex-column justify-content-center">
                        <p className="m-0">
                            {user.name} {user.surname}
                        </p>
                        <p
                            className="text-info m-0"
                            style={{ fontSize: "0.8rem" }}>
                            @{user.username}
                        </p>
                    </div>
                </div>
            </div>
            <UpcomingEvents />
        </div>
    );
};

export default SidePanel;
