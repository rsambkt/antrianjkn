<link href="<?= base_url() ."assets/js/tree/skin-win8/ui.fancytree.css"?>" rel="stylesheet" type="text/css" />
<style type='text/css'>
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
.ui-autocomplete-loading {
        background: white url("<?php echo base_url() ?>ui-anim_basic_16x16.gif") right center no-repeat;
    }

    .ui-autocomplete-input {
        border: none;
        font-size: 14px;
        border: 1px solid #DDD !important;
        /*z-index: 1511;*/
        position: relative;
    }

    .ui-menu .ui-menu-item a {
        font-size: 12px;
    }

    .ui-autocomplete {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1510 !important;
        float: left;
        display: none;
        min-width: 160px;
        width: 160px;
        padding: 4px 0;
        margin: 2px 0 0 0;
        list-style: none;
        background-color: #ffffff;
        border-color: #ccc;
        border-color: rgba(0, 0, 0, 0.2);
        border-style: solid;
        border-width: 1px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding;
        background-clip: padding-box;
        *border-right-width: 2px;
        *border-bottom-width: 2px;
    }

    .ui-menu-item>a.ui-corner-all {
        display: block;
        padding: 3px 15px;
        clear: both;
        font-weight: normal;
        line-height: 18px;
        color: #555555;
        white-space: nowrap;
        text-decoration: none;
    }

    .ui-state-hover,
    .ui-state-active {
        color: #ffffff;
        text-decoration: none;
        background-color: #0088cc;
        border-radius: 0px;
        -webkit-border-radius: 0px;
        -moz-border-radius: 0px;
        background-image: none;
    }
	.kotak{
		border:1px solid #ccc;
		border-collapse:collapse;
		padding:10px;
	}

	body {
	background-color: #f7f7f7;
	/* background-color: #39414A;
	color: white; */
	font-family: Helvetica, Arial, sans-serif;
	font-size: smaller;
	/* background-image: url("nav_bg.png"); */
	/* background-repeat: repeat-x; */
}
div#tree {
	position: absolute;
	height: 95%;
	width: 95%;
	padding: 5px;
	margin-right: 16px;
}
ul.fancytree-container {
	height: 100%;
	width: 100%;
	overflow: auto;
	background-color: transparent;
}
span.fancytree-node span.fancytree-title {
	/* color: white; */
	text-decoration: none;
}
/* span.fancytree-focused span.fancytree-title {
	outline-color: white;
} */
span.fancytree-node:hover span.fancytree-title,
span.fancytree-active span.fancytree-title,
span.fancytree-active.fancytree-focused span.fancytree-title,
.fancytree-treefocus span.fancytree-title:hover,
.fancytree-treefocus span.fancytree-active span.fancytree-title {
	color: #39414A;
}
span.external span.fancytree-title:after {
	content: "";
	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC") 100% 50% no-repeat;
	padding-right: 13px;
}
/* Remove system outline for focused container */
.ui-fancytree.fancytree-container:focus {
	outline: none;
}
.ui-fancytree.fancytree-container {
	border: none;
}
.border{
	border:1px solid #ccc;
	border-collapse:collapse;
	display:table;
}

