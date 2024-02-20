<?php 
if(empty($rujukanonline)){
?>
<br>
<div class="row">
	<div class="col-md-12">
		<form class="form-horizontal" action="#">
			<input type="hidden" name="id_daftar" id="id_daftar" value="<?= $row->id_daftar ?>">
			<input type="hidden" name="reg_unit" id="reg_unit" value="<?= $row->reg_unit ?>">
			<input type="hidden" name="r-noRujukan" id="r-noRujukan" value="">
			<div class="form-group">
				<label class="control-label col-sm-2" for="email">No SEP:</label>
				<div class="col-sm-10">
				<input type="text" class="form-control" id="r-noSep" name="r-noSep" placeholder="No SEP" value="<?= $row->no_sep ?>" <?php if(!empty($row->no_sep)) echo "readonly" ?>>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Tgl Rujukan:</label>
				<div class="col-sm-10">
				<input type="text" class="form-control datepicker" id="r-tglRujukan" name="r-tglRujukan" value="<?= date('Y-m-d') ?>" placeholder="Masukkan Tgl Rujukan">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Tgl Rencana Kunjungan:</label>
				<div class="col-sm-10">
				<input type="text" class="form-control datepicker" id="r-tglRencanaKunjungan" name="r-tglRencanaKunjungan" placeholder="Masukkan Tgl Rencana Kunjungan">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Tipe Rujukan:</label>
				<div class="col-sm-10">
					<select name="r-tipeRujukan" id="r-tipeRujukan" class="form-control" onchange="pilihTipeRujukan()">
						<option value="0">Penuh</option>
						<option value="1">Partial</option>
						<option value="2">Balik (PRB)</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Faskes:</label>
				<div class="col-sm-10">
					<select name="r-faskes" id="r-faskes" class="form-control" >
						<option value="1">Faskes Tingkat 1</option>
						<option value="2" selected>Faskes Tingkat 2</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">PPK Dirujuk:</label>
				
				<input type="hidden" id="ppkDirujuk" name="ppkDirujuk"><div class="col-sm-10">
				<input type="text" class="form-control" id="r-ppkDirujuk" name="r-ppkDirujuk" placeholder="Masukkan PPK Dirujuk">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Jns Pelayanan:</label>
				<div class="col-sm-10">
				<input type="radio" name="jnsPelayanan" id="rj" value="2">R. Jalan
				<input type="radio" name="jnsPelayanan" id="gd" value="1">R. Inap
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Catatan:</label>
				<div class="col-sm-10">
				<textarea name="r-catatan" id="r-catatan" cols="30" rows="5" class="form-control"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Diagnosa Rujukan:</label>
				<div class="col-sm-10">
				<input type="hidden" class="form-control" id="diagRujukan" name="diagRujukan">
				<input type="text" class="form-control" id="r-diagRujukan" name="r-diagRujukan" placeholder="Masukkan Diagnosa">
				</div>
			</div>
			
			<div class="form-group inputPoli">
				<label class="control-label col-sm-2" for="pwd">Poli Rujukan:</label>
				<div class="col-sm-10">
				<!-- <select name="r-poliRujukan" id="r-poliRujukan" class="form-control">
					<option value="">Pilih Poli</option>
				</select> -->
				<div class="input-group">
					<input type="hidden" name="r-poliRujukan" id="r-poliRujukan" >
					<input type="text" class="form-control" name="namaPoliRujukan" id="namaPoliRujukan" readonly>
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" id="cariSpesialistik" onclick="spesialistiRujukan()"> <span class="fa fa-search" id="iconSpesialistik"></span></button>
					</span>
				</div>
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<div class="btn-group" id="btnRujukan">
						<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="createRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>
					</div> 
				</div>
			</div>
		</form> 
	</div>
</div>
<?php
}else{
?>
<div class="row">
	<div class="col-md-12">
		<table class="table table-bordered">
			<tr>
				<th style="width: 150px">No Registrasi RS</th>
				<th style="font-size: 20px"><?php echo $row->id_daftar ?></th>
			</tr>
			
			<tr>
				<th>No Registrasi Unit</th>
				<th style="font-size: 20px"><?php echo $row->reg_unit ?></th>
			</tr>
			<tr>
				<th>No Rujukan</th>
				<th style="font-size: 20px">
					<a href="<?= base_url() ."rekammedis/pasien/cetakrujukan/".$rujukanonline->noRujukan ?>" target="_blank" class="btn btn-warning">
					<?php echo $rujukanonline->noRujukan ?>
					</a>
				</th>
			</tr>
			<tr>
				<th>RS Tujuan</th>
				<th><?php echo $rujukanonline->namatujuanRujukan ?></th>
			</tr>

			<tr>
				<th>Poliklinik Tujuan</th>
				<th><?= $rujukanonline->namapoliTujuan ?></th>
			</tr>
			<tr>
				<th>Diagnosa</th>
				<th><?php echo $rujukanonline->diagnosanama ?></th>
			</tr>
			<tr>
				<th>Jenis Layanan</th>
				<th><?php if($rujukanonline->jnsPelayanan==2) echo "R. Jalan"; else echo "R.Inap"; ?></th>
			</tr>
			</tr>
    	</table>
	</div>
</div>
	
<?php
}
