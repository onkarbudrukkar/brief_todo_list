import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


import Category_Placeholder from '../assets/Category_Placeholder.webp';

import {DataContext} from '../context/ContextProvider.js';



const CategoryPage = () => {

    const allData = useContext(DataContext);
    const [searchText, setSearchText] = useState('')
    const [dataArray, setDataArray] = useState([...Object.keys(allData)])

    const navigate = useNavigate();


    function searchFunction(text){
        const newFilteredDataArray = dataArray.filter((eachEntry) => {
            return eachEntry.includes(text);
        })

        setDataArray(newFilteredDataArray)
    }

    function handleSearchChange(event){
        if(event.target.value !== ''){
            setSearchText(event.target.value)
            searchFunction(searchText)
        }
        else{
            setDataArray([...Object.keys(allData)])
        }
        console.log(searchText);
    }
    
    function handleClick(eachCategory){
        navigate(`/${eachCategory}`)
    }

    function handleAddCategory(){

    }
    
    return (
        <div>
            <AddIcon 
                variant = 'contained'
                fontSize='large'
                sx={{ margin : 1, border : '2px solid black'}}
                onClick={handleAddCategory}
            />
            <div style={{ margin : 1, marginLeft : '80%',marginRight : '0px'}}>
                <SearchIcon fontSize='large' />
                <TextField 
                    placeholder='Search...'
                    // style={{ padding : '0px', maxHeight : '60px'}}
                    size='small'
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
           
            <div style={{ display : 'flex', flexDirection : 'row', flexWrap : 'wrap', justifyContent: 'center' }}>
            {
                Object.keys(allData).map((eachCategory, index) => {
                    return(
                        <Card 
                            key={index} 
                            sx={{ margin : 5, color: 'Highlight' }} 
                            style={{ width : '400px', border : '2px solid black'}} 
                            onClick={() => handleClick(eachCategory)}
                        >
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="180"
                                image={Category_Placeholder}
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div" >
                                    {eachCategory}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            
                        </Card>
                    )
                })
            }
            </div>
        </div>
  )
}

export default CategoryPage