<table class="table table-bordered table-striped" id="dataharian">
    <thead class="bg-red" style="text-align:center">
        <tr>
        <?php 
        if(!empty($group)){
            $jml=1;
            foreach ($group as $g ) {
                if($jml==1 && count($group)==1){
                    ?>
                    <th style="width: 40px">#</th>
                    <th>Tanggal</th>
                    <?php
                }elseif($jml==1 && count($group)>1){
                    ?>
                    <th style="width: 40px" rowspan='<?= count($group)?>'>#</th>
                    <th rowspan='<?= count($group)?>'>Tanggal</th>
                    <?php
                }else{
                    echo "<tr>";
                }
                if($g=="pekerjaan"){
                    $pekerjaan=$this->rekapitulasi_model->getPekerjaan();
                    foreach ($pekerjaan as $p) {
                        $subquery[]=$g ."='".$p->pekerjaan_nama."'";
                        ?>
                        <th><?= $p->pekerjaan_nama ?></th>
                        <?php
                    }
                }elseif ($g=="nama_kabkota") {
                    $wilayah=array('Padang Panjang','Padang Pariaman','Tanah Datar','Bukittinggi','Lainnya');
                    foreach ($wilayah as $w ) {
                        $subquery[]=$g ."='".$w."'";
                        ?>
                        <th><?= $w ?></th>
                        <?php
                    }
                }elseif ($g=="id_cara_daftar") {
                    $caradaftar=$this->rekapitulasi_model->getCaraDaftar();
                    foreach ($caradaftar as $p) {
                        $subquery[]=$g ."='".$p->idx."'";
                        ?>
                        <th><?= $p->caradaftar ?></th>
                        <?php
                    }
                }elseif ($g=="id_cara_bayar") {
                    $carabayar=$this->rekapitulasi_model->getCaraBayar();
                    foreach ($carabayar as $p) {
                        $subquery[]=$g ."='".$p->idx."'";
                        ?>
                        <th><?= $p->cara_bayar ?></th>
                        <?php
                    }
                }elseif ($g=="id_jenis_peserta") {
                    $jenispeserta=$this->rekapitulasi_model->getJenisPeserta();
                    foreach ($jenispeserta as $p) {
                        $subquery[]=$g ."='".$p->id_jenis_peserta."'";
                        ?>
                        <th><?= $p->jenis_peserta ?></th>
                        <?php
                    }
                }elseif ($g=="id_rujuk") {
                    $rujukan=$this->rekapitulasi_model->getRujukan(array('aktif'=>1));
                    foreach ($rujukan as $p) {
                        $subquery[]=$g ."='".$p->idx."'";
                        ?>
                        <th><?= $p->rujukan ?></th>
                        <?php
                    }
                }elseif ($g=="id_poli") {
                    $poli=$this->rekapitulasi_model->getPoli();
                    foreach ($poli as $p) {
                        $subquery[]=$g ."='".$p->idx."'";
                        ?>
                        <th><?= $p->ruang ?></th>
                        <?php
                    }
                }elseif ($g=="id_dokter") {
                    $dokter=$this->rekapitulasi_model->getDokter(1);
                    foreach ($dokter as $p) {
                        $subquery[]=$g ."='".$p->nrp."'";
                        ?>
                        <th><?= $p->pgwNama ?></th>
                        <?php
                    }
                }
                if($jml==1 && count($group)==1){
                    ?>
                    <th>Jumlah</th>
                    <?php
                }elseif($jml==1 && count($group)>1){
                    ?>
                    <th rowspan="<?= count($group) ?>">Jumlah</th>
                    <?php
                }else{
                    echo "</tr>";
                }
                $jml++;
            }
        }else{
            ?>
            <th style="width: 40px">#</th>
            <th>Tanggal</th>
            <th>Jumlah</th>
            <?php
        }
        ?>
        </tr>
    </thead>
    <tbody id="datariwayat"></tbody>
    <tfoot>
        <tr>
            <td colspan="3" id="pagination"></td>
        </tr>
    </tfoot>
</table>