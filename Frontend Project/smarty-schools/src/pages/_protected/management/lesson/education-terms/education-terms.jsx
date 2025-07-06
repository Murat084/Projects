import {
    deleteEducationTerm,
    getEducationTermsByPage,
} from "@/api/education-term-services";
import {
    CustomPagination,
    CustomTable,
    LessonManagementButtons,
} from "@/components";
import {
    educationTermHeaders,
    educationTermTableContent,
} from "@/constants/constants";
import { swalQuestion, swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EducationTermsPage = () => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        swalQuestion(
            "Are you sure you want to delete this education term?"
        ).then(async (response) => {
            if (response.isConfirmed) {
                try {
                    await deleteEducationTerm(id);
                    swalToast("Education term deleted successfully", "success");
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
            const response = await getEducationTermsByPage(
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
            <LessonManagementButtons />
            <div className="d-flex justify-content-end">
                <Button
                    onClick={() =>
                        navigate(
                            "/dashboard/lesson-management/new-education-term"
                        )
                    }
                    variant="secondary"
                    className="fw-bold text-light btn-wide">
                    Create New Education Term
                </Button>
            </div>
            <div
                className="w-100 d-flex flex-column align-items-center"
                style={{ maxWidth: "100%" }}>
                <CustomTable
                    content={educationTermTableContent}
                    currentPage={currentPage}
                    data={data?.content}
                    handleDelete={handleDelete}
                    headers={educationTermHeaders}
                    id="id"
                    isDelete={true}
                    loading={loading}
                    pageSize={pageSize}
                    title="Education Term"
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

export default EducationTermsPage;
