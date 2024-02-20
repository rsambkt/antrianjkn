<table class="table table-bordered table-striped" id="dataharian">
    <thead class="bg-green" style="text-align:center">
        <tr>
        <?php 
        if(!empty($group)){
            $jml=1;
            // print_r($group);
            foreach ($group as $key => $g ) {
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
                // echo "<td>$key</td>";
                // print_r($g);
                if($key=="pekerjaan"){
                    // $pekerjaan=$this->rekapitulasi_model->getPekerjaan();
                    // echo $key;
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->pekerjaan_nama."'";
                        ?>
                        <th colspan="<?= $jmlfield ?>"><?= $p->pekerjaan_nama ?></th>
                        <?php
                    }
                }elseif ($key=="id_cara_bayar") {
                    // $carabayar=$this->rekapitulasi_model->getCaraBayar();
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->idx."'";
                        ?>
                        <th><?= $p->cara_bayar ?></th>
                        <?php
                    }
                }elseif ($key=="id_rujuk") {
                    // $rujukan=$this->rekapitulasi_model->getRujukan(array('aktif'=>1));
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->idx."'";
                        ?>
                        <th><?= $p->rujukan ?></th>
                        <?php
                    }
                }elseif ($key=="nama_kabkota") {
                    // $wilayah=array('Padang Panjang','Padang Pariaman','Tanah Datar','Bukittinggi','Lainnya');
                    foreach ($g as $w ) {
                        $subquery[]=$key ."='".$w."'";
                        ?>
                        <th><?= $w ?></th>
                        <?php
                    }
                }elseif ($key=="id_cara_daftar") {
                    // $caradaftar=$this->rekapitulasi_model->getCaraDaftar();
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->idx."'";
                        ?>
                        <th><?= $p->caradaftar ?></th>
                        <?php
                    }
                }elseif ($key=="id_jenis_peserta") {
                    // $jenispeserta=$this->rekapitulasi_model->getJenisPeserta();
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->id_jenis_peserta."'";
                        ?>
                        <th><?= $p->jenis_peserta ?></th>
                        <?php
                    }
                }elseif ($key=="id_poli") {
                    // $poli=$this->rekapitulasi_model->getPoli();
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->idx."'";
                        ?>
                        <th><?= $p->ruang ?></th>
                        <?php
                    }
                }elseif ($key=="id_dokter") {
                    // $dokter=$this->rekapitulasi_model->getDokter(1);
                    foreach ($g as $p) {
                        $subquery[]=$key ."='".$p->nrp."'";
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