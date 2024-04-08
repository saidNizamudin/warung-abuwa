// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Spinner from 'src/@core/components/spinner'
import { DataGrid } from '@mui/x-data-grid'

// ** Graphql Imports
import { SUBSCRIBE_BARANG } from '../../clients/barang'
import { useSubscription } from '@apollo/client'

// ** React Imports
import { useEffect, useState } from 'react'

const columns = [
  {
    flex: 0.25,
    minWidth: 290,
    field: 'nama',
    headerName: 'Nama',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.nama}
      </Typography>
    )
  },
  {
    flex: 0.175,
    type: 'date',
    minWidth: 120,
    headerName: 'Tanggal',
    field: 'tanggal',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.tanggal}
      </Typography>
    )
  },
  {
    flex: 0.175,
    minWidth: 110,
    field: 'jumlah',
    headerName: 'Jumlah',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.jumlah}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'kode',
    minWidth: 80,
    headerName: 'kode',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.kode}
      </Typography>
    )
  }
]

const DataBarang = () => {
  const { data: response, loading, error } = useSubscription(SUBSCRIBE_BARANG)

  // ** States
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('asc')
  const [rows, setRows] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('full_name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 })

  useEffect(() => {
    if (response) {
      setTotal(response.barang.length)
      setRows(
        response.barang.slice(
          paginationModel.page * paginationModel.pageSize,
          (paginationModel.page + 1) * paginationModel.pageSize
        )
      )
    }
  }, [response, paginationModel])

  const handleSortModel = newModel => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  const handleSearch = value => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  if (error) {
    return <div>Error! {error.message}</div>
  }

  if (loading) {
    return <Spinner />
  }

  console.log(response)

  return (
    <Card>
      <CardHeader title='Data Barang' />
      <DataGrid
        autoHeight
        pagination
        rows={rows}
        rowCount={total}
        columns={columns}
        sortingMode='server'
        paginationMode='server'
        pageSizeOptions={[1, 2, 5, 10, 20, 50, 100]}
        paginationModel={paginationModel}
        onSortModelChange={handleSortModel}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'tonal'
          },
          toolbar: {
            value: searchValue,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default DataBarang
