import { getMessagesByPage } from "@/api/message-services";
import { CustomPagination, CustomTable } from "@/components";
import { messageHeaders, messageTableContent } from "@/constants/constants";
import { swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";

const MessagesPage = () => {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getMessagesByPage(currentPage - 1, pageSize);
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
            <div
                className="w-100 d-flex flex-column align-items-center"
                style={{ maxWidth: "100%" }}>
                <CustomTable
                    content={messageTableContent}
                    currentPage={currentPage}
                    data={data?.content}
                    headers={messageHeaders}
                    id="email"
                    loading={loading}
                    pageSize={pageSize}
                    title="Message"
                    isMessage
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

export default MessagesPage;
