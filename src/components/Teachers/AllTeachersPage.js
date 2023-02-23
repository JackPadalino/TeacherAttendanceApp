import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import CreateTeacherForm from './CreateTeacherForm';

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

const AllTeachersPage = () => {
    const { allUsers } = useSelector((state) => state.user);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
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
                <h1 style={headingStyle}>All teachers</h1>
                {showButton && <button style={buttonStyle} onClick={showHideButton}>Add a teacher</button>}
                {showForm && <CreateTeacherForm setShowForm={setShowForm} setShowButton={setShowButton}/>}
            </div>
            <div>
                {allUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <Link to={`/teachers/${user.id}`}>{user.firstName} {user.lastName}</Link>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default AllTeachersPage;