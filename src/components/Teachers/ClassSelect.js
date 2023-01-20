import React from 'react';
import { useSelector } from "react-redux";

const ClassSelect = () => {
    const { allClasses } = useSelector((state) => state.class);

    return (
        <>
            <label htmlFor="classes">Add a class</label>
            <select name='classes'>
                <option value=''>-</option>
                {allClasses.map((eachClass) => {
                    return (
                        <option key={eachClass.id} value={eachClass.id}>{eachClass.name}</option>
                    );
                })}
            </select>
        </>
    );
};

export default ClassSelect;