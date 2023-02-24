import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { useSelector } from "react-redux";
import CreateClassForm from "./CreateClassForm";

const pageStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'20px'
};

const headingStyle={
    marginBottom:'0px'
};

const buttonStyle={
    all:'unset',
    cursor:'pointer',
    textDecoration:'underline',
    color:'blue'
};

const AllClassesPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allClasses } = useSelector((state) => state.class);
    const [showForm,setShowForm] = useState(false);
    const [showButton,setShowButton] = useState(true);

    const showHideButton = () =>{
        setShowForm(true);
        setShowButton(false);
    };
    
    if(!token) return <NotFoundPage/>
    return (
        <div style={pageStyle}>
            <div>
                <h1 style={headingStyle}>All classes</h1>
                {showButton && <button style={buttonStyle} onClick={showHideButton}>Add a class</button>}
                {showForm && <CreateClassForm setShowForm={setShowForm} setShowButton={setShowButton}/>}
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