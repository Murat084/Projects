import { calculateOrder, truncateString } from "@/utils/functions";
import { Button, Spinner } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CustomTable = ({
    content,
    currentPage,
    data,
    handleDelete,
    headers,
    id,
    isDelete,
    isEdit,
    loading,
    pageSize,
    title,
    isMessage,
}) => {
    const handleRowClick = (index) => {
        if (!isMessage) return;

        return Swal.fire({
            html: `<div>
            <p class='text-secondary text-end text-sm fst-italic'>${data[index].email}</p>
            <h2>${data[index].subject}</h2>
            <p class='text-secondary text-start'>${data[index].message}</p>
            </div>`,
        });
    };

    return (
        <div className="custom-table_container">
            <div className="custom-table_inner-container">
                <div className="custom-table_head">
                    <div className="custom-table_row">
                        {headers &&
                            headers.map((header, index) => (
                                <div
                                    key={index}
                                    className={`custom-table_column ${
                                        index === headers.length - 1 &&
                                        (isEdit || isDelete)
                                            ? "custom-table_buttons"
                                            : ""
                                    }`}>
                                    {header.title}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="custom-table_body">
                    {loading ? (
                        <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                            <Spinner
                                animation="border"
                                style={{ width: "3rem", height: "3rem" }}
                                variant="secondary"
                            />
                        </div>
                    ) : data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                className={`custom-table_row ${
                                    isMessage ? "cursor-pointer" : ""
                                }`}
                                key={`${item.email}${index}`}
                                onClick={() => handleRowClick(index)}>
                                <div className="custom-table_column">
                                    {calculateOrder(
                                        pageSize,
                                        currentPage,
                                        index
                                    )}
                                </div>
                                {content.map((_, index) => (
                                    <div
                                        key={index}
                                        className="custom-table_column">
                                        {truncateString(
                                            item[content[index]],
                                            16
                                        )}
                                    </div>
                                ))}
                                {isEdit || isDelete ? (
                                    <div className="custom-table_column custom-table_buttons">
                                        {/* inside Link, to attribute, content must be a string, otherwise it is not going to work */}
                                        {isEdit && (
                                            <Link to={`${item[id]}`}>
                                                <Button
                                                    type="button"
                                                    title={`Edit ${title}`}
                                                    className="text-light">
                                                    <TbEdit className="fs-5" />
                                                </Button>
                                            </Link>
                                        )}
                                        {isDelete && (
                                            <Button
                                                type="button"
                                                title={`Delete ${title}`}
                                                variant="danger"
                                                onClick={() =>
                                                    handleDelete(item[id])
                                                }>
                                                <MdDelete className="fs-5" />
                                            </Button>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        ))
                    ) : (
                        <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                            No data found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomTable;
