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
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getrujukan(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                                </div>
                                <input type="hidden" name="param" id="param">
                            </form>
                        </div>
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getrujukan(1)">
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
                                        <th>Jenis Layanan</th>
                                        <th>Kode JKN</th>
                                        <th>Status</th>
                                        <th style="width: 150px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datarujukan"></tbody>
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
        <h4 class="modal-title">Tambah Rujukan</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
            <div class="form-group">
                <label class="control-label col-sm-3" for="email">Rujukan : </label>
                <div class="col-sm-9">
                <input type="hidden" id="idx" name="idx">
                <input type="text" class="form-control" id="rujukan" name="rujukan" placeholder="Masukkan Rujukan">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-3" for="email">Faskes <em>(jkn)</em> : </label>
                <div class="col-sm-9">
                    <select name="faskes" id="faskes" class="form-control">
                        <option value="">Pilih Jenis faskes</option>
                        <option value="Rujukan Manual">Rujukan Manual</option>
                        <option value="Faskes Tingkat 1">Faskes Tingkat 1</option>
                        <option value="Faskes Tingkat 2">Faskes Tingkat 2</option>
                        <option value="Tidak Diketahui">Tidak Diketahui</option>
                    </select>
                
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-3" for="email">&nbsp;</label>
                <div class="col-sm-9">
                <input type="checkbox" id="aktif" name="aktif" value="1">Aktif
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