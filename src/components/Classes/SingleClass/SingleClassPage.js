import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { NotFoundPage } from "../..";
import { setAllClasses } from "../../../store/classSlice";
import { SchoolSelect, GradeSelect, PeriodSelect, LetterDaysSelect, TeacherSelect } from ".";
import { 
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    Button,
    ListItemText,
    IconButton,
    Modal
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { singleClassModal,successModal } from './style';
import "./style.css";

const formStyle = {
    display:'flex',
    flexDirection:'column',
    width:"400px",
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

    const [modalOpen, setModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

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
        handleSuccessModalOpen();
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

    const deleteClass = async()=> {
        await axios.delete(`/api/classes/${id}`);
        const updatedClasses = await axios.get('/api/classes');
        dispatch(setAllClasses(updatedClasses.data));
        navigate('/classes');
    };

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleSuccessModalOpen = () => setSuccessModalOpen(true);
    const handleSuccessModalClose = () => setSuccessModalOpen(false);

    if(!token) return <NotFoundPage/>
    if(loading) return <p>Loading...</p>
    return (
        <Box>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={singleClassModal}>
                    <Typography id="modal-modal-title" variant="h6" align="center">
                        Are you sure you want to delete this class?
                    </Typography>
                    <Button fullWidth variant="outlined" color="error" onClick={() => deleteClass()}>Delete</Button>
                </Box>
            </Modal>
            <Modal
                open={successModalOpen}
                onClose={handleSuccessModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={successModal}>
                    <Typography id="modal-modal-title" variant="h6" align="center">
                        This class has been updated!
                    </Typography>
                </Box>
            </Modal>
            <Typography variant="h3" sx={{fontFamily:"Montserrat"}}>{className}</Typography>
            <form onSubmit={updateClass} style={formStyle}>
                <TextField id="outlined-basic" label="Class name" variant="outlined" value={className} onChange={handleNameChange}/>
                <Box sx={{display:"flex"}}>
                    <SchoolSelect school={school} handleSchoolChange={handleSchoolChange}/>
                    <GradeSelect grade={grade} handleGradeChange={handleGradeChange}/>
                    <PeriodSelect period={period} handlePeriodChange={handlePeriodChange}/>
                </Box>
                <LetterDaysSelect letterDays={letterDays} handleLetterDaysChange={handleLetterDaysChange}/>
                <Box>
                    <Typography variant="h5" sx={{fontFamily:"Montserrat"}}>Teachers</Typography>
                    <List>
                        {users.map((user) => {
                            return (
                                <ListItem key={user.id} value={user.id}>
                                    <ListItemText sx={{fontFamily:"Montserrat"}} primary={user.fullName}/>
                                </ListItem>
                                );
                            })}
                    </List>
                </Box>
                <TeacherSelect handleTeacherChange={handleTeacherChange}/>
                <Box>
                    <Button type="submit" variant="contained">Update</Button>
                    <IconButton color="error" onClick={handleModalOpen}>
                        <DeleteIcon color="error"/>
                    </IconButton>
                </Box>
            </form>
        </Box>
    );
};

export default SingleClassPage;