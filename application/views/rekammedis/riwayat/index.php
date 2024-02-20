<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">

        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Riwayat Kunjungan Pasien</h3>
                    <div class="box-tools">
                        
                    </div>
                </div>
                <div class="box-body table-responsive">
                    <div class="row">
                        <div class="col-md-4">
                            <form action="#" method="GET" onsubmit="return false">
                                <div class="input-group">
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getriwayat(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                                </div>

                            </form>
                        </div>
						<div class="col-md-2">
							<div class="input-group">
                                    <input type="text" name="tanggal" id="tanggal" class="form-control datepicker pull-right" onchange="getriwayat(1)" placeholder="Pilih Tanggal Layan">
                                    <span class="input-group-addon">
                                        <span class="fa fa-calendar"></span>
                                    </span>
                                </div>
						</div>
						<div class="col-md-2">
							<select name="jnslayanan" id="jnslayanan" class="form-control" onchange="getRuang();getriwayat(1)">
								<option value="">Pilih Jenis Layanan</option>
								<?php 
								foreach ($jnsLayanan as $j ) {
									?>
									<option value="<?= $j->idx ?>"><?= $j->jenislayanan ?></option>
									<?php
								}
								?>
							</select>
						</div>
						
						<div class="col-md-2">
							<select name="ruang" id="ruang" class="form-control" onchange="getriwayat(1)">
								<option value="">Pilih Ruangan</option>
							</select>
						</div>
                        <div class="col-md-1">
                            <div class="input-group">
                                <select name="param" id="param" class="form-control" onchange="getriwayat(1)">
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
                                <select class="form-control" name="limit" id="limit" onchange="getriwayat(1)">
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
                                        <th>Jenis Layanan</th>
                                        <th>NoMr</th>
                                        <th>Nama</th>
                                        <th>Jekel</th>
                                        <th>Pekerjaan</th>
                                        <th>No Telp</th>
                                        <th>TTL</th>
                                        <th>Alamat</th>
                                        <th>Cara Bayar</th>
                                        <th>Rujukan</th>
                                        <th>Poliklinik</th>
                                        <th>Dokter</th>
                                        <th>Tgl Kunjungan</th>
                                        <th style="width: 80px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datariwayat"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="9" id="pagination"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
