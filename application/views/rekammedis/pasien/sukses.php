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
        <div class="col-xs-4">
            <div class="box box-primary">
                <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="<?php if ($row->jns_kelamin == 'L') echo base_url() . "assets/images/male.png";
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
                    <button class="btn btn-danger btn-block" onclick="batalDaftar(<?= $row->idx ?>)"><span class="fa fa-remove"></span> Batalkan</button>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-8">
            <!-- Custom Tabs -->
			<?php 
			$rujukanonline =$this->pasien_model->getRujukanOnline($row->reg_unit); 
			// if(!empty($rujukanonline)) $norujuk=$rujukanonline->
			?>
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-id-card-o"></span> Kartu Pasien</a></li>
                    <li><a href="#tab_2" data-toggle="tab"><span class="fa fa-barcode"></span> Stiker</a></li>
                    <?php if($row->id_cara_bayar==1){?><li><a href="#tab_3" data-toggle="tab" onclick="getSep('<?= $row->no_sep?>')"><span class="fa fa-file-o" ></span> Sep</a></li>
                    <li><a href="#tab_4" data-toggle="tab" onclick="getRujukanKeluar()"><span class="fa fa-file-text-o"></span> Rujukan</a></li><?php } ?>
                    <!-- <li><a href="#tab_5" data-toggle="tab"><span  class="fa fa-arrow-circle-o-right"></span> No Antrian</a></li> -->
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="kartu">
                                    <div class="kartu-header">
                                        &nbsp;
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
                                <hr>
                                <a href='<?= base_url()."rekammedis/pasien/cetakkartu/".$row->nomr ?>' target="_blank" class="btn btn-default btn-sm"><span class="fa fa-print"></span> Cetak Kartu</a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_2">
                        <div class="row">
                            <div class="col-md-12">
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
                                <hr>
                                <a href='<?= base_url()."rekammedis/pasien/cetakstiker/".$row->nomr ?>' target="_blank" class="btn btn-default btn-sm"><span class="fa fa-print"></span> Cetak Stiker</a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_3">
                        <div class="row">
                            <div class="col-md-12" id="editsep" <?php if(empty($row->no_sep)) echo 'style="display:none"'; else echo 'style="display:block"'; ?>>
                                <form class="form-horizontal" id="theform" style="font-size:12px">
                                    <div class="row">
                                        <div class="col-md-12 col-xs-12">
                                            <input type="hidden" name="idx" id="e-idx" value="<?= $row->idx ?>">
                                            <input type="hidden" name="noKartu" id="e-noKartu" value="<?= $row->nobpjs?>">
                                            
                                            <input type="hidden" name="ppkPelayanan" id="e-ppkPelayanan" value="<?= KODERS_VC ?>">
                                            <input type="hidden" name="jnsPelayanan" id="e-jnsPelayanan" value="2">
                                            <!-- Baru -->
                                            <input type="hidden" name="klsRawatHak" id="e-klsRawatHak" value="">
                                            <!-- <input type="hidden" name="klsRawatNaik" id="e-klsRawatNaik" value=""> -->
                                            <!-- <input type="hidden" name="pembiayaan" id="e-pembiayaan" value=""> -->
                                            <!-- <input type="hidden" name="penanggungJawab" id="e-penanggungJawab" value=""> -->
                                            <!--input type="hidden" name="noMR" id="noMR" value=""-->
                                            <input type="hidden" name="asalRujukan" id="e-asalRujukan" value="">
                                            <input type="hidden" name="tglRujukan" id="e-tglRujukan" value="">
                                            <input type="hidden" name="noRujukan" id="e-noRujukan" value="">
                                            <input type="hidden" name="ppkRujukan" id="e-ppkRujukan" value="">


                                            <div class="box-body">
                                                <div>
                                                    <label style="color:red;font-size:small">* Wajib Diisi</label>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">No Sep <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <input type="text" class="form-control ui-autocomplete-input" name="noSep" id="e-noSep" readonly>
                                                        
                                                        <span class="text-error"></span>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="divPoli">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Spesialis/SubSpesialis <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <div class="input-group">
                                                            <span class="input-group-addon">
                                                                <label><input type="checkbox" id="e-eksekutif" value="1"> Eksekutif</label>
                                                            </span>
                                                            <input type="text" class="form-control ui-autocomplete-input" id="e-txtnmpoli" maxlength="10" placeholder="ketik kode atau nama Spesialis/Subspesialis min 3 karakter">
                                                            <input type="hidden" class="form-control tujuan" id="e-tujuan" name='tujuan' value="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Dokter Yang Menangani <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <!--input type="text" class="form-control ui-autocomplete-input" id="txtnmDokter" placeholder="ketik nama dokter Yang menangini">
                                                        <input type="hidden" id="kodeDokter" value=""-->
                                                        <select name="dpjpLayan" id="e-dpjpLayan" class="form-control dpjpLayan" style="width: 100%;"></select>
                                                        <span class="text-error"></span>
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">No. MR <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="e-noMR" name='noMR' placeholder="ketik nomor MR" maxlength="10">
                                                            <span class="input-group-addon">
                                                                <label><input type="checkbox" id="e-cob" name="cob" value='1'> Peserta COB</label>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="form-group" id="divkelasrawat" style="display: none;">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Kelas Rawat</label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <select class="form-control" id="e-cbKelas">
                                                            <option value="3">Kelas 3</option>
                                                        </select>
                                                    </div>
                                                </div> -->

                                                <div class="form-group" class="ranap divKelasRawat" id="divkelasrawat" style="display: none;">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Hak Kelas</label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        
                                                        <div class="input-group">
                                                            <input type="hidden" name="e-klsRawatHak" id="e-klsRawatHak" class="form-control" value="">
                                                            <input type="text" name="e-klsRawatKet" id="e-klsRawatKet" class="form-control" readonly value="">
                                                            <span class="input-group-addon">
                                                                <label><input type="checkbox" id="e-naikKelas" name="e-naikKelas" value="1" onclick="e_naik()"> Naik Kelas</label>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ranap divKelasRawat" id="e-divnaikkelas" style="display:none">
                                                    <input type="hidden" name="klsRawatNaik" id="e-klsRawatNaik" value="">
                                                    <input type="hidden" name="pembiayaan" id="e-pembiayaan" value="">
                                                    <input type="hidden" name="penanggungJawab" id="e-penanggungJawab" value="">
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Diagnosa <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <input type="text" class="form-control" id="e-txtnmdiagnosa" maxlength="10" placeholder="ketik kode atau nama diagnosa min 3 karakter">
                                                        <label id="lblDxSpesialistik" style="color: red; display: none;"></label>
                                                        <input type="hidden" name="diagAwal" id="e-diagAwal" value="">
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">No. Telepon <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <input type="text" class="form-control" id="e-noTelp" placeholder="ketik nomor telepon yang dapat dihubungi" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="15">
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Catatan</label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <textarea class="form-control" id="e-catatan" rows="2" placeholder="ketik catatan apabila ada"></textarea>
                                                    </div>
                                                </div>
                                                <!--  katarak-->
                                                <div class="form-group" id="e-divkatarak">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label"> </label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <input type="checkbox" id="e-chkkatarak" value="1"> Katarak (Centang Katarak <i class="fa fa-check"></i>, Jika Peserta Tersebut Mendapatkan Surat Perintah Operasi katarak)

                                                    </div>
                                                </div>

                                                <!--  lakalantas-->
                                                <div class="form-group">
                                                    <label class="col-md-3 col-sm-3 col-xs-12 control-label">Status Kecelakaan <label style="color:red;font-size:small">*</label></label>
                                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                                        <select class="form-control " id="e-lakaLantas" onchange="e_lakalantas()">
                                                            <option value="-">-- Silahkan Pilih --</option>
                                                            <option value="0" title="Kasus bukan akibat kecelakaan lalu lintas dan kerja" selected>Bukan Kecelakaan</option>
                                                            <option value="1" title="Kasus KLL Tidak Berhubungan dengan Pekerjaan">Kecelakaan LaluLintas dan Bukan Kecelakaan Kerja</option>
                                                            <option value="2" title="1).Kasus KLL Berhubungan dengan Pekerjaan. 2).Kasus KLL Berangkat dari Rumah menuju tempat Kerja. 3).Kasus KLL Berangkat dari tempat Kerja menuju rumah.">Kecelakaan LaluLintas dan Kecelakaan Kerja</option>
                                                            <option value="3" title="1).Kasus Kecelakaan Berhubungan dengan pekerjaan. 2).Kasus terjadi di tempat kerja.Kasus terjadi pada saat kerja.">Kecelakaan Kerja</option>
                                                        </select>

                                                    </div>
                                                </div>

                                                <div id="divJaminanHistori" class="text-muted well well-sm no-shadow col-md-12 col-sm-12 col-xs-12" style="display: none;">
                                                    <input type="hidden" id="e-txtkasuslaka" value="0">
                                                    <input type="hidden" id="e-txtnosepjaminanhistori">
                                                    <input type="hidden" id="e-txtnosepjaminanhistori2">
                                                    <input type="hidden" id="e-txtkasuskejadian2">
                                                    <input type="hidden" id="e-txtstatusdijamin">
                                                    <p style="margin-top: 10px;" id="pketerangan"></p>
                                                </div>
                                                <div id="e-divJaminan" class="text-muted well well-sm no-shadow" style="display: none;">
                                                    <!-- <div class="form-group">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Penjamin</label>
                                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                                            <select name="penjamin" id="e-penjamin" style="width:100%" multiple>
                                                                <option value="1">Jasa raharja PT</option>
                                                                <option value="2">BPJS Ketenagakerjaan</option>
                                                                <option value="3">TASPEN PT</option>
                                                                <option value="4">ASABRI PT</option>
                                                            </select>
                                                        </div>
                                                    </div> -->
                                                    <div class="form-group">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Tanggal Kejadian</label>
                                                        <div class="col-md-3 col-sm-3 col-xs-12">
                                                            <div class="input-group date">
                                                                <input type="text" class="form-control datepicker" id="e-txtTglKejadian" placeholder="yyyy-MM-dd" maxlength="10">
                                                                <span class="input-group-addon">
                                                                    <span class="fa fa-calendar">
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group ">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Suplesi</label>
                                                        <div class="col-md-7 col-sm-7 col-xs-12">
                                                            <div class="input-group">
                                                                <span class="input-group-addon">
                                                                    <label><input type="checkbox" id="e-suplesi" name="suplesi" value="1" onclick="e_cekSuplesi()"></label>
                                                                </span>
                                                                <input type="text" class="form-control" id="e-noSepSuplesi" name="noSepSuplesi" readonly placeholder="ketik nomor SEP Suplesi">
                                                                <span class="input-group-btn">
                                                                    <button class="btn btn-primary btn-sm" type="button" id="e-cariSuplesi" onclick="e_cariSepSuplesi()" disabled><span class="fa fa-search" id="e-iconcariSuplesi"></span></button>
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group ">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Lokasi Kejadian</label>
                                                        <div class="col-md-7 col-sm-7 col-xs-12">

                                                            <select class="form-control select2" id="e-cbprovinsi" name="cbprovinsi" onchange="getKabupatenkll('e-cbkabupaten','e-cbprovinsi')" style="width:100%;">
                                                                <option value="">-- Silahkan Pilih Propinsi --</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                        <div class="col-md-7 col-sm-7 col-xs-12">
                                                            <select class="form-control select2" id="e-cbkabupaten" onchange="getKecamatankll('e-cbkecamatan','e-cbkabupaten')" style="width:100%;"></select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                        <div class="col-md-7 col-sm-7 col-xs-12">
                                                            <select class="form-control select2" id="e-cbkecamatan" style="width:100%"></select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label class="col-md-3 col-sm-3 col-xs-12 control-label">Keterangan Kejadian</label>
                                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                                            <textarea class="form-control" id="e-txtketkejadian" rows="2" placeholder="ketik keterangan kejadian"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end lakalantas-->

                                            </div>
                                            <div class="box-footer">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                    <button type="button" id="e-btnBatal" class="btn btn-danger" onclick="batalkanSep('<?= $row->no_sep?>','<?= $row->no_surat?>')"><span id="iconBatalSep" class="fa fa-remove"></span> Batal Sep</button>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div id="divSimpan" style="display: block;" >
                                                            <div class="btn-group pull-right">
                                                            <button type="button" class="btn btn-warning" id="btnCetakSep" onclick="cetaksep('<?= $row->no_sep ?>','<?= $row->tgl_masuk ?>')"><span class="fa fa-print" id="iconCetakSep"></span> Cetak SEP</button>
                                                                <button type="button" id="e-btnSimpan" class="btn btn-success" onclick="updateSEP()"><i class="fa fa-save" id="iconBtnsimpan"></i> Update SEP</button>
                                                            </div> 
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-12" id="newsep" <?php if(empty($row->no_sep)) echo 'style="display:block"'; else echo  'style="display:none"';?> >
                                <form class="form-horizontal" action="">
                                    
                                    <input type="hidden" name="idx" id="idx" value="<?= $row->idx ?>">
                                    <input type="hidden" name="noKartu" id="noKartu" value="<?= $row->nobpjs ?>">
                                    <input type="hidden" name="ppkPelayanan" id="ppkPelayanan" value="<?= KODERS_VC ?>">
                                    <input type="hidden" name="namappkPelayanan" id="namappkPelayanan" value="<?= FASKES_VC ?>">
                                    <input type="hidden" name="jnsPelayanan" id="jnsPelayanan" value="<?php if($row->jns_layanan==1) echo "1"; else echo "2" ?>">
                                    <input type="hidden" name="klsRawat" id="klsRawat" value="">
                                    <input type="hidden" name="jns_layanan" id="jns_layanan" value="<?= $row->jns_layanan ?>">
                                    <!-- Tidak Diisi Kerena SEP Rawat Jalan -->
                                    <input type="hidden" name="klsRawatNaik" id="klsRawatNaik" value="">
                                    <input type="hidden" name="pembiayaan" id="pembiayaan" value="">
                                    <input type="hidden" name="penanggungJawab" id="penanggungJawab" value="">
                                    <input type="hidden" name="nomr" id="nomr_sep" value="">
                                    <!-- <input type="hidden" name="asalRujukan" id="asalRujukan" value="1"> -->
                                    <!-- Informasi Rujukan -->
                                    
                                    <div class="box-body">
                                        <div>
                                            <label style="color:red;font-size:small">* Wajib Diisi</label>
                                        </div>
                                        
                                        <div class="form-group" id="divPoli">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">No Kartu <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <div class="input-group">
                                                            <input name="nobpjs" id="nobpjs" type="text" class="form-control" value="<?= $row->nobpjs?>" >
                                                            <input type="hidden" name="status_peserta" id="status_peserta" value="">
                                                            <input type="hidden" name="sekarang" id="sekarang" value="<?= date('Y-m-d')?>">
                                                            
                                                            <span class="input-group-addon" id="status">
                                                                <a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-search" id="iconcekStatus"></i> Cek</a>
                                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" id="divPoli" <?php if($row->jns_layanan==1) echo "style='display:none;'" ?>>
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Spesialis/SubSpesialis <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <label><input type="checkbox" id="eksekutif" name="eksekutif" value="1"> Eksekutif</label>
                                                    </span>
                                                    <input type="text" class="form-control ui-autocomplete-input" id="txtnmpoli" maxlength="10" placeholder="ketik kode atau nama Spesialis/Subspesialis min 3 karakter" value="<?php if($row->jns_layanan==3) echo "INSTALASI GAWAT DARURAT"; ?>" <?php if($row->jns_layanan==3) echo "readonly"; ?>>
                                                    <input type="hidden" class="form-control" name="tujuan" id="tujuan" value="<?php if($row->jns_layanan==3) echo "IGD"; ?>">
                                                    <input type="hidden" class="form-control" name="tujuanRujukan" id="tujuanRujukan" value="">
                                                </div>
                                            </div>
                                        </div>
                                        <input type="hidden" name="jmlsep" id="jmlsep" value="0">
                                        <div id="tkj"><input type='hidden' id='tujuanKunj' name='tujuanKunj' value='0'></div>
                                        <div id="prosedure"><input type='hidden' id='flagProcedure' name='flagProcedure' value=''></div>
                                        <div id="penunjang"><input type='hidden' id='kdPenunjang' name='kdPenunjang' value=''></div>
                                        <div id="asesmen"><input type='hidden' id='assesmentPel' name='assesmentPel' value=''></div>
                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Dokter Yang Menangani <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <!--input type="text" class="form-control ui-autocomplete-input" id="txtnmDokter" placeholder="ketik nama dokter Yang menangini">
                                                <input type="hidden" id="kodeDokter" value=""-->
                                                <select name="dpjpLayan" id="dpjpLayan" class="form-control select2" style="width: 100%;">

                                                </select>
                                                <span class="text-error"></span>
                                            </div>
                                        </div>
                                        <div id="divRujukan" <?php if($row->jns_layanan==3) echo "style='display:none;'"; ?>>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Asal Rujukan</label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <select class="form-control" id="asalRujukan"  name="asalRujukan">
                                                        <option value="1" <?php if($row->jns_layanan==3) echo "selected"; ?>>Faskes Tingkat 1</option>
                                                        <option value="2" <?php if($row->jns_layanan==1) echo "selected"; ?>>Faskes Tingkat 2</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">PPK Asal Rujukan <label style="color:red;font-size:small">*</label></label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <input type="text" class="form-control ui-autocomplete-input" id="txtppkasalrujukan" placeholder="ketik kode atau nama ppk asal rujukan min 3 karakter" value="<?php if($row->jns_layanan==1) echo FASKES_VC; ?>">
                                                    <input type="hidden" name="ppkRujukan" id="ppkRujukan" value="<?php if($row->jns_layanan==1) echo KODERS_VC; ?>">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label"><label style="color:gray;font-size:x-small">(yyyy-mm-dd)</label> Tgl.Rujukan</label>
                                                <div class="col-md-3 col-sm-3 col-xs-12">
                                                    <div class="input-group date">
                                                        <input type="text" class="form-control datepicker" name='tglRujukan' id="tglRujukan" placeholder="yyyy-MM-dd" value="<?= date('Y-m-d') ?>" maxlength="10" readonly>
                                                        <span class="input-group-addon">
                                                            <span class="fa fa-calendar">
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">No. Rujukan <label style="color:red;font-size:small">*</label></label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <div class="input-group ">
                                                        <input type="hidden" id="txtNorujuk" name="txtNorujuk" class="form-control" placeholder="Enter Nomor Rujukan">
                                                        <input type="hidden" name="encryptdata" id="encryptdata" value="">
                                                        <input type="text" class="form-control" id="noRujukan" name="noRujukan" placeholder="ketik nomor rujukan" maxlength="19" value="<?= $row->no_rujuk ?>">
                                                        <div class="input-group-btn" id="aksirujukan">
                                                            <button type="button" id="cariRujukan" class="btn btn-default" onclick="getListRujukan()">
                                                                    <i class="fa fa-search" id="iconcariRujukan"></i> Cari Rujukan</button>
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <!-- kontrol -->
                                        <div id="divkontrol" class='divkontrol' <?php if($row->jns_layanan==3) echo "style='display:none;'"; ?>>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label" id="lblkontrol">No.Surat Kontrol/SKDP <label style="color:red;font-size:small">*</label></label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <div class="input-group ">
                                                        <input type="text" id="no_suratkontrol" name="no_suratkontrol" class="form-control" placeholder="Enter Nomor Surat Kontrol" onkeyup="enter_nokontrol(event)">
                                                        <input type="hidden" name="kd" id="kd">
                                                        <input type="hidden" name="nd" id="nd">
                                                        <input type="hidden" class="form-control" id="noSurat" maxlength="25" placeholder="ketik nomor surat kontrol" onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="6">
                                                        <input type="hidden" id="txtidkontrol" value="1">
                                                        <input type="hidden" id="noSuratlama" value="">
                                                        <input type="hidden" id="txtpoliasalkontrol" value="">
                                                        <input type="hidden" id="txttglsepasalkontrol" value="">
                                                        <div class="input-group-btn">
                                                            <button type="button" id="cariKontrol" class="btn btn-default" <?php if (STATUS_VC == "0") echo "disabled";
                                                                                                                                else echo 'onclick="getListKontrol()"' ?>>
                                                                <i class="fa fa-search"></i> Cari Surat Kontrol</button>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">DPJP Pemberi Surat SKDP/SPRI <label style="color:red;font-size:small">*</label></label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <!--input type="text" class="form-control ui-autocomplete-input" id="txtnmdpjp" placeholder="ketik nama dokter DPJP Pemberi Surat SKDP/SPRI">
                                                    <input type="hidden" id="kodeDPJP" value=""-->
                                                    <select name="kodeDPJP" id="kodeDPJP" class="form-control select2" style="width: 100%;">

                                                    </select><br>
                                                    <!-- <span class="text-error">DPJP Tidak Boleh Kosong</span> -->
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end kontrol -->
                                        <div class="clearfix"></div>
                                        <!-- sep -->
                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label"><label style="color:gray;font-size:x-small">(yyyy-mm-dd)</label> Tgl. SEP</label>
                                            <div class="col-md-3 col-sm-3 col-xs-12">
                                                <div class="input-group date">
                                                    <?php 
                                                    $tgl=explode(" ",$row->tgl_kunjungan);
                                                    if(count($tgl)>0) $tglsep=$tgl[0]; else $tglsep=date('Y-m-d');
                                                    ?>
                                                    <input type="text" class="form-control datepicker" id="tglSep" name="tglSep" placeholder="yyyy-MM-dd" maxlength="10" value="<?= $tglsep ?>" readonly >
                                                    <span class="input-group-addon">
                                                        <span class="fa fa-calendar">
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">No. MR <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="noMr" name='noMr' placeholder="ketik nomor MR" value="<?= $row->nomr ?>" maxlength="10">
                                                    <span class="input-group-addon">
                                                        <label><input type="checkbox" id="cob" name="cob" value='1'> Peserta COB</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group" class="ranap divKelasRawat" id="divkelasrawat" <?php if($row->jns_layanan!=1) echo  'style="display: none;"'; ?> >
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Hak Kelas</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                
                                                <div class="input-group">
                                                    <input type="hidden" name="klsRawatHak" id="klsRawatHak" class="form-control" value="">
                                                    <input type="text" name="klsRawatKet" id="klsRawatKet" class="form-control" readonly value="">
                                                    <span class="input-group-addon">
                                                        <label><input type="checkbox" id="naikKelas" name="naikKelas" value="1" onclick="naik()"> Naik Kelas</label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ranap divKelasRawat" id="divnaikkelas" <?php if($row->jns_layanan!=1) echo  'style="display: none;"'; ?>>
                                            <input type="hidden" name="klsRawatNaik" id="klsRawatNaik" value="">
                                            <input type="hidden" name="pembiayaan" id="pembiayaan" value="">
                                            <input type="hidden" name="penanggungJawab" id="penanggungJawab" value="">
                                        </div>

                                        <!-- <div class="form-group" id="divkelasrawat" style="display: none;">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Kelas Rawat</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <select class="form-control" id="cbKelas">
                                                    <option value="3">Kelas 3</option>
                                                </select>
                                            </div>
                                        </div> -->

                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Diagnosa <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" class="form-control" id="txtnmdiagnosa" maxlength="10" placeholder="ketik kode atau nama diagnosa min 3 karakter">
                                                <label id="lblDxSpesialistik" style="color: red; display: none;"></label>
                                                <input type="hidden" name="diagAwal" id="diagAwal" value="">
                                            </div>
                                        </div>


                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">No. Telepon <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="text" class="form-control" id="noTelp" name="noTelp" value="<?= $row->no_telpon ?>" placeholder="ketik nomor telepon yang dapat dihubungi"  maxlength="15">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Catatan</label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <textarea class="form-control" id="catatan" rows="2" placeholder="ketik catatan apabila ada"></textarea>
                                            </div>
                                        </div>
                                        <!--  katarak-->
                                        <div class="form-group" id="divkatarak" style="display:none">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label"> </label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <input type="checkbox" id="chkkatarak" value="1"> Katarak (Centang Katarak <i class="fa fa-check"></i>, Jika Peserta Tersebut Mendapatkan Surat Perintah Operasi katarak)

                                            </div>
                                        </div>

                                        <!--  lakalantas-->
                                        <div class="form-group">
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Status Kecelakaan <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <select class="form-control " id="lakaLantas" onchange="lakalantas()">
                                                    <option value="-">-- Silahkan Pilih --</option>
                                                    <option value="0" title="Kasus bukan akibat kecelakaan lalu lintas dan kerja" selected>Bukan Kecelakaan</option>
                                                    <option value="1" title="Kasus KLL Tidak Berhubungan dengan Pekerjaan">Kecelakaan LaluLintas dan Bukan Kecelakaan Kerja</option>
                                                    <option value="2" title="1).Kasus KLL Berhubungan dengan Pekerjaan. 2).Kasus KLL Berangkat dari Rumah menuju tempat Kerja. 3).Kasus KLL Berangkat dari tempat Kerja menuju rumah.">Kecelakaan LaluLintas dan Kecelakaan Kerja</option>
                                                    <option value="3" title="1).Kasus Kecelakaan Berhubungan dengan pekerjaan. 2).Kasus terjadi di tempat kerja.Kasus terjadi pada saat kerja.">Kecelakaan Kerja</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div id="divJaminanHistori" class="text-muted well well-sm no-shadow col-md-12 col-sm-12 col-xs-12" style="display: none;">
                                            <input type="hidden" id="txtkasuslaka" value="0">
                                            <input type="hidden" id="txtnosepjaminanhistori">
                                            <input type="hidden" id="txtnosepjaminanhistori2">
                                            <input type="hidden" id="txtkasuskejadian2">
                                            <input type="hidden" id="txtstatusdijamin">
                                            <p style="margin-top: 10px;" id="pketerangan"></p>
                                        </div>
                                        <div id="divJaminan" class="text-muted well well-sm no-shadow" style="display: none;">
                                            <!-- <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Penjamin</label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <select name="penjamin" id="penjamin" style="width:100%" multiple>
                                                        <option value="1">Jasa raharja PT</option>
                                                        <option value="2">BPJS Ketenagakerjaan</option>
                                                        <option value="3">TASPEN PT</option>
                                                        <option value="4">ASABRI PT</option>
                                                    </select>
                                                </div>
                                            </div> -->
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Tanggal Kejadian</label>
                                                <div class="col-md-3 col-sm-3 col-xs-12">
                                                    <div class="input-group date">
                                                        <input type="text" class="form-control datepicker" id="txtTglKejadian" name="tglKejadian" placeholder="yyyy-MM-dd" maxlength="10">
                                                        <span class="input-group-addon">
                                                            <span class="fa fa-calendar">
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="form-group ">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Suplesi</label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <label><input type="checkbox" id="suplesi" name="suplesi" value="1" onclick="cekSuplesi()"></label>
                                                        </span>
                                                        <input type="text" class="form-control" id="noSepSuplesi" name="noSepSuplesi" readonly placeholder="ketik nomor SEP Suplesi">


                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="form-group ">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Suplesi</label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">
                                                            <label><input type="checkbox" id="suplesi" name="suplesi" value="1" onclick="cekSuplesi()"></label>
                                                        </span>
                                                        <input type="text" class="form-control" id="noSepSuplesi" name="noSepSuplesi" readonly placeholder="ketik nomor SEP Suplesi">
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-primary btn-sm" type="button" id="cariSuplesi" onclick="cariSepSuplesi()" disabled><span class="fa fa-search" id="iconcariSuplesi"></span></button>
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group ">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Lokasi Kejadian</label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">

                                                    <select class="form-control select2" id="cbprovinsi" name="cbprovinsi" onchange="getKabupatenkll()" style="width:100%;">
                                                        <option value="">-- Silahkan Pilih Propinsi --</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <select class="form-control select2" id="cbkabupaten" onchange="getKecamatankll()" style="width:100%;"></select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <select class="form-control select2" id="cbkecamatan" style="width:100%;"></select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Keterangan Kejadian</label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <textarea class="form-control" id="txtketkejadian" name="keterangan" rows="2" placeholder="ketik keterangan kejadian"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end lakalantas-->
                                        <div id="divSimpan" style="display: block;">
                                            <button type="button" style="margin-left:10px;" id="btnSimpan" class="btn btn-success pull-right" onclick="asesmenSep()"><i class="fa fa-save"></i> Buat SEP</button>
                                        </div>
                                    </div>
                                    
                                </form> 
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab_4">
                        <div class="row">
							<div class="col-md-12">
                        	<?php 
                            
                            // if(empty($rujukanonline)){
                                ?>
                                <br>
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
												<input type="text" class="form-control datepicker" id="r-tglRujukan" name="r-tglRujukan" value="<?= date('Y-m-d') ?>" placeholder="Masukkan Tgl Rujukan">
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
                                
                                <?php
                            // }
                            ?>
								<!-- <div class="row">
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
												<th style="font-size: 20px">
												<?php if(!empty($rujukanonline)){ ?>
													<a href="<?= base_url() ."rekammedis/pasien/cetakrujukan/".$rujukanonline->noRujukan ?>" target="_blank" class="btn btn-warning">
													<?php echo $rujukanonline->noRujukan ?>
													</a>
												<?php } ?>
												</th>
											</tr>
											<tr>
												<th>RS Tujuan</th>
												<th><?= !empty($rujukanonline) ? $rujukanonline->namatujuanRujukan:"" ?></th>
											</tr>

											<tr>
												<th>Poliklinik Tujuan</th>
												<th><?= !empty($rujukanonline) ? $rujukanonline->namapoliTujuan:"" ?></th>
											</tr>
											<tr>
												<th>Diagnosa</th>
												<th><?= !empty($rujukanonline) ? $rujukanonline->diagnosanama:"" ?></th>
											</tr>
											<tr>
												<th>Jenis Layanan</th>
												<th><?php 
												if(!empty($rujukanonline)){
													if($rujukanonline->jnsPelayanan==2) echo "R. Jalan"; else echo "R.Inap"; 
												}
												?></th>
											</tr>
											</tr>
										</table>
									</div>
								</div> -->
									
							</div>
						</div>
                    </div>
                    <div class="tab-pane" id="tab_5">
                        <div class="row"><div class="col-md-12">Disini Form No Antrian</div></div>
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

