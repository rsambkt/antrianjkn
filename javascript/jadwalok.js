$(document).ready(function() {
    
    $('.tanggal').inputmask('yyyy-mm-dd', {
        'placeholder': 'yyyy-mm-dd'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	$.widget("custom.caripasien", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                reg_unit: "Reg Unit",
                tgl_kunjungan: "Tanggal",
                nomr_pasien: "Nomr",
                nama_pasien: "Nama",
                nama_poli: "Nama Poli",
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
                "<div class='col-md-2'>" + item.reg_unit + "</div>" +
				"<div class='col-md-2'>" + item.tgl_kunjungan + "</div>" +
                "<div class='col-md-1'>" + item.nomr_pasien + "</div>" +
                "<div class='col-md-4'>" + item.nama_pasien + "</div>" +
                "<div class='col-md-3'>" + item.nama_poli + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }

    });
	$("#caripasien").caripasien({
		source: function(request, response) {
			var faskes=$('#faskes').val();
			$.ajax({
				url: base_url+"jkn/jadwalok/pasien",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					// var fk = data.response.faskes;
					// console.log(diagnosa);
					response(data.slice(0, 15));
				},
				error: function(jqXHR, ajaxOption, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
		minLength: 2,
		focus: function(event, ui) {
			
			$("#idx_pendaftaran").val(ui.item['idx_pendaftaran']);
			$("#nopeserta").val(ui.item['nobpjs']);
			$("#kodepoli").val(ui.item['kode_jkn']);
			$("#namapoli").val(ui.item['nama_poli']);
			$("#nomr_pasien").val(ui.item['nomr_pasien']);
			$("#nama_pasien").val(ui.item['nama_pasien']);
			$("#caripasien").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#caripasien").val('');
			$("#idx_pendaftaran").val(ui.item['idx_pendaftaran']);
			$("#nopeserta").val(ui.item['nobpjs']);
			$("#kodepoli").val(ui.item['kode_jkn']);
			$("#namapoli").val(ui.item['nama_poli']);
			$("#nomr_pasien").val(ui.item['nomr_pasien']);
			$("#nama_pasien").val(ui.item['nama_pasien']);
			$("#caripasien").removeClass("ui-autocomplete-loading");
			// spesialistiRujukan()
			return false;
		}
	});
	getJadwalOk();
});

function getJadwalOk(){
	var tanggal=$('#tanggal').val();
	var akhir=$('#akhir').val();
    var url = base_url+"jkn/jadwalok/datajadwal";
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {tglawal:tanggal,tglakhir:akhir},
        beforeSend: function() {
            // setting a timeout
            $('#datajadwalok').html('<tr><td colspan="11"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    console.clear();
			// alert(data.metadata.code)
		    if(data.metadata.code==200){
		        var task=data.response;
				var table="";
				var no=0;
				for (let i = 0; i < task.length; i++) {
					no++;
					const e = task[i];
					if(e.terlaksana==1) {
						var cl="btn-success";
						var st="Terlaksana"
						var ubahstatus=0;
					}
					else  {
						var cl='btn-danger'
						var st='Belum Terlaksana'
						var ubahstatus=1;
					}
					table+=`<tr>
					<td>`+no+`</td>
					<td>`+e.nomr+`</td>
					<td>`+e.reg_unit+`</td>
					<td>`+e.kodebooking+`</td>
					<td>`+e.nama_pasien+`</td>
					<td>`+e.kodepoli+`</td>
					<td>`+e.namapoli+`</td>
					<td>`+e.tanggaloperasi+`</td>
					<td>`+e.jenistindakan+`</td>
					<td><button class='btn `+cl+` btn-xs' onclick="ubahStatus(`+e.idx_jadwal+`,`+ubahstatus+`)" type="button">`+st+`</button></td>
					<td style="width:200px">
						<div class="btn-group">
						<button class='btn btn-primary btn-sm' onclick="editJadwal('`+e.idx_jadwal+`')"><span class='fa fa-pencil'></span> Ubah JAdwal</button>
						<button class='btn btn-danger btn-sm' onclick="hapusJadwal('`+e.idx_jadwal+`')"><span class='fa fa-remove'></span> Batal</button>
						</div>
					</td>
				</tr>`;
				}
				$('#datajadwalok').html(table);
		    }else{
				// alert(data.metadata.code)
                var tabel="<tr><td colspan='15'>"+data.metadata.message+"</td></tr>";
                $('#datajadwalok').html(tabel);
            }
		}
	});
}
function editJadwal(idx){
	
    var url = base_url+"jkn/jadwalok/ubahjadwal/"+idx;
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {},
        beforeSend: function() {
            // setting a timeout
            // $('#datajadwalok').html('<tr><td colspan="11"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    //menghitung jumlah data
		    // console.clear();
			
		    if(data.metadata.code==200){
				// alert(data.metadata.code)
				$("#modaljadwal").modal('show');
				$('#idx').val(data.response.idx_jadwal)
				$('#idx_pendaftaran').val(data.response.idx_pendaftaran)
				$('#nopeserta').val(data.response.nopeserta)
				$('#nomr_pasien').val(data.response.nomr_pasien)
				$('#nama_pasien').val(data.response.nama_pasien)
				$('#kodepoli').val(data.response.kodepoli)
				$('#jenistindakan').val(data.response.jenistindakan)
				$('#tanggaloperasi').val(data.response.tanggaloperasi)
		    }else{
				alert(data.metadata.code)
                
            }
		}
	});
}
function ubahStatus(idx,st){
	
    var url = base_url+"jkn/jadwalok/ubahstatus/"+idx+"/"+st;
	$.ajax({
		url     : url,
		type    : "GET",
		dataType: "json",
		data    : {},
        beforeSend: function() {
            // setting a timeout
            // $('#datajadwalok').html('<tr><td colspan="11"><span class="fa fa-spinner fa-spin"></span> Menunggu...</td></tr>');
        },
		success : function(data){
		    getJadwalOk();
		}
	});
}
function tambahJadwal(){
	$('#modaljadwal').modal('show');
	
	$("#formjadwal").trigger("reset");
	$('#idx').val("");
}
function simpanJadwalOk(){
	var formdata={
		'idx':$('#idx').val(),
		'idx_pendaftaran':$('#idx_pendaftaran').val(),
		'nopeserta':$('#nopeserta').val(),
		'tanggaloperasi':$('#tanggaloperasi').val(),
		'jenistindakan':$('#jenistindakan').val(),
		'kodepoli':$('#kodepoli').val(),
		'namapoli':$('#kodepoli :selected').html(),
	}
	$.ajax({
		url: base_url+"jkn/jadwalok/simpanjadwal",
		type: "POST",
		data: formdata,
		dataType: "JSON",
		success: function(data) {
			if (data.status == true) {
				alert(data.message)
				$('#modaljadwal').modal('hide');
				$("#formjadwal").trigger("reset");
				getJadwalOk();
			} else {
				alert(data.message);
			}
		},
		error: function(jqXHR, ajaxOption, errorThrown) {
			console.log(jqXHR.responseText);
		}
	});
}
function hapusJadwal(id) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "jkn/jadwalok/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                // tampilkanPesan('success',data.metdata.message)
                getJadwalOk();
                
            },
            error: function (jqXHR, textsuku, errorThrown) {
                alert('Error')
            }
        });
    }
}
