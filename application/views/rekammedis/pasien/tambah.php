<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-md-12" id="carijkn"> 
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Cari Pasien JKN</h3>
                    
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-6">
                            <form action="#" id="cari" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Parameter</label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
                                        <input type="hidden" name="sekarang" id="sekarang" value="<?= date('Y-m-d')?>">
                                        <input type="radio" name="parameter" id="parameter" value="nokartu"> NO Kartu    
                                        <input type="radio" name="parameter" id="parameter" value="nik" checked> Nik
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 col-sm-4 col-xs-12 control-label">Keyword</label>
                                    <div class="col-md-8 col-sm-8 col-xs-12">
										<?php //print_r($booking) ?>
                                        <div class="input-group input-group-sm">
                                        	<input type="text" name="keyword" id="keyword" class="form-control" value="<?= !empty($booking)?$booking->nik:""?>">
                                        	<input type="hidden" name="kodebooking" id="kodebooking" class="form-control" value="<?= !empty($booking)?$booking->kodebooking:""?>">
                                            <div class="input-group-btn">
                                                <button type="button" id="btnCari" class="btn btn-primary" onclick="cariPeserta()">
                                                    <i class="fa fa-search" id='iconCari'></i> Cari Peserta
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <div class="col-xs-12" id="formdaftar">
            <div class="box box-success">
                <!-- <div class="box-header with-border">
                    <h3 class="box-title">Data Pasien</h3>
                    
                </div> -->
                <div class="box-body">
                    <div class="row">
                        <!-- <div class="col-md-12">
                        <form action="#" id="tambahpasien" class="form-horizontal">
                        </form>
                        </div> -->
                        <div class="col-md-12" >
                            <form action="#" id="tambahpasien" class="form-horizontal">
                                <div class="row">
                                    
                                    <fieldset id="forminput">
                                        <div class='col-md-4' id="pesertaJkn" style="display:none">
                                            <!-- <div class="box">
                                                <div class="box-body box-profile"> -->
                                                    <div id="jekel"></div>
                                                    
                                                    <h3 class="profile-username text-center" id='namaPeserta'></h3>
                                                    <p class="text-muted text-center" id="noKartu"></p>
                                                    <table class="table">
                                                        <tbody>
                                                            <tr>
                                                                <td><b>NIK</b></td>
                                                                <td id="nikPeserta"></td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td><b>Nama</b></td>
                                                                <td id='nama'>-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>No Telp</b></td>
                                                                <td id="noTelp">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Tgl Lahir</b></td>
                                                                <td id="tglLahir"></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Tgl Cetak</b></td>
                                                                <td id="tglCetak"></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>TAT</b></td>
                                                                <td id="tat">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>TMT</b></td>
                                                                <td  id="tmt"></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Status Peserta</b></td>
                                                                <td id="statusPeserta">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Provider Umum</b></td>
                                                                <td id="provUmum">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Jenis Peserta</b></td>
                                                                <td id="jenisPeserta">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Hak Kelas</b></td>
                                                                <td id="hakKelas">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Umur</b></td>
                                                                <td id="umur">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>No SKTM</b></td>
                                                                <td id="nosktm">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Dinsos</b></td>
                                                                <td id="dinsos">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Prolanis PRB</b></td>
                                                                <td id="prolanisprb">-</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td colspan="2"><b>COB</b></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>No Asuransi</b></td>
                                                                <td id="noasuransi">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Nama Asuransi</b></td>
                                                                <td id="nmasuransi">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>tgl TMT</b></td>
                                                                <td id="cobtmt">-</td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Tgl TAT</b></td>
                                                                <td id="cobtat">-</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                <!-- </div>
                                            </div> -->
                                        </div>
                                        <div class="col-md-8">
                                        <fieldset>
                                            <legend>Biodata Pasien</legend>
											<div id="message"></div>
                                            <div class="form-group">
                                                <label class="col-md-3 col-sm-4 col-xs-12 control-label">No MR [<em>Kode Auto Generate</em>]</label>
                                                <div class="col-md-9 col-sm-8 col-xs-12">
                                                    <div class="input-group input-group-sm">
                                                        <input type="hidden" name="idx" id="u_idx" value="">
                                                        <input type="hidden" name="kodebooking" id="kodebooking" value="">
                                                        <input type="text" class="form-control input-sm" name="nomr" id="u_nomr" value="<?= !empty($booking)?$booking->norm:""?>" placeholder="Jika Pasien Lama Masukkan No MR">
                                                        <div class="input-group-btn">
                                                            <button type="button" id="btnCari" class="btn btn-primary" onclick="cariPasien()">
                                                                <i class="fa fa-search" id='iconCari'></i> Cari Pasien
                                                            </button>
                                                            <button type="button" id="btnTambah" class="btn btn-success" onclick="pasienBaru()">
                                                                <i class="fa fa-plus" id='iconTambah'></i> Pasien Baru
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="form-group">
                                                <label class="control-label col-sm-3" for="email">No MR [<em>Kode Auto Generate</em>]</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <input type="hidden" name="idx" id="u_idx" value="">
                                                        <input type="text" class="form-control input-sm" name="nomr" id="u_nomr" value="" placeholder="Jika Pasien Lama Masukkan No MR">
                                                        <span class="input-group-addon statusjkn" id="u_status">
                                                        <a id="btnCari" onclick="cariPasien()"><i class="fa fa-search" id="iconCari"></i> Cari</a>
                                                        </span>
                                                    </div>
                                                    
                                                </div>
                                            </div> -->
                                            <div id="biodatapasien" style="display:none;">
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No KTP (NIK / Passport)</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control input-sm" name="nik" id="u_nik" value="<?= !empty($booking)?$booking->nik:""?>">
                                                        <input type="hidden" name="sekarang" id="u_sekarang" value="<?= date('Y-m-d') ?>">
                                                        <input type="hidden" name="booking" id="u_booking" value="">
                                                        <input type="hidden" name="tgldaftar" id="u_tgldaftar" value="<?= date('Y-m-d')?>">
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
                                                    <input name="no_bpjs" id="u_no_bpjs" type="text" class="form-control input-sm" value="<?= !empty($booking)?$booking->nomorkartu:""?>">
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
                                                    <input name="id_jenis_peserta" id="u_id_jenis_peserta" type="hidden" class="form-control input-sm" value="">
                                                    <input name="jenis_peserta" id="u_jenis_peserta" type="text" class="form-control input-sm" value="" readonly>

                                                    
                                                </div>
                                                </div>
                                                <!--input type="text" class="form-control input-sm" name="no_bpjs" id="u_no_bpjs" value="" onkeydown="enter_bpjs(event)"-->
                                            </div>
                                            <div class="form-group bpjs">
                                                <label class="control-label col-sm-3" >PPK (<em>Jika Pasien Peserta BPJS Kesehatan</em>)</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <input name="kodeppk" id="u_kodeppk" type="hidden" class="form-control input-sm" value="">
                                                        <input name="namappk" id="u_namappk" type="text" class="form-control input-sm" value="" readonly>

                                                        
                                                    </div>
                                                </div>
                                                <!--input type="text" class="form-control input-sm" name="no_bpjs" id="u_no_bpjs" value="" onkeydown="enter_bpjs(event)"-->
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3" >Nama Pasien <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="nama" id="u_nama" value="<?= !empty($booking)&&$booking->jkn==1?$booking->nomorkartu:""?>" >
                                                <div class="text-error" id="err_nama"></div>    
                                            </div>
                                            </div>
                                            <div class="form-group">
                                                <label  class="control-label col-sm-3" >Tempat Lahir / DOB <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input type="text" class="form-control input-sm" name="tempat_lahir" id="u_tempat_lahir" value="" >
                                                    <div class="input-group-btn" style="width: 30%">
                                                        <input type="text" class="form-control tanggal input-sm" name="tgl_lahir" id="u_tgl_lahir" placeholder="__/__/____" value="">
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
                                                        <!-- <option value="4" >Tidak Mengisi</option> -->
                                                        <option value="0" >Tidak Diketahui</option>
                                                        <option value="1" >Laki-Laki</option>
                                                        <option value="2" >Perempuan</option>
                                                        <option value="3" >Tidak Dapat Ditentukan</option>
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
                                                        <option value="<?= $a->idx ?>"><?= $a->agama ?></option>
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
                                                        <option value="<?= $p->id_tk_pddkn ?>" <?= (!empty($id_tk_pddkn) ? ($id_tk_pddkn == $p->id_tk_pddkn ? "selected" : ''):'') ?>><?= $p->nama_tk_pddkn ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <?php if(empty($id_pekerjaan)) $id_pekerjaan="";?>
                                                <label class="control-label col-sm-3">Pekerjaan</label>
                                                <div class="<?php if($id_pekerjaan==5) echo 'col-md-4'; else echo "col-md-8"; ?>"  id="u_divpekerjaan">
                                                    
                                                    <select name="pekerjaan" id="u_pekerjaan" class="form-control input-sm" >
                                                        <?php 
                                                        foreach ($pekerjaan as $p ) {
                                                            ?>
                                                            <option value="<?= $p->pekerjaan_id?>" <?= (!empty($id_pekerjaan) ? ($id_pekerjaan == $p->pekerjaan_id ? "selected" : ''):'') ?>><?= $p->pekerjaan_nama ?></option>
                                                            <?php
                                                        }
                                                        ?>
                                                    </select>
                                                </div>
                                                <div id="u_divlainnya" class="col-md-4" style="<?php if($id_pekerjaan==5) echo 'display: block;'; else echo "display: none;"; ?>">
                                                    <input type="text" class="form-control input-sm" name="pekerjaanlain" id="u_pekerjaanlain" value="">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Status</label>
                                                <div class="col-sm-9">
                                                <select name="status_kawin" id="u_status_kawin" class="form-control input-sm" >
                                                    <option value="">Pilih</option>
                                                    <?php foreach ($status as $s) : ?>
                                                        <option value="<?= $s->Id ?>"><?= $s->status ?></option>
                                                    <?php endforeach; ?>
                                                </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Etnis</label>
                                                <div class="col-sm-9">
                                                <select name="suku" id="u_suku" class="form-control input-sm select2" >
                                                    <option value="">Pilih</option>
                                                    <?php 
                                                    foreach ($suku as $s ) {
                                                        ?>
                                                        <option value="<?= $s->idx ?>"><?= $s->nama_suku?></option>
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
                                                        <option value="<?= $b->idx ?>"><?= $b->bahasa ?></option>
                                                        <?php
                                                    }
                                                    ?>
                                                </select>
                                                <span class="input-group-addon"><input type="checkbox" name="keterbatasanbahasa" id="u_keterbatasanbahasa">Keterbatasan Bahasa</span>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No telp Rumah </label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="no_telpon" id="u_no_telpon" value="" >
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No HP <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="no_hp" id="u_no_hp" value="" >
                                                <div class="text-error" id="err_no_hp"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Nama Ibu Kandung <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <input type="text" class="form-control input-sm" name="nama_ibu_kandung" id="u_nama_ibu_kandung" value="" >
                                                <div class="text-error" id="err_nama_ibu_kandung"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Kewarganegaraan <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                <select name="kewarganegaraan" id="u_kewarganegaraan" class="form-control input-sm" onchange="pilihKWN()">
                                                    <option value="">-- Pilih --</option>
                                                    <option value="WNA">WNA</option>
                                                    <option value="WNI">WNI</option>
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
                                                            <option value="<?= $n->alpha3 ?>"><?= $n->nama_negara ?></option>
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
                                                                <option value="<?= $n->kode ?>"><?= $n->nama ?></option>
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
                                                        if(!empty($kab)){
                                                            foreach ($kab as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" ><?= $k->nama ?></option>
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
                                                        if(!empty($kec)){
                                                            foreach ($kec as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($id_kecamatan==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
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
                                                        if(!empty($kel)){
                                                            foreach ($kel as $k ) {
                                                                ?>
                                                                <option value="<?= $k->kode ?>" <?= ($id_kelurahan==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
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
                                                    <input type="text" name="alamat" id="u_alamat" class="form-control input-sm" placeholder="Jalan dan nomor rumah" value="<?= (!empty($alamat) ? $alamat: "")?>">
                                                    <div class="text-error" id="err_alamat"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" name="rt" id="u_rt" placeholder="RT" value="<?= (!empty($rt) ? $rt: "")?>">
                                                    <div class="text-error" id="err_rt"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" name="rw" id="u_rw" placeholder="RW" value="<?= (!empty($rw) ? $rw: "")?>">
                                                    <div class="text-error" id="err_rw"></div>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control input-sm" id="u_kodepos" placeholder="Kode Pos" value="<?= (!empty($idx) ? $kodepos: "")?>">
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
                                                                <option value="<?= $n->kode ?>"><?= $n->nama ?></option>
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
                                                                <option value="<?= $k->kode ?>" <?= ($id_kab_kota_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
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
                                                                <option value="<?= $k->kode ?>" <?= ($id_kecamatan_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
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
                                                                <option value="<?= $k->kode ?>" <?= ($id_kelurahan_domisili==$k->kode) ? "selected" : ""; ?>><?= $k->nama ?></option>
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
                                                    <input type="text" name="alamat_domisili" id="u_alamat_domisili" class="form-control input-sm" placeholder="Jalan dan nomor rumah" value="<?= (!empty($idx) ? $alamat_domisili: "")?>">
                                                    <div class="text-error" id="err_alamat_domisili"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" id="u_rt_domisili" name="rt_domisili" placeholder="RT" value="<?= (!empty($idx) ? $rt_domisili: "")?>">
                                                    <div class="text-error" id="err_rt_domisili"></div>
                                                </div>
                                                <div class="col-sm-2">
                                                    <input type="text" class="form-control input-sm" id="u_rw_domisili" name="rw_domisili" placeholder="RW" value="<?= (!empty($idx) ? $rw_domisili: "")?>">
                                                    <div class="text-error" id="err_rw_domisili"></div>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" class="form-control input-sm" id="u_kodepos_domisili" placeholder="Kode Pos" value="<?= (!empty($idx) ? $kodepos_domisili: "")?>">
                                                    <div class="text-error" id="err_kodepos_domisili"></div>
                                                </div>
                                            </div>

                                            <legend>Penanggung Jawab</legend>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="penanggung_jawab" id="u_penanggung_jawab" value="">
                                                    <div class="text-error" id="err_penanggung_jawab"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Umur <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" class="form-control input-sm" name="umur_pj" id="u_umur_pj" value="">
                                                    <div class="text-error" id="err_umur_pj"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Pekerjaan Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="pekerjaan_pj" id="u_pekerjaan_pj" value="">
                                                    <div class="text-error" id="err_pekerjaan_pj"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Alamat Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="alamat_pj" id="u_alamat_pj" value="">
                                                    <div class="text-error" id="err_alamat_pj"></div>
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">No HP / Telp Penanggung Jawab <span style="color: red"> * </span></label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control input-sm" name="no_penanggung_jawab" id="u_no_penanggung_jawab" value="">
                                                    <div class="text-error" id="err_no_penanggung_jawab"></div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-sm-3">Hub Keluarga <span style="color: red"> * </span></label>
                                                <div class="col-sm-3">
                                                    <input type="text" class="form-control input-sm" name="hub_keluarga" id="u_hub_keluarga" value="">
                                                    <div class="text-error" id="err_hub_keluarga"></div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-12">
                                                
                                                <div style="text-align: right;">
                                                    <button type="button" id="u_batal" class="btn btn-danger">
                                                        <i class="fa fa-rotate-left"></i> Batal</button>
                                                    <button type="button" id="daftarbaru" class="btn btn-primary">
                                                        Selanjutnya  <i class="fa fa-arrow-right" id='icondaftarbaru'></i></button>
                                                </div>
                                            </div>
                                            </div>
                                        </fieldset>
                                            
                                        </div>
                                    </fieldset>
                                    
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</section>
