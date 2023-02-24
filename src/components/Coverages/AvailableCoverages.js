import axios from 'axios';
import React, { useRef,useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from "..";

const AvailableCoverages = () => {
    const { classId,school,period,letterDay } = useParams();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allUsers } = useSelector((state) => state.user);
    const { allAbsentUsers,coverageDay } = useSelector((state) => state.coverage);
    const [thisClass,setThisClass] = useState({});
    let [thisClassUserIds,setThisClassUserIds] = useState([]);
    let [teamMeetingUserIds,setTeamMeetingUserIds] = useState([]);
    const [allAvailableUsers,setAllAvailableUsers] = useState([]);
    const [coveringUserIds,setCoveringUserIds] = useState([]);
    
    const fetchAvailableCoverages = async() => {
        // fetching the class that needs coverage
        const thisClass = await axios.get(`/api/classes/${classId}`);
        setThisClass(thisClass.data);
        // finding what teachers already have this class assigned to them (finding teachers and coteachers)
        // making an array of the user ids for all co teachers of this class
        const thisClassUsers = thisClass.data.users;
        thisClassUserIds = thisClassUsers.map((user)=>user.id);
        // fetching an array of all classes happening at this time
        let allClasses = await axios.get(`/api/classes/${school}/${period}/${letterDay}`);
        allClasses = allClasses.data;
        // making an array of the classes that are not team meetings
        const contentClasses = allClasses.filter((eachClass)=>eachClass.name!=='Team meeting');
        // creating an array of all users that are not co teachers of this class and are not in team meetings --> are busy teaching
        let unAvailableUsers = contentClasses.flatMap(eachClass => eachClass.users);
        unAvailableUsers = unAvailableUsers.filter((user)=>!thisClassUserIds.includes(user.id));
        // combining unavailable teachers with absent teachers
        unAvailableUsers = [...allAbsentUsers,...unAvailableUsers];
        // making an array of all unavailable teacher ids
        const allUnAvailableUserIds = unAvailableUsers.map((user)=>user.id);
        // filtering the id's of the this class's teachers again now that we have accounted for absent co teachers
        thisClassUserIds = thisClassUserIds.filter((id)=>!allUnAvailableUserIds.includes(id));
        setThisClassUserIds(thisClassUserIds);
        // making an array of teachers that are not teaching that period but are in a team meeting
        const teamMeetings = allClasses.filter(eachClass=>eachClass.name==='Team meeting');
        const teamMeetingUsers = teamMeetings.flatMap(eachMeeting => eachMeeting.users);
        teamMeetingUserIds = teamMeetingUsers.map(user=>user.id)
        setTeamMeetingUserIds(teamMeetingUserIds);
        // comparing the two user id arrays and making a final array of available user ids
        const availableUsers = allUsers.filter(user => !allUnAvailableUserIds.includes(user.id));
        setAllAvailableUsers(availableUsers);
    };
    
    // creating an array of ID's of teachers covering this class on this letter day
    const fetchCoverages = async() =>{
        const response = await axios.get('/api/coverages');
        const thisClassCoverages = response.data.filter(coverage=>coverage.classId===Number(classId) && coverage.dayId===coverageDay.id);
        const userIds = thisClassCoverages.flatMap(eachCoverage => eachCoverage.userId);
        setCoveringUserIds(userIds);
    };

    
    useEffect(() => {
        fetchAvailableCoverages();
        fetchCoverages();
    }, []);

    const updateCoverages = async(event) => {
        const body = {
            classId,
            dayId:coverageDay.id,
            userIds:coveringUserIds
        };
        await axios.post('/api/coverages',body);
    };

    // adding a letter day to the letterDays array if not present or removing if present
    const handleCoveringUsersChange =(event)=>{
        let updatedCoverageUserIds;
        const newUserId = +event.target.value;
        if(!coveringUserIds.includes(newUserId)){
            updatedCoverageUserIds = [...coveringUserIds,newUserId];
        }else{
            updatedCoverageUserIds = coveringUserIds.filter(userId=>userId!==newUserId);
        };
        setCoveringUserIds(updatedCoverageUserIds);
    };
    
    if(!token) return <NotFoundPage/>
    return (
        <>
            <h1>Available coverages for {thisClass.school} {thisClass.name}{thisClass.grade} - Period {thisClass.period} - {letterDay} day</h1>
            <button onClick={updateCoverages}>Assign coverages</button>
            <div>
                {allAvailableUsers.map((user) => {
                    return (
                        (user.role==='teacher' || user.role==='gangster') && <div key={user.id}>
                            <div style={{display:'flex'}}>
                                {thisClassUserIds.includes(user.id) && <p style={{'color':'red'}}><i>{user.firstName} {user.lastName} - Co-teacher</i></p>}
                                {teamMeetingUserIds.includes(user.id) && <p style={{'color':'green'}}><i>{user.firstName} {user.lastName} - In a team meeting</i></p>}
                                {!thisClassUserIds.includes(user.id) && !teamMeetingUserIds.includes(user.id) && <p>{user.firstName} {user.lastName}</p>}
                                {coveringUserIds.includes(user.id) ?
                                <input type='checkbox' value={user.id} onChange={handleCoveringUsersChange} checked={true}/> :
                                <input type='checkbox' value={user.id} onChange={handleCoveringUsersChange}/>}

                            </div>
                            <ul>
                                {user.classes.map((eachClass)=>{
                                    return (
                                        eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}>{eachClass.name} - P{eachClass.period}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default AvailableCoverages;
