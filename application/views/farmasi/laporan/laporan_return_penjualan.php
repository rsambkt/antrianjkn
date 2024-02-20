<style>
    .modal-content {
        max-height: 600px;
        overflow: scroll;
    }

    .widget-report .widget-user-header {
        padding: 5px 10px;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
    }
</style>
<section class="content container-fluid">
    <div class="row">
        <div class="col-md-4">
            <div class="box box-widget widget-report">
                <div class="widget-user-header bg-aqua-active">
                    <h3><?php echo $contentTitle ?></h3>
                </div>

                <div class="box-body">
                    <h2>Laporan Return Penjualan</h2>
                    <form id="form1" action="#" method="post" onsubmit="return false">
                        <div class="form-group">
                            <div class="col-md-4">Kode Lokasi</div>
                            <div class="col-md-8">
                                <select name="kLok" id="kLok" class='form-control'>
                                    <option value="">Pilih Lokasi</option>
                                    <?php 
                                        foreach ($lokasi as $l ) {
                                            ?>
                                            <option value="<?= $l->KDLOKASI; ?>"><?= $l->NMLOKASI ?></option>
                                            <?php
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4">Periode Awal</div>
                            <div class="col-md-8">
                                <input type="text" name="tglAwal" id="tglAwal" class="form-control tanggal" placeholder="__-__-____" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4">Periode Akhir</div>
                            <div class="col-md-8">
                                <input type="text" name="tglAkhir" id="tglAkhir" class="form-control tanggal" placeholder="__-__-____" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4">&nbsp;</div>
                            <div class="col-md-8">
                                <button type="button" id="cetak" class="btn"><i class="icon-print"></i> Cetak</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.extensions.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('.tanggal').inputmask('dd/mm/yyyy', {
            'placeholder': 'dd/mm/yyyy'
        });
        $('.tanggal').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy"
        });
        $('#tglAwal').val('<?php echo date('d-m-Y'); ?>');
        $('#tglAkhir').val('<?php echo date('d-m-Y'); ?>');

        $('#tglAwal').focus(function() {
            $(this).select()
        });
        $('#tglAkhir').focus(function() {
            $(this).select()
        });
        $('#tglAwal').blur(function() {
            var x = $(this).val();
            if (x == "") {
                $(this).val('<?php echo date('d-m-Y'); ?>');
            }
            if (x.length < 10) {
                $(this).val('<?php echo date('d-m-Y'); ?>');
            }
        });
        $('#tglAkhir').blur(function() {
            var x = $(this).val();
            if (x == "") {
                $(this).val('<?php echo date('d-m-Y'); ?>');
            }
            if (x.length < 10) {
                $(this).val('<?php echo date('d-m-Y'); ?>');
            }
        });
        $('#tglAwal').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#tglAkhir').focus();
            }
        });
        $('#tglAkhir').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#cetak').click();
            }
        });
        $('#cetak').click(function() {
            var a = $('#tglAwal').val();
            var b = $('#tglAkhir').val();
            var c = $('#kLok').val();
            openInNewTab("<?php echo base_url() . 'farmasi/laporan_penjualan/cetak_8?tAwal=' ?>" + a + "&tAkhir=" + b + "&kLok=" + c);
        });

        function openInNewTab(url) {
            var win = window.open(url, '_blank');
            win.focus();
        }
    });
</script>
