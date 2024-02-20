<style>
    em {
        font-size: 10px
    }

    .input-group-addon {
        border: none;
    }

    .rightAlign {
        text-align: right;
    }

    .centerAlign {
        text-align: center;
    }

    .conversi {
        border: 1px solid #d2d6de
    }

    .w10 {
        width: 10px;
    }

    .w20 {
        width: 20px;
    }

    .w30 {
        width: 30px;
    }

    .w40 {
        width: 40px;
    }

    .w50 {
        width: 50px;
    }

    .w60 {
        width: 60px;
    }

    .w70 {
        width: 70px;
    }

    .w80 {
        width: 80px;
    }

    .w90 {
        width: 90px;
    }

    .w100 {
        width: 100px;
    }

    .w110 {
        width: 110px;
    }

    .w120 {
        width: 120px;
    }

    .w130 {
        width: 130px;
    }

    .w140 {
        width: 140px;
    }

    .w150 {
        width: 150px;
    }

    .w160 {
        width: 160px;
    }

    .w170 {
        width: 170px;
    }

    .w180 {
        width: 180px;
    }

    .w190 {
        width: 190px;
    }

    .w200 {
        width: 200px;
    }

    .w210 {
        width: 210px;
    }

    .w220 {
        width: 220px;
    }

    .w230 {
        width: 230px;
    }

    .w240 {
        width: 240px;
    }

    .w250 {
        width: 250px;
    }

    .popup-pencarian {
        position: relative;
    }

    .content-pencarian {
        display: inherit;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 5;
        width: 100%;
        /*min-height: 200px;*/
        /*max-height: 500px;*/
        /*min-width: 800px;*/
        /*padding:15px;*/
        background: #fefefe;
        font-size: .875em;
        border-radius: 5px;
        box-shadow: 0 1px 3px #ccc;
        border: 1px solid #ddd;
        /*overflow:hidden;*/
        /*overflow-y: scroll;*/
        background-color: #fefefe;
    }
