import {React, useEffect, useMemo, useState} from 'react'
import AxiosInstance from './Axios'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Dayjs from 'dayjs'
import { Box, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const HomePage = () => {

  const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)

  const getData = () => {
    AxiosInstance.get(`api/project/`)
    .then((response) => {
      setMyData(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])  
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'name',
          header: 'First Name',
          size: 150,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          size: 150,
        },
        {
          accessorKey: 'comments', 
          header: 'Comments',
          size: 200,
        },
        {
          accessorFn: (row) => Dayjs(row.start_date).format('MM-DD-YYYY'),
          header: 'Start Date',
          size: 150,
        },
        {
          accessorFn: (row) => Dayjs(row.end_date).format('MM-DD-YYYY'),
          header: 'End Date',
          size: 150,
        },
      ],
      [],
    ); 


  return (
    <div>
        <h2>This is Homepage</h2>
        { loading ? <p>Loading Data</p> : 
        <MaterialReactTable 
        columns={columns} 
        data={myData}
        enableRowActions
        renderRowActions={({row}) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>

              <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                  <DeleteIcon />
              </IconButton>
          </Box>
          )}

        />}
    </div>
  )

}

export default HomePage