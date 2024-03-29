<html>
<head>
    <title>Bukti Barang Masuk</title>
</head>
<style>
    #A4{
        background-color:#FFFFFF;
        left:5px;
        right:5px;
        height:5.51in ; /*Ukuran Panjang Kertas */
        width: 8.50in; /*Ukuran Lebar Kertas */
        margin:1px solid #FFFFFF;
    }
    table.bordered{
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }
    table.bordered th{
        border: 1px solid #ccc;
        padding: 5px;
        font-size: 0.9em;
    }
    table.bordered td{
        border: 1px solid #ccc;
        padding: 5px;
        font-size: 0.8em;
    }
    .btn{
        font-family:Georgia, "Times New Roman", Times, serif;
        -moz-border-bottom-colors: none;
        -moz-border-left-colors: none;
        -moz-border-right-colors: none;
        -moz-border-top-colors: none;
        background-color: #f5f5f5;
        background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
        background-repeat: repeat-x;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) #b3b3b3;
        border-image: none;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
        color: #333333;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 0;
        padding: 4px 12px;
        text-align: center;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
        vertical-align: middle;
    }
    a{
        text-decoration: none;
    }
</style>
<body id="A4">
    <table width="100%" border="0">
        <tr>
            <td align="center">
                <?php echo COMPANY_NAME; ?>
                <br />
                <?php echo REPORT_ADDRESS_1; ?>
                <br />
                <?php echo REPORT_ADDRESS_2; ?>
            </td>
        </tr>
    </table>
    <hr />
    
    <table width="100%" border="0">
        <tr>
            <td align="center">
                BUKTI BARANG MASUK (PEMBELIAN)
            </td>
        </tr>
    </table>
    <hr />

    <table width="100%" border="0" id="directPrint1">
        <tr>
            <td align="center">
                <a href="#" onclick="window.close()" class="btn">Tutup</a>
                <a href="#" onclick="printDirect()" class="btn">Print</a>
            </td>
        </tr>
        <tr>
            <td><hr /></td>
        </tr>
    </table>
    

    <table width="100%" border="0">
        <tr>
            <td width="100px">Kode Rekap</td>
            <td width="10px" align="center">:</td>
            <td width="150px"><?php echo $KDBL ?></td>

            <td width="100px">Metode Bayar</td>
            <td width="10px" align="center">:</td>
            <td width="150px"><?php echo $PEMBAYARAN ?></td>

            <td>Tgl Faktur</td>
            <td align="center">:</td>
            <td><?php echo date('d-m-Y',strtotime($TGLFAKTUR)) ?></td>
        </tr>
        <tr>
            <td>Tgl Rekap</td>
            <td align="center">:</td>
            <td><?php echo date('d-m-Y H:i',strtotime($DTBL)) ?></td>

            <td width="100px">No Faktur</td>
            <td width="10px" align="center">:</td>
            <td><?php echo $NOFAKTUR ?></td>
            
            <td>Jatuh Tempo</td>
            <td align="center">:</td>
            <td><?php echo date('d-m-Y',strtotime($JTEMPO)) ?></td>
        </tr>
        <tr>
            <td>PBF</td>
            <td align="center">:</td>
            <td><?php echo $NMSUPPLIER ?></td>

            <td>Tgl Terima</td>
            <td align="center">:</td>
            <td><?php echo date('d-m-Y',strtotime($TGLTERIMA)) ?></td>

            <td>Lokasi Gudang</td>
            <td align="center">:</td>
            <td><?php echo $NMLOKASI ?></td>
        </tr>
    </table>
    
    <table class="bordered">
        <thead>
            <th>No</th>
            <th>Nama Obat / Alat Kesehatan</th>
            <th>Satuan</th>
            <th>Harga Item</th>
            <th>Jml</th>
            <th>Total</th>
            <th>Diskon</th>
            <th>Sub Total</th>
        </thead>
        <tbody>
            <?php 
                $i=1;
                $total = 0;
                $subTotal = 0;
                $totalFaktur = 0;
                foreach($dataPreview->result_array() as $x): 
                    $total = $x['JMLBELI'] * $x['HBELI'];
                    $subTotal = $total - $x['HDISKON'];
                    $totalFaktur = $totalFaktur + $subTotal;
            ?>
            <tr>
                <td><?php echo $i++; ?></td>
                <td><?php echo $x['NMBRG'] ?></td>
                <td><?php echo getSatuanObatById($x['KDBRG']) ?></td>
                <td align="right">Rp. <?php echo number_format($x['HBELI'],2,',','.') ?></td>
                <td align="right"><?php echo number_format($x['JMLBELI'],0,',','.') ?></td>
                <td align="right">Rp. <?php echo number_format($total,2,',','.') ?></td>
                <td align="right">Rp. <?php echo number_format($x['HDISKON'],2,',','.') ?></td>
                <td align="right">Rp. <?php echo number_format($subTotal,2,',','.') ?></td>
            </tr>
            <?php endforeach; ?>
            <tr>
                <td colspan="7" align="right">Total Faktur</td>
                <td align="right">Rp. <?php echo number_format($totalFaktur,2,',','.') ?></td>
            </tr>
            <tr>
                <td colspan="7" align="right">Diskon Global</td>
                <td align="right">Rp. <?php echo number_format($DISKON_GLOBAL,2,',','.') ?></td>
            </tr>
            <tr>
                <td colspan="7" align="right">PPN (11%)</td>
                <td align="right">Rp. <?php echo number_format($TOTPPN,2,',','.') ?></td>
            </tr>
            <tr>
                <td colspan="7" align="right">Sub Total Faktur</td>
                <td align="right">Rp. <?php echo number_format($totalFaktur - $DISKON_GLOBAL + $TOTPPN,2,',','.') ?></td>
            </tr>
            <tr>
                <td colspan="7" align="right">Ongkos Kirim</td>
                <td align="right">Rp. <?php echo number_format($ONGKIR,2,',','.') ?></td>
            </tr>
            <tr>
                <td colspan="7" align="right">Grand Total</td>
                <td align="right">Rp. <?php echo number_format($totalFaktur - $DISKON_GLOBAL + $TOTPPN + $ONGKIR,2,',','.') ?></td>
            </tr>

            <tr>
                <td colspan="8">Keterangan</td>
            </tr>
            <?php if ($KETBL!==""): ?>
            <tr>
                <td colspan="8"><?php echo $KETBL ?></td>
            </tr>
            <?php else: ?>
            <tr>
                <td colspan="8">-</td>
            </tr>
            <?php endif; ?>
        </tbody>
    </table>
    <br />
    <br />
    <table width="100%" border="0">
        <tr>
            <td width="60px">&nbsp;</td>
            <td width="460px">User Entry,</td>
            <td>Dicetak Oleh,</td>
        </tr>
        <tr>
            <td height="40px" colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td><?php echo getNmLengkapById($UEXEC) ?></td>
            <td><?php echo getNmLengkap() ?></td>
        </tr>
    </table>

    <script>
        function printDirect(){
            if (typeof(window.print) != 'undefined') {
                document.getElementById("directPrint1").style.display = 'none';
                window.print();
                document.getElementById("directPrint1").style.display = 'inline-table';
            }
        }
    </script>    
</body>
</html>
