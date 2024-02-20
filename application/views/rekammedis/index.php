<style>
	.kotak{
        padding:10px;
        width:100%;
        border:1px #ccc solid;
        border-collapse:collapse;
        
    }
	 .text-center{
        text-align:center;
    }
    .font60{
        font-size : 120pt;
    }
    .font10{
        font-size:10pt;
    }
    .font11{
        font-size:11pt;
    }
    .font12{
        font-size:12pt;
    }
    .font13{
        font-size:13pt;
    }

    .font14{
        font-size:14pt;
    }
    .font20{
        font-size:20pt;
    }
    .top10{
        margin-top:10px;
    }
    .top20{
        margin-top:20px;
    }
    .panel{
        border-radius:0px;
    }
    .panel-success{
        border-color:#1ABC9C;
    }
    .panel-success .panel-heading {
        background-color: #1ABC9C;
        color: #fff;
    }
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">
        <div class="col-lg-12 col-xs-6">
            <div class="small-box bg-aqua">
                <div class="inner">
                    <p>&nbsp;</p>
                    <h3>Hi, <?= $this->session->userdata('nama') ?></h3>
                </div>
                <div class="icon">
                    <i class="ion ion-person"></i>
                </div>
                <a class="small-box-footer">
                    <h4>Selamat datang di Medical Record rekammedis Room</h4>
                </a>
            </div>
        </div>

    </div>

    <!-- <div class="row">
        <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-red">
                <div class="inner">
                    <h3><?php echo $rj; ?></h3>

                    <p>Registrasi Pasien Lama</p>
                </div>
                <div class="icon">
                    <i class="fa  fa-wheelchair"></i>
                </div>
                <a href="<?php echo base_url() . "rekammedis/pasien"; ?>" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-green">
                <div class="inner">
                    <h3><?php echo $gd; ?></h3>
                    <p>Registrasi Pasien Baru</p>
                </div>
                <div class="icon">
                    <i class="fa  fa-ambulance"></i>
                </div>
                <a href="<?php echo base_url() . "rekammedis/pasien/tambah"; ?>" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-yellow">
                <div class="inner">
                    <h3><?php echo $ri; ?></h3>
                    <p>Pendaftaran Rawat Inap</p>
                </div>
                <div class="icon">
                    <i class="fa fa-bed"></i>
                </div>
                <a href="<?php echo base_url() . "rekammedis/riwayat"; ?>" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

        <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-aqua">
                <div class="inner">
                    <h3><?php //echo $ri; 
                        ?>0</h3>

                    <p>Pendaftaran Online</p>
                </div>
                <div class="icon">
                    <i class="fa fa-globe"></i>
                </div>
                <a href="<?php echo base_url() . "rekammedis/online"; ?>" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

    </div> -->

	<div class="row">
		<div class="col-md-6">
			<div class="panel panel-success">
				<div class="panel-heading text-center">NOMOR ANTREAN</div>
				<div class="panel-body">
					
				<div class="row">
						<div class="col-md-12">
							<div class="kotak font60 text-center" id="v-nomorAntri">
								<?php 
								// print_r($lastantrean);
								if(!empty($lastantrean)) {
									echo $lastantrean->antreanadmisi;
								}else {
									echo "Kosong"; 
								}    
								?>
							</div>
						</div>
						<div class="col-md-12 top10">
							<div class="kotak text-center">
								<div class="font10"><b>Dokter</b></div>
								<div class="font14" id="v-namadokter"><?php if(!empty($lastantrean)) echo $lastantrean->namadokter ?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>Loket</b></div>
								<div class="font14"><?= !empty($lastantrean) ? $lastantrean->loketid :""?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>No Rekam Medis</b></div>
								<div class="font14" id="v-nomr"><?php if(!empty($lastantrean)) echo $lastantrean->norm; else echo "-"; ?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>Waktu Daftar</b></div>
								<div class="font14" id="v-waktudaftar"><?php if(!empty($lastantrean)) echo $lastantrean->tanggalperiksa; else echo "-"; ?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>Waktu Panggil</b></div>
								<div class="font14" id='v-waktupanggil'><?= date('Y-m-d H:i:s') ?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>NIK</b></div>
								<div class="font14" id="v-nik"><?php if(!empty($lastantrean)) echo $lastantrean->nik; else echo "-"; ?></div>
							</div>
						</div>
						<div class="col-md-4 top10">
							<div class="kotak text-center">
								<div class="font10"><b>Nama</b></div>
								<div class="font14" id="v-nama"><?php if(!empty($lastantrean)) echo $lastantrean->nama; else echo "-"; ?></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 table-responsive">
			<audio id="bell" src="<?= base_url() ."assets/sound/Airport_Bell.mp3"; ?>"  ></audio>
			<audio id="suarabelnomorurut" src="<?= base_url() ."assets/sound/noantri.mp3"; ?>"  ></audio>
			<!-- <audio id="suarabelsuarabelloket" src="<?php //echo base_url() ."assets/sound/diloket.mp3"; ?>"  ></audio> -->
			<audio id="belas" src="<?= base_url() ."assets/sound/belas.mp3"; ?>"  ></audio>
			<audio id="sebelas" src="<?= base_url() ."assets/sound/sebelas.mp3"; ?>"  ></audio>
			<audio id="puluh" src="<?= base_url() ."assets/sound/puluh.mp3"; ?>"  ></audio>
			<audio id="sepuluh" src="<?= base_url() ."assets/sound/sepuluh.mp3"; ?>"  ></audio>
			<audio id="ratus" src="<?= base_url() ."assets/sound/ratus.mp3"; ?>"  ></audio>
			<audio id="seratus" src="<?= base_url() ."assets/sound/seratus.mp3"; ?>"  ></audio>
			<audio id="angka0" src="<?= base_url() ."assets/sound/g0.mp3"; ?>"  ></audio>
			<audio id="angka1" src="<?= base_url() ."assets/sound/g1.mp3"; ?>"  ></audio>
			<audio id="angka2" src="<?= base_url() ."assets/sound/g2.mp3"; ?>"  ></audio>
			<audio id="angka3" src="<?= base_url() ."assets/sound/g3.mp3"; ?>"  ></audio>
			<audio id="angka4" src="<?= base_url() ."assets/sound/g4.mp3"; ?>"  ></audio>
			<audio id="angka5" src="<?= base_url() ."assets/sound/g5.mp3"; ?>"  ></audio>
			<audio id="angka6" src="<?= base_url() ."assets/sound/g6.mp3"; ?>"  ></audio>
			<audio id="angka7" src="<?= base_url() ."assets/sound/g7.mp3"; ?>"  ></audio>
			<audio id="angka8" src="<?= base_url() ."assets/sound/g8.mp3"; ?>"  ></audio>
			<audio id="angka9" src="<?= base_url() ."assets/sound/g9.mp3"; ?>"  ></audio>
			<audio id="puluhan0" src="<?= base_url() ."assets/sound/g0.mp3"; ?>"  ></audio>
			<audio id="puluhan1" src="<?= base_url() ."assets/sound/g1.mp3"; ?>"  ></audio>
			<audio id="puluhan2" src="<?= base_url() ."assets/sound/g2.mp3"; ?>"  ></audio>
			<audio id="puluhan3" src="<?= base_url() ."assets/sound/g3.mp3"; ?>"  ></audio>
			<audio id="puluhan4" src="<?= base_url() ."assets/sound/g4.mp3"; ?>"  ></audio>
			<audio id="puluhan5" src="<?= base_url() ."assets/sound/g5.mp3"; ?>"  ></audio>
			<audio id="puluhan6" src="<?= base_url() ."assets/sound/g6.mp3"; ?>"  ></audio>
			<audio id="puluhan7" src="<?= base_url() ."assets/sound/g7.mp3"; ?>"  ></audio>
			<audio id="puluhan8" src="<?= base_url() ."assets/sound/g8.mp3"; ?>"  ></audio>
			<audio id="puluhan9" src="<?= base_url() ."assets/sound/g9.mp3"; ?>"  ></audio>
			<audio id="ratusan0" src="<?= base_url() ."assets/sound/g0.mp3"; ?>"  ></audio>
			<audio id="ratusan1" src="<?= base_url() ."assets/sound/g1.mp3"; ?>"  ></audio>
			<audio id="ratusan2" src="<?= base_url() ."assets/sound/g2.mp3"; ?>"  ></audio>
			<audio id="ratusan3" src="<?= base_url() ."assets/sound/g3.mp3"; ?>"  ></audio>
			<audio id="ratusan4" src="<?= base_url() ."assets/sound/g4.mp3"; ?>"  ></audio>
			<audio id="ratusan5" src="<?= base_url() ."assets/sound/g5.mp3"; ?>"  ></audio>
			<audio id="ratusan6" src="<?= base_url() ."assets/sound/g6.mp3"; ?>"  ></audio>
			<audio id="ratusan7" src="<?= base_url() ."assets/sound/g7.mp3"; ?>"  ></audio>
			<audio id="ratusan8" src="<?= base_url() ."assets/sound/g8.mp3"; ?>"  ></audio>
			<audio id="A" src="<?= base_url() ."assets/sound/abjad/A.mp3"; ?>"  ></audio>
			<audio id="B" src="<?= base_url() ."assets/sound/abjad/B.mp3"; ?>"  ></audio>
			<audio id="C" src="<?= base_url() ."assets/sound/abjad/C.mp3"; ?>"  ></audio>
			<audio id="D" src="<?= base_url() ."assets/sound/abjad/D.mp3"; ?>"  ></audio>
			<audio id="E" src="<?= base_url() ."assets/sound/abjad/E.mp3"; ?>"  ></audio>
			<audio id="F" src="<?= base_url() ."assets/sound/abjad/F.mp3"; ?>"  ></audio>
			<audio id="G" src="<?= base_url() ."assets/sound/abjad/G.mp3"; ?>"  ></audio>
			<audio id="H" src="<?= base_url() ."assets/sound/abjad/H.mp3"; ?>"  ></audio>
			<audio id="I" src="<?= base_url() ."assets/sound/abjad/I.mp3"; ?>"  ></audio>
			<audio id="J" src="<?= base_url() ."assets/sound/abjad/J.mp3"; ?>"  ></audio>
			<audio id="K" src="<?= base_url() ."assets/sound/abjad/K.mp3"; ?>"  ></audio>
			<audio id="L" src="<?= base_url() ."assets/sound/abjad/L.mp3"; ?>"  ></audio>
			<audio id="M" src="<?= base_url() ."assets/sound/abjad/M.mp3"; ?>"  ></audio>
			<audio id="N" src="<?= base_url() ."assets/sound/abjad/M.mp3"; ?>"  ></audio>
			<audio id="O" src="<?= base_url() ."assets/sound/abjad/O.mp3"; ?>"  ></audio>
			<audio id="P" src="<?= base_url() ."assets/sound/abjad/P.mp3"; ?>"  ></audio>
			<audio id="Q" src="<?= base_url() ."assets/sound/abjad/Q.mp3"; ?>"  ></audio>
			<audio id="R" src="<?= base_url() ."assets/sound/abjad/R.mp3"; ?>"  ></audio>
			<audio id="S" src="<?= base_url() ."assets/sound/abjad/S.mp3"; ?>"  ></audio>
			<audio id="T" src="<?= base_url() ."assets/sound/abjad/T.mp3"; ?>"  ></audio>
			<audio id="U" src="<?= base_url() ."assets/sound/abjad/U.mp3"; ?>"  ></audio>
			<audio id="V" src="<?= base_url() ."assets/sound/abjad/V.mp3"; ?>"  ></audio>
			<audio id="W" src="<?= base_url() ."assets/sound/abjad/W.mp3"; ?>"  ></audio>
			<audio id="X" src="<?= base_url() ."assets/sound/abjad/X.mp3"; ?>"  ></audio>
			<audio id="Y" src="<?= base_url() ."assets/sound/abjad/Y.mp3"; ?>"  ></audio>
			<audio id="Z" src="<?= base_url() ."assets/sound/abjad/Z.mp3"; ?>"  ></audio>
			<audio id="poliklinik" src="<?= base_url() ."assets/sound/diloket.wav	"; ?>"  ></audio>
			<audio id="ruang" src="<?= base_url() ."assets/sound/g".$this->session->userdata('loket').".mp3"; ?>"  ></audio>
			<form class="form-horizontal kotak" name="kotak" id="form" action="#">
				<input type="hidden" name="idx_pendaftaran" id="idx_pendaftaran" value="<?php if(!empty($lastantrean)) echo $lastantrean->idx_pendaftaran ?>">
				<input type="hidden" name="kodebooking" id="kodebooking" value="<?php if(!empty($lastantrean)) echo $lastantrean->kodebooking ?>">
				<input type="hidden" name="labelantrean" id="labelantrean" value="<?php if(!empty($lastantrean)) echo $lastantrean->labelantrianadmisi ?>">
				<input type="hidden" name="taskid" id="taskid" value="<?php if(!empty($lastantrean)) echo $lastantrean->taskid ?>">
				<input type="hidden" name="norm" id="norm" value="<?php if(!empty($lastantrean)) echo $lastantrean->norm ?>">
				<input type="hidden" name="pasienbaru" id="pasienbaru" value="<?php if(!empty($lastantrean)) echo $lastantrean->pasienbaru ?>">
				<div class="form-group">
					<label class="control-label col-sm-3" for="email">Antrean:</label>
					<div class="col-sm-9">
					<input type="radio" id="normal" name="antrean" checked value="1" onclick="getLastAntreanAdmisi()"> Normal
					<input type="radio" id="prioritas" name="antrean" value="2" onclick="getLastAntreanAdmisi()"> Prioritas
					<input type="radio" id="lewati" name="antrean" value="3" onclick="getLastAntreanAdmisi()"> Lewati
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-3" for="pwd">Loket Pemanggil:</label>
					<div class="col-sm-9">
					<div class="input-group input-group">
						<?php 
						if(empty($this->session->userdata('loket'))){
							?>
							<select name="loketpanggil" style="width:100%" id="loketpanggil" class="form-control" onchange="getLastAntreanAdmisi()">
								<option value="">Pilih Loket</option>
								<?php 
								foreach ($loket as $a ) {
									?>
									<option value="<?= $a->loketid ?>" ><?= $a->loketnama ?></option>
									<?php
								}?>
							</select>
							<?php
						}else{
							?>
							<input type="text" class="form-control" id="pwd" placeholder="Enter Loket" value="<?= !empty($this->session->userdata('loketnama')) ? $this->session->userdata('loketnama'):"" ?>" readonly>
							<?php
						}
						?>
						
						<div class="input-group-btn">
							<button type="button" id="btnCari" class="btn btn-primary btn-group-lg" onclick="pilihLoket()">
								<i class="fa fa-arrow-right" id="iconCari"></i>
							</button>
						</div>
					</div>
					
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-3" for="pwd">Label Antrian:</label>
					<div class="col-sm-9">
						<?php 
						if(count($loket)==1){
							?>
							<input type="hidden" name="loketantri" id="loketantri" value="<?= $loket[0]->loketid?>">
							<input type="text" class="form-control" id="pwd" name="namaloket" placeholder="Enter Dokter" value="<?= $loket[0]->loketlabel ?>" readonly>
							<?php
						}else{
							?>
							<select name="loketantri" style="width:100%" id="loketantri" class="form-control" onchange="getLastAntreanAdmisi()">
								<option value="">Pilih Loket</option>
								<?php 
								foreach ($loket as $a ) {
									?>
									<option value="<?= $a->loketid ?>" <?= $this->session->userdata('loket')==$a->loketid ? "selected":""?> ><?= $a->loketlabel ?></option>
									<?php
								}?>
							</select>
							<?php
						}
						?>
						
					</div>
				</div>
				<div id="v-nomorantrean">
				<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="<?php if(!empty($lastantrean)) echo $lastantrean->angkaantreanadmisi; else echo "0"; ?>">
				</div>
				
				<div class="form-group">
					<div class="col-sm-offset-3 col-sm-9" id="tombolPanggil">
						<?php 
						if(!empty($lastantrean)){
							if($lastantrean->statusadmisi==1){
								
								?>
									<button type="button" class="btn btn-warning btn-sm btn-block" onclick="panggilAdmisi()" id="btnPanggil"><span class="fa fa-ticket" id="iconPanggil"></span> Panggil Ulang</button>
									<?php
								
								?>
								
								
								<div class="row top10">
									<div class="col-md-3">
									<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span> Mulai Layani</button>
									</div>
									<div class="col-md-3">
									<button type="button" class="btn btn-primary btn-sm btn-block" onclick="selesaiLayanAdmisi()" id="btnSelesaiLayan"><span id="iconMulaiLayan" class="fa fa-check"></span> Selesai Layani</button>
									</div>
									<div class="col-md-3"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()" <?php if($lastantrean->taskid==4) echo "disabled"; ?>><span class="fa fa-arrow-right " ></span> Skip</button></div>
									<div class="col-md-3"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" <?php if($lastantrean->taskid==4) echo "disabled"; ?>><span class="fa fa-remove " ></span> Batal</button></div>
								</div> 
								
								<?php
							}else{
								?>
								<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilAdmisi()"><span class="fa fa-ticket"></span> Panggil Antrian</button>
								<div class="row top10">

								<div class="col-md-6"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()" <?php if($lastantrean->taskid==4) echo "disabled"; ?>><span class="fa fa-arrow-right " ></span> Lewati</button></div>
								<div class="col-md-6">
								<button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" id="btnBatal"><span id="iconbatal" class="fa fa-remove"></span> Batal</button>
								</div>
								</div> 
								<?php
							}
						}else{
							?>
							<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Antrean Habis</button>
							<?php
						}
						?>
					
					</div>
				</div>
			</form> 

			<div class="kotak top20">
				<div class="row">
					<div class="col-md-4">
						<div class="font20">
							Loket 1
						</div>
						<div class="font10" id="v-dokterjuga">
							<?php if(!empty($antreandokter)) echo $antreandokter[0]->namadokter ?>
						</div>
					</div>
					<div class="col-md-4">
						<div class="font20">
							<?= !empty($jadwal) ? $jadwal->jadwal_jam_mulai ." - ". $jadwal->jadwal_jam_selesai : "Belum ada antrian" ?>
						</div>
					</div>
					<div class="col-md-4">
						<a href="<?= base_url()."display/admisi" ?>" target="_blank" class='btn btn-primary btn-block' >Buka Display Antrean</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<div id="modalbatalantrean" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Batalkan Antrean</h4>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning alert-dismissible text-center">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            Sistem ini terintegrasi dengan JKN Antrean, jika antrean di batalkan maka kunjungan hari ini juga akan otomatis dibatalkan pada server antrean JKN dan juga dibatalkan pada SIMRS 
                            <h3 class='text-center'><i class="icon fa fa-question-circle "></i><br>Apakah Anda Yakin Akan Membatalkan bookingan antrean ini ?</h3>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label for="alasan">Keterangan</label>
                                <input type="hidden" id="btlkodebooking" name="btlkodebooking">
                                <input type="hidden" id="btlid_daftar" name="btlid_daftar">
                                <input type="hidden" id="btlreg_unit" name="btlreg_unit">
                                <textarea name="btlketerangan" id="btlketerangan" cols="30" rows="5" class="form-control"></textarea>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button" id="btnBatalAntrean" onclick="batalkanAntreanAdmisi()"><span id="iconBatalAntrean" class="fa fa-remove"></span> Batalkan</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
<script type="text/javascript">

</script>
