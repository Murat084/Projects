import { getAdmins } from "@/api/admin-services";
import { getAdvisorTeachers } from "@/api/advisor-teacher-services";
import { getViceDeans } from "@/api/assistant-manager-services";
import { getEducationTerms } from "@/api/education-term-services";
import { getGuestUsersByPage } from "@/api/guest-user-services";
import { getLessonPrograms } from "@/api/lesson-program-services";
import { getLessons } from "@/api/lesson-services";
import { getDeans } from "@/api/manager-services";
import { getMeetings } from "@/api/meeting-services";
import { getStudents } from "@/api/student-services";
import { getTeachers } from "@/api/teacher-services";
import { StatsCard, UserCard } from "@/components";
import { dashboardData } from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const apiCallsByRole = {
    ADMIN: [
        getAdmins,
        getTeachers,
        getStudents,
        getDeans,
        getViceDeans,
        getMeetings,
        getLessons,
        getAdvisorTeachers,
        getEducationTerms,
        getGuestUsersByPage,
        getLessonPrograms,
    ],
    MANAGER: [
        getTeachers,
        getStudents,
        getDeans,
        getViceDeans,
        getMeetings,
        getLessons,
        getAdvisorTeachers,
        getEducationTerms,
        getGuestUsersByPage,
    ],
    ASSISTANT_MANAGER: [
        getTeachers,
        getStudents,
        getDeans,
        getViceDeans,
        getMeetings,
        getLessons,
        getAdvisorTeachers,
        getEducationTerms,
        getGuestUsersByPage,
    ],
    TEACHER: [getStudents, getLessons, getEducationTerms, getLessonPrograms],
    STUDENT: [getLessonPrograms],
};

const DashboardPage = () => {
    const [data, setData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const apiCalls = apiCallsByRole[user?.role] || [];

        if (apiCalls.length > 0) {
            Promise.all(apiCalls.map((call) => call()))
                .then((responses) => {
                    const newData = responses.map((response) => {
                        if (response.data) {
                            return {
                                count:
                                    response.data.totalElements ||
                                    response.data.length,
                            };
                        }
                    });
                    setData(newData);
                })
                .catch((error) => {
                    console.log("Dashboard error: ", error);
                });
        }
    }, [user?.role]);

    return (
        <Container fluid>
            <UserCard />
            <Row xs={2} sm={3} xl={2} xxl={3}>
                {dashboardData.reduce((acc, item, index) => {
                    if (!item.roles?.includes(user?.role)) {
                        // skip this item without incrementing the index
                        return acc;
                    }
                    // render the stats card and increment the index
                    acc.push(
                        <Col
                            key={index}
                            className="d-flex justify-content-center p-0">
                            <div className="w-100 h-100 p-1">
                                <StatsCard
                                    title={item.title}
                                    count={data[acc.length]?.count}
                                    icon={item.icon}
                                />
                            </div>
                        </Col>
                    );

                    return acc;
                }, [])}
            </Row>
        </Container>
    );
};

export default DashboardPage;
