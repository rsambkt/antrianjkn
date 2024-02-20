<style>
    div#pagination b {
        z-index: 3;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    div#pagination a {
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-top-color: rgb(221, 221, 221);
        border-right-color: rgb(221, 221, 221);
        border-bottom-color: rgb(221, 221, 221);
        border-left-color: rgb(221, 221, 221);
    }

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
                        <a href="#" id="btnTambah" class="btn btn-default">
                            <i class="glyphicon glyphicon-plus"></i> Tambah</a>
                        <a href="#" id="btnRefresh" class="btn btn-default">
                            <i class="glyphicon glyphicon-refresh"></i> Refresh</a>
                    </h3>

                    <div class="box-tools">
                        <div class="input-group input-group-sm" style="width: 200px;">
                            <input type="text" id="keyword" name="keyword" class="form-control pull-right" placeholder="Enter nama barang" style="width: 200px" />
                            <div class="input-group-btn">
                                <button type="button" id="btn_keyword" class="btn btn-primary">
                                    <i class="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-body table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th style="width: 30px">#</th>
                                <th>Kode</th>
                                <th>Nama Obat / Alkes</th>
                                <th>Nama Generik</th>
                                <th>Satuan</th>
                                <th>Kat.Barang</th>
                                <th>Jns.Barang</th>
                                <th>Harga Jual</th>
                                <th style="width: 120px">#</th>
                            </tr>
                        </thead>
                        <tbody id="getdata"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        getTable();
        $('input').focus(function() {
            return $(this).select();
        });
        $('#btnTambah').click(function() {
            var url = '<?php echo base_url() . 'farmasi/obat/tambah/' ?>';
            window.location.href = url;
        });
        $('#btnRefresh').click(function() {
            getTable();
        });
        $('#keyword').keypress(function(ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                $.ajax({
                    url: "<?php echo base_url() . 'farmasi/obat/getView' ?>",
                    type: "POST",
                    data: {
                        sLike: $(this).val(),
                        <?= $this->security->get_csrf_token_name(); ?>: $('#csrf').val()
                    },
                    beforeSend: function() {
                        $('tbody#getdata').html("<tr><td colspan=9><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                    },
                    success: function(data) {
                        $('tbody#getdata').html(data);
                    },
                    error: function(jqXHR, ajaxOption, errorThrown) {
                        console.log(errorThrown);
                    },
                    complete: function() {
                        var csrf = $('#csrf').val();
                        $('.csrf').val(csrf);
                    }
                });
            }
        });
        $('#btn_keyword').click(function() {
            $.ajax({
                url: "<?php echo base_url() . 'farmasi/obat/getView' ?>",
                type: "POST",
                data: {
                    sLike: $('#keyword').val(),
                    <?= $this->security->get_csrf_token_name(); ?>: $('#csrf').val()
                },
                beforeSend: function() {
                    $('tbody#getdata').html("<tr><td colspan=9><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
                },
                success: function(data) {
                    $('tbody#getdata').html(data);
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(errorThrown);
                },
                complete: function() {
                    var csrf = $('#csrf').val();
                    $('.csrf').val(csrf);
                }
            });
        });

    });

    function getTable() {
        $.ajax({
            url: "<?php echo base_url() . 'farmasi/obat/getView' ?>",
            beforeSend: function() {
                $('tbody#getdata').html("<tr><td colspan=9><i class='fa fa-spin fa-refresh'></i> Loading... Please wait</td></tr>");
            },
            success: function(data) {
                $('tbody#getdata').html(data);
            },
            error: function(jqXHR, ajaxOption, errorThrown) {
                console.log(errorThrown);
            },
            complete: function() {
                var csrf = $('#csrf').val();
                $('.csrf').val(csrf);
            }
        });
    }

    function edit(a) {
        var url = '<?php echo base_url() . 'farmasi/obat/tambah/' ?>' + a;
        window.location.href = url;
    }

    function hapus(a) {
        var x = confirm("Apakah anda yakin akan menghapus record ini?");
        if (x) {
            $.ajax({
                url: "<?php echo base_url() . 'farmasi/obat/hapus' ?>",
                type: "POST",
                data: {
                    KDBRG: a,
                    <?= $this->security->get_csrf_token_name(); ?>: $('#csrf').val()
                },
                dataType: "JSON",
                success: function(data) {
                    alert(data.message);
                    if (data.code == 200) {
                        getTable();
                    }
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(jqXHR.responseText);
                },
                complete: function() {
                    var csrf = $('#csrf').val();
                    $('.csrf').val(csrf);
                }
            });
        }
    }

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
</script>
