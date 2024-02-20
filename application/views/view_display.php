
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?= !empty($title) ? $title : "Display Ketersediaan Kamar" ?></title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="<?php echo base_url() ."assets/" ?>bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo base_url() ."assets/" ?>bower_components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="<?php echo base_url() ."assets/" ?>dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="<?php echo base_url() ."assets/" ?>dist/css/skins/_all-skins.min.css">
  <style type="text/css">
    .font16{
      font-size: 16pt;
    }
    .font18{
      font-size: 18pt;
      font-weight: bold;
    }
    .font24{
      font-size: 24pt;
      font-weight: bold;
    }
    .font32{
      font-size: 48pt;
      font-weight: bold;
      color:#00a65a;
      text-shadow: 2px 2px #6de37f;
    }
    .box-header > .fa, .box-header > .glyphicon, .box-header > .ion, .box-header .box-title {
      display: inline-block;
      font-size: 24pt;
      margin: 0;
      line-height: 1;
    }
    .lingkaran {
      border: solid #00a65a;
      border-style: solid;
      border-collapse: collapse;
      padding: 5px;
      width: 140px;
      height: 140px;
      border-radius: 100%;
      box-shadow: 3px 3px #6de37f;
      text-align: center;

    }
    .lingkaran {
      border: solid #00a65a;
      border-style: solid;
      border-collapse: collapse;
      padding: 5px;
      width: 140px;
      height: 140px;
      border-radius: 100%;
      box-shadow: 3px 3px #6de37f;
      text-align: center;

    }
    .tersedia{
      font-size: 25pt;
      width: 100%;
    }
    .kosong{
      background: #00a65a;color: #fff;text-align: center; 
    }
    .terisi{
      background: #dd4b39;color: #fff;text-align: center; 
    }
    .total{
      float: right;text-align: center;width: 20%;background-color: #fff; color:#090909;border-radius: 45% ;font-weight: bold; 
    }
    .bulat{
      border-radius: 100px;
      float: right;
      background-color: #fff;
      color: #000;
      padding: 2px;
      width: 120px;
      text-align: center;
    }
    .split_bulat{
      border-radius: 80px;
      float: right;
      background-color: #fff;
      color: #000;
      padding: 2px;
      width: 30%;
      text-align: center;
    }
    .nama_ruang{
      font-size: 20pt;text-align: left;padding: 5px;border-bottom: 1px solid #ceedee;font-weight: bold;
    }
    
    .split_nama_ruang{
      font-size: 16pt;text-align: left;padding: 5px;border-bottom: 1px solid #ceedee;
    }
    .total_ruang{
      float: right;border-radius: 90;font-size: 20pt;padding: 5px;border-bottom: 1px solid #ceedee;text-align: center;
    }
    .kelas{
      font-size: 18pt;padding: 5px;border-bottom: 1px solid #00a65a;font-weight: bold;
    }
    .split_kelas{
      font-size: 14pt;padding: 5px;border-bottom: 1px solid #00a65a;font-weight: bold;
    }
    .jumlah{
      font-size: 18pt;padding: 5px;border-bottom: 1px solid #fff;font-weight: bold;
    }
    .split_jumlah{
      font-size: 14pt;padding: 5px;
    }
    .shadow{
      box-shadow: 5px #ceedef;
    }
    #display{
      padding: 0px 0px;
    }
    .col-5{
      width: 20%;
      float: left;
      padding: 5px;
    }
		.font32{
			font-size:32pt;
		}
		.keterangan{
			font-size:12pt;
		}
		#loading {
			height: 100vh;
			width: 100%;
			background: #000000a6;
			margin: 0;
			position: fixed;
			z-index: 4;
		}
		.loading {
			line-height: 200px;
			height: 200px;
			border: 3px solid #3c8dbc;
			text-align: center;
		}
    
		.loading p {
      line-height: 1.5;
      display: inline-block;
      vertical-align: middle;
      margin-top: 300px;
      font-size: 18pt;
      padding: 15px;
      border: 1px solid #3c8dbc;
      border-collapse: collapse;
      font-weight: bold;
      font-family: cursive;
      color: #367fa9;
      background: #000;
      box-shadow: 10px 10px #c1a7a7;
      border-radius: 30px;
      font-family:'Courier New'
    }
		.hide{
			display:none;
		}
    .hero-image {
        width: 100%;
        height: 100vh;
        /* position: relative; */
        overflow: hidden;
        }

        .hero-image:after,
        .hero-image:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: center/cover no-repeat;
        background-image: 
        linear-gradient(rgba(46, 51, 82, 0.6) 100%, transparent 0), 
        linear-gradient(125deg, rgba(255, 255, 255, 0.5) 35%, transparent 0), 
        linear-gradient(-55deg, rgba(255, 255, 255, 0.5) 25%, transparent 0), 
        url('assets/images/bg2.jpg');
        }

        .hero-image:before {
        filter: blur(4px);
        }

        .hero-image:after {
        clip-path: polygon(45% 0, 97% 0, 68% 100%, 16% 100%);
        }

  </style>
