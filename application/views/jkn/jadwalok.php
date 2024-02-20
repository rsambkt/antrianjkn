<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/plugins/sweetalert/sweetalert.css">
<script src="<?php echo base_url() ?>assets/plugins/sweetalert/sweetalert.min.js"></script>
<link rel="stylesheet" href="<?php echo base_url() ?>assets/jquery/css/jquery-ui.css">
<style>
    /*.modal-content {
        max-height: 600px;
    }*/
    @media only screen and (max-width: 1360px) {
        .modal-content {
            overflow-y: scroll;
            overflow-x: hidden;
            height: 600px;
            white-space: nowrap
        }
    }

    .modal-content {

        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 800px;
        white-space: nowrap
    }

    .control[readonly] {
        background: #3c8dbc;
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
    .dataTables_filter{
        text-align:right;
    }
    .dataTables_paginate{
        text-align:right;
    }
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    
    <div class="row">
        <div class="col-md-12">
        <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title"><?= $contentTitle ?></h3>
                </div>

                <div class="box-body">
					<div class="row">
						<div class="col-md-6">
						<button class="btn btn-primary" type="button" onclick="tambahJadwal()"><span class="fa fa-plus"></span>Tambah Jadwal</button>
						</div>
						<div class="col-md-3">
							<div class="input-group">
							<input type="text" name="tanggal" id="tanggal" class="form-control tanggal" onchange="getJadwalOk()" placeholder="Dari">
                                    <span class="input-group-addon statusjkn" id="u_status">
                                        <i class="fa fa-calendar" ></i>
                                    </span>
                                                    
                            </div>
							
						</div>
						<div class="col-md-3">
							<div class="input-group">
							<input type="text" name="akhir" id="akhir" class="form-control tanggal" onchange="getJadwalOk()" placeholder="Sampai">
                                    <span class="input-group-addon statusjkn" id="u_status">
                                        <i class="fa fa-calendar" ></i>
                                    </span>
                                                    
                            </div>
							
						</div>
					</div>
					<hr>

                    <div class="row">
						<div class="col-md-12">

						</div>
                        <div class="col-md-12">
						<table id="example1" class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nomr</th>
                                    <th>NoReg</th>
                                    <th>Kode Booking</th>
                                    <th>Nama Pasien</th>
                                    <th>Kode Poli</th>
                                    <th>Nama Poli</th>
                                    <th>Tanggal Operasi</th>
                                    <th>Jenis Tindakan</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>    
                            </thead>
                            <tbody id="datajadwalok">
                                
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section>
<div id="modaljadwal" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Jadwal OK</h4>
			</div>
			<div class="modal-body">
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
                                    <input type="text" name="caripasien" id="caripasien" class="form-control pull-right" placeholder="Cari Data Kunjungan">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                            </div>
						</div>
					</div>
					<hr>
					<div class="forminput">
						<form action="#" id="formjadwal" class='form-horizontal'>
							<input type="hidden" id="idx" name="idx">
							<input type="hidden" id="idx_pendaftaran" name="idx_pendaftaran">
							<!-- <input type="hidden" id="kodepoli" name="kodepoli"> -->
							<input type="hidden" id="nopeserta" name="nopeserta">
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Nomr Pasien</label>
								<div class="col-sm-10">
								<input type="text" class="form-control" id="nomr_pasien" name="nomr_pasien" readonly>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Nama Pasien</label>
								<div class="col-sm-10">
								<input type="text" class="form-control" id="nama_pasien" name="nama_pasien" readonly>
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Poliklinik Asal</label>
								<div class="col-sm-10">
									<select name="kodepoli" id="kodepoli" class="form-control">
										<option value="">Pilih poli</option>
										<?php 
										foreach ($poli as $p ) {
											?>
											<option value="<?= $p->kode_jkn?>"><?= $p->ruang ?></option>
											<?php
										}
										?>
									</select>
								<!-- <input type="text" class="form-control" id="namapoli" name="namapoli" readonly> -->
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Jenis Tindakan</label>
								<div class="col-sm-10">
								<input type="text" class="form-control" id="jenistindakan" name="jenistindakan">
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-2" for="email">Tanggal</label>
								<div class="col-sm-10">
								<input type="text" class="form-control tanggal" id="tanggaloperasi" name="tanggaloperasi">
								</div>
							</div>
						</form>
					</div>
					
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary btn-block" id="btnsimpanjadwal" onclick="simpanJadwalOk()"><span class="fa fa-save" id="iconsimpanjadwal"></span> Simpan</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
    
</script>
