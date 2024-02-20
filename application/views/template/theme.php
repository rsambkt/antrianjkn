<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?= COMPANY_NAME ?></title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
    <meta name="robots" content="none" />
    <link rel="shortcut icon" href="<?php echo base_url() . 'favicon.png' ?>">
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/font-awesome/css/font-awesome.css" />
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/Ionicons/css/ionicons.min.css" />
    <!-- <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.css"> -->
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/bower_components/select2/dist/css/select2.css">
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/dist/css/AdminLTE.css" />
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/dist/css/skins/_all-skins.min.css" />
    <link async rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/plugins/sweetalert/sweetalert.css">
    <script src="<?php echo base_url() ?>assets/plugins/sweetalert/sweetalert.min.js"></script>
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/jquery/css/jquery-ui.min.css">
    <style type="text/css">
        .lock {
            bottom: 0;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            cursor: wait;
            background: #0000002e;
            color: #fff;
            z-index: 1520;
        }

        .center {
            margin: 150px auto auto auto;
            padding: 10px;
            text-align: center;
            width: 80%;
            border: #000 solid 1px;
            border-collapse: collapse;
            color: #000;
            border-radius: 10px;
            background-color: #fff;
        }
        .error{
            color:#d90303;
        }
        @media only screen and (max-width: 1360px) {
            .center {
                margin: 80px auto auto auto;

            }
        }

        legend {
            font-size: 14pt;
        }

        .ui-autocomplete-loading {
        background: white url("<?php echo base_url() ?>ui-anim_basic_16x16.gif") right center no-repeat;
    }

    .ui-autocomplete-input {
        border: none;
        font-size: 14px;
        border: 1px solid #DDD !important;
        /*z-index: 1511;*/
        position: relative;
    }

    .ui-menu .ui-menu-item a {
        font-size: 12px;
    }

    .ui-autocomplete {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1510 !important;
        float: left;
        display: none;
        min-width: 160px;
        width: 160px;
        padding: 4px 0;
        margin: 2px 0 0 0;
        list-style: none;
        background-color: #ffffff;
        border-color: #ccc;
        border-color: rgba(0, 0, 0, 0.2);
        border-style: solid;
        border-width: 1px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        -webkit-background-clip: padding-box;
        -moz-background-clip: padding;
        background-clip: padding-box;
        *border-right-width: 2px;
        *border-bottom-width: 2px;
    }

    .ui-menu-item>a.ui-corner-all {
        display: block;
        padding: 3px 15px;
        clear: both;
        font-weight: normal;
        line-height: 18px;
        color: #555555;
        white-space: nowrap;
        text-decoration: none;
    }

    .ui-state-hover,
    .ui-state-active {
        color: #ffffff;
        text-decoration: none;
        background-color: #0088cc;
        border-radius: 0px;
        -webkit-border-radius: 0px;
        -moz-border-radius: 0px;
        background-image: none;
    }

    /* .select2-container *:focus {
        outline: none;
        border: 1px solid #367fa9;
    } */
    @media only screen and (max-width: 1360px) {
        .modal-content {
            overflow-y: scroll;
            overflow-x: hidden;
            height: 95vh;
            white-space: nowrap
        }
    }

    .modal-content {

        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 95vh;
        white-space: nowrap
    }

    /* .modal-lg {
        min-width: 1200px;
    } */
    .ui-datepicker{
        position: absolute; top: 519.567px; left: 679px; z-index: 1051;
    }
    </style>
    <link href="<?php echo base_url() ?>assets/bower_components/fonts.googleapis/fonts.css" type="text/css" rel="stylesheet">
    <script type="text/javascript">
        var url = "<?= base_url(); ?>";
    </script>
</head>

