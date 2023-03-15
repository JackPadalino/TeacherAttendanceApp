import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { NotFoundPage } from "../..";
import { setAllClasses } from "../../../store/classSlice";
import { SchoolSelect, GradeSelect, PeriodSelect, LetterDaysSelect, TeacherSelect } from ".";
import { 
    Box,
    Grid,
    Container,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    Button,
    ListItemText,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    FormGroup,
    FormLabel,
    Item,
    FormControlLabel,
    Checkbox,
    IconButton,
    Modal
} from '@mui/material';

const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'10px'
};

const SingleClassPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUsers } = useSelector((state) => state.user);

    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    const [users,setUsers] = useState([]);
    const [userId,setUserId] = useState('')

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [loading,setLoading] = useState(true);
    const [successMessage,setSuccessMessage] = useState(false);
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);

    const fetchClass = async() =>{
        setLoading(true);
        const foundClass = await axios.get(`/api/classes/${id}`);
        setClassName(foundClass.data.name);
        setSchool(foundClass.data.school);
        setGrade(foundClass.data.grade);
        setPeriod(foundClass.data.period);
        setLetterDays(foundClass.data.letterDays);
        setUsers(foundClass.data.users);
        setLoading(false);
    };

    useEffect(() => {
        fetchClass();
      }, []);

    const updateClass = async(event) =>{
        event.preventDefault();
        const body = {
            className,
            school,
            grade,
            period,
            letterDays,
            userId
        };
        await axios.put(`/api/classes/${id}`,body);
        const updatedClass = await axios.get(`/api/classes/${id}`);
        setClassName(updatedClass.data.name);
        setSchool(updatedClass.data.school);
        setGrade(updatedClass.data.grade);
        setPeriod(updatedClass.data.period);
        setLetterDays(updatedClass.data.letterDays);
        setUsers(updatedClass.data.users);
        
        const allClasses = await axios.get(`/api/classes`);
        dispatch(setAllClasses(allClasses.data));
        setSuccessMessage(true);
    };

    const handleNameChange = (event) =>{
        setClassName(event.target.value);
    };

    const handleSchoolChange = (event) =>{
        setSchool(event.target.value);
    };

    const handleGradeChange = (event) =>{
        setGrade(event.target.value);
    };

    const handlePeriodChange = (event) =>{
        setPeriod(event.target.value);
    };

    // adding a letter day to the letterDays array if not present or removing if present
    const handleLetterDaysChange =(event)=>{
        if(letterDays.includes(event.target.value)){
            setLetterDays(letterDays.filter(day=>day!==event.target.value))
        }else{
            setLetterDays([...letterDays,event.target.value]);
        };
    };

    const handleTeacherChange = (event) =>{;
        setUserId(event.target.value);
    };

    const confirmDelete = () =>{
        confirmDeleteMessage ? setConfirmDeleteMessage(false) : setConfirmDeleteMessage(true);
    };

    const deleteClass = async()=> {
        await axios.delete(`/api/classes/${id}`);
        const updatedClasses = await axios.get('/api/classes');
        dispatch(setAllClasses(updatedClasses.data));
        navigate('/classes');
    };

    if(!token) return <NotFoundPage/>
    if(loading) return <p>Loading...</p>
    return (
        <>
            <Typography variant="h3" sx={{fontFamily:"Montserrat"}}>{className}</Typography>
            <form onSubmit={updateClass} style={formStyle}>
                <TextField id="outlined-basic" label="Class name" variant="outlined" value={className} onChange={handleNameChange}/>
                <SchoolSelect school={school} handleSchoolChange={handleSchoolChange}/>
                <GradeSelect grade={grade} handleGradeChange={handleGradeChange}/>
                <PeriodSelect period={period} handlePeriodChange={handlePeriodChange}/>
                <LetterDaysSelect letterDays={letterDays} handleLetterDaysChange={handleLetterDaysChange}/>
                <div>
                    <label htmlFor='teachers'>Teachers</label>
                    <ul name='teachers'>
                        {users.map((user) => {
                        return (
                            <li key={user.id} value={user.id}>{user.fullName}</li>
                            );
                        })}
                    </ul>
                </div>
                <TeacherSelect handleTeacherChange={handleTeacherChange}/>
                <button type='submit' style={{width:'56px'}}>Update</button>
            </form>
            {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully updated.</p>}
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this class?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteClass()}>Delete</button>}
        </>
    );
};

export default SingleClassPage;