</style>
<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>
<section class="content container-fluid">
    <div class="row">
        <div class="col-xs-4">
            <div class="box box-success">
                <div class="box-header with-border"></div>
                <div class="box-body">

                    <form id="form1" role="form" onsubmit="return false">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Pembayaran <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group input-group-sm">
                                        <input readonly type="text" name="REG_UNIT" id="REG_UNIT" class="form-control" />
                                        <div class="input-group-btn">
                                            <button class="btn btn-danger" type="button" id="ADD_PASIEN">
                                                <i class="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>No Reg RS <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input readonly="" type="text" name="ID_DAFTAR" id="ID_DAFTAR" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>No MR <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input readonly="" type="text" name="NOMR" id="NOMR" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Nama Pasien <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input readonly="" type="text" name="NMPASIEN" id="NMPASIEN" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Poli / Ruangan <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input type="hidden" name="KDRUANGAN" id="KDRUANGAN" value="">
                                        <input readonly="" type="text" name="NMRUANGAN" id="NMRUANGAN" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Jenis Layanan <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input readonly="" type="text" name="JNSLAYANAN" id="JNSLAYANAN" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Jenis Pasien <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input type="hidden" name="ID_CARA_BAYAR" id="ID_CARA_BAYAR" value="">
                                        <input readonly="" type="text" name="CARA_BAYAR" id="CARA_BAYAR" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Dokter <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <select name="KDDOKTER" id="KDDOKTER" class="form-control">
                                        <?php foreach ($datdokter->result_array() as $x) : ?>
                                            <option value="<?php echo $x['NRP'] ?>"><?php echo $x['pgwNama'] ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>No Resep <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <div class="input-group-sm">
                                        <input type="text" name="NORESEP" id="NORESEP" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Tgl Resep / Tgl Jual <span style="color: red"> * </span></label></div>
                                <div class="col-xs-4">
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="TGLRESEP" id="TGLRESEP" class="form-control tanggal w120" />

                                    </div>
                                </div>
                                <div class="col-xs-4">
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="TGLJUAL" id="TGLJUAL" class="form-control tanggal w120" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>Keterangan <span style="color: red"> * </span></label></div>
                                <div class="col-xs-8">
                                    <textarea name="KETJL" id="KETJL" class="form-control" rows="3" onkeypress="onEnter();"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-4 text-right"><label>&nbsp; </label></div>
                                <div class="col-xs-8">
                                    <button type="button" id="kembali" class="btn btn-danger">
                                        <i class="fa fa-external-link"></i> Kembali</button>
                                    <button type="button" id="simpan" class="btn btn-danger">
                                        <i class="fa fa-floppy-o"></i> Simpan</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        <div class="col-xs-8">
            <div class="box box-success">
                <div class="box-header with-border"></div>
                <div class="box-body">
                    <div class="form-group">
                        <div class="row">
                            <!--div class="col-xs-2"><label>Barang <span style="color: red"> * </span></label></div-->
                            <div class="col-xs-12">
                                <div class="input-group input-group-sm col-sm-4">
                                    <input type="hidden" name="jmldata" id="jmldata" value="" />
                                    <input type="text" name="keyword" id="keyword" class="form-control" placeholder="Cari Barang" onkeyup="getBarangjual(0,'<?= $kLok ?>')" onkeydown="enter_keyword(event)" />
                                    <div class="input-group-btn">
                                        <button class="btn btn-danger" type="button" id="ADDBARANG1" onclick="cariBarangjual(0,'<?= $kLok ?>')">
                                            <i class="fa fa-search"></i></button>
                                    </div>
                                </div>
                                <div id="barang" class="popup-pencarian" style="display: none;">
                                    <div class="content-pencarian">
                                        <input type="hidden" name="show_barang" id="show_barang" value="0">
                                        <table class="table table-bordered table-striped table-hover">
                                            <thead class="bg-green">
                                                <tr>
                                                    <td>Kode Obat</td>
                                                    <td>Nama Obat / Alkes</td>
                                                    <td>Stok</td>
                                                    <td>Kategori</td>
                                                    <td>Harga Jual &amp;</td>
                                                    <td>#</td>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding: 0px;"><input type="text" name="qkode" id="qkode" class="form-control input-sm" onkeyup="getBarangjual(0,'<?= $kLok ?>')" onkeydown="enter_kode(event)" placeholder="Masukkan Kode"></td>
                                                    <td style="padding: 0px;"><input type="text" name="qnama" id="qnama" class="form-control input-sm" onkeyup="getBarangjual(0,'<?= $kLok ?>')" onkeydown="enter_nama(event)" placeholder="Masukan Nama Barang"></td>
                                                    <td style="padding: 0px;"><input type="text" name="qsatuan" id="qsatuan" class="form-control input-sm" onkeyup="getBarangjual(0,'<?= $kLok ?>')" onkeydown="enter_satuan(event)" placeholder="Masukkan satuan"></td>
                                                    <td style="padding: 0px;"><input type="text" name="qkategori" id="qkategori" class="form-control input-sm" onkeyup="getBarangjual(0,'<?= $kLok ?>')" onkeydown="enter_kategori(event)" placeholder="Masukkan Kategori"></td>
                                                    <td colspan="2"></td>
                                                </tr>
                                            </tbody>
                                            <tbody id="data-barang"></tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="5" style="text-align: right;">
                                                        <div id="pagination"></div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered table-striped">
                        <thead>

                            <tr>
                                <th>Nama Obat / Alkes</th>
                                <th width="80px">Stok</th>
                                <th width="110px">Harga Jual</th>
                                <th width="80px">Jumlah</th>
                                <th width="100px">Diskon</th>
                                <th width="80px">R</th>
                                <th width="110px">Total</th>
                                <th width="110px">Aturan Pakai</th>
                                <th width="120px">#</th>
                            </tr>
                        </thead>

                        <tbody id="getTemp"></tbody>
                        <tbody>
                            <tr>
                                <td colspan="7" style="text-align: right;"><b>Grand Total</b></td>
                                <td colspan="2">
                                    <div class="input-group-sm">
                                        <input readonly type="text" name="GRANDTOTAL" id="GRANDTOTAL" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<div id="dialogPasien" class="modal fade" role="dialog" tabindex="-1" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Cari Data Pasien</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row-fluid" style="margin-top: -10px">
                        <div class="span12">
                            <form id="frmCariPasien" method="get" class="form-horizontal" onsubmit="return false">
                                <div class="control-group">
                                    <label class="control-label">Pencarian Data Pasien</label>
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="keywordCariPasien" id="keywordCariPasien" class="form-control" />
                                        <div class="input-group-btn">
                                            <button class="btn btn-danger" type="button" id="btnKeywordCariPasien">
                                                <i class="fa fa-search"></i> Cari Pasien</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr />

                            <div style="border-style: double;height: 250px;padding: 2px;overflow: scroll;">
                                <table class="table table-bordered table-striped" style="font-size: 1.0em">
                                    <thead>
                                        <tr>
                                            <th width="100px">Reg Unit</th>
                                            <th width="100px">Reg RS</th>
                                            <th width="80px">No MR</th>
                                            <th>Nama Pasien</th>
                                            <th>Poli/Ruang</th>
                                            <th width="100px">Jns.Layanan</th>
                                            <th width="100px">Jns.Pasien</th>
                                            <th width="70px">#</th>
                                        </tr>
                                    </thead>
                                    <tbody id="getDataPasienCari">
                                        <tr>
                                            <td colspan="9">Klik atau Enter Pada textbox pencarian untuk menampilkan data</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="formModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Cari Obat / Alat Kesehatan</h4>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row-fluid" style="margin-top: -10px">
                        <div class="span12">
                            <form id="form1" method="get" class="form-horizontal" onsubmit="return false">
                                <div class="control-group">
                                    <label class="control-label">Pencarian Data Obat / Alat Kesehatan</label>
                                    <div class="input-group input-group-sm">
                                        <input type="text" name="keywordCariObat" id="keywordCariObat" class="form-control" />
                                        <div class="input-group-btn">
                                            <button class="btn btn-danger" type="button" id="btnKeywordCariObat">
                                                <i class="fa fa-search"></i> Cari Kode / Nama Obat</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <div style="border-style: double;height: 250px;padding: 2px;overflow: scroll;">
                                <table class="table table-bordered table-striped" style="font-size: 1.2em">
                                    <thead>
                                        <tr>
                                            <th width="80px">Kode</th>
                                            <th>Nama Obat / Alkes</th>
                                            <th>Stok</th>
                                            <th>Harga Jual</th>
                                            <th width="70px">#</th>
                                        </tr>
                                    </thead>
                                    <tbody id="getDataObatCari"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_transaksi" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Transaksi Penjualan Obat</h4>
            </div>
            <form id="form2" action="#" method="post" onsubmit="return false">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <!--form id="form" method="POST" action=""-->
                            <div class="col-md-6">
                                <fieldset>
                                    <legend>Data Barang</legend>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>NAMA BARANG </label></div>
                                            <div class="col-xs-8">

                                                <input type="hidden" name="KDBRG" id="KDBRG" value="">
                                                <input type="text" readonly name="NMBRG" id="NMBRG" class="form-control" value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>STOK </label></div>
                                            <div class="col-xs-4">
                                                <div class="input-group-sm">
                                                    <input readonly type="text" name="JSTOK" id="JSTOK" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>HARGA JUAL </label></div>
                                            <div class="col-xs-8">
                                                <div class="input-group-sm">
                                                    <input type="text" name="HJUAL" id="HJUAL" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>JUMLAH </label></div>
                                            <div class="col-xs-8">
                                                <div class="input-group-sm">
                                                    <input type="text" name="JMLJUAL" id="JMLJUAL" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>DISKON </label></div>
                                            <div class="col-xs-3">
                                                <div class="input-group input-group-sm">
                                                    <input type="text" name="DISKON_P" id="DISKON_P" maxlength="3" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                    <div class="input-group-btn input-group-sm">
                                                        <button class="btn btn-sm">%</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xs-5">
                                                <div class="input-group-sm">
                                                    <input type="text" name="DISKON" id="DISKON" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>R </label></div>
                                            <div class="col-xs-4">
                                                <div class="input-group-sm">
                                                    <input readonly="" type="text" name="R" id="R" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-xs-4 text-right"><label>TOTAL </label></div>
                                            <div class="col-xs-8">
                                                <div class="input-group-sm">
                                                    <input readonly="" type="text" name="SUBTOTAL" id="SUBTOTAL" class="form-control inputmask rightAlign" data-inputmask="'alias': 'decimal', 'groupSeparator': ',', 'autoGroup': true, 'digits': 0, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-md-6">
                                <fieldset>
                                    <legend>Aturan Pakai</legend>
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
                                        <!--div class="form-group">
                                    <div class="row">
                                        <div class="col-xs-4 text-right">
                                            <label>Gunakan Sebelum <span style="color: red"> * </span></label>
                                        </div>
                                        
                                        <div class="col-xs-4">
                                            <input type="text" name="expdate" id="expdate" class="form-control tanggal">
                                        </div>
                                        
                                    </div>
                                </div-->
                                    </div>

                                </fieldset>
                            </div>
                            <!--/form-->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="simpanTemp" type="button" class="btn btn-danger">
                        <i class="fa fa-add"></i> Tambah</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>

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

