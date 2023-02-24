import React from 'react';
import { useSelector } from "react-redux";

const ClassSelect = ({handleClassChange}) => {
    const { allClasses } = useSelector((state) => state.class);

    return (
        <>
            <label htmlFor="classes">Add a class</label>
            <select name='classes' onChange={handleClassChange}>
                <option value=''>-</option>
                {allClasses.map((eachClass) => {
                    return (
                        eachClass.name!=='Team meeting' && <option key={eachClass.id} value={eachClass.id}>{eachClass.id} {eachClass.name} {eachClass.letterDays}</option>
                    );
                })}
            </select>
        </>
    );
};

export default ClassSelect;