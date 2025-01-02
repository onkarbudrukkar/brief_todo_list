import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'


const EditTaskDialog = ({ open, setOpen, handleClose, editTaskDetails, setEditTaskDetails, handleEditTask }) => {



    function handleChange(event){
        setEditTaskDetails((prevDetails) => ({
            ...prevDetails,
            [event.target.name] : event.target.value
        }))
    }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Task"}
        </DialogTitle>
        <DialogContent>
            <form>
                <div style={{ display : 'flex', flexDirection : 'row', justifyContent : 'center'}} onChange={handleChange}>
                    <TextField 
                        variant='outlined' 
                        placeholder='Add Task Here...' 
                        name='title'
                        sx={{ margin : 2}} 
                        value={editTaskDetails.title} 
                    />
                    <FormControl variant='outlined' sx={{ margin : 2, minWidth: 120}}>
                        <InputLabel id='priority_label'>Priority</InputLabel>
                        <Select
                            labelId='priority_label'
                            value={editTaskDetails.priority}
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
                            value={editTaskDetails.status}
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
                        sx={{ margin : 1, minWidth: 520, color : 'black'}} 
                        value={editTaskDetails.description} 
                        onChange={handleChange}
                    />
                    {/* <Button type='submit' variant="contained" color="primary" sx={{ margin : 1, maxWidth: 140}} >
                        <EditNoteIcon />  Edit Task
                    </Button> */}
                </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color : 'red'}}>Cancel</Button>
          <Button variant='contained' onClick={handleEditTask} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default EditTaskDialog