</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-xs-3 ">
            <div class="box box-primary">
                <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="<?php if ($row->jns_kelamin == '1') echo base_url() . "assets/images/male.png";
                                                        else echo base_url() . "assets/images/female.png"; ?>" alt="User profile picture">
                
                <h3 class="profile-username text-center"><?= $row->nama . "(" . $row->nomr . ")" ?></h3>

                <p class="text-muted text-center"><?= $row->nik ?></p>

                <table class="table">
                        <tr>
                            <td><b>NIK</b></td>
                            <td><?= $row->nik ?></td>
                        </tr>
                        <tr>
                            <td><b>No BPJS</b></td>
                            <td><?= $row->nobpjs ?></td>
                        </tr>
                        <tr>
                            <td><b>Nama</b></td>
                            <td><?= $row->nama ?></td>
                        </tr>
                        <tr>
                            <td><b>TTL</b></td>
                            <td><?= $row->tempat_lahir . " / ", $row->tgl_lahir ?></td>
                        </tr>
                        <tr>
                            <td><b>Agama</b></td>
                            <td><?= $row->agama ?></td>
                        </tr>
                        <tr>
                            <td><b>Suku</b></td>
                            <td><?= $row->suku ?></td>
                        </tr>
                        <tr>
                            <td><b>Bahasa</b></td>
                            <td><?= $row->bahasa ?></td>
                        </tr>
                        <tr>
                            <td><b>Alamat</b></td>
                            <td>
                            <?= $row->alamat . "<br>Kel. " . $row->kelurahan
                                                            . "<br>Kec. " . $row->kecamatan
                                                            . "<br>Kab / Kota " . $row->kab_kota
                                                            . "<br>Prov " . $row->nama_provinsi; ?>
                            </td>
                        </tr>
                        <tr>
                            <td><b>No Telp</b></td>
                            <td><?= $row->notelp ?></td>
                        </tr>
                        <tr>
                            <td><b>Keluarga</b></td>
                            <td><?= $row->penanggung_jawab ."(".$row->hub_keluarga.")" ?></td>
                        </tr>
                        <tr>
                            <td><b>No Keluarga</b></td>
                            <td><?= $row->no_penanggung_jawab ?></td>
                        </tr>
                        <tr>
                            <td><b>Cara Bayar</b></td>
                            <td><?= $row->carabayar ?></td>
                        </tr>
                        <tr>
                            <td><b>Rujukan</b></td>
                            <td><?= $row->rujukan ?></td>
                        </tr>
                        <tr>
                            <td><b>Poliklinik</b></td>
                            <td><?= $row->nama_poli ?></td>
                        </tr>
                        <tr>
                            <td><b>Dokter</b></td>
                            <td><?= $row->nama_dokter ?></td>
                        </tr>
                        <tr>
                            <td><b>No SEP</b></td>
                            <td><?= $row->no_sep ?></td>
                        </tr>
                    </table>
					<br>
					<input type="hidden" name="kodebooking" id="kodebooking" value="<?= !empty($antrean) ? $antrean->kodebooking :""; ?>">
					<input type="hidden" name="antreanfarmasi" id="antreanfarmasi" value="<?= !empty($antrean) ? $antrean->antreanfarmasi :""; ?>">
					
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-9">
			<div class="box box-primary">
				<div class="box-header">List Order Obat</div>
                <div class="box-body box-profile">
                <div class="row">
					<div class="col-md-12">
						<form action="#" id="aproveresep" method="POST">
							<input type="hidden" name="kodebooking" id="kodebooking" value="<?= !empty($antrean) ? $antrean->kodebooking:"" ?>">
							<input type="hidden" name="idx_pendaftaran" id="idx_pendaftaran" value="<?= !empty($row) ? $row->idx_pendaftaran:"" ?>">
							<input type="hidden" name="idx_resep" id="idx_resep" value="<?= !empty($row) ? $row->idx_resep:"" ?>">
							<input type="hidden" name="jns_layanan" id="jns_layanan" value="<?= !empty($row) ? $row->jns_layanan:"" ?>">
							<table class="table">
								<tr>
									<th style="width:150px;">No Resep</th>
									<th>: <?= $row->no_resep?></th>
								</tr>
								<tr>
									<th>Tanggal Resep</th>
									<th>: <?= longDate($row->tgl_resep)?></th>
								</tr>
								<tr>
									<th>Jenis Resep</th>
									<th>: <?= $row->jenisresep?></th>
								</tr>
								<tr>
									<th>Dokter Dpjp</th>
									<th>: <?= $row->namadokterdpjp?></th>
								</tr>
							</table>
							<table class="table table-bordered">
								<thead class="bg-green">
									<tr>
										<td style="width:50px;"><input type="checkbox" name="checkall" id="checkall" value="1" onclick="checkAll()"></td>
										<td style="width:100px;">Jumlah</td>
										<td>Nama Obat</td>
										<td>Aturan Pakai</td>
									</tr>
								</thead>
								<tbody>
									<?php 
									foreach ($resep as $r ) {
										?>
										<tr>
											<td>
												<input type="hidden" name="idx[]" id="idx" value="<?= $r->idx_detail ?>">
												<input type="checkbox" name="obatid<?= $r->idx_detail ?>" id="obatid<?= $r->idx_detail ?>" value="<?= $r->idx_detail ?>" class="obatid" <?= $r->statusobat==1?"checked":""?>>
											</td>
											<td><input type="text" name="jumlah<?= $r->idx_detail ?>" id="jumlah<?= $r->idx_detail ?>" class="form-control jumlah" value="<?= $r->jumlah ?>" <?= $r->statusobat==0?"readonly":""?>></td>
											<td><?= $r->obatnama ?></td>
											<td><?= $r->signa1 ."x".$r->signa2 ." " .$r->keterangan?></td>
											
										</tr>
										<?php
									}
									?>
								</tbody>
							</table>
						</form>
						
						<button class="btn btn-primary" id="btnEtiket" onclick="aproveResep()"><span class="fa fa-print" id="iconEtiket"></span> Cetak E Tiket</button>
					</div>
				</div>
				</div>
            </div>
        </div>
    </div>
