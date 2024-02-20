<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cetak Kartu</title>
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/bootstrap/dist/css/bootstrap.css" />
    <style type="text/css">
        @page {
            margin: 0;
            width:250px;
            height:85px;
        }
        .stiker{
            border:1px solid #ccc;
            border-collapse:collapse;
            width: 250px;
            height:85px;
        }
        .stiker-qr{
            float:left;
            width: 80px;
            height: 80px;
            
        }
        .nama{
            font-size:12pt;
            font-weight:bold;
        }
        .tgllahir{
            font-size:7pt;
        }

        .stiker-info{
            width:165px;
            float:left;
        }
    </style>
</head>
<body>
    <div class="stiker">
        <div class="stiker-qr">
            <img src="<?= base_url()."rekammedis/pasien/qrpng/" .$row->nomr; ?>" alt="" style="width:80px; height:80px">
        </div>
        <div class="stiker-info">
            <?php 
            $lahir=new DateTime($row->tgl_lahir);
            $today =new DateTime();
            $umur=$today->diff($lahir);
            $jenkel = ($row->jns_kelamin=='1' || $row->jns_kelamin=="L") ? 'Laki-Laki' : 'Perempuan';
            ?>
            <div class="nama"><?= $row->nama ?></div>
            <div class='tgllahir'>Tgl Lahir : <?= longDate($row->tgl_lahir) ." [".$umur->y." Th, ".$umur->m." Bln]"?></div>
            
            <div class='tgllahir'>Jekel : <?= $jenkel ?></div>
        </div>
    </div>

    <script>
        setTimeout(function () { window.print(); }, 500);
        setTimeout(function () { window.close(); }, 500);
        
    </script>
</body>
</html>