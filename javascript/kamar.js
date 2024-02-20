function getKamar(start){
    $('#start').val(start);
    var search = $('#q').val();
    var limit = $('#limit').val();
    var param = $('#param').val();
    var url = base_url+'admin/kamar/datakamar?keyword=' + search + "&start=" + start + "&limit=" + limit + "&param=" + param;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='13'><b>Loading...</b></td></tr>";
            $('#datakamar').html(tabel);
            $('#pagination').html('');
        },success : function(data){
            //menghitung jumlah data
            if(data["status"]==true){
                $('#datakamar').html('');
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
                    var terisi = parseInt(res[i]['terisilk'])+ parseInt(res[i]['terisipr']);
                    var dis = (terisi>0 ? "disabled" : "");
                    tabel="<tr>";tabel+="<td>"+no+"</td>";
                    tabel+="<td>"+res[i]['nama_ruang']+"</td>";
                    tabel+="<td>"+res[i]['nama_kamar']+"</td>";
                    tabel+="<td><b>"+res[i]['kelasjkn']+"</b> - "+res[i]['kelas_kamar']+"</td>";
                    tabel+="<td>"+res[i]['penempatan']+"</td>";
                    tabel+="<td>"+res[i]['aktif']+"</td>";
                    tabel+="<td>"+res[i]['nonaktif']+"</td>";
                    tabel+="<td>"+res[i]['rusak']+"</td>";
                    tabel+="<td>"+res[i]['tersedia']+"</td>";
                    tabel+="<td>"+res[i]['terisilk']+"</td>";
                    tabel+="<td>"+res[i]['terisipr']+"</td>";
                    tabel+="<td>"+res[i]['totaltt']+"</td>";
                    if(res[i]['bpjsimport']==0) var btnimp=`<a href='#' class='btn btn-default btn-xs'  onclick='simpanAplicare(`+res[i]['id_kamar']+`)'><span class='fa fa-bed'></span> Tambah Kamar Applicare</a>`;
                    else var btnimp=`<a href='#' class='btn btn-info btn-xs'  onclick='updateAplicare(`+res[i]['id_kamar']+`)'><span class='fa fa-bed'></span> Update Kamar Applicare</a>`;
                    tabel+=`<td>
                    <div class='btn-group'> `+btnimp+`
                    <a href='#' class='btn btn-primary btn-xs'  onclick='bed(`+res[i]['id_kamar']+`)'><span class='fa fa-bed'></span> Bed</a>
                    <a href='#' class='btn btn-warning btn-xs'  onclick='edit(`+res[i]['id_kamar']+`)'><span class='fa fa-pencil'></span> Edit</a>
                    <button onclick='hapus(`+res[i]['id_kamar']+`)' class='btn btn-danger btn-xs' `+dis+`><span class='fa fa-trash'></span> Hapus</button>
                    </div>
                    </td>`;
                    tabel+="</tr>";
                    $('#datakamar').append(tabel);
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
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='getKamar(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-1;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='getKamar("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+1;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='getKamar("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='getKamar("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
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
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getKamar("+ j +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getKamar("+ j +")'>" + j +"</button>";
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
function showAplicare(start){
    $('#startapp').val(start);
    var limit = $('#limitapp').val();
    var url = base_url+'applicare/bed/kamar/' + start + "/" + limit;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='13'><b>Loading...</b></td></tr>";
            $('#data-aplicare').html(tabel);
            $('#paginationapp').html('');
        },success : function(data){
            //menghitung jumlah data
            if(data.metadata.code==1){
                $('#data-aplicare').html('');
                var res    = data.response.list;
                var jmlData=res.length;
                var tabel   = "";
                //Create Tabel
                var no = (parseInt(start)*parseInt(limit))-parseInt(limit);
                var dari = no+1;
                var sampai = no+parseInt(limit);
                var desc = "<button class='btn btn-default btn-sm' type='button'>Showing "+ dari + " To " + sampai + " of " +data["row_count"]+"</button>";
                for(var i=0; i<jmlData;i++){
                    no++;
                    var tersedia = parseInt(res[i]['tersediapria'])+ parseInt(res[i]['tersediawanita'])+ parseInt(res[i]['tersediapriawanita']);
                    var kapasitas = parseInt(res[i]['kapasitas']);
                    var dis = (tersedia < kapasitas ? "disabled" : "");
                    tabel="<tr>";tabel+="<td>"+res[i]["rownumber"]+"</td>";
                    tabel+="<td>"+res[i]['namakelas']+"</td>";
                    tabel+="<td>"+res[i]['namaruang']+"</td>";
                    tabel+="<td>"+res[i]['tersediapria']+"</td>";
                    tabel+="<td>"+res[i]['tersediawanita']+"</td>";
                    tabel+="<td>"+res[i]['tersediapriawanita']+"</td>";
                    tabel+="<td>"+res[i]['kapasitas']+"</td>";tabel+=`<td>
                    <div class='btn-group'>
                    <a href='#' class='btn btn-primary btn-xs'  onclick='bed(`+res[i]['koderuang']+`)'><span class='fa fa-bed'></span> Bed</a>
                    <a href='#' class='btn btn-warning btn-xs'  onclick='edit(`+res[i]['koderuang']+`)'><span class='fa fa-pencil'></span> Edit</a>
                    <button onclick='hapusApplicare("`+res[i]['koderuang']+`","`+res[i]['kodekelas']+`")' class='btn btn-danger btn-xs' `+dis+`><span class='fa fa-trash'></span> Hapus</button>
                    </div>
                    </td>`;
                    tabel+="</tr>";
                    $('#data-aplicare').append(tabel);
                }
                //Create Pagination
                if(data.metadata.totalitems<=limit){
                    $('#pagination').html("");
                }else{
                    console.log("buat Pagination");
                    var pagination="";
                    var btnIdx="";
                    jmlPage = Math.ceil(data.metadata.totalitems/limit);
                    offset  = start % limit;
                    
                    var curIdx = start;
                    var btn="btn-default";
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='showAplicare(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-limit;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='showAplicare("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+limit;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='showAplicare("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='showAplicare("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
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
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='showAplicare("+ j*limit +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='showAplicare("+ j*limit +")'>" + j +"</button>";
                        }
                    }
                    pagination+="<div class='btn-group'>"+desc+btnFirst + btnIdx + btnLast+"</div>";
                    $('#paginationapp').html(pagination);
                }
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
getKamar(1)

function tambah(){
    $('#modal').modal('show');
    resetForm();
}
function resetForm(){
    $('#id_ruang').val("");
    $('#id_kamar').val("");
    $('#kelas_id').val("");
    $('#jekel').val("");
    $('#nama_kamar').val("");
    $('#status_ruang').prop('checked',false);
}
function simpan(){
    var url=base_url + "admin/kamar/insert";
    var status_kamar = $("#status_kamar").prop("checked");
    var st = (status_kamar==true ? 1:0);
    var formData = {
        id_kamar:$('#id_kamar').val(),
        id_ruang:$('#id_ruang').val(),
        nama_ruang:$('#id_ruang :selected').html(),
        kelas_id:$('#kelas_id').val(),
        kelas_kamar:$('#kelas_id :selected').html(),
        nama_kamar:$('#nama_kamar').val(),
        jekel:$('#jekel').val(),
        status_kamar: st
    };
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
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
                var start=$('#start').val();
                getKamar(start)
                // tampilkanPesan('warning',data.message);
                simpanAplicare(data.idkamar);
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
            url: base_url + "admin/kamar/hapus/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.status==true){
                    tampilkanPesan('success',data.message)
                    var start=$('#start').val();
                    getKamar(start);
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
function hapusApplicare(koderuang,kodekelas) {
    var isConfirm = confirm("Apakah anda yakin akan menghapus")
    if (isConfirm) {
        $.ajax({
            url: base_url + "applicare/bed/hapus/" + kodekelas+"/"+koderuang,
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if(data.metadata.code==1){
                    tampilkanPesan('success',data.metadata.message)
                    // var start=$('#startapp').val();
                    showAplicare(1);
                }else{
                    tampilkanPesan('error',data.metadata.message)
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
        url: base_url + "admin/kamar/edit/" + id,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getKamar(1);
            if(data.status==true){
                $('#modal').modal('show');
                $('#id_kamar').val(data.data.id_kamar)
                $('#id_ruang').val(data.data.id_ruang)
                $('#kelas_id').val(data.data.kelas_id)
                $('#nama_kamar').val(data.data.nama_kamar)
                $('#jekel').val(data.data.jekel)
                if(data.data.status_kamar==1) $('#status_kamar').prop('checked',true);
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
function bed(idkamar){
    var url=base_url+"admin/kamar/bed/"+idkamar;
    location.href=url;
}
function simpanAplicare(kamarid) {
    $.ajax({
        url: base_url + "applicare/bed/create/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                var start=$('#start').val();
                getKamar(start);
                tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}
function updateAplicare(kamarid) {
    $.ajax({
        url: base_url + "applicare/bed/update/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                var start=$('#start').val();
                getKamar(start);
                tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}