$(document).ready(function() {
	
    $('input,textarea').focus(function() {
        return $(this).select();
    });
    
    $('.tanggal').inputmask('dd/mm/yyyy', {
        'placeholder': 'dd/mm/yyyy'
    });
    $('.tanggal').datepicker({
        autoclose: true,
        dateFormat: "dd/mm/yy"
    });
	
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });

	$('.select2').select2({
        placeholder: '------------ Pilih option ------------'
    });	
	$('.kategoritindakan').select2({
        placeholder: '------------ Pilih Kategori Tindakan ------------'
    });	
	$('.layanan').select2({
        placeholder: '------------ Pilih Tindakan / Layanan ------------'
    });	

	// $("#tree").fancytree({
	// 	// checkbox: true,
	// 	treeId: "nav",
	// 	autoActivate: false, // we use scheduleAction()
	// 	autoCollapse: true,
	// 	//			autoFocus: true,
	// 	autoScroll: true,
	// 	clickFolderMode: 3, // expand with single click
	// 	minExpandLevel: 2,
	// 	tabindex: "-1", // we don't want the focus frame
	// 	// toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 2000 },
	// 	// scrollParent: null, // use $container
	// 	tooltip: function(event, data) {
	// 		return data.node.title;
	// 	},
	// 	focus: function(event, data) {
	// 		var node = data.node;
	// 		// Auto-activate focused node after 1 second
	// 		if(node.data.href){
	// 			node.scheduleAction("activate", 1000);
	// 		}
	// 	},
	// 	blur: function(event, data) {
	// 		data.node.scheduleAction("cancel");
	// 	},
	// 	beforeActivate: function(event, data){
	// 		var node = data.node;

	// 		if( node.data.href && node.data.target === "_blank") {
	// 			window.open(node.data.href, "_blank");
	// 			return false; // don't activate
	// 		}
	// 	},
	// 	activate: function(event, data){
	// 		var node = data.node,
	// 			orgEvent = data.originalEvent || {};

	// 		// Open href (force new window if Ctrl is pressed)
	// 		if(node.data.href){
	// 			// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
	// 		}
	// 		// When an external link was clicked, we don't want the node to become
	// 		// active. Also the URL fragment should not be changed
	// 		if( node.data.target === "_blank") {
	// 			return false;
	// 		}
	// 		// Append #HREF to URL without actually loading content
	// 		// (We check for this value on page load re-activate the node.)
	// 		if( window.parent &&  parent.history && parent.history.pushState ) {
	// 			parent.history.pushState({title: node.title}, "", "#" + (node.data.href || ""));
	// 		}
	// 	},
	// 	click: function(event, data){
	// 		// We implement this in the `click` event, because `activate` is not
	// 		// triggered if the node already was active.
	// 		// We want to allow re-loads by clicking again.
	// 		console.clear();
	// 		console.log(data);
	// 		var node = data.node,
	// 			orgEvent = data.originalEvent;
	// 		if(node.data.href!=undefined)
	// 		getPemeriksaan(node.data.href);
	// 		// Open href (force new window if Ctrl is pressed)
	// 		if(node.isActive() && node.data.href){
	// 			// alert("ok")
				
	// 			// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
	// 		}
	// 	}
	// });
	// $("#treer").fancytree({
	// 	// checkbox: true,
	// 	treeId: "nav",
	// 	autoActivate: false, // we use scheduleAction()
	// 	autoCollapse: true,
	// 	autoScroll: true,
	// 	clickFolderMode: 3, // expand with single click
	// 	minExpandLevel: 2,
	// 	tabindex: "-1", // we don't want the focus frame
	// 	// toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 2000 },
	// 	// scrollParent: null, // use $container
	// 	tooltip: function(event, data) {
	// 		return data.node.title;
	// 	},
	// 	focus: function(event, data) {
	// 		var node = data.node;
	// 		// Auto-activate focused node after 1 second
	// 		if(node.data.href){
	// 			node.scheduleAction("activate", 1000);
	// 		}
	// 	},
	// 	blur: function(event, data) {
	// 		data.node.scheduleAction("cancel");
	// 	},
	// 	beforeActivate: function(event, data){
	// 		var node = data.node;

	// 		if( node.data.href && node.data.target === "_blank") {
	// 			window.open(node.data.href, "_blank");
	// 			return false; // don't activate
	// 		}
	// 	},
	// 	activate: function(event, data){
	// 		var node = data.node,
	// 			orgEvent = data.originalEvent || {};

	// 		// Open href (force new window if Ctrl is pressed)
	// 		if(node.data.href){
	// 			// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
	// 		}
	// 		// When an external link was clicked, we don't want the node to become
	// 		// active. Also the URL fragment should not be changed
	// 		if( node.data.target === "_blank") {
	// 			return false;
	// 		}
	// 		// Append #HREF to URL without actually loading content
	// 		// (We check for this value on page load re-activate the node.)
	// 		if( window.parent &&  parent.history && parent.history.pushState ) {
	// 			parent.history.pushState({title: node.title}, "", "#" + (node.data.href || ""));
	// 		}
	// 	},
	// 	click: function(event, data){
	// 		// We implement this in the `click` event, because `activate` is not
	// 		// triggered if the node already was active.
	// 		// We want to allow re-loads by clicking again.
	// 		console.clear();
	// 		console.log(data);
	// 		var node = data.node,
	// 			orgEvent = data.originalEvent;
	// 		if(node.data.href!=undefined)
	// 		getPemeriksaanRadiologi(node.data.href);
	// 		// Open href (force new window if Ctrl is pressed)
	// 		if(node.isActive() && node.data.href){
	// 			// alert("ok")
				
	// 			// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
	// 		}
	// 	}
	// });
	// // On page load, activate node if node.data.href matches the url#href
	// var tree = $.ui.fancytree.getTree(),
	// 	frameHash = window.parent && window.parent.location.hash;

	// if( frameHash ) {
	// 	frameHash = frameHash.replace("#", "");
	// 	tree.visit(function(n) {
	// 		if( n.data.href && n.data.href === frameHash ) {
	// 			n.setActive();
	// 			return false; // done: break traversal
	// 		}
	// 	});
	// }
});
function checkAll(){
	var pilih=$('#checkall').prop("checked");
	$('.pemeriksaan').prop("checked",pilih);
	if(pilih==true){
		$('#btnSimpanPermintaan').prop("disabled",false)
	}else{
		$('#btnSimpanPermintaan').prop("disabled",true)
	}
}
function checkAllRadiologi(){
	var pilih=$('#checkall').prop("checked");
	$('.pemeriksaan').prop("checked",pilih);
	if(pilih==true){
		$('#btnSimpanPermintaanRadilogi').prop("disabled",false)
	}else{
		$('#btnSimpanPermintaanRadilogi').prop("disabled",true)
	}
}
function getPemeriksaan(kode,idx_permintaan=""){
	if(idx_permintaan=="") idx_permintaan=$('#idx_permintaan').val();
	var url = base_url+'rajal/kunjungan/datapemeriksaan/' + kode+"/"+idx_permintaan;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data.status==true){
                var res=data.data;
				var table='';
				$('#kode').val(kode);
				var title=`<input type='checkbox' name='chekall' class='pemeriksaan' id='checkall' value='1' onclick="checkAll()"> `+data.kat.namapemeriksaan;
				$('#v-namapemeriksaan').html(title)
				var jml=res.length;
				
				for (let i = 0; i < res.length; i++) {
					const e = res[i];
					if(jml>15) var cl='col-md-6'; else var cl='col-md-12';
					// alert(e.idx_detail);
					if(e.idx_detail ==null) table+=`<div class='`+cl+`'><input type='checkbox' name='pemeriksaan[]' class='pemeriksaan' id='pemeriksaan`+e.kode+`' value='`+e.kode+`' onclick="setPemeriksaan()"> `+e.namapemeriksaan+`</div>`;
					else {
						table+=`<div class='`+cl+`'><input type='checkbox' name='pemeriksaan[]' class='pemeriksaan' id='pemeriksaan`+e.kode+`' value='`+e.kode+`' onclick="removeDetailPemeriksaan(`+e.idx_detail+`)" checked > `+e.namapemeriksaan+`</div>`;
						$('#btnSimpanPermintaan').prop("disabled",false)
					}
				}
                $('#datapemeriksaan').html(table);
				console.log(table)
            }else{
				$('#datapemeriksaan').html('');
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getPemeriksaanRadiologi(kode,idx_permintaan=""){
	if(idx_permintaan=="") idx_permintaan=$('#idx_permintaanradiologi').val();
	var url = base_url+'rajal/kunjungan/datapemeriksaanradiologi/' + kode+"/"+idx_permintaan;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data.status==true){
                var res=data.data;
				var table='';
				$('#koder').val(kode);
				var title=`<input type='checkbox' name='chekall' class='pemeriksaan' id='checkall' value='1' onclick="checkAllRadiologi()"> `+data.kat.namapemeriksaan;
				$('#v-namapemeriksaanradilogi').html(title)
				var jml=res.length;
				
				for (let i = 0; i < res.length; i++) {
					const e = res[i];
					var x=jml/5;
					if(x<=1) var cl='col-md-12'; else if(x<=2) var cl='col-md-6'; else var cl='col-md-4';
					// alert(e.idx_detail);
					if(e.idx_detail ==null) table+=`<div class='`+cl+`'><input type='checkbox' name='pemeriksaanradiologi[]' class='pemeriksaan' id='pemeriksaan`+e.kode+`' value='`+e.kode+`' onclick="setPemeriksaanRadiologi()"> `+e.namapemeriksaan+` <b><i>`+e.keterangan+	`</i></b></div>`;
					else {	
						table+=`<div class='`+cl+`'><input type='checkbox' name='pemeriksaanradiologi[]' class='pemeriksaan' id='pemeriksaan`+e.kode+`' value='`+e.kode+`' onclick="removeDetailPemeriksaanRadiologi(`+e.idx_detail+`)" checked > `+e.namapemeriksaan+` <b></i>`+e.keterangan+`</i></b></div>`;
						$('#btnSimpanPermintaanRadilogi').prop("disabled",false)
					}
				}
                $('#datapemeriksaanradiologi').html(table);
				console.log(table)
            }else{
				$('#datapemeriksaanradiologi').html('');
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function setPemeriksaan(kode){
	$('input[name="pemeriksaan[]"]').each(function(){
		// alert($(this).attr('id'));
		// alert($(this).prop('checked'));
		if($(this).prop('checked')==true){
			$('#btnSimpanPermintaan').prop("disabled",false);
			return false;
		}else{
			$('#btnSimpanPermintaan').prop("disabled",true);
		}
	   
	});
}
function setPemeriksaanRadiologi(kode){
	$('input[name="pemeriksaanradiologi[]"]').each(function(){
		// alert($(this).attr('id'));
		// alert($(this).prop('checked'));
		if($(this).prop('checked')==true){
			$('#btnSimpanPermintaanRadilogi').prop("disabled",false);
			return false;
		}else{
			$('#btnSimpanPermintaanRadilogi').prop("disabled",true);
		}
	   
	});
}
function removeDetailPemeriksaan(idx){
	var url = base_url+'rajal/kunjungan/hapusdetailpemeriksaan/' + idx;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data.status==true){
                var res=data.data;
				var table='';
				var kode = $('#kode').val();
				getPemeriksaan(kode)
            }else{
				$('#datapemeriksaan').html('');
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function removeDetailPemeriksaanRadiologi(idx){
	var url = base_url+'rajal/kunjungan/hapusdetailpemeriksaanradiologi/' + idx;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data.status==true){
                var res=data.data;
				var table='';
				var kode = $('#koder').val();
				getPemeriksaanRadiologi(kode)
            }else{
				$('#datapemeriksaan').html('');
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function simpanAsesmenDokter(){
    var url;
    url = base_url + "rajal/kunjungan/simpanasesmen";
	// var sumber = $("#sumberdata input:checkbox:checked").map(function(){
	// 	return $(this).val();
	//   }).get();

	var sumber = $("input[name='sumberdata[]']")
              .map(function(){return $(this).val();}).get();
    var formdata = {
        'idx':$('#idx').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'tanggalasesmen':$('#tanggalasesmen').val(),
        'sumberinformasi':sumber.join(),
        'keluhanutama':$('#keluhanutama').val(),
        'riwayat_penyakit_sekarang':$('#riwayat_penyakit_sekarang').val(),
        'riwayat_penyakit_dahulu':$('#riwayat_penyakit_dahulu').val(),
        'alloanamnessa':$('#alloanamnessa').val(),
        'riwayat_penyakit_keluarga':$('#riwayat_penyakit_keluarga').val(),
        'pemeriksaan_fisik_kepala':$('#pemeriksaan_fisik_kepala').val(),
        'pemeriksaan_fisik_torak':$('#pemeriksaan_fisik_torak').val(),
        'kajian_awal_medis':$('#kajian_awal_medis').val()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnsimpan').prop("disabled",true);
            $('#iconsimpan').removeClass('fa fa-arrow-right')
            $('#iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				$('#idx').val(data.insertid)
				// Pindah ke tab cppt
				$('.tab').removeClass("active");
				$('.tab2').addClass("active");
				$('#tab_2').addClass("active");
            }
            else{
                $('#err_sumberinformasi').html(data.error.sumberinformasi)
                $('#err_keluhanutama').html(data.error.keluhanutama)
                $('#err_alloanamnessa').html(data.error.alloanamnessa)
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
            $('#iconsimpan').addClass('fa fa-arrow-right')
        },
        complete: function() {
            $('#btnsimpan').prop("disabled",false);
            $('#iconsimpan').removeClass('fa fa-spinner spin')
            $('#iconsimpan').addClass('fa fa-arrow-right')
        }
    });
}
function simpanCppt(){
    var url;
    url = base_url + "rajal/kunjungan/simpancppt";
	var asesmen=$('#asesmen').val();
	// alert(asesmen);
    var formdata = {
        'idx':$('#cpid').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'tglcatat':$('#tglcatat').val(),
        'td':$('#td').val(),
        'nadi':$('#nadi').val(),
        'nafas':$('#nafas').val(),
        'suhu':$('#suhu').val(),
        'kesadaran':$('#kesadaran').val(),
        'subjective':$('#subjective').val(),
        'objective':$('#objective').val(),
        'kodediagnosa':$('#asesmen').val(),
        'asesmen':$('#asesmen :selected').html(),
        'planning':$('#planning').val()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnSimpanCppt').prop("disabled",true);
            $('#iconSimpanCppt').removeClass('fa fa-save')
            $('#iconSimpanCppt').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				$('#cpid').val(data.insertid)
				$('#btnSelesai').prop("disabled",false);
				// Pindah ke tab cppt
            }
            else{
                $('#err_td').html(data.error.td)
                $('#err_nadi').html(data.error.nadi)
                $('#err_suhu').html(data.error.suhu)
                $('#err_kesadaran').html(data.error.kesadaran)
                $('#err_nafas').html(data.error.nafas)
                $('#err_subjective').html(data.error.subjective)
                $('#err_objective').html(data.error.objective)
                $('#err_asesmen').html(data.error.asesmen)
                $('#err_planning').html(data.error.planning)
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
            $('#btnSimpanCppt').prop("disabled",false);
            $('#iconSimpanCppt').removeClass('fa fa-spinner spin')
            $('#iconSimpanCppt').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnSimpanCppt').prop("disabled",false);
            $('#iconSimpanCppt').removeClass('fa fa-spinner spin')
            $('#iconSimpanCppt').addClass('fa fa-save')
        }
    });
}
function simpanPermintaanLabor(){
    var url;
    url = base_url + "rajal/kunjungan/simpanpermintaanlabor";
	let pemeriksaan=[];
	$('input[name="pemeriksaan[]"]').each(function(){
		if($(this).prop('checked')==true){
			pemeriksaan.push($(this).val());
		}
	});
    var formdata = {
        'idx':$('#idx_permintaan').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'nama':$('#nama').val(),
        'tgllahir':$('#tgllahir').val(),
        'jnskelamin':$('#jnskelamin').val(),
        'id_ruang_asal':$('#id_ruang_asal').val(),
        'nama_ruang_asal':$('#nama_ruang_asal').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'cara_bayar':$('#cara_bayar').val(),
        'jenis_sample':$('#jenis_sample').val(),
        'tglpengambilansample':$('#tglpengambilansample').val(),
        'diagnosa_keterangan_klinis':$('#diagnosa_keterangan_klinis').val(),
        'pemeriksaan':pemeriksaan
    };
	console.clear();
	// console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnSimpanPermintaan').prop("disabled",true);
            $('#iconSimpanPermintaan').removeClass('fa fa-save')
            $('#iconSimpanPermintaan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metadata.code==200){
				// Pindah ke tab cppt
				swal({
					title: "Konfirmasi",
					text: data.metadata.message+"?",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Ya",
					cancelButtonText: "Tidak",
					closeOnConfirm: true,
					closeOnCancel: true
				},
				function(isConfirm) {
					if (isConfirm) {
						var kode=$('#kode').val();
						$('#idx_permintaan').val(data.metadata.data.idx);
						getPemeriksaan(kode,data.metadata.data.idx);
					}else{
						$('#datapemeriksaan').html("");
						$('#idx_permintaan').val("")
						$('#jenis_sample').val("")
						$('#tglpengambilansample').val("")
						$('#diagnosa_keterangan_klinis').val("")
						$('#jenis_sample').val("");
						$('#formpermintaanlabor').hide();
						$('#listpermintaan').show();
						getListPermintaanLabor()
					}
				});

				
            }
            else{
                $('#err_jenis_sample').html(data.error.jenis_sample)
                $('#err_tglpengambilansample').html(data.error.tglpengambilansample)
                $('#err_diagnosa_keterangan_klinis').html(data.error.diagnosa_keterangan_klinis)
                $('#err_pemeriksaan').html(data.error.pemeriksaan)
                swal({
                    title: "Peringatan",
                    text: data.metadata.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnSimpanPermintaan').prop("disabled",false);
            $('#iconSimpanPermintaan').removeClass('fa fa-spinner spin')
            $('#iconSimpanPermintaan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnSimpanPermintaan').prop("disabled",false);
            $('#iconSimpanPermintaan').removeClass('fa fa-spinner spin')
            $('#iconSimpanPermintaan').addClass('fa fa-save')
        }
    });
}
function simpanPermintaanRadiologi(){
    var url;
    url = base_url + "rajal/kunjungan/simpanpermintaanradiologi";
	let pemeriksaan=[];
	$('input[name="pemeriksaanradiologi[]"]').each(function(){
		if($(this).prop('checked')==true){
			pemeriksaan.push($(this).val());
		}
	});
    var formdata = {
        'idx':$('#idx_permintaanradiologi').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'nama':$('#nama').val(),
        'tgllahir':$('#tgllahir').val(),
        'jnskelamin':$('#jnskelamin').val(),
        'id_ruang_asal':$('#id_ruang_asal').val(),
        'nama_ruang_asal':$('#nama_ruang_asal').val(),
        'diagnosa':$('#diagnosa').val(),
        'diagnosa_klinis':$('#diagnosa_klinis').val(),
        'tanggalorder':$('#tanggalorder').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'cara_bayar':$('#cara_bayar').val(),
        'statuspemeriksaan':$('#statuspemeriksaan').val(),
        'pemeriksaan':pemeriksaan
    };
	console.clear();
	// console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnSimpanPermintaan').prop("disabled",true);
            $('#iconSimpanPermintaan').removeClass('fa fa-save')
            $('#iconSimpanPermintaan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metadata.code==200){
				// Pindah ke tab cppt
				swal({
					title: "Konfirmasi",
					text: data.metadata.message+"?",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Ya",
					cancelButtonText: "Tidak",
					closeOnConfirm: true,
					closeOnCancel: true
				},
				function(isConfirm) {
					if (isConfirm) {
						var kode=$('#koder').val();
						$('#idx_permintaanradiologi').val(data.metadata.data.idx);
						getPemeriksaanRadiologi(kode,data.metadata.data.idx);
					}else{
						$('#datapemeriksaan').html("");
						$('#idx_permintaanradiologi').val("")
						$('#diagnosa').val("")
						$('#diagnosa_klinis').val("")
						$('#formpermintaanradiologi').hide();
						$('#listpermintaanradiologi').show();
						getListPermintaanRadiologi()
					}
				});

				
            }
            else{
                $('#err_jenis_sample').html(data.error.jenis_sample)
                $('#err_tglpengambilansample').html(data.error.tglpengambilansample)
                $('#err_diagnosa_keterangan_klinis').html(data.error.diagnosa_keterangan_klinis)
                $('#err_pemeriksaan').html(data.error.pemeriksaan)
                swal({
                    title: "Peringatan",
                    text: data.metadata.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnSimpanPermintaan').prop("disabled",false);
            $('#iconSimpanPermintaan').removeClass('fa fa-spinner spin')
            $('#iconSimpanPermintaan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnSimpanPermintaan').prop("disabled",false);
            $('#iconSimpanPermintaan').removeClass('fa fa-spinner spin')
            $('#iconSimpanPermintaan').addClass('fa fa-save')
        }
    });
}
function buatPermintaanLabor(){
	$('#listpermintaan').hide();
	$('#formpermintaanlabor').show();
	$('#datapemeriksaan').html("");
	$('#idx_permintaan').val("")
	$('#jenis_sample').val("")
	$('#tglpengambilansample').val("")
	$('#diagnosa_keterangan_klinis').val("")
	$('#jenis_sample').val("");
}
function buatPermintaanRadiologi(){
	$('#listpermintaanradiologi').hide();
	$('#formpermintaanradiologi').show();
	$('#datapemeriksaanradiologi').html("");
	$('#idx_permintaanradiologi').val("")
	$('#diagnosa').val("")
	$('#diagnosa_klinis').val("")
}
function buatPermintaanKonsul(){
	$('#listpermintaankonsul').hide();
	$('#formpermintaankonsul').show();
	$('#datapemeriksaankonsul').html("");
	$('#idx_permintaankonsul').val("")
	$('#idruangtujuan').val("").trigger('change')
	$('#doktertujuan').val("")
	$('#diagnosakerja').val("")
	$('#keteranganklinik').val("")
}
function getListPermintaanLabor(){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/permintaanlabor/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#listdatapermintaanlabor').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				if(jmlData==0){
					$('#listpermintaan').hide();
					$('#formpermintaanlabor').show();
				}else{
					$('#listpermintaan').show();
					$('#formpermintaanlabor').hide();
					if(res[0].idx!=null){
						for(var i=0; i<jmlData;i++){
							no++;
							tabel="<tr>";
							tabel+="<td>"+no+"</td>";
							tabel+="<td>"+res[i]['diagnosa_keterangan_klinis']+"</td>";
							tabel+="<td>"+res[i]["jenis_sample"]+"</td>";
							tabel+="<td>"+res[i]['tglpengambilansample']+"</td>";
							tabel+="<td>"+res[i]['cara_bayar']+"</td>";
							tabel+="<td>"+res[i]['pemeriksaan']+"</td>";
							if(res[i]['status_permintaan']==1) {
								tabel+="<td><span class='btn btn-success btn-xs'>Sudah Diproses</span></td>";
								tabel+="<td><div class='btn-group'>"+
								"<button type='button' class='btn btn-default' onclick='lihatHasilPemeriksaan("+res[i].idx_minta+")'><span class='fa fa-print'></span> Lihat</button>"+
								"</div></td>";
							}
							else {
								tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diproses</span></td>";
								tabel+="<td><div class='btn-group'>"+
								"<button type='button' class='btn btn-warning' onclick='ubahPermintaan("+res[i].idx_minta+")'>Ubah</button>"+
								"<button type='button' class='btn btn-danger' onclick='hapusPermintaan("+res[i].idx_minta+")'>Hapus</button></div></td>";
							}
							
							tabel+="</tr>";
							$('#listdatapermintaanlabor').append(tabel);
						}
					}else{
						$('#listpermintaan').hide();
						$('#formpermintaanlabor').show();
					}
					
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getRiwayatPermintaanLabor(){
	var idx_pendaftaran=$('#idx_daftar').val();
    var url = base_url+'rajal/kunjungan/permintaanlabor/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#riwayatdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#riwayatdatapermintaanlabor').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				for(var i=0; i<jmlData;i++){
					no++;
					tabel="<tr>";
					tabel+="<td>"+no+"</td>";
					tabel+="<td>"+res[i]['diagnosa_keterangan_klinis']+"</td>";
					tabel+="<td>"+res[i]["jenis_sample"]+"</td>";
					tabel+="<td>"+res[i]['tglpengambilansample']+"</td>";
					tabel+="<td>"+res[i]['cara_bayar']+"</td>";
					tabel+="<td>"+res[i]['pemeriksaan']+"</td>";
					if(res[i]['status_permintaan']==1) {
						tabel+="<td><span class='btn btn-success btn-xs'>Sudah Diproses</span></td>";
						tabel+="<td><div class='btn-group'>"+
						"<button type='button' class='btn btn-default' onclick='lihatHasilPemeriksaan("+res[i].idx_minta+")'><span class='fa fa-print'></span> Lihat</button>"+
						"</div></td>";
					}
					else {
						tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diproses</span></td>";
						tabel+="<td><div class='btn-group'>"+
						"<button type='button' class='btn btn-warning' onclick='ubahPermintaan("+res[i].idx_minta+")'>Ubah</button>"+
						"<button type='button' class='btn btn-danger' onclick='hapusPermintaan("+res[i].idx_minta+")'>Hapus</button></div></td>";
					}
					
					tabel+="</tr>";
					$('#riwayatdatapermintaanlabor').append(tabel);
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getListTindakan(){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/datatindakan/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#datatindakan').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
				$('#iconTambahTindakan').addClass('fa fa-plus');
				$('#iconTambahtindakan').removeClass('fa fa-refresh');
                $('#datatindakan').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				if(jmlData==0){
					$('#listpermintaan').hide();
					$('#formpermintaanlabor').show();
				}else{
					for(var i=0; i<jmlData;i++){
						no++;
						tabel="<tr>";
						tabel+="<td>"+no+"</td>";
						tabel+="<td>"+res[i]['kategoritindakan']+"</td>";
						tabel+="<td>"+res[i]["namatindakan"]+"</td>";
						tabel+="<td>"+res[i]['namapetugas']+"</td>";
						tabel+="<td><div class='btn-group'>"+
							"<button type='button' class='btn btn-warning btn-xs' onclick='ubahTindakan("+res[i].idx+")'>Ubah</button>"+
							"<button type='button' class='btn btn-danger btn-xs' onclick='hapusTindakan("+res[i].idx+")'>Hapus</button></div></td>";
						
						tabel+="</tr>";
						$('#datatindakan').append(tabel);
					}
					
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getRiwayatTindakan(){
	var idx_pendaftaran=$('#idx_daftar').val();
    var url = base_url+'rajal/kunjungan/datatindakan/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#riwayatdatatindakan').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            $('#riwayatdatatindakan').html('');
            if(data["status"]==true){
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				for(var i=0; i<jmlData;i++){
					no++;
					tabel="<tr>";
					tabel+="<td>"+no+"</td>";
					tabel+="<td>"+res[i]['kategoritindakan']+"</td>";
					tabel+="<td>"+res[i]["namatindakan"]+"</td>";
					tabel+="<td>"+res[i]['namapetugas']+"</td>";
					
					tabel+="</tr>";
					$('#riwayatdatatindakan').append(tabel);
				}
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getListPermintaanRadiologi(){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/permintaanradiologi/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#listdatapermintaanradiologi').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#listdatapermintaanradiologi').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				if(jmlData==0){
					$('#listpermintaanradiologi').hide();
					$('#formpermintaanradiologi').show();
				}else{
					$('#listpermintaanradiologi').show();
					$('#formpermintaanradiologi').hide();
					if(res[0].idx!=null){
						for(var i=0; i<jmlData;i++){
							no++;
							tabel="<tr>";
							tabel+="<td>"+no+"</td>";
							tabel+="<td>"+res[i]['diagnosa_klinis']+"</td>";
							tabel+="<td>"+res[i]["diagnosa"]+"</td>";
							tabel+="<td>"+res[i]['tanggalorder']+"</td>";
							tabel+="<td>"+res[i]['cara_bayar']+"</td>";
							tabel+="<td>"+res[i]['pemeriksaan']+"</td>";
							if(res[i]['status_permintaan']==1) {
								tabel+="<td colspan='2'><span class='btn btn-success btn-xs'>Sudah Diproses</span></td>";
								tabel+="<td><div class='btn-group'>"+
								"<button type='button' class='btn btn-default' onclick='hasilPermintaanRadiologi("+res[i].idx_minta+")'><span class='fa fa-print'></span> Lihat</button>"+
								"</div></td>";
							}
							else {
								tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diproses</span></td>";
								tabel+="<td><div class='btn-group'>"+
								"<button type='button' class='btn btn-warning btn-xs' onclick='ubahPermintaanRadiologi("+res[i].idx_minta+")'>Ubah</button>"+
								"<button type='button' class='btn btn-danger btn-xs' onclick='hapusPermintaanRadiologi("+res[i].idx_minta+")'>Hapus</button></div></td>";
							}
							
							tabel+="</tr>";
							$('#listdatapermintaanradiologi').append(tabel);
						}
					}else{
						$('#listpermintaanradiologi').hide();
						$('#formpermintaanradiologi').show();
					}
					
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getRiwayatPermintaanRadiologi(){
	var idx_pendaftaran=$('#idx_daftar').val();
    var url = base_url+'rajal/kunjungan/permintaanradiologidetail/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#riwayatdatapermintaanradiologi').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#riwayatdatapermintaanradiologi').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				for(var i=0; i<jmlData;i++){
					no++;
					tabel="<tr>";
					tabel+="<td>"+no+"</td>";
					tabel+="<td>"+res[i]['diagnosa_klinis']+"</td>";
					tabel+="<td>"+res[i]["diagnosa"]+"</td>";
					tabel+="<td>"+res[i]['tanggalorder']+"</td>";
					tabel+="<td>"+res[i]['cara_bayar']+"</td>";
					tabel+="<td>"+res[i]['nama_pemeriksaan']+"</td>";
					tabel+="<td><button class='btn btn-default btn-sm' type='button' onclick='cetakPermintaanRadiologi("+res[i]["idxdetail"]+")'><span class='fa fa-search'></span> Lihat</button></td>";
					
					tabel+="</tr>";
					$('#riwayatdatapermintaanradiologi').append(tabel);
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getKonsul(){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/permintaankonsul/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#listdatapermintaankonsul').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#listdatapermintaankonsul').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
				if(jmlData==0){
					$('#listpermintaankonsul').hide();
					$('#formpermintaankonsul').show();
				}else{
					$('#listpermintaankonsul').show();
					$('#formpermintaankonsul').hide();
					if(res[0].idx!=null){
						for(var i=0; i<jmlData;i++){
							no++;
							tabel="<tr>";
							tabel+="<td>"+no+"</td>";
							tabel+="<td>"+res[i]['diagnosakerja']+"</td>";
							tabel+="<td>"+res[i]["keteranganklinik"]+"</td>";
							tabel+="<td>"+res[i]['ruangasal']+"</td>";
							tabel+="<td>"+res[i]['ruangtujuan']+"</td>";
							tabel+="<td>"+res[i]['namaDokterPengirim']+"</td>";
							tabel+="<td>"+res[i]['namadoktertujuan']+"</td>";
							tabel+="<td>"+res[i]['alasankonsul']+"</td>";
							if(res[i]['statusresponse']==1) {
								tabel+="<td colspan='2'><span class='btn btn-success btn-xs'>Sudah Diproses</span></td>";
							}
							else {
								tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diproses</span></td>";
								tabel+="<td><div class='btn-group'>"+
								"<button type='button' class='btn btn-warning btn-xs' onclick='ubahPermintaanKonsul("+res[i].idx+")'>Ubah</button>"+
								"<button type='button' class='btn btn-danger btn-xs' onclick='hapusPermintaanKonsul("+res[i].idx+")'>Hapus</button></div></td>";
							}
							
							tabel+="</tr>";
							$('#listdatapermintaankonsul').append(tabel);
						}
					}else{
						$('#listpermintaankonsul').hide();
						$('#formpermintaankonsul').show();
					}
					
				}
                
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function ubahPermintaan(idx){
    var url = base_url+'rajal/kunjungan/ubahpermintaanlabor/' + idx ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                // $('#listdatapermintaanlabor').html('');
				var res=data.data;
				$('#listpermintaan').hide();
				$('#formpermintaanlabor').show();
				
                $('#diagnosa_keterangan_klinis').val(res.diagnosa_keterangan_klinis)
                $('#jenis_sample').val(res.jenis_sample)
                $('#tglpengambilansample').val(res.tglpengambilansample);
                $('#idx_permintaan').val(res.idx);
				var detail=data.data.detail;
				var kode=detail[0].kode_pemeriksaan;
				var panjang=kode.length;
				var pj=panjang-3;
				var newkode=kode.substr(0,pj)+'.00';
				// alert(newkode);
				getPemeriksaan(newkode)
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function ubahPermintaanRadiologi(idx){
    var url = base_url+'rajal/kunjungan/ubahpermintaanradiologi/' + idx ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                // $('#listdatapermintaanlabor').html('');
				var res=data.data;
				$('#listpermintaanradiologi').hide();
				$('#formpermintaanradiologi').show();
				// alert(res.statuspemeriksaan);
                $('#diagnosa_klinis').val(res.diagnosa_klinis)
                $('#diagnosa').val(res.diagnosa)
                $('#statuspemeriksaan').val(res.statuspemeriksaan)
                $('#tanggalorder').val(res.tanggalorder);
                $('#idx_permintaanradiologi').val(res.idx);
				var detail=data.data.detail;
				var kode=detail[0].kode_pemeriksaan;
				var panjang=kode.length;
				var pj=panjang-3;
				var newkode=kode.substr(0,pj)+'.00';
				// alert(newkode);
				getPemeriksaanRadiologi(newkode)
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function hasilPermintaanRadiologi(idx){
    var url = base_url+'rajal/kunjungan/datapermintaanradiologi/' + idx ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            if(data["status"]==true){
                $('#hasilradiologi').modal('show');
				var table='';
				var d=data.data;
				var no=0;
				for (let i = 0; i < d.length; i++) {
					no++;
					const e = d[i];
					table+=`<tr>
					<td>`+no+`</td>
					<td>`+e.nama_pemeriksaan+`</td>
					<td><button class='btn btn-default' type="button" onclick="cetakPermintaanRadiologi(`+e.idx+`)"><span class='fa fa-print'></span> Cetak</button></td>
				</tr>`;
				}
				$('#detailpemeriksaanradiologi').html(table);
            }else{
				tampilkanPesan('warning',data.message);
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function ubahTindakan(idx){
    var url = base_url+'rajal/kunjungan/ubahtindakan/' + idx ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                // $('#listdatapermintaanlabor').html('');
				var res=data.data;
                $('#petugasmedis').val(res.kodepetugas).trigger('change')
                $('#kodekategori').val(res.kodekategori).trigger('change')
				getTindakan(res.kodekategori)
                $('#idx_layanan').val(res.idx);
				$('#iconTambahTindakan').removeClass('fa fa-plus');
				$('#iconTambahTindakan').addClass('fa fa-refresh');
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function ubahPermintaanKonsul(idx){
    var url = base_url+'rajal/kunjungan/ubahpermintaankonsul/' + idx ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                // $('#listdatapermintaanlabor').html('');
				var res=data.data;
				$('#listpermintaankonsul').hide();
				$('#formpermintaankonsul').show();
				// alert(res.statuspemeriksaan);
                $('#idruangtujuan').val(res.idruangtujuan).trigger('change')
                $('#doktertujuan').val(res.doktertujuan)
                $('#tglkonsul').val(res.tglkonsul)
                $('#diagnosakerja').val(res.diagnosakerja)
                $('#keteranganklinik').val(res.keteranganklinik);
                $('#alasankonsul').val(res.alasankonsul);
                $('#idx_permintaankonsul').val(res.idx);
				getDokter(res.tglkonsul,res.idruangtujuan,res.doktertujuan)
				var c=res.cito;
				if(c==1) $('#cito').prop("checked",true);
				else $('#cito').prop("checked",false);
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function simpanResep(){
    var url;
    url = base_url + "rajal/kunjungan/simpanresep";
	var asesmen=$('#asesmen').val();
	// alert(asesmen);
    var formdata = {
        'idx_resep':$('#idx_resep').val(),
        'idx_obat':$('#idx_obat').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'id_daftar':$('#id_daftar').val(),
        'jenisresep':'Non Racikan',
        'obatid':$('#obatid').val(),
        'obatnama':$('#obatnama').val(),
        'satuan':$('#satuan').val(),
        'signa1':$('#signa1').val(),
        'signa2':$('#signa2').val(),
        'jumlah':$('#jml').val(),
        'keterangan':$('#keterangan').val(),
        'dokterdpjp':$('#dokterdpjp').val(),
        'namadokterdpjp':$('#namadokterdpjp').val()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnTambahResep').prop("disabled",true);
            $('#iconTambahResep').removeClass('fa fa-plus')
            $('#iconTambahResep').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				getResep()
				$('#obatid').val("");
				$('#obatnama').val("");
				$('#signa1').val("");
				$('#signa2').val("");
				$('#keterangan').val("");
				$('#jml').val("");
				$('#idx_resep').val(data.idx_resep);
				// Pindah ke tab cppt
            }
            else{
                $('#err_obat').html(data.error.obatid)
                $('#err_signa1').html(data.error.signa1)
                $('#err_signa2').html(data.error.signa2)
                $('#err_keterangan').html(data.error.keterangan)
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
            $('#btnTambahResep').prop("disabled",false);
            $('#iconTambahResep').removeClass('fa fa-spinner spin')
            $('#iconTambahResep').addClass('fa fa-plus')
        },
        complete: function() {
            $('#btnTambahResep').prop("disabled",false);
            $('#iconTambahResep').removeClass('fa fa-spinner spin')
            $('#iconTambahResep').addClass('fa fa-plus')
        }
    });
}
function simpanResepRacikan(){
    var url;
    url = base_url + "rajal/kunjungan/simpanresepracikan";
    
    var formdata = {
        'idx_resep':$('#r_idx_resep').val(),
        'idx_obat':$('#r_idx_obat').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'id_daftar':$('#id_daftar').val(),
        'jenisresep':'Racikan',
        'obatid':$('#r_obatid').val(),
        'obatnama':$('#r_obatnama').val(),
        'satuan':$('#r_satuan').val(),
        'signa1':$('#r_signa1').val(),
        'signa2':$('#r_signa2').val(),
        'moderacikan':$('#metoderacik').val(),
        'jumlah':$('#r_jml').val(),
        'keterangan':$('#r_keterangan').val(),
        'dokterdpjp':$('#dokterdpjp').val(),
        'namadokterdpjp':$('#namadokterdpjp').val()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#r_btnTambahResep').prop("disabled",true);
            $('#r_iconTambahResep').removeClass('fa fa-plus')
            $('#r_iconTambahResep').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				getResep('Racikan')
				$('#r_obatid').val("");
				$('#r_obatnama').val("");
				$('#r_signa1').val("");
				$('#r_signa2').val("");
				$('#metoderacik').val("");
				$('#r_keterangan').val("");
				$('#r_jml').val("");
				$('#r_idx_resep').val("");
				// Pindah ke tab cppt
            }
            else{
                $('#err_r_obat').html(data.error.obat)
                $('#err_r_signa1').html(data.error.signa1)
                $('#err_r_signa2').html(data.error.signa2)
                $('#err_metoderacik').html(data.error.metoderacik)
                $('#err_r_keterangan').html(data.error.keterangan)
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
            $('#r_btnTambahResep').prop("disabled",false);
            $('#r_iconTambahResep').removeClass('fa fa-spinner spin')
            $('#r_iconTambahResep').addClass('fa fa-plus')
        },
        complete: function() {
            $('#r_btnTambahResep').prop("disabled",false);
            $('#r_iconTambahResep').removeClass('fa fa-spinner spin')
            $('#r_iconTambahResep').addClass('fa fa-plus')
        }
    });
}
function simpanTindakan(){
    var url;
    url = base_url + "rajal/kunjungan/simpantindakan";
	var idx=$('#idx_layanan').val();
	alert(idx);
    var formdata = {
        'idx':$('#idx_layanan').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'kodepetugas':$('#petugasmedis').val(),
        'namapetugas':$('#petugasmedis :selected').html(),
        'kodekategori':$('#kodekategori').val(),
        'kategoritindakan':$('#kodekategori :selected').html(),
        'kodetindakan':$('#kodetindakan').val(),
        'namatindakan':$('#kodetindakan :selected').html()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnTambahTindakan').prop("disabled",true);
            $('#iconTambahTindakan').removeClass('fa fa-plus')
            $('#iconTambahTindakan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				$('#idx_layanan').val("");
				$('#kodekategori').val("").trigger('change');
				$('#kodetindakan').val("").trigger('change');
				$('#kodepetugas').val("");
				getListTindakan();
				// Pindah ke tab cppt
            }
            else{
                $('#err_petugasmedis').html(data.error.kodepetugas)
                $('#err_kategori').html(data.error.kodekategori)
                $('#err_kodetindakan').html(data.error.kodetindakan)
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
            $('#btnTambahTindakan').prop("disabled",false);
            $('#iconTambahTindakan').removeClass('fa fa-spinner spin')
            $('#iconTambahTindakan').addClass('fa fa-plus')
        },
        complete: function() {
            $('#btnTambahTindakan').prop("disabled",false);
            $('#iconTambahTindakan').removeClass('fa fa-spinner spin')
            $('#iconTambahTindakan').addClass('fa fa-plus')
        }
    });
}
function terimaPermintaan(){
    var url;
    url = base_url + "rajal/kunjungan/terimapasien";
    var formdata = {
        'idx':$('#idx').val(), //idpermintaan
        'idx_pendaftaran':$('#idx_pendaftaran').val(), //idpermintaan
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'kode_subspesialis_asal':$('#kode_subspesialis_asal').val(),
        'idruangasal':$('#idruangasal').val(),
        'ruangasal':$('#ruangasal').val(),
        'dokterPengirim':$('#dokterPengirim').val(),
        'namaDokterPengirim':$('#namaDokterPengirim').val(),
        'kode_subspesialis_tujuan':$('#kode_subspesialis_tujuan').val(),
        'idruangtujuan':$('#idruangtujuan').val(),
        'ruangtujuan':$('#ruangtujuan').val(),
        'kodedokterjkn':$('#kodedokterjkn').val(),
        'doktertujuan':$('#doktertujuan').val(),
        'namadoktertujuan':$('#namadoktertujuan').val(),
        'diagnosakerja':$('#diagnosakerja').val(),
        'keteranganklinik':$('#keteranganklinik').val(),
        'alasankonsul':$('#alasankonsul').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'cara_bayar':$('#cara_bayar').val(),
        'no_rujuk':$('#no_rujuk').val(),
    };
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
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
                // updateAplicare(data.idkamar,0);
                // updateAplicare(data.idkamarlama);
				getkunjungan(1);
				getPermintaan();
				$('#formaprove').modal("hide");
				tampilkanPesan("success",data.message);
            }
            else{
                $('#err_kelas').html(data.error.idkelas)
                $('#err_kamar').html(data.error.idkamar)
                $('#err_tt').html(data.error.idtt)
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
function updateTglPulang(){
    var url;
    url = base_url + "rajal/kunjungan/pasienpulang";
    var formdata = {
        'idx':$('#idx').val(),
        'logidx':$('#logidx').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'tgl_masuk':$('#tgl_masuk').val(),
        'idkelas':$('#idkelas').val(),
        'id_poli':$('#id_poli').val(),
        'nama_poli':$('#nama_poli').val(),
        'idkamar':$('#idkamar').val(),
        'ruangasal':$('#idkamar :selected').html(),
        'id_tt':$('#id_tt').val(),
        'namaDokterPengirim':$('#id_tt :selected').html(),
        'id_kelas_lama':$('#id_kelas_lama').val(),
        'id_kamar_lama':$('#id_kamar_lama').val(),
        'id_tt_lama':$('#id_tt_lama').val(),
        'noSep':$('#noSep').val(),
        'idcarakeluar':$('#idcarakeluar').val(),
        'carakeluar':$('#idcarakeluar :selected').html(),
        'idkeadaankeluar':$('#idkeadaankeluar').val(),
        'keadaankeluar':$('#idkeadaankeluar :selected').html(),
        'tglPulang':$('#tglPulang').val(),
        'noLPManual':$('#noLPManual').val(),
        'noSuratMeninggal':$('#noSuratMeninggal').val(),
        'tglMeninggal':$('#tglMeninggal').val(),
    };
    // console.clear();
    // console.log(formdata)
    // return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#u-btnsimpan').prop("disabled",true);
            $('#u-iconsimpan').removeClass('fa fa-save')
            $('#u-iconsimpan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
                var idkamar=$('#idkamar').val();
                updateAplicare(idkamar);
                // swal({
                //     title: "Sukses",
                //     text: data.metaData.message,
                //     type: "success",
                //     timer: 5000
                // });
            }
            else if(data.metaData.code==201){
                swal({
                    title: "Peringatan",
                    text: data.message,
                    type: "error",
                    timer: 5000
                });
            }
            else{
                $('#err_carakeluar').html(data.error.carakeluar)
                $('#err_keadaankeluar').html(data.error.keadaankeluar)
                $('#err_nosurat').html(data.error.noSuratMeninggal)
                $('#err_tglmeninggal').html(data.error.tglMeninggal)
                $('#err_tglpulang').html(data.error.tglPulang)
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
            $('#u-btnsimpan').prop("disabled",false);
            $('#u-iconsimpan').removeClass('fa fa-spinner spin')
            $('#u-iconsimpan').addClass('fa fa-save')
        },
        complete: function() {
            $('#u-btnsimpan').prop("disabled",false);
            $('#u-iconsimpan').removeClass('fa fa-spinner spin')
            $('#u-iconsimpan').addClass('fa fa-save')
        }
    });
}
function simpanPermintaan(){
    var url;
    url = base_url + "rajal/kunjungan/simpanpermintaan";
    var formdata = {
        'idx':$('#idx').val(),
        'idxpindah':$('#idxpindah').val(),
        'logidx':$('#logidx').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'nomr_pasien':$('#nomr').val(),
        'nama_pasien':$('#nama_pasien').val(),
        'tgl_lahir':$('#tgl_lahir').val(),
        'jns_kelamin':$('#jns_kelamin').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'tgl_masuk':$('#tgl_masuk').val(),
        'idkelas':$('#idkelas').val(),
        'ididruangtujuan':$('#id_poli').val(),
        'ididruangtujuan':$('#id_poli').val(),
        'ruangasal':$('#nama_poli').val(),
        'dokterPengirim':$('#dokterPengirim').val(),
        'namaDokterPengirim':$('#namaDokterPengirim').val(),
        'idruangtujuan':$('#idruang').val(),
        'ruangtujuan':$('#idruang :selected').html(),
        'alasanpemindahan':$('#alasanpemindahan').val(),
    };
    // console.clear();
    // console.log(formdata)
    // return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnPermintaan').prop("disabled",true);
            $('#iconBtnPermintaan').removeClass('fa fa-save')
            $('#iconBtnPermintaan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.metaData.code==200){
                
                swal({
                    title: "Sukses",
                    text: data.metaData.message,
                    type: "success",
                    timer: 5000
                });
            }
            else{
                $('#err_ruang').html(data.error.ruang)
                $('#err_alasan').html(data.error.alasan)
                swal({
                    title: "Peringatan",
                    text: data.metaData.message,
                    type: "warning",
                    timer: 5000
                });
            }
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnPermintaan').prop("disabled",false);
            $('#iconBtnPermintaan').removeClass('fa fa-spinner spin')
            $('#iconBtnPermintaan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnPermintaan').prop("disabled",false);
            $('#iconBtnPermintaan').removeClass('fa fa-spinner spin')
            $('#iconBtnPermintaan').addClass('fa fa-save')
        }
    });
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
function updateAplicare(kamarid,pesan=1) {
    $.ajax({
        url: base_url + "applicare/bed/update/" + kamarid,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            // var start=$('#start').val();
            // getTT();
            if(data.metadata.code==1){
                if(pesan==1) tampilkanPesan('success',data.metadata.message);
            }else{
                tampilkanPesan('error',data.metadata.message);
            }
        },
        error: function (jqXHR, textruang, errorThrown) {
            alert('Error')
        }
    });
}

function getPermintaan(start=1){
    $('#start').val(start);
    var search = $('#qpermintaan').val();
    var limit = $('#limitpermintaan').val();
    var param = $('#parampermintaan').val();
    var url = base_url+'rajal/kunjungan/datapermintaan?keyword=' + search + "&start=" + start + "&limit=" + limit + "&param=" + param;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            $('#datapermintaan').html(tabel);
            $('#pageminta').html('');
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#datapermintaan').html('');
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
                    tabel+="<td>"+res[i]['id_daftar']+"</td>";
                    tabel+="<td>"+res[i]['reg_unit']+"</td>";
                    tabel+="<td><b>"+res[i]["nomr_pasien"]+"</b><br><i>"+res[i]["nama_pasien"]+"</i></td>";
                    tabel+="<td>"+res[i]['jns_kelamin']+"</td>";
                    tabel+="<td>"+res[i]["tgl_lahir"]+"</td>";
                    tabel+="<td>"+res[i]['ruangasal']+"</td>";
                    tabel+="<td>"+res[i]['alasankonsul']+"</td>";
                    if(res[i]['statusresponse']==1) {
                        tabel+="<td><span class='btn btn-success btn-xs'>Sudah Diterima</span></td>";
                        tabel+="<td><button type='button' class='btn btn-default btn-sm' disabled ><span class='fa fa-plus'></span> Registrasikan Pasien</button></td>";
                    }
                    else {
                        tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diterima</span></td>";
                        tabel+="<td><button type='button' class='btn btn-default btn-sm' onclick=\"aprovePasien('"+res[i]["reg_unit"]+"')\"><span class='fa fa-plus'></span> Registrasikan Pasien</button></td>";
                    }
                    
                    tabel+="</tr>";
                    $('#datapermintaan').append(tabel);
                }
                //Create Pagination
                if(data["row_count"]<=limit){
                    $('#pageminta').html("");
                }else{
                    console.log("buat Pagination");
                    var pagination="";
                    var btnIdx="";
                    jmlPage = Math.ceil(data["row_count"]/limit);
                    offset  = data["start"] % limit;
                    
                    var curIdx = start;
                    var btn="btn-default";
                    //var lastSt=jmlPage;
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='getkunjungan(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-1;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+1;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='getkunjungan("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
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
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getkunjungan("+ j +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getkunjungan("+ j +")'>" + j +"</button>";
                        }
                    }
                    pagination+="<div class='btn-group'>"+desc+btnFirst + btnIdx + btnLast+"</div>";
                    $('#pageminta').html(pagination);
                }
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getResep(jenisresep='Non Racikan'){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/resep/' + idx_pendaftaran ;
	// alert(jenisresep)
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {jenisresep : jenisresep},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            if(jenisresep=='Non Racikan') $('#dataresep').html(tabel);
			else $('#dataresepracikan').html(tabel);
            $('#pageminta').html('');
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
				var res=data.data;
                if(jenisresep=='Non Racikan') {
					$('#dataresep').html('');
					$('#idx_resep').val(res[0].idx_resep)
				}
				else {
					$('#dataresepracikan').html('');
					$('#r_idx_resep').val(res[0].idx_resep)
					$('#notif').html("<div class='row'><div class='col-md-12'><div class='alert alert-info'>Klik Nama Obat Untuk Menambahkan Komposisi Obat Racikan</div></div></div>")
				}
				var jmlData=res.length;
				let no=0;
				var jmlbahan=1;
                for(var i=0; i<jmlData;i++){
                    no++;
					if(res[i].jmlbahan=="0") jmlbahan=0;
                    tabel="<tr>";tabel+="<td>"+no+"</td>";
					if(jenisresep=="Non Racikan") tabel+="<td>"+res[i]['obatnama']+"</td>";
					else tabel+="<td><button class='btn btn-default btn-xs' type='button' onclick='setKomponen("+res[i]['idx_resep']+","+res[i]['idx_detail']+",\""+res[i]['obatnama']+"\",\""+res[i]['jumlah']+"\")'>"+res[i]['obatnama']+"</burron></td>";
                    tabel+="<td><b>"+res[i]["signa1"]+" X "+res[i]["signa2"]+ " "+res[i]['keterangan']+"</b></td>";
                    tabel+="<td>"+res[i]['jumlah']+" "+res[i]["satuan"]+"</td>";
                    tabel+="<td>"+res[i]['komposisi']+"</td>";
                    if(res[i]['statusresep']==1) {
                        tabel+="<td colspan='2'><span class='btn btn-success btn-xs'>Sudah Diproses</span></td>";
                    }
                    else {
                        tabel+="<td><span class='btn btn-danger btn-xs'>Belum Diproses</span></td>";
						if(jenisresep=='Non Racikan'){
							tabel+="<td><div class='btn-group'>"+
							"<button type='button' class='btn btn-warning btn-xs' onclick='ubahResep("+res[i].idx_detail+","+res[i].obatid+",\""+res[i].obatnama+"\",\""+res[i].signa1+"\",\""+res[i].signa2+"\",\""+res[i].keterangan+"\",\""+res[i].jumlah+"\")'>Ubah</button>"+
							"<button type='button' class='btn btn-danger btn-xs' onclick='hapusResep("+res[i].idx_detail+")'>Hapus</button></div></td>";

						}else{
							tabel+="<td><div class='btn-group'>"+
							"<button type='button' class='btn btn-warning btn-xs' onclick='ubahResepRacikan("+res[i].idx_detail+","+res[i].obatid+",\""+res[i].obatnama+"\",\""+res[i].signa1+"\",\""+res[i].signa2+"\",\""+res[i].keterangan+"\",\""+res[i].jumlah+"\",\""+res[i].moderacikan+"\")'>Ubah</button>"+
							"<button type='button' class='btn btn-danger btn-xs' onclick='hapusResepRacikan("+res[i].idx_detail+")'>Hapus</button></div></td>";
						}
                    }
                    
                    tabel+="</tr>";
                    if(jenisresep=='Non Racikan')  $('#dataresep').append(tabel);
					else $('#dataresepracikan').append(tabel);
                }
				
				
				if(jenisresep=='Non Racikan') {
					tabel="<tr><td colspan='6'><button class='btn btn-primary' type='button' onclick='kirimPermintaan()' id='btnKirimPermintaan'><span class='fa fa-save' id='iconKirimPermintaan' ></span> Kirim Permintaan</button></td></tr>";
					$('#dataresep').append(tabel);
				}
				else {
					if(jmlbahan==0) var dis="disabled"; else var dis="";
					tabel="<tr><td colspan='6'><button class='btn btn-primary' type='button' onclick='kirimPermintaan(\"Racikan\")' id='btnKirimPermintaan' "+dis+"><span class='fa fa-save' id='iconKirimPermintaan' ></span> Kirim Permintaan</button></td></tr>";
					$('#dataresepracikan').append(tabel);
				}
			}else{
				tabel="<tr><td colspan='6'>"+data.message+"</td></tr>";
				if(jenisresep=='Non Racikan') $('#dataresep').html(tabel);
				else $('#dataresepracikan').html(tabel);
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function getAllResep(){
	var idx_pendaftaran=$('#idx_pendaftaran').val();
    var url = base_url+'rajal/kunjungan/allresep/' + idx_pendaftaran ;
	// alert(jenisresep)
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            if(jenisresep=='Non Racikan') $('#dataresep').html(tabel);
			else $('#dataresepracikan').html(tabel);
            $('#pageminta').html('');
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
				var umum=data.umum;
				var r='';
				for (let i = 0; i < umum.length; i++) {
					const e = umum[i];
					r+=`Tanggal Resep `+e.tgl_resep+`<br>
					No Resep : `+e.no_resep+`<br>
					Nomr / nama : `+e.nomr_pasien+` / `+e.nama_pasien+`<br><hr>`+
					e.komposisi+`<br>Diresepkan Oleh : `+e.namadokterdpjp;
				}
				$(('#resepumum')).html(r);

				var resepracikan='';
				var namadokterdpjp='';
				var racikan=data.racikan;
				var no_resep='';
				for (let j = 0; j < racikan.length; j++) {
					const rc = racikan[j];
					if(no_resep!=rc.no_resep){
						if(no_resep!='') resepracikan+=`<hr>Diresepkan Oleh : `+rc.namadokterdpjp;
						resepracikan+=`Tanggal Resep : `+rc.tgl_resep+`<br>
						No Resep : `+rc.no_resep+`<br>
						Jenis Resep : Racikan<br>
						Nomr / nama : `+rc.nomr_pasien+` / `+rc.nama_pasien+`<br><hr>`+
						rc.komposisi+`<br>`;
					}else{
						resepracikan+=rc.komposisi+`<br>`
					}
					no_resep=rc.no_resep;
					namadokterdpjp=rc.namadokterdpjp;
				}
				resepracikan+=`Diresepkan Oleh : `+namadokterdpjp;
				$(('#resepracikan')).html(resepracikan);
			}else{
				tabel="<tr><td colspan='6'>"+data.message+"</td></tr>";
				if(jenisresep=='Non Racikan') $('#dataresep').html(tabel);
				else $('#dataresepracikan').html(tabel);
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function cetakResep(area){
	var printContents = document.getElementById(area).innerHTML;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
}
function getDetailKomponen(idx_resep_detail=""){
	if(idx_resep_detail=="") idx_resep_detail=$('#idx_obat_detail').val();
	$('#komponenobatid').val("");
	$('#komponenobat').val("");
	$('#kapasitasobat').val("");
	$('#p1').val("1");
	$('#p2').val("1");
	$('#dosis').val("");
	$('#jmlpakai').val("");
	$('#satuandosis').val("");
	$('.satuankapasitas').val("-");
    var url = base_url+'rajal/kunjungan/detailkomponen/' + idx_resep_detail ;
	// alert(jenisresep)
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='5'><b>Loading...</b></td></tr>";
            $('#listkomponenracikan').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            $('#listkomponenracikan').html('');
            if(data["status"]==true){
				var res=data.data;
                
				var jmlData=res.length;
				let no=0;
				var jmlbahan=1;
                for(var i=0; i<jmlData;i++){
                    no++;
					if(res[i].jmlbahan=="0") jmlbahan=0;
                    tabel="<tr>";tabel+="<td>"+no+"</td>";
					tabel+="<td>"+res[i]['obatnama']+"</td>";
					tabel+="<td><b>"+res[i]["dosis"]+" "+res[i]["satuan"]+"</b></td>";
                    tabel+="<td>"+res[i]['jmlpakai']+"</td>";
                        tabel+="<td><div class='btn-group'>"+
						"<button type='button' class='btn btn-warning btn-xs' onclick='ubahKomponen("+res[i].idx_detail+","+res[i].obatid+",\""+res[i].obatnama+"\",\""+res[i].signa1+"\",\""+res[i].signa2+"\",\""+res[i].keterangan+"\",\""+res[i].jumlah+"\")'>Ubah</button>"+
						"<button type='button' class='btn btn-danger btn-xs' onclick='hapusKomponen("+res[i].idx_detail+")'>Hapus</button></div></td>";
                    
                    tabel+="</tr>";
                    $('#listkomponenracikan').append(tabel);
                }
				
			}else{
				tabel="<tr><td colspan='6'>"+data.message+"</td></tr>";
				$('#datarlistkomponenracikanesep').html(tabel);
			}
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function setKomponen(idx_resep,idx_resep_detail,namaracikan,jumlah){
	$('#komponenracikan').modal('show');
	$('#namaracikan').html(namaracikan)
	$('#jmlracikan').val(jumlah)
	$('#idx_resep_detail').val(idx_resep)
	$('#idx_obat_detail').val(idx_resep_detail)
	getDetailKomponen(idx_resep_detail);
}
function tambahKomponen(){
    var url;
    url = base_url + "rajal/kunjungan/tambahkomponen";
	var asesmen=$('#asesmen').val();
	// alert(asesmen);
    var formdata = {
        'idx_komposisi':$('#idx_komposisi').val(),
        'idx_resep':$('#idx_resep_detail').val(),
        'idx_resep_detail':$('#idx_obat_detail').val(),
        'obatid':$('#komponenobatid').val(),
        'obatnama':$('#komponenobat').val(),
        'jmlracikan':$('#jmlracikan').val(),
        'p1':$('#p1').val(),
        'p2':$('#p2').val(),
        'dosis':$('#dosis').val(),
        'satuan':$('#satuandosis').val(),
        'jmlpakai':$('#jmlpakai').val()
    };
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnAddKomponen').prop("disabled",true);
            $('#iconAddKomponen').removeClass('fa fa-plus')
            $('#iconAddKomponen').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				getDetailKomponen()
				getResep('Racikan')
				// $('#komponenobatid').val("");
				// $('#komponenobat').val("");
				// $('#p1').val("1");
				// $('#p2').val("1");
				// $('#dosis').val("");
				// $('#jmlpakai').val("");
				$('#err_komponenobat').html('')
                $('#err_dosis').html('')
				// Pindah ke tab cppt
            }
            else{
                $('#err_komponenobat').html(data.error.obat)
                $('#err_dosis').html(data.error.dosis)
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
            $('#btnAddKomponen').prop("disabled",false);
            $('#iconAddKomponen').removeClass('fa fa-spinner spin')
            $('#iconAddKomponen').addClass('fa fa-plus')
        },
        complete: function() {
            $('#btnAddKomponen').prop("disabled",false);
            $('#iconAddKomponen').removeClass('fa fa-spinner spin')
            $('#iconAddKomponen').addClass('fa fa-plus')
        }
    });
}

function hitungDosis(){
	var p1=$('#p1').val();
	var p2=$('#p2').val();
	var kapasitasobat=$('#kapasitasobat').val();
	var dosis=(p1/p2)*kapasitasobat;
	$('#dosis').val(dosis);
	var jmlracikan=$('#jmlracikan').val();
	var jmlpakai=(jmlracikan*dosis)/kapasitasobat;//21*50=1050 mg 1050/200
	$('#jmlpakai').val(jmlpakai);
}
function kirimPermintaan(jenisresep="Non Racikan"){
	var url;
	// alert(jenisresep)
    url = base_url + "rajal/kunjungan/kirimpermintaanresep";
	if(jenisresep=="Non Racikan"){
		var formdata = {
			'idx_resep':$('#idx_resep').val(),
		};
	}else{
		var formdata = {
			'idx_resep':$('#r_idx_resep').val(),
		};
		// alert(formdata['idx_resep'])
	}
	
    
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnKirimPermintaan').prop("disabled",true);
            $('#iconKirimPermintaan').removeClass('fa fa-save')
            $('#iconKirimPermintaan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				
				getResep(jenisresep)
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
            $('#btnKirimPermintaan').prop("disabled",false);
            $('#iconKirimPermintaan').removeClass('fa fa-spinner spin')
            $('#iconKirimPermintaan').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnKirimPermintaan').prop("disabled",false);
            $('#iconKirimPermintaan').removeClass('fa fa-spinner spin')
        	    $('#iconKirimPermintaan').addClass('fa fa-save')
        }
    });
}
function getRiwayatResep(){
	var idx_pendaftaran=$('#idx_daftar').val();
    var url = base_url+'rajal/kunjungan/resep/' + idx_pendaftaran ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            $('#riwayatresep').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#riwayatresep').html('');
				var res=data.data;
				var jmlData=res.length;
				let no=0;
                for(var i=0; i<jmlData;i++){
                    no++;
                    tabel="<tr>";tabel+="<td>"+no+"</td>";
                    tabel+="<td>"+res[i]['obatnama']+"</td>";
                    tabel+="<td><b>"+res[i]["signa1"]+" X "+res[i]["signa2"]+"</b></td>";
                    tabel+="<td>"+res[i]['keterangan']+"</td>";
                    
                    tabel+="</tr>";
                    $('#riwayatresep').append(tabel);
                }
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}

function ubahResep(idx,obatid,obatnama,signa1,signa2,keterangan,jumlah){
	$('#idx_obat').val(idx);
	$('#obatid').val(obatid);
	$('#obatnama').val(obatnama);
	$('#signa1').val(signa1);
	$('#signa2').val(signa2);
	$('#jml').val(jumlah);
	$('#keterangan').val(keterangan);
	$('#iconTambahResep').removeClass('fa fa-plus');
	$('#iconTambahResep').addClass('fa fa-refresh');
}
function ubahResepRacikan(idx,obatid,obatnama,signa1,signa2,keterangan,jumlah,metode){
	$('#r_idx_obat').val(idx);
	$('#metoderacik').val(metode);
	$('#r_obatid').val(obatid);
	$('#r_obatnama').val(obatnama);
	$('#r_signa1').val(signa1);
	$('#r_signa2').val(signa2);
	$('#r_jml').val(jumlah);
	$('#r_keterangan').val(keterangan);
	$('#iconTambahResep').removeClass('fa fa-plus');
	$('#iconTambahResep').addClass('fa fa-refresh');
}

function hapusResep(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus resep ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapusresep/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getResep();
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function hapusResepRacikan(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus resep ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapusresep/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getResep('Racikan');
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function hapusPermintaan(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus permintaan labor ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapuspermintaan/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getListPermintaanLabor();
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function hapusPermintaanRadiologi(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus permintaan radiiologi ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapuspermintaanradiologi/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getListPermintaanRadiologi();
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function hapusTindakan(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus tindakan ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapustindakan/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getListTindakan();
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function hapusPermintaanKonsul(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan menghapus permintaan konsul ini ?',
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			closeOnConfirm: true,
			closeOnCancel: true
		},
		function(isConfirm) {
			if (isConfirm) {
				// var base_url = "<?= base_url() . "mr_registrasi.php/"; ?>";
				// var formdata = {
				//     param1: no_jaminan,
				//     param2: "<?= $this->session->userdata('get_uid') ?>",
				// }
				var url=base_url + "rajal/kunjungan/hapuspermintaankonsul/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        // $('#e-btnBatal').prop('disabled',true);
                        // $('#btnBatalSep').removeClass("fa fa-print")
                        // $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.status==true){
                            tampilkanPesan('success', data.message);
                            getKonsul();
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.message);
                        }
						
					},
                    complete: function() {
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")
                    },
                    error       : function(jqXHR,ajaxOption,errorThrown){
                        console.log(jqXHR.responseText);  
                        $('#e-btnBatal').prop('disabled',false);
                        $('#btnBatalSep').removeClass("fa fa-spinner fa-spin")
                        $('#btnBatalSep').addClass("fa fa-print")                  
                    }
				});
			}
		});
}
function getDokter(tglkonsul='',idruangtujuan='',pilih=""){
	if(tglkonsul=='') tglkonsul=$('#tglkonsul').val();
	if(idruangtujuan=='') idruangtujuan=$('#idruangtujuan').val();
    var url = base_url+'rajal/kunjungan/dokter' ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {
			tgl : tglkonsul,
			ruang : idruangtujuan
		},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
				var res=data.data;
				console.log(res);
				var option="";
				for (let i = 0; i < res.length; i++) {
					const e = res[i];
					// alert(e.dokterid)
					if(pilih==e.dokterid) option+="<option value='"+e.dokterid+"' selected>"+e.namadokter+"</option>";
					else option+="<option value='"+e.dokterid+"'>"+e.namadokter+"</option>";
				}
				console.log(option)
                $('#doktertujuan').html(option);
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function simpanKonsul(){
    var url;
    url = base_url + "rajal/kunjungan/simpankonsul";
	// var sumber = $("#sumberdata input:checkbox:checked").map(function(){
	// 	return $(this).val();
	//   }).get();
	var c=$('#cito').prop("checked");
	var cito=c=true?1:0;
	var formdata = {
        'idx':$('#idx_permintaankonsul').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'tglkonsul':$('#tglkonsul').val(),
        'nomr_pasien':$('#nomr').val(),
        'nama_pasien':$('#nama').val(),
        'jns_kelamin':$('#jnskelamin').val(),
        'tgl_lahir':$('#tgllahir').val(),
        'idruangasal':$('#id_ruang_asal').val(),
        'ruangasal':$('#nama_ruang_asal').val(),
        'idruangtujuan':$('#idruangtujuan').val(),
        'ruangtujuan':$('#idruangtujuan :selected').html(),
        'doktertujuan':$('#doktertujuan').val(),
        'namadoktertujuan':$('#doktertujuan :selected').html(),
        'diagnosakerja':$('#diagnosakerja').val(),
        'keteranganklinik':$('#keteranganklinik').val(),
        'alasankonsul':$('#alasankonsul').val(),
        'id_cara_bayar':$('#id_cara_bayar').val(),
        'cara_bayar':$('#cara_bayar').val(),
        'cito':cito,
    };
    
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnSimpanKonsul').prop("disabled",true);
            $('#iconSimpanKonsul').removeClass('fa fa-save')
            $('#iconSimpanKonsul').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				getKonsul()
            }
            else{
                $('#err_idruangtujuan').html(data.error.idruangtujuan)
                $('#err_doktertujuan').html(data.error.doktertujuan)
                $('#err_diagnosakerja').html(data.error.diagnosakerja)
                $('#err_keteranganklinik').html(data.error.keteranganklinik)
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
            $('#btnSimpanKonsul').prop("disabled",false);
            $('#iconSimpanKonsul').removeClass('fa fa-spinner spin')
            $('#iconSimpanKonsul').addClass('fa fa-save')
        },
        complete: function() {
            $('#btnSimpanKonsul').prop("disabled",false);
            $('#iconSimpanKonsul').removeClass('fa fa-spinner spin')
        	    $('#iconSimpanKonsul').addClass('fa fa-save')
        }
    });
}
function simpanLayanan(){
    var url;
    url = base_url + "rajal/kunjungan/simpantindakan";
	// var sumber = $("#sumberdata input:checkbox:checked").map(function(){
	// 	return $(this).val();
	//   }).get();
	var c=$('#cito').prop("checked");
	var cito= c=true?1:0;
	var formdata = {
        'idx':$('#idx_layanan').val(),
        'idx_pendaftaran':$('#idx_pendaftaran').val(),
        'id_daftar':$('#id_daftar').val(),
        'reg_unit':$('#reg_unit').val(),
        'kodekategori':$('#kodekategori').val(),
        'kategoritindakan':$('#kodekategori :selected').html(),
        'kodetindakan':$('#kodetindakan').val(),
        'namatindakan':$('#kodetindakan :selected').html(),
        'kodepetugas':$('#petugasmedis').val(),
        'namapetugas':$('#petugasmedis :selected').html()
    };
    
	console.clear();
	console.log(formdata);
	// return false;
    $.ajax({
        url : url,
        type: "POST",
        data: formdata,
        dataType: "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnTambahTindakan').prop("disabled",true);
            $('#iconTambahTindakan').removeClass('fa fa-plus')
            $('#iconTambahTindakan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success: function(data)
        {
            if(data.status==true){
                swal({
                    title: "Berhasil",
                    text: data.message,
                    type: "success",
                    timer: 5000
                });
				$('#idx_layanan').val("");
				$('#kodekategori').val("").trigger('change');
				$('#kodetindakan').val("").trigger('change');
				$('#kodepetugas').val("");
				getListTindakan();
            }
            else{
                $('#err_petugasmedis').html(data.error.kodepetugas)
                $('#err_kodekategori').html(data.error.kodekategori)
                $('#err_kodetindakan').html(data.error.kodetindakan)
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
            $('#btnTambahTindakan').prop("disabled",false);
            $('#iconTambahTindakan').removeClass('fa fa-spinner spin')
            $('#iconTambahTindakan').addClass('fa fa-plus')
        },
        complete: function() {
            $('#btnTambahTindakan').prop("disabled",false);
            $('#iconTambahTindakan').removeClass('fa fa-spinner spin')
            $('#iconTambahTindakan').addClass('fa fa-plus')
        }
    });
}

function getTindakan(pilih=""){
	var url = base_url+'rajal/kunjungan/layanan' ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {
			kategori : $('#kodekategori :selected').html()
		},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#listdatapermintaanlabor').html(tabel);
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
				var res=data.data;
				console.log(res);
				var option="";
				for (let i = 0; i < res.length; i++) {
					const e = res[i];
					// alert(e.dokterid)
					if(pilih==e.no) option+="<option value='"+e.no+"' selected>"+e.tindakan+"</option>";
					else option+="<option value='"+e.no+"'>"+e.tindakan+"</option>";
				}
				console.log(option)
                $('#kodetindakan').html(option);
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}
function aprovePasien(regunit){
    $.ajax({
        url: base_url+'rajal/kunjungan/aprovepasien/'+regunit,
        dataType: "JSON",
        method: "GET",
        data: {},
        success: function(data) {
            if(data.status==true){
                $('#formaprove').modal('show');
                $('#v-id_daftar').html(data.data.id_daftar)
                $('#v-reg_unit').html(data.data.reg_unit)
                $('#v-nomr_pasien').html(data.data.nomr_pasien)
                $('#v-nama_pasien').html(data.data.nama_pasien)
                $('#v-ruangasal').html(data.data.ruangasal)
                $('#v-ruangpenerima').html(data.data.ruangtujuan)
                $('#v-dokterpengirim').html(data.data.namaDokterPengirim)
                $('#v-dokterpenerima').html(data.data.namadoktertujuan)
                $('#v-alasankonsul').html(data.data.alasankonsul)
                $('#v-diagnosakerja').html(data.data.diagnosakerja)
                $('#v-keteranganklinik').html(data.data.keteranganklinik)
                $('#v-carabayar').html(data.data.cara_bayar)
                $('#v-rujukan').html(data.data.norujukaninternal)
				var cito =data.data.rujukan==1 ? "<b>Cito</b>" : "<b>Non Cito</b>";
                $('#v-cito').html(cito)
				
                $('#idx').val(data.data.idx);
                $('#idx_pendaftaran').val(data.data.idx_pendaftaran);
                $('#id_daftar').val(data.data.id_daftar);
                $('#reg_unit').val(data.data.reg_unit);
                $('#nomr_pasien').val(data.data.nomr_pasien);
                $('#nama_pasien').val(data.data.nama_pasien);
                $('#jns_kelamin').val(data.data.jns_kelamin);
                $('#tgl_lahir').val(data.data.tgl_lahir);
                $('#kode_subspesialis_asal').val(data.data.kode_subspesialis_asal);
                $('#idruangasal').val(data.data.idruangasal);
                $('#ruangasal').val(data.data.ruangasal);
                $('#dokterPengirim').val(data.data.dokterPengirim);
                $('#namaDokterPengirim').val(data.data.namaDokterPengirim);
                $('#kode_subspesialis_tujuan').val(data.data.kode_subspesialis_tujuan);
                $('#idruangtujuan').val(data.data.idruangtujuan);
                $('#ruangtujuan').val(data.data.ruangtujuan);
                $('#kodedokterjkn').val(data.data.kodedokterjkn);
                $('#doktertujuan').val(data.data.doktertujuan);
                $('#namadoktertujuan').val(data.data.namadoktertujuan);
                $('#diagnosakerja').val(data.data.diagnosakerja);
                $('#keteranganklinik').val(data.data.keteranganklinik);
                $('#alasankonsul').val(data.data.alasankonsul);
                $('#id_cara_bayar').val(data.data.id_cara_bayar);
                $('#cara_bayar').val(data.data.cara_bayar);
                $('#cito').val(data.data.cito);
                $('#no_rujuk').val(data.data.norujukaninternal);
                // tampilkanPesan('success',data.message);
            }else{
                tampilkanPesan('error',data.message);
            }

        },
        error: function(xhr) {
            $('#error').modal('show');
            $('#xhr').html(xhr.responseText)
        }
    });
}
function batalRujukan(norujukan=""){
	if(norujukan=="") norujukan= $('#r-noRujukan').val()
	swal({
		title: "Konfirmasi",
		text: 'Apakah anda yakin akan membatalkan No Rujukan ' + norujukan + '?',
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm) {
		if (isConfirm) {
			var url = base_url+"vclaim/rujukan/hapus/"+norujukan;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					//menghitung jumlah data
					//console.clear();
					//alert(param1 +" " +param2 + " " + param3);
					console.log(url);
					if(data.metaData.code==200){
						hapusRujukanLokal(norujukan);
						getRujukanKeluar();
						// tampilkanPesan('success',data.metaData.message)
						// var faskes=$('#r-faskes').val();
					}else{
						tampilkanPesan('warning',data.metaData.message)
						// hapusRujukanLokal(norujukan);
						// var poli=$('#txtnmpoli').val();
						// alert("Error saat pencarian data dokter "+ poli + ' karena ' +data.metaData.message)
					}
				}
			});
		}
	});

	

}
function updateRujukan(){
	var jnsPelayanan = $("input[name='jnsPelayanan']:checked").val();
	var diagnosanama=$('#r-diagRujukan').val();
	var namapoliTujuan=$('#r-poliRujukan :selected').html();
	var namatujuanRujukan=$('#r-poliRujukan :selected').html();
	// tampilkanPesan('error','Diagnosa Awal : '+ diagnosanama+" Tujuan Poli "+ namapoliTujuan+" Tujuan Rujukan : " + namatujuanRujukan)
	var formData = {
		id_daftar : $('#id_daftar').val(),
		reg_unit : $('#reg_unit').val(),
		noRujukan 	: $('#r-noRujukan').val(),
		tglRujukan: $('#r-tglRujukan').val(),
        tglRencanaKunjungan:$('#r-tglRencanaKunjungan').val(),
        ppkDirujuk: $('#ppkDirujuk').val(),
		namappkDirujuk: $('#r-ppkDirujuk').val(),
        jnsPelayanan: jnsPelayanan,
        catatan: $('#r-catatan').val(),
        diagRujukan: $('#diagRujukan').val(),
		diagnosanama: diagnosanama,
        tipeRujukan: $('#r-tipeRujukan').val(),
        poliRujukan: $('#r-poliRujukan').val(),
		namapoliRujukan: namatujuanRujukan,
		
	}
	// alert('Nilai Diagnosa Awal '+formData['diagnosanama']);
	console.clear();
	console.log(formData);
	// return false
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/rujukan/update",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnBuatRujukan').prop("disabled",true);
            $('#iconBuatrujukan').removeClass('fa fa-save')
            $('#iconBuatrujukan').addClass('fa fa-spinner spin')
        },
		success     : function(data){
			// console.clear();
			// console.log(data);
			if(data.metaData.code==200){
				// location.reload();
				updateRujukanLokal();
				// tampilkanPesan('success',data.metaData.message);
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metaData.message);
			}  
		},
		error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnBuatRujukan').prop("disabled",false);
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#btnBuatRujukan').prop("disabled",false);
            $('#iconBuatrujukan').removeClass('fa fa-spinner spin')
            $('#iconBuatrujukan').addClass('fa fa-save')
        },
	});
}
function updateRujukanLokal(){
	var jnsPelayanan = $("input[name='jnsPelayanan']:checked").val();
	var diagnosanama=$('#r-diagRujukan').val();
	// var namapoliTujuan=$('#r-poliRujukan :selected').html();
	var namatujuanRujukan=$('#namaPoliRujukan').val();
	var formData = {
		id_daftar : $('#id_daftar').val(),
		reg_unit : $('#reg_unit').val(),
		noRujukan 	: $('#r-noRujukan').val(),
		tglRujukan: $('#r-tglRujukan').val(),
        tglRencanaKunjungan:$('#r-tglRencanaKunjungan').val(),
        ppkDirujuk: $('#ppkDirujuk').val(),
		namappkDirujuk: $('#r-ppkDirujuk').val(),
        jnsPelayanan: jnsPelayanan,
        catatan: $('#r-catatan').val(),
        diagRujukan: $('#diagRujukan').val(),
		diagnosanama: diagnosanama,
        tipeRujukan: $('#r-tipeRujukan').val(),
        poliRujukan: $('#r-poliRujukan').val(),
		namapoliRujukan: namatujuanRujukan,
	}
	console.clear();
	// console.log(formData);
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/rujukan/updatelokal",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
		success     : function(data){
			console.clear();
			console.log(data);
			if(data.metaData.code==200){
				// location.reload();
				// updateRujukanLokal();
				tampilkanPesan('success',data.metaData.message);
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metaData.message);
			}  
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}