<!--div id="dialogAP" class="modal fade" role="dialog" tabindex="-1" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Set Aturan Pemakaian Obat</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <div class="row">
                        <div class="col-xs-3 text-right"><label>Jenis Obat <span style="color: red"> * </span></label></div>
                        <div class="col-xs-4">
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
                            <div class="col-xs-3 text-right">
                                <label>Periode (... X Sehari) <span style="color: red"> * </span></label>
                            </div>
                            <div class="col-xs-2">
                                <input type="text" name="jmlHari" id="jmlHari" class="form-control" />
                            </div>
                            <div class="col-xs-2">
                                <input type="text" name="jmlSatuanAP" id="jmlSatuanAP" class="form-control" />
                            </div>
                            <div class="col-xs-3">
                                <select name="satuanAP" id="satuanAP" class="form-control" >
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
                            <div class="col-xs-3 text-right">
                                <label>Cara Pakai <span style="color: red"> * </span></label>
                            </div>
                            
                            <div class="col-xs-4">
                                <select name="cara_pakai" id="cara_pakai" class="form-control" >
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
                            <div class="col-xs-3 text-right">
                                <label>Waktu Pakai <span style="color: red"> * </span></label>
                            </div>
                            <div class="col-xs-2">
                                <input type="text" name="waktu1" id="waktu1" class="form-control" /> 
                                
                            </div>
                            <div class="col-xs-3">
                                <select name="waktu3" id="waktu2" class="form-control">
                                                    <option value="1">Sebelum Makan</option>
                                                    <option value="2">Sesudah Makan</option>
                                                    <option value="3">Sewaktu Makan</option>
                                                </select>
                            </div>
                            <div class="col-xs-3">
                                <select name="waktu3" id="waktu3" class="form-control" >
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
                            <div class="col-xs-3 text-right">
                                <label>Keterangan <span style="color: red"> * </span></label>
                            </div>
                            
                            <div class="col-xs-4">
                                <select name="keterangan" id="keterangan" class="form-control" >
                                    
                                </select>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="form-group">
                        <div class="row">
                            <div class="col-xs-3 text-right">
                                <label>Gunakan Sebelum <span style="color: red"> * </span></label>
                            </div>
                            
                            <div class="col-xs-4">
                                <input type="text" name="expdate" id="expdate" class="form-control tanggal">
                            </div>
                            
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" id="setAP" onclick="setAP()">Set AP</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div-->

