<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cetak Kartu</title>
    <style type="text/css">
        .kartu{
    border:1px solid #ccc;
    border-collapse:collapse;
    width: 450px;
    height:225px;
}
.kartu-header{
    text-align:center;
    padding:5px 0px 5px 0px;
    border-bottom:1px solid #ccc;
    border-collapse:collapse;
    font-weight:bold;
    font-size:20pt;
}
.kartu-body{
    padding : 5px;
}
.kartu-body-qr{
    float:left;
    width: 130px;
    height: 130px;
    border:1px solid #ccc;
    border-collapse:collapse;
    
}
.kartu-body-identitas{
    border:1px solid #ccc;
    border-collapse:collapse;
    width: 300px;
    height:130px;
    margin-left:135px;
    font-weight:bold;
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
        <?= COMPANY_NAME ?>
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
    <div class="kartu-footer">
        KARTU INI HARAP DIBAWA SETIAP AKAN BEROBAT
    </div>
</div>
</body>
</html>