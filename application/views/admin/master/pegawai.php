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
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getpegawai(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                                </div>
                                <input type="hidden" name="param" id="param">
                            </form>
                        </div>
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getpegawai(1)">
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
                                        <th>NRP</th>
                                        <th>NIP</th>
                                        <th>Nama</th>
                                        <th>Jekel</th>
                                        <th>TTL</th>
                                        <th>Agama</th>
                                        <th>Alamat</th>
                                        <th>Telp</th>
                                        <th>Profesi</th>
                                        <th style="width: 150px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datapegawai"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" id="pagination"></td>
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
        <h4 class="modal-title">Tambah Pegawai</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">NIP:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="nip" name="nip" placeholder="Masukkan Nip">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Nama Pegawai:</label>
                <div class="col-sm-10">
                <input type="hidden" id="nrp" name="nrp">
                <input type="text" class="form-control" id="pgwNama" name="pgwNama" placeholder="Masukkan Nama Pegawai">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Jns Kelamin:</label>
                <div class="col-sm-10">
                    <select name="pgwJenkel" id="pgwJenkel" class="form-control">
                        <option value="">Pilih Jekel</option>
                        <option value="1">Laki-Laki</option>
                        <option value="0">Perempuan</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">TTL:</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="pgwTmpLahir" name="pgwTmpLahir" placeholder="Masukkan Tempat Lahir">
                </div>
                <div class="col-sm-5">
                    <input type="text" class="form-control datepicker" id="pgwTglLahir" name="pgwTglLahir" placeholder="Masukkan Tgl Lahir">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Agama:</label>
                <div class="col-sm-10">
                    <select name="pgwAgama" id="pgwAgama" class="form-control">
                    <option value="">Pilih Agama</option>
                    <?php
                    foreach ($agama as $row) {
                        ?>
                        <option value="<?= $row->agama ?>"><?= $row->agama ?></option>
                        <?php
                    }
                    ?>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Alamat:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="pgwAlmt" name="pgwAlmt" placeholder="Masukkan Alamat">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Telp:</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="pgwTelp" name="pgwTelp" placeholder="Masukkan Telp">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Profesi:</label>
                <div class="col-sm-10">
                <select name="profId" id="profId" class="form-control">
                    <?php 
                    foreach ($profesi as $row) {
                        ?>
                        <option value="<?= $row->idx ?>"><?= $row->profesi ?></option>
                        <?php
                    }
                    ?>
                </select>
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
