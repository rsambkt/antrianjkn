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
                            <td><?= $row->diagnosa_keterangan_klinis ?></td>
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
                    <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-envelope"></span> Surat Permintaan Pemeriksaan Labor</a></li>
                    <li><a href="#tab_2" data-toggle="tab"><span class="fa fa-reply"></span> Response Pemeriksaan Labor</a></li>
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
									Dokumen Tambahan : RM. 36.D25.113
									</div>
									
									<div class="baris">
										<div class="judulsurat">
											<h3 class="text-center">Surat Permintaan Pemeriksaan Laboratorium</h3>
										</div>
									</div>
									<div class="baris">
										<table class="table">
											<tr>
												<td>Kiriman Dari </td>
												<td>: <?= $row->nama_ruang_asal ?></td>
												<td>Tanggal Pengambilan Sample</td>
												<td>: <?= longDate($row->tglpengambilansample)?></td>
												<td rowspan="2">Cara Bayar </td>
												<td rowspan="2">: <?= $row->cara_bayar ?></td>
											</tr>
											<tr>
												<td>Diagnosa Dan Keterangan Klinis</td>
												<td>: <?= $row->diagnosa_keterangan_klinis ?></td>
												<td>Jenis Sample</td>
												<td colspan="2">: <?= $row->jenis_sample?></td>
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
									<?php $tgl=explode(" ",$row->tglminta)?>
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
									<div class="form-group">
										<label for="first_name" class="col-xs-2 control-label">Dokter Labor</label>
										<div class="col-xs-3">
											<select name="kodedokterlabor" id="kodedokterlabor" class="form-control">
												<option value="">Pilih Dokter Labor</option>
												<?php 
												foreach ($dokter as $do ) {
													?>
													<option value="<?= $do->nrp?>" <?= $do->nrp==$row->kodedokterlabor?"selected":""?>><?= $do->pgwNama ?></option>
													<?php
												}
												?>
											</select>
										</div>
											
									</div>
									<?php 
									foreach ($detail as $d ) {
										?>
										<div class="form-group">
											<label for="first_name" class="col-xs-2 control-label"><?= $d->variabel_pemeriksaan ?></label>
											<div class="col-xs-3">
												<div class="input-group">
													<input type="hidden" id="kodevariabel<?= $d->variabel_id?>" name="kodevariabel[]"  value="<?= $d->variabel_id ?>">
													<input type="hidden"  id="kode_pemeriksaan<?= $d->variabel_id ?>" name="kode_pemeriksaan<?= $d->variabel_id ?>" value="<?= $d->kode_pemeriksaan ?>">
													<input type="hidden" id="satuan<?= $d->variabel_id?>" name="satuan<?= $d->variabel_id?>"  value="<?= $d->satuan ?>">
													<input type="hidden" id="nilaireferensi<?= $d->variabel_id?>" name="nilaireferensi<?= $d->variabel_id?>"  value="<?= $d->nilaireferensi ?>">
													<input type="hidden" id="nama_pemeriksaan<?= $d->variabel_id?>" name="nama_pemeriksaan<?= $d->variabel_id?>"  value="<?= $d->nama_pemeriksaan ?>">
													
													<input type="hidden" id="variabel<?= $d->variabel_id?>" name="variabel<?= $d->variabel_id?>"  value="<?= $d->variabel_pemeriksaan ?>">
													<input type="hidden" id="idx_hasil<?= $d->variabel_id?>" name="idx_hasil<?= $d->variabel_id?>"  value="<?= $d->idx_hasil ?>">
													<input type="hidden" id="nilaireferensi<?= $d->variabel_id?>" name="nilaireferensi<?= $d->variabel_id?>"  value="<?= $d->nilaireferensi ?>">
													<input type="text" class="form-control" id="hasil<?= $d->variabel_id?>" name="hasil<?= $d->variabel_id?>" value="<?= $d->hasil ?>">
													<span class="input-group-addon">
													<?= !empty($d->satuan) ? $d->satuan : "-"; ?>
													</span>
												</div> 
											
											</div>
											<div class="col-md-7">
												<?= !empty($d->nilaireferensi) ? "<b><i>Nilai Rujukan : " .$d->nilaireferensi."</i></b>":"" ?>
											</div>
										</div>
										<?php
									}
									?>
									<div class="form-group">
										<label for="first_name" class="col-xs-2 control-label">Kesan</label>
										<div class="col-xs-10">
											<textarea name="kesan" id="kesan" cols="30" rows="3" class="form-control"><?= $row->kesan ?></textarea>
										</div>
											
									</div>
									<div class="form-group">
										<label for="first_name" class="col-xs-2 control-label">Kesimpulan</label>
										<div class="col-xs-10">
											<textarea name="kesimpulan" id="kesimpulan" cols="30" rows="3" class="form-control"><?= $row->kesimpulan ?></textarea>
										</div>
											
									</div>
									<div class="form-group">
										<label for="first_name" class="col-xs-2 control-label">&nbsp;</label>
										<div class="col-xs-10">
											<button class="btn btn-primary" type="button" onclick="simpanHasilPemeriksaanLabor()" id="btnsimpan"><span class="fa fa-save" id="iconsimpan"></span> Simpan Pemeriksaan</button>
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


