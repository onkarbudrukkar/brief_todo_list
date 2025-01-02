import React from 'react'
import {nanoid} from "nanoid"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


const TaskForm = ({ allData, taskDetails, setTaskDetails,handleAddTask, eachCategory }) => {

    function handleChange(event){
        setTaskDetails((prevTaskDetails) => ({
            ...prevTaskDetails,
            id : nanoid(),
            [event.target.name] : event.target.value
        }))
    }

  return (
    <form>
        <div style={{ display : 'flex', flexDirection : 'row', justifyContent : 'center'}} onChange={handleChange}>
            <TextField 
                variant='outlined' 
                placeholder='Add Task Here...' 
                name='title'
                sx={{ margin : 2}} 
                value={taskDetails.title} />
            <FormControl variant='outlined' sx={{ margin : 2, minWidth: 120}}>
                <InputLabel id='priority_label'>Priority</InputLabel>
                <Select
                    labelId='priority_label'
                    value={taskDetails.priority}
                    label='priority'
                    name='priority'
                    onChange={handleChange}
                >
                    <MenuItem value='low'>Low</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='high'>High</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant='outlined' sx={{ margin : 2, minWidth: 120}}>
                <InputLabel id='status_label'>Status</InputLabel>
                <Select
                    labelId='status_label'
                    value={taskDetails.status}
                    label='status'
                    name='status'
                    onChange={handleChange}
                >
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='In progress'>In Progress</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div style={{ display : 'flex', flexDirection : 'row', justifyContent : 'center'}}>
            <TextField 
                variant='outlined' 
                placeholder='Description...' 
                name='description'
                sx={{ margin : 1, minWidth: 390, color : 'black'}} 
                value={taskDetails.description} 
                onChange={handleChange}
            />
            <Button type='submit' variant="contained" color="primary" sx={{ margin : 1, maxWidth: 140}} onClick={handleAddTask}>
                <AddIcon />  Add Task
            </Button>
        </div>
    </form>
    
  )
}

export default TaskForm