<body class="hold-transition <?= getSkin($this->session->userdata('modul')); ?> sidebar-mini">
    <div class="wrapper">
        <?php echo $header; ?>

        <aside class="main-sidebar">
            <?php echo $nav_sidebar; ?>
        </aside>

        <div class="content-wrapper">
            
            <input type="hidden" id="token" class="csrf" name="<?= $this->security->get_csrf_token_name(); ?>" value="<?= $this->security->get_csrf_hash(); ?>">
            <?php echo $content ?>
        </div>

        <footer class="main-footer">
            <div class="pull-right hidden-xs"><?php echo getVersion() ?></div>
            <?php echo getFooter() ?>
        </footer>

        <div class="control-sidebar-bg"></div>
    </div>
    <!-- <script src="<?php echo base_url() ?>assets/bower_components/jquery/dist/jquery.js"></script> -->
    <script src="<?php echo base_url() ?>assets/jquery/js/jquery-3.3.1.min.js"></script>
    <script src="<?php echo base_url() ?>assets/jquery/js/jquery-ui.min.js"></script>
    <script async src="<?php echo base_url() ?>assets/bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script async src="<?php echo base_url() ?>assets/bower_components/select2/dist/js/select2.full.js"></script>
    <script async src="<?php echo base_url() ?>assets/bower_components/inputmask/dist/jquery.inputmask.bundle.js"></script>
    <script async src="<?php echo base_url() ?>assets/bower_components/moment/min/moment.min.js"></script>
    <!-- <script async src="<?php echo base_url() ?>assets/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script> -->
    <!-- <script async src="<?php echo base_url() ?>assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js"></script> -->
    <script async src="<?php echo base_url() ?>assets/bower_components/fastclick/lib/fastclick.js"></script>
    <script async src="<?php echo base_url() ?>assets/dist/js/adminlte.js"></script>
    <script type="text/javascript">
        var base_url = "<?= base_url()  ?>";
    </script>
    <script src="<?php echo base_url() ?>assets/js/function.js"></script>
    
    <script type="text/javascript">
        //var base_url = '<?= base_url() ?>';
        var modul = "<?= $this->session->userdata('modul') ?>";
        var level = "<?= $this->session->userdata('level'); ?>";

        var select = "<?php if (!empty($index_menu)) echo $index_menu;
                        else echo "1" ?>";
        var ruang = "<?= $this->session->userdata('kdlokasi'); ?>"

        function getmenu() {
            var url = "<?= base_url() ?>" + "welcome/hakakses/" + modul + "/" + level + "/" + select + "/" + ruang;
            console.log(url);
            //alert(url);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                data: {
                    get_param: 'value'
                },
                success: function(data) {
                    //menghitung jumlah data
                    //console.clear();
                    console.log(data.menu);
                    var menu = data.menu;
                    var jmlData = menu.length;
                    var li = '<li class="header"><?php echo getAppName() ?></li>';
                    var index = "";
                    var sub_index = "";
                    var dropdown = 0;
                    for (var i = 0; i < jmlData; i++) {
                        console.log(menu[i].index_menu + " " + select);

                        if (menu[i].index_menu == select) var aktif = 'active';
                        else var aktif = '';
                        if (index != menu[i].index_menu) {

                            if (menu[i].file_kontrol == "#" || menu[i].file_kontrol == "") {
                                if (index != "") li += '</ul>';
                                li += '<li class="treeview ' + aktif + '"> ' +
                                    '<a href = "#"> <i class = "fa ' + menu[i].icon + '"> </i> <span>' + menu[i].judul_menu + '</span>' +
                                    '<span class = "pull-right-container">' +
                                    '<i class = "fa fa-angle-left pull-right"> </i> </span>' +
                                    '</a>' +
                                    '<ul class = "treeview-menu">';
                                dropdown = 1;

                            } else {
                                if (dropdown == 1) li += '</ul>';
                                li += '<li class="' + aktif + '"> <a href = "' + base_url + menu[i].file_kontrol + '"><i class = "fa ' + menu[i].icon + '"> </i> <span>' + menu[i].judul_menu + '</span> </a> </li>';
                                //menu += '<li><a href="' + base_url + menu[i].file_index + "/" + menu[i].file_control + '"> <i class = "fa fa-circle-o text-red"> </i>Negara</a> </li>';
                                dropdown = 0;
                            }
                        } else {

                            li += '<li><a href="' + base_url + menu[i].file_kontrol + '"> <i class = "fa ' + menu[i].icon + '"> </i>' + menu[i].judul_menu + '</a> </li>';
                        }

                        index = menu[i].index_menu;
                        sub_index = menu[i].sub_index_menu;
                    }
                    if (dropdown == 1) li += '</ul>';
                    //console.log(li);
                    console.log("Tampilkan Menu...");
                    $('#menu').html(li);
                }
            });
        }
        getmenu();
        <?php
        if (!empty($func)) echo $func;
        if (!empty($ajaxdata)) echo $ajaxdata;
        ?>
    </script>
    <?php if (!empty($lib)) {
        if(is_array($lib)){
            foreach ($lib as $l ) {
                echo '<script src="' . base_url() . $l . '"></script>'; 
            }
        }else{
            echo '<script src="' . base_url() . $lib . '"></script>'; 
        }
        
    }
    ?>

    <div id="error" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content" style="overflow-y: hidden;">
                <div class="modal-header bg-red">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title text-center">Response Error Dari Server BPJS...</h4>
                </div>
                <div class="modal-body text-center">
                    <h1><i class="fa fa-warning text-red"></i></h1>
                    <h2  id="xhr"></h2>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-danger btn-block" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>

</body>

</html>