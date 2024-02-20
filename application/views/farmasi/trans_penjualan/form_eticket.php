<style>
    .rightAlign {
        text-align: right;
    }
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>
<section class="content container-fluid">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">
                        <a href="#" id="btnKembali" class="btn btn-default">
                            <i class="glyphicon glyphicon-new-window"></i> Kembali</a>
                        <a href="#" id="btnRefresh" class="btn btn-default">
                            <i class="glyphicon glyphicon-refresh"></i> Refresh</a>
                        <!--a href="<?php //echo base_url() . "farmasi/trans_penjualan/cetakTicket?kode=" . $KDJL . "&kLok=" . $kLok . "&action=print" ?>" id="btnCetak" class="btn btn-default" target="_blank">
                            <i class="glyphicon glyphicon-print"></i> Cetak Semua</a-->
                        <a href="<?= base_url() . "farmasi/pemakaian_obat/cetakTicket?kode=" . $KDJL ?>" id="btnCetak" class="btn btn-default" target="_blank">
                            <i class="glyphicon glyphicon-print"></i> Cetak Semua</a>
                    </h3>
                    <div class="box-tools">
                    </div>
                </div>

                <div class="box-body table-responsive">
                    <table class="table table-bordered table-striped">
                        <tr>
                            <td width="100px">No Inv</td>
                            <td width="10px" align="center">:</td>
                            <td width="350px"><?php echo $KDJL ?></td>
                            <td width="100px">No MR</td>
                            <td width="10px" align="center">:</td>
                            <td><?php echo $NOMR ?></td>
                        </tr>
                        <tr>
                            <td>Tgl Inv</td>
                            <td align="center">:</td>
                            <td><?php echo date('d-m-Y H:i', strtotime($DTJL)) ?></td>
                            <td>Pasien</td>
                            <td align="center">:</td>
                            <td><?php echo $NMPASIEN ?></td>
                        </tr>
                        <tr>
                            <td>Apotik</td>
                            <td align="center">:</td>
                            <td><?php echo $NMLOKASI ?></td>
                            <td colspan="3">&nbsp;</td>
                        </tr>
                    </table>

                    <table class="table table-bordered table-striped">
                        <thead>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Nama Obat / Alat Kesehatan</th>
                            <th>Aturan Pakai</th>
                            <th style="width: 200px">#</th>

                        </thead>
                        <tbody>
                            <?php
                            $i = 1;
                            foreach ($dataPreview->result_array() as $x) :
                                $tgl_lahir = $this->farmasi_model->getField('tgl_lahir', 'tbl01_pasien', 'nomr', $NOMR);
                                $NMSATUAN = $this->farmasi_model->getField('NMSATUAN', 'tbl04_barang', 'KDBRG', $x["KDBRG"]);

                                $JENISOBAT = explode('#', $x['AP_JENISOBAT']);
                                $SATUAN = explode('#', $x['AP_SATUAN']);
                                $CARAPAKAI = explode('#', $x['AP_CARAPAKAI']);
                                $WAKTUPAKAI = explode('#', $x['AP_WAKTUPAKAI']);
                                $WAKTUKET = explode('#', $x['AP_WAKTUKET']);
                                $KET = explode('#', $x['AP_KET']);
                            ?>
                                <tr>
                                    <td><?php echo $i++; ?></td>
                                    <td><?php echo $x['KDBRG'] ?></td>
                                    <td><?php echo $x['NMBRG'] ?></td>
                                    <td><?php echo $x["AP"]; ?></td>
                                    <td>
                                        <a href="#" onclick="printETicket('<?php echo $NOMR ?>',
                                            '<?php echo $NMPASIEN ?>',
                                            '<?php echo $DTJL ?>',
                                            '<?php echo $x['NMBRG'] ?>',
                                            '<?php echo $x['AP'] ?>',
                                            '<?= $tgl_lahir ?>',
                                            '<?= $x['JMLJUAL'] ?>',
                                            '<?= $NMSATUAN ?>'
                                            )" class="btn btn-danger">Print E-Ticket</a>
                                        <a href="#" onclick="editAP('<?php echo $KDJL ?>','<?php echo $x['KDBRG'] ?>','<?php echo $JENISOBAT[0] ?>','<?= $x["AP_JMLHARI"]; ?>','<?= $x["AP_JMLSATUAN"]; ?>','<?= $SATUAN[0]; ?>','<?= $CARAPAKAI[0]; ?>','<?= $x["AP_WAKTUJML"]; ?>','<?= $WAKTUPAKAI[0]; ?>','<?= $WAKTUKET[0]; ?>','<?= $KET[0]; ?>','<?= $x["AP_EXPDATE"]; ?>')" class="btn btn-danger">Edit AP</a>
                                    </td>
                                </tr>
                            <?php
                            endforeach;
                            ?>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>


