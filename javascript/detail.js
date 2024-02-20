$(document).ready(function() {
    // $(".inputmask").inputmask();
    $('input,textarea').focus(function() {
        return $(this).select();
    });
    
    // $('.tanggal').inputmask('dd/mm/yyyy', {
    //     'placeholder': 'dd/mm/yyyy'
    // });
    $('.tanggal').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy"
    });
    // $('.datepicker').inputmask('yyyy-mm-dd', {
    //     'placeholder': 'yyyy-mm-dd'
    // });
    $('.datepicker').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd"
    });
    $('#id_cara_daftar').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#id_cara_daftar').val();
            // alert(x)
            if (x == "") {
                this.focus();
            } else {
                var id_cara_daftar=$('#id_cara_daftar').val();
                // alert("ID CARA DAFTAR "+id_cara_daftar)
                if(id_cara_daftar==1){
                    // Jika cara daftar manual
                    var type=$("#jns_layanan").is(":hidden");
                    // alert(type);
                    if(type==true){
                        // alert('type')
                        $('#id_cara_bayar').focus();
                    }else{
                        $('#jenis_layanan').focus();
                    }
                }else if(id_cara_daftar==2){
                    // Jika Mendaftar Online Via Website
                }else if(id_cara_daftar==3){
                    // Jika mendaftar melalui jkn Mobile
                }
            }
        }
    });
    $('#jns_layanan').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#jns_layanan').val();
            if (x == "") {
                this.focus();
            } else {
                $('#id_cara_bayar').focus();
            }

        }
    });
    $('#id_cara_bayar').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var id_cara_bayar = $('#id_cara_bayar').val();
            if (id_cara_bayar == '') {
                this.focus();
            } else {
                var jkn = $('#jkn').val();
                // alert(jkn)
                if (jkn == 1) {
                    $('.jkn').show();
                    $('#nobpjs').focus();
                    var status_peserta=$('#status_peserta').val();
                    if(status_peserta!=""){
                        cekPeserta();
                    }
                    
                }
                else $('#id_rujuk').focus();
            }
        }
    });
    $('#id_cara_bayar').change(function () {
        var idx = $('#id_cara_bayar').val();
        getCaraBayar(idx);
    });
    $('#no_bpjs').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#no_bpjs').val();
            if (x == "") {
                this.focus();
            } else {
                cekPeserta();
                $('#id_rujuk').focus();
            }

        }
    });
    $('#id_rujuk').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#id_rujuk').val();
            if (x == "") {
                this.focus();
            } else {
                if(x==4) $('#faskes').focus();
                else if(x==1) $('#id_ruang').focus();
                else $('#txtNorujuk').focus();
            }

        }
    });
    $('#txtNorujuk').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var txtNorujuk=$('#txtNorujuk').val();
            if(txtNorujuk==""){
                getListRujukan();
            }else{
                if ($('#jarkomdat').is(':checked')) {
                    cekRujukan();
                }
                
                var id_rujuk=$('#id_rujuk').val();
                if(id_rujuk==6) $('#no_suratkontrol').focus();
                else $('#pjPasienDikirimOleh').focus();
            }

        }else{
            var txtNorujuk=$('#txtNorujuk').val();
            if(txtNorujuk.length==19){
                var tombol = '<button type="button" id="cariRujukan" class="btn btn-default" onclick="cekRujukan()">'+
                            '<i class="fa fa-check" id="iconcariRujukan"></i> Cek Rujukan</button>'
                $('#aksirujukan').html(tombol);
            }else{
                var tombol = '<button type="button" id="cariRujukan" class="btn btn-default" onclick="getListRujukan()">'+
                            '<i class="fa fa-search" id="iconcariRujukan"></i> Cari Rujukan</button>'
                $('#aksirujukan').html(tombol);
            }
        }
    });
    $('#id_ruang').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#id_ruang').val();
            if (x == "") {
                this.focus();
            } else {
                getDokter()
                $('#dokterJaga').focus();
            }

        }
    });
    $('#dokterJaga').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#dokterJaga').val();
            if (x == "") {
                this.focus();
            } else {
                var jkn=$('#jkn').val();
                if(jkn==1){
                    $('#no_jaminan').focus();
                }else{
                    $('#pjPasienNama').focus();
                }
                
            }

        }
    });
    $('#pjPasienNama').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            var x = $('#pjPasienNama').val();
            if (x == "") {
                this.focus();
            } else {
                $('#pjPasienTelp').focus();
            }

        }
    });
    
    $('#pjPasienTelp').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            $('#pjPasienHubKel').focus();
        }
    });
    $('#pjPasienHubKel').keyup(function(ev) {
        var event = ev.keyCode | ev.witch;
        if (event == 13) {
            $('#id_cara_bayar').focus();
        }
    });
    // Auto Complete Referensi SEP
    
    $.widget("custom.carippk", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kode: "Kode PPK",
                nama: "Nama PPK",
                isheader: true
            };
            self._renderItemData(ul, header);
            $.each(items, function(index, item) {
                self._renderItemData(ul, item);
            });

        },
        _renderItemData(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem(ul, item) {
            var $li = $("<li class='ui-menu-item' role='presentation'></li>");
            if (item.isheader)
                $li = $("<li class='ui-autocomplete-header' role='presentation'  style='font-weight:bold !important; width:100%'></li>");
            var $content = "<div class='col-md-12 ui-menu-item-wrapper'>" +
                "<div class='col-md-2'>" + item.kode + "</div>" +
                "<div class='col-md-10'>" + item.nama + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $.widget("custom.carispesialistik", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kode: "Kode",
                nama: "Nama",
                isheader: true
            };
            self._renderItemData(ul, header);
            $.each(items, function(index, item) {
                self._renderItemData(ul, item);
            });

        },
        _renderItemData(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem(ul, item) {
            var $li = $("<li class='ui-menu-item' role='presentation'></li>");
            if (item.isheader)
                $li = $("<li class='ui-autocomplete-header' role='presentation'  style='font-weight:bold !important; width:100%'></li>");
            var $content = "<div class='col-md-12 ui-menu-item-wrapper'>" +
                "<div class='col-md-2'>" + item.kode + "</div>" +
                "<div class='col-md-10'>" + item.nama + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $.widget("custom.carippk", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kode: "Kode",
                nama: "Nama",
                isheader: true
            };
            self._renderItemData(ul, header);
            $.each(items, function(index, item) {
                self._renderItemData(ul, item);
            });

        },
        _renderItemData(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem(ul, item) {
            var $li = $("<li class='ui-menu-item' role='presentation'></li>");
            if (item.isheader)
                $li = $("<li class='ui-autocomplete-header' role='presentation'  style='font-weight:bold !important; width:100%'></li>");
            var $content = "<div class='col-md-12 ui-menu-item-wrapper'>" +
                "<div class='col-md-2'>" + item.kode + "</div>" +
                "<div class='col-md-10'>" + item.nama + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $.widget("custom.caridiagnosa", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kode: "Kode ICD",
                nama: "Diagnosa",
                isheader: true
            };
            self._renderItemData(ul, header);
            $.each(items, function(index, item) {
                self._renderItemData(ul, item);
            });

        },
        _renderItemData(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem(ul, item) {
            var $li = $("<li class='ui-menu-item' role='presentation'></li>");
            if (item.isheader)
                $li = $("<li class='ui-autocomplete-header' role='presentation'  style='font-weight:bold !important; width:100%'></li>");
            var $content = "<div class='col-md-12 ui-menu-item-wrapper'>" +
                "<div class='col-md-2'>" + item.kode + "</div>" +
                "<div class='col-md-10'>" + item.nama + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $("#pjPasienDikirimOleh").carippk({
		source: function(request, response) {
			var faskes=$('#faskes').val();
			$.ajax({
				url: base_url+"vclaim/referensi/faskes/"+faskes,
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					var fk = data.response.faskes;
					// console.log(diagnosa);
					response(fk.slice(0, 15));
				},
				error: function(jqXHR, ajaxOption, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
		minLength: 2,
		focus: function(event, ui) {
			$("#id_pengirim").val(ui.item['kode']);
			$("#pjPasienDikirimOleh").val(ui.item['nama']);
			$("#pjPasienDikirimOleh").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#id_pengirim").val(ui.item['kode']);
			$("#pjPasienDikirimOleh").val(ui.item['nama']);
			$("#pjPasienDikirimOleh").removeClass("ui-autocomplete-loading");
			// spesialistiRujukan()
			return false;
		}
	});

    $("#txtnmpoli").carispesialistik({
        source: function(request, response) {

            $.ajax({
                url: base_url+'vclaim/referensi/poli',
                dataType: "JSON",
                method: "GET",
                data: {
                    param: request.term
                },
                success: function(data) {
                    //console.log(data);
                    var poli = data.response.poli;
                    console.log(poli);
                    response(poli.slice(0, 15));
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        minLength: 2,
        focus: function(event, ui) {
            $("#tujuan").val(ui.item['kode']);
            $("#txtnmpoli").val(ui.item['nama']);
            $("#txtnmpoli").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#tujuan").val(ui.item['kode']);
            $("#txtnmpoli").val(ui.item['nama']);
            $("#txtnmpoli").removeClass("ui-autocomplete-loading");
            if(ui.item['kode']=='MAT') $('#divkatarak').show();
            else $('#divkatarak').hide();
            getdpjp();
            return false;
        }
    });

    $("#txtppkasalrujukan").carippk({
        source: function(request, response) {
            var asalRujukan=$('#asalRujukan').val();
            $.ajax({
                url: base_url+'vclaim/referensi/faskes/'+asalRujukan,
                dataType: "JSON",
                method: "GET",
                data: {
                    param: request.term
                },
                success: function(data) {
                    console.log(data);
                    var dokter = data.response.faskes;
                    response(dokter.slice(0, 15));
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        minLength: 2,
        focus: function(event, ui) {
            $("#txtkdppkasalrujukan").val(ui.item['kode']);
            $("#txtppkasalrujukan").val(ui.item['nama']);
            $('#ppkRujukan').val(ui.item['kode']);
            $("#txtppkasalrujukan").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#txtkdppkasalrujukan").val(ui.item['kode']);
            $('#ppkRujukan').val(ui.item['kode']);
            $("#txtppkasalrujukan").val(ui.item['nama']);
            $("#txtppkasalrujukan").removeClass("ui-autocomplete-loading");
            return false;
        }
    });


    $("#txtnmdiagnosa").caridiagnosa({
        source: function(request, response) {

            $.ajax({
                url: base_url+'vclaim/referensi/diagnosa',
                dataType: "JSON",
                method: "GET",
                data: {
                    param: request.term
                },
                success: function(data) {
                    console.clear();
                    console.log(data);
                    var diagnosa = data.response.diagnosa;
                    console.log(diagnosa);
                    response(diagnosa.slice(0, 15));
                },
                error: function(jqXHR, ajaxOption, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        minLength: 2,
        focus: function(event, ui) {
            $("#diagAwal").val(ui.item['kode']);
            $("#txtnmdiagnosa").val(ui.item['nama']);
            $("#txtnmdiagnosa").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#diagAwal").val(ui.item['kode']);
            $("#txtnmdiagnosa").val(ui.item['nama']);
            $("#txtnmdiagnosa").removeClass("ui-autocomplete-loading");
            return false;
        }
    });



    $('#batal').click(function() {
        window.location.href = base_url+'rekammedis/pasien';
    });


    $('#daftar').click(function() {
        var formdata = {
            idx_pasien :$('#idx_pasien').val(),
            id_cara_daftar :$('#id_cara_daftar').val(),
            jns_layanan:$('#jns_layanan').val(),
            nomr_pasien:$('#nomr').val(),
            nama_pasien:$('#nama_pasien').val(),
            pekerjaan:$('#pekerjaan').val(),
            notelp:$('#notelp').val(),
            tgl_lahir:$('#tgl_lahir').val(),
            kab_kota:$('#kab_kota').val(),
            kecamatan:$('#kecamatan').val(),
            kelurahan:$('#kelurahan').val(),
            alamat:$('#alamat').val(),
            id_cara_bayar:$('#id_cara_bayar').val(),
            carabayar:$('#id_cara_bayar :selected').html(),
            id_jenis_peserta:$('#id_jenis_peserta').val(),
            jenis_peserta:$('#jenis_peserta').val(),
            id_rujuk:$('#id_rujuk').val(),
            rujukan:$('#id_rujuk :selected').html(),
            id_poli:$('#id_ruang').val(),
            nama_poli:$('#nama_ruang').val(),
            id_dokter:$('#dokterJaga').val(),
            nama_dokter:$('#namadokterJaga').val(),
            tgl_daftar:$('#tgl_daftar').val(),
            nobpjs:$('#nobpjs').val(),
            no_surat:$('#no_suratkontrol').val(),
            keluhan:$('#keluhan').val(),
            jkn:$('#jkn').val(),
            no_jaminan:$('#no_jaminan').val()
        }
        if (formdata['nomr_pasien'] == "" || formdata['nama_pasien'] == "") {
            tampilkanPesan('warning','Ops. No.MR tidak boleh kosong.');
        } else if (formdata['pjPasienNama'] == "") {
            tampilkanPesan('warning','Ops. Nama penanggung jawab pasien tidak boleh kosong.');
            $('#pjPasienNama').focus()
        }else if (formdata['id_cara_daftar'] == "") {
            tampilkanPesan('warning','Ops. Cara daftar pasien belum dipilih.');
            $('#id_cara_daftar').focus()
        } else if (formdata['id_cara_bayar'] == "") {
            tampilkanPesan('warning','Ops. Cara bayar harus di pilih.');
        } else if (formdata['id_rujuk'] == "") {
            tampilkanPesan('warning','Ops. Rujukan harus di pilih.');
        } else if (formdata['id_poli'] == "") {
            tampilkanPesan('warning','Ops. Tujuan layanan harus di pilih.');
        } else if (formdata['id_dokter'] == "") {
            tampilkanPesan('warning','Ops. Dokter  harus di pilih.');
        }  else {
            if ($('#jkn').val() == 1) {
                if ($('#status_peserta').val() == '') {
                    tampilkanPesan('warning','Ops. Status Kepesertaan BPJS Tidak Diketahui');
                    return false
                } else if ($('#status_peserta').val() != 'AKTIF') {
                    var status = $('#status_peserta').val();
                    tampilkanPesan('warning','Ops. Status Kepesertaan BPJS ' + status + ' Tidak Dikeahui');
                    return false;
                }
            }
            var x = confirm("Apakah anda yakin akan melanjutkan proses pendaftaran pasien ini?");
            if (x) {
                $.ajax({
                    url: base_url+"rekammedis/pasien/simpan_pendaftaran",
                    type: "POST",
                    data: formdata,
                    dataType: "JSON",
                    beforeSend  : function(){
                        $('#daftar').prop("disabled",true);
                        $('#icondaftar').removeClass('fa-arrow-right')
                        $('#icondaftar').addClass('fa-spinner fa-spin')
                    },
                    success: function(data) {
                        if (data.status == true) {
                            var url = base_url+'rekammedis/pasien/suksesdaftar/' + data.unikID;
                            window.location.href = url;
                        } else {
                            tampilkanPesan('warning',data.message);
                        }
                    },
                    error: function(xhr) { // if error occured
                        $('#error').modal('show');
			            $('#xhr').html(xhr.responseText)
                        $('#daftar').prop("disabled",false);
                        $('#icondaftar').removeClass('fa fa-spinner fa-spin')
                        $('#icondaftar').addClass('fa-arrow-right')
                    },
                    complete: function() {
                        $('#daftar').prop("disabled",false);
                        $('#icondaftar').removeClass('fa fa-spinner fa-spin')
                        $('#icondaftar').addClass('fa-arrow-right')
                    },
                });
            }
        }
    });

    $('#update').click(function() {
        var jekel = $("input[name='u_jns_kelamin']:checked").val()
        // alert(jekel);
        // return false;
        var formdata = {
            'idx':$('#u_idx').val(),
            'nomr':$('#u_nomr').val(),
            'nik':$('#u_nik').val(),
            'nobpjs':$('#u_nobpjs').val(),
            'nama':$('#u_nama').val(),
            'tempat_lahir':$('#u_tempat_lahir').val(),
            'tgl_lahir':$('#u_tgl_lahir').val(),
            'jns_kelamin':jekel,
            'pekerjaan':$('#u_pekerjaan').val(),
            'agama':$('#u_agama').val(),
            'suku':$('#u_suku').val(),
            'bahasa':$('#u_bahasa').val(),
            'notelp':$('#u_notelp').val(),
            'nama_provinsi':$('#u_nama_provinsi').val(),
            'kab_kota':$('#u_kab_kota').val(),
            'kecamatan':$('#u_kecamatan').val(),
            'kelurahan':$('#u_kelurahan').val(),
            'alamat':$('#u_alamat').val(),
            'nama_keluarga':$('#u_nama_keluarga').val(),
            'notelp_keluarga':$('#u_notelp_keluarga').val(),
            'hub_keluarga':$('#u_hub_keluarga').val()
        }
        if (formdata['nik'] == "") {
            tampilkanPesan('warning','Ops. NIK tidak boleh kosong.');
            $('#nik').focus()
        } else if (formdata['nama'] == "") {
            tampilkanPesan('warning','Ops. Nama pasien tidak boleh kosong.');
            $('#nama').focus()
        }else if (formdata['tempat_lahir'] == "") {
            tampilkanPesan('warning','Ops. Tempat Lahir tidak boleh kosong.');
            $('#tempat_lahir').focus()
        } else if (formdata['tgl_lahir'] == "") {
            tampilkanPesan('warning','Ops. Tgl Lahir tidak boleh kosong.');
            $('#tgl_lahir').focus()
        } else if (formdata['jns_kelamin'] == "") {
            tampilkanPesan('warning','Ops. Jenis Kelamin harus di pilih.');
            $('#laki').focus()
        } else if (formdata['pekerjaan'] == "") {
            tampilkanPesan('warning','Ops. Pekerjaan harus di pilih.');
            $('#pekerjaan').focus()
        } else if (formdata['agama'] == "") {
            tampilkanPesan('warning','Ops. Agama  harus di pilih.');
            $('#agama').focus()
        }else if (formdata['suku'] == "") {
            tampilkanPesan('warning','Ops. Suku  harus di pilih.');
            $('#suku').focus()
        } else if (formdata['bahasa'] == "") {
            tampilkanPesan('warning','Ops. Bahasa  harus di pilih.');
            $('#bahasa').focus()
        } else if (formdata['notelp'] == "") {
            tampilkanPesan('warning','Ops. notelp tidak boleh kosong.');
            $('#notelp').focus()
        } else if (formdata['nama_provinsi'] == "") {
            tampilkanPesan('warning','Ops. Provinsi  harus di pilih.');
            $('#nama_provinsi').focus()
        } else if (formdata['kab_kota'] == "") {
            tampilkanPesan('warning','Ops. Kab/Kota harus di pilih.');
            $('#kab_kota').focus()
        } else if (formdata['kecamatan'] == "") {
            tampilkanPesan('warning','Ops. kecamatan harus di pilih.');
            $('#kecamatan').focus()
        } else if (formdata['kelurahan'] == "") {
            tampilkanPesan('warning','Ops. Kelurahan/Desa/Nagari harus di pilih.');
            $('#kelurahan').focus()
        } else if (formdata['alamat'] == "") {
            tampilkanPesan('warning','Ops. alamat tidak boleh kosong.');
            $('#alamat').focus()
        } else if (formdata['nama_keluarga'] == "") {
            tampilkanPesan('warning','Ops. Nama Keluarga tidak boleh kosong.');
            $('#nama_keluarga').focus()
        } else if (formdata['notelp_keluarga'] == "") {
            tampilkanPesan('warning','Ops. Notelp keluarga tidak boleh kosong.');
            $('#notelp_keluarga').focus()
        } else if (formdata['hub_keluarga'] == "") {
            tampilkanPesan('warning','Ops. hubungan keluarga tidak boleh kosong.');
            $('#hub_keluarga').focus()
        } else {
            var x = confirm("Apakah anda yakin akan mengedit data pasien ini?");
            if (x) {
                $.ajax({
                    url: base_url+"rekammedis/pasien/update",
                    type: "POST",
                    data: formdata,
                    dataType: "JSON",
                    success: function(data) {
                        if (data.status == true) {
                            // var url = base_url+'rekammedis/pasien/detail/' + data.unikID;
                            // window.location.href = url;
                            location.reload();
                        } else {
                            alert(data.message);
                        }
                    },
                    error: function(jqXHR, ajaxOption, errorThrown) {
                        console.log(jqXHR.responseText);
                    }
                });
            }
        }
    });

    $('#daftarbaru').click(function() {
        var jekel = $("input[name='u_jns_kelamin']:checked").val()
        // alert(jekel);
        // return false;
        var formdata = {
            'idx':$('#u_idx').val(),
            'nomr':$('#u_nomr').val(),
            'nik':$('#u_nik').val(),
            'nobpjs':$('#u_nobpjs').val(),
            'nama':$('#u_nama').val(),
            'tempat_lahir':$('#u_tempat_lahir').val(),
            'tgl_lahir':$('#u_tgl_lahir').val(),
            'jns_kelamin':jekel,
            'pekerjaan':$('#u_pekerjaan').val(),
            'agama':$('#u_agama').val(),
            'suku':$('#u_suku').val(),
            'bahasa':$('#u_bahasa').val(),
            'notelp':$('#u_notelp').val(),
            'nama_provinsi':$('#u_nama_provinsi').val(),
            'kab_kota':$('#u_kab_kota').val(),
            'kecamatan':$('#u_kecamatan').val(),
            'kelurahan':$('#u_kelurahan').val(),
            'alamat':$('#u_alamat').val(),
            'nama_keluarga':$('#u_nama_keluarga').val(),
            'notelp_keluarga':$('#u_notelp_keluarga').val(),
            'hub_keluarga':$('#u_hub_keluarga').val()
        }
        if (formdata['nik'] == "") {
            tampilkanPesan('warning','Ops. NIK tidak boleh kosong.');
            $('#nik').focus()
        } else if (formdata['nama'] == "") {
            tampilkanPesan('warning','Ops. Nama pasien tidak boleh kosong.');
            $('#nama').focus()
        }else if (formdata['tempat_lahir'] == "") {
            tampilkanPesan('warning','Ops. Tempat Lahir tidak boleh kosong.');
            $('#tempat_lahir').focus()
        } else if (formdata['tgl_lahir'] == "") {
            tampilkanPesan('warning','Ops. Tgl Lahir tidak boleh kosong.');
            $('#tgl_lahir').focus()
        } else if (formdata['jns_kelamin'] == "") {
            tampilkanPesan('warning','Ops. Jenis Kelamin harus di pilih.');
            $('#laki').focus()
        } else if (formdata['pekerjaan'] == "") {
            tampilkanPesan('warning','Ops. Pekerjaan harus di pilih.');
            $('#pekerjaan').focus()
        } else if (formdata['agama'] == "") {
            tampilkanPesan('warning','Ops. Agama  harus di pilih.');
            $('#agama').focus()
        }else if (formdata['suku'] == "") {
            tampilkanPesan('warning','Ops. Suku  harus di pilih.');
            $('#suku').focus()
        } else if (formdata['bahasa'] == "") {
            tampilkanPesan('warning','Ops. Bahasa  harus di pilih.');
            $('#bahasa').focus()
        } else if (formdata['notelp'] == "") {
            tampilkanPesan('warning','Ops. notelp tidak boleh kosong.');
            $('#notelp').focus()
        } else if (formdata['nama_provinsi'] == "") {
            tampilkanPesan('warning','Ops. Provinsi  harus di pilih.');
            $('#nama_provinsi').focus()
        } else if (formdata['kab_kota'] == "") {
            tampilkanPesan('warning','Ops. Kab/Kota harus di pilih.');
            $('#kab_kota').focus()
        } else if (formdata['kecamatan'] == "") {
            tampilkanPesan('warning','Ops. kecamatan harus di pilih.');
            $('#kecamatan').focus()
        } else if (formdata['kelurahan'] == "") {
            tampilkanPesan('warning','Ops. Kelurahan/Desa/Nagari harus di pilih.');
            $('#kelurahan').focus()
        } else if (formdata['alamat'] == "") {
            tampilkanPesan('warning','Ops. alamat tidak boleh kosong.');
            $('#alamat').focus()
        } else if (formdata['nama_keluarga'] == "") {
            tampilkanPesan('warning','Ops. Nama Keluarga tidak boleh kosong.');
            $('#nama_keluarga').focus()
        } else if (formdata['notelp_keluarga'] == "") {
            tampilkanPesan('warning','Ops. Notelp keluarga tidak boleh kosong.');
            $('#notelp_keluarga').focus()
        } else if (formdata['hub_keluarga'] == "") {
            tampilkanPesan('warning','Ops. hubungan keluarga tidak boleh kosong.');
            $('#hub_keluarga').focus()
        } else {
            $.ajax({
                url         : base_url+'/rekammedis/pasien/daftar_pasien_baru',
                type: "POST",
                data: formdata,
                dataType: "JSON",
                beforeSend  : function(){
                    $('#daftarbaru').prop("disabled",true);
                    $('#icondaftarbaru').removeClass('fa-arrow-right')
                    $('#icondaftarbaru').addClass('fa-spinner fa-spin')
                },
                success     : function(data){
                    if(data.status==true){
                        tampilkanPesan('success',data.message)
                        window.location.href = base_url+'rekammedis/pasien/detail/'+data.nomr;
                    }else{
                        tampilkanPesan('warning',data.message);
                    }
                },
                error: function(xhr) { // if error occured
                    $('#error').modal('show');
			        $('#xhr').html(xhr.responseText)
                    $('#daftarbaru').prop("disabled",false);
                    $('#icondaftarbaru').removeClass('fa fa-spinner fa-spin')
                    $('#icondaftarbaru').addClass('fa-arrow-right')
                },
                complete: function() {
                    $('#daftarbaru').prop("disabled",false);
                    $('#icondaftarbaru').removeClass('fa fa-spinner fa-spin')
                    $('#icondaftarbaru').addClass('fa-arrow-right')
                },
            });
        }
    });
});