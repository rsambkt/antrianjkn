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
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-xs-3">
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
                    <!-- <button class="btn btn-danger btn-block" onclick="batalDaftar(<?= $row->idx ?>)"><span class="fa fa-remove"></span> Batalkan</button> -->
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-9">
            <!-- Custom Tabs -->
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-bed"></span> Alokasi Tempat Tidur</a></li>
                    <li><a href="#tab_2" data-toggle="tab"><span class="fa fa-home"></span> Pemulangan Pasien</a></li>
                    <li><a href="#tab_3" data-toggle="tab"><span class="fa fa-exchange" ></span> Pemindahan Pasien</a></li>
					<li class="tab tab4"><a href="#tab_4" data-toggle="tab"  onclick="rencanaKontrolBpjs()"><span class="fa fa-file-o"></span> Surat Kontrol</a></li>
                    <li class="tab tab5"><a href="#tab_5" data-toggle="tab" onclick="getRujukanKeluar()"><span class="fa fa-envelope" ></span> Surat Rujukan</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                    		<?php 
                                if($row->statuspasien==2||$row->statuspasien==3){
                                    ?>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="alert alert-warning">
                                            <strong>Informasi </strong> Pasien yang sudah dipindahkan tidak bisa update tempat tidur
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }else if($row->statuspasien==4){
                                    ?>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="alert alert-danger">
                                            <strong>Informasi </strong> Pasien yang sudah dipulangkan tidak bisa update tempat tidur
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                ?>
                        <div class="row">
                            <div class="col-md-12">
                                <form class="form-horizontal" id="form" action="#">
                                    <input type="hidden" id="idx" name="idx" value="<?=  $row->idx ?>">
                                    <input type="hidden" id="id_daftar" name="id_daftar" value="<?=  $row->id_daftar ?>">
                                    <input type="hidden" id="reg_unit" name="reg_unit" value="<?=  $row->reg_unit ?>">
                                    <input type="hidden" id="nomr" name="nomr" value="<?=  $row->nomr_pasien ?>">
                                    <input type="hidden" id="nama_pasien" name="nama_pasien" value="<?=  $row->nama_pasien ?>">
                                    <input type="hidden" id="id_poli" name="id_poli" value="<?=  $row->id_poli ?>">
                                    <input type="hidden" id="nama_poli" name="nama_poli" value="<?=  $row->nama_poli ?>">
                                    <input type="hidden" id="tgl_lahir" name="tgl_lahir" value="<?=  $row->tgl_lahir ?>">
                                    <input type="hidden" id="jns_kelamin" name="jns_kelamin" value="<?=  $row->jns_kelamin ?>">
                                    <input type="hidden" id="id_cara_bayar" name="id_cara_bayar" value="<?=  $row->id_cara_bayar ?>">
                                    <input type="hidden" id="tgl_masuk" name="tgl_masuk" value="<?=  $row->tgl_kunjungan ?>">
                                    <input type="hidden" id="id_kelas_lama" name="id_kelas"_lama value="<?=  $row->id_kelas ?>">
                                    <input type="hidden" id="id_kamar_lama" name="id_kamar_lama" value="<?=  $row->id_kamar ?>">
                                    <input type="hidden" id="id_tt_lama" name="id_tt_lama" value="<?=  $row->id_tt ?>">
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="email">Kelas:</label>
                                        <div class="col-sm-10">
                                        <select name="idkelas" id="idkelas" class="form-control" onchange="getKamar()">
                                            <option value="">Pilih Kelas</option>
                                            <?php 
                                            foreach ($kelas as $k ) {
                                                ?>
                                                <option value="<?= $k->idx ?>" <?= ($row->id_kelas==$k->idx ? "selected": "") ?>><?= $k->kelas_kamar?></option>
                                                <?php
                                            }
                                            ?>
                                        </select>
                                        <span class="error" id="err_kelas"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="email">Kamar:</label>
                                        <div class="col-sm-10">
                                        <select name="idkamar" id="idkamar" class="form-control" onchange="getTT()">
                                            <option value="">Pilih Kamar</option>
                                            <?php 
                                            foreach ($kamar as $k ) {
                                                ?>
                                                <option value="<?= $k->id_kamar ?>" <?= ($row->id_kamar==$k->id_kamar ? "selected": "") ?>><?= $k->nama_kamar?></option>
                                                <?php
                                            }
                                            ?>
                                        </select>
                                        <span class="error" id="err_kamar"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-2" for="pwd">Tempat Tidur:</label>
                                        <div class="col-sm-10">
                                            <select name="id_tt" id="id_tt" class="form-control">
                                                <option value="">Pilih Tempat Tidur</option>
                                                <?php 
                                                foreach ($tt as $t ) {

                                                    ?>
                                                    <option value="<?= $t->idtt?>" <?= ($t->idtt ==$row->id_tt ? "selected" : ($t->id_daftar!=null || $t->statustt==0 ? "disabled":"")) ?> ><?= $t->namatt?></option>
                                                    <?php
                                                }
                                                ?>
                                            </select>
                                            <span class="error" id="err_tt"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                        <button type="button" class="btn btn-primary" onclick="simpanTT()" <?= ($row->statuspasien!=1?"disabled":"") ?>>Simpan Tempat Tidur Pasien</button>
                                        </div>
                                    </div>
                                </form> 
                            </div>
                            
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_2">
                        <form class="form-horizontal" id="updatetglpulang" style="font-size:12px">
                        
                            <?php if(!empty($pulang)){
                                if($row->statuspasien==2||$row->statuspasien==3){
                                    ?>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="alert alert-warning">
                                            <strong>Informasi </strong> Pasien yang sudah dipindahkan hanya bisa dipulangkan di ruangan terakhir
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }else if($row->statuspasien==4){
                                    ?>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="alert alert-danger">
                                            <strong>Informasi </strong> Pasien sudah dipulangkan
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                ?>
                                <input type="hidden" name="logidx" id="logidx" value="<?= $pulang->idx ?>">
                            <div class="row">
                                <div class="col-md-12" >
                                    <div class="form-group" style="display:none;">
                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">No Sep <label style="color:red;font-size:small">*</label></label>
                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                            <input type="text" class="form-control ui-autocomplete-input" name="noSep" id="noSep" value="<?= $row->no_sep ?>" readonly>
                                            <span class="text-error"></span>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Status Pulang <label style="color:red;font-size:small">*</label></label>
                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                            <select name="idcarakeluar" id="idcarakeluar" class="form-control" onchange="pilihStatusPulang()">
                                                <option value="">Pilih Status Pulang</option>
                                                <?php 
                                                foreach ($carakeluar as $c) {
                                                    ?>
                                                    <option value="<?= $c->idx ?>" <?= ($c->idx==$pulang->idcarakeluar ? "selected" : "") ?>><?= $c->cara_keluar?></option>
                                                    <?php
                                                }
                                                ?>
                                            </select>
                                            <span class="error" id="err_carakeluar"></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Keadaan Pulang <label style="color:red;font-size:small">*</label></label>
                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                            <select name="idkeadaankeluar" id="idkeadaankeluar" class="form-control">
                                                <?php 
                                                foreach ($keadaankeluar as $k ) {
                                                    ?>
                                                    <option value="<?= $k->idx ?>" <?= ($k->idx==$pulang->idkeadaankeluar ? "selected" : "") ?>><?= $k->keadaan_keluar?></option>
                                                    <?php
                                                }
                                                ?>
                                            </select>
                                            <span class="error" id="err_keadaankeluar"></span>
                                        </div>
                                    </div>
                                    <div id="meninggal" style="display:none">
                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">No Surat Meninggal <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" name="noSuratMeninggal" id="noSuratMeninggal" class="form-control" value="<?= $pulang->noSuratMeninggal ?>">
                                                <span class="error" id="err_nosurat"></span>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Tgl Meninggal <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" name="tglMeninggal" id="tglMeninggal" class="form-control datepicker" value="<?= $pulang->tglMeninggal ?>" readonly>
                                                <span class="error" id="err_tglmeninggal"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Tgl Pulang <label style="color:red;font-size:small">*</label></label>
                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                            <input type="text" class="form-control datepicker" name="tglPulang" id="tglPulang" value="<?= $pulang->tgl_keluar?>" readonly>
                                            <span class="error" id="err_tglpulang"></span>
                                        </div>
                                    </div>
                                    <div class="form-group" <?php if(empty($sep->lakalantas)) echo 'style="display:none"' ?>>
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">No Lap Kecelakaan <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" class="form-control" name="noLPManual" id="noLPManual" value="<?= $pulang->noLPmanual ?>">
                                                <span class="error" id="err_nolap"></span>
                                            </div>
                                        </div>
                                    <div class="form-group">
                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">&nbsp;</label></label>
                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                            <button type="button" style="margin-left:10px;" id="u-btnSimpan" class="btn btn-success pull-right" onclick="updateTglPulang()" <?= ($row->statuspasien!=1?"disabled":"") ?>><i class="fa fa-save" id="-iconsimpan"></i> Update Tgl Pulang</button>
                                            <span class="text-error"></span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <?php } else{?>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-warning">
                                        <strong>Informasi </strong> Pasien Belum bisa dipulangkan karena belum ada penempatan kamar
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </form>
                    </div>
                    <div class="tab-pane" id="tab_3">
                        <?php if(!empty($pulang)){?>
                        <form class="form-horizontal" id="formpindah" action="#">
                            <input type="hidden" id="idxpindah" name="idxpindah" value="<?= (!empty($pindah)?$pindah->idx:"") ?>">
                            <input type="hidden" id="idxasal" name="idxasal" value="<?=  $row->idx ?>">
                            <input type="hidden" id="id_daftarasal" name="id_daftarasal" value="<?=  $row->id_daftar ?>">
                            <input type="hidden" id="reg_unitasal" name="reg_unitasal" value="<?=  $row->reg_unit ?>">
                            <input type="hidden" id="id_poliasal" name="id_poliasal" value="<?=  $row->id_poli ?>">
                            <input type="hidden" id="nama_poliasal" name="nama_poliasal" value="<?=  $row->nama_poli ?>">
                            <input type="hidden" id="dokterPengirim" name="dokterPengirim" value="<?=  $row->id_dokter ?>">
                            <input type="hidden" id="namaDokterPengirim" name="namaDokterPengirim" value="<?=  $row->nama_dokter ?>">
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="email">Ruang Tujuan:</label>
                                <div class="col-sm-10">
                                    <select name="idruang" id="idruang" class="form-control">
                                        <option value="">Pilih Ruang</option>
                                        <?php 
                                        foreach ($ruangtujuan as $r ) {
                                            ?>
                                            <option value="<?= $r->idx ?>" <?= (!empty($pindah)?($r->idx==$pindah->idruangtujuan?"selected":""):"") ?>><?= $r->ruang ?></option>
                                            <?php
                                        }
                                        ?>
                                    </select>
                                    <span class="error" id="err_ruang"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-sm-2" for="email">Alasan Pemindahan:</label>
                                <div class="col-sm-10">
                                    <textarea name="alasanpemindahan" id="alasanpemindahan" cols="30" rows="10" class="form-control"><?= (!empty($pindah->alasanpemindahan)?$pindah->alasanpemindahan:"") ?></textarea>
                                    <span class="error" id="err_alasan"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" class="btn btn-primary" id="btnPermintaan" onclick="simpanPermintaan()" <?= (!empty($pindah->statusresponse)||$row->statuspasien==4?"disabled":"") ?>><span id="iconBtnPermintaan"></span> Kirim Permintaan Pindah</button>
                                </div>
                            </div>
                        </form> 
                        <?php } else{?>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-warning">
                                        <strong>Informasi </strong> Pasien Belum bisa dipindahkan karena belum ada penempatan kamar
                                        </div>
                                    </div>
                                </div>
                        <?php } ?>
                    </div>
					<div class="tab tab-pane" id="tab_4">
						<form action="#" class="form-horizontal" id="formkontrol" style="display:none;">
							<input type="hidden" name="noSuratKontrol" id="noSuratKontrol">
							<input type="hidden" name="jenis" id="jenis" value="2">
							<input type="hidden" name="no_bpjs" id="no_bpjs" value="<?= $row->nobpjs ?>">
                            
							
							<div class="form-group" >
								<label class="control-label col-sm-3" for="email">No SEP:</label>
								<div class="col-sm-6">
								<input type="text" class="form-control" id="noSEP" name="noSEP" placeholder="Masukkan No SEP" value="<?= $row->no_sep ?>" <?= !empty($row->no_sep)?"readonly":""?>>
								</div>
							</div>
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
						// print_r($rujukanonline);
						?>
						<div id="v_formrujukan" >
							<div class="row">
                                <div class="col-md-12">
                                    <form class="form-horizontal" action="#">
                                        <input type="hidden" name="id_daftar" id="id_daftar" value="<?= $row->id_daftar ?>">
                                        <input type="hidden" name="reg_unit" id="reg_unit" value="<?= $row->reg_unit ?>">
                                        <input type="hidden" name="r-noRujukan" id="r-noRujukan" value="<?= !empty($rujukanonline) ? $rujukanonline->noRujukan:"";?>">
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
						<!-- <div id="v_detailrujukan" >
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
												<?php if(!empty($rujukanonline)){?>
                                                <a href="<?= base_url() ."vclaim/rujukan/cetakrujukan/".$rujukanonline->noRujukan ?>" target="_blank" class="btn btn-warning">
                                                <?php echo $rujukanonline->noRujukan ?>
                                                </a>
												<?php } ?>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th id="v_tujuanrujukan">RS Tujuan</th>
                                            <th><?= !empty($rujukanonline) ? $rujukanonline->namatujuanRujukan :"" ?></th>
                                        </tr>

                                        <tr>
                                            <th >Poliklinik Tujuan</th>
                                            <th id="v_namatujuanrujukan"><?= !empty($rujukanonline) ? $rujukanonline->namapoliTujuan:"" ?></th>
                                        </tr>
                                        <tr>
                                            <th>Diagnosa</th>
                                            <th id="v_diagnosa"><?= !empty($rujukanonline) ? $rujukanonline->diagnosanama :"" ?></th>
                                        </tr>
                                        <tr>
                                            <th>Jenis Layanan</th>
                                            <th id="v_jenislayanan"><?php
											if(!empty($rujukanonline)){
												if($rujukanonline->jnsPelayanan==2) echo "R. Jalan"; else echo "R.Inap"; 
											}
											
											?></th>
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
