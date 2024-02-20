<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">

        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Rekapitulasi Kunjungan Pasien Harian</h3>
                    <div class="box-tools">
                        
                    </div>
                </div>
                <div class="box-body table-responsive">
                <form action="#" method="POST" id="form" onsubmit="return false">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="input-group">
                                <input type="hidden" name="start" value="1" id="start">
                                <input type="text" class="form-control datepicker" id="dari" name="dari" placeholder="Tgl Awal" onchange="getDataHarian()" value="<?= date('Y-m') ."-01" ?>">
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group">
                                <input type="text" class="form-control datepicker" id="sampai" name="sampai" placeholder="Tgl Akhir" onchange="getDataHarian()" value="<?= date('Y-m-d')?>">
                                <span class="input-group-addon">
                                    <span class="fa fa-calendar"></span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <select name="jnslayanan" id="jnslayanan" class="form-control" onchange="getDataHarian()">
                                <?php 
                                foreach ($jenislayanan as $j) {
                                    ?>
                                    <option value="<?= $j->idx ?>"><?= $j->jenislayanan ?></option>
                                    <?php
                                }
                                ?>
                            </select>
                        </div>
                        <div class="col-md-5">
                            
                        </div>
                        
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getDataHarian(1)">
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
                                        <td><input type="checkbox" name="jenispasien" id="jenispasien" value="1" onclick="getDataHarian()"> Jenis Pasien                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="pekerjaan" id="pekerjaan" value="1" onclick="getDataHarian()"> Pekerjaan                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="wilayah" id="wilayah" value="1" onclick="getDataHarian()"> WIlayah                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="caradaftar" id="caradaftar" value="1" onclick="getDataHarian()"> Cara Daftar                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="carabayar" id="carabayar" value="1" onclick="getDataHarian()"> Cara Bayar                                            </td>
                                    </tr>
                                    <!-- <tr>
                                        <td><input type="checkbox" name="jenisepeserta" id="jenispeserta" value="1" onclick="getDataHarian()"> Jenis Peserta                                            </td>
                                    </tr> -->
                                    <tr>
                                        <td><input type="checkbox" name="rujukan" id="rujukan" value="1" onclick="getDataHarian()"> Rujukan                                            </td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" name="ruangan" id="ruangan" value="1" onclick="getDataHarian()"> Ruangan                                            </td>
                                    </tr>
                                    <!-- <tr>
                                        <td><input type="checkbox" name="dokter" id="dokter" value="1" onclick="getDataHarian()"> Dokter                                            </td>
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

