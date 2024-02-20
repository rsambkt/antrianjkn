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
                <ul class="nav nav-pills">
                    <li class="active"><a data-toggle="pill" href="#home">Ketersediaan Tempat Tidur Rumah Sakit</a></li>
                    <li><a data-toggle="pill" href="#menu1" onclick="showAplicare(1)">Aplicare</a></li>
                </ul>

                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active">
                        <div class="row">
                            <div class="col-md-11">
                                <form action="#" method="GET" onsubmit="return false">
                                    <div class="input-group">
                                        <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getKamar(1)" placeholder="Search">
                                        <span class="input-group-addon">
                                            <span class="fa fa-search"></span>
                                        </span>
                                    </div>
                                    <input type="hidden" name="param" id="param">
                                    <input type="hidden" name="start" id="start" value="1">
                                </form>
                            </div>
                            <div class="col-md-1">
                                <div class="input-group">
                                    <select class="form-control" name="limit" id="limit" onchange="getKamar(1)">
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
                                            <th style="width: 40px" rowspan="2">#</th>
                                            <th rowspan="2">Nama Ruang</th>
                                            <th rowspan="2">Nama kamar</th>
                                            <th rowspan="2">Kelas Layanan</th>
                                            <th rowspan="2">Penempatan</th>
                                            <th colspan="3">Keadaan Tempat Tidur</th>
                                            <th colspan="3">Status Tempat Tidur</th>
                                            <th rowspan="2">Total TT</th>
                                            <th style="width: 320px; text-align:right;"  rowspan="2">#</th>
                                        </tr>
                                        <tr>
                                            <td>Aktif</td>
                                            <td>Non Aktif</td>
                                            <td>Rusak</td>
                                            <td>Kosong</td>
                                            <td>Terisi Pria</td>
                                            <td>Terisi Wanita</td>
                                        </tr>
                                    </thead>
                                    <tbody id="datakamar"></tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="3" id="pagination"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        <div class="row">
                            <div class="col-md-11">
                                &nbsp;
                                <input type="hidden" name="startapp" id="startapp" value="1">
                            </div>
                            <div class="col-md-1">
                                <div class="input-group">
                                    <select class="form-control" name="limitapp" id="limitapp" onchange="showAplicare(1)">
                                        <option value="5">5</option>
                                        <option value="10" >10</option>
                                        <option value="20">20</option>
                                        <option value="30" selected>30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <table class="table">
                            <thead class="bg-red">
                            <tr>
                                <td rowspan="2">No</td>
                                <td rowspan="2">Kelas</td>
                                <td rowspan="2">Ruang</td>
                                <td colspan="3">Tersedia</td>
                                <td rowspan="2">Kapasitas</td>
                                <td rowspan="2" style="width:180px">#</td>
                            </tr>
                            <tr>
                                <td>Pria</td>
                                <td>Wanita</td>
                                <td>Pria & Wanita</td>
                            </tr>
                            </thead>
                            
                            <tbody id="data-aplicare"></tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="9" id="paginationapp"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div id="menu2" class="tab-pane fade">
                        <h3>Menu 2</h3>
                        <p>Some content in menu 2.</p>
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
        <h4 class="modal-title">Tambah Kamar</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Bangsal:</label>
                <div class="col-sm-10">
                    <input type="hidden" name="id_kamar" id="id_kamar">
                    <select name="id_ruang" id="id_ruang" class="form-control">
                        <?php 
                        foreach ($bangsal as $b ) {
                            ?>
                            <option value="<?= $b->idx ?>"><?= $b->ruang?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Kelas:</label>
                <div class="col-sm-10">
                    <select name="kelas_id" id="kelas_id" class="form-control">
                        <?php 
                        foreach ($kelas as $k) {
                            ?>
                            <option value="<?= $k->idx ?>"><?= $k->kelas_kamar ?></option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Nama Kamar:</label>
                <div class="col-sm-10">
                    <input type="text" name="nama_kamar" id="nama_kamar" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Penempatan:</label>
                <div class="col-sm-10">
                    <select name="jekel" id="jekel" class="form-control">
                        <option value="3">Pria & Wanita</option>
                        <option value="1">Pria</option>
                        <option value="2">Wanita</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">&nbsp;</label>
                <div class="col-sm-10">
                <input type="checkbox" id="status_kamar" name="status_kamar" value="1">Aktif
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