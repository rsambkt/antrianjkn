<html>
<head>
    <title>Report</title>
</head>
<style>
    * {
        font-family: monospace,serif;
        font-size: 10pt;
    }
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
    table.bordered thead th{
        border: 1px solid #ccc;
        padding: 5px;
    }
    table.bordered tbody td{
        border: 1px solid #ccc;
        padding: 5px;
    }
    table.bordered tfoot td{
        padding: 5px;
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
                <?php echo getCompany(); ?>
                <br />
                <?php echo getAddress1(); ?>
                <br />
                <?php echo getAddress2(); ?>
            </td>
        </tr>
    </table>
    
    <table width="100%" border="0" id="directPrint1">
        <tr>
            <td align="center">
                <a href="#" onclick="window.close()" class="btn">Tutup</a>
                <a href="#" onclick="printDirect()" class="btn">Print</a>
            </td>
        </tr>
    </table>
    
    <table width="100%" border="0">
        <tr>
            <td align="center"><hr /></td>
        </tr>
        <tr>
            <td align="center">KARTU STOK</td>
        </tr>
        <tr>
            <td align="center"><hr /></td>
        </tr>
    </table>

    <table width="100%" border="0">
        <tr>
            <td width="150px">Nama Obat/Alkes</td>
            <td width="5px" align="center">:</td>
            <td width="250px"><?php echo getObatById($KDBRG) ?></td>
            <td width="120px">Periode Stok</td>
            <td width="5px" align="center">:</td>
            <td><?php echo $TGLAWAL.'/'.$TGLAKHIR ?></td>
        </tr>
        
    </table>
    <table class="bordered">
        <thead>
            <th width="100px">Tanggal</th>
            <th width="100px">No.Trans</th>
            <th>Keterangan</th>
            <th width="100px">Masuk</th>
            <th width="100px">Keluar</th>
            <th width="100px">Sisa</th>
        </thead>
        <tbody id="getdata"></tbody>
    </table>
    <br />
    <br />
    <table style="margin-left: 100px;margin-top: 20px;">
        <tr>
            <td>&nbsp;</td>
            <td width="450px">&nbsp;</td>
            <td>Dicetak Oleh,</td>
        </tr>
        <tr style="height: 50px;">
            <td colspan="3">&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td><?php echo getUserLogin() ?></td>
        </tr>
    </table>


<script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script>
<script>
$(document).ready(function(){
    getTable();    
});
function getTable(){
    var a = "<?php echo $KDBRG ?>";
    var b = "<?php echo $KDLOKASI ?>";
    var c = "<?php echo $TGLAWAL ?>";
    var d = "<?php echo $TGLAKHIR ?>";
    $.ajax({
        url         : "<?php echo base_url().'farmasi/lap_kartu_stok/getdataKartuStok' ?>",
        type        : "POST",
        data        : {kBrg:a,kLok:b,tAwal:c,tAkhir:d},
        beforeSend  : function(){
            $('#getdata').html("<tr><td colspan=6><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
        },
        success : function(data){
            $('#getdata').html(data);
        },
        error   : function(jqXHR,ajaxOption,errorThrown){
            $('#getdata').html("<tr><td colspan=6>Data tidak ditemukan</td></tr>");
            console.log(jqXHR.responseText);
        }
    });            
} 
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
