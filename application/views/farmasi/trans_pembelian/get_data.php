<?php 
    if($SQL->num_rows() > 0):
        $i = 1 + $offset;
        foreach($SQL->result_array() as $x): 
?>
<tr data-id="<?php echo $x['KDBL']; ?>" class="resultDat">
    <td><?php echo $i++; ?></td>
    <td><?php echo $x['KDBL']; ?></td>
    <td><?php echo date('d-m-Y H:i',strtotime($x['DTBL'])); ?></td>
    <td><?php echo $x['NMSUPPLIER']; ?></td>
    <td><?php echo $x['NOFAKTUR']; ?></td>
    <td><?php echo date('d-m-Y',strtotime($x['TGLFAKTUR'])); ?></td>
    <td><?php echo date('d-m-Y',strtotime($x['TGLTERIMA'])); ?></td>
    <td class="rightAlign"><?php echo number_format($x['GRANDTOT'],0,',','.') ?></td>
    <td><?php echo $x['PEMBAYARAN']; ?></td>
    <td>
        <div class="btnAksi<?php echo $x["KDBL"]; ?>">
            <button class="btn btn-default" onclick="cetak('<?php echo $x['KDBL'] ?>')" title="Print Data">
                <i class="fa fa-print"></i></button>
            <a href="<?= base_url() ."farmasi/trans_pembelian/detail/" .$x["KDBL"] ?>" class='btn btn-warning'><span class='fa fa-search'></span></a>
            <button  class="btn btn-danger" onclick="batal('<?php echo $x['KDBL'] ?>')" title="Retur Data">
                <i class="fa fa-ban"></i></button>
        </div>
    </td>
</tr>
<?php endforeach;?>
<tr>
    <td colspan="10" style="text-align: right"><?php echo $this->ajax_page->create_links(); ?></td>
</tr>
<?php else: ?>
<tr>
    <td colspan="10">Data tidak ditemukan</td>
</tr>
<?php endif; ?>
