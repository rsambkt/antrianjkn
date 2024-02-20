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
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs">
                            <li class="active"><a title="Profile Peserta" href="#tab_11" data-toggle="tab" aria-expanded="true"><span class="fa fa-user"></span> Profile</a></li>
                            <li class=""><a href="#tab_12" title="Rujukan" data-toggle="tab" aria-expanded="false" onclick="allrujukan(1);allrujukan(2)"><span class="fa fa-building"></span> Rujukan JKN</a></li>
                            <li class=""><a href="#tab_13" title="Riwayat" data-toggle="tab" onclick="riwayatKunjunganPeserta()" aria-expanded="false"><span class="fa fa-list"></span> Histori JKN</a></li>
                            <li class=""><a href="#tab_14" title="Rencana Kontrol" data-toggle="tab" onclick="rencanaKontrolPeserta()" aria-expanded="false"><span class="fa fa-user-md"></span> Kontrol JKN</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_11">
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
                                        <?= $row->alamat . "<br>Kel. " . $row->nama_kelurahan
                                                                        . "<br>Kec. " . $row->nama_kecamatan
                                                                        . "<br>Kab / Kota " . $row->nama_kab_kota
                                                                        . "<br>Prov " . $row->nama_provinsi; ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>No Telp</b></td>
                                        <td><?= $row->no_telpon ?></td>
                                    </tr>
                                    <tr>
                                        <td><b>Keluarga</b></td>
                                        <td><?= $row->penanggung_jawab ."(".$row->hub_keluarga.")" ?></td>
                                    </tr>
                                    <tr>
                                        <td><b>No Keluarga</b></td>
                                        <td><?= $row->no_penanggung_jawab ?></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="tab-pane" id="tab_12">
                                <ul class="list-group list-group-unbordered " id="list_rujukan_faskes1"></ul>
                                <ul class="list-group list-group-unbordered " id="list_rujukan_faskes2"></ul>
                            </div>
                            <div class="tab-pane" id="tab_13">
                                <ul class="list-group list-group-unbordered" id="riwayatkunjungan"></ul>
                                <div id="divriwayatKK">
                                    <button type="button" id="btnRiwayat" class="btn btn-default btn-xs btn-block"><span class="fa fa-th-list"></span> Riwayat Lain</button>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab_14">
                                <ul class="list-group list-group-unbordered" id="rencanaKontrol"></ul>
                            </div>
                                            <!-- /.tab-content -->
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-8">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    
                    <li class="registrasi daftar active"><a href="#registrasilayanan" data-toggle="tab">REGISTRASI LAYANAN</a></li>
                    <li class="registrasi sep"><a href="#sep" data-toggle="tab">SEP BPJS</a></li>
                    <li class="registrasi"><a href="#updatepasien" data-toggle="tab">UPDATE DATA PASIEN</a></li>
                    <li class="registrasi"><a href="#riwayatkunjunganrs" data-toggle="tab" onclick="riwayatKunjunganRs(1,'<?= $row->nomr ?>')">RIWAYAT KUNJUNGAN</a></li>
                </ul>
                <div class="tab-content">
                    
                    <div class="tab-pane registrasi daftar active" id="registrasilayanan">
                        <div class="row">
                            <form action="#" id="form_pendaftaran" class="form-horizontal">
                                <?php 
                                if(!empty($ranap)){
                                    ?>
                                    	<div class="col-md-12">
                                            <div class="alert alert-danger">
                                            <strong>Informasi </strong> Pasien tidak bisa didaftarkan kerena pasien terdaftar sebagai pasien rawat inap di ruangan <?= $ranap->nama_ruang?><br>Silahkan pulangkan pasien terlebih dahulu
                                            </div>
                                        </div>
                                    <?php
                                }
                                ?>
                                <div class="col-md-12">
									<?php 
									$jkn=!empty($booking)?$booking->jkn:"";
									$jnslayanan=!empty($booking)?2:"";
									$jeniskunjungan=!empty($booking)?$booking->jeniskunjungan:"";

									if($jeniskunjungan=="1") $idrujuk=2;
									else if($jeniskunjungan=="2") $idrujuk=6;
									else if($jeniskunjungan=="3") $idrujuk=4;
									else if($jeniskunjungan=="4") $idrujuk=3;
									else $idrujuk="";

									$kodepoli=!empty($booking)?$booking->kodepoli:"";
									$kodedokter=!empty($booking)?$booking->kodedokter:"";
									?>

                                    <input type="hidden" name="sekarang" id="sekarang" value="<?= date('Y-m-d') ?>">
                                    <input type="hidden" name="idx_pasien" id="idx_pasien" value="<?= $row->idx; ?>">
                                    <input type="hidden" name="nomr" id="nomr" value="<?= $row->nomr; ?>">
                                    <input type="hidden" name="pekerjaan" id="pekerjaan" value="<?= $row->pekerjaan; ?>">
                                    <input type="hidden" name="no_telpon" id="no_telpon" value="<?= $row->no_telpon; ?>">
                                    <input type="hidden" name="nama_pasien" id="nama_pasien" value="<?= $row->nama; ?>">
                                    <input type="hidden" name="nik" id="nik" value="<?= $row->nik; ?>">
                                    <input type="hidden" name="nama_pasien" id="nama_pasien" value="<?= $row->nama; ?>">
                                    <input type="hidden" name="tempat_lahir" id="tempat_lahir" value="<?= $row->tempat_lahir; ?>">
                                    <input type="hidden" name="tgl_lahir" id="tgl_lahir" value="<?= $row->tgl_lahir; ?>">
                                    <input type="hidden" name="jns_kelamin" id="jns_kelamin" value="<?= $row->jns_kelamin; ?>">
                                    <input type="hidden" name="nama_provinsi" id="nama_provinsi" value="<?= $row->nama_provinsi; ?>">
                                    <input type="hidden" name="nama_kab_kota" id="nama_kab_kota" value="<?= $row->nama_kab_kota; ?>">
                                    <input type="hidden" name="nama_kecamatan" id="nama_kecamatan" value="<?= $row->nama_kecamatan; ?>">
                                    <input type="hidden" name="nama_kelurahan" id="nama_kelurahan" value="<?= $row->nama_kelurahan; ?>">
                                    <input type="hidden" name="alamat" id="alamat" value="<?= $row->alamat; ?>">
                                    <input type="hidden" name="tgl_daftar" id="tgl_daftar" value="<?= $row->tgl_daftar; ?>">

                                    <input type="hidden" name="id_provinsi" id="id_provinsi" value="<?= $row->id_provinsi ?>">
                                    <input type="hidden" name="id_kab_kota" id="id_kab_kota" value="<?= $row->id_kab_kota ?>">
                                    <input type="hidden" name="id_kecamatan" id="id_kecamatan" value="<?= $row->id_kecamatan ?>">
                                    <input type="hidden" name="id_kelurahan" id="id_kelurahan" value="<?= $row->id_kelurahan ?>">
                                    <input type="hidden" name="alamatktp" id="alamatktp" value="<?= $row->alamat ?>">
                                    <input type="hidden" name="rt" id="rt" value="<?= $row->rt ?>">
                                    <input type="hidden" name="rw" id="rw" value="<?= $row->rw ?>">
                                    <input type="hidden" name="kodepos" id="kodepos" value="<?= $row->kodepos ?>">

                                    <input type="hidden" name="provinsi_domisili" id="provinsi_domisili" value="<?= $row->nama_provinsi_domisili ?>">
                                    <input type="hidden" name="kabupaten_domisili" id="kabupaten_domisili" value="<?= $row->nama_kab_kota_domisili ?>">
                                    <input type="hidden" name="kecamatan_domisili" id="kecamatan_domisili" value="<?= $row->nama_kecamatan_domisili ?>">
                                    <input type="hidden" name="kelurahan_domisili" id="kelurahan_domisili" value="<?= $row->nama_kelurahan_domisili ?>">

                                    <input type="hidden" name="id_provinsi_domisili" id="id_provinsi_domisili" value="<?= $row->id_provinsi_domisili ?>">
                                    <input type="hidden" name="id_kab_kota_domisili" id="id_kab_kota_domisili" value="<?= $row->id_kab_kota_domisili ?>">
                                    <input type="hidden" name="id_kecamatan_domisili" id="id_kecamatan_domisili" value="<?= $row->id_kecamatan_domisili ?>">
                                    <input type="hidden" name="id_kelurahan_domisili" id="id_kelurahan_domisili" value="<?= $row->id_kelurahan_domisili ?>">
                                    <input type="hidden" name="alamat_domisili" id="alamat_domisili" value="<?= $row->alamat_domisili ?>">
                                    <input type="hidden" name="rt_domisili" id="rt_domisili" value="<?= $row->rt_domisili ?>">
                                    <input type="hidden" name="rw_domisili" id="rw_domisili" value="<?= $row->rw_domisili ?>">
                                    <input type="hidden" name="kodepos_domisili" id="kodepos_domisili" value="<?= $row->kodepos_domisili ?>">
                                    <input type="hidden" name="pjPasienUmur" id="pjPasienUmur" value="<?= $row->umur_pj ?>">
                                    <input type="hidden" name="id_daftar" id="id_daftar" value="">
                                    <input type="hidden" name="id_poli_asal" id="id_poli_asal" value="">
                                    <input type="hidden" name="nama_poli_asal" id="nama_poli_asal" value="">
                                    <input type="hidden" name="id_dokter_pengirim" id="id_dokter_pengirim" value="">
                                    <input type="hidden" name="nama_dokter_pengirim" id="nama_dokter_pengirim" value="">

                                    <!-- <input type="hidden" name="bulan" id="bulan" value="<?= date('m') ?>">
                                    <input type="hidden" name="tahun" id="tahun" value="<?= date('Y') ?>"> -->

                                    <fieldset>
                                    <legend>Informasi Pelayanan</legend>
                                        <?php 
                                        if(count($cara_daftar)>1){
                                            ?>
                                            <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Cara Daftar</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <select class="form-control" name="id_cara_daftar" id="id_cara_daftar">
                                                            <option value="">Pilih Cara Daftar</option>
                                                            <?php
                                                                foreach ($cara_daftar as $cb) {
                                                                ?>
                                                                    <option value="<?= $cb->idx ?>" ><?= $cb->caradaftar ?></option>
                                                                <?php
                                                            }
                                                            ?>
                                                        </select>
                                                    </div>
                                            </div>
                                        <?php
                                        }else{
                                            ?>
                                            <input type="hidden" name="id_cara_daftar" id="id_cara_daftar" value="<?= $cara_daftar[0]->idx?>">
                                            <?php
                                        }
                                        ?>
                                                
                                                
                                                <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Jenis Layanan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <?php 
                                                        if(count($jenis_layanan)==1){
                                                            ?>
                                                            <input type="hidden" name="jns_layanan" value="<?= $jenis_layanan[0]->idx ?>" id="jns_layanan">
                                                            <input type="text" class="form-control" name="nama_jenis_layanan" id="nama_jenis_layanan" value="<?= $jenis_layanan[0]->jenislayanan ?>" id="jenis_layanan" readonly>
                                                            <?php
                                                        }else{
                                                            ?>
                                                            <select class="form-control" name="jns_layanan" id="jns_layanan" onchange="getRuangan()">
                                                                <option value="">Pilih Jenis Layanan</option>
                                                                <?php
                                                                foreach ($jenis_layanan as $cb) {
                                                                ?>
                                                                    <option value="<?= $cb->idx ?>" <?= $jnslayanan==$cb->idx?"selected":"";	?>><?= $cb->jenislayanan ?></option>
                                                                <?php
                                                                }
                                                                ?>
                                                            </select>
                                                            <?php
                                                        }
                                                        ?>
                                                        
                                                    </div>
                                                </div>
                                                <div class="form-group ranap" style="display: none;">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Reservasi Rawat Jalan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group ">
                                                            <input type="text" id="referensi" name="txtNorujuk" class="form-control" placeholder="Enter No Registrasi Rawat Jalan">
                                                            <!-- <input type="hidden" name="encryptdata" id="encryptdata" value=""> -->
                                                            <input type="hidden" name="sepasal" id="sepasal" value="">
                                                            <div class="input-group-btn" id="aksirujukan">
                                                                <button type="button" id="cariReservasi" class="btn btn-default" onclick="getListReservasi()">
                                                                    <i class="fa fa-search" id="iconcariReservasi"></i> Cari Reservasi</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Cara Bayar</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
															
                                                            <select class="form-control" name="id_cara_bayar" id="id_cara_bayar">
                                                                <option value="">Pilih Cara Bayar</option>
                                                                <?php
                                                                foreach ($cara_bayar as $cb) {
                                                                ?>
                                                                    <option value="<?= $cb->idx ?>" <?= $cb->idx==$jkn?"selected":"" ?>><?= $cb->cara_bayar ?></option>
                                                                <?php
                                                                }
                                                                ?>
                                                            </select>
															
                                                            <input type="hidden" name="jkn" id="jkn" value="<?= $jkn ?>">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group jkn"  style="display: none;">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Tgl Layan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            <input name="waktusekarang" id="waktusekarang" type="hidden" value="<?= date('Y-m-d h:i:s') ?>" disabled onchange="pilihTglBackdate()">
                                                            <input name="tgllayan" id="tgllayan" type="text" class="form-control datepicker" value="<?= date('Y-m-d h:i:s') ?>" disabled onchange="pilihTglBackdate()">
                                                            <span class="input-group-addon" >
                                                                <input type="checkbox" name="backdate" id="backdate" value="1" onclick="backDate()"> <b>Backdate</b> 
                                                            </span>
                                                        </div>
                                                        <!-- <div class="input-group">
                                                            <input name="nobpjs" id="nobpjs" type="text" class="form-control" value="<?= $row->nobpjs; ?>">
                                                            
                                                        </div> -->
                                                    </div>
                                                </div>
                                                <div class="form-group jkn" style="<?= $jkn==1 ? "display: block;": "display: none;";?>">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">No Peserta (<em>No BPJS</em>)</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            <input name="nobpjs" id="nobpjs" type="text" class="form-control" value="<?= $row->nobpjs; ?>" onkeydown="enter_nobpjs(event)">
                                                            <input type="hidden" name="status_peserta" id="status_peserta" value="">
                                                            <span class="input-group-addon">
                                                                <a id="btnUpdateNoBPJS" href="Javascript:updateNoBPJS()"><i class="fa fa-save"></i> Update</a>
                                                            </span>
                                                            <span class="input-group-addon" id="status">
                                                                <a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-search" id="iconcekStatus"></i> Cek</a>
                                                            </span>
                                                        </div>
                                                        <!-- <div class="input-group">
                                                            <input name="nobpjs" id="nobpjs" type="text" class="form-control" value="<?= $row->nobpjs; ?>">
                                                            
                                                        </div> -->
                                                    </div>
                                                </div>
                                                <div class="form-group jkn" style="<?= $jkn==1 ? "display: block;": "display: none;";?>">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Jenis Peserta</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            
                                                            <input type="hidden" name="id_jenis_peserta" id="id_jenis_peserta" value="">
                                                            <input type="text" class="form-control" name="jenis_peserta" id="jenis_peserta" value="" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Rujukan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            <select class="form-control" name="id_rujuk" id="id_rujuk" onchange="pilihRujukan()">
                                                                <option value="">Pilih Rujukan</option>
                                                                <?php
                                                                foreach ($rujukan as $rj) {
                                                                ?>
                                                                    <option value="<?= $rj->idx ?>" <?= $idrujuk==$rj->idx ? "selected":"";?>><?= $rj->rujukan; ?></option>
                                                                <?php
                                                                }
                                                                ?>
                                                            </select>
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <!-- <div class="form-group kontrolulang" style="display:none;">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">No Surat Kontrol</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group ">
                                                            <input type="text" id="no_suratkontrol" name="no_suratkontrol" class="form-control" placeholder="Enter Nomor Surat Kontrol" onkeyup="enter_nokontrol(event)">
                                                            <input type="hidden" name="kd" id="kd">
                                                            <input type="hidden" name="nd" id="nd">
                                                            <div class="input-group-btn">
                                                                <button type="button" id="cariKontrol" class="btn btn-default" <?php if (STATUS_VC == "0") echo "disabled";
                                                                                                                                else echo 'onclick="getListKontrol()"' ?>>
                                                                    <i class="fa fa-search"></i> Cari Surat Kontrol</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> -->
                                                <div id="tingkatfaskes"></div>
                                                
                                                <!-- <div class="form-group adarujukan" style="display: none;">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">No Rujukan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group ">
                                                            <input type="text" id="txtNorujuk" name="txtNorujuk" class="form-control" placeholder="Enter Nomor Rujukan">
                                                            <input type="hidden" name="encryptdata" id="encryptdata" value="">
                                                            <div class="input-group-btn" id="aksirujukan">
                                                                <button type="button" id="cariRujukan" class="btn btn-default" onclick="getListRujukan()">
                                                                    <i class="fa fa-search" id="iconcariRujukan"></i> Cari Rujukan</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> -->
                                                <div class="form-group adarujukan" style="<?= $jkn==1 ? "display: block;": "display: none;";?>">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">PPK Perujuk Oleh<br><em>Jika pasien rujukan</em></label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12 pengirim">

                                                        <input type="hidden" name="id_pengirim" id="id_pengirim">
                                                        <input type="text" name="pjPasienDikirimOleh" id="pjPasienDikirimOleh" class="form-control">
                                                    </div>
                                                    <div class="pengirim" id="lainnya" style="display: none;"><input name="pjPasienDikirimOleh" id="pjPasienDikirimOleh" type="text" class="form-control"> </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Tujuan Layanan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            <?php 
                                                            if(count($ruang)==1){
                                                                ?>
                                                                <input type="hidden" name="id_ruang" id="id_ruang" value="<?= $ruang[0]->idx?>">
                                                                <input type="hidden" name="kodepoli" id="kodepoli" value="<?= $ruang[0]->kode_jkn?>">
                                                                <input type="text" name="nama_ruang" id="nama_ruang" class="form-control" value="<?= $ruang[0]->ruang ?>" readonly>
                                                                <?php
                                                            }else{
                                                                ?>
                                                                <select class="form-control select2" name="id_ruang" id="id_ruang" onchange="getDokter()" style="width:100%;">
                                                                    <option value="">Pilih Poliklinik</option>
                                                                    <?php 
                                                                    foreach ($ruang as $r ) {
																		if($r->kode_jkn==$kodepoli){
																			echo '<option value="'.$r->idx.'" selected>'.$r->ruang.'</option>';
																		}else{
																			echo '<option value="'.$r->idx.'">'.$r->ruang.'</option>';
																		}
                                                                        
                                                                    }
                                                                    ?>
                                                                </select>
																<input type="hidden" name="kodepoli" id="kodepoli" value="<?= !empty($booking) ? $booking->kodepoli:""?>">
                                                                <?php
                                                            }
															// print_r($booking);
                                                            ?>
                                                            <input type="hidden" name="kodebooking" id="kodebooking" value="<?= !empty($booking) ? $booking->kodebooking:""?>">
															<input type="hidden" name="terkirim" id="terkirim" value="<?= !empty($booking) ? $booking->terkirim:""?>">
															<input type="hidden" name="jeniskunjungan" id="jeniskunjungan" value="<?= !empty($booking) ? $booking->jeniskunjungan:""?>">
															<input type="hidden" name="nomorreferensi" id="nomorreferensi" value="<?= !empty($booking) ? $booking->nomorreferensi:""?>">
															
															<input type="hidden" name="namapoli" id="namapoli" value="<?= !empty($booking) ? $booking->namapoli:""?>">
															<input type="hidden" name="kodedokter" id="kodedokter" value="<?= !empty($booking) ? $booking->kodedokter:""?>">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group ranap" style="display: none;">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Kelas Layanan</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                            <select class="form-control" name="kelas_layanan" id="kelas_layanan">
                                                                    <option value="">Pilih Kelas</option>
                                                                    <?php 
                                                                    foreach ($kelas as $r ) {
                                                                        echo '<option value="'.$r->idx.'">'.$r->kelas_layanan.'</option>';
                                                                    }
                                                                    ?>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group" id="datadokter">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Dokter</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group">
                                                        
															<select class="form-control" name="dokterJaga" id="dokterJaga" onchange="getJadwal()">
																<option value="">Pilih Poliklinik</option>
																<?php 
																foreach ($dokter as $r ) {
																	if($r->dokterjkn==$kodedokter){
																		echo '<option value="'.$r->nrp.'"  selected>'.$r->pgwNama.'</option>';
																	}else{
																		echo '<option value="'.$r->nrp.'">'.$r->pgwNama.'</option>';
																	}
																	
																}
																?>
															</select>
															
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group jkn" style="<?= $jkn==1 ? "display: block;": "display: none;";?>">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">No Jaminan (<em>SEP</em>)</label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group ">
                                                            <input name="no_jaminan" id="no_jaminan" type="text" class="form-control">
                                                            <div class="input-group-btn" id="prosessep">
                                                                <button type="button" onclick="showFormSEP()" class="btn btn-danger" id='btnCreateSep'><span id="iconbtnCreateSep"></span> Create SEP (<em>Bridging</em>)</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Keluhan </label>
                                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                                        <div class="input-group ">
                                                            <textarea class="form-control" id="keluhan" name="keluhan"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            <legend>Penanggung Jawab</legend>
                                            <div class="form-group">
                                                <label class="col-md-4 col-sm-4 col-xs-12 control-label">Nama Keluarga</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text" name="penanggung_jawab" id="penanggung_jawab" class="form-control" value="<?= $row->penanggung_jawab ?>">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-4 col-sm-4 col-xs-12 control-label">Telp Keluarga</label>
                                                <div class="col-md-6 col-sm-6 col-xs-12">
                                                    <input type="text" name="no_penanggung_jawab" id="no_penanggung_jawab" class="form-control" value="<?= $row->no_penanggung_jawab ?>">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-4 col-sm-4 col-xs-12 control-label">hub Keluarga</label>
                                                <div class="col-md-3 col-sm-3 col-xs-12">
                                                    <input type="text" name="hub_keluarga" id="hub_keluarga" class="form-control" value="<?= $row->hub_keluarga ?>">
                                                </div>
                                            </div>
                                    </fieldset>


                                </div>
                                
                                <hr>
                                <div class="col-md-12">
                                    
                                    <div style="text-align: right;">
                                        <button type="button" id="batal" class="btn btn-danger">
                                            <i class="fa fa-rotate-left"></i> Batal</button>
                                        <button type="button" id="daftar" class="btn btn-primary" <?= (!empty($ranap) ? "disabled": "") ?>>
                                            Daftar <i class="fa fa-arrow-right" id="icondaftar"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="tab-pane registrasi sep" id="sep">
                        <div class="row">
                            <div class="col-md-12">
                                <form class="form-horizontal" action="">
                                    <input type="hidden" name="idx" id="idx" value="">
                                    <input type="hidden" name="noKartu" id="noKartu" value="">
                                    <input type="hidden" name="ppkPelayanan" id="ppkPelayanan" value="<?= KODERS_VC ?>">
                                    <input type="hidden" name="namappkPelayanan" id="namappkPelayanan" value="<?= FASKES_VC ?>">
                                    <input type="hidden" name="jnsPelayanan" id="jnsPelayanan" value="">
                                    <input type="hidden" name="klsRawat" id="klsRawat" value="">
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
                                            <label class="col-md-3 col-sm-3 col-xs-12 control-label">Spesialis/SubSpesialis <label style="color:red;font-size:small">*</label></label>
                                            <div class="col-md-9 col-sm-9 col-xs-12">
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                        <label><input type="checkbox" id="eksekutif" name="eksekutif" value="1"> Eksekutif</label>
                                                    </span>
                                                    <input type="text" class="form-control ui-autocomplete-input" id="txtnmpoli" maxlength="10" placeholder="ketik kode atau nama Spesialis/Subspesialis min 3 karakter" value="<?= !empty($booking)?$booking->namapoli:""; ?>">
                                                    <input type="hidden" class="form-control" name="tujuan" id="tujuan" value="<?= !empty($booking)?$booking->kodepoli:""; ?>">
                                                    <input type="hidden" class="form-control" name="tujuanRujukan" id="tujuanRujukan" value="<?= !empty($booking)?$booking->kodepoli:""; ?>">
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
                                        <div id="divRujukan">
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">Asal Rujukan</label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <select class="form-control" id="asalRujukan"  name="asalRujukan">
                                                        <option value="1">Faskes Tingkat 1</option>
                                                        <option value="2">Faskes Tingkat 2</option>
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label">PPK Asal Rujukan <label style="color:red;font-size:small">*</label></label>
                                                <div class="col-md-9 col-sm-9 col-xs-12">
                                                    <input type="text" class="form-control ui-autocomplete-input" id="txtppkasalrujukan" placeholder="ketik kode atau nama ppk asal rujukan min 3 karakter">
                                                    <input type="hidden" name="ppkRujukan" id="ppkRujukan" value="">
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
                                                        <input type="text" class="form-control" id="noRujukan" name="noRujukan" placeholder="ketik nomor rujukan" maxlength="19" >
                                                        <div class="input-group-btn" id="aksirujukan">
                                                            <button type="button" id="cariRujukan" class="btn btn-default" onclick="getListRujukan()">
                                                                    <i class="fa fa-search" id="iconcariRujukan"></i> Cari Rujukan</button>
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <!-- kontrol -->
                                        <div id="divkontrol" class='divkontrol' style="display: block;">
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
                                                    <input type="text" class="form-control datepicker" id="tglSep" name="tglSep" placeholder="yyyy-MM-dd" maxlength="10" value="<?= date('Y-m-d') ?>" readonly >
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
                                        <div class="form-group" class="ranap divKelasRawat" id="divkelasrawat" style="display: none;">
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
                                        <div class="ranap divKelasRawat" id="divnaikkelas" style="display:none">
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

                                                    <select class="form-control" id="cbprovinsi" name="cbprovinsi" onchange="getKabupatenkll()">
                                                        <option value="">-- Silahkan Pilih Propinsi --</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <select class="form-control" id="cbkabupaten" onchange="getKecamatankll()"></select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-3 col-xs-12 control-label"></label>
                                                <div class="col-md-7 col-sm-7 col-xs-12">
                                                    <select class="form-control" id="cbkecamatan"></select>
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
                    <div class="tab-pane registrasi" id="updatepasien">
                        <div class="row">
                            <div class="col-md-12">
                                <form action="#" id="updatepasien" class="form-horizontal">
                                <fieldset>
                                            <legend>Biodata Pasien</legend>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3" for="email">No MR [<em>Kode Auto Generate</em>]</label>
                                                <div class="col-sm-9">
                                                    <input type="hidden" name="idx" id="u_idx" value="<?= $row->idx ?>">
                                                    <input readonly type="text" class="form-control input-sm" name="nomr" id="u_nomr" value="<?= $row->nomr ?>">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No KTP (NIK / Passport)</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control input-sm" name="nik" id="u_nik" value="<?= $row->nik ?>">
                                                        <input type="hidden" name="sekarang" id="u_sekarang" value="<?= date('Y-m-d') ?>">
                                                            <!-- <div class="input-group-btn">
                                                                <button type="button" id="u_pesertajkn" class="btn btn-primary" onclick="ceknikbpjs(1)">
                                                                    <i class="fa fa-search"></i> Cari Peserta JKN
                                                                </button>
                                                            </div> -->
                                                            <span class="input-group-addon statusjkn" id="u_status">
                                                            <a id="u_cekStatus" href="Javascript:ceknikbpjs(1)"><i class="fa fa-search" id="u_iconCekStatus"></i> Cek</a>
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label  class="control-label col-sm-3" >No BPJS (<em>Jika Pasien Peserta BPJS Kesehatan</em>)</label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input name="no_bpjs" id="u_no_bpjs" type="text" class="form-control input-sm" value="<?= $row->nobpjs ?>">
                                                    <span class="input-group-addon statusjkn" id="u_status">
                                                            <a id="u_cekStatus" href="Javascript:ceknomorbpjs(1)"><i class="fa fa-search" id="u_iconCekStatus"></i> Cek</a>
                                                    </span>
                                                    
                                                </div>
                                                </div>
                                                <!--input type="text" class="form-control input-sm" name="no_bpjs" id="u_no_bpjs" value="" onkeydown="enter_bpjs(event)"-->
                                            </div>
                                            <div class="form-group bpjs">
                                                <label  class="control-label col-sm-3" >Jenis Peserta (<em>Jika Pasien Peserta BPJS Kesehatan</em>)</label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input name="id_jenis_peserta" id="u_id_jenis_peserta" type="hidden" class="form-control input-sm" value="<?= $row->id_jenis_peserta ?>">
                                                    <input name="jenis_peserta" id="u_jenis_peserta" type="text" class="form-control input-sm" value="<?= $row->jenis_peserta ?>" readonly>

                                                    
                                                </div>
                                                </div>
                                                <!--input type="text" class="form-control input-sm" name="no_bpjs" id="u_no_bpjs" value="" onkeydown="enter_bpjs(event)"-->
                                            </div>
                                            <div class="form-group bpjs">
                                                <label class="control-label col-sm-3" >PPK (<em>Jika Pasien Peserta BPJS Kesehatan</em>)</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <input name="kodeppk" id="u_kodeppk" type="hidden" class="form-control input-sm" value="<?= $row->kodeppk ?>">
                                                        <input name="namappk" id="u_namappk" type="text" class="form-control input-sm" value="<?= $row->namappk ?>" readonly>

                                                        
                                                    </div>
                                                </div>
                                                <!--input type="text" class="form-control input-sm" name="no_bpjs" id="u_no_bpjs" value="" onkeydown="enter_bpjs(event)"-->
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3" >Nama Pasien <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="nama" id="u_nama" value="<?= $row->nama ?>" >
                                                <div class="text-error" id="err_nama"></div>    
                                            </div>
                                            </div>
                                            <div class="form-group">
                                                <label  class="control-label col-sm-3" >Tempat Lahir / DOB <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input type="text" class="form-control input-sm" name="tempat_lahir" id="u_tempat_lahir" value="<?= $row->tempat_lahir ?>" >
                                                    <div class="input-group-btn" style="width: 30%">
                                                        <input type="text" class="form-control input-sm" name="tgl_lahir" id="u_tgl_lahir" placeholder="__/__/____" value="<?= setDateInd($row->tgl_lahir) ?>">
                                                    </div>
                                                </div>
                                                <div class="text-error" id="err_ttl"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3" >Jenis Kelamin</label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <select name="jns_kelamin"  class="form-control input-sm" id="u_jns_kelamin">
                                                        <option value="4" <?= ($row->jns_kelamin==4 ? "selected":"") ?> >Tidak Mengisi</option>
                                                        <option value="0" <?= ($row->jns_kelamin==0 ? "selected":"") ?>>Tidak Diketahui</option>
                                                        <option value="1" <?= ($row->jns_kelamin==1 ? "selected":"") ?>>Laki-Laki</option>
                                                        <option value="2" <?= ($row->jns_kelamin==2 ? "selected":"") ?>>Perempuan</option>
                                                        <option value="3" <?= ($row->jns_kelamin==3 ? "selected":"") ?>>Tidak Dapat Ditentukan</option>
                                                    </select>
                                                    
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3" >Agama</label>
                                                <div class="col-sm-9">
                                                <select name="agama" id="u_agama" class="form-control input-sm">
                                                    <?php 
                                                    foreach ($agama as $a ) {
                                                        ?>
                                                        <option value="<?= $a->idx ?>" <?= ($row->id_agama==$a->idx ? "selected":"") ?>><?= $a->agama ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Pendidikan</label>
                                                <div class="col-sm-9">
                                                <select name="form-control input-sm" id="u_pendidikan" class="form-control input-sm">
                                                    <?php 
                                                    foreach ($pendidikan as $p ) {
                                                        ?>
                                                        <option value="<?= $p->id_tk_pddkn ?>" <?= ($row->id_tk_pddkn==$p->id_tk_pddkn ? "selected":"") ?>><?= $p->nama_tk_pddkn ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                            <?php if(empty($row->id_pekerjaan)) $id_pekerjaan=""; else $id_pekerjaan=$row->id_pekerjaan ?>
                                                <label class="control-label col-sm-3">Pekerjaan</label>
                                                <div class="<?php if($id_pekerjaan==5) echo 'col-md-4'; else echo "col-md-8"; ?>"  id="u_divpekerjaan">
                                                    
                                                    <select name="pekerjaan" id="u_pekerjaan" class="form-control input-sm" >
                                                        <?php 
                                                        foreach ($pekerjaan as $p ) {
                                                            ?>
                                                            <option value="<?= $p->pekerjaan_id?>" <?= (!empty($row->id_pekerjaan) ? ($row->id_pekerjaan == $p->pekerjaan_id ? "selected" : ''):'') ?>><?= $p->pekerjaan_nama ?></option>
                                                            <?php
                                                        }
                                                        ?>
                                                    </select>
                                                </div>
                                                <div id="u_divlainnya" class="col-md-4" style="<?php if($row->id_pekerjaan==5) echo 'display: block;'; else echo "display: none;"; ?>">
                                                    <input type="text" class="form-control input-sm" name="pekerjaanlain" id="u_pekerjaanlain" value="<?= $row->pekerjaan ?>">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Status</label>
                                                <div class="col-sm-9">
                                                <select name="status_kawin" id="u_status_kawin" class="form-control input-sm" >
                                                    <option value="">Pilih</option>
                                                    <?php foreach ($status as $s) : ?>
                                                        <option value="<?= $s->Id ?>" <?= ($row->id_status_kawin==$s->Id ? "selected":"") ?>><?= $s->status ?></option>
                                                    <?php endforeach; ?>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Etnis</label>
                                                <div class="col-sm-9">
                                                <select name="suku" id="u_suku" class="form-control input-sm select2" style="width:100%;">
                                                    <option value="">Pilih</option>
                                                    <?php 
                                                    foreach ($suku as $s ) {
                                                        ?>
                                                        <option value="<?= $s->idx ?>" <?= ($row->id_etnis==$s->idx ? "selected":"") ?>><?= $s->nama_suku?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Bahasa</label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                <select name="bahasa" id="u_bahasa" class="form-control input-sm select2" style="width:100%;">
                                                    <?php 
                                                    foreach ($bahasa as $b ) {
                                                        ?>
                                                        <option value="<?= $b->idx ?>" <?= ($row->id_bahasa==$b->idx ? "selected":"") ?>><?= $b->bahasa ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                <span class="input-group-addon"><input type="checkbox" name="keterbatasanbahasa" id="u_keterbatasanbahasa" value="1" <?= ($row->hambatan_bahasa==1 ? "checked":"") ?>>Keterbatasan Bahasa</span>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No telp Rumah </label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="no_telpon" id="u_no_telpon" value="<?= $row->no_telpon ?>" >
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No HP <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="no_hp" id="u_no_hp" value="<?= $row->no_hp?>" >
                                                <div class="text-error" id="err_no_hp"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Nama Ibu Kandung <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="nama_ibu_kandung" id="u_nama_ibu_kandung" value="<?= $row->nama_ibu_kandung?>" >
                                                <div class="text-error" id="err_nama_ibu_kandung"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Kewarganegaraan <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <select name="kewarganegaraan" id="u_kewarganegaraan" class="form-control input-sm" onchange="pilihKWN()">
                                                    <option value="">-- Pilih --</option>
                                                    <option value="WNA" <?= ($row->kewarganegaraan=='WNA' ? "selected":"") ?>>WNA</option>
                                                    <option value="WNI" <?= ($row->kewarganegaraan=='WNI' ? "selected":"") ?>>WNI</option>
                                                </select>
                                                <div class="text-error" id="err_kewarganegaraan"></div>
                                                </div>
                                            </div>
                                            <legend class="groupWNI groupKewarganegaraan">Alamat Sesuai KTP</legend>
                                            <div class="form-group groupWNA groupKewarganegaraan" style="display: none;">
                                                <label class="control-label col-sm-3">Negara <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <select name="nama_negara" id="u_nama_negara" class="form-control input-sm select2" style="width: 100%">
                                                        <option value="">-- Pilih --</option>
                                                        <?php 
                                                        foreach ($negara as $n ) {
                                                            ?>
                                                            <option value="<?= $n->alpha3 ?>" <?= ($row->id_negara==$n->alpha3 ? "selected":"") ?>><?= $n->nama_negara ?></option>
                                                            <?php
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_negara"></div>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">Provinsi <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    
                                                    <select name="nama_provinsi" id="u_nama_provinsi" class="form-control input-sm select2" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                            foreach ($provinsi as $n ) {
                                                                ?>
                                                                <option value="<?= $n->kode ?>" <?= ($row->id_provinsi==$n->kode ? "selected":"") ?>><?= $n->nama ?></option>
                                                                <?php
                                                            }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_provinsi"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">Kabupaten / Kota <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <select name="nama_kab_kota" id="u_nama_kab_kota" class="form-control input-sm select2" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($kabupaten)){
                                                            foreach ($kabupaten as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kab_kota==$k->kode) ? "selected" : ""; ?> ><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kab_kota"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">Kecamatan / Nagari <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    
                                                    <select name="nama_kecamatan" id="u_nama_kecamatan" class="form-control input-sm select2" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($kecamatan)){
                                                            foreach ($kecamatan as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kecamatan==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kecamatan"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">Kelurahan / Jorong <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <select name="nama_kelurahan" id="u_nama_kelurahan" class="form-control select2 input-sm" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($kelurahan)){
                                                            foreach ($kelurahan as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kelurahan==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kelurahan"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">Alamat <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" name="alamat" id="u_alamat" class="form-control input-sm" placeholder="Jalan dan nomor rumah" value="<?= (!empty($row->alamat) ? $row->alamat: "")?>">
                                                    <div class="text-error" id="err_alamat"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" name="rt" id="u_rt" placeholder="RT" value="<?= (!empty($row->rt) ? $row->rt: "")?>">
                                                    <div class="text-error" id="err_rt"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" name="rw" id="u_rw" placeholder="RW" value="<?= (!empty($row->rw) ? $row->rw: "")?>">
                                                    <div class="text-error" id="err_rw"></div>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control input-sm" id="u_kodepos" placeholder="Kode Pos" value="<?= (!empty($row->idx) ? $row->kodepos: "")?>">
                                                    <div class="text-error" id="err_kodepos"></div>
                                                </div>
                                                
                                            </div>

                                            <div class="form-group groupWNI groupKewarganegaraan">
                                                <label class="control-label col-sm-3">&nbsp;</label>
                                                <div class="col-sm-9">
                                                    <input type="checkbox" name="domisilisesuaiktp" id="u_domisilisesuaiktp" value="1" onclick="cekDomisili()"> Domisili Sesuai KTP
                                                </div>
                                            </div>
                                            <legend class="domisili">Alamat Domisili</legend>
                                            <div class="form-group domisili">
                                                <label class="control-label col-sm-3">Provinsi <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    
                                                    <select name="nama_provinsi_domisili" id="u_nama_provinsi_domisili" class="select2 form-control input-sm" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                            foreach ($provinsi as $n ) {
                                                                ?>
                                                                <option value="<?= $n->kode ?>" <?= ($row->id_provinsi_domisili==$n->kode) ? "selected" : ""; ?>><?= $n->nama ?></option>
                                                                <?php
                                                            }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_provinsi_domisili"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group domisili">
                                                <label class="control-label col-sm-3">Kabupaten / Kota <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    
                                                    <select name="nama_kab_kota_domisili" id="u_nama_kab_kota_domisili" class="select2 form-control input-sm" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($kabdom)){
                                                            foreach ($kabdom as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kab_kota_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kab_kota_domisili"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group domisili">
                                                <label class="control-label col-sm-3">Kecamatan / Nagari <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    
                                                    <select name="nama_kecamatan_domisili" id="u_nama_kecamatan_domisili" class="select2 form-control input-sm" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($kecdom)){
                                                            foreach ($kecdom as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kecamatan_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kecamatan_domisili"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group domisili">
                                                <label class="control-label col-sm-3">Kelurahan / Jorong <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <select name="nama_kelurahan_domisili" id="u_nama_kelurahan_domisili" class="select2 form-control input-sm" style="width: 100%">
                                                        <option value="">--  Pilih --</option>
                                                        <?php 
                                                        if(!empty($keldom)){
                                                            foreach ($keldom as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($row->id_kelurahan_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
                                                                <?php
                                                            }
                                                        }
                                                        ?>
                                                    </select>
                                                    <div class="text-error" id="err_nama_kelurahan_domisili"></div>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="form-group domisili">
                                                <label class="control-label col-sm-3">Alamat Tempat Tinggal <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" name="alamat_domisili" id="u_alamat_domisili" class="form-control input-sm" placeholder="Jalan dan nomor rumah" value="<?= (!empty($row->idx) ? $row->alamat_domisili: "")?>">
                                                    <div class="text-error" id="err_alamat_domisili"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" id="u_rt_domisili" name="rt_domisili" placeholder="RT" value="<?= (!empty($row->idx) ? $row->rt_domisili: "")?>">
                                                    <div class="text-error" id="err_rt_domisili"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" id="u_rw_domisili" name="rw_domisili" placeholder="RW" value="<?= (!empty($row->idx) ? $row->rw_domisili: "")?>">
                                                    <div class="text-error" id="err_rw_domisili"></div>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control input-sm" id="u_kodepos_domisili" placeholder="Kode Pos" value="<?= (!empty($row->idx) ? $row->kodepos_domisili: "")?>">
                                                    <div class="text-error" id="err_kodepos_domisili"></div>
                                                </div>
                                            </div>

                                            <legend>Penanggung Jawab</legend>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="penanggung_jawab" id="u_penanggung_jawab" value="<?= $row->penanggung_jawab?>">
                                                    <div class="text-error" id="err_penanggung_jawab"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Umur <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" class="form-control input-sm" name="umur_pj" id="u_umur_pj" value="<?= $row->umur_pj?>">
                                                    <div class="text-error" id="err_umur_pj"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Pekerjaan Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="pekerjaan_pj" id="u_pekerjaan_pj" value="<?= $row->pekerjaan_pj?>">
                                                    <div class="text-error" id="err_pekerjaan_pj"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Alamat Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="alamat_pj" id="u_alamat_pj" value="<?= $row->alamat_pj?>">
                                                    <div class="text-error" id="err_alamat_pj"></div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No HP / Telp Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="no_penanggung_jawab" id="u_no_penanggung_jawab" value="<?= $row->no_penanggung_jawab ?>">
                                                    <div class="text-error" id="err_no_penanggung_jawab"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Hub Keluarga <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" class="form-control input-sm" name="hub_keluarga" id="u_hub_keluarga" value="<?= $row->hub_keluarga ?>">
                                                    <div class="text-error" id="err_hub_keluarga"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                
                                                <div style="text-align: right;">
                                                    <button type="button" id="u_batal" class="btn btn-danger">
                                                        <i class="fa fa-rotate-left"></i> Batal</button>
                                                        <!-- <button type="button" id="update" class="btn btn-primary">
                                            Update <i class="fa fa-arrow-right"></i></button> -->
                                                        <button type="button" id="daftarbaru" class="btn btn-primary">
                                                        Update Data Pasien  <i class="fa fa-arrow-right" id='icondaftarbaru'></i></button>
                                                </div>
                                            </div>
                                        </fieldset>
                                </form>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div class="tab-pane registrasi" id="riwayatkunjunganrs">
                        <div class="row">
                            <div class="col-md-11">
                                <form action="#" method="GET" onsubmit="return false">
                                    <div class="input-group">
                                        <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getData(1)" placeholder="Search">
                                        <span class="input-group-addon">
                                            <span class="fa fa-search"></span>
                                        </span>
                                    </div>

                                </form>
                            </div>
                            
                            <div class="col-md-1">
                                <div class="input-group">
                                    <input type="hidden" name="param" id="param">
                                    <select class="form-control" name="limit" id="limit" onchange="getData(1)">
                                        <option value="5">5</option>
                                        <option value="10" selected>10</option>
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
                                <table class="table table-bordered table-striped">
                                    <thead >
                                        <tr>
                                            <th style="width: 40px">#</th>
                                            <th style="width: 80px">ID Daftar</th>
                                            <th style="width: 100px">Reg Unit</th>
                                            <th style="width: 80px">Layanan</th>
                                            <th>Poli / Ruang</th>
                                            <th>Dokter</th>
                                            <th>Tgl Lahir</th>
                                            <th>Alamat</th>
                                        </tr>
                                    </thead>
                                    <tbody id="data"></tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="8" id="pagination"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<div class="modal fade" id="form-reservasi" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Pilih Reservasi Rawat Jalan</h3>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td>JENIS LAYANAN</td>
                                    <td>ID DAFTAR</td>
                                    <td>REG UNIT</td>
                                    <td>TGL MASUK</td>
                                    <td>NAMA POLI</td>
                                    <td>DOKTER</td>
                                </tr>
                            </thead>
                            <tbody id="listreservasi"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                
            </div>
        </div>
    </div>
</div>
<!-- Modal List Rujukan -->
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
                                <tr>
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
                        <input type="hidden" name="jnsKontrol" id="jnsKontrol" value="2">
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
