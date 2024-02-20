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
            width:85.6mm;
            height:53.98mm;
        }
        .kartu{
            border:1px solid #ccc;
            border-collapse:collapse;
            width: 85.6mm;
            height:53.98mm;
        }
        .kartu-header{
            /* text-align:center;
            padding:5px 0px 5px 0px; */
            border-bottom:1px solid #ccc;
            border-collapse:collapse;
            /* font-weight:bold;
            font-size:20pt; */
            height:26.99mm;
        }
        .kartu-body{
            padding : 5px;
            height:26.99mm;
        }
        .kartu-body-qr{
            float:left;
            width: 24mm;
            height: 24mm;
            border:1px solid #ccc;
            border-collapse:collapse;
            
        }
        .kartu-body-qr img{
            width:100%;
        }
        .kartu-body-identitas{
            border: 1px solid #ccc;
            border-collapse: collapse;
            width: 57mm;
            height: 24mm;
            margin-left: 26mm;
            font-weight: bold;
            font-size: 7pt;
        }
        .kartu-footer{
            text-align:center;
            font-weight:bold;
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
            font-size:14pt;
            font-weight:bold;
        }
        .tgllahir{
            font-size:8pt;
        }
    </style>
</head>
<body>
    <div class="kartu">
        <div class="kartu-header">
            <!-- <?= COMPANY_NAME ?> -->
        </div>
        <div class="kartu-body">
            <div class="kartu-body-qr">
                <img src="<?= base_url()."rekammedis/pasien/qrpng/" .$row->nomr; ?>" alt="">
            </div>
            <div class="kartu-body-identitas">
                <div class="row">
                    <div class="col-xs-4">Nomr</div>
                    <div class="col-xs-7"> : <?= $row->nomr ?></div>
                    <div class="col-xs-4">No JKN</div>
                    <div class="col-xs-7"> : <?= $row->nobpjs ?></div>
                    <div class="col-xs-4">Nik</div>
                    <div class="col-xs-7"> : <?= $row->nik ?></div>
                    <div class="col-xs-4">Nama</div>
                    <div class="col-xs-7"> : <?= $row->nama ?></div>
                    <div class="col-xs-4">TTL</div>
                    <div class="col-xs-7"> : <?= $row->tempat_lahir . " / ", longDate($row->tgl_lahir) ?></div>
                    <div class="col-xs-4">Tgl Daftar</div>
                    <div class="col-xs-7"> : <?= longDate($row->tgl_daftar) ?></div>
                </div>
            </div>
        </div>
        <!-- <div class="kartu-footer">
            KARTU INI HARAP DIBAWA SETIAP AKAN BEROBAT
        </div> -->
    </div>

    <script>
        setTimeout(function () { window.print(); }, 500);
        setTimeout(function () { window.close(); }, 500);
        
    </script>
</body>
</html>