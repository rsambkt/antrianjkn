<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-md-4">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Kamar</h3>
                    <div class="box-tools"></div>
                </div>
                <div class="box-body table-responsive">
                    <table class="table">
                        <tr>
                            <td>Bangsal</td>
                            <td><?= $kamar->nama_ruang ?></td>
                        </tr>
                        <tr>
                            <td>Kelas</td>
                            <td><?= $kamar->kelas_kamar ?></td>
                        </tr>
                        <tr>
                            <td>Kamar</td>
                            <td><?= $kamar->nama_kamar ?></td>
                        </tr>
                        <tr>
                            <td>Penempatan</td>
                            <td><?= ($kamar->jekel==1 ? "Pria" : ($kamar->jekel==2 ? "Wanita" : "Pria & Wanita")) ?></td>
                        </tr>
                        
                    </table>
                    <?php if($kamar->bpjsimport==0){?>
                        <button class="btn btn-danger btn-block" type="button" onclick="simpanAplicare(<?= $kamar->id_kamar ?>)">Simpan Applicare</button>
                    <?php } else{?>
                        <button class="btn btn-danger btn-block" type="button" onclick="updateAplicare(<?= $kamar->id_kamar ?>)">Update Applicare</button>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="col-xs-8">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title"><button class="btn btn-primary" onclick='tambah()'><span class="fa fa-plus"></span> Tambah</button></h3>
                    <div class="box-tools">
                        
                    </div>
                </div>
                <div class="box-body table-responsive">
                    
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered table-striped">
                                <thead class="bg-red">
                                    <tr>
                                        <th style="width: 40px">#</th>
                                        <th>Nama Tempat Tidur</th>
                                        <th>Status</th>
                                        <th>Terisi</th>
                                        <th>Publish</th>
                                        <th style="width: 170px; text-align:right;"  rowspan="2">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datatt"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5" id="pagination"></td>
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
        <h4 class="modal-title">Tambah Tempat Tidur</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
            
            <div class="form-group">
                <label class="control-label col-sm-3" for="email">Nama Tempat Tidur:</label>
                <div class="col-sm-9">
                <input type="hidden" name="id_kamar" id="id_kamar" value="<?= $kamar->id_kamar?>">
                    <input type="hidden" name="idtt" id="idtt" value="">
                    <input type="text" name="namatt" id="namatt" class="form-control">
                </div>
            </div>
            
            <div class="form-group">
                <label class="control-label col-sm-3" for="email">&nbsp;</label>
                <div class="col-sm-9">
                <input type="checkbox" id="statustt" name="statustt" value="1">Aktif &nbsp;
                <input type="checkbox" id="publish" name="publish" value="1">Publish
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