import { convertTimeToHourMinute, truncateString } from "@/utils/functions";
import { useState } from "react";
import { Form } from "react-bootstrap";

const TableSelect = ({ content, data, headers, id, onSelectionChange }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const onCheckboxChange = (event, rowId) => {
        event.stopPropagation(); // Prevents the row from being selected
        toggleRowSelection(rowId);
    };

    const onHeaderCheckboxChange = (event) => {
        selectAllRows(event.target.checked);
    };

    const onRowSelect = (event) => {
        // to get the row id inside attribute data-row-id, we use dataset.rowId
        const rowId = event.currentTarget.dataset.rowId;
        toggleRowSelection(rowId);
    };

    const selectAllRows = (isSelected) => {
        if (isSelected) {
            updateSelection(
                data.map((item) => item.lessonProgramId.toString())
            );
        } else {
            updateSelection([]);
        }
    };

    const toggleRowSelection = (rowId) => {
        updateSelection(
            selectedRows.includes(rowId)
                ? selectedRows.filter((id) => id !== rowId)
                : [...selectedRows, rowId]
        );
    };

    const updateSelection = (newSelectedRows) => {
        setSelectedRows(newSelectedRows);
        if (onSelectionChange) {
            onSelectionChange(newSelectedRows);
        }
    };

    const allSelected = data.length > 0 && selectedRows.length === data.length;

    return (
        <div className="table-select_container">
            <div className="table-select_inner-container">
                <div className="table-select_head">
                    <div className="table-select_row">
                        <div className="table-select_column">
                            <Form.Check
                                checked={allSelected}
                                onChange={onHeaderCheckboxChange}
                            />
                        </div>
                        {headers.map((header, index) => (
                            <div className="table-select_column" key={index}>
                                {header.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="table-select_body">
                    {data && data.length > 0 ? (
                        data.map((item) => {
                            const isSelected = selectedRows.includes(
                                item.lessonProgramId.toString()
                            );

                            const rowClass = isSelected ? "selected" : "";

                            return (
                                <div
                                    className={`table-select_row cursor-pointer ${rowClass}`}
                                    key={item[id]}
                                    onClick={onRowSelect}
                                    // data-rowId is not a valid attribute for div element so we use data-row-id instead
                                    data-row-id={item.lessonProgramId}>
                                    <div className="table-select_column">
                                        <Form.Check
                                            checked={isSelected}
                                            onChange={(e) =>
                                                onCheckboxChange(
                                                    e,
                                                    item.lessonProgramId.toString()
                                                )
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="table-select_column">
                                        {item[content[0]]
                                            ? truncateString(
                                                  item[content[0]]
                                                      .map(
                                                          (lesson) =>
                                                              lesson.lessonName
                                                      )
                                                      .join(", ")
                                              )
                                            : ""}
                                    </div>
                                    <div className="table-select_column">
                                        {item[content[1]]
                                            ? truncateString(
                                                  item[content[1]]
                                                      .map(
                                                          (teacher) =>
                                                              `${teacher.name} ${teacher.surname}`
                                                      )
                                                      .join(", "),
                                                  16
                                              )
                                            : ""}
                                    </div>
                                    <div className="table-select_column">
                                        {item[content[2]]}
                                    </div>
                                    <div className="table-select_column">
                                        {convertTimeToHourMinute(
                                            item[content[3]]
                                        )}
                                    </div>
                                    <div className="table-select_column">
                                        {convertTimeToHourMinute(
                                            item[content[4]]
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 w-100">
                            No data found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableSelect;
