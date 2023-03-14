import React,{ useState } from 'react';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { TeacherSelect,LetterDaysSelect } from '.';
import { Box,Container,Typography,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { mainContainer,titleTeacherDayContainer,title,selectContainer,listItemStyle } from "./style";

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { scheduleAbsentUser,scheduleLetterDay } = useSelector((state) => state.schedule);

    if(!token) return <NotFoundPage/>
    return (
        <Container component="main">
            <Box sx={mainContainer}>
                <Box sx={titleTeacherDayContainer}>
                    <Typography variant="h3" sx={title}>Teacher Schedules</Typography>
                    <Box sx={selectContainer}>
                        <TeacherSelect/>
                        <LetterDaysSelect/>
                    </Box>
                </Box>
                {scheduleAbsentUser.id && 
                <Box key={scheduleAbsentUser.id}>
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
                                        primaryTypographyProps={listItemStyle}
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