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
                    <h4>Selamat datang di Farmasi</h4>
                </a>
            </div>
        </div>

    </div>

								
</section>
