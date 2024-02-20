<style type="text/css">
	.text-center{
		text-align: center;
	}
	.btn-lg {
		padding: 20px 20px;
		font-size: 24px;
		line-height: 1.3333333;
		border-radius: 6px;
	}
	.btn-group-lg {
		padding: 10px 10px;
		font-size: 44px;
		line-height: 1.3333333;
		border-radius: 6px;
		border-top-left-radius: 6px;
		border-bottom-left-radius: 6px;
	}
	.v-center {
		margin: 0;
		position: absolute;
		top: 50%;
		/* -ms-transform: translateY(-50%);
		transform: translateY(-50%); */
		width	: 100%;
	}
	.hide{
		display:none;
	}
	.input-lg {
		height: 80px;
		padding: 10px 16px;
		font-size: 38px;
		line-height: 1.3333333;
		border-radius: 10px;
		border:2px solid #367fa9;
	}
	.rujukan{
		padding:10px;
	}
	.kotak {
		display: grid;
		border: 1px solid #ccc;
		border-collapse: collapse;
		width: 100%;
		box-shadow: 5px 5px #ccc;
		border-radius: 10px;
		margin-bottom: 10px;
		padding:10px;
		background:#ffffff80;
		max-height:85vh;
		overflow-y:scroll;
	}
	.kotakdokter {
		display: row;
		border: 1px solid #ccc;
		border-collapse: collapse;
		width: 100%;
		box-shadow: 5px 5px #ccc;
		border-radius: 10px;
		margin-bottom: 10px;
		padding:10px;
		background:#ffffff80;
	}
	.poli{
		border:1px solid #ccc; border-collapse:collapse;padding:10px;box-shadow:5px 3px aliceblue
	}
	.btn-bulat {
        border-radius: 75px;
        background: #ccccccad;
        border:1px solid #ccccccad;
        border-collapse:collapse;
        margin-bottom:10px;
    }
	.step{
		margin-top:10px;z-index:3;position: relative;
	}
	#labelnomor{
		color:#ccc;
	}
	#listrujukan{
		overflow-y: auto;
		min-height:70vh;
	}
	.img{
		width:80px;
	}
	.panel{
		background-color: #ffffff59;
	}
