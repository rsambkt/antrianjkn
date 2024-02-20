<link rel="stylesheet" href="<?= base_url() ."assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css"?>">
<link rel="stylesheet" type="text/css" href="<?= base_url()."assets/plugins/clockpicker/dist/bootstrap-clockpicker.min.css" ?>">
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
	.surat{
		border: 1px solid #ccc;
		border-collapse:collapse;
		width:800px;
		min-height:100px;
		padding:10px;
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
		width:250px;
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
		width:300px;
		float:right;
		margin-left:150px;
	}
	.w100{
		width:100px;
	}
	.judulsurat{
		width:100%;
	}
	.right{
		text-align:right;
	}
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-xs-3">
            <div class="box box-primary">
                <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="<?php if ($row->jnskelamin == '1') echo base_url() . "assets/images/male.png";
                                                        else echo base_url() . "assets/images/female.png"; ?>" alt="User profile picture">
                
                <h3 class="profile-username text-center"><?= $row->nama . "(" . $row->nomr . ")" ?></h3>


                <table class="table">
                        <tr>
                            <td><b>Nama</b></td>
                            <td><?= $row->nama ?></td>
                        </tr>
                        <tr>
                            <td><b>Tanggal Lahir</b></td>
                            <td><?= $row->tgllahir ?></td>
                        </tr>
                        
                        <tr>
                            <td><b>Cara Bayar</b></td>
                            <td><?= $row->cara_bayar ?></td>
                        </tr>
                        <tr>
                            <td><b>Poliklinik Pengirim</b></td>
                            <td><?= $row->nama_ruang_asal ?></td>
                        </tr>
                        <tr>
                            <td><b>Diagnosa</b></td>
                            <td><?= $row->diagnosa_klinis ?></td>
                        </tr>
                        <tr>
                            <td><b>Dokter</b></td>
                            <td><?= $row->namadokterpengirim ?></td>
                        </tr>
                        
                    </table>
                    <!-- <button class="btn btn-danger btn-block" onclick="batalDaftar(<?= $row->idx ?>)"><span class="fa fa-remove"></span> Batalkan</button> -->
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-9">
            <!-- Custom Tabs -->
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-envelope"></span> Surat Permintaan Pemeriksaan Radiologi</a></li>
                    <li><a href="#tab_2" data-toggle="tab"><span class="fa fa-reply"></span> Response Pemeriksaan Radiologi</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                    
                        <div class="row">
                            <div class="col-md-12">
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
													<td class="w100">No. MR</td><td>: <?= $row->nomr ?></td>
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
									<div class="baris right">
									Dokumen Tambahan : RM. 14.PM9.55
									</div>
									
									<div class="baris">
										<div class="judulsurat">
											<h3 class="text-center">Surat Permintaan Pemeriksaan Radiologi</h3>
										</div>
									</div>
									<div class="baris">
										<?php 
										$tgl=explode(" ",$row->tanggalorder)
										?>
										<table class="table">
											<tr>
												<td>Tanggal Order </td>
												<td>: <?= longDate($tgl[0]) ." ".$tgl[1] ?></td>
												<td>Jaminan</td>
												<td>: <?= $row->cara_bayar?></td>
												<td>Status </td>
												<td>: <?= $row->statuspemeriksaan ?></td>
											</tr>
											<tr>
												<td>Nama</td>
												<td>: <?= $row->nama ?></td>
												<td>Ruangan</td>
												<td colspan="5">: <?= $row->nama_ruang_asal?></td>
											</tr>
											<tr>
												<td>No. MR</td>
												<td colspan="5">: <?= $row->nomr ?></td>
											</tr>
											<tr>
												<td>Tgl Lahir / Umur</td>
												<td colspan="5">: <?= longDate($row->tgllahir) ?></td>
											</tr>
										</table>
									</div>
									<div class="baris">
										<p>Jenis Pemeriksaan Yang Diminta</p>
									</div>
									<div class="baris">
									<?= $row->nama_pemeriksaan	?>
									</div>
									<div class="baris text-right" style="display:block;">
									Dokter <br>
									<?php $tgl=explode(" ",$row->tanggalorder)?>
									<?= longDate($tgl[0])?>
									<br><br><br>
									<?= $row->namadokterpengirim ?>
									</div>
								</div>
								
                            </div>
                            
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_2">
                        <div class="row">
							<div class="col-md-12">
								<form action="#" method="post" id="hasil" class="form-horizontal">
									<input type="hidden" name="idx_permintaan" id="idx_permintaan" value="<?= $row->idx ?>">
									<div class="nav-tabs-custom">
										<ul class="nav nav-tabs">
											<?php 
											$no=0;
											foreach ($detail as $d ) {
												$no++;
												?>
												<li class="<?= $no==1 ? "active" : ""?>"><a href="#radiologi<?= $d->idx_detail ?>" data-toggle="tab"><span class="fa fa-picture-o"></span> <?= $d->nama_pemeriksaan ?></a></li>
												<?php
											}
											?>
											
											<!-- <li><a href="#tab_2" data-toggle="tab"><span class="fa fa-reply"></span> Response Pemeriksaan Radiologi</a></li> -->
										</ul>
										<div class="tab-content">
						
										<?php 
										$no=0;
										foreach ($detail as $d ) {
											$no++;
											?>
											<div class="tab-pane <?= $no==1?"active":""?>" id="radiologi<?= $d->idx_detail ?>">
												<legend>Hasil Pemeriksaan <?= $d->nama_pemeriksaan ?></legend>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Tanggal / Jam Periksa</label>
													<div class="col-xs-8">
														<div class="input-group">
															<input type="text" name="tanggalpemeriksaan<?= $d->idx_detail ?>" id="tanggalpemeriksaan<?= $d->idx_detail ?>" class="form-control pull-right tanggal" value="<?= $d->tanggalpemeriksaan ?>" placeholder="Tanggal periksa">
															<span class="input-group-addon">
																<span class="fa fa-calendar"></span>
															</span>
														</div>
													</div>
													<div class="col-xs-4">
														<div class="input-group clockpicker "  data-placement="left" data-align="top" data-autoclose="true">
															<input type="text" name="jampemeriksaan<?= $d->idx_detail ?>" id="jampemeriksaan<?= $d->idx_detail ?>" class="form-control pull-right jam" value="<?= $d->jampemeriksaan ?>"  placeholder="Tanggal periksa">
															<span class="input-group-addon">
																<span class="glyphicon glyphicon-time"></span>
															</span>
														</div>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Radiorafer</label>
													<div class="col-xs-12">
														<select name="radiograferkode<?= $d->idx_detail ?>" id="radiograferkode" class="form-control">
															<option value="">Radiografer</option>
															<?php 
															foreach ($radiolog as $r ) {
																?>
																<option value="<?= $r->nrp?>" <?= $d->radiograferkode==$r->nrp ? "selected":"" ?>><?= $r->pgwNama?></option>
																<?php
															}
															?>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Dokter Radiologi</label>
													<div class="col-xs-12">
														<select name="kodedokterradiologi<?= $d->idx_detail ?>" id="kodedokterradiologi<?= $d->idx_detail ?>" class="form-control">
															<option value="">Kode Dokter </option>
															<?php 
															foreach ($dokter as $do ) {
																?>
																<option value="<?= $do->nrp?>" <?= $do->nrp==$d->kodedokterradiologi?"selected":""?>><?= $do->pgwNama?></option>	
																<?php
															}
															?>
														</select>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Uraian Hasil Pemeriksaaan</label>
													<div class="col-xs-12">
														<textarea name="uraianhasilpemeriksaan<?= $d->idx_detail ?>" id="uraianhasilpemeriksaan<?= $d->idx_detail ?>" cols="30" rows="10" class="form-control textarea"><?= $d->uraianhasilpemeriksaan?></textarea>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Kesan</label>
													<div class="col-xs-12">
														<textarea name="kesan<?= $d->idx_detail ?>" id="kesan<?= $d->idx_detail ?>" cols="30" rows="10" class="form-control textarea"><?= $d->kesan ?></textarea>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Catatan</label>
													<div class="col-xs-12">
														<textarea name="catatan<?= $d->idx_detail ?>" id="catatan<?= $d->idx_detail ?>" cols="30" rows="10" class="form-control textarea"><?= $d->catatan ?></textarea>
													</div>
												</div>
												<div class="form-group">
													<label for="first_name" class="col-xs-12">Lampiran</label>
													<div class="col-xs-12">
														<input type="file" name="userfile<?= $d->idx_detail ?>[]" id="userfile<?= $d->idx_detail ?>" class="form-control">
													</div>
												</div>
												<div class="form-group">
													<div class="col-xs-12">
														<button class="btn btn-primary" type="button" onclick="simpanHasilPemeriksaanRadiologi(<?= $d->idx_detail ?>)" id="btnsimpan<?= $d->idx_detail ?>"><span class="fa fa-save" id="iconsimpan<?= $d->idx_detail ?>"></span> Simpan Hasil Pemeriksaan Radiologi</button>
													</div>
														
												</div>
											</div>
											<?php
										}
										?>
										</div>
									</div>
									
								</form>
							</div>
						</div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section>


