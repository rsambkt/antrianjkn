<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
<div class="row">
			<div class="col-md-12">
			<div class="callout callout-info">Selamat Datang Di Poliklinik <?= getLokasi() ?></div>
			</div>
		</div>
    <div class="nav-tabs-custom">
		
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-wheelchair"></span> List Pasien Rawat Jalan</a></li>
            <li><a href="#tab_2" data-toggle="tab" onclick="getPermintaan()"><span class="fa fa-stethoscope"></span> Penerimaan Pasien Konsul</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
                <div class="row">
                    <div class="col-md-7">
                        <form action="#" method="GET" onsubmit="return false">
                            <div class="input-group">
                                <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getkunjungan(1)" placeholder="Search">
                                <span class="input-group-addon">
                                    <span class="fa fa-search"></span>
                                </span>
                            </div>

                        </form>
                    </div>
                    <div class="col-md-2">
                        <div class="input-group">
                            <select name="param" id="param" class="form-control" onchange="getkunjungan(1)">
                                <option value="">Pilih Parameter</option>
                                <option value="nomr_pasien">Nomr</option>
                                <option value="nik">NIK</option>
                                <option value="nobpjs">No BPJS</option>
                                <option value="nama_pasien">Nama</option>
                                <option value="alamat">Alamat</option>
                            </select>
                        </div>
                    </div>
					<div class="col-md-2">
					<div class="input-group">
                                <input type="text" name="tgl_kunjungan" id="tgl_kunjungan" class="form-control pull-right datepicker" onchange="getkunjungan(1)" placeholder="Tanggal Masuk" value="<?= date('Y-m-d') ?>">
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
					</div>
                    <div class="col-md-1">
                        <div class="input-group">
                            <select class="form-control" name="limit" id="limit" onchange="getkunjungan(1)">
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
                                    <th>ID Daftar</th>
                                    <th>Reg Unit</th>
                                    <th>Identitas<br>Pasien</th>
                                    <th>Jenis Kelamin</th>
                                    <th>TTL</th>
                                    <th>Cara Bayar</th>
                                    <th>Dokter</th>
                                    <th>Tgl Daftar</th>
                                    <th>Status Pasien</th>
                                    <th style="width: 80px; text-align:right;">#</th>
                                </tr>
                            </thead>
                            <tbody id="datakunjungan"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="9" id="pageminta"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="tab_2">
                <div class="row">
                    <div class="col-md-9">
                        <form action="#" method="GET" onsubmit="return false">
                            <div class="input-group">
                                <input type="text" name="qpermintaan" id="qpermintaan" class="form-control pull-right" onkeydown="getPermintaan(1)" placeholder="Search">
                                <span class="input-group-addon">
                                    <span class="fa fa-search"></span>
                                </span>
                            </div>

                        </form>
                    </div>
                    <div class="col-md-2">
                        <div class="input-group">
                            <select name="parampermintaan" id="parampermintaan" class="form-control" onchange="getPermintaan(1)">
                                <option value="">Pilih Parameter</option>
                                <option value="nomr_pasien">Nomr</option>
                                <option value="nik">NIK</option>
                                <option value="nobpjs">No BPJS</option>
                                <option value="nama_pasien">Nama</option>
                                <option value="alamat">Alamat</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="input-group">
                            <select class="form-control" name="limitpermintaan" id="limitpermintaan" onchange="getPermintaan(1)">
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
                                    <th>ID Daftar</th>
                                    <th>Reg Unit</th>
                                    <th>Identitas<br>Pasien</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Tgl Lahir</th>
                                    <th>Asal Ruangan</th>
                                    <th>Alasan</th>
                                    <th>Status Pasien</th>
                                    <th style="width: 80px; text-align:right;">#</th>
                                </tr>
                            </thead>
                            <tbody id="datapermintaan"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="10" id="pagination"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</section>

<div class="modal fade" id="formaprove" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog modal-lg" style="overflow-y: initial !important">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h3 class="modal-title" id="headRujukan">Persetujuan Pasien Masuk</h3>
            </div>
            <div class="modal-body">
                <div id="loading"></div>
                <div id="formlistrujukan">
                    <!-- <form class="form-horizontal"> -->
                        <div id="tblPopup_Rujukan_wrapper">
                            
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered" id="tblPopup_Rujukan" style="font-size: small; width : 100%" role="grid" aria-describedby="tblPopup_Rujukan_info" width="100%" cellpadding="0">
                                        
                                        <tbody>
                                            <tr>
                                                <td colspan="2"><h3>Data Permintaan</h3></td>
                                            </tr>
                                            <tr role="row">
                                                <td style="width:100px;">ID DAFTAR</td>
                                                <td id="v-id_daftar"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>REG UNIT</td>
                                                <td id="v-reg_unit"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>NO RUJUKAN INTERNAL</td>
                                                <td id="v-rujukan"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>NOMR</td>
                                                <td id="v-nomr_pasien"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>NAMA PASIEN</td>
                                                <td id="v-nama_pasien"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>RUANG ASAL</td>
                                                <td id="v-ruangasal"></th>
                                            </tr>
                                            
                                            <tr role="row">
                                                <td>RUANG PENERIMA</td>
                                                <td id="v-ruangpenerima"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>DOKTER PENGIRIM</td>
                                                <td id="v-dokterpengirim"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>DOKTER PENERIMA</td>
                                                <td id="v-dokterpenerima"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>ALASAN </td>
                                                <td id="v-alasankonsul"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>DIAGNOSA KERJA </td>
                                                <td id="v-diagnosakerja"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>KETERANGAN KLINIK </td>
                                                <td id="v-keteranganklinik"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>CARA AYAR </td>
                                                <td id="v-carabayar"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>&nbsp;</td>
                                                <td id="v-cito"></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-12">
                                    <form class="form-horizontal" id="form" action="#">
                                        <input type="hidden" id="idx" name="idx" value="">
                                        <input type="hidden" id="idx_pendaftaran" name="idx_pendaftaran" value="">
                                        <input type="hidden" id="id_daftar" name="id_daftar" value="">
                                        <input type="hidden" id="reg_unit" name="reg_unit" value="">
                                        <input type="hidden" id="nomr" name="nomr" value="">
                                        <input type="hidden" id="nama_pasien" name="nama_pasien" value="">
                                        <input type="hidden" id="idruangasal" name="idruangasal" value="">
                                        <input type="hidden" id="ruangasal" name="ruangasal" value="">
                                        <input type="hidden" id="dokterPengirim" name="dokterPengirim" value="">
                                        <input type="hidden" id="namaDokterPengirim" name="namaDokterPengirim" value="">
                                        <input type="hidden" id="kode_subspesialis_tujuan" name="kode_subspesialis_tujuan" value="">
                                        <input type="hidden" id="idruangtujuan" name="idruangtujuan" value="">
                                        <input type="hidden" id="ruangtujuan" name="ruangtujuan" value="">
                                        <input type="hidden" id="kodedokterjkn" name="kodedokterjkn" value="">
                                        <input type="hidden" id="doktertujuan" name="doktertujuan" value="">
                                        <input type="hidden" id="namadoktertujuan" name="namadoktertujuan" value="">
                                        <input type="hidden" id="diagnosakerja" name="diagnosakerja" value="">
                                        <input type="hidden" id="keteranganklinik" name="keteranganklinik" value="">
                                        <input type="hidden" id="alasankonsul" name="alasankonsul" value="">
                                        <input type="hidden" id="id_cara_bayar" name="id_cara_bayar" value="">
                                        <input type="hidden" id="cara_bayar" name="cara_bayar" value="">
                                        <input type="hidden" id="cito" name="cito" value="">
                                        <input type="hidden" id="tgl_lahir" name="tgl_lahir" value="">
                                        <input type="hidden" id="jns_kelamin" name="jns_kelamin" value="">
                                        <input type="hidden" id="no_rujuk" name="no_rujuk" value="">
                                        
                                        <div class="form-group">
                                            <div class="col-sm-12">
                                            <button type="button" class="btn btn-primary" id="btnSimpan" onclick="terimaPermintaan()"><span class="fa fa-save"></span> Terima Pasien</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                    <!-- </form> -->
                </div>
            </div>
        </div>
    </div>
</div>