function hapusRujukanLokal(norujukan=""){
	if(norujukan=="") var norujukan= $('#r-noRujukan').val()

	var url = base_url+"vclaim/rujukan/hapuslokal/"+norujukan;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        //menghitung jumlah data
			//console.clear();
			//alert(param1 +" " +param2 + " " + param3);
	        console.log(url);
	        if(data.metaData.code==200){
				// hapusRujukanLokal();
	            tampilkanPesan('success',data.metaData.message)
				// var faskes=$('#r-faskes').val();
	        }else{
				tampilkanPesan('warning',data.metaData.message)
				// var poli=$('#txtnmpoli').val();
				// alert("Error saat pencarian data dokter "+ poli + ' karena ' +data.metaData.message)
			}
	    }
	});
}
function cetakRujukan(norujuk){
    window.open(base_url+"vclaim/rujukan/cetakrujukan/"+norujuk);
}
function getRujukanKeluar(norujuk='') {
    // var layanan = $('input[name="jns_layanan"]:checked').val();
    // var jkn = $('#jkn').val();
	if(norujuk=="") {
		norujuk=$('#r-noRujukan').val();
	}else{
		$('#r-noRujukan').val(norujuk)
	}
	// alert(norujuk)
	if(norujuk!=""){
		var url = base_url + "vclaim/rujukan/rujukanonline/"+norujuk;
		$.ajax({
			url: url,
			type: "GET",
			dataType: "JSON",
			success: function (data) {
				if(data.metaData.code==200){
					$('#r-tglRujukan').val(data.response.rujukan.tglRujukan);
					$('#r-tglRencanaKunjungan').val(data.response.rujukan.tglRencanaKunjungan);
					$('#r-tipeRujukan').val(data.response.rujukan.tipeRujukan);
					$('#r-tglRencanaKunjungan').val(data.response.rujukan.tglRencanaKunjungan);
					$('#ppkDirujuk').val(data.response.rujukan.ppkDirujuk);
					$('#r-ppkDirujuk').val(data.response.rujukan.namaPpkDirujuk);
					if(data.response.rujukan.jnsPelayanan==1) $('#gd').prop("checked",true);
					else $('#rj').prop("checked",true);
					$('#r-catatan').val(data.response.rujukan.catatan);
					$('#diagRujukan').val(data.response.rujukan.diagRujukan);
					$('#r-diagRujukan').val(data.response.rujukan.namaDiagRujukan);
					$('#r-poliRujukan').val(data.response.rujukan.poliRujukan);
					$('#namaPoliRujukan').val(data.response.rujukan.namaPoliRujukan);
					// var btn=`<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="updateRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>`;
					var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="updateRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Update Rujukan</button>'+
					'<button type="button" class="btn btn-warning" id="btnCetakRujukan" onclick="cetakRujukan(\''+data.response.rujukan.noRujukan+'\')"><span class="fa fa-print" ></span> Cetak Rujukan</button>'+
					'<button type="button" class="btn btn-danger" id="btnBatalRujukan"  onclick="batalRujukan(\''+data.response.rujukan.noRujukan+'\')"><span class="fa fa-remove"></span> Batal</button>';
					$('#btnRujukan').html(tombol)
				}else{
					$('#r-noRujukan').val("")
					var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="createRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>';
					$('#btnRujukan').html(tombol)
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	}
    
}
