import {
    deleteStudentInfo,
    getStudentInfosForTeacher,
} from "@/api/student-info-services";
import { CustomPagination, CustomTable } from "@/components";
import {
    studentInfoTableContent,
    studentInfoTableHeaders,
} from "@/constants/constants";
import { swalQuestion, swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentInfoManagementPage = () => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        swalQuestion(
            "Are you sure you want to delete this student information?"
        ).then(async (response) => {
            if (response.isConfirmed) {
                try {
                    await deleteStudentInfo(id);
                    swalToast(
                        "Student information deleted successfully",
                        "success"
                    );
                    // refetch the data after delete
                    fetchData();
                } catch (error) {
                    let message = error.response?.data?.message;
                    if (message === "No message available") {
                        message = "Something went wrong";
                    }
                    swalToast(message, "error");
                }
            }
        });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getStudentInfosForTeacher(
                currentPage - 1,
                pageSize
            );
            setData(response.data);
        } catch (error) {
            let message = error.response?.data?.message;
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


    return (
        <div className="d-flex flex-column w-100 gap-4">
            <div className="d-flex justify-content-end">
                <Button
                    onClick={() => navigate("new-student-info")}
                    variant="secondary"
                    className="fw-bold text-light btn-wide">
                    Create New Student Information
                </Button>
            </div>
            <div
                className="w-100 d-flex flex-column align-items-center"
                style={{ maxWidth: "100%" }}>
                <CustomTable
                    content={studentInfoTableContent}
                    currentPage={currentPage}
                    data={data?.content}
                    handleDelete={handleDelete}
                    headers={studentInfoTableHeaders}
                    id="id"
                    isDelete={true}
                    isEdit={true}
                    loading={loading}
                    pageSize={pageSize}
                    title="Student Information"
                />
                <CustomPagination
                    changeItemsPerPage={setPageSize}
                    currentPage={currentPage}
                    itemsPerPage={pageSize}
                    onPageChange={setCurrentPage}
                    totalItems={data ? data.totalElements : 0}
                />
            </div>
        </div>
    );
};

export default StudentInfoManagementPage;
