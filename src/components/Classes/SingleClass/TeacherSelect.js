import React from 'react';
import { useSelector } from "react-redux";

const TeacherSelect = ({handleTeacherChange}) => {
    const { allUsers } = useSelector((state) => state.user);

    return (
        <div>
            <label htmlFor="teacher">Add a teacher</label>
            <select name='teacher'onChange={handleTeacherChange}>
                <option value=''>-</option>
                {allUsers.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>{user.fullName}</option>
                    );
                })}
            </select>
        </div>
    );
};

export default TeacherSelect;