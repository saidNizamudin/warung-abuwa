import { gql } from '@apollo/client'

export const SUBSCRIBE_BARANG = gql`
  subscription SubscribeBarang {
    barang(limit: 10, order_by: { id: asc }) {
      id
      akun
      harga_beli
      harga_jual
      harga_ongkir
      jenis
      jumlah
      jumlah_beli
      jumlah_jual
      kode
      nama
      tanggal
    }
  }
`
