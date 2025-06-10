// src/Components/InvoiceDocument.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Registering a font that supports Rupiah symbol (optional but recommended)
// Download a font like 'Roboto' from Google Fonts and place it in your public directory
// Font.register({ 
//   family: 'Roboto', 
//   src: '/fonts/Roboto-Regular.ttf' 
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica', // or 'Roboto' if you registered it
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  clientInfo: {
    textAlign: 'left',
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    borderBottom: '1px solid #eee',
    paddingBottom: 3,
  },
  table: {
    display: "flex",
    width: 'auto',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    backgroundColor: '#f2f2f2',
    fontFamily: 'Helvetica-Bold',
  },
  tableCol: {
    width: '20%', // 5 columns
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableColLarge: {
    width: '40%',
  },
  textRight: {
    textAlign: 'right',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalText: {
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'grey',
    fontSize: 10,
  }
});

export const InvoiceDocument = ({ order }: { order: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.clientInfo}>
          <Text>Ditagihkan kepada:</Text>
          <Text>{order.user.name || 'name'}</Text>
          <Text>{order.user.email || 'user@email.com'}</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text>Invoice #: {order.id}</Text>
          <Text>Tanggal: {new Date(order.created_at).toLocaleDateString('id-ID')}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Detail Barang</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableColHeader]}>
          <View style={[styles.tableCol, styles.tableColLarge]}><Text>Nama Barang</Text></View>
          <View style={styles.tableCol}><Text style={styles.textRight}>Jumlah</Text></View>
          <View style={styles.tableCol}><Text style={styles.textRight}>Harga</Text></View>
          <View style={styles.tableCol}><Text style={styles.textRight}>Subtotal</Text></View>
        </View>
        {order.order_details?.map((detail: any) => (
          <View style={styles.tableRow} key={detail.id}>
            <View style={[styles.tableCol, styles.tableColLarge]}><Text>{detail.product.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.textRight}>{detail.quantity}</Text></View>
            <View style={styles.tableCol}><Text style={styles.textRight}>Rp{detail.product.price.toLocaleString('id-ID')}</Text></View>
            <View style={styles.tableCol}><Text style={styles.textRight}>Rp{(detail.quantity * detail.product.price).toLocaleString('id-ID')}</Text></View>
          </View>
        ))}
         <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: '80%' }]}><Text style={[styles.totalText, styles.textRight]}>Total</Text></View>
          <View style={styles.tableCol}><Text style={[styles.totalText, styles.textRight]}>Rp{order.total_price.toLocaleString('id-ID')}</Text></View>
        </View>
      </View>
      
      {/* Footer */}
      <Text style={styles.footer}>Terima kasih telah berbelanja!</Text>
    </Page>
  </Document>
);