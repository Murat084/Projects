import { deleteTeacher, getTeachersByPage } from "@/api/teacher-services";
import { CustomPagination, CustomTable } from "@/components";
import { adminTableContent, adminTableHeaders } from "@/constants/constants";
import { swalQuestion, swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherManagementPage = () => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        swalQuestion("Are you sure you want to delete this teacher?").then(
            async (response) => {
                if (response.isConfirmed) {
                    try {
                        await deleteTeacher(id);
                        swalToast("Teacher deleted successfully", "success");
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
            }
        );
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getTeachersByPage(currentPage - 1, pageSize);
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
                    onClick={() => navigate("new-teacher")}
                    variant="secondary"
                    className="fw-bold text-light btn-wide">
                    Create New Teacher
                </Button>
            </div>
            <div
                className="w-100 d-flex flex-column align-items-center"
                style={{ maxWidth: "100%" }}>
                <CustomTable
                    content={adminTableContent}
                    currentPage={currentPage}
                    data={data?.content}
                    handleDelete={handleDelete}
                    headers={adminTableHeaders}
                    id="userId"
                    isDelete={true}
                    isEdit={true}
                    loading={loading}
                    pageSize={pageSize}
                    title="Teacher"
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

export default TeacherManagementPage;