<script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="<?php echo base_url() ?>assets/plugins/input-mask/jquery.inputmask.extensions.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#ADD_PASIEN').focus();
        $(".inputmask").inputmask();
        $('input,textarea').focus(function() {
            return $(this).select();
        });
        $('#KDDOKTER').select2({
            placeholder: "Pilih option"
        });
        $('.tanggal').inputmask('dd/mm/yyyy', {
            'placeholder': 'dd/mm/yyyy'
        });
        $('.tanggal').datepicker({
            autoclose: true,
            format: "dd/mm/yyyy"
        });

        $('#kembali').click(function() {
            var a = "<?php echo $kLok ?>";
            window.location.href = "<?php echo base_url() . 'farmasi/trans_penjualan' ?>";
        });

        function kosongkanObjEntry() {
            $('#REG_UNIT').val('');
            $('#NOMR').val('');
            $('#ID_DAFTAR').val('');
            $('#NMPASIEN').val('');
            $('#KDRUANGAN').val('');
            $('#NMRUANGAN').val('');
            $('#JNSLAYANAN').val('');
            $('#ID_CARA_BAYAR').val('');
            $('#CARA_BAYAR').val('');
            $('#KDDOKTER').val('').trigger('change');
            $('#NORESEP').val('');
            $('#TGLRESEP').val('');
            $('#TGLJUAL').val('');
            $('#KETJL').val('');
        }

        function kosongkanObjTemp() {
            $('#KDBRG').val('');
            $('#NMBRG').val('');
            $('#JSTOK').val('0');
            $('#HJUAL').val('0');
            $('#JMLJUAL').val('0');
            $('#DISKON').val('0');
            $('#DISKON_P').val('0');
            $('#R').val('750');
            $('#SUBTOTAL').val('0');
            $('#jenis_obat').val('1');
            $('#jmlHari').val('');
            $('#jmlSatuanAP').val('');
            $('#satuanAP').val('1');
            $('#cara_pakai').val('1');
            $('#waktu1').val('0');
            $('#waktu2').val('');
            $('#waktu3').val('');
            $('#keterangan').val('1');
            $('#expdate').val('');

            $('#setAturanPakai').html("Set AP");
        }

        $('#satuanAP').prop('selectedIndex', 0);
        $('#waktu2').prop('selectedIndex', 0);
        $('#waktu3').prop('selectedIndex', 0);
        $('#keterangan').prop('selectedIndex', 0);

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

        kosongkanObjEntry();
        kosongkanObjTemp();
        getTemp();
        emptyTemp();

        $('#btnKeywordCariPasien').click(function() {
            var a = $('#keywordCariPasien').val();
            $.ajax({
                url: "<?php echo base_url() . 'farmasi/trans_penjualan/getPasien' ?>",
                type: "POST",
                data: {
                    keyword: a
                },
                beforeSend: function() {
                    $('#getDataPasienCari').html("<tr><td colspan=9><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                },
                success: function(data) {
                    $('#getDataPasienCari').html(data);
                    $('tr.resultDat').each(function() {
                        var a = $(this).data('id');
                        $.ajax({
                            url: "<?php echo base_url() . 'farmasi/trans_penjualan/cekRetur' ?>",
                            type: "POST",
                            data: {
                                reg_unit: a
                            },
                            dataType: "JSON",
                            success: function(data) {
                                if (data.code == 200) {
                                    $('button#' + a).parent('.btnAksi').append('Reg.Batal');
                                    $('button#' + a).remove();
                                }
                            },
                            error: function(jqXHR, ajaxOption, errorThrown) {
                                console.log(jqXHR.responseText);
                            }
                        });
                    });
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    $('#getDataPasienCari').html('<tr><td colspan=9>Data tidak ditemukan</td></tr>');
                    console.log(jqXHR.responseText);
                }
            });
        });
        $('#keywordCariPasien').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                var a = $('#keywordCariPasien').val();
                $.ajax({
                    url: "<?php echo base_url() . 'farmasi/trans_penjualan/getPasien' ?>",
                    type: "POST",
                    data: {
                        keyword: a
                    },
                    beforeSend: function() {
                        $('#getDataPasienCari').html("<tr><td colspan=9><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                    },
                    success: function(data) {
                        $('#getDataPasienCari').html(data);
                        $('tr.resultDat').each(function() {
                            var a = $(this).data('id');
                            $.ajax({
                                url: "<?php echo base_url() . 'farmasi/trans_penjualan/cekRetur' ?>",
                                type: "POST",
                                data: {
                                    reg_unit: a
                                },
                                dataType: "JSON",
                                success: function(data) {
                                    if (data.code == 200) {
                                        $('button#' + a).parent('.btnAksi').append('Reg.Batal');
                                        $('button#' + a).remove();
                                    }
                                },
                                error: function(jqXHR, ajaxOption, errorThrown) {
                                    console.log(jqXHR.responseText);
                                }
                            });
                        });
                    },
                    error: function(jqXHR, ajaxOption, errorThrown) {
                        $('#getDataPasienCari').html('<tr><td colspan=9>Data tidak ditemukan</td></tr>');
                        console.log(jqXHR.responseText);
                    }
                });
            }
        });


        $('#btnKeywordCariObat').click(function() {
            var a = $('#keywordCariObat').val();
            var b = "<?php echo $kLok ?>";
            $.ajax({
                url: "<?php echo base_url() . 'farmasi/trans_penjualan/getObat' ?>",
                type: "POST",
                data: {
                    keyword: a,
                    KDLOKASI: b
                },
                beforeSend: function() {
                    $('tbody#getDataObatCari').html("<tr><td colspan=5><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                },
                success: function(data) {
                    $('#getDataObatCari').html(data);
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    $('tbody#getDataObatCari').html('<tr><td colspan=5>Data tidak ditemukan</td></tr>');
                    console.log(errorThrown);
                }
            });
        });

        $('#keywordCariObat').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                var a = $('#keywordCariObat').val();
                var b = "<?php echo $kLok ?>";
                $.ajax({
                    url: "<?php echo base_url() . 'farmasi/trans_penjualan/getObat' ?>",
                    type: "POST",
                    data: {
                        keyword: a,
                        KDLOKASI: b
                    },
                    beforeSend: function() {
                        $('tbody#getDataObatCari').html("<tr><td colspan=5><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                    },
                    success: function(data) {
                        $('tbody#getDataObatCari').html(data);
                    },
                    error: function(jqXHR, ajaxOption, errorThrown) {
                        $('tbody#getDataObatCari').html('<tr><td colspan=5>Data tidak ditemukan</td></tr>');
                        console.log(errorThrown);
                    }
                });
            }
        });


        $("#simpanTemp").click(function() {
            /*
            AP_JENISOBAT
             AP_JMLHARI
             AP_JMLSATUAN
             AP_CARAPAKAI
             AP_WAKTUJML
             AP_WAKTUPAKAI
             AP_WAKTUKET
             AP_KET
             AP_EXPDATE
            */
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

            var formItems = {};
            formItems['KDBRG'] = $('#KDBRG').val();
            formItems['NMBRG'] = $('#NMBRG').val();
            formItems['JSTOK'] = $('#JSTOK').val();
            formItems['HJUAL'] = $('#HJUAL').val();
            formItems['JMLJUAL'] = $('#JMLJUAL').val();
            formItems['DISKON'] = $('#DISKON').val();
            formItems['R'] = $('#R').val();
            formItems['SUBTOTAL'] = $('#SUBTOTAL').val();
            formItems['AP'] = $('#jmlHari').val() + " x Sehari, " + $('#jmlSatuanAP').val() + " " + $('#satuanAP :selected').html() + ", " + $('#cara_pakai :selected').html() + " " + wm + $('#waktu2 :selected').html() + ", " + wm3 + ket;

            //$('#dokterJaga :selected').html()
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

            if (formItems['KDBRG'] == "") {
                $('#ADDBARANG').click();
            } else if (formItems['JSTOK'] == "" || formItems['JSTOK'] == "0") {
                alert("Stok tidak boleh kosong");
            } else if (formItems['HJUAL'] == "" || formItems['HJUAL'] == "0") {
                alert("Harga jual tidak boleh kosong");
            } else if (formItems['JMLJUAL'] == "" || formItems['JMLJUAL'] == "0") {
                alert("Jumlah jual masih kosong");
                $('#JMLJUAL').focus();
            } else if (formItems['R'] == "" || formItems['R'] == "0") {
                alert("Nilai R tidak boleh kosong. Silahkan refresh browser anda!");
            } else if (formItems['SUBTOTAL'] == "" || formItems['SUBTOTAL'] == "0") {
                alert("Subtotal tidak boleh kosong. Silahkan refresh browser anda!");
            } else {
                $.ajax({
                    url: "<?php echo base_url() . 'farmasi/trans_penjualan/simpanTemp' ?>",
                    type: "POST",
                    data: formItems,
                    dataType: "JSON",
                    success: function(data) {
                        getTemp();
                        if (data.code == 200) {
                            var masih = confirm("Apakah Masih ada data?");
                            if (masih == true) {
                                $('#keyword').focus();
                                $('#barang').hide();
                            } else {
                                $('#simpan').focus();
                                $('#barang').hide();
                            }
                            kosongkanObjTemp();
                            $("#modal_transaksi").modal("hide");

                        } else {
                            alert(data.message);
                        }
                    },
                    error: function(xhr, ajaxOption, thrownError) {
                        console.log('Response : ' + thrownError);
                    }
                });
            }
        });

        $('#simpan').click(function() {
            var formdata = {}
            formdata['REG_UNIT'] = $('#REG_UNIT').val();
            formdata['ID_DAFTAR'] = $('#ID_DAFTAR').val();
            formdata['NOMR'] = $('#NOMR').val();
            formdata['NMPASIEN'] = $('#NMPASIEN').val();
            formdata['KDRUANGAN'] = $('#KDRUANGAN').val();
            formdata['NMRUANGAN'] = $('#NMRUANGAN').val();
            formdata['JNSLAYANAN'] = $('#JNSLAYANAN').val();
            formdata['ID_CARA_BAYAR'] = $('#ID_CARA_BAYAR').val();
            formdata['CARA_BAYAR'] = $('#CARA_BAYAR').val();
            formdata['KDLOKASI'] = "<?php echo $kLok; ?>";
            formdata['NMLOKASI'] = "<?php echo getLokasiById($kLok); ?>";
            formdata['KDDOKTER'] = $('#KDDOKTER').val();
            formdata['NMDOKTER'] = $('#KDDOKTER :selected').html();
            formdata['NORESEP'] = $('#NORESEP').val();
            formdata['TGLRESEP'] = $('#TGLRESEP').val();
            formdata['TGLJUAL'] = $('#TGLJUAL').val();
            formdata['KETJL'] = $('#KETJL').val();

            if (formdata['REG_UNIT'] == "") {
                alert("Registrasi unit tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['ID_DAFTAR'] == "") {
                alert("Registrasi RS tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['NOMR'] == "") {
                alert("No. MR tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['NMPASIEN'] == "") {
                alert("Nama Pasien tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['KDRUANGAN'] == "" || formdata['NMRUANGAN'] == "") {
                alert("Poli/Ruang tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['JNSLAYANAN'] == "") {
                alert("Jenis pelayanan tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['ID_CARA_BAYAR'] == "" || formdata['CARA_BAYAR'] == "") {
                alert("Jenis pasien tidak boleh kosong. Silahkan pilih data pendaftaran pasien");
            } else if (formdata['KDLOKASI'] == "" || formdata['NMLOKASI'] == "") {
                alert("Lokasi tidak ditemukan. Silahkan refresh browser anda");
            } else if (formdata['KDDOKTER'] == "") {
                alert("Dokter belum dipilih. Silahkan pilih dokter");
                $('#KDDOKTER').focus();
            } else if (formdata['NORESEP'] == "") {
                alert("No resep tidak boleh kosong");
                $('#NORESEP').focus();
            } else if (formdata['TGLRESEP'] == "") {
                alert("Tanggal resep tidak boleh kosong");
                $('#TGLRESEP').focus();
            } else if (formdata['TGLJUAL'] == "") {
                alert("Tanggal jual tidak boleh kosong");
                $('#TGLJUAL').focus();
            } else if (formdata['KDLOKASI'] == "") {
                alert("Lokasi Asal barang tidak ditemukan. Silahkan refresh browser anda.");
            } else {
                $.ajax({
                    url: "<?php echo base_url() . 'farmasi/trans_penjualan/simpan' ?>",
                    type: "POST",
                    data: formdata,
                    dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        $('#simpan').prop('disabled', true);
                    },
                    success: function(data) {
                        if (data.code == 200) {
                            kosongkanObjEntry();
                            kosongkanObjTemp();
                            getTemp();
                            window.open('<?php echo base_url() . 'farmasi/trans_penjualan/cetakTicket?kode=' ?>' + data.message + "&kLok=<?= $kLok ?>" + "&action=print");
                        } else {
                            alert(data.message);
                        }
                    },
                    error: function(jqXHR, ajaxOption, errorThrown) {
                        console.log(jqXHR.responseText);
                    },
                    complete: function() {
                        $('#simpan').prop('disabled', false);
                    }
                });
            }
        });

        $('#NORESEP').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                var x = $('#NORESEP').val();
                if (x == "") {
                    this.focus();
                } else {
                    $('#TGLRESEP').focus();
                }

            }
        });
        $('#TGLRESEP').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#TGLJUAL').focus();
            }
        });
        $('#TGLJUAL').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#KETJL').focus();
            }
        });

        $('#HJUAL').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#JMLJUAL').focus();
            }
        });
        $('#JMLJUAL').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                var jmlJual = parseInt($('#JMLJUAL').val());
                if (jmlJual == 0) {
                    this.focus();
                } else {
                    $('#DISKON_P').focus();
                }

            }
        });
        $('#DISKON_P').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#DISKON').focus();
            }
        });
        $('#DISKON').keyup(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#jenis_obat').focus();
            }
        });

        $('#HJUAL').keypress(function(ev) {
            calcSummary();
        });
        $('#JMLJUAL').keypress(function(ev) {
            calcSummary();
        });
        $('#DISKON_P').keypress(function(ev) {
            var a = $(this).val();
            if (parseFloat(a) > 100) {
                $('#DISKON_P').val(a.substring(1, a.length - 1));
                return $(this).select();
            }
            calcSummary();

        });
        $('#DISKON').keypress(function(ev) {
            calcSummary();
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
                $('#simpanTemp').focus();
            }
        });
        $('#expdate').keypress(function(ev) {
            var event = ev.keyCode | ev.witch;
            if (event == 13) {
                $('#simpanTemp').focus();
            }
        });

        /*$('#keterangan').keypress(function(ev){
            var event = ev.keyCode | ev.witch;
            if(event==13){
                $('#setAP').focus();
            }
        });*/


        $('#ADDBARANG').click(function() {
            kosongkanObjTemp();
            $('#keywordCariObat').val("");
            $('#getDataObatCari').html("<tr><td colspan=5>Klik atau Enter Pada textbox pencarian untuk menampilkan data</td></tr>");
            $("#formModal").modal("show");
            $('#formModal').on('shown.bs.modal', function(e) {
                // do something...
                $('#keywordCariObat').focus();
            });
        });

        $('#setAturanPakai').click(function() {
            var KDBRG = $('#KDBRG').val();
            if (KDBRG == "") {
                alert('Obat belum dipilih');
            } else {
                $('#AP').val('');
                $('#setAturanPakai').html('Set AP');

                $("#jmlHari").val("1");
                $("#jmlSatuanAP").val("1");
                $("#waktu1").val("1");

                $('#obatDalam').prop('checked', true);
                $('.group_1').show();
                $('.group_2').show();

                $('#satuanAP').prop('selectedIndex', 0);
                $('#waktu2').prop('selectedIndex', 0);
                $('#waktu3').prop('selectedIndex', 0);
                $('#keterangan').prop('selectedIndex', 0);

                $("#dialogAP").modal("show");
                $('#dialogAP').on('shown.bs.modal', function(e) {
                    // do something...
                    $('#jenis_obat').focus();
                    getSatuan();
                    getCarapakai();
                    getWaktupakai();
                    getKeterangan();
                });
            }

        });

        function calcSummary() {
            var a = $('#HJUAL').val().replace(',', '').replace(',', '').replace(',', '');
            var b = $('#JMLJUAL').val().replace(',', '').replace(',', '').replace(',', '');
            var c = $('#DISKON_P').val().replace(',', '').replace(',', '').replace(',', '');
            var d = $('#R').val().replace(',', '').replace(',', '').replace(',', '');

            a = (a == '' || isNaN(a)) ? 0 : a;
            b = (b == '' || isNaN(b)) ? 0 : b;
            c = (c == '' || isNaN(c)) ? 0 : c;
            d = (d == '' || isNaN(d)) ? 0 : d;

            var totBruto = parseFloat(a) * parseFloat(b);
            totBruto = (totBruto == '' || isNaN(totBruto)) ? 0 : totBruto;

            if (c == '' || c == '0') {

                var e = $('#DISKON').val().replace(',', '').replace(',', '').replace(',', '');
                e = (e == '' || isNaN(e)) ? 0 : e;

            } else {
                var e = parseFloat(totBruto) * parseFloat(c) / 100;
                e = (e == '' || isNaN(e)) ? 0 : e;
                $('#DISKON').val(e);
            }

            var f = parseFloat(totBruto) + parseFloat(d) - parseFloat(e);
            f = (f == '' || isNaN(f)) ? 0 : f;

            $('#SUBTOTAL').val(f);
        }

        $('#ADD_PASIEN').click(function() {
            $('#REG_UNIT').val("");
            $('#ID_DAFTAR').val("");
            $('#NOMR').val("");
            $('#NMPASIEN').val("");
            $('#ALMTPASIEN').val("");
            $('#KDRUANGAN').val("");
            $('#NMRUANGAN').val("");
            $('#JNSLAYANAN').val("");
            $('#ID_CARA_BAYAR').val("");
            $('#CARA_BAYAR').val("");

            $('#keywordCariPasien').val("");
            $('#getDataPasienCari').html("<tr><td colspan=9>Klik atau Enter Pada textbox pencarian untuk menampilkan data</td></tr>");
            $("#dialogPasien").modal("show");

            $('#dialogPasien').on('shown.bs.modal', function(e) {
                // do something...
                $('#keywordCariPasien').focus();
            });
            //setTimeout('focus_keyword',1000);

        });

    });

    function getTemp() {
        $.ajax({
            url: "<?php echo base_url() . 'farmasi/trans_penjualan/getTemp' ?>",
            beforeSend: function() {
                $('tbody#getTemp').html("<tr><td colspan=5><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
            },
            success: function(data) {
                $('tbody#getTemp').html(data);
                getTotal();
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                $('tbody#getTemp').html('<tr><td colspan=5>Data tidak ditemukan</td></tr>');
                console.log(jqXHR.responseText);
            }
        });
    }

    function emptyTemp() {
        $.ajax({
            url: "<?php echo base_url() . 'farmasi/trans_penjualan/emptyTemp' ?>",
            success: function(data) {
                getTemp();
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                console.log(jqXHR.responseText);
            }
        });
    }

    function getTotal() {
        $.ajax({
            url: "<?php echo base_url() . 'farmasi/trans_penjualan/getTotalTemp' ?>",
            dataType: "JSON",
            beforeSend: function() {
                $('#GRANDTOTAL').val("0");
            },
            success: function(data) {
                $('#GRANDTOTAL').val(data.TOTAL);
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                $('#GRANDTOTAL').val("0");
                console.log(jqXHR.responseText);
            }
        });
    }

    function pilihObat(a, b, c, d) {
        $('#KDBRG').val(a);
        $('#NMBRG').val(urldecode(b));
        $('#JSTOK').val(c);
        $('#HJUAL').val(d);
        $('#JMLJUAL').val("0");
        $('#DISKON_P').val("0");
        $('#DISKON').val("0");
        $('#R').val("750");
        $('#SUBTOTAL').val("0");
        $('#setAturanPakai').html("Set AP");
        $('#AP').val("");
        $('#formModal').modal('hide');
        $('#JMLJUAL').focus();
    }

    function setPasien(a) {
        $.ajax({
            url: "<?php echo base_url() . 'farmasi/trans_penjualan/getPendaftaran' ?>",
            type: "POST",
            data: {
                reg_unit: a
            },
            dataType: "JSON",
            success: function(data) {

                if (data.code == 200) {
                    console.log(data);
                    $('#REG_UNIT').val(data.response.reg_unit);
                    $('#ID_DAFTAR').val(data.response.id_daftar);
                    $('#NOMR').val(data.response.nomr);
                    $('#NMPASIEN').val(data.response.nama_pasien);
                    $('#KDRUANGAN').val(data.response.id_ruang);
                    $('#NMRUANGAN').val(data.response.nama_ruang);
                    $('#JNSLAYANAN').val(data.response.jns_layanan);
                    $('#ID_CARA_BAYAR').val(data.response.id_cara_bayar);
                    $('#CARA_BAYAR').val(data.response.cara_bayar);
                    $('#KDDOKTER').val(data.response.dokterJaga);
                    $("#KDDOKTER").select2().select2('val', data.response.dokterJaga);
                    $('#KDDOKTER').val(data.response.dokterJaga).trigger('change');
                    //$('#KDDOKTER').select2('data', {id: data.response.dokter_pengirim, a_key: data.response.nama_dokter_pengirim});
                    //alert(data.response.dokter_pengirim);
                    $('#dialogPasien').modal('hide');
                    $('#NORESEP').focus();
                } else {
                    alert('Ops. Data tidak ditemukan. Silahkan Coba kembali');
                }
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                console.log(jqXHR.responseText);
            }
        });
    }

    function hapusTemp(a) {
        var x = confirm("Apakah anda yakin akan menghapus data ini?");
        if (x) {
            $.ajax({
                url: "<?php echo base_url() . 'farmasi/trans_penjualan/hapusTemp' ?>",
                type: "POST",
                data: {
                    IDX: a
                },
                dataType: "JSON",
                success: function(data) {
                    alert(data.message);
                    getTemp();
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(jqXHR.responseText);
                }
            });
        }
    }

    function urlencode(str) {
        str = (str + '').toString();
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    }

    function urldecode(str) {
        return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function() {
            return '%25'
        }).replace(/\+/g, '%20'))
    }

    function setAP1() {
        var GR = $('input[type=radio]:checked').val();
        var setAP = "";

        var SAP = ['Tablet', 'Bungkus', 'Sendok Obat', 'Kapsul', 'Unit', 'CC'];
        var WAP = ['Sebelum Makan', 'Sesudah Makan', 'Sewaktu Makan'];
        var WAP2 = ['Pagi', 'Siang', 'Malam', 'Tiap 8 jam', 'Tiap 12 jam', 'Tiap 24 jam', 'Pagi - Malam', 'Pagi - Siang - Malam'];
        var KAP = ['Dihabiskan', 'Bila mual atau muntah', 'Bila mencret', 'Bila demam', 'Bila sakit', 'Bila sesak', 'Bila batuk', 'Bila pusing', 'Bila berdarah', 'Bila gatal', 'Bila nyeri dada', 'Bila bersin-bersin'];

        var a = $('#jmlHari').val();
        var b = $('#jmlSatuanAP').val();
        var c = $('#satuanAP').val();
        var d = $('#waktu1').val();
        var e = $('#waktu2').val();
        var f = $('#waktu3').val();
        var g = $('#keterangan').val();

        if (GR == "1") {
            var deskJam = "";
            deskJam = (d == "") ? "" : " Jam ";
            setAP = GR + ',' + a + ' x Sehari,' + b + ' ' + SAP[c - 1] + ',' + d + deskJam + WAP[e - 1] + ',' + WAP2[f - 1] + ',' + KAP[g - 1];
        } else if (GR == "2") {
            setAP = GR + ',' + a + ' x Sehari,Dioleskan tipis-tipis pada bagian yang sakit';
        } else if (GR == "3") {
            setAP = GR + ',OBAT INJEKSI';
        }

        $('#AP').val(setAP);

        var myarr = setAP.split(",");
        if (myarr[0] == "1") {
            var setViewAP = myarr[1] + ',' + myarr[2] + ',' + myarr[3] + ',' + myarr[4] + ',' + myarr[5];
        } else if (myarr[0] == "2") {
            setViewAP = myarr[1] + ',' + myarr[2];
        } else if (myarr[0] == "3") {
            setViewAP = myarr[1];
        } else {
            setViewAP = 'Set AP';
        }
        $('#setAturanPakai').html(setViewAP);

        $('#dialogAP').modal('hide');
    }

    function setAP() {
        var jenis_obat = $('#jenis_obat').val();
        var setAP = "jenis_obat";

        var jmlHari = $('#jmlHari').val(); //a kali sehari
        setAP += parseInt(jmlHari) + ",";
        var jmlSatuan = $('#jmlSatuanAP').val();
        setAP += parseInt(jmlSatuan) + ",";
        var satuanAP = $('#satuanAP').val();
        if (satuanAP == "") {
            var satuanAPDesc = "";
            setAP += ",-";
        } else {
            var satuanAPDesc = $('#satuanAP :selected').html();
            setAP += "," + satuanAP + "#" + satuanAPDesc;
        }
        var cara_pakai = $('#cara_pakai').val();
        if (cara_pakai == "") {
            var cara_pakaiDesc = "";
            setAP += ",-";
        } else {
            var cara_pakaiDesc = $('#cara_pakai :selected').html();
            setAP += "," + cara_pakai + "#" + cara_pakaiDesc;
        }
        var jmlMakan = $('#waktu1').val(); //Jumlah makan
        setAP += "," + parseInt(jmlMakan);
        var saatMakan = $('#waktu2').val(); //Waktu Makan (Sebelum Makan, Sesudah Makan, Dll)
        if (saatMakan == "") {
            var saatMakanDesc = "";
            setAP += ",-";
        } else {
            var saatMakanDesc = $('#waktu2 :selected').html();
            setAP += "," + saatMakan + "#" + saatMakanDesc;
        }
        var waktuMakan = $('#waktu3').val(); //Waktu Makan (Pagi Siang, Malam)
        if (waktuMakan == "") {
            waktuMakanDesc = "";
            setAP += ",-";
        } else {
            var waktuMakanDesc = $('#waktu3 :selected').html();
            setAP += "," + waktuMakan + "#" + waktuMakanDesc;
        }
        var keterangan = $('#keterangan').val();
        if (keterangan == "") {
            keteranganDesc = "";
            setAP += ",-";
        } else {
            var keteranganDesc = $('#keterangan :selected').html();
            setAP += "," + keterangan + "#" + keteranganDesc;
        }
        var expdate = $('#expdate').val();

        var desc = "";

        if (jenis_obat == "1" || jenis_obat == "2") {
            var deskJam = "";

            desc += jmlHari + " x " + jmlSatuan + " " + satuanAPDesc + " Sehari,";
            desc += cara_pakaiDesc + " " + jmlMakan + " " + satuanAPDesc + " " + saatMakanDesc + " " + waktuMakanDesc + ",";
            desc += keteranganDesc;

            //desc+=
            /*deskJam = (d=="") ? "" : " Jam ";
            setAP = GR+','+a+' x Sehari,'+b+' '+SAP[c-1]+','+d+deskJam+WAP[e-1]+','+WAP2[f-1]+','+KAP[g-1];*/
        } else if (jenis_obat == "3") {
            setAP = jenis_obat + ',OBAT INJEKSI';
        }

        $('#AP').val(desc);
        $('#AP1').val(setAP);
        $('#EXP').val(expdate);

        /*var myarr = setAP.split(",");
        if(myarr[0] == "1"){
            var setViewAP = myarr[1]+','+myarr[2]+','+myarr[3]+','+myarr[4]+','+myarr[5];
        }else if(myarr[0] == "2"){
            setViewAP = myarr[1]+','+myarr[2];
        }else if(myarr[0] == "3"){
            setViewAP = myarr[1];
        }else{
            setViewAP = 'Set AP';
        }*/
        //$('#setAturanPakai').html(setViewAP);
        $('#setAturanPakai').html(desc);
        $('#dialogAP').modal('hide');
        $('#simpanTemp').focus();
    }

    function onEnter() {
        var key = window.event.keyCode;

        // If the user has pressed enter
        if (key === 13) {
            //document.getElementById("KETJL").value = document.getElementById("KETJL").value + "*";
            $('#keyword').focus();
            return false;
        } else {
            return true;
        }
    }
    var base_url = "<?= base_url() . "farmasi/"; ?>";
</script>

<script src="<?php echo base_url() ?>js/farmasi.js"></script>