</section>

	<div id="bookingantreanfarmasi" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content" style="overflow-y: hidden;">
                <div class="modal-header bg-red">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Konfirmasi Booking Antrean Farmasi</h4>
                </div>
                <div class="modal-body text-center">
					

					<form class="form-horizontal" id="antrolfarmasi" style="font-size:12px;">
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Jenis Resep:</label>
								<div class="col-sm-10">
									<input type="hidden" id="booking" name="booking" value="<?= !empty($antrean) ? $antrean->kodebooking :""; ?>">
									<input type="hidden" id="taskaktif" name="taskaktif" value="<?= !empty($antrean) ? $antrean->taskid :""; ?>">
									<select name="jenisresep" id="jenisresep" class="form-control">
										<option value="Non Racikan">Non Racikan</option>
										<option value="Racikan">Racikan</option>
									</select>
								</div>
                            </div>
                </div>
                <div class="modal-footer text-center">
					<button class="btn btn-primary" type="button" id="btnBookingFarmasi" onclick="bookingAntrianFarmasi()"><span class="fa fa-save" id="iconBookingFarmasi"></span> Ambil Antrian Farmasi</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
	<div id="antrianfarmasi" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content" style="overflow-y: hidden;">
                <div class="modal-header bg-red">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Antrian Farmasi</h4>
                </div>
                <div class="modal-body text-center">
					

					<form class="form-horizontal" id="antrolfarmasi" style="font-size:12px;">
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Jenis Resep:</label>
								<div class="col-sm-10">
									<input type="hidden" id="booking" name="booking" value="<?= !empty($antrean) ? $antrean->kodebooking :""; ?>">
									<input type="hidden" id="taskaktif" name="taskaktif" value="<?= !empty($antrean) ? $antrean->taskid :""; ?>">
									<select name="jenisresep" id="jenisresep" class="form-control">
										<option value="Non Racikan">Non Racikan</option>
										<option value="Racikan">Racikan</option>
									</select>
								</div>
                            </div>
                </div>
                <div class="modal-footer text-center">
					<button class="btn btn-primary" type="button" id="btnBookingFarmasi" onclick="bookingAntrianFarmasi()"><span class="fa fa-save" id="iconBookingFarmasi"></span> Ambil Antrian Farmasi</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>

	<div id="modalantrian" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content modal-sm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Antrian</h4>
      </div>
      <div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<div id="cetakantrian" style="width:270px; height:auto;">
							<div class="text-center" style="text-align:center">
							<h3>Antrian Farmasi</h3>
							<div class="font32" id="nomorantrian" style="font-size:32pt;color:#00a65a;text-shadow:2px 2px #2px 2px #6de37f;"></div>
							<div id="kodebooking" class="font18"></div>
							<div id="politujuan" class="font12"></div>
							<div class="keterangan" id="estimasi" style="font-size:12pt;border-bottom:1px solid #ccc;"></div>
							<div class="keterangan" id="keterangan" style="font-size:12pt">Pasien Hiarapkan datang Sebelum Jam Sekian</div>
							</div>
							

						</div> 
					</div>
				</div>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-default btn-block" onclick="cetakAntrian()"><span class="fa fa-print"></span> Cetak</button>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
// $(function(){
// 	// --- Initialize sample trees
	
// });

</script>

