<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">Cari Poliklinik</h3>
            <div class="box-tools">
            <div class="input-group input-group-sm">
                                        <input type="text" name="keyword" id="keyword" class="form-control" value="">
                                            <div class="input-group-btn">
                                                <button type="button" id="btnCari" class="btn btn-default" onclick="cariRuangan()">
                                                    <i class="fa fa-search" id="iconCari"></i> Cari
                                                </button>
                                            </div>
                                        </div>
            </div>
        </div>
        <div class="box-body table-responsive">
            <div class="row">
                <?php 
                $style=['bg-aqua','bg-green','bg-yellow','bg-red'];
                $i=0;
                foreach ($ruang as $r ) {
                    $i++;
                    if($i<4) $mod=$i;
                    else $mod=$i%4;
                    ?>
                    <div class="col-md-3 col-sm-6 col-xs-12">
                        <a href="#" onclick="pilihRuangRajal(<?= $r->idx ?>)">
                            <div class="info-box">
                                <span class="info-box-icon <?= $style[$mod]?>"><i class="fa fa-home"></i></span>
                                <div class="info-box-content">
                                    <span class="info-box-text"><b>Poliklinik</b></span>
                                    <span class="info-box-number"><h4><?= $r->ruang ?></h4></span>
                                </div>
                            </div>
                        </a>
                        
                    </div>
                    <?php
                }
                ?>
            </div>   
        </div>
    </div>
    
</section>
