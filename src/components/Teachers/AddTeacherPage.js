import React,{ useState } from 'react';
import { NotFoundPage } from "..";
import { CreateTeacherForm } from ".";

const AddTeachersPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <CreateTeacherForm/>
        </div>
    );
};

export default AddTeachersPage;