<style>
    frame.optionJns {
        overflow: hidden
    }

    div.inline-radio {
        clear: none;
        float: left
    }

    input.radio {
        float: left;
        clear: none;
        margin: 0px 5px 10px 2px;
    }

    label.radio-label {
        float: left;
        clear: none;
        display: block;
        padding: 2px 1em 0 0;
    }

    .inline_field {
        display: inline-table;
        width: 100%;
        border: 0px solid #000;
    }

    .inline_field input[type=checkbox]+span:after {
        content: '%';
    }

    select.popAP {
        padding: 5px 3px
    }

    input.popAP {
        padding: 5px 3px;
        text-align: center;
    }
</style>
<div id="dialogAP" class="modal fade" role="dialog" tabindex="-1" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Set Aturan Pemakaian Obat</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row-fluid" style="margin-top: -10px">
                        <!--div class="span12">
							<div style="border:0px solid #000;margin-bottom:70px">
								<input type="hidden" name="KDJL" id="KDJL">
								<input type="hidden" name="KDBRG" id="KDBRG">
								<frame class="optionJns">
									<legend>Pilih Opsi Jenis Obat</legend>
									<div class="inline-radio">
										<label class="radio-label"><input type="radio" name="optJenis" id="obatDalam" value="1" class="radio" /> Obat Dalam</label>
										<label class="radio-label"><input type="radio" name="optJenis" id="obatLuar" value="2" class="radio" /> Obat Luar</label>
										<label class="radio-label"><input type="radio" name="optJenis" id="obatInjeksi" value="3" class="radio" /> Obat Injeksi</label>
									</div>
								</frame>
							</div>
							
							<div style="border:0px solid #000">
								<table width="100%" border="0">
									<tr style="">
										<th class="group_1" width="80px">Periode<br/>x Sehari</th>
										<th class="group_2" width="150px">Jumlah Satuan</th>
										<th class="group_2" width="300px">Waktu Makan (Jam)</th>
										<th class="group_2" width="150px">Keterangan</th>
										<th class="group_2" width="100px">#</th>
									</tr>
									<tr>
										<td class="group_1">
											<input type="text" name="jmlHari" id="jmlHari" class="popAP" style="width: 50px;"/> 
										</td>
										<td class="group_2">
											<input type="text" name="jmlSatuanAP" id="jmlSatuanAP" class="popAP" style="width:50px;"/>
											<select name="satuanAP" id="satuanAP" class="popAP" style="width: 100px;">
												<option value="1">Tablet</option>
                                                <option value="2">Bungkus</option>
                                                <option value="3">Sdk Obat</option>
                                                <option value="4">Kapsul</option>
                                                <option value="5">Unit</option>
                                                <option value="6">CC</option>
											</select>
										</td>
										<td align="center" class="group_2">
											<input type="text" name="waktu1" id="waktu1" class="popAP" style="width:50px;"/> 
											<select name="waktu3" id="waktu2" class="popAP" style="width: 150px;">
												<option value="1">Sebelum Makan</option>
												<option value="2">Sesudah Makan</option>
												<option value="3">Sewaktu Makan</option>
											</select>
											<select name="waktu3" id="waktu3" class="popAP" style="width: 80px;">
												<option value="1">Pagi</option>
                                                <option value="2">Siang</option>
                                                <option value="3">Malam</option>
                                                <option value="4">Tiap 8 jam</option>
                                                <option value="5">Tiap 12 jam</option>
                                                <option value="6">Tiap 24 jam</option>
                                                <option value="7">Pagi - Malam</option>
                                                <option value="8">Pagi - Siang - Malam</option>
											</select>
										</td>
										<td align="center" class="group_2">
											<select name="keterangan" id="keterangan" class="popAP" style="width: 150px;">
												<option value="1">Dihabiskan</option>
                                                <option value="2">Bila mual atau muntah</option>
                                                <option value="3">Bila mencret</option>
                                                <option value="4">Bila demam</option>
                                                <option value="5">Bila sakit</option>
                                                <option value="6">Bila sesak</option>
                                                <option value="7">Bila batuk</option>
                                                <option value="8">Bila pusing</option>
                                                <option value="9">Bila berdarah</option>
                                                <option value="10">Bila gatal</option>
                                                <option value="11">Bila nyeri dada</option>
                                                <option value="12">Bila bersin-bersin</option>
											</select>
										</td>
										<td align="left">
											<button class="btn btn-danger" type="button" onclick="setAP()">Set AP</button> 
										</td>
									</tr>
								</table>
							</div>
							
                        </div-->
                        <input type="hidden" name="KDJL" id="KDJL">
                        <input type="hidden" name="KDBRG" id="KDBRG">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-4 text-right"><label>Jenis Obat <span style="color: red"> * </span></label></div>
                                        <div class="col-xs-8">
                                            <select name="jenis_obat" id="jenis_obat" class="form-control">
                                                <option value="1">Obat Dalam</option>
                                                <option value="2">Obat Luar</option>
                                                <option value="3">Obat Injeksi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div id="group_1">
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Periode (... X Sehari) <span style="color: red"> * </span></label>
                                            </div>
                                            <div class="col-xs-2">
                                                <input type="text" name="jmlHari" id="jmlHari" class="form-control" />
                                            </div>
                                            <div class="col-xs-2">
                                                <input type="text" name="jmlSatuanAP" id="jmlSatuanAP" class="form-control" />
                                            </div>
                                            <div class="col-xs-4">
                                                <select name="satuanAP" id="satuanAP" class="form-control">
                                                    <option value="1">Tablet</option>
                                                    <option value="2">Bungkus</option>
                                                    <option value="3">Sdk Obat</option>
                                                    <option value="4">Kapsul</option>
                                                    <option value="5">Unit</option>
                                                    <option value="6">CC</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Cara Pakai <span style="color: red"> * </span></label>
                                            </div>

                                            <div class="col-xs-8">
                                                <select name="cara_pakai" id="cara_pakai" class="form-control">

                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Waktu Pakai <span style="color: red"> * </span></label>
                                            </div>
                                            <div class="col-xs-2">
                                                <input type="text" name="waktu1" id="waktu1" class="form-control" />
                                            </div>
                                            <div class="col-xs-6">
                                                <select name="waktu3" id="waktu2" class="form-control">
                                                    <option value="1">Sebelum Makan</option>
                                                    <option value="2">Sesudah Makan</option>
                                                    <option value="3">Sewaktu Makan</option>
                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Keterangan Waktu Pakai <span style="color: red"> * </span></label>
                                            </div>
                                            <div class="col-xs-8">
                                                <select name="waktu3" id="waktu3" class="form-control">
                                                    <option value="1">Pagi</option>
                                                    <option value="2">Siang</option>
                                                    <option value="3">Malam</option>
                                                    <option value="4">Tiap 8 jam</option>
                                                    <option value="5">Tiap 12 jam</option>
                                                    <option value="6">Tiap 24 jam</option>
                                                    <option value="7">Pagi - Malam</option>
                                                    <option value="8">Pagi - Siang - Malam</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Keterangan <span style="color: red"> * </span></label>
                                            </div>

                                            <div class="col-xs-8">
                                                <select name="keterangan" id="keterangan" class="form-control">

                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right">
                                                <label>Gunakan Sebelum <span style="color: red"> * </span></label>
                                            </div>

                                            <div class="col-xs-4">
                                                <input type="text" name="expdate" id="expdate" class="form-control tanggal">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" onclick="setAP()">Set AP</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#btnKembali').click(function() {
            var a = "<?php echo $kLok ?>";
            window.location.href = "<?php echo base_url() . 'farmasi/trans_penjualan/goForm?kLok=' ?>" + a;
        });
        $('#btnRefresh').click(function() {
            window.location.reload();
        });
        $('select').prop('selectedIndex', 0);
        $('#obatDalam').prop('checked', true);

        $('#obatDalam').click(function() {
            $('.group_1').show();
            $('.group_2').show();
        });
        $('#obatLuar').click(function() {
            $('.group_1').show();
            $('.group_2').hide();
        });
        $('#obatInjeksi').click(function() {
            $('.group_1').hide();
            $('.group_2').hide();
        });
        $('#jenis_obat').change(function() {
            var jo = $('#jenis_obat').val();
            if (jo == 3) {
                $('#group_1').hide();
            } else {
                $('#group_1').show();
                getSatuan();
                getCarapakai();
                getWaktupakai();
            }

        });
        $('#jmlHari').change(function() {
            getWaktupakai();
        });
        $('#jenis_obat').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#jmlHari').focus();
            }
        });
        $('#jmlHari').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#jmlSatuanAP').focus();
            }
        });

        $('#jmlSatuanAP').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#satuanAP').focus();
            }
        });

        $('#satuanAP').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                var sa = $('#satuanAP').val();
                if (sa == "Lainnya") {

                } else {
                    $('#cara_pakai').focus();
                }

            }
        });
        $('#cara_pakai').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#waktu1').focus();
            }
        });
        $('#waktu1').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#waktu2').focus();
            }
        });
        $('#waktu2').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#waktu3').focus();
            }
        });
        $('#waktu3').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#keterangan').focus();
            }
        });
        $('#keterangan').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#expdate').focus();
            }
        });
        $('#expdate').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#updateAP').focus();
            }
        });
    });

    function printETicket(a, b, c, d, e, f, g, h) {
        window.open('<?php echo base_url() . 'farmasi/trans_penjualan/eticket?nomr=' ?>' + a + '&nama=' + b + '&tgl=' + c + '&brg=' + d + '&ap=' + e + '&tgl_lahir=' + f + '&jml=' + g + '&satuan=' + h);
    }

    function setAP() {

        var waktu1 = $('#waktu1').val();
        var wm = "";
        if (waktu1 == "0" || waktu1 == "") {
            wm = "";
        } else {
            wm = waktu1 + " Jam ";
        }
        var wm3 = "";
        var waktu3 = $('#waktu3').val();
        if (waktu3 == "") {
            wm3 = "";
        } else {
            wm3 = $('#waktu3 :selected').html() + ",";
        }

        var ket = "";
        var keterangan = $('#keterangan').val();
        if (keterangan == "") {
            ket = "";
        } else {
            ket = $('#keterangan :selected').html();
        }
        var KDJL = $('#KDJL').val();
        var KDBRG = $('#KDBRG').val();
        var formItems = {};
        formItems['KDJL'] = $('#KDJL').val();
        formItems['KDBRG'] = $('#KDBRG').val();
        formItems['AP'] = $('#jmlHari').val() + " x Sehari, " + $('#jmlSatuanAP').val() + " " + $('#satuanAP :selected').html() + ", " + $('#cara_pakai :selected').html() + " " + wm + $('#waktu2 :selected').html() + ", " + wm3 + ket;
        formItems['AP_JENISOBAT'] = $('#jenis_obat').val() + "#" + $('#jenis_obat :selected').html();
        formItems['AP_JMLHARI'] = $('#jmlHari').val();
        formItems['AP_JMLSATUAN'] = $('#jmlSatuanAP').val();
        formItems['AP_SATUAN'] = $('#satuanAP').val() + "#" + $('#satuanAP :selected').html();
        formItems['AP_CARAPAKAI'] = $('#cara_pakai').val() + "#" + $('#cara_pakai :selected').html();
        formItems['AP_WAKTUJML'] = $('#waktu1').val(); //Dalam Jam
        formItems['AP_WAKTUPAKAI'] = $('#waktu2').val() + "#" + $('#waktu2 :selected').html();
        formItems['AP_WAKTUKET'] = $('#waktu3').val() + "#" + $('#waktu3 :selected').html();
        formItems['AP_KET'] = $('#keterangan').val() + "#" + $('#keterangan :selected').html();
        formItems['AP_EXPDATE'] = $('#expdate').val();

        $.ajax({
            url: "<?php echo base_url() . 'farmasi/trans_penjualan/updateAP' ?>",
            type: "POST",
            data: formItems,
            dataType: "JSON",
            success: function(data) {
                if (data.code == 200) {
                    $('#dialogAP').modal('hide');
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                console.log(jqXHR.responseText);
            }
        });
    }

    function editAP(a, b, jenis_obat, jmlHari, jmlSatuanAP, satuanAP, cara_pakai, waktu1, waktu2, waktu3, keterangan, expdate) {
        $('#KDJL').val(a);
        $('#KDBRG').val(b);
        $('#jenis_obat').val(jenis_obat);
        getSatuan();
        getCarapakai();
        $("#jmlHari").val(jmlHari);
        getWaktupakai();
        getKeterangan();

        /*$('#obatDalam').prop('checked',true);
        $('.group_1').show();
        $('.group_2').show();
        $('select').prop('selectedIndex',0);*/
        $("#dialogAP").modal("show");
        $('#dialogAP').on('shown.bs.modal', function(e) {
            $("#jmlSatuanAP").val(jmlSatuanAP);
            $("#satuanAP").val(satuanAP);
            $("#waktu1").val(waktu1);
            $("#waktu2").val(waktu2);

            $("#waktu3").val(waktu3);
            $("#keterangan").val(keterangan);
            $("#expdate").val(expdate);
            $('#jenis_obat').focus();
        });
    }
    var base_url = "<?= base_url() . "farmasi/"; ?>";
</script>

<script src="<?php echo base_url() ?>js/farmasi.js"></script>