<div class="modal fade" id="form-list-rujukan" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Rujukan Faskes Tingkat 1</h3>
            </div>
            <div class="modal-body">
                <div id="loading"></div>
                <div id="formlistrujukan">
                    <form class="form-horizontal">
                        <div id="tblPopup_Rujukan_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                            <!-- <div class="row" id="pilihfaskes" style="display=none">
                                <div class="col-md-12">
                                    <input type="radio" name="faskes" id="pcare" checked onclick="getListRujukan(1)">PCARE
                                    <input type="radio" name="faskes" id="rs" onclick="getListRujukan(2)">RUMAH SAKIT
                                </div>
                            </div> -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered" id="tblPopup_Rujukan" style="font-size: small; width : 100%" role="grid" aria-describedby="tblPopup_Rujukan_info" width="100%" cellpadding="0">
                                        <thead>
                                            <tr role="row">
                                                <th>No.</th>
                                                <th>No.Rujukan</th>
                                                <th>Tgl.Rujukan</th>
                                                <th>No.Kartu</th>
                                                <th>Nama</th>
                                                <th>PPK Perujuk</th>
                                                <th>Sub/Spesialis</th>
                                                <th style="width:50px" >Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="list-data-rujukan">
                                            <tr class="odd">
                                                <td colspan="8" valign="top">No data available in table</td>
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
<!-- Modal SEP -->

