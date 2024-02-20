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
.w100{
	width:100px;
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
					<button class="btn btn-danger btn-block" type="button" id="btnSelesai" onclick="selesaiLayan()"><span class="fa fa-flag-checkered" id="iconSelesai"></span> Selesai Dilayani</button>
                    <!-- <button class="btn btn-danger btn-block" onclick="batalDaftar(<?= $row->idx ?>)"><span class="fa fa-remove"></span> Batalkan</button> -->
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-9">
            <!-- Custom Tabs -->
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="tab tab1 active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-stethoscope"></span> Asesmen Awal Medis (Dokter)</a></li>
                    <li class="tab tab2"><a href="#tab_2" data-toggle="tab"><span class="fa fa-heartbeat"></span> Catatan Perkembangan Pasien</a></li>
                    <li class="tab tab3"><a href="#tab_3" data-toggle="tab"  onclick="listKunjungan(1)"><span class="fa fa-list" ></span> Riwayat Pasien</a></li>
                    <li class="tab tab4"><a href="#tab_4" data-toggle="tab"  onclick="rencanaKontrolBpjs()"><span class="fa fa-file-o"></span> Surat Kontrol</a></li>
                    <li class="tab tab5"><a href="#tab_5" data-toggle="tab" onclick="getRujukanKeluar()"><span class="fa fa-envelope" ></span> Surat Rujukan</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab tab-pane active" id="tab_1">
                    	<div class="row">
                            <div class="col-md-12">
                                <form class="form-horizontal" id="form" action="#">
                                    <input type="hidden" id="idx" name="idx" value="<?= !empty($asesmen) ? $asesmen->idx : "" ?>">
                                    <input type="hidden" id="idx_pendaftaran" name="idx_pendaftaran" value="<?=  $row->idx ?>">
                                    <input type="hidden" id="id_daftar" name="id_daftar" value="<?=  $row->id_daftar ?>">
                                    <input type="hidden" id="reg_unit" name="reg_unit" value="<?=  $row->reg_unit ?>">
                                    <input type="hidden" id="nama" name="nama" value="<?=  $row->nama_pasien ?>">
                                    <input type="hidden" id="nomr" name="nomr" value="<?=  $row->nomr_pasien ?>">
                                    <input type="hidden" id="tgllahir" name="tgllahir" value="<?=  $row->tgl_lahir ?>">
                                    <input type="hidden" id="jnskelamin" name="jnskelamin" value="<?=  $row->jns_kelamin ?>">
                                    <input type="hidden" id="id_ruang_asal" name="id_ruang_asal" value="<?=  $row->id_poli ?>">
                                    <input type="hidden" id="nama_ruang_asal" name="nama_ruang_asal" value="<?=  $row->nama_poli ?>">
                                    <input type="hidden" id="id_cara_bayar" name="id_cara_bayar" value="<?=  $row->id_cara_bayar ?>">
                                    <input type="hidden" id="cara_bayar" name="cara_bayar" value="<?=  $row->carabayar ?>">
                                    
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="email">Tanggal / Jam:</label>
                                        <div class="col-sm-10">
											<input type="text" name="tanggalasesmen" id="tanggalasesmen" class="datepicker form-control" value="<?=  !empty($asesmen) ? $asesmen->tanggalasesmen : date('Y-m-d H:i:s') ?>" readonly>
                                        	<span class="error" id="err_tanggalasesmen"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="email">Data Diperoleh Dari (*):</label>
                                        <div class="col-sm-10" id="sumberdata">
											<?php 
											$sumberdata=!empty($asesmen) ? explode(",",$asesmen->sumberinformasi) : array();
											?>
											<input type="checkbox" name="sumberdata[]" id="pasien" value="Pasien" <?= in_array("Pasien",$sumberdata) ? "checked":"" ?>>Pasien <br>
											<input type="checkbox" name="sumberdata[]" id="oranglain" value="Orang Lain" <?= in_array("Orang Lain",$sumberdata) ? "checked":"" ?>>Orang Lain
                                        	<span class="error" id="err_sumberinformasi"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Keluhan Utama (*): </label>
                                        <div class="col-sm-10">
                                            <textarea name="keluhanutama" id="keluhanutama" cols="30" rows="3" class="form-control" placeholder="Keluhan Utama"><?= !empty($asesmen) ? $asesmen->keluhanutama : "" ?></textarea>
                                            <span class="error" id="err_keluhanutama"></span>
                                        </div>
                                    </div>
									<legend>Riwayat Penyakit</legend>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Sekarang:</label>
                                        <div class="col-sm-10">
                                            <textarea name="riwayat_penyakit_sekarang" id="riwayat_penyakit_sekarang" cols="30" rows="3" class="form-control" placeholder="Riwayat Penyakit Sekarang"><?= !empty($asesmen) ? $asesmen->riwayat_penyakit_sekarang : "" ?></textarea>
                                            <span class="error" id="err_riwayat_penyakit_sekarang"></span>
                                        </div>
                                    </div>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Dahulu:</label>
                                        <div class="col-sm-10">
                                            <textarea name="riwayat_penyakit_dahulu" id="riwayat_penyakit_dahulu" cols="30" rows="3" class="form-control" placeholder="Riwayat Penyakit Dahulu"><?= !empty($asesmen) ? $asesmen->riwayat_penyakit_dahulu : "" ?></textarea>
                                   			<span class="error" id="err_riwayat_penyakit_dahulu"></span>
                                        </div>
                                    </div>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Alloanamnesa (*):</label>
                                        <div class="col-sm-10">
                                            <textarea name="alloanamnessa" id="alloanamnessa" cols="30" rows="3" class="form-control" placeholder="Allo Anamnesa"><?= !empty($asesmen) ? $asesmen->alloanamnessa : "" ?></textarea>
                                    		<span class="error" id="err_alloanamnessa"></span>
                                        </div>
                                    </div>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Riwayat Penyakit Keluarga:</label>
                                        <div class="col-sm-10">
                                            <textarea name="riwayat_penyakit_keluarga" id="riwayat_penyakit_keluarga" cols="30" rows="3" class="form-control" placeholder="Riwayat Penyakit Keluarga"><?= !empty($asesmen) ? $asesmen->riwayat_penyakit_keluarga : "" ?></textarea>
                                    		<span class="error" id="err_riwayat_penyakit_keluarga"></span>
                                        </div>
                                    </div>
									<legend>Pemeriksaan Fisik</legend>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Kepala / Leher:</label>
                                        <div class="col-sm-10">
                                            <textarea name="pemeriksaan_fisik_kepala" id="pemeriksaan_fisik_kepala" cols="30" rows="3" class="form-control" placeholder="Pemeriksaan Kepala / Leher"><?= !empty($asesmen) ? $asesmen->pemeriksaan_fisik_kepala : "" ?></textarea>
                                    		<span class="error" id="err_pemeriksaan_fisik_kepala"></span>
                                        </div>
                                    </div>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Torak:</label>
                                        <div class="col-sm-10">
                                            <textarea name="pemeriksaan_fisik_torak" id="pemeriksaan_fisik_torak" cols="30" rows="3" class="form-control" placeholder="Pemeriksaan Torak"><?= !empty($asesmen) ? $asesmen->pemeriksaan_fisik_torak : "" ?></textarea>
                                    		<span class="error" id="err_pemeriksaan_fisik_torak"></span>
                                        </div>
                                    </div>
									<legend>Pengkajian Awal Medis</legend>
									<div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Pemeriksaan Fisik:</label>
                                        <div class="col-sm-10">
                                            <textarea name="kajian_awal_medis" id="kajian_awal_medis" cols="30" rows="3" class="form-control" placeholder="Pemeriksaan Kepala / Leher"><?= !empty($asesmen) ? $asesmen->kajian_awal_medis : "" ?></textarea>
                                    		<span class="error" id="err_kajian_awal_medis"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" class="btn btn-primary" onclick="simpanAsesmenDokter()" id="btnsimpan" ><span class="fa fa-arrow-right" id="iconsimpan"></span> Simpan Dan Lanjutkan</button>
                                        </div>
                                    </div>
                                </form> 
                            </div>
                            
                        </div>
                    </div>
                    <div class="tab tab-pane" id="tab_2">
                        <form class="form-horizontal" id="cppt" style="font-size:12px">
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Tanggal / Jam:</label>
								<div class="col-sm-10">
									<input type="hidden" id="cpid" name="cpid" value="<?= !empty($cp) ? $cp->idx : "" ?>">
									<input type="text" name="tglcatat" id="tglcatat" class="datepicker form-control" value="<?= date('Y-m-d H:i:s')?>" readonly>
									<span class="error" id="err_tglcatat"></span>
								</div>
                            </div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Vital Sign (<i>TD/Nadi/Nafas/Suhu/Kesadaran</i>):</label>
								<div class="col-sm-1">
									<input type="text" name="td" id="td" class="form-control" value="<?= !empty($cp)?$cp->td:"" ?>" placeholder="TD">
									<span class="error" id="err_td"></span>
								</div>
								<div class="col-sm-1">
									<input type="text" name="nadi" id="nadi" class="form-control" value="<?= !empty($cp)?$cp->nadi:"" ?>" placeholder="Nadi">
									<span class="error" id="err_nadi"></span>
								</div>
								<div class="col-sm-1">
									<input type="text" name="nafas" id="nafas" class="form-control" value="<?= !empty($cp)?$cp->nafas:"" ?>" placeholder="Nafas">
									<span class="error" id="err_nafas"></span>
								</div>
								<div class="col-sm-1">
									<input type="text" name="suhu" id="suhu" class="form-control" value="<?= !empty($cp)?$cp->suhu:"" ?>" placeholder="suhu">
									<span class="error" id="err_suhu"></span>
								</div>
								<div class="col-sm-6">
									<input type="text" name="kesadaran" id="kesadaran" class="form-control" value="<?= !empty($cp)?$cp->kesadaran:"" ?>" placeholder="Kesadaran">
									<span class="error" id="err_kesadaran"></span>
								</div>
                            </div>
							<hr>
							<ul class="nav nav-pills">
								<li class="active"><a data-toggle="tab" href="#soap">SOAP</a></li>
								<li><a data-toggle="tab" href="#obat" onclick="getResep()">Obat</a></li>
								<li><a data-toggle="tab" href="#labor" onclick="getListPermintaanLabor()">Labor</a></li>
								<li><a data-toggle="tab" href="#radiologi" onclick="getListPermintaanRadiologi()">Radiologi</a></li>
								<li class=""><a data-toggle="tab" href="#konsul" onclick="getKonsul()">Konsul Ke poli</a></li>
								<li class=""><a data-toggle="tab" href="#tindakan" onclick="getListTindakan()" >Tindakan</a></li>
							</ul>

							<div class="tab-content">
								<div id="soap" class="tab-pane kotak fade active in">
									<div class="form-group">
										<label class="control-label col-sm-2" for="email">Subjective (S):</label>
										<div class="col-sm-10">
											<textarea name="subjective" id="subjective" cols="30" rows="5" class="form-control"><?= !empty($cp)?$cp->subjective:"" ?></textarea>
											<span class="error" id="err_subjective"></span>
										</div>
										
									</div>
									<div class="form-group">
										<label class="control-label col-sm-2" for="email">Objective (O):</label>
										<div class="col-sm-10">
											<textarea name="objective" id="objective" cols="30" rows="5" class="form-control"><?= !empty($cp)?$cp->objective:"" ?></textarea>
											<span class="error" id="err_objective"></span>
										</div>
										
									</div>
									<div class="form-group">
										<label class="control-label col-sm-2" for="email">Asesment (A):</label>
										<div class="col-sm-10">
											<select name="asesmen" id="asesmen" class="form-control select2" style="width:100%">
												<?php $kode = !empty($cp) ? $cp->kodediagnosa : "" ?>
												<option value="">Pilih</option>
												<?php 
												foreach ($diagnosa as $d ) {
													?>
													<option value="<?= $d->kode ?>" <?= $kode==$d->kode ? "selected": "" ?>><?= $d->kode." - ".$d->diagnosa ?></option>
													<?php
												}
												?>
											</select>
											<span class="error" id="err_asesmen"></span>
										</div>
										
									</div>
									<div class="form-group">
										<label class="control-label col-sm-2" for="email">Planning (P):</label>
										<div class="col-sm-10">
											<textarea name="planning" id="planning" cols="30" rows="5" class="form-control"><?= !empty($cp)?$cp->planning:"" ?></textarea>
											<span class="error" id="err_planning"></span>
										</div>
										
									</div>
									<div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" class="btn btn-primary" onclick="simpanCppt()" id="btnSimpanCppt" ><span id="iconSimpanCppt" class="fa fa-save"></span> Simpan</button>
                                        </div>
                                    </div>
								</div>
								<div id="obat" class="tab-pane kotak fade">
									<legend>Masukkan Obat</legend>
									<ul class="nav nav-pills">
										<li class="active"><a data-toggle="tab" href="#nonracikan" onclick="getResep()"><span class="fa fa-file-o"></span> Non Racikan</a></li>
										<li><a data-toggle="tab" href="#racikan" onclick="getResep('Racikan')"><span class="fa fa-file-text-o"></span> Racikan</a></li>
										<li><a data-toggle="tab" href="#cetakresep" onclick="getAllResep()"><span class="fa fa-print"></span> Cetak Resep</a></li>
										
									</ul>
									<div class="tab-content">
										<!-- <div id="nonracikan" class="tab-pane kotak fade active in"> -->
										<div id="nonracikan" class="tab-pane kotak fade active in">
											<div class="form-group">
												<!-- <label class=" col-sm-12" for="email">Obat :</label> -->
												<div class="col-sm-6">
													<div class="input-group">
														<input type="hidden" name="idx_resep" id="idx_resep" >
														<input type="hidden" name="idx_obat" id="idx_obat" >
														<input type="hidden" name="jenisresep" id="jenisresep" value="Non Racikan">
														<input type="hidden" name="obatid" id="obatid" >
														<input type="hidden" name="satuan" id="satuan" >
														<input type="hidden" name="dokterdpjp" id="dokterdpjp" value="<?= $row->id_dokter ?>">
														<input type="hidden" name="namadokterdpjp" id="namadokterdpjp" value="<?= $row->nama_dokter ?>">
														<input type="text" name="obatnama" id="obatnama" class="form-control" placeholder="Masukkan nama obat">
														<span class="input-group-addon">
															<span class="fa fa-search"></span>
														</span>
													</div>
													
													<span class="error" id="err_obat"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="signa1" id="signa1" class="form-control" placeholder="Signa 1">
												<span class="error" id="err_signa1"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="signa2" id="signa2" class="form-control" placeholder="Signa 2">
												<span class="error" id="err_signa2"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="jml" id="jml" class="form-control" placeholder="Jumlah">
												<span class="error" id="err_jml"></span>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="text" name="keterangan" id="keterangan" class="form-control" placeholder="Keterangan">
														<span class="input-group-btn">
															<button class="btn btn-primary" type="button" id="btnTambahResep" onclick="simpanResep()"><span class="fa fa-plus" id="iconTambahResep"></span></button> 
														</span>
													</div>
													<span class="error" id="err_keterangan"></span>
												</div>
											</div>

											<table class="table table-bordered">
												<thead>
													<tr>
														<td style="width:50px;">No</td>
														<td>Obat</td>
														<td>Signa</td>
														<td>Jumlah</td>
														<td style="width:80px">Status</td>
														<td style="width:150px">#</td>
													</tr>
												</thead>
												<tbody id="dataresep"></tbody>
											</table>
										</div>
										<div id="racikan" class="tab-pane kotak fade">
											<div id="notif"></div>
											<div class="form-group">
												<!-- <label class=" col-sm-12" for="email">Obat :</label> -->
												<div class="col-sm-4">
													<div class="input-group">
														<input type="hidden" name="r_idx_resep" id="r_idx_resep" >
														<input type="hidden" name="r_obatid" id="r_obatid" value="0">
														<input type="hidden" name="r_idx_obat" id="r_idx_obat" >
														<input type="hidden" name="r_satuan" id="r_satuan" >
														<input type="text" name="r_obatnama" id="r_obatnama" class="form-control" placeholder="Masukkan nama Racikan">
														<!-- <span class="input-group-addon">
															<span class="fa fa-search"></span>
														</span> -->
													</div>
													
													<span class="error" id="err_r_obat"></span>
												</div>
												<div class="col-md-2">
													<select name="metoderacik" id="metoderacik" class="form-control">
														<option value="">Pilih Metode</option>
														<?php 
														foreach ($metoderacik as $m ) {
															?>
															<option value="<?= $m->metode ?>"><?= $m->metode ?></option>
															<?php
														}
														?>
													</select>
													<span class="error" id="err_metoderacik"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="r_signa1" id="r_signa1" class="form-control" placeholder="Signa 1">
												<span class="error" id="err_r_signa1"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="r_signa2" id="r_signa2" class="form-control" placeholder="Signa 2">
												<span class="error" id="err_r_signa2"></span>
												</div>
												<div class="col-md-1">
												<input type="text" name="r_jml" id="r_jml" class="form-control" placeholder="Jumlah">
												<span class="error" id="err_r_jml"></span>
												</div>
												<div class="col-md-3">
													<div class="input-group">
														<input type="text" name="r_keterangan" id="r_keterangan" class="form-control" placeholder="Keterangan">
														<span class="input-group-btn">
															<button class="btn btn-primary" type="button" id="r_btnTambahResep" onclick="simpanResepRacikan()"><span class="fa fa-plus" id="r_iconTambahResep"></span></button> 
														</span>
													</div>
													<span class="error" id="err_r_keterangan"></span>
												</div>
											</div>
											<table class="table table-bordered">
												<thead>
													<tr>
														<td style="width:50px;">No</td>
														<td>Obat</td>
														<td>Signa</td>
														<td>Jumlah</td>
														<td>Komponen</td>
														<td style="width:80px">Status</td>
														<td style="width:150px">#</td>
													</tr>
												</thead>
												<tbody id="dataresepracikan"></tbody>
											</table>
										</div>
										<div id="cetakresep" class="tab-pane kotak fade">
											<div class="row">
												<div class="col-md-6">
													<fieldset>
														<legend>
															<div class="row">
																<div class="col-md-12">
																	Resep Umum <button class="btn btn-default btn-xs" onclick="cetakResep('resepumum')"><span class="fa fa-print"></span> Cetak</button>
																</div>
															</div>
														</legend>
														<div id="resepumum"></div>
													</fieldset>
												</div>
												<div class="col-md-6">
													<fieldset>
													<legend>
															<div class="row">
																<div class="col-md-12">
																	Resep Racikan <button class="btn btn-default btn-xs" onclick="cetakResep('resepracikan')"><span class="fa fa-print"></span> Cetak</button>
																</div>
															</div>
														</legend>
														<div id="resepracikan"></div>
													</fieldset>
												</div>
											</div>
											
										</div>
									</div>
									


								</div>
								<div id="labor" class="tab-pane kotak fade">
									<div id="listpermintaan" style="display:none;">
										<button class="btn btn-primary" type="button" onclick="buatPermintaanLabor()"><span class="fa fa-plus"></span> Buat Permintaan</button>
										<hr>
										<table class="table table-bordered">
											<thead>
												<tr>
													<th>No</th>
													<th>Diagnosa Klinis</th>
													<th>Jenis Sample</th>
													<th>Tgl Pengambilan Sample</th>
													<th>Cara Bayar</th>
													<th>Pemeriksaan</th>
													<th>Status</th>
													<th>#</th>
												</tr>
											</thead>
											<tbody id="listdatapermintaanlabor"></tbody>
										</table>
									</div>
									<div id="formpermintaanlabor">
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Jenis Sample:</label>
											<div class="col-sm-10">
											<input type="hidden" name="idx_permintaan" id="idx_permintaan" value="" >
											<input type="text" name="jenis_sample" id="jenis_sample" class="form-control" value="" placeholder="Jenis Sample">
											<span class="error" id="err_jenis_sample"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Tanggal Pengambilan Sample:</label>
											<div class="col-sm-5">
											<input type="text" name="tglpengambilansample" id="tglpengambilansample" class="form-control datepicker" value="" placeholder="Tanggal Pengambilan Sample">
											<span class="error" id="err_tglpengambilansample"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Diagnosa (Keterangan Klinis):</label>
											<div class="col-sm-10">
												<textarea name="diagnosa_keterangan_klinis" id="diagnosa_keterangan_klinis" cols="30" rows="3" class="form-control" placeolder="Masukkan Diagnosa Klinis"></textarea>
												<span class="error" id="err_diagnosa_keterangan_klinis"></span>
											</div>
											
										</div>
										<div class="row">
											<div class="col-md-3 " style="height:40vh;">
												<div class="border" id="tree">
													<ul>
														<li class="folder"> Pemeriksaan Labor
															<ul>
															<?php 
															foreach ($pemeriksaan as $p ) {
																$kode=$p->kode;
																$kode=str_replace(".00","",$kode);
																$sub=$this->kunjungan_model->getSubRootPemeriksaan(9,$kode,$p->kode);
																// $sub=array();
																if(!empty($sub)){
																	?>
																	<li class="folder"><?= $p->namapemeriksaan?>
																	<ul>
																		<?php 
																		foreach ($sub as $s ) {
																			$skode=$s->kode;
																			$skode=str_replace(".00","",$skode);
																			$subp=$this->kunjungan_model->getSubPemeriksaan(9,$skode,$s->kode);
																			if(empty($subp)){
																				?>
																				<li class="folder"><a href="<?= $s->kode ?>" data="<?= $s->kode ?>" onclick="getPermintan('<?= $s->kode ?>')"><?= $s->namapemeriksaan ?></a></li>
																				<?php
																			}else{
																				?>
																				<li class="folder"><?= $s->namapemeriksaan ?>
																				<ul>
																				<?php 
																				foreach ($subp as $sb ) {
																					?>
																					<li class="folder"><a href="<?= $sb->kode ?>" data="<?= $sb->kode ?>" onclick="getPermintan('<?= $sb->kode ?>')"><?= $sb->namapemeriksaan ?></a></li>
																					<?php
																				}
																				?>
																				</ul>
																				</li>
																				
																				<?php
																			}
																			
																		}
																		?>
																		<!-- <li class="folder">Folder 1</li>
																		<li class="folder">Folder 2</li> -->
																	</ul>
																	</li>
																	<?php
																}else{
																	$sub=$this->kunjungan_model->getSubPemeriksaan(6,$kode,$p->kode);
																	if(!empty($sub)){
																		?>
																		<li class="folder"><?= $p->namapemeriksaan ?>
																		<ul>
																			<?php 
																			foreach ($sub as $s ) {
																				?>
																				<li class="folder"><a href="<?= $s->kode ?>" data="<?= $s->kode ?>" onclick="getPermintan('<?= $s->kode ?>')"><?= $s->namapemeriksaan ?></a></li>
																				<?php
																			}
																			?>
																		</ul>
																		</li>
																		<?php
																	}else{
																		?>
																		<li class="folder"><a href="<?= $p->kode ?>" data="<?= $p->kode ?>" onclick="getPermintan('<?= $p->kode ?>')"><?= $p->namapemeriksaan ?></a></li>
																	<?php
																	}
																	
																}
																
															}
															?>
															</ul>
															
														</li>
													</ul>
												</div>
											</div>
											<div class="col-md-9">
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title" id="v-namapemeriksaan"></h3>
													</div>
													<div class="panel-body">
														<div class="row">
															<!-- <div class="col-md-12"> -->
																<input type="hidden" name="kode" id="kode">
															<div id="datapemeriksaan"></div>
															<span class="error" id="err_pemeriksaan"></span>
															<!-- </div> -->
														</div>
													
													</div>
													<div class="panel-footer">
														<button type="button" class="btn btn-primary" id="btnSimpanPermintaan" disabled onclick="simpanPermintaanLabor()"><span class="fa fa-save" id="iconSimpanPermintaan"></span> Simpan</button>
													</div>
												</div>
												
												
												
												
											</div>
										</div>
									</div>
									
								
								</div>
								<div id="radiologi" class="tab-pane kotak fade">
									<div id="listpermintaanradiologi" style="display:none;">
										<button class="btn btn-primary" type="button" onclick="buatPermintaanRadiologi()"><span class="fa fa-plus"></span> Buat Permintaan</button>
										<hr>
										<table class="table table-bordered">
											<thead>
												<tr>
													<th>No</th>
													<th>Diagnosa Klinis</th>
													<th>Diagnosa</th>
													<th>Tgl Order</th>
													<th>Cara Bayar</th>
													<th>Pemeriksaan</th>
													<th>Status</th>
													<th>#</th>
												</tr>
											</thead>
											<tbody id="listdatapermintaanradiologi"></tbody>
										</table>
									</div>
									<div id="formpermintaanradiologi">
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Tanggal Order:</label>
											<div class="col-sm-5">
											<input type="text" name="tanggalorder" id="tanggalorder" class="form-control datepicker" value="<?= date('Y-m-d H:i:s')?>" readonly placeholder="Tanggal Order">
											<span class="error" id="err_tglorder"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Diagnosa:</label>
											<div class="col-sm-10">
											<input type="hidden" name="idx_permintaanradiologi" id="idx_permintaanradiologi" value="" >
											<input type="text" name="diagnosa" id="diagnosa" class="form-control" value="" placeholder="Diagnosa">
											<span class="error" id="err_diagnosa"></span>
											</div>
										</div>
										
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Diagnosa Klinis:</label>
											<div class="col-sm-10">
												<textarea name="diagnosa_klinis" id="diagnosa_klinis" cols="30" rows="3" class="form-control" placeolder="Masukkan Diagnosa Klinis"></textarea>
												<span class="error" id="err_diagnosa_klinis"></span>
											</div>
											
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Status:</label>
											<div class="col-sm-10">
											<select name="statuspemeriksaan" id="statuspemeriksaan" class="form-control">
												<option value="Normal">Normal</option>
												<option value="Cito Tanpa Expertise">Cito Tanpa Expertise</option>
												<option value="Cito Dengan Expertise">Cito Dengan Expertise</option>
											</select>
											<span class="error" id="err_status"></span>
											</div>
										</div>
										<div class="row">
											<div class="col-md-3 " style="height:40vh;">
												<div class="border" id="treer">
													<ul>
														<li class="folder"> Pemeriksaan Radiologi
															<ul>
															<?php 
															foreach ($pemeriksaanradiologi as $p ) {
																$kode=$p->kode;
																$kode=str_replace(".00","",$kode);
																$sub=$this->kunjungan_model->getSubRootPemeriksaanRadiologi(9,$kode,$p->kode);
																// $sub=array();
																if(!empty($sub)){
																	?>
																	<li class="folder"><?= $p->namapemeriksaan?>
																	<ul>
																		<?php 
																		foreach ($sub as $s ) {
																			$skode=$s->kode;
																			$skode=str_replace(".00","",$skode);
																			$subp=$this->kunjungan_model->getSubPemeriksaanRadiologi(9,$skode,$s->kode);
																			if(empty($subp)){
																				?>
																				<li class="folder"><a href="<?= $s->kode ?>" data="<?= $s->kode ?>" onclick="getPermintan('<?= $s->kode ?>')"><?= $s->namapemeriksaan ?></a></li>
																				<?php
																			}else{
																				?>
																				<li class="folder"><?= $s->namapemeriksaan ?>
																				<ul>
																				<?php 
																				foreach ($subp as $sb ) {
																					?>
																					<li class="folder"><a href="<?= $sb->kode ?>" data="<?= $sb->kode ?>" onclick="getPermintan('<?= $sb->kode ?>')"><?= $sb->namapemeriksaan ?></a></li>
																					<?php
																				}
																				?>
																				</ul>
																				</li>
																				
																				<?php
																			}
																			
																		}
																		?>
																		<!-- <li class="folder">Folder 1</li>
																		<li class="folder">Folder 2</li> -->
																	</ul>
																	</li>
																	<?php
																}else{
																	$sub=$this->kunjungan_model->getSubPemeriksaanRadiologi(6,$kode,$p->kode);
																	if(!empty($sub)){
																		?>
																		<li class="folder"><?= $p->namapemeriksaan ?>
																		<ul>
																			<?php 
																			foreach ($sub as $s ) {
																				?>
																				<li class="folder"><a href="<?= $s->kode ?>" data="<?= $s->kode ?>" onclick="getPermintan('<?= $s->kode ?>')"><?= $s->namapemeriksaan ?></a></li>
																				<?php
																			}
																			?>
																		</ul>
																		</li>
																		<?php
																	}else{
																		?>
																		<li class="folder"><a href="<?= $p->kode ?>" data="<?= $p->kode ?>" onclick="getPermintan('<?= $p->kode ?>')"><?= $p->namapemeriksaan ?></a></li>
																	<?php
																	}
																	
																}
																
															}
															?>
															</ul>
															
														</li>
													</ul>
												</div>
											</div>
											<div class="col-md-9">
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title" id="v-namapemeriksaanradilogi"></h3>
													</div>
													<div class="panel-body">
														<div class="row">
															<!-- <div class="col-md-12"> -->
																<input type="hidden" name="koder" id="koder">
															<div id="datapemeriksaanradiologi"></div>
															<span class="error" id="err_pemeriksaanradiologi"></span>
															<!-- </div> -->
														</div>
													
													</div>
													<div class="panel-footer">
														<button type="button" class="btn btn-primary" id="btnSimpanPermintaanRadilogi" disabled onclick="simpanPermintaanRadiologi()"><span class="fa fa-save" id="iconSimpanPermintaan"></span> Simpan</button>
													</div>
												</div>
												
												
												
												
											</div>
										</div>
									</div>
								</div>
								<div id="konsul" class="tab-pane kotak fade">
									<div id="listpermintaankonsul" style="display:none;">
										<button class="btn btn-primary" type="button" onclick="buatPermintaanKonsul()"><span class="fa fa-plus"></span> Buat Permintaan</button>
										<hr>
										<table class="table table-bordered">
											<thead>
												<tr>
													<th>No</th>
													<th>Diagnosa Kerja</th>
													<th>Diagnosa Klinik</th>
													<th>Ruang Asal</th>
													<th>Ruang tujuan</th>
													<th>Dokter Asal</th>
													<th>Dokter Tujuan</th>
													<th>Alasan Konsul</th>
													<th>Status</th>
													<th>#</th>
												</tr>
											</thead>
											<tbody id="listdatapermintaankonsul"></tbody>
										</table>
									</div>
									<div id="formpermintaankonsul">
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Tanggal Konsul</label>
											<div class="col-sm-10">
											<input type="text" name="tglkonsul" id="tglkonsul" class="form-control datepicker" value="<?= date('Y-m-d')?>" readonly>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Ruang Tujuan:</label>
											<div class="col-sm-10">
											<input type="hidden" name="idx_permintaankonsul" id="idx_permintaankonsul" value="" >
											<select name="idruangtujuan" id="idruangtujuan" class="form-control select2" style="width:100%;" onchange="getDokter()">
												<option value="">Pilih Ruang</option>
												<?php 
												foreach ($ruang as $r ) {
													if($this->session->userdata('lokasi')!=$r->idx){
													?>
													<option value="<?= $r->idx ?>"><?= $r->ruang ?></option>
													<?php
													}

												}
												?>
											</select>
											<span class="error" id="err_idruangtujuan"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Dokter:</label>
											<div class="col-sm-10">
											<select name="doktertujuan" id="doktertujuan" class="form-control">
												<option value="">Pilih Dokter</option>
											</select>
											<span class="error" id="err_doktertujuan"></span>
											</div>
										</div>
										
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Diagnosa Kerja:</label>
											<div class="col-sm-10">
												<textarea name="diagnosakerja" id="diagnosakerja" cols="30" rows="3" class="form-control" placeolder="Masukkan Diagnosa Klinis"></textarea>
												<span class="error" id="err_diagnosakerja"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Diagnosa Klinis:</label>
											<div class="col-sm-10">
												<textarea name="keteranganklinik" id="keteranganklinik" cols="30" rows="3" class="form-control" placeolder="Masukkan Diagnosa Klinis"></textarea>
												<span class="error" id="err_keteranganklinik"></span>
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="email">Alasan Konsul:</label>
											<div class="col-sm-10">
											<select name="alasankonsul" id="alasankonsul" class="form-control">
												<option value="Konsultasi Saat Ini">Konsultasi Saat Ini</option>
												<option value="Alih rawat">Alih rawat</option>
												<option value="Rawat Bersama">Rawat Bersama</option>
											</select>
											<span class="error" id="err_alasankonsul"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">&nbsp;</label>
											<div class="col-sm-10">
											<input type="checkbox" name="cito" id="cito" value="1">Cito
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-sm-2" for="email">&nbsp;</label>
											<div class="col-sm-10">
											<button class="btn btn-primary" id="btnSimpanKonsul" onclick="simpanKonsul()" type="button"><span class="fa fa-save" id="iconSimpanKonsul"></span> Simpan</button>
											</div>
										</div>
									</div>
								</div>
								<div id="tindakan" class="tab-pane kotak fade">
									<legend>Masukkan Tindakan</legend>
									<div class="form-group">
										<!-- <label class=" col-sm-12" for="email">Obat :</label> -->
										<div class="col-md-4">
											<input type="hidden" name="idx_layanan" id="idx_layanan">
											<select name="petugasmedis" id="petugasmedis" class="form-control petugasmedis" style="width:100%;" onchange="getTindakan()">
												<option value="">Petugas Medis</option>
												<?php 
												foreach ($tenagamedis as $k ) {
													?>
													<option value="<?= $k->nrp ?>"><?= $k->pgwNama ?></option>
													<?php
												}
												?>
											</select>
											<span class="error" id="err_petugasmedis"></span>
										</div>
										<div class="col-md-4">
											
											<select name="kodekategori" id="kodekategori" class="form-control kategoritindakan" style="width:100%;" onchange="getTindakan()">
												<option value="">Kategori Layanan</option>
												<?php 
												foreach ($kategoritindakan as $k ) {
													?>
													<option value="<?= $k->no ?>"><?= $k->tindakan ?></option>
													<?php
												}
												?>
											</select>
											<span class="error" id="err_kodekategori"></span>
										</div>
										<div class="col-md-4">
											<div class="input-group">
												<select name="kodetindakan" id="kodetindakan" class="form-control layanan" style="width:100%;">
													<option value=""> Layanan</option>
												</select>
												<span class="input-group-btn">
													<button class="btn btn-primary" type="button" id="btnTambahTindakan" onclick="simpanLayanan()"><span class="fa fa-plus" id="iconTambahTindakan"></span></button> 
												</span>
											</div>
											<span class="error" id="err_kodetindakan"></span>
										</div>
									</div>

									<table class="table table-bordered">
										<thead>
											<tr>
												<td style="width:50px;">No</td>
												<td>Kategori</td>
												<td>Tindakan</td>
												<td>Petugas</td>
												<td style="width:150px">#</td>
											</tr>
										</thead>
										<tbody id="datatindakan"></tbody>
									</table>
								</div>
							</div>
							
                        </form>
                    </div>
                    <div class="tab tab-pane" id="tab_3">
						<div class="row">
							<div class="col-md-11">
								<form action="#" method="GET" onsubmit="return false">
									<div class="input-group">
										<input type="text" name="q" id="q" class="form-control pull-right" onkeydown="listKunjungan(1)" placeholder="Search">
										<span class="input-group-addon">
											<span class="fa fa-search"></span>
										</span>
									</div>

								</form>
							</div>
							
							
							<div class="col-md-1">
								<div class="input-group">
									<select class="form-control" name="limit" id="limit" onchange="listKunjungan(1)">
										<option value="5">5</option>
										<option value="10" selected="">10</option>
										<option value="20">20</option>
										<option value="30">30</option>
										<option value="40">40</option>
										<option value="50">50</option>
										<option value="100">100</option>
									</select>
								</div>
							</div>

						</div>
						<hr>
						<div class="row">
							<div class="col-md-12">
								<table class="table table-bordered">
									<thead class="bg-green">
										<tr>
											<td>No</td>
											<td>Tgl Kunjungan</td>
											<td>Jenis Layanan</td>
											<td>Poliklinik / Bangsal</td>
											<td>Cara Bayar</td>
											<td>DPJP</td>
											<td>#</td>
										</tr>
									</thead>
									<tbody id="listkunjungan"></tbody>
									<tfoot>
										<tr>
											<td colspan="7" id="pagination"></td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
                        
                    </div>
                    <div class="tab tab-pane" id="tab_4">
						<form action="#" class="form-horizontal" id="formkontrol" style="display:none;">
							<input type="hidden" name="noSuratKontrol" id="noSuratKontrol">
                            <div class="form-group">
                                <label class="control-label col-sm-3" for="email">Jenis Kontrol:</label>
                                <div class="col-sm-6">
                                    <select name="jenis" id="jenis" class="form-control" onchange="pilihKontrol()">
										<option value="">Pilih Jenis Kontrol</option>
                                        <option value="1">SPRI (Surat Perintah Rawat Inap)</option>
                                        <option value="2">Surat Kontrol</option>
                                    </select>
                                </div>
                            </div>
							<div class="form-group spri" style="display:none;">
								<label class="control-label col-sm-3" for="email">No Kartu:</label>
								<div class="col-sm-6">
									<input type="text" name="no_bpjs" id="no_bpjs" class="form-control input-sm" value="<?= $row->nobpjs ?>" <?= !empty($row->nobpjs)?"readonly":""?>>
								</div>
							</div>
							<div class="form-group suratkontrol" style="display:none;">
								<label class="control-label col-sm-3" for="email">No SEP:</label>
								<div class="col-sm-6">
								<input type="text" class="form-control" id="noSEP" name="noSEP" placeholder="Masukkan No SEP" value="<?= $row->no_sep ?>" <?= !empty($row->no_sep)?"readonly":""?>>
								</div>
							</div>
							<div id="detform" style="display:none;">
								<div class="form-group">
									<label class="control-label col-sm-3" for="pwd">Tanggal Rencana Kontrol:</label>
									<div class="col-sm-6">
										<div class="input-group">
											<input type="text" class="form-control datepicker" id="tglRencanaKontrol" placeholder="Masukkan rencana kontrol" onkeyup="caripoliKontrol()" onchange="caripoliKontrol()" >
											<span class="input-group-addon">
												<span class="fa fa-calendar"></span>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-3" for="pwd">Poliklinik:</label>
									<div class="col-sm-6">
									<select name="poliKontrol" id="poliKontrol" class="form-control" onchange="dokterKontrol()" style="width:100%"></select>
									</div>
								</div>
								<div class="form-group">
									<label class="control-label col-sm-3" for="pwd">Dokter:</label>
									<div class="col-sm-6">
									<select name="kodeDokter" id="kodeDokter" class="form-control" style="width:100%"></select>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-offset-3 col-sm-6">
									<button type="button" class="btn btn-primary" onclick="buatSuratKontrol()">Buat Surat Kontrol</button>
									<button type="button" class="btn btn-danger" onclick="resetFormKontrol()">Batal</button>
									</div>
								</div>
							</div>
                        </form>
						<div id="listkontrol">
							<div class="row">
								
								<div class="col-md-3">
									<select name="filter" id="filter" class="form-control" onchange="rencanaKontrolBpjs()">
										<option value="1" selected>Tanggal Entri</option>
										<option value="2">Tanggal Rencana Kontrol</option>
									</select>
								</div>
								<div class="col-md-2">
									<select name="bulan" id="bulan" class="form-control" onchange="rencanaKontrolBpjs()">
										<option value="01" <?= date('m')=='01'?"selected":"";?>>Januari</option>
										<option value="02" <?= date('m')=='02'?"selected":"";?>>Februari</option>
										<option value="03" <?= date('m')=='03'?"selected":"";?>>Maret</option>
										<option value="04" <?= date('m')=='04'?"selected":"";?>>April</option>
										<option value="05" <?= date('m')=='05'?"selected":"";?>>Mei</option>
										<option value="06" <?= date('m')=='06'?"selected":"";?>>Juni</option>
										<option value="07" <?= date('m')=='07'?"selected":"";?>>Juli</option>
										<option value="08" <?= date('m')=='08'?"selected":"";?>>Agustus</option>
										<option value="09" <?= date('m')=='09'?"selected":"";?>>September</option>
										<option value="10" <?= date('m')=='10'?"selected":"";?>>Oktober</option>
										<option value="11" <?= date('m')=='11'?"selected":"";?>>November</option>
										<option value="12" <?= date('m')=='12'?"selected":"";?>>Desember</option>
									</select>
								</div>
								<div class="col-md-2">
									<select name="tahun" id="tahun" class="form-control" onchange="rencanaKontrolBpjs()">
										<?php 
										$dari=date('Y');
										for ($i=2022; $i <= $dari; $i++) { 
											?>
											<option value="<?= $i ?>" <?= $i==date('Y')?"selected":""; ?>><?= $i ?></option>
											<?php
										}
										?>
									</select>
								</div>
								<div class="col-md-5 text-right">
									<button class="btn btn-primary" type="button" onclick="tambahSuratKontrol()">Buat Surat Kontrol</button>
								</div>
							</div>
							<hr>
							<div class="row">
								<div class="col-md-12">
									<table class="table table-bordered">
										<thead class="bg-blue">
											<tr>
												<td>No</td>
												<td>No Surat Kontrol</td>
												<td>Jenis Kontrol</td>
												<td>Rencana Kontrol</td>
												<td>Tgl Terbit</td>
												<td>Poli Tujuan</td>
												<td>Dokter</td>
												<td>Terbis Sep</td>
												<td style="width:230px;">#</td>
											</tr>
										</thead>
										<tbody id="datakontrol"></tbody>
									</table>
								</div>
							</div>
						</div>

                    </div>
                    <div class="tab tab-pane" id="tab_5">
						<?php 
						$rujukanonline =$this->pasien_model->getRujukanOnline($row->reg_unit);
						?>
						<div id="v_formrujukan" >
							<div class="row">
                                <div class="col-md-12">
                                    <form class="form-horizontal" action="#">
                                        <input type="hidden" name="id_daftar" id="id_daftar" value="<?= $row->id_daftar ?>">
                                        <input type="hidden" name="reg_unit" id="reg_unit" value="<?= $row->reg_unit ?>">
                                        <input type="hidden" name="r-noRujukan" id="r-noRujukan" value="<?= !empty($rujukanonline)?$rujukanonline->noRujukan:""?>">
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="email">No SEP:</label>
                                            <div class="col-sm-10">
                                            <input type="text" class="form-control" id="r-noSep" name="r-noSep" placeholder="No SEP" value="<?= $row->no_sep ?>" <?php if(!empty($row->no_sep)) echo "readonly" ?>>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Tgl Rujukan:</label>
                                            <div class="col-sm-10">
												<?php 
												$tgl=explode(' ',$row->tgl_kunjungan);
												?>
                                            <input type="text" class="form-control datepicker" id="r-tglRujukan" name="r-tglRujukan" value="<?= $tgl[0] ?>" placeholder="Masukkan Tgl Rujukan">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Tgl Rencana Kunjungan:</label>
                                            <div class="col-sm-10">
                                            <input type="text" class="form-control datepicker" id="r-tglRencanaKunjungan" name="r-tglRencanaKunjungan" placeholder="Masukkan Tgl Rencana Kunjungan">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Tipe Rujukan:</label>
                                            <div class="col-sm-10">
                                                <select name="r-tipeRujukan" id="r-tipeRujukan" class="form-control" onchange="pilihTipeRujukan()">
                                                    <option value="0">Penuh</option>
                                                    <option value="1">Partial</option>
                                                    <option value="2">Balik (PRB)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Faskes:</label>
                                            <div class="col-sm-10">
                                                <select name="r-faskes" id="r-faskes" class="form-control" >
                                                    <option value="1">Faskes Tingkat 1</option>
                                                    <option value="2" selected>Faskes Tingkat 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">PPK Dirujuk:</label>
                                            
                                            <input type="hidden" id="ppkDirujuk" name="ppkDirujuk"><div class="col-sm-10">
                                            <input type="text" class="form-control" id="r-ppkDirujuk" name="r-ppkDirujuk" placeholder="Masukkan PPK Dirujuk">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Jns Pelayanan:</label>
                                            <div class="col-sm-10">
                                            <input type="radio" name="jnsPelayanan" id="rj" value="2">R. Jalan
                                            <input type="radio" name="jnsPelayanan" id="gd" value="1">R. Inap
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Catatan:</label>
                                            <div class="col-sm-10">
                                            <textarea name="r-catatan" id="r-catatan" cols="30" rows="5" class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-2" for="pwd">Diagnosa Rujukan:</label>
                                            <div class="col-sm-10">
                                            <input type="hidden" class="form-control" id="diagRujukan" name="diagRujukan">
                                            <input type="text" class="form-control" id="r-diagRujukan" name="r-diagRujukan" placeholder="Masukkan Diagnosa">
                                            </div>
                                        </div>
                                        
                                        <div class="form-group inputPoli">
                                            <label class="control-label col-sm-2" for="pwd">Poli Rujukan:</label>
                                            <div class="col-sm-10">
                                            <!-- <select name="r-poliRujukan" id="r-poliRujukan" class="form-control">
                                                <option value="">Pilih Poli</option>
                                            </select> -->
                                            <div class="input-group">
                                                <input type="hidden" name="r-poliRujukan" id="r-poliRujukan" >
                                                <input type="text" class="form-control" name="namaPoliRujukan" id="namaPoliRujukan" readonly>
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default" type="button" id="cariSpesialistik" onclick="spesialistiRujukan()"> <span class="fa fa-search" id="iconSpesialistik"></span></button>
                                                </span>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-2 col-sm-10">
                                                <div class="btn-group" id="btnRujukan">
                                                    <button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="createRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>
                                                </div> 
                                            </div>
                                        </div>
                                    </form> 
                                </div>
							</div>
						</div>
						<!-- <div id="v_detailrujukan">
							<div class="row">
								<div class="col-md-12">
									<table class="table table-bordered">
                                        <tr>
                                            <th style="width: 150px">No Registrasi RS</th>
                                            <th style="font-size: 20px"><?php echo $row->id_daftar ?></th>
                                        </tr>
                                        
                                        <tr>
                                            <th>No Registrasi Unit</th>
                                            <th style="font-size: 20px"><?php echo $row->reg_unit ?></th>
                                        </tr>
                                        <tr>
                                            <th>No Rujukan</th>
                                            <th style="font-size: 20px" id="v_cetakrujukan">
                                                <a href="<?= base_url() ."rekammedis/pasien/cetakrujukan/".$rujukanonline->noRujukan ?>" target="_blank" class="btn btn-warning">
                                                <?php echo $rujukanonline->noRujukan ?>
                                                </a>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th id="v_tujuanrujukan">RS Tujuan</th>
                                            <th><?php echo $rujukanonline->namatujuanRujukan ?></th>
                                        </tr>

                                        <tr>
                                            <th id="v_namatujuanrujukan">Poliklinik Tujuan</th>
                                            <th><?= $rujukanonline->namapoliTujuan ?></th>
                                        </tr>
                                        <tr>
                                            <th>Diagnosa</th>
                                            <th id="v_diagnosa"><?php echo $rujukanonline->diagnosanama ?></th>
                                        </tr>
                                        <tr>
                                            <th>Jenis Layanan</th>
                                            <th id="v_jenislayanan"><?php if($rujukanonline->jnsPelayanan==2) echo "R. Jalan"; else echo "R.Inap"; ?></th>
                                        </tr>
                                    </table>
									</div>
								</div>
						</div> -->
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
<div id="hasilradiologi" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content modal-sm">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Cetak hasil Pemeriksaan Radiologi</h4>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col-md-12">
					<table class="table table-bordered">
						<tr>
							<td>No</td>
							<td>Pemeriksaan</td>
							<td>#</td>
						</tr>
						<tbody id="detailpemeriksaanradiologi"></tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<!-- <button type="button" class="btn btn-default btn-block" onclick="cetakAntrian()"><span class="fa fa-print"></span> Cetak</button> -->
		</div>
		</div>
	</div>
</div>
<div id="detailriwayat" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title" id="judul">Detail Riwayat</h4>
		</div>
		<div class="modal-body">
			<div class="row">
				<input type="hidden" name="idx_daftar" id="idx_daftar">
				<ul class="nav nav-pills">
					<li class="active"><a data-toggle="tab" href="#riwayatasesmenawal" aria-expanded="true">Asesmen Awal</a></li>
					<li><a data-toggle="tab" href="#riwayatsoap">Soap</a></li>
					<li class=""><a data-toggle="tab" href="#riwayatobat" onclick="getRiwayatResep()" aria-expanded="true">Obat</a></li>
					<li class=""><a data-toggle="tab" href="#riwayatlabor" onclick="getRiwayatPermintaanLabor()" aria-expanded="true">Labor</a></li>
					<li class=""><a data-toggle="tab" href="#riwayatradiologi" onclick="getRiwayatPermintaanRadiologi()" aria-expanded="true">Radiologi</a></li>
					<li class=""><a data-toggle="tab" href="#riwayattindakan" onclick="getRiwayatTindakan()" aria-expanded="true">Tindakan</a></li>
				</ul>
				<div class="tab-content">
                    <div class="tab tab-pane active" id="riwayatasesmenawal">
						<table class="table">
							<tr>
								<td class="w100">Tanggal Asesmen</td>
								<td id="tglasesmen">: </td>
							</tr>
							<tr>
								<td class="w100">Sumber Informasi</td>
								<td id="sumberinformasi">: </td>
							</tr>
							<tr>
								<td class="w100">Keluhan Utama</td>
								<td id="keluhan_utama">: </td>
							</tr>
							<tr>
								<td class="w100">Riwayat Penyakit Sekarang</td>
								<td id="v_riwayat_penyakit_sekarang">: </td>
							</tr>
							<tr>
								<td class="w100">Riwayat Penyakit Dahulu</td>
								<td id="v_riwayat_penyakit_dahulu">: </td>
							</tr>
							<tr>
								<td class="w100">Allo Anamnesa</td>
								<td id="v_alloanamnessa">: </td>
							</tr>
							<tr>
								<td class="w100">Riwayat Penyakit Keluarga</td>
								<td id="v_riwayat_penyakit_keluarga">: </td>
							</tr>
							<tr>
								<td colspan="2">Pemeriksaan Fisik</td>
							</tr>
							<tr>
								<td class="w100">kepala</td>
								<td id="pemeriksaankepala">: </td>
							</tr>
							<tr>
								<td class="w100">Torak</td>
								<td id="pemeriksaantorak">: </td>
							</tr>
							<tr>
								<td class="w100">Kajian Awal Medis</td>
								<td id="kajianawalmedis">: </td>
							</tr>
						</table>
					</div>
                    <div class="tab tab-pane" id="riwayatsoap">
						<table class="table">
							<tr>
							<tr>
								<td>Tanggal Catat</td>
								<td id="tglcatat"></td>
							</tr>
							<tr>
								<td class="w100">TD</td>
								<td id="v_td"></td>
							</tr>
							<tr>
								<td class="w100">Nadi</td>
								<td id="v_nadi"></td>
							</tr>
							<tr>
								<td class="w100">Suhu</td>
								<td id="v_suhu"></td>
							</tr>
							<tr>
								<td class="w100">Kesadaran</td>
								<td id="v_kesadaran"></td>
							</tr>
							<tr>
								<td colspan=2>Soap</td>
							</tr>
							<tr>
								<td class="w100">Subjective</td>
								<td id="s"></td>
							</tr>
							<tr>
								<td class="w100">Objective</td>
								<td id="o"></td>
							</tr>
							<tr>
								<td class="w100">Assesmen</td>
								<td id="a"></td>
							</tr>
							<tr>
								<td class="w100">Planning</td>
								<td id="p"></td>
							</tr>
						</table>
					</div>
                    <div class="tab tab-pane" id="riwayatobat">
						<table class="table table-bordered">
							<thead>
								<tr>
									<td style="width:50px;">No</td>
									<td>Obat</td>
									<td>Signa</td>
									<td>Keterangan</td>
								</tr>
							</thead>
							<tbody id="riwayatresep"></tbody>
						</table>
					</div>
                    <div class="tab tab-pane" id="riwayatlabor">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>No</th>
									<th>Diagnosa Klinis</th>
									<th>Diagnosa</th>
									<th>Tgl Order</th>
									<th>Cara Bayar</th>
									<th>Pemeriksaan</th>
									<th>Status</th>
									<th>#</th>
								</tr>
							</thead>
							<tbody id="riwayatdatapermintaanlabor"></tbody>
						</table>
					</div>
                    <div class="tab tab-pane" id="riwayatradiologi">
					<table class="table table-bordered">
											<thead>
												<tr>
													<th>No</th>
													<th>Diagnosa Klinis</th>
													<th>Diagnosa</th>
													<th>Tgl Order</th>
													<th>Cara Bayar</th>
													<th>Pemeriksaan</th>
													<th>Status</th>
													<th>#</th>
												</tr>
											</thead>
											<tbody id="riwayatdatapermintaanradiologi">
												
											</tbody>
										</table>
					</div>
                    <div class="tab tab-pane" id="riwayattindakan">
									<table class="table table-bordered">
										<thead>
											<tr>
												<td style="width:50px;">No</td>
												<td>Kategori</td>
												<td>Tindakan</td>
												<td>Petugas</td>
											</tr>
										</thead>
										<tbody id="riwayatdatatindakan">
											</tbody>
									</table>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<!-- <button type="button" class="btn btn-default btn-block" onclick="cetakAntrian()"><span class="fa fa-print"></span> Cetak</button> -->
		</div>
		</div>
	</div>
</div>

<div class="modal fade" id="form-list-spesialistik" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">List Spesialistik</h3>
            </div>
            <div class="modal-body">
                <div id="loading"></div>
                <div id="formlistrujukan">
                    <form class="form-horizontal">
                        <div id="tblPopup_Rujukan_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered" id="tblPopup_Rujukan" style="font-size: small; width : 100%" role="grid" aria-describedby="tblPopup_Rujukan_info" width="100%" cellpadding="0">
                                        <thead>
                                            <tr role="row">
                                                <th>No.</th>
                                                <th>Nama Spesialis</th>
                                                <th>Kapasitas</th>
                                                <th>Jml Rujukan</th>
                                                <th>Pesentase</th>
                                            </tr>
                                        </thead>
                                        <tbody id="list-data-spesialistik">
                                            <tr class="odd">
                                                <td colspan="5" valign="top">No data available in table</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div id="tblPopup_Rujukan_processing" class="dataTables_processing" style="display: none;">Processing...</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="komponenracikan" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Komponen Obat Racikan (<span id="namaracikan"></span>)</h3>
            </div>
            <div class="modal-body">
					<form class="form-horizontal" id="formkomponen" method="POST">
					<input type="hidden" name="idx_komposisi" id="idx_komposisi">
					<input type="hidden" name="idx_resep_detail" id="idx_resep_detail">
					<input type="hidden" name="idx_obat_detail" id="idx_obat_detail">
						<div class="form-group">
							<label class="control-label col-sm-2" for="email">Obat:</label>
							<div class="col-sm-10">
							<input type="hidden" id="komponenobatid" name="komponenobatid">
							<input type="text" class="form-control" id="komponenobat" placeholder="Masukkan Nama Obat">
							</div>
							<span class="error" id="err_komponenobat"></span>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="pwd">Kapasitas:</label>
							<div class="col-sm-3">
								<div class="input-group">
									<input id="kapasitasobat" type="text" class="form-control" name="kapasitasobat" readonly>
									<span class="input-group-addon satuankapasitas">Mg</span>
								</div>
							</div>
							
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="pwd">Dosis:</label>
							<div class="col-sm-3">
								<div class="input-group">
									<input id="p1" type="text" class="form-control" name="p1" placeholder="P1" value="1" onkeyup="hitungDosis()">
									<span class="input-group-addon">/</span>
									<input id="p2" type="text" class="form-control" name="p2" placeholder="P2" value="1" onkeyup="hitungDosis()">
								</div>
								
							</div>
							<div class="col-sm-3">
								<div class="input-group">
									<input id="dosis" type="text" class="form-control" name="dosis" placeholder="Dosis">
									<input id="satuandosis" type="hidden" name="satuandosis" >
									<input id="jmlracikan" type="hidden" name="jmlracikan" >
									<input id="jmlpakai" type="hidden" name="jmlpakai" >
									<span class="input-group-addon satuankapasitas">Mg</span>
								</div>
								<span class="error" id="err_dosis"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-2" for="pwd">&nbsp;</label>
							<div class="col-sm-3">
								<button class="btn btn-primary btn-sm" type="button" onclick="tambahKomponen()" id="btnAddKomponen"><span class="fa fa-plus" id="iconAddKomponen"></span> Tambah Komponen</button>
							</div>
							
						</div>
						<hr>
                        <div id="tblPopup_Rujukan_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            
                            <div class="row">
								
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered" >
                                        <thead>
                                            <tr role="row">
                                                <th>No.</th>
                                                <th>Nama Obat</th>
                                                <th>Dosis</th>
                                                <th>Jml Pemakaian</th>
                                                <th style="width:130px;">#</th>
                                            </tr>
                                        </thead>
                                        <tbody id="listkomponenracikan">
                                            <tr class="odd">
                                                <td colspan="5" valign="top">No data available in table</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div id="tblPopup_Rujukan_processing" class="dataTables_processing" style="display: none;">Processing...</div>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
// $(function(){
// 	// --- Initialize sample trees
	
// });

</script>

