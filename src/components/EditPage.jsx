import {React, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import MyDatePickerField from './forms/MyDatePickerField'
import MyTextField from './forms/MyTextField'
import MySelectField from './forms/MySelectField'
import MyMultilineField from './forms/MyMultilineField'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

const EditPage = () => {

  const myParam = useParams()
  const myId = myParam.id

  const [projectManager, setProjectManager] = useState()
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id: '', name: 'None'},
    {id: 'Open', name: 'Open' },
    {id: 'In progress', name: 'In progress' },
    {id: 'Completed', name: 'Completed' },
  ]

  const getData = () => {
    AxiosInstance.get(`api/project-manager/`)
    .then((response) => {
      setProjectManager(response.data)
      console.log(response.data)
    })

    AxiosInstance.get(`api/project/${myId}`)
    .then((response) => {
      console.log(response.data)
      setValue('name', response.data.name)
      setValue('status', response.data.status)
      setValue('project_manager', response.data.project_manager)
      setValue('comments', response.data.comments)
      setValue('start_date', Dayjs(response.data.start_date))
      setValue('end_date', Dayjs(response.data.end_date))
      setLoading(false)
    })
  }

  useEffect(() => {   
    getData()

  }, [])  

  const navigate = useNavigate()
  const defaultValues = {
    name: '',
    comments: '',
    status: ''
  }

  const {handleSubmit, setValue, control} = useForm({defaultValues:defaultValues})

  const submission = (data) => {
    const startDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const endDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.put(`api/project/${myId}/`, {
      name: data.name,
      project_manager: data.project_manager,
      status: data.status,
      comments: data.comments,
      start_date: startDate,
      end_date: endDate
    })
    .then((res) => {
      navigate(`/`)
    })
  }

  return (
    <div>
    { loading ? <p>Loading data</p> :
    <form onSubmit={handleSubmit(submission)}>
    <Box sx={{display: 'flex', width: '100%', backgroundColor:'#00003f', marginBottom: '10px'}}>
      <Typography sx={{marginLeft: '20px', color: '#ffff'}}>
        Create Records
      </Typography>
    </Box>
    <Box sx={{display: 'flex', width: '100%', boxShadow: 3, padding:4, flexDirection: 'column'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom: '40px'}}>
        <MyTextField
          label='Name'
          name='name'
          control={control}
          placeholder='Provide a project name'  
          width={'30%'}
        />

        <MyDatePickerField
           label='Start date'
           name='start_date'
           control={control} 
           width={'30%'}
        />
        <MyDatePickerField
           label='End date'
           name='end_date'
           control={control} 
           width={'30%'}
        />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <MyMultilineField
            label='Comments'
            name='comments'
            control={control}
            placeholder='Provide a project comments'  
            width={'30%'}
          />

          <MySelectField
            label='Status'
            name='status'
            control={control} 
            width={'30%'}
            options={hardcoded_options}
          />

          <MySelectField
            label='Project Manager'
            name='project_manager'
            control={control} 
            width={'30%'}
            options={projectManager}
          />  
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'start', marginTop: '40px'}}>
        <Button variant="contained" type="submit" sx={{width: '100%'}}>
          Submit
        </Button>
      </Box>
    </Box>
    </form>
    }
  </div>
  )
}

export default EditPage