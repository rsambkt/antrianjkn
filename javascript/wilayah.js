$(document).ready(function() {
    $.widget("custom.cariprovinsi", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                provinsi: "Provinsi",
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
                "<div class='col-md-12'>" + item.provinsi + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $.widget("custom.carikabkota", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kabkota: "Kab/Kota",
                nama: "Nama Kab/Kota",
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
                "<div class='col-md-4'>" + item.kabkota + "</div>" +
                "<div class='col-md-6'>" + item.nama_kabkota + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $.widget("custom.carikecamatan", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                kecamatan: "kecamatan",
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
                "<div class='col-md-12'>" + item.kecamatan + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });

    $("#provinsi").cariprovinsi({
		source: function(request, response) {
			$.ajax({
				url: base_url+"admin/wilayah/propinsi",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					var fk = data.res;
					// console.log(diagnosa);
					response(fk.slice(0, 15));
				},
				error: function(xhr) {
					$('#error').modal('show');
			        $('#xhr').html(xhr.responseText)
				}
			});
		},
		minLength: 2,
		focus: function(event, ui) {
			$("#provinsi").val(ui.item['provinsi']);
			$("#provinsi").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#provinsi").val(ui.item['provinsi']);
			$("#provinsi").removeClass("ui-autocomplete-loading");
			// spesialistiRujukan()
			return false;
		}
	});

    $("#nama_kabkota").carikabkota({
        source: function(request, response) {
            var provinsi=$('#provinsi').val();
            $.ajax({
                url: base_url+'admin/wilayah/kabkota',
                dataType: "JSON",
                method: "GET",
                data: {
                    provinsi: provinsi,
                    param: request.term
                },
                success: function(data) {
                    //console.log(data);
                    var poli = data.res;
                    console.log(poli);
                    response(poli.slice(0, 15));
                },
                error: function(xhr) {
                    $('#error').modal('show');
			        $('#xhr').html(xhr.responseText)
                }
            });
        },
        minLength: 2,
        focus: function(event, ui) {
            $("#kabkota").val(ui.item['kabkota']);
            $("#nama_kabkota").val(ui.item['nama_kabkota']);
            $("#nama_kabkota").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#kabkota").val(ui.item['kabkota']);
            $("#nama_kabkota").val(ui.item['nama_kabkota']);
            $("#nama_kabkota").removeClass("ui-autocomplete-loading");
            return false;
        }
    });

    $("#kecamatan").carikecamatan({
        source: function(request, response) {
            var kabkota=$('#nama_kabkota').val();
            $.ajax({
                url: base_url+'admin/wilayah/kecamatan',
                dataType: "JSON",
                method: "GET",
                data: {
                    nama_kabkota: kabkota,
                    param: request.term
                },
                success: function(data) {
                    console.log(data);
                    var dokter = data.res;
                    response(dokter.slice(0, 15));
                },
                error: function(xhr) {
                    $('#error').modal('show');
			        $('#xhr').html(xhr.responseText)
                }
            });
        },
        minLength: 2,
        focus: function(event, ui) {
            $("#kecamatan").val(ui.item['kecamatan']);
            $("#kecamatan").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#kecamatan").val(ui.item['kecamatan']);
            $("#kecamatan").removeClass("ui-autocomplete-loading");
            return false;
        }
    });

});
function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#wilayah_id').val("");
    $('#provinsi').val("");
    $('#kabkota').val("");
    $('#nama_kabkota').val("");
    $('#kecamatan').val("");
    $('#desa').val("");
    $('#kode_pos').val("");
}
function simpan(){
    var url;
    url = base_url + "admin/wilayah/insert";
    var formData = new FormData($('#form')[0]);
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        beforeSend: function() {
            // setting a timeout
            $('#btnsimpan').prop("disabled",true);
            $('#iconsimpan').removeClass('fa fa-save')
            $('#iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                getwilayah(1)
                tampilkanPesan('warning',data.message);
                $('#modal').modal('hide');
            }
            else{
                swal({
                    title: "Peringatan",
                    text: data.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnsimpan').prop("disabled",false);
            $('#iconsimpan').removeClass('fa fa-spinner spin')
            $('#iconsimpan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnsimpan').prop("disabled",false);
            $('#iconsimpan').removeClass('fa fa-spinner spin')
            $('#iconsimpan').addClass('fa fa-save')
        }
    });
}
function hapus(id) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "admin/wilayah/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getwilayah(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textwilayah, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/wilayah/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getwilayah(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#wilayah_id').val(data.data.wilayah_id)
                $('#provinsi').val(data.data.provinsi)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textwilayah, errorThrown) {
            alert('Error')
        }
    });
}