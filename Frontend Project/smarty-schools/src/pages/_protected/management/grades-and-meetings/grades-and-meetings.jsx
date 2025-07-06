import { getMeetingsForStudent } from "@/api/meeting-services";
import { getStudentInfosForStudent } from "@/api/student-info-services";
import { CustomPagination, CustomTable } from "@/components";
import {
    meetingsTableContent,
    meetingsTableHeaders,
    gradesTableHeaders,
    studentInfoTableContent,
} from "@/constants/constants";
import { swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";

const GradesAndMeetingsPage = () => {
    const [data, setData] = useState(null);
    const [meetingsData, setMeetingsData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getStudentInfosForStudent(
                currentPage - 1,
                pageSize
            );
            setData(response.data);
        } catch (error) {
            let message = error.response?.data?.message || error.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchMeetingsData = async () => {
        setLoading(true);
        try {
            const response = await getMeetingsForStudent();
            setMeetingsData(response.data);
        } catch (error) {
            let message = error.response?.data?.message || error.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchMeetingsData();
    }, []);

    return (
        <div className="d-flex flex-column gap-4">
            <div className="w-100">
                <h2 className="fw-bold text-secondary p-4">Grades</h2>
                <CustomTable
                    content={studentInfoTableContent}
                    currentPage={currentPage}
                    data={data?.content}
                    headers={gradesTableHeaders}
                    id="id"
                    loading={loading}
                    pageSize={pageSize}
                    title="Grades"
                />
                <CustomPagination
                    changeItemsPerPage={setPageSize}
                    currentPage={currentPage}
                    itemsPerPage={pageSize}
                    onPageChange={setCurrentPage}
                    totalItems={data ? data.totalElements : 0}
                />
            </div>
            <div className="w-100 mb-5">
                <h2 className="fw-bold text-secondary p-4">Meetings</h2>
                <CustomTable
                    content={meetingsTableContent}
                    currentPage={1}
                    data={meetingsData ?? []}
                    headers={meetingsTableHeaders}
                    id="id"
                    loading={loading}
                    pageSize={50}
                    title="Meetings"
                />
            </div>
        </div>
    );
};

export default GradesAndMeetingsPage;
