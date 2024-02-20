<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">

        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Rekapitulasi Kunjungan Pasien Bulanan</h3>
                    <div class="box-tools">
                        
                    </div>
                </div>
                <div class="box-body table-responsive">
                <form action="#" method="POST" id="form" onsubmit="return false">
                    <input type="hidden" name="start" value="1" id="start">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="input-group">
                                <select name="bulanmulai" id="bulanmulai" class="form-control" onchange="getDataBulanan()">
                                    <option value="01">Januari</option>
                                    <option value="02">Februari</option>
                                    <option value="03">Maret</option>
                                    <option value="04">April</option>
                                    <option value="05">Mei</option>
                                    <option value="06">Juni</option>
                                    <option value="07">Juli</option>
                                    <option value="08">Agustus</option>
                                    <option value="09">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </select>
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <input type="text" class="form-control" id="tahunmulai" name="tahunmulai" value="<?= date('Y') ?>" onkeyup="getDataBulanan()">
                        </div>
                        <div class="col-md-1 text-center"><label for="-">Sampai</label></div>
                        <div class="col-md-2">
                            <div class="input-group">
                                <select name="bulansampai" id="bulansampai" class="form-control" onchange="getDataBulanan()">
                                    <option value="01">Januari</option>
                                    <option value="02">Februari</option>
                                    <option value="03">Maret</option>
                                    <option value="04">April</option>
                                    <option value="05">Mei</option>
                                    <option value="06">Juni</option>
                                    <option value="07">Juli</option>
                                    <option value="08">Agustus</option>
                                    <option value="09">September</option>
                                    <option value="10">Oktober</option>
                                    <option value="11">November</option>
                                    <option value="12">Desember</option>
                                </select><span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                        
                        <div class="col-md-1">
                            <input type="text" class="form-control" id="tahunsampai" name="tahunsampai" value="<?= date('Y') ?>" onkeyup="getDataBulanan()">
                        </div>
                        <div class="col-md-2">
                            <select name="jnslayanan" id="jnslayanan" class="form-control" onchange="getDataBulanan()">
                                <?php 
                                foreach ($jenislayanan as $j) {
                                    ?>
                                    <option value="<?= $j->idx ?>"><?= $j->jenislayanan ?></option>
                                    <?php
                                }
                                ?>
                            </select>
                        </div>
                        <div class="col-md-2">
                            
                        </div>
                        
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getDataBulanan(1)">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-2">
                            <table  class="table table-bordered table-striped" >
                                <tr class="bg-green">
                                    <th>Group</th>
                                </tr>
                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" name="jenispasien" id="jenispasien" value="1" onclick="getDataBulanan()"> Jenis Pasien                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="pekerjaan" id="pekerjaan" value="1" onclick="getDataBulanan()"> Pekerjaan                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="wilayah" id="wilayah" value="1" onclick="getDataBulanan()"> WIlayah                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="caradaftar" id="caradaftar" value="1" onclick="getDataBulanan()"> Cara Daftar                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="carabayar" id="carabayar" value="1" onclick="getDataBulanan()"> Cara Bayar                                            </td>
                                    </tr>
                                    <!-- <tr>
                                        <td><input type="checkbox" name="jenisepeserta" id="jenispeserta" value="1" onclick="getDataBulanan()"> Jenis Peserta                                            </td>
                                    </tr> -->
                                    <tr>
                                        <td><input type="checkbox" name="rujukan" id="rujukan" value="1" onclick="getDataBulanan()"> Rujukan                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="ruangan" id="ruangan" value="1" onclick="getDataBulanan()"> Ruangan                                            </td>
                                    </tr>
                                    <!-- <tr>
                                        <td><input type="checkbox" name="dokter" id="dokter" value="1" onclick="getDataBulanan()"> Dokter                                            </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-10" >
                            <table class="table table-bordered table-striped" id="dataharian">
                                <thead class="bg-green" id="headerriwayat">
                                   
                                </thead>
                                <tbody id="datarekapitulasi"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="3" id="pagination"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</section>

