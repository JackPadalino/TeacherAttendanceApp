import React,{ useState } from 'react';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { TeacherSelect,LetterDaysSelect } from '.'

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { scheduleAbsentUser,scheduleLetterDay } = useSelector((state) => state.schedule);

    if(!token) return <NotFoundPage/>
    return (
        <>
            <h1>Teacher schedules</h1>
            <TeacherSelect/>
            <LetterDaysSelect/>
            {scheduleAbsentUser.id && <div key={scheduleAbsentUser.id}>
                <ul>
                    {scheduleAbsentUser.classes.map((eachClass) =>{
                        return (
                            eachClass.letterDays.includes(scheduleLetterDay) && <li key={eachClass.id}>{eachClass.name} - {eachClass.period}</li>
                        )
                    })}
                </ul>
            </div>}
        </>
    );
};

export default SchedulePage;