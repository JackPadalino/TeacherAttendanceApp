import React from 'react';

/** 
 * Adds an extra period, either a lunch period or a team meeting,
 *  to a teacher's schedule. 
 * */
const AddExtraPeriodForm = ({handleClassNameChange,handleSchoolChange,handlePeriodChange,handleLetterDaysChange}) => {
    // add a select for either lunch or team meeting
    // add a select for MS or HS
    // add a select for period
    // add check boxes for letter days

    

    return (
        <form>
            <label htmlFor="class name">Add lunch/team meeting</label>
            <select name='class name' onChange={handleClassNameChange}>
                <option value=''>-</option>
                <option value='Lunch'>Lunch</option>
                <option value='Team meeting'>Team meeting</option>
            </select>
            <label htmlFor="school">School</label>
            <select name='school' onChange={handleSchoolChange}>
                <option value=''>-</option>
                <option value='MS'>MS</option>
                <option value='HS'>HS</option>
            </select>
            <label htmlFor="period">Period</label>
            <select name='period' onChange={handlePeriodChange}>
                <option value=''>-</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
            </select>
            <label>Letter days</label>
            <input type="checkbox" name="A day" value="A" onChange={handleLetterDaysChange}/>
            <label htmlFor="A day">A</label>
            <input type="checkbox" name="B day" value="B" onChange={handleLetterDaysChange}/>
            <label htmlFor="B day">B</label>
            <input type="checkbox" name="C day" value="C" onChange={handleLetterDaysChange}/>
            <label htmlFor="C day">C</label>
            <input type="checkbox" name="D day" value="D" onChange={handleLetterDaysChange}/>
            <label htmlFor="D day">D</label>
            <input type="checkbox" name="E day" value="E" onChange={handleLetterDaysChange}/>
            <label htmlFor="E day">E</label>
            <input type="checkbox" name="F day" value="F" onChange={handleLetterDaysChange}/>
            <label htmlFor="F day">F</label>
        </form>
    );
};

export default AddExtraPeriodForm;