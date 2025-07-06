import {
    getLessonPrograms,
    getLessonProgramsForStudent,
} from "@/api/lesson-program-services";
import { chooseLesson } from "@/api/student-services";
import { CustomTable, TableSelect } from "@/components";
import {
    chooseLessonSelectedProgramsHeaders,
    chooseLessonTableContent,
    chooseLessonTableHeaders,
} from "@/constants/constants";
import { swalToast } from "@/utils/functions";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const ChooseLessonPage = () => {
    const [data, setData] = useState(null);
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [selectedLessonPrograms, setSelectedLessonPrograms] = useState([]);

    const handleSelectionChange = (selectedRows) => {
        setSelectedLessons(selectedRows);
    };

    const fetchData = async () => {
        try {
            const response = await getLessonPrograms();
            setData(response.data);
            const responseLessonPrograms = await getLessonProgramsForStudent();
            setSelectedLessonPrograms(responseLessonPrograms.data);
        } catch (error) {
            let message = error.response?.data?.message || error.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const onSubmit = async () => {
        const payload = {
            lessonProgramId: selectedLessons,
        };
        try {
            await chooseLesson(payload);
            swalToast("You have successfully selected lessons!", "success");
            // refecth data
            const responseLessonPrograms = await getLessonProgramsForStudent();
            setSelectedLessonPrograms(responseLessonPrograms.data);
        } catch (error) {
            let message = error.response?.data?.message || error.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="d-flex flex-column gap-4">
            <div className="w-100">
                <h2 className="fw-bold text-secondary p-4">Lesson Programs</h2>
                <TableSelect
                    content={chooseLessonTableContent}
                    data={data || []}
                    headers={chooseLessonTableHeaders}
                    id="lessonProgramId"
                    onSelectionChange={handleSelectionChange}
                />
                <div className="d-flex justify-content-end mt-3">
                    <Button
                        onClick={onSubmit}
                        type="button"
                        variant="secondary"
                        className="fw-bold text-light btn-wide">
                        Save Selected Lessons
                    </Button>
                </div>
            </div>
            <div className="w-100 mb-5">
                <h2 className="fw-bold text-secondary p-4">
                    Selected Programs
                </h2>
                <CustomTable
                    content={chooseLessonTableContent}
                    currentPage={1}
                    data={selectedLessonPrograms}
                    headers={chooseLessonSelectedProgramsHeaders}
                    id="lessonProgramId"
                    pageSize={50}
                    title="Selected Programs"
                />
            </div>
        </div>
    );
};

export default ChooseLessonPage;