</head>
<body class="hold-transition skin-green layout-top-nav " id="body-content" >
<div id="loading" class="loading hide">
	<p id="loading-proses">Loading...</p>
</div>
<div class="wrapper" >
  <!-- <header class="main-header">

    
    <nav class="navbar navbar-static-top">
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <a href="" class="logo" style="background-color: #00a65a;float: left;">
              <span class="logo-mini"><b>A</b>LT</span>
              <span class="logo-lg"><img src="<?php echo base_url() ."assets/images/logo.png" ?>" style="height:50px;" ></span>
            </a>
          </div>
          <div class="col-md-8">
            <h3 style="color: #fff;text-align: center;"><?= !empty($title) ? $title : "Sistem Informasi Ketersediaan Tempat Tidur RSUD Rasidin Padang" ?></h3>
          </div>
          <div class="col-md-2 shadow">
              &nbsp;
          </div>
        </div>
      </div>
      
    </nav>

  </header> -->
	
  <div class="content-wrapper <?= $this->uri->segment(1)!="display"?"hero-image":""?>" style="background-color: #fff;">
    <div class="row"><div class="col-sm-12">&nbsp;</div></div>
    <?php echo $content ?>
  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <div class="row">
      <div class="col-sm-12">
        <div class="pull-right hidden-xs">
          <b>Version</b> 1.0
        </div>
        <strong>Copyright &copy; 2023 <a href="#"><?= COMPANY_NAME ?></a>.</strong> All rights
        reserved. TEAM SIMRS <?= COMPANY_NAME ?>
      </div>
        
    </div>
    <!-- /.container -->
  </footer>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="<?php echo base_url() ."assets/" ?>bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="<?php echo base_url() ."assets/" ?>bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="<?php echo base_url() ."assets/" ?>bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<!--script src="<?php //echo base_url() ."assets/" ?>bower_components/fastclick/lib/fastclick.js"></script-->
<!-- AdminLTE App -->
<script src="<?php echo base_url() ."assets/" ?>dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<link async rel="stylesheet" type="text/css" href="<?= base_url()?>assets/plugins/sweetalert/sweetalert.css">
<script src="<?= base_url() ?>assets/plugins/sweetalert/sweetalert.min.js"></script>

<script src="<?php echo base_url() ."assets/" ?>dist/js/demo.js"></script>
<script src="<?php echo base_url() ."assets/" ?>js/function.js"></script>
<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
<?php if($this->uri->segment(1)==""||$this->uri->segment(1)=="display") { ?>
<script type="text/javascript">
  var elem = document.getElementById("body-content"); 
  
  // elem.onclick = function() {
  //       req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
  //       req.call(elem);
  // }
  
  
  </script>


<?php } ?>
<script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
<script>
  // const beamsClient = new PusherPushNotifications.Client({
  //   instanceId: 'd1e2eca0-6700-4765-9161-6be7cc9261ec',
  // });

  // beamsClient.start()
  //   .then(() => beamsClient.addDeviceInterest('hello'))
  //   .then(() => console.log('Successfully registered and subscribed!'))
  //   .catch(console.error);
  // Pusher.logToConsole = true;

  //   var pusher = new Pusher('5c126bbfaf0ea402af50', {
  //       cluster: 'ap1'
  //   });
  //   var channel = pusher.subscribe('checkin');
  //   channel.bind('getNotif', function(data) {
  //       console.clear();
  //       alert(data.notifpesan)
       
  //   });

</script>
<div id="modalantrian" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content modal-sm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Antrian</h4>
      </div>
      <div class="modal-body">
				<div class="row">
					<div class="col-md-12">
						<div id="cetakantrian" style="width:270px; height:auto;">
							<div class="text-center" style="text-align:center">
							<h3 id="antriantitle">Antrian Poli</h3>
							<div class="font32" id="nomorantrian" style="font-size:32pt;color:#00a65a;text-shadow:2px 2px #2px 2px #6de37f;"></div>
							<div id="kodebooking" class="font18"></div>
							<div id="namapasien" class="font11"></div>
							<div id="politujuan" class="font12"></div>
							<div class="keterangan" id="nojaminan" style="font-size:12pt;border-bottom:1px solid #ccc;"></div>
							<div class="keterangan" id="keterangan" style="font-size:12pt"></div>
							</div>
							

						</div> 
					</div>
				</div>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-default btn-block" onclick="cetakAntrian()"><span class="fa fa-print"></span> Cetak</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>
