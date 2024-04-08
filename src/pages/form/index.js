// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} />
})

const Form = () => {
  // ** States
  const [tab, setTab] = useState('barang')

  const form = {
    namaBarang: '',
    kodeBarang: '',
    tanggal: '',
    jumlah: '',
    jenisBarang: '',
    kodeAkun: '',
    hargaBeli: '',
    hargaJual: '',
    biayaOngkir: ''
  }

  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ form })

  const handleTabsChange = (event, newTab) => {
    setTab(newTab)
  }

  const onSubmit = data => {
    if (tab === 'barang') {
      setTab('harga')
    } else {
      console.log(data)
    }
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant='h5'>Form Barang</Typography>
      </Grid>

      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <Card>
          <TabContext value={tab}>
            <TabList
              variant='scrollable'
              scrollButtons={false}
              onChange={handleTabsChange}
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
            >
              <Tab value={'barang'} label='Data Barang' />
              <Tab value={'harga'} label='Data Harga' />
            </TabList>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <TabPanel sx={{ p: 0 }} value={'barang'}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='namaBarang'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Nama Barang'
                            placeholder='Masukkan Nama Barang'
                            value={value}
                            name='namaBarang'
                            onChange={onChange}
                            error={Boolean(errors.namaBarang)}
                            {...(errors.namaBarang && { helperText: 'Nama Barang wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='kodeBarang'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Kode Barang'
                            placeholder='Masukkan Kode Barang'
                            value={value}
                            name='kodeBarang'
                            onChange={onChange}
                            error={Boolean(errors.kodeBarang)}
                            {...(errors.kodeBarang && { helperText: 'Kode Barang wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <Controller
                          name='tanggal'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <DatePicker
                              selected={value}
                              showMonthDropdown
                              showYearDropdown
                              onChange={e => onChange(e)}
                              placeholderText='Masukkan Tanggal'
                              customInput={
                                <CustomInput
                                  value={value}
                                  onChange={onChange}
                                  label='Tanggal'
                                  error={Boolean(errors.tanggal)}
                                  {...(errors.tanggal && { helperText: 'Tanggal wajib diisi' })}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <Icon icon='tabler:calendar' />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              }
                            />
                          )}
                        />
                      </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='jumlah'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Jumlah'
                            placeholder='Masukkan Jumlah'
                            type='number'
                            value={value}
                            name='jumlah'
                            onChange={onChange}
                            error={Boolean(errors.jumlah)}
                            {...(errors.jumlah && { helperText: 'Jumlah Barang wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='jenisBarang'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Jenis Barang'
                            placeholder='Masukkan Jenis Barang'
                            value={value}
                            name='jenisBarang'
                            onChange={onChange}
                            error={Boolean(errors.jenisBarang)}
                            {...(errors.jenisBarang && { helperText: 'Jenis Barang wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='kodeAkun'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Kode Akun'
                            placeholder='Masukkan Kode Akun'
                            value={value}
                            name='kodeAkun'
                            onChange={onChange}
                            error={Boolean(errors.kodeAkun)}
                            {...(errors.kodeAkun && { helperText: 'Kode Akun wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel sx={{ p: 0 }} value={'harga'}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='hargaBeli'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Harga Beli'
                            placeholder='Masukkan Harga Beli'
                            type='number'
                            value={value}
                            name='hargaBeli'
                            onChange={onChange}
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>Rp</InputAdornment>
                            }}
                            error={Boolean(errors.hargaBeli)}
                            {...(errors.hargaBeli && { helperText: 'Harga Beli wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='hargaJual'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Harga Jual'
                            placeholder='Masukkan Harga Jual'
                            type='number'
                            value={value}
                            name='hargaJual'
                            onChange={onChange}
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>Rp</InputAdornment>
                            }}
                            error={Boolean(errors.hargaJual)}
                            {...(errors.hargaJual && { helperText: 'Harga Jual wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='biayaOngkir'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label='Biaya Ongkir'
                            placeholder='Masukkan Harga Ongkir'
                            type='number'
                            value={value}
                            name='biayaOngkir'
                            onChange={onChange}
                            InputProps={{
                              startAdornment: <InputAdornment position='start'>Rp</InputAdornment>
                            }}
                            error={Boolean(errors.biayaOngkir)}
                            {...(errors.biayaOngkir && { helperText: 'Biaya Ongkir wajib diisi' })}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
              </CardContent>
              <Divider sx={{ m: '0 !important' }} />
              <CardActions>
                <Button type='submit' sx={{ mr: 2 }} variant='contained'>
                  Submit
                </Button>
                <Button type='reset' color='error' variant='contained'>
                  Reset
                </Button>
              </CardActions>
            </form>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Form
