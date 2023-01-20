import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";

const pageStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'20px'
};

const headingStyle={
    marginBottom:'0px'
};

const linkStyle={
    fontSize:'15px'
};

const AllTeachersPage = () => {
    const { allUsers } = useSelector((state) => state.user);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div style={pageStyle}>
            <div>
                <h1 style={headingStyle}>All teachers</h1>
                <Link to={`/teachers/add-teacher`} style={linkStyle}>Add a teacher</Link>
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