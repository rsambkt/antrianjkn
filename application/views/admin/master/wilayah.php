<style type="text/css">
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

        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title"><button class="btn btn-primary" onclick='tambah()'><span class="fa fa-plus"></span> Tambah</button></h3>
                    <div class="box-tools">
                        
                    </div>
                </div>
                <div class="box-body table-responsive">
                    <div class="row">
                        <div class="col-md-11">
                            <form action="#" method="GET" onsubmit="return false">
                                <div class="input-group">
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getwilayah(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                                </div>
                                <input type="hidden" name="param" id="param">
                            </form>
                        </div>
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getwilayah(1)">
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
                                <thead class="bg-red">
                                    <tr>
                                        <th style="width: 40px">#</th>
                                        <th>Provinsi</th>
                                        <th>Kab Kota</th>
                                        <th>Kecamatan</th>
                                        <th>Desa</th>
                                        <th>Kode Pos</th>
                                        <th style="width: 150px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datawilayah"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="7" id="pagination"></td>
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
<!-- Modal -->
<div id="modal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Tambah wilayah</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Provinsi:</label>
                <div class="col-sm-10">
                <input type="hidden" id="wilayah_id" name="wilayah_id">
                <input type="text" class="form-control" id="provinsi" name="provinsi" placeholder="Masukkan wilayah">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Kab / Kota:</label>
                <div class="col-md-4">
                    <select name="kabkota" id="kabkota" class="form-control">
                        <option value="Pilih">Pilih</option>
                        <option value="Kota">Kota</option>
                        <option value="Kabupaten">Kabupaten</option>
                    </select>
                </div>
                <div class="col-sm-6">
                <input type="text" class="form-control" id="nama_kabkota" name="nama_kabkota" placeholder="Masukkan Nama Kab Kota">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Kecamatan:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="kecamatan" name="kecamatan" placeholder="Masukkan Kecamatan">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Desa:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="desa" name="desa" placeholder="Masukkan Desa/Nagari">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Kodepos:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="kode_pos" name="kode_pos" placeholder="Masukkan Kecamatan">
                </div>
            </div>
        </form> 
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary" id="btnsimpan" onclick="simpan()"><span class="fa fa-save" id="iconsimpan"></span> Simpan</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>