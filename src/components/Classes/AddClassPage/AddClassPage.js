import React,{ useState } from 'react';
import { NotFoundPage } from "../..";
import { CreateClassForm } from ".";

const AddClassPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <CreateClassForm/>
        </div>
    );
};

export default AddClassPage;