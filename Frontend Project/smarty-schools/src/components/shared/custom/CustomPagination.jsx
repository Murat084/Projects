import { Button, Form } from "react-bootstrap";
import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";

const CustomPagination = ({
    changeItemsPerPage,
    currentPage,
    itemsPerPage,
    onPageChange,
    totalItems,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const renderPageNumber = (index) => (
        <Button
            key={index}
            variant={index === currentPage ? "secondary" : "success"}
            onClick={() => onPageChange(index)}
            className="rounded-circle text-light fw-bold cursor-pointer"
            style={{ width: 40, height: 40 }}
            title={`Go To Page ${index}`}
            disabled={index === currentPage}>
            {index}
        </Button>
    );

    let items = [];

    // always add the first page
    items.push(renderPageNumber(1));

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // add ellipses if there are skipped pages between the first page and the start page
    if (startPage > 2) {
        items.push(
            <span key="left-ellipsis" className="mx-2">
                ...
            </span>
        );
    }

    // add middle pages
    for (let index = startPage; index <= endPage; index++) {
        items.push(renderPageNumber(index));
    }

    // add ellipses if there are skipped pages between the endPage and the last page
    if (endPage < totalPages - 1) {
        items.push(
            <span key="right-ellipsis" className="mx-2">
                ...
            </span>
        );
    }

    // always add the last page, if there are more than 1 page
    if (totalPages > 1) {
        items.push(renderPageNumber(totalPages));
    }

    const handlePageSizeChange = (e) => {
        changeItemsPerPage(parseInt(e.target.value, 10));
        // reset to first page after changing page size
        onPageChange(1);
    };

    return (
        <div className="custom-pagination_container d-flex justify-content-end w-100 p-4">
            <Form.Group controlId="pageSizeSelect">
                <Form.Select
                    value={itemsPerPage}
                    onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </Form.Select>
            </Form.Group>
            <div className="d-flex fs-5 align-items-center">
                <button
                    type="button"
                    title="Go To First Page"
                    className="d-flex border-0 bg-transparent"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}>
                    <IoCaretBack />
                    <IoCaretBack style={{ marginLeft: "-10px" }} />
                </button>
                <button
                    type="button"
                    title="Go To Previous Page"
                    className="d-flex border-0 bg-transparent"
                    onClick={() => onPageChange((prev) => prev - 1)}
                    disabled={currentPage === 1}>
                    <IoCaretBack />
                </button>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
                {items}
            </div>
            <div className="d-flex fs-5 align-items-center">
                <button
                    type="button"
                    title="Go To Next Page"
                    className="d-flex border-0 bg-transparent"
                    onClick={() => onPageChange((prev) => prev + 1)}
                    disabled={currentPage === totalPages}>
                    <IoCaretForwardOutline />
                </button>
                <button
                    type="button"
                    title="Go To Last Page"
                    className="d-flex border-0 bg-transparent"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}>
                    <IoCaretForwardOutline />
                    <IoCaretForwardOutline style={{ marginLeft: "-10px" }} />
                </button>
            </div>
        </div>
    );
};

export default CustomPagination;
