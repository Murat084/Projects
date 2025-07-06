import { useAuth } from "@/hooks/useAuth";
import { Col, Row } from "react-bootstrap";
import { Avatar } from "@/components";

const UserCard = () => {
    const { user } = useAuth();

    return (
        <Row className="user-card_container bg-light shadow-sm">
            <Col className="user-card_avatar">
                <Avatar
                    src="/images/icons/icon-person.svg"
                    className="border-3 text-secondary cursor-pointer border"
                    alt={`${user?.name} ${user?.surname}`}
                    title={`${user?.name} ${user?.surname}`}
                />
            </Col>
            <Col className="user-card_content-container">
                <div>
                    <div className="user-card_content">
                        <h3>TITLE :</h3>
                        <p>{user?.role}</p>
                    </div>
                    <div className="user-card_content">
                        <h3>NAME :</h3>
                        <p>
                            {user?.name} {user?.surname}
                        </p>
                    </div>
                    <div className="user-card_content">
                        <h3>USERNAME :</h3>
                        <p>@{user?.username}</p>
                    </div>
                </div>
            </Col>
            <span className="user-card_id">{user?.id}</span>
        </Row>
    );
};

export default UserCard;
