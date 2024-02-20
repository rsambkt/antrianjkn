function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function pilihRuang(ruid){
    var url=base_url + "ranap/home/pilihruang/" + ruid;
    location.href=url;
}
function pilihRuangRajal(ruid){
    var url=base_url + "rajal/home/pilihruang/" + ruid;
    location.href=url;
}
function pilihDepo(ruid){
    var url=base_url + "farmasi/home/pilihruang/" + ruid;
    location.href=url;
}
function resetForm(){
    $('#idx').val("");
    $('#kode_jkn').val("");
    $('#kode_poli_jkn').val("");
    $('#poliklinik').val("");
    $('#loketid').val("");
    $('#displayid').val("");
    $('#ruang').val("");
    $('#jns_layanan').val("");
    $('#status_ruang').prop('checked',false);
}
function getruang(start){
	$('#start').val(start);
	var search = $('#q').val();
	var limit = $('#limit').val();
	var status_ruang = $('#sr').prop('checked')==true?1:0;;
	var jnslayanan = $('#jnslayanan').val();
	var url = base_url+'admin/ruang/dataruang?keyword=' + search + "&start=" + start + "&limit=" + limit + "&statusruang=" + status_ruang+ "&jnslayanan=" + jnslayanan
	$.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='6'><b>Loading...</b></td></tr>";
            $('#dataruang').html(tabel);
            $('#pagination').html('');
        },success : function(data){
        //menghitung jumlah data
        
			if(data["status"]==true){
				$('#dataruang').html('');
				var res    = data["data"];
				var jmlData=res.length;
				var limit   = data["limit"];
				var tabel   = "";
				//Create Tabel
				var no = (parseInt(start)*parseInt(limit))-parseInt(limit);
				var dari = no+1;
				var sampai = no+parseInt(limit);
				var desc = "<button class='btn btn-default btn-sm' type='button'>Showing "+ dari + " To " + sampai + " of " +data["row_count"]+"</button>";
				for(var i=0; i<jmlData;i++){
					no++;
					tabel="<tr>";tabel+="<td>"+no+"</td>";
					tabel+="<td>"+res[i]["kode_poli_jkn"]+" - "+res[i]["poliklinik"]+"</td>";
					tabel+="<td>"+res[i]["kode_jkn"]+" - "+res[i]["ruang"]+"</td>";
					tabel+="<td>"+res[i]['jenislayanan']+"</td>";
					tabel+="<td>"+res[i]['loketnama']+"</td>";
					tabel+="<td>"+res[i]['display']+"</td>";
					if(res[i]['status_ruang']==1) tabel+="<td><span class='btn btn-success btn-xs'>Aktif</span></td>";
					else tabel+="<td><span class='btn btn-danger btn-xs'>Non Aktif</span></td>";
					tabel+="<td><div class='btn-group'><a href='#' class='btn btn-warning btn-xs'  onclick='edit("+res[i]["idx"]+")'><span class='fa fa-pencil'></span> Edit</a><button onclick='hapus("+res[i]["idx"]+")' class='btn btn-danger btn-xs'><span class='fa fa-trash'></span> Hapus</button></div></td>";tabel+="</tr>";
					$('#dataruang').append(tabel);
				}
				//Create Pagination
				if(data["row_count"]<=limit){
					$('#pagination').html("");
				}else{
					console.log("buat Pagination");
					var pagination="";
					var btnIdx="";
					jmlPage = Math.ceil(data["row_count"]/limit);
					offset  = data["start"] % limit;
					var curIdx = start;
					var btn="btn-default";
					var btnFirst="<button class='btn btn-default btn-sm' onclick='getruang(1)'><span class='fa fa-angle-double-left'></span></button>";
					if (curIdx > 1) {
						var prevSt=curIdx-1;
						btnFirst+="<button class='btn btn-default btn-sm' onclick='getruang("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
					}
		
					var btnLast="";
					if(curIdx<jmlPage){
						var nextSt=curIdx+1;
						btnLast+="<button class='btn btn-default btn-sm' onclick='getruang("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
					}
					console.log(curIdx);
					btnLast+="<button class='btn btn-default btn-sm' onclick='getruang("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
					
					if(jmlPage>=5){
						console.clear();
						console.log('Jumlah Halaman > 5');
						if(curIdx>=3){
							console.log('Cur Idx >= 3');
							var idx_start=curIdx - 2;
							var idx_end=curIdx + 2;
							if(idx_end>=jmlPage) idx_end=jmlPage;
						}else{
							var idx_start=1;
							var idx_end=5;
						}
						for (var j = idx_start; j<=idx_end; j++) {
							if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
							btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getruang("+ j +")'>" + j +"</button>";
						}
					}else{
		
						for (var j = 1; j<=jmlPage; j++) {
							if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
							btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getruang("+ j +")'>" + j +"</button>";
						}
					}
					pagination+="<div class='btn-group'>"+desc+btnFirst + btnIdx + btnLast+"</div>";
					$('#pagination').html(pagination);
				}
			}
		},
		complete : function(){
			//$('#loading').hide();
		}
	});
}
getruang(1)   

function simpan(){
    var url;
    url = base_url + "admin/ruang/insert";
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
                getruang(1)
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
            tampilkanPesan('error',xhr.statusText+' - '+xhr.responseText)
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
            url: base_url + "admin/ruang/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    getruang(1);
                }else{
                    tampilkanPesan('error',data.message)
                }
                
            },
            error: function (jqXHR, textruang, errorThrown) {
                alert('Error')
            }
        });
    }
}
function edit(id) {
    $.ajax({
        url: base_url + "admin/ruang/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getruang(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#idx').val(data.data.idx)
                $('#kode_jkn').val(data.data.kode_jkn)
                $('#ruang').val(data.data.ruang)
                $('#kode_poli_jkn').val(data.data.kode_poli_jkn)
                $('#poliklinik').val(data.data.poliklinik)
                $('#loketid').val(data.data.loketid)
                $('#displayid').val(data.data.displayid)
                $('#jns_layanan').val(data.data.jns_layanan)
                if(data.data.status_ruang=="1") {
					$('#status_ruang').prop('checked',true);
				}
                else  $('#status_ruang').prop('checked',false)
            }else{
                tampilkanPesan('danger',data.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}