</style>
<div class="row">
	<form action="#" method="POST" onsubmit="return false" style="background:#fff">
		
		<input type="hidden" name="sekarang" id="sekarang" value="<?= date('Y-m-d')?>">
		
		<div class="col-md-12 " id="antrian">
			<div class="row">
				<div class="col-md-12 text-center" style="margin-bottom:10px;position: relative;z-index:3">
					<img src="<?php echo base_url() ."assets/images/logo.png" ?>" style="height:60px;" >
					<h5 style="color:#ccc;"><b>CONSOLE ANTREAN <?= COMPANY_NAME ?></b></h5>
				</div>
			</div>
			<div class="step text-center  v-center" id="step1" style="margin-top:50px;">
				<div class="container">
					<div class="row">
						<div class="col-xs-3">
							<button class="btn btn-default btn-lg btn-block btn-bulat text-center" type="button" onclick="pilihJenisAntrian('JKN')">
							<img src="<?= base_url() ."assets/images/asuransi/bpjs.png"?>"  alt="">	<br>
							JKN
							</button>
						</div>
						<div class="col-xs-3">
							<button class="btn btn-default  btn-bulat btn-lg btn-block"  type="button" onclick="pilihJenisAntrian('NON JKN')">
							<img src="<?= base_url() ."assets/images/asuransi/umum.png"?>"  alt="">	<br>
							NON JKN
							</button>
						</div>
						<div class="col-xs-3">
							<button class="btn btn-default btn-lg  btn-bulat btn-block"  type="button" onclick="pilihJenisAntrian('CHECKIN')">
							<img src="<?= base_url() ."assets/images/asuransi/asuransilain.png"?>"  alt="">	<br>	
							CHECK IN
							</button>
						</div>
						<div class="col-xs-3">
							<button class="btn btn-default btn-lg  btn-bulat btn-block"  type="button" onclick="pilihJenisAntrian('FARMASI')">
							<img src="<?= base_url() ."assets/images/asuransi/farmasi.png"?>"  alt="">	<br>	
							ANTRIAN FARMASI
						</button>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">&nbsp</div>
						<div class="col-md-3">
							<button class="btn btn-default  btn-bulat btn-lg btn-block"  type="button" onclick="ambilAntrianRanap()">
							<img src="<?= base_url() ."assets/images/asuransi/ranap.png"?>"  alt="">	<br>
							Rawat Inap
							</button>
						</div>
						<div class="col-md-3">
							<button class="btn btn-default  btn-bulat btn-lg btn-block"  type="button" onclick="ambilAntrianPenunjang()">
							<img src="<?= base_url() ."assets/images/asuransi/penunjang.png"?>"  alt="">	<br>
							Penunjang
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="step v-center hide" id="step2" style="margin-top:50px;">
				<div class="col-md-6 col-md-offset-3 text-center">
					<h1 id="labelnomor">Masukkan Nomor Kartu</h1>
					<input type="hidden" name="jenisantrian" id="jenisantrian" value="">
					<div class="input-group input-group">
						<div class="input-group-btn">
							<button type="button" id="btnKembai" class="btn btn-primary btn-group-lg" onclick="goTo(1)">
								<i class="fa fa-arrow-left" id="iconKembali"></i>
							</button>
						</div>
						<input type="text" class="form-control input-lg" id="nomor" placeholder="Masukkan Nomor Kartu" onkeydown="enter_nomor(event)">
						<div class="input-group-btn">
							<button type="button" id="btnCari" class="btn btn-primary btn-group-lg" onclick="cekPasien()">
								<i class="fa fa-search" id="iconCari"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="step hide" id="step3" style="margin-top:10px;">
				<div class="col-md-3">
					<div class="kotak">
						<div class="row">
							<div class="col-md-12">
								<div id="img">
									<img class="profile-user-img img-responsive img-circle" src="http://localhost/simrasidin/assets/images/female.png" alt="User profile picture">
								</div>
							</div>
							<div class="col-md-12">
								<h3 class="profile-username text-center"><span class="nama"></span><br>( <span class="noKartu"></span> )</h3>
								<p class="text-muted text-center"><span class="nik"></span></p>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#"><i class="fa fa-id-card "></i> <span class="nik"></span> </a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i> <span class="noKartu"></span></a></li>
									<li><a href="#"><i class="fa fa-user"></i> <span class="nomr"></span></a></li>
									<li><a href="#"><i class="fa fa-user"></i> <span class="nama"></span></a></li>
									<li><a href="#"><i class="fa fa-calendar"></i> <span class="tgllahir"></span> </a></li>
									<li><a href="#"><i class="fa fa-mobile"></i> <span class="notelp"></span></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-9">
					<div class="kotak">
						<div id="listrujukan"></div>
					</div>
				</div>
					<!-- <div class="col-md-3" id="profile">
						<div class="box box-solid">
							<div class="box-header with-border bg-green">
								<h3 class="text-center">Pasien</h3>
							</div>
							<div class="box-body no-padding" style="">
								<div id="img">
								<img class="profile-user-img img-responsive img-circle" src="http://localhost/simrasidin/assets/images/female.png" alt="User profile picture">
								</div>
								
								<h3 class="profile-username text-center"><span class="nama"></span> ( <span class="noKartu"></span> )</h3>
								<p class="text-muted text-center"><span class="nik"></span></p>
								<ul class="nav nav-pills nav-stacked">
									<li><a href="#"><i class="fa fa-id-card "></i> <span class="nik"></span> </a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i> <span class="noKartu"></span></a></li>
									<li><a href="#"><i class="fa fa-user"></i> <span class="nomr"></span></a></li>
									<li><a href="#"><i class="fa fa-user"></i> <span class="nama"></span></a></li>
									<li><a href="#"><i class="fa fa-calendar"></i> <span class="tgllahir"></span> </a></li>
									<li><a href="#"><i class="fa fa-mobile"></i> <span class="notelp"></span></a></li>
								</ul>
							</div>

						</div>
					</div>
					<div class="col-md-9">
						<div class="box box-success box-solid">
							<div class="box-header with-border" id="step-header">List Rujukan</div>
								<div class="box-body">
									<div id="listrujukan">
												
									</div>
								</div>
							</div>
					</div> -->
			</div>
		</div>
		
	</form>
</div>
<!-- jQuery 3 -->
<script src="<?php echo base_url() . "assets/" ?>bower_components/jquery/dist/jquery.min.js"></script>

<script type="text/javascript">
  var elem = document.getElementById("body-content");
  var c = 0;
  var t;
  var hitung = 0;
  var timer_is_on = 0;
  var base_url = "<?php echo base_url() ?>";
  var c = 0;
  var mode = "";
  var interval = 1000;
  timedCount();

  function timedCount() {
    interval = 1000;
    // getRuangan();
    // setInterval(getRuangan, interval);
    // startCount();
  }

  function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
  }

  function show_full() {
    req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
    //req.call(elem);
    return req;
    //alert("SHOW FULL SCREEN");
  }
</script>
<script src="<?php echo base_url() . "javascript/console.js" ?>"></script>

