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
                        <div class="col-md-9">
                            <form action="#" method="GET" onsubmit="return false">
                                <div class="input-group">
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getruang(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <!-- <span class="fa fa-search"></span> -->
										<input type="checkbox" name="sr" id="sr" value='1' onclick="getruang(1)"> Aktif
                                    </span>
                                </div>
                                <input type="hidden" name="param" id="param">
                            </form>
                        </div>
						<div class="col-md-2">
							<select name="jnslayanan" id="jnslayanan" class="form-control" onchange="getruang(1)">
								<option value="">Pilih Jenis  Layan</option>
								<?php 
								foreach ($jnslayanan as $j) {
									?>
									<option value="<?= $j->idx ?>"><?= $j->jenislayanan ?></option>
									<?php
								}
								?>
							</select>
						</div>
						
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getruang(1)">
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
                                        <th>Poliklinik</th>
                                        <th>Sub Spesialis</th>
                                        <th>Jenis Layanan</th>
                                        <th>Loket Admisi</th>
                                        <th>Display</th>
                                        <th>Status</th>
                                        <th style="width: 150px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="dataruang"></tbody>
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
        <h4 class="modal-title">Tambah Ruang</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" id="form" action="#">
			<input type="hidden" id="idx" name="idx">
			<div class="form-group">
                <label class="control-label col-sm-2" for="email">Jenis Layanan:</label>
                <div class="col-sm-10">
                <select name="jns_layanan" id="jns_layanan" class="form-control">
                    <?php 
                    foreach ($jnslayanan as $row) {
                        ?>
                        <option value="<?= $row->idx ?>"><?= $row->jenislayanan ?></option>
                        <?php
                    }
                    ?>
                </select>
                </div>
            </div>
        	<div class="form-group">
                <label class="control-label col-sm-2" for="email">Poliklinik:</label>
                <div class="col-sm-3">
                <input type="text" class="form-control" id="kode_poli_jkn" name="kode_poli_jkn" placeholder="Kode">
                </div>
                <div class="col-sm-7">
                <input type="text" class="form-control" id="poliklinik" name="poliklinik" placeholder="Poliklinik">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Sub Spesialis:</label>
				<div class="col-sm-3">
                <input type="text" class="form-control" id="kode_jkn" name="kode_jkn" placeholder="Kode">
                </div>
                <div class="col-sm-7">
                <input type="text" class="form-control" id="ruang" name="ruang" placeholder="Subspesialis">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Loket Admisi:</label>
				<div class="col-sm-10">
                <select name="loketid" id="loketid" class="form-control">
					<option value="">Pilih Loket</option>
					<?php 
					foreach ($loket as $l) {
						?>
						<option value="<?= $l->loketid ?>"><?= $l->loketnama?></option>
						<?php
					}
					?>
				</select>
                </div>
                
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Display:</label>
				<div class="col-sm-10">
                <select name="displayid" id="displayid" class="form-control">
					<option value="">Pilih Display</option>
					<?php 
					foreach ($display as $l) {
						?>
						<option value="<?= $l->idx ?>"><?= $l->display?></option>
						<?php
					}
					?>
				</select>
                </div>
                
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Label Antrian Poli:</label>
				<div class="col-sm-10">
                <select name="labelantrianpoli" id="labelantrianpoli" class="form-control select2">
					<option value="">Pilih Label</option>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
					<option value="D">D</option>
					<option value="E">E</option>
					<option value="F">F</option>
					<option value="G">G</option>
					<option value="H">H</option>
					<option value="I">I</option>
					<option value="J">J</option>
					<option value="K">K</option>
					<option value="L">L</option>
					<option value="M">M</option>
					<option value="N">N</option>
					<option value="O">O</option>
					<option value="P">P</option>
					<option value="Q">Q</option>
					<option value="R">R</option>
					<option value="S">S</option>
					<option value="T">T</option>
					<option value="U">U</option>
					<option value="V">V</option>
					<option value="W">W</option>
					<option value="X">X</option>
					<option value="Y">Y</option>
					<option value="Z">Z</option>
				</select>
                </div>
                
            </div>
            
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">&nbsp;</label>
                <div class="col-sm-10">
                <input type="checkbox" id="status_ruang" name="status_ruang" value="1">Aktif
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
