<?php
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=DATAOBAT" . date('YmdHis') . ".xls");
header("Pragma: no-cache");
header("Expires: 0")
?>
<style>
    table{
        border:1px solid #fff;
        padding:10px;
        border-collapse:collapse;
    }
</style>
<table id="simple-table" class="table table-bordered table-hover" style='color:#000000;' border="1">
    <thead>
        <tr>
            <th>Tanggal</th>
            <th>Nama Dokter</th>
            <th>Nama Pasien</th>
            <th>Nama Obat</th>
            <th>Inacbg</th>
            <th>Kronis</th>
            <th>Harga Modal</th>
            <th>Total Harga</th>
            <th>Grand Total</th>
        </tr>
    </thead>
    <tbody>
        <?php
        $no = 0;
        $tgl="";
        $dokter="";
        $KDJL="";
        $grandtot=0;
        foreach ($obat as $d) {
            $no++;
            if($grandtot>0 && $KDJL!=$d->KDJL){
                ?>
                <tr>
                    <td></td><td></td><td></td>
                    <td colspan="5">Grand Total</td>
                    <td>Rp. <?= number_format($grandtot,2,",",".") ?></td>
                </tr>
                <?php
                $grandtot=0;
            }
            if($tgl!=$d->TGLJUAL){
                ?>
                <tr>
                    <td colspan="9"><?= $d->TGLJUAL?></td>
                </tr>
                <?php
                $tgl=$d->TGLJUAL;
            }
            if($dokter!=$d->KDDOKTER){
                ?>
                <tr>
                    <td>&nbsp;</td>
                    <td colspan="8"><?= $d->NMDOKTER?></td>
                </tr>
                <?php
                $dokter=$d->KDDOKTER;
            }
            if($KDJL!=$d->KDJL){
                ?>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td colspan="7"><?= $d->KDJL ." - ".$d->NMPASIEN?></td>
                </tr>
                <?php
                $KDJL=$d->KDJL;
                $subtot=$d->JMLJUAL * $d->HMODALJG;
                $grandtot+=$subtot;
                // echo "<br>Grand total = ".$grandtot." + " .$subtot;
                // echo "= ".$grandtot;
            }else{
                $subtot=$d->JMLJUAL * $d->HMODALJG;
                $grandtot+=$subtot;
                // echo "<br>Grand total = ".$grandtot." + " .$subtot;
                // echo "= ".$grandtot;
            }
        ?>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><?= $d->NMBRG ?></td>
                <td><?= $d->INACBG ?></td>
                <td><?= $d->KRONIS ?></td>
                <td>Rp. <?= number_format($d->HMODALJG,2,",",".") ?></td>
                <td>Rp. <?= number_format($d->JMLJUAL * $d->HMODALJG,2,",",".")  ?></td>
                <td></td>
            </tr>
        <?php
        // $grandtot+=$d->JMLJUAL *$d->HMODALJG;
        }
        if($grandtot>0){
            ?>
            <tr>
                <td></td><td></td><td></td>
                <td colspan="5">Grand Total</td>
                <td>Rp. <?= number_format($grandtot,2,",",".") ?></td>
            </tr>
            <?php
            $grandtot=0;
        }
        ?>
    </tbody>
</table>