<!-- Modal Surat Kontrol -->
<div class="modal fade" id="form-list-kontrol" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headkontrol">Surat Kontrol</h3>
            </div>
            <div class="modal-body">
                <div class="step" id="listkontrol" >
                    <div class="row">
                        <div class="col-md-4">
                            <select name="filter" id="filter" class="form-control" onchange="rencanaKontrolBpjs()">
                                <option value="1" selected>Tanggal Entry</option>
                                <option value="2">Tanggal Rencana Kontrol</option>
                            </select>
                        </div>
                        <div class="col-md-5">
                            <select name="bulan" id="bulan" class="form-control select2" style="width:100%" onchange="rencanaKontrolBpjs()">
                                <option value="01" <?= date('m')=='01' ? "selected":"" ?>>Januari</option>
                                <option value="02" <?= date('m')=='02' ? "selected":"" ?>>Februari</option>
                                <option value="03" <?= date('m')=='03' ? "selected":"" ?>>Maret</option>
                                <option value="04" <?= date('m')=='04' ? "selected":"" ?>>April</option>
                                <option value="05" <?= date('m')=='05' ? "selected":"" ?>>Mei</option>
                                <option value="06" <?= date('m')=='06' ? "selected":"" ?>>Juni</option>
                                <option value="07" <?= date('m')=='07' ? "selected":"" ?>>Juli</option>
                                <option value="08" <?= date('m')=='08' ? "selected":"" ?>>Agustus</option>
                                <option value="09" <?= date('m')=='09' ? "selected":"" ?>>September</option>
                                <option value="10" <?= date('m')=='10' ? "selected":"" ?>>Oktober</option>
                                <option value="11" <?= date('m')=='11' ? "selected":"" ?>>Novembet</option>
                                <option value="12" <?= date('m')=='12' ? "selected":"" ?>>Desmber</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select name="tahun" id="tahun" class="form-control" >
                                <?php 
                                for ($i=date('Y'); $i >= date('Y')-1; $i--) { 
                                    ?>
                                    <option value="<?= $i ?>" <?= $i==date('Y')? "selected":"" ?>><?= $i ?></option>
                                    <?php
                                }
                                ?>
                            </select>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table">
                                <tr class="bg-green">
                                    <td>No</td>
                                    <td>Jenis Kontrol</td>
                                    <td>NO Surat Kontrol</td>
                                    <td>Poli</td>
                                    <td>Nama Dokter</td>
                                    <td>Tgl Buat</td>
                                    <td>Tgl Rencana Kontrol</td>
                                    <td>Terbit SEP</td>
                                </tr>
                                <tbody id="datakontrol"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class='step' id="riwayat" style="display:none;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="Dari">Dari</label>
                            <?php 
                            $sekarang=date('Y-m-d');
                            if(empty($mulai)) $mulai=date('Y-m-d', strtotime('-30 days', strtotime($sekarang))); ;
                            ?>
                            <input type="text" name="dari" id="dari" class="form-control datepicker" value="<?= $mulai ?>">
                        </div>
                        <div class="col-md-3">
                            <label for="Dari">Sampai</label>
                            <div class="input-group input-group-sm">
                                <input type="text" name="sampai" id="sampai" class="form-control datepicker" value="<?= date('Y-m-d') ?>">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary" onclick="riwayatKunjungan()"> <span class="fa fa-search"></span> Cari SEP</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Tgl SEP</td>
                                        <td>Jenis Layanan</td>
                                        <td>No Rujukan</td>
                                        <td>No SEP</td>
                                        <td>Poli</td>
                                        <td>PPK Pelayan</td>
                                        <td>Diagnosa</td>
                                    </tr>
                                </thead>
                                <tbody id="datariwayat"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="step" id="formsuratkontrol" style="display:none;">
                    <form action="#"  class="form-horizontal" id="formkontrol">
                        <input type="hidden" name="jnsKontrol" id="jnsKontrol" value="<?php if($row->jns_layanan==1) echo "1"; else echo "2" ?>">
                        <input type="hidden" name="ktglRujukan" id="ktglRujukan" value="">
                        <div class="form-group">
                            <label class="control-label col-sm-4" for="email" id="headnomor">No SEP:</label>
                            <div class="col-sm-6">
                            <input type="text" class="form-control" id="noSEP" name='noSEP' placeholder="Masukkan No SEP" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4" for="pwd">Tanggal Rencana Kontrol:</label>
                            <div class="col-sm-6">
                                <div class="input-group">
                                    <input type="text" class="form-control datepicker" id="tglRencanaKontrol" placeholder="Masukkan rencana kontrol" onchange="caripoliKontrol()">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" class="button"> <span class="fa fa-calendar" id="iconCariPoli"></span></button>
                                    </span>
                                </div>
                            
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4" for="pwd">Poliklinik:</label>
                            <div class="col-sm-6">
                                <div class="input-group">
                                <select name="poliKontrol" id="poliKontrol" class="form-control" onchange="dokterKontrol()" style="width:100%"></select>
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" class="button"> <span class="fa fa-hospital-o" id="iconCariDokter"></span></button>
                                    </span>
                                </div>
                            
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-4" for="pwd">Dokter:</label>
                            <div class="col-sm-6">
                                <div class="input-group">
                                <select name="kodeDokter" id="kodeDokter" class="form-control" style="width:100%"></select>
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" class="button"> <span class="fa fa-user-md" id="iconDokter"></span></button>
                                    </span>
                                </div>
                            
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-6">
                            <button type="button" class="btn btn-primary" id="btnbuatkontrol" onclick='buatSuratKontrol()'><span id="iconkontrol" class="fa fa-save"></span> Buat Surat Kontrol</button>
                            <button type="button" class="btn btn-danger" onclick="resetFormKontrol()">Batal</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="asspel" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Pilih ALasan kunjungan</h3>
            </div>
            <div class="modal-body">
            <select name="c-assesmentPel" id="c-assesmentPel" class="form-control input-sm" onchange="pilihAsesmen()">
                <option value="">Pilih alasan</option>
                <option value="1">Poli spesialis tidak tersedia pada hari sebelumnya</option>
                <option value="2">Jam Poli telah berakhir pada hari sebelumnya</option>
                <option value="3">Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya</option>
                <option value="4">Atas Instruksi RS</option>
                <option value="5">Tujuan Kontrol</option>
            </select>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="asemenTujuanKunj" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Asesmen Tujuan Kunjungan</h3>
            </div>
            <div class="modal-body">
                <h3 class="text-center">
                    <b>Apakah tujuan kunjungan anda ?</b>
                    </h3>
                <div class="row">
                    <div class="col-md-12">
                        <select name="asesmenTujuanKunjungan" id="asesmenTujuanKunjungan" class="form-control" onchange="pilihAsesmenTujuan()">
                            <option value="">Pilih Tujuan Kunjungan</option>
                            <option value="1">Procedure</option>
                            <option value="2">Tujuan Kontrol</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="asesmenProsedure" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Asesmen Prosedure</h3>
            </div>
            <div class="modal-body">
                <h3 class="text-center">
                    <b>Pilih Jenis Prosedure !</b>
                    </h3>
                <div class="row">
                    <div class="col-md-12">
                        <select name="asesmenJenisProsedure" id="asesmenJenisProsedure" class="form-control" onchange="pilihAsesmenProsedure()">
                            <option value="">Pilih Jenis Prosedure</option>
                            <option value="0">Prosedure Tidak Berkelanjutan</option>
                            <option value="1">Prosedure Berkelanjutan</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="asesmenFalgProsedure" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Pilih Poli Penunjang</h3>
            </div>
            <div class="modal-body">
                <h3 class="text-center">
                    <b>Silahkan Pilih Poli Penunjang !</b>
                    </h3>
                <div class="row">
                    <div class="col-md-12">
                        <select name="asesmenKdPenunjang" id="asesmenKdPenunjang" class="form-control" onchange="pilihKdPenunjang()">
                            <option value="">Pilih Poli Penunjang</option>
                            
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="asesmenTujuanLayanan" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Asesmen pelayanan</h3>
            </div>
            <div class="modal-body">
                <h3 class="text-center">
                    <b>Mengapa pelayanan ini tidak diselesaikan pada hari yang sama sebelumnya ?</b>
                    </h3>
                <div class="row">
                    <div class="col-md-12">
                        <select name="asesmenPelayanan" id="asesmenPelayanan" class="form-control" onchange="pilihAsesmenPelayanan()">
                            <option value="">Pilih </option>
                            <option value="1">Poli Spesialis tidak tersedia pada hari sebelumnya</option>
                            <option value="2">Jam poli telah berakhir pada hari sebelumnya</option>
                            <option value="3">Dokter spesialis dimaksud tidak praktek pada hari sebelumnya</option>
                            <option value="4">Atas instruksi rumah sakit</option>
                            <option value="5">Tujuan Kontrol</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalsupplesi" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">List SEP Suplesi</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>No Registrasi</td>
                                    <td>No SEP</td>
                                    <td>No Sep Awal</td>
                                    <td>No Surat Jaminan</td>
                                    <td>Tgl Kejadian</td>
                                    <td>Tgl SEP</td>
                                </tr>
                            </thead>
                            <tbody id="data-suplesi"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
