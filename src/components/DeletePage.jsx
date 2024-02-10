import {React, useEffect, useState } from 'react'
import AxiosInstance from './Axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

const DeletePage = () => {

  const myParam = useParams()
  const myId = myParam.id


const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)

  const getData = () => {
    AxiosInstance.get(`api/project/${myId}`)
    .then((response) => {
      setMyData(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {   
    getData()

  }, [])  

  const navigate = useNavigate()

  const submission = (data) => {
    
    AxiosInstance.delete(`api/project/${myId}/`)
    .then((res) => {
      navigate(`/`)
    })
  }

  return (
    <div>
         { loading ? <p>Loading data...</p> :
   
    
    <div>
        
        <Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                    Delete project: {myData.name}
                </Typography>

            </Box>

            <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

            <Box sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}> 
                Are you sure that you want to delete this project: {myData.name}
            </Box>

            <Box sx={{width:'30%'}}>
                <Button variant="contained" onClick={submission} sx={{width:'100%'}}>
                Delete the project
                </Button>
            </Box>

        </Box>
        </div> }
  </div>
  )
}

export default DeletePage