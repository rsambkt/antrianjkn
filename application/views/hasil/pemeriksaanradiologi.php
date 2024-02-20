<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Hasil Pemeriksaan Radiologi</title>
	<style type="text/css">
	.surat{
		border: 1px solid #ccc;
		border-collapse:collapse;
		width:900px;
		min-height:100px;
		padding:10px;
		font-size:10pt;
	}
	.baris{
		margin-left:0px;
		margin-right:0px;
		display:flex;
	}
	.logo{
		width:80px;
		float:left;
	}
	.kop{
		float:left;
		width:350px;
	}
	.text-center{
		text-align:center;
	}
	.font8{
		font-size:8pt;
	}
	.font10{
		font-size:10pt;
	}
	.font12{
		font-size:12pt;
	}
	.font12{
		font-size:12pt;
	}
	.font14{
		font-size:14pt;
	}
	.font16{
		font-size:16pt;
	}
	.font18{
		font-size:18pt;
	}
	.font20{
		font-size:20pt;
	}
	.font22{
		font-size:22pt;
	}
	.font24{
		font-size:24pt;
	}
	.font26{
		font-size:26pt;
	}
	.font28{
		font-size:28pt;
	}
	.tebal{
		font-weight:bold;
	}
	.identitas{
		border:1px solid #000;
		border-collapse:collapse;
		border-radius:5px;
		padding:10px;
		width:400px;
		float:right;
		margin-left:100px;
	}
	.w100{
		width:100px;
	}
	.w150{
		width:150px;
	}
	.judulsurat{
		width:100%;
	}
	.right{
		text-align:right;
	}
	.td{
		padding:10px;
	}
	.table {
		width: 100%;
		max-width: 100%;
		margin-bottom: 20px;
		border-collapse:collapse;
		padding:10px;
	}
	.table-bordered {
		border: 1px solid #000;
		border-collapse;collapse;
		
	}
	.table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
		border: 1px solid #000;
		border-collapse:collapse;
		padding:5px;
	}
	.text-right{
		text-align:right;
	}
	</style>
</head>
<body>
<div class="surat">
	<div class="baris">
		<div class="logo">
			<img src="<?= base_url() ."assets/images/logo.png" ?>" alt="" class="logo">
		</div>
		<div class="kop">
			<div class="text-center">
				<div class="font10">PEMERINTAHAN KOTA PADANG</div>
				<div class="font18 tebal">RSUD dr. RASIDIN</div>
				<div class="font8">J. Air Paku Sei Sapih</div>
				<div class="font8">Telp. (0751) 499158 Fax. (0751) 495330</div>
			</div>
		</div>
		<div class="identitas">
			<table>
				<tr>
					<td class="w150">No. MR</td><td>: <?= $row->nomr ?></td>
				</tr>
				<tr>
					<td>Nama Pasien</td><td>: <?= $row->nama ?></td>
				</tr>
				<tr>
					<td>Tanggal Lahir</td><td>: <?= longDate($row->tgllahir) ?></td>
				</tr>
				<tr>
					<td>Jenis Kelamin</td><td>: <?= $row->jnskelamin==1?"Laki-Laki":"Perempuan"; ?></td>
				</tr>
			</table>
			
		</div>
		
	</div>
	
	
	<div class="baris">
		<h3>Keterangan Klinis</h3>
		
	</div>
	<div class="baris">
	<p><?= $row->diagnosa_klinis?></p>
	</div>
	<div class="baris">
		<h3>Uraian Pemeriksaan</h3>
		
	</div>
	<div class="baris">
	<p><?= $row->uraianhasilpemeriksaan ?></p>
	</div>
	<div class="baris">
		<h3>Kesan</h3>
		
	</div>
	<div class="baris">
	<p><?= $row->kesan ?></p>
	</div>
	<div class="baris">
		<h3>Catatan</h3>
		
	</div>
	<div class="baris">
	<p><?= $row->catatan ?></p>
	</div>
	<br>
	<br>
	<div class="baris text-right" style="display:block;">
	Dokter <br>
	
	<?= longDate($row->tanggalpemeriksaan)?>
	<br><br><br>
	<?= $row->namadokterradiologi ?>
	</div>

</div>
</body>
</html>
