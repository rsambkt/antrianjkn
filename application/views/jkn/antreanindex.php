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
    <h1>List Antrian Pasien</h1>
</section>

<section class="content container-fluid">
    
    <div class="row">
        <div class="col-md-12">
        	<div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">List Antrian JKN</h3>
                </div>

                <div class="box-body">
					<div class="row">
						<div class="col-md-8">
						&nbsp;
						</div>
						<div class="col-md-4">
							<div class="input-group">
							<input type="text" name="tanggal" id="tanggal" class="form-control tanggal" onchange="getListAntrian()">
                                    <span class="input-group-addon statusjkn" id="u_status">
                                        <i class="fa fa-calendar" ></i>
                                    </span>
                                                    
                            </div>
							
						</div>
					</div>
					<hr>
					<table id="example1" class="table table-bordered table-striped table-hover">
						<thead>
							<tr>
								<th>No</th>
								<th>Tanggal</th>
								<th>Jenis Kunjungan</th>
								<th>No referensi</th>
								<th>Kode Booking</th>
								<th>NoMr</th>
								<th>NIK</th>
								<th>Noka</th>
								<th>No HP</th>
								<th>Poli</th>
								<th>Jam Praktek</th>
								<th>Sumber Data</th>
								<th>Antrian</th>
								<th>Status</th>
								<!-- <th>Action</th> -->
							</tr>    
						</thead>
						<tbody id="vdataantrian">
							
						</tbody>
					</table>
				</div>
            </div>
        </div>
	</div>
</section>
<div id="tasklist" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Task List</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table">
                        <tr>
                            <td>Task</td>
                            <td>Waktu Rs</td>
                            <td>Waktu Server</td>
                        </tr>
                        <tbody id="listtask"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>

  </div>
</div>

<script src="<?php echo base_url() ?>plugins/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?php echo base_url() ?>plugins/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<script>
    $(document).ready(function() {
        // getPoli();
        $('#example1').DataTable();
    });
</script>
