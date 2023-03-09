import axios from 'axios';
import React, { useRef,useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from "..";
import{ setAllUsers } from '../../store/userSlice';
import { setAllCoverages,setTodaysCoverages } from "../../store/coverageSlice";

const AvailableCoverages = () => {
    const dispatch = useDispatch();
    const { classId,school,period,letterDay } = useParams();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allUsers } = useSelector((state) => state.user);
    const { allAbsentUsers,coverageDay,allCoverages,todaysCoverages } = useSelector((state) => state.coverage);
    const [thisClass,setThisClass] = useState({});
    const [thisClassUserIds,setThisClassUserIds] = useState([]);
    const thisClassCoverages = useRef([]);
    const [teamMeetingUserIds,setTeamMeetingUserIds] = useState([]);
    const [allAvailableUsers,setAllAvailableUsers] = useState([]);
    const [coveringUserIds,setCoveringUserIds] = useState([]);
    const [updatedMessage,setUpdatedMessage] = useState(false);
    
    const fetchAvailableCoverages = async() => {
        // fetching the class that needs coverage
        const thisClass = await axios.get(`/api/classes/${classId}`);
        setThisClass(thisClass.data);

        // finding what teachers already have this class assigned to them (finding teachers and coteachers)
        // making an array of the user ids for all co teachers of this class
        const thisClassUsers = thisClass.data.users;
        let classUserIds = thisClassUsers.map((user)=>user.id);

        // fetching an array of all classes happening at this time
        let allClasses = await axios.get(`/api/classes/${school}/${period}/${letterDay}`);
        allClasses = allClasses.data;

        // making an array of the classes that are not team meetings
        const contentClasses = allClasses.filter((eachClass)=>eachClass.name!=='Team meeting');

        // creating an array of all users that are not co teachers of this class and are not in team meetings --> are busy teaching
        let unAvailableUsers = contentClasses.flatMap(eachClass => eachClass.users);
        unAvailableUsers = unAvailableUsers.filter((user)=>!classUserIds.includes(user.id));

        // making an array of all unavailable teacher ids
        unAvailableUsers = [...allAbsentUsers,...unAvailableUsers];
        const allUnAvailableUserIds = unAvailableUsers.map((user)=>user.id);
        // filtering the id's of the this class's teachers again now that we have accounted for absent co teachers
        classUserIds = classUserIds.filter((id)=>!allUnAvailableUserIds.includes(id));
        setThisClassUserIds(classUserIds);

        // making an array of teachers that are not teaching that period but are in a team meeting
        const teamMeetings = allClasses.filter(eachClass=>eachClass.name==='Team meeting');
        const teamMeetingUsers = teamMeetings.flatMap(eachMeeting => eachMeeting.users);
        const meetingUserIds = teamMeetingUsers.map(user=>user.id)
        setTeamMeetingUserIds(meetingUserIds);

        // comparing the two user id arrays and making a final array of available user ids
        const availableUsers = allUsers.filter(user => !allUnAvailableUserIds.includes(user.id));
        setAllAvailableUsers(availableUsers);
    };
    
    // creating an array of ID's of teachers covering this class on this letter day
    const fetchCoverages = async() =>{
        thisClassCoverages.current = todaysCoverages.filter(coverage=>coverage.classId===classId && coverage.dayId===coverageDay.id);
        const userIds = thisClassCoverages.current.flatMap(eachCoverage => eachCoverage.userId);
        setCoveringUserIds(userIds);
    };

    useEffect(() => {
        fetchAvailableCoverages();
        fetchCoverages();
    }, [allUsers]);

    const updateCoverages = async (event) => {
        // deleting all coverages for this class today
        const deletedCoveragePromises = thisClassCoverages.current.map((coverage)=> axios.delete(`/api/coverages/${coverage.id}`));
        await Promise.all(deletedCoveragePromises);

        // creating new coverages if teachers have been selected
        if(coveringUserIds.length > 0){
            const newCoveragePromises = coveringUserIds.map((id)=>axios.post('/api/coverages',{classId:classId,dayId:coverageDay.id,userId:id}));
            await Promise.all(newCoveragePromises);
            
        };

        // updating the front end
        const [coveragesResponse, usersResponse] = await axios.all([
            axios.get('/api/coverages'),
            axios.get('/api/users'),
        ]);
        const { data: coverages } = coveragesResponse;
        const todaysCoverages = coverages.filter(
            (coverage) => coverage.dayId === coverageDay.id
        );
        const { data: users } = usersResponse;
        dispatch(setAllCoverages(coverages));
        dispatch(setTodaysCoverages(todaysCoverages));
        dispatch(setAllUsers(users));
        setUpdatedMessage(true);
    };

    // creating/updating a list of user id's when teachers are selected/deselected
    const handleCoveringUsersChange =(event)=>{
        let updatedCoveringUserIds;
        const newUserId = event.target.value;
        if(!coveringUserIds.includes(newUserId)){
            updatedCoveringUserIds = [...coveringUserIds,newUserId];
        }else{
            updatedCoveringUserIds = coveringUserIds.filter(userId=>userId!==newUserId);
        };
        setCoveringUserIds(updatedCoveringUserIds);
    };

    if(!token) return <NotFoundPage/>
    return (
        <>
            <h1>Available coverages for {thisClass.school} {thisClass.name}{thisClass.grade} - Period {thisClass.period} - {letterDay} day</h1>
            <button onClick={updateCoverages}>Update coverages</button>
            {updatedMessage && <p style={{ color: "green", marginTop: "10px" }}>Coverages for this class have been updated.</p>}
            <div>
                {allAvailableUsers.map((user) => {
                    return (
                        (user.role==='teacher' || user.role==='gangster') && <div key={user.id}>
                            <div style={{display:'flex'}}>
                                {thisClassUserIds.includes(user.id) && <p style={{'color':'red'}}><i>{user.firstName} {user.lastName} - Co-teacher - Total coverages: {user.coverages.length}</i></p>}
                                {teamMeetingUserIds.includes(user.id) && <p style={{'color':'green'}}><i>{user.firstName} {user.lastName} - In a team meeting - Total coverages: {user.coverages.length}</i></p>}
                                {!thisClassUserIds.includes(user.id) && !teamMeetingUserIds.includes(user.id) && <p>{user.firstName} {user.lastName} - Total coverages: {user.coverages.length}</p>}
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
