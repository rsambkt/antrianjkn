<section class="content-header">
    <h1><?php echo $contentTitle ?></h1>
</section>

<section class="content container-fluid">
    <div class="row">

        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Data Pasien</h3>
                    <div class="box-tools">
                        <a href="<?= base_url() . "rekammedis/pasien/tambah"; ?>" class="btn btn-success">Pasien Baru</a>
                    </div>
                </div>
                <div class="box-body table-responsive">
                    <div class="row">
                        <div class="col-md-9">
                            <form action="#" method="GET" onsubmit="return false">
                                <div class="input-group">
                                    <input type="text" name="q" id="q" class="form-control pull-right" onkeydown="getPasien(1)" placeholder="Search">
                                    <span class="input-group-addon">
                                        <span class="fa fa-search"></span>
                                    </span>
                                </div>

                            </form>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group">
                                <select name="param" id="param" class="form-control" onchange="getPasien(1)">
                                    <option value="">Pilih Parameter</option>
                                    <option value="nomr">Nomr</option>
                                    <option value="nik">NIK</option>
                                    <option value="nobpjs">No BPJS</option>
                                    <option value="nama">Nama</option>
                                    <option value="alamat">Alamat</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="input-group">
                                <select class="form-control" name="limit" id="limit" onchange="getPasien(1)">
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
                        <div class="col-md-12">
                            <table class="table table-bordered table-striped">
                                <thead >
                                    <tr>
                                        <th style="width: 40px">#</th>
                                        <th style="width: 80px">Nomr</th>
                                        <th style="width: 100px">NIK</th>
                                        <th style="width: 100px">No BPJS</th>
                                        <th style="width: 250px">Nama Pasien</th>
                                        <th style="width: 80px">Jekel</th>
                                        <th style="width: 250px">Tempat / Tgl Lahir</th>
                                        <th>Alamat</th>
                                        <th style="width: 80px; text-align:right;">#</th>
                                    </tr>
                                </thead>
                                <tbody id="datapasien"></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="9" id="pagination"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>