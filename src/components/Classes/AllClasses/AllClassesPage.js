import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { useSelector } from "react-redux";

const pageStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'20px'
};

const headingStyle={
    marginBottom:'0px'
};

const AllClassesPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allClasses } = useSelector((state) => state.class);
    
    if(!token) return <NotFoundPage/>
    return (
        <div style={pageStyle}>
            <div>
                <h1 style={headingStyle}>All classes</h1>
                <Link to={'/classes/add-class'}>Add a class</Link>
            </div>
            <div>
                {allClasses.map((eachClass) => {
                    return (
                        <div key={eachClass.id}>
                            <Link to={`/classes/${eachClass.id}`}>{eachClass.name}</Link>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default AllClassesPage;