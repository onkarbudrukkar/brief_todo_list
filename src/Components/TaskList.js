import React,{ useState, useContext } from 'react'
import TaskForm from './TaskForm.js';
import EditTaskDialog from './EditTaskDialog.js';
import { Button, Accordion, AccordionSummary, Typography, AccordionDetails, AccordionActions } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom'

import {DataContext} from '../context/ContextProvider.js'

const TaskList = () => {
    
    const allData = useContext(DataContext);
    
    const { eachCategory } = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [snack, setSnack] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState();
    const [taskDetails, setTaskDetails] = useState({
        id : null,
        title : '',
        description : '',
        priority : '',
        status : ''
    })

    const [editTaskDetails, setEditTaskDetails] = useState()

    async function handleAddTask(){

        try{
            const updatedCategoryTasks = [...allData[eachCategory], taskDetails];

            const updatedResponse = await fetch("http://localhost:3500/user_1/",{
                method : 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({ [eachCategory ] : updatedCategoryTasks })
            })

            if(!updatedResponse.ok){
                throw new Error(`Failed to update Personal data: ${updatedResponse.statusText}`);
                
            }

            setSnack(true)
            setSnackMessage('Task Added Successfully')

        } catch(error) {
            console.error("Error adding task to Personal:", error);
        }
    }

    function handleOpenTask(task){
        console.log('clicked');
        setEditTaskDetails(task)
        setOpen(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack(false);
      };

    async function handleEditTask(){

        try{
            const newEditedTask = allData[eachCategory].find((eachTask) => {
                return eachTask.id === editTaskDetails.id
            })

            console.log('newEditedTask 1', newEditedTask)
            
            newEditedTask.title = editTaskDetails.title;
            newEditedTask.description = editTaskDetails.description;
            newEditedTask.status = editTaskDetails.status;
            newEditedTask.priority = editTaskDetails.priority;
            
            console.log('newEditedTask 2', newEditedTask)

            const updatedCategoryTasks = allData[eachCategory].filter((eachTask) => {
                return eachTask.id !== editTaskDetails.id
            })

            const newCatergoryTasks = [...updatedCategoryTasks, newEditedTask];

            console.log('newCatergoryTasks', newCatergoryTasks)

            const updatedResponse = await fetch("http://localhost:3500/user_1/",{
                method : 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({ [eachCategory ] : newCatergoryTasks })
            })

            if(!updatedResponse.ok){
                throw new Error(`Failed to update Personal data: ${updatedResponse.statusText}`);
                
            }

            setOpen(false);
            window.location.reload();
            setSnack(true)
            setSnackMessage('Task Edited Successfully')

        } catch(error) {
            console.error("Error adding task to Personal:", error);
        }
    }
    
    async function handleDeleteTask(task){
        console.log(task);

        try{
            const updatedCategoryTasks = allData[eachCategory].filter((eachTask) => {
                return eachTask.id !== task.id
            })

            console.log(updatedCategoryTasks)

            const updatedResponse = await fetch("http://localhost:3500/user_1/",{
                method : 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({ [eachCategory ] : updatedCategoryTasks })
            })

            if(!updatedResponse.ok){
                throw new Error(`Failed to update Personal data: ${updatedResponse.statusText}`);
                
            }

            window.location.reload()
            setSnack(true)
            setSnackMessage('Task Deleted Successfully')

        } catch(error) {
            console.error(`Error deleting task to ${eachCategory}:`, error);
        }

    }

    
  return (
    <div style={{ display : 'flex', flexDirection : 'column', alignItems: 'center', flexWrap : 'wrap'}}>
        <TaskForm 
            allData={allData} 
            taskDetails={taskDetails}
            setTaskDetails={setTaskDetails}
            handleAddTask={handleAddTask}
            eachCategory={eachCategory}
        />
        
        
        <div style={{ marginTop : '2%'}}>
            {
                allData[eachCategory]?.map((eachTask) => {
                    // return <h3 key={eachTask.id}>{eachTask.title}</h3>
                    return(
                        <Accordion key={eachTask.id} sx={{ margin : 2, maxWidth : 560, backgroundColor : `${eachTask.priority === 'low' ? 'green' : eachTask.priority === 'high' ? 'red' : 'yellow'}`}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                            >
                                <Typography variant='h4'>
                                    {eachTask.title +  '          '} 
                                    {eachTask.stauts === 'Completed' ? <HourglassFullIcon /> : eachTask.status === 'Pending' ? <HourglassEmptyIcon /> : <HourglassTopIcon />}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <h3>{eachTask.description}</h3>
                                <hr style={{ backgroundColor : 'black'}}></hr>
                                <h4 >{eachTask.status}</h4>    
                            </AccordionDetails>
                            <AccordionActions>
                                <Button variant="contained" color="primary" onClick={() => handleOpenTask(eachTask)}>
                                  <ModeEditRoundedIcon />
                                </Button>
                                <Button type='submit' variant="contained" color="primary" onClick={() => handleDeleteTask(eachTask)}>
                                  <DeleteRoundedIcon />
                                </Button>
                            </AccordionActions>
                            {open && <EditTaskDialog task={eachTask} open={open} editTaskDetails={editTaskDetails} setEditTaskDetails={setEditTaskDetails} handleOpenTask={handleOpenTask} setOpen={setOpen} handleEditTask={handleEditTask} />}
                        </Accordion>
                    )
                })
            }
        </div>
        <Snackbar
            open={snack}
            onClose={handleCloseSnackbar}
            autoHideDuration={5000}
            message={snackMessage}
        />
    </div>
  )
}

export default TaskList