<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab"><span class="fa fa-bed"></span> List Pasien Rawat Inap</a></li>
            <li><a href="#tab_2" data-toggle="tab" onclick="getPermintaan()"><span class="fa fa-exchange"></span> Penerimaan Pasien Pindah</a></li>
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
						<select name="statuspasien" id="statuspasien" class="form-control">
							<option value="">Pilih Status</option>
							<option value="1">Aktif</option>
							<option value="2">Permintaan Pindah</option>
							<option value="3">Pindah</option>
							<option value="4">Pulang</option>
						</select>
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
                                    <th>Kamar</th>
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
                                <div class="col-sm-5">
                                    <table class="table table-striped table-bordered" id="tblPopup_Rujukan" style="font-size: small; width : 100%" role="grid" aria-describedby="tblPopup_Rujukan_info" width="100%" cellpadding="0">
                                        
                                        <tbody>
                                            <tr>
                                                <td colspan="2"><h3>Data Permintaan</h3></td>
                                            </tr>
                                            <tr role="row">
                                                <td>ID DAFTAR</td>
                                                <td id="v-id_daftar"></th>
                                            </tr>
                                            <tr role="row">
                                                <td>REG UNIT</td>
                                                <td id="v-reg_unit"></th>
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
                                                <td>KELAS LAYANAN</td>
                                                <td id="v-kelas"></th>
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
                                                <td>ALASAN PINDAH</td>
                                                <td id="v-alasanpindah"></th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-7">
                                    <form class="form-horizontal" id="form" action="#">
                                        <input type="hidden" id="idx" name="idx" value="">
                                        <input type="hidden" id="logidx" name="logidx" value="">
                                        <input type="hidden" id="id_daftar" name="id_daftar" value="">
                                        <input type="hidden" id="reg_unit" name="reg_unit" value="">
                                        <input type="hidden" id="nomr" name="nomr" value="">
                                        <input type="hidden" id="nama_pasien" name="nama_pasien" value="">
                                        <input type="hidden" id="idruangasal" name="idruangasal" value="">
                                        <input type="hidden" id="ruanasal" name="ruangasal" value="">
                                        <input type="hidden" id="tgl_lahir" name="tgl_lahir" value="">
                                        <input type="hidden" id="jns_kelamin" name="jns_kelamin" value="">
                                        <div class="form-group">
                                            <label class="control-label col-sm-3" for="email">Kelas:</label>
                                            <div class="col-sm-9">
                                            <select name="idkelas" id="idkelas" class="form-control" onchange="getKamar()">
                                                <option value="">Pilih Kelas</option>
                                                <?php 
                                                foreach ($kelas as $k ) {
                                                    ?>
                                                    <option value="<?= $k->idx ?>"><?= $k->kelas_kamar ?></option>
                                                    <?php
                                                }
                                                ?>
                                                </select>
                                            <span class="error" id="err_kelas"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3" for="email">Kamar:</label>
                                            <div class="col-sm-9">
                                            <select name="idkamar" id="idkamar" class="form-control" onchange="getTT()">
                                                <option value="">Pilih Kamar</option>
                                            </select>
                                            <span class="error" id="err_kamar"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3" for="pwd">Tempat Tidur:</label>
                                            <div class="col-sm-9">
                                                <select name="id_tt" id="id_tt" class="form-control">
                                                    <option value="">Pilih Tempat Tidur</option>
                                                </select>
                                                <span class="error" id="err_tt"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-offset-3 col-sm-9">
                                            <button type="button" class="btn btn-primary" onclick="terimaPermintaan()">Terima Pasien</button>
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
