import React,{ useState } from 'react';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { TeacherSelect,LetterDaysSelect } from '.';
import { Box,Container,Typography,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { scheduleAbsentUser,scheduleLetterDay } = useSelector((state) => state.schedule);

    if(!token) return <NotFoundPage/>
    return (
        <Container component="main">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap:"15px",
                    placeSelf: "center",
                    placeItems: "center",
                    //placeContent: "center center",
                    position: "relative",
                    top: "5vh",
                }}
            >
                <Typography variant="h3" sx={{fontFamily:'Montserrat'}}>Teacher schedules</Typography>
                <Box
                    sx={{
                        display:"flex",
                        gap:"10px"
                    }}
                >
                    <TeacherSelect/>
                    <LetterDaysSelect/>
                </Box>
                {scheduleAbsentUser.id && <Box key={scheduleAbsentUser.id}>
                    <List>
                        {scheduleAbsentUser.classes.map((eachClass) =>{
                            return (
                                eachClass.letterDays.includes(scheduleLetterDay) &&
                                <ListItem disablePadding key={eachClass.id}>
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${eachClass.name} - ${eachClass.period}`}
                                        primaryTypographyProps={{fontFamily:"Montserrat",fontSize: '25px'}}
                                        />
                                </ListItem>
                            )
                        })}
                    </List>  
                </Box>}
            </Box>
        </Container>
    );
};

export default SchedulePage;