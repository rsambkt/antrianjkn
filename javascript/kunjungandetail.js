$(document).ready(function() {
    $.widget("custom.cariobat", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                KDBRG: "Kode",
                NMBRG: "Nama Obat",
                NMSATUAN: "Satuan",
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
                "<div class='col-md-2'>" + item.KDBRG + "</div>" +
                "<div class='col-md-5'>" + item.NMBRG + "</div>" +
                "<div class='col-md-5'>" + item.NMSATUAN + "</div>" +
                "</div>";
            $li.html($content);


            return $li.appendTo(ul);
        }
		
    });
    $.widget("custom.carikomponen", $.ui.autocomplete, {
        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
        },
        _renderMenu(ul, items) {
            var self = this;
            ul.addClass("container");

            let header = {
                KDBRG: "Kode",
                NMBRG: "Nama Obat",
                KAPASITAS: "Kapasitas",
                SATUANKAPASITAS: "Satuan",
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
                "<div class='col-md-2'>" + item.KDBRG + "</div>" +
                "<div class='col-md-5'>" + item.NMBRG + "</div>" +
                "<div class='col-md-2'>" + item.KAPASITAS + "</div>" +
                "<div class='col-md-3'>" + item.SATUANKAPASITAS + "</div>" +
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
	$("#obatnama").cariobat({
		source: function(request, response) {
			$.ajax({
				url: base_url+"referensi/referensi/obat",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					response(data.slice(0, 15));
				},
				error: function(jqXHR, ajaxOption, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
		minLength: 2,
		focus: function(event, ui) {
			$("#obatid").val(ui.item['KDBRG']);
			$("#obatnama").val(ui.item['NMBRG']);
			$("#satuan").val(ui.item['NMSATUAN']);
			$("#obatnama").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#obatid").val(ui.item['KDBRG']);
			$("#obatnama").val(ui.item['NMBRG']);
			$("#satuan").val(ui.item['NMSATUAN']);
			$("#obatnama").removeClass("ui-autocomplete-loading");
			// spesialistiRujukan()
			return false;
		}
	});
	$("#komponenobat").carikomponen({
		source: function(request, response) {
			$.ajax({
				url: base_url+"referensi/referensi/komponenobat",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					response(data.slice(0, 15));
				},
				error: function(jqXHR, ajaxOption, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
		minLength: 2,
		focus: function(event, ui) {
			$("#komponenobatid").val(ui.item['KDBRG']);
			$("#komponenobat").val(ui.item['NMBRG']);
			$("#kapasitasobat").val(ui.item['KAPASITAS']);
			$("#satuandosis").val(ui.item['SATUANKAPASITAS']);
			$(".satuankapasitas").html(ui.item['SATUANKAPASITAS']);
			$("#komponenobat").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#komponenobatid").val(ui.item['KDBRG']);
			$("#komponenobat").val(ui.item['NMBRG']);
			$("#kapasitasobat").val(ui.item['KAPASITAS']);
			$("#satuandosis").val(ui.item['SATUANKAPASITAS']);
			$(".satuankapasitas").html(ui.item['SATUANKAPASITAS']);
			$("#komponenobat").removeClass("ui-autocomplete-loading");
			// spesialistiRujukan()
			return false;
		}
	});

	$("#tree").fancytree({
		// checkbox: true,
		treeId: "nav",
		autoActivate: false, // we use scheduleAction()
		autoCollapse: true,
		//			autoFocus: true,
		autoScroll: true,
		clickFolderMode: 3, // expand with single click
		minExpandLevel: 2,
		tabindex: "-1", // we don't want the focus frame
		// toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 2000 },
		// scrollParent: null, // use $container
		tooltip: function(event, data) {
			return data.node.title;
		},
		focus: function(event, data) {
			var node = data.node;
			// Auto-activate focused node after 1 second
			if(node.data.href){
				node.scheduleAction("activate", 1000);
			}
		},
		blur: function(event, data) {
			data.node.scheduleAction("cancel");
		},
		beforeActivate: function(event, data){
			var node = data.node;

			if( node.data.href && node.data.target === "_blank") {
				window.open(node.data.href, "_blank");
				return false; // don't activate
			}
		},
		activate: function(event, data){
			var node = data.node,
				orgEvent = data.originalEvent || {};

			// Open href (force new window if Ctrl is pressed)
			if(node.data.href){
				// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
			// When an external link was clicked, we don't want the node to become
			// active. Also the URL fragment should not be changed
			if( node.data.target === "_blank") {
				return false;
			}
			// Append #HREF to URL without actually loading content
			// (We check for this value on page load re-activate the node.)
			if( window.parent &&  parent.history && parent.history.pushState ) {
				parent.history.pushState({title: node.title}, "", "#" + (node.data.href || ""));
			}
		},
		click: function(event, data){
			// We implement this in the `click` event, because `activate` is not
			// triggered if the node already was active.
			// We want to allow re-loads by clicking again.
			console.clear();
			console.log(data);
			var node = data.node,
				orgEvent = data.originalEvent;
			if(node.data.href!=undefined)
			getPemeriksaan(node.data.href);
			// Open href (force new window if Ctrl is pressed)
			if(node.isActive() && node.data.href){
				// alert("ok")
				
				// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
		}
	});
	$("#treer").fancytree({
		// checkbox: true,
		treeId: "nav",
		autoActivate: false, // we use scheduleAction()
		autoCollapse: true,
		autoScroll: true,
		clickFolderMode: 3, // expand with single click
		minExpandLevel: 2,
		tabindex: "-1", // we don't want the focus frame
		// toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 2000 },
		// scrollParent: null, // use $container
		tooltip: function(event, data) {
			return data.node.title;
		},
		focus: function(event, data) {
			var node = data.node;
			// Auto-activate focused node after 1 second
			if(node.data.href){
				node.scheduleAction("activate", 1000);
			}
		},
		blur: function(event, data) {
			data.node.scheduleAction("cancel");
		},
		beforeActivate: function(event, data){
			var node = data.node;

			if( node.data.href && node.data.target === "_blank") {
				window.open(node.data.href, "_blank");
				return false; // don't activate
			}
		},
		activate: function(event, data){
			var node = data.node,
				orgEvent = data.originalEvent || {};

			// Open href (force new window if Ctrl is pressed)
			if(node.data.href){
				// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
			// When an external link was clicked, we don't want the node to become
			// active. Also the URL fragment should not be changed
			if( node.data.target === "_blank") {
				return false;
			}
			// Append #HREF to URL without actually loading content
			// (We check for this value on page load re-activate the node.)
			if( window.parent &&  parent.history && parent.history.pushState ) {
				parent.history.pushState({title: node.title}, "", "#" + (node.data.href || ""));
			}
		},
		click: function(event, data){
			// We implement this in the `click` event, because `activate` is not
			// triggered if the node already was active.
			// We want to allow re-loads by clicking again.
			console.clear();
			console.log(data);
			var node = data.node,
				orgEvent = data.originalEvent;
			if(node.data.href!=undefined)
			getPemeriksaanRadiologi(node.data.href);
			// Open href (force new window if Ctrl is pressed)
			if(node.isActive() && node.data.href){
				// alert("ok")
				
				// window.open(node.data.href, (orgEvent.ctrlKey || orgEvent.metaKey) ? "_blank" : node.data.target);
			}
		}
	});
	$('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	var tree = $.ui.fancytree.getTree(),
		frameHash = window.parent && window.parent.location.hash;

	if( frameHash ) {
		frameHash = frameHash.replace("#", "");
		tree.visit(function(n) {
			if( n.data.href && n.data.href === frameHash ) {
				n.setActive();
				return false; // done: break traversal
			}
		});
	}
});

function selesaiLayan(){
	var antreanfarmasi=$('#antreanfarmasi').val();
	// if(antreanfarmasi==""){
		var $taskaktif=$('#taskaktif').val();
				if($taskaktif<=4){
					var kodebooking = $('#kodebooking').val();
					var idx_pendaftaran = $('#idx_pendaftaran').val();
					var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/5/"+idx_pendaftaran;
					$.ajax({
						url: url,
						type: "GET",
						data: {},
						dataType: 'JSON',
						beforeSend: function () {
							// setting a timeout
							$('#btnSelesai').prop("disabled",true);
							$('#iconSelesai').removeClass('fa fa-flag-checkered')
							$('#iconSelesai').addClass('fa fa-spinner fa-spin')
						},
						success: function (data) {
							if(data.metadata.code==200){
								// tampilkanPesan('success',data.metadata.message);
								// window.location.href=base_url + "rajal/home"
								// formBookingFarmasi()
								// var antreanfarmasi=$('#antreanfarmasi').val();
								// if(antreanfarmasi==""){
								// 	// formBookingFarmasi();
								// }else{
									
								// }
								window.location.href=base_url + "rajal/home";
		
							}else{
								tampilkanPesan('warning',data.metadata.message,'');
								// var antreanfarmasi=$('#antreanfarmasi').val();
								// if(antreanfarmasi==""){
								// 	// formBookingFarmasi();
								// }else{
									
								// }
								if(data.metadata.message=="TaskId=5 sudah ada"){
									window.location.href=base_url + "rajal/home";
								}
							}
						},
						error: function(xhr) { // if error occured
							$('#btnSelesai').prop("disabled",false);
							$('#iconSelesai').removeClass('fa fa-spinner fa-spin')
							$('#iconSelesai').addClass('fa fa-flag-checkered');
						},
						complete: function() {
							$('#btnSelesai').prop("disabled",false);
							$('#iconSelesai').removeClass('fa fa-spinner fa-spin')
							$('#iconSelesai').addClass('fa fa-flag-checkered')
						},
					});
				}else{
					tampilkanPesan('warning',"Task Id 5 Sudah Terkirim")
				}
	// }
}

function bookingAntrianFarmasi(){
	var kodebooking = $('#kodebooking').val();
	var url=base_url+"jkn/booking/antreanfarmasi";
	$.ajax({
		url: url,
		type: "POST",
		data: {
			kodebooking:kodebooking,
			taskaktif:$('#taskaktif').val(),
			idx_pendaftaran:$('#idx_pendaftaran').val(),
			jenisresep:$('#jenisresep').val()
		},
		dataType: 'JSON',
		beforeSend: function () {
			// setting a timeout
			$('#btnBookingFarmasi').prop("disabled",true);
			$('#iconBookingFarmasi').removeClass('fa fa-save')
			$('#iconBookingFarmasi').addClass('fa fa-spinner fa-spin')
		},
		success: function (data) {
			if(data.metadata.code==200){
				$('#nomorantrian').html(data.response.antreanfarmasi)
				// if(data.response.labelantrianpoli!="") var ap=data.response.labelantrianpoli+"."+data.response.angkaantrean;
				// else var ap=data.response.angkaantrean;
				$('#estimasi').html("")
				$('#keterangan').html(data.response.keterangan)
				$('#kodebooking').html(data.response.kodebooking)
				$('#politujuan').html(data.response.namapoli)
				$('#modalantrian').modal('show');
				$('#bookingantreanfarmasi').modal('hide');
			
			}else{
				tampilkanPesan('warning',data.metadata.message,'');
				var antreanfarmasi=$('#antreanfarmasi').val();
				if(antreanfarmasi==""){
					// formBookingFarmasi();
				}else{
					if(data.metadata.message=="TaskId=5 sudah ada"){
						window.location.href=base_url + "rajal/home";
					}
				}
			}
		},
		error: function(xhr) { // if error occured
			$('#btnBookingFarmasi').prop("disabled",false);
			$('#iconBookingFarmasi').removeClass('fa fa-spinner fa-spin')
			$('#iconBookingFarmasi').addClass('fa fa-save');
		},
		complete: function() {
			$('#btnBookingFarmasi').prop("disabled",false);
			$('#iconBookingFarmasi').removeClass('fa fa-spinner fa-spin')
			$('#iconBookingFarmasi').addClass('fa fa-save')
		},
	});
}


function cetakAntrian()
{
	var printContents = document.getElementById('cetakantrian').innerHTML;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
	
}
function cetakPermintaanRadiologi(idx){
	window.open(base_url+"rajal/kunjungan/hasilpemeriksaanradiologi/"+idx);
}
function lihatHasilPemeriksaan(idx){
	window.open(base_url+"rajal/kunjungan/hasilpemeriksaanlabor/"+idx);
}
function listKunjungan(start=1){
    $('#start').val(start);
    var search = $('#q').val();
    var limit = $('#limit').val();
    var nomr = $('#nomr').val();
    var url = base_url+'rajal/kunjungan/kunjunganpasien/'+nomr+'?keyword=' + search + "&start=" + start + "&limit=" + limit ;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='12'><b>Loading...</b></td></tr>";
            $('#listkunjungan').html(tabel);
            $('#pagination').html('');
        },
        success : function(data){
            //menghitung jumlah data
            
            if(data["status"]==true){
                $('#listkunjungan').html('');
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
                    tabel="<tr>";
					tabel+="<td>"+no+"</td>";
                    tabel+="<td>"+res[i]['tgl_kunjungan']+"</td>";
                    tabel+="<td>"+res[i]['jenislayanan']+"</td>";
                    tabel+="<td>"+res[i]["nama_poli"]+"</td>";
                    tabel+="<td>"+res[i]['carabayar']+"</td>";
                    tabel+="<td>"+res[i]["nama_dokter"]+"</td>";
                    tabel+="<td><button type='button' class='btn btn-default btn-sm' onclick='lihatRiwayat(\""+res[i]['idx']+"\")' ><span class='fa fa-search'></span>Lihat</button></td>";
                    
                    tabel+="</tr>";
                    $('#listkunjungan').append(tabel);
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
                    //var lastSt=jmlPage;
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='listKunjungan(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-1;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='listKunjungan("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+1;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='listKunjungan("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='listKunjungan("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
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
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='listKunjungan("+ j +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='listKunjungan("+ j +")'>" + j +"</button>";
                        }
                    }
                    pagination+="<div class='btn-group'>"+desc+btnFirst + btnIdx + btnLast+"</div>";
                    $('#listkunjungan').html(pagination);
                }
            }
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}

function lihatRiwayat(idx){
	$('#detailriwayat').modal('show')
	$.ajax({
		url: base_url+"rajal/kunjungan/detailriwayat/"+idx,
		dataType: "JSON",
		method: "GET",
		data: {},
		success: function(data) {
			if(data.status==true){
				$('.modal-title').html("Detail Riwayat Kunjungan "+data.data.nama_poli+" Tanggal "+data.data.tgl_kunjungan)
				$('#idx_daftar').val(data.data.idx);
				$('#tglasesmen').html(data.asesmenawal.tanggalasesmen);
				$('#sumberinformasi').html(data.asesmenawal.sumberinformasi);
				$('#keluhan_utama').html(data.asesmenawal.keluhanutama);
				$('#v_riwayat_penyakit_sekarang').html(data.asesmenawal.riwayat_penyakit_sekarang);
				$('#v_riwayat_penyakit_dahulu').html(data.asesmenawal.riwayat_penyakit_dahulu);
				$('#v_alloanamnessa').html(data.asesmenawal.alloanamnessa);
				$('#v_riwayat_penyakit_keluarga').html(data.asesmenawal.riwayat_penyakit_keluarga);
				$('#pemeriksaankepala').html(data.asesmenawal.pemeriksaan_fisik_kepala);
				$('#pemeriksaantorak').html(data.asesmenawal.pemeriksaan_fisik_torak);
				$('#kajianawalmedis').html(data.asesmenawal.kajian_awal_medis);
				$('#v_td').html(data.cppt.td);
				$('#v_nadi').html(data.cppt.nadi);
				$('#v_suhu').html(data.cppt.suhu);
				$('#v_kesadaran').html(data.cppt.kesadaran);
				$('#s').html(data.cppt.subjective);
				$('#o').html(data.cppt.objective);
				$('#a').html(data.cppt.asesmen);
				$('#p').html(data.cppt.planning);
				$('#tglcatat').html(data.cppt.tglcatat);
			}else{
				$('.modal-title').html("Detail Riwayat Kunjungan "+data.data.nama_poli+" Tanggal "+data.data.tgl_kunjungan)
				$('#idx_daftar').val(data.data.idx);
				$('#tglasesmen').html('');
				$('#sumberinformasi').html('');
				$('#keluhan_utama').html('');
				$('#v_riwayat_penyakit_sekarang').html('');
				$('#v_riwayat_penyakit_dahulu').html('');
				$('#v_alloanamnessa').html('');
				$('#v_riwayat_penyakit_keluarga').html('');
				$('#pemeriksaankepala').html('');
				$('#pemeriksaantorak').html('');
				$('#kajianawalmedis').html('');
				$('#v_td').html('');
				$('#v_nadi').html('');
				$('#v_suhu').html('');
				$('#v_kesadaran').html('');
				$('#s').html('');
				$('#o').html('');
				$('#a').html('');
				$('#p').html('');
				$('#tglcatat').html('');
			}
		},
		error: function(jqXHR, ajaxOption, errorThrown) {
			console.log(errorThrown);
		}
	});

	// var url=base_url+'rajal/kunjungan/detail/'+idx;
	// window.open(url);
}

function pilihKontrol(){
	var jenis=$('#jenis').val();
	if(jenis=="") {
		$('#detform').hide();
		$('.spri').hide();
		$('.suratkontrol').hide();
	} else if(jenis==1){
		$('#detform').show();
		$('.spri').show();
		$('.suratkontrol').hide();
	}else if(jenis==2){
		$('#detform').show();
		$('.spri').hide();
		$('.suratkontrol').show();
	}
}

function caripoliKontrol(pilih=''){
	var jnsKontrol=$('#jenis').val();
	var noSEP=$('#noSEP').val();
	var no_bpjs=$('#no_bpjs').val();
	var tglRencanaKontrol=$('#tglRencanaKontrol').val();
	if(jnsKontrol==1){
		var url=base_url+'vclaim/rencanakontrol/spesialistik/'+jnsKontrol+"/"+no_bpjs+"/"+tglRencanaKontrol;
	}else{
		var url=base_url+'vclaim/rencanakontrol/spesialistik/'+jnsKontrol+"/"+noSEP+"/"+tglRencanaKontrol;
	}
	$.ajax({
	    url     : url,
	    type    : "POST",
	    dataType: "json",
	    data    : {get_param : 'value'},
        beforeSend  : function(){
			$('#iconCariDokter').removeClass('fa fa-hospital-o')
			$('#iconCariDokter').addClass('fa fa-spinner fa-spin')
		},
	    success : function(data){
			if(data.metaData.code==200){
				var provinsi=data.response.list;
				var jmlData=provinsi.length;
				var option="<option value=''>Pilih</option>";
				for(var i=0;i<jmlData;i++){
					if(pilih==provinsi[i]["kodePoli"]) var selected="selected";else var selected="";
					option+="<option value='"+provinsi[i]["kodePoli"]+"' "+selected+">"+provinsi[i]["namaPoli"]+"</option>";
				}
				$('#poliKontrol').html(option);
			}else{
				tampilkanPesan('warning',data.metaData.message)
			}
	    },
        error: function(xhr) { // if error occured
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
			$('#iconCariDokter').removeClass('fa fa-spinner fa-spin')
			$('#iconCariDokter').addClass('fa fa-hospital-o')
		},
		complete: function() {
			$('#iconCariDokter').removeClass('fa fa-spinner fa-spin')
			$('#iconCariDokter').addClass('fa fa-hospital-o')
		}
	});

}
function dokterKontrol(poli="",pilih=""){
	var jnsKontrol=$('#jenis').val();
	if(poli=="") poli = $('#poliKontrol').val();
	var tglRencanaKontrol=$('#tglRencanaKontrol').val();
	$.ajax({
	    url     : base_url+'vclaim/rencanakontrol/dokter/'+jnsKontrol+"/"+poli+"/"+tglRencanaKontrol,
	    type    : "POST",
	    dataType: "json",
	    data    : {get_param : 'value'},
        beforeSend  : function(){
			$('#iconDokter').removeClass('fa fa-user-md')
			$('#iconDokter').addClass('fa fa-spinner fa-spin')
		},
	    success : function(data){
			if(data.metaData.code==200){
				var provinsi=data.response.list;
				var jmlData=provinsi.length;
				var option="<option value=''>Pilih</option>";
				for(var i=0;i<jmlData;i++){
					if(pilih==provinsi[i]["kodeDokter"]) var selected="selected";else var selected="";
					option+="<option value='"+provinsi[i]["kodeDokter"]+"' "+selected+">"+provinsi[i]["namaDokter"]+"</option>";
				}
				$('#kodeDokter').html(option);
			}
	    },
        error: function(xhr) { // if error occured
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
			// $('#cariRujukan').prop("disabled",false);
			$('#iconDokter').removeClass('fa fa-spinner fa-spin')
			$('#iconDokter').addClass('fa fa-user-md')
		},
		complete: function() {
			// $('#cariRujukan').prop("disabled",false);
			$('#iconDokter').removeClass('fa fa-spinner fa-spin')
			$('#iconDokter').addClass('fa fa-user-md')
		}
	});
	
}

function resetFormKontrol(){
	$('#formkontrol').hide();
	$('#listkontrol').show();
	$('#formkontrol')[0].reset();
	$('#detform').hide();
	$('.spri').hide();
	$('.suratkontrol').hide();
}

function buatSuratKontrol(){
	var noSuratKontrol=$('#noSuratKontrol').val();
	if(noSuratKontrol==""){
		// alert("buat Surat Kontrol")
		var jnsKontrol=$('#jenis').val();
		var tglRencanaKontrol = $('#tglRencanaKontrol').val();
		var poliKontrol = $('#poliKontrol').val();
		var namapoliKontrol = $('#poliKontrol :selected').html();
		var kodeDokter = $('#kodeDokter').val();
		var namaDokter =$('#kodeDokter :selected').html();
		if(jnsKontrol==1) var noSEP=$('#no_bpjs').val();
		else var noSEP=$('#noSEP').val();
		var formData = {
			jnsKontrol : jnsKontrol,
			noSEP : noSEP,
			tglRencanaKontrol : tglRencanaKontrol,
			poliKontrol : poliKontrol,
			namapoliKontrol : namapoliKontrol,
			kodeDokter: kodeDokter, //Dokter yang menangani
			namaDokter: namaDokter, //Nama Dokter yang menangani
		}
		console.clear();
		console.log(formData);
		// return false;
		// var formData = new FormData($('#theform')[0]);
		$.ajax({
			url         : base_url+"vclaim/rencanakontrol/insert",
			type        : "POST",
			data        : formData,
			dataType    : "JSON",
			beforeSend  : function(){
				$('#btnbuatkontrol').prop("disabled",true);
				$('#iconkontrol').removeClass('fa fa-save')
				$('#iconkontrol').addClass('fa fa-spinner fa-spin')
			},
			success     : function(data){
				console.clear();
				console.log(data);
				if(data.metaData.code==200){
					if(jnsKontrol==2){
						// Surat Kontrol Rawat Jalan
						var sk=data.response.noSuratKontrol;
					}else{
						var sk=data.response.noSPRI;
					}
					
					window.open(base_url+"vclaim/rencanakontrol/cetak/"+sk);
				}else{
					//alert(data.metaData.message);
					tampilkanPesan('warning',data.metaData.message);
				}  
			},
			error: function(xhr) { // if error occured
				$('#error').modal('show');
				$('#xhr').html(xhr.responseText)
				$('#btnbuatkontrol').prop("disabled",false);
				$('#iconkontrol').removeClass('fa fa-spinner fa-spin')
				$('#iconkontrol').addClass('fa fa-save')
			},
			complete: function() {
				$('#btnbuatkontrol').prop("disabled",false);
				$('#iconkontrol').removeClass('fa fa-spinner fa-spin')
				$('#iconkontrol').addClass('fa fa-save')
			}
		});
	}else{
		// alert("Update Surat Kontrol")
		updateSuratKontrol();
	}
	
}
function rencanaKontrolBpjs() {
	var nokartu = $('#no_bpjs').val();
	var bulan = $('#bulan').val();
	var tahun = $('#tahun').val();
	var filter = $('#filter').val();
	$.ajax({
		url: base_url + "vclaim/rencanakontrol/listrencanakontrol/"+nokartu+"/"+bulan+"/"+tahun+"/"+filter,
		type: "GET",
		data: {
			get_param: 'value'
		},
		dataType: "JSON",
		beforeSend: function () {
			$('tbody#datakontrol').html("<tr><td colspan=4><i class='fa fa-refresh fa-spin'></i> Permintaan sedang diproses... Silahkan ditunggu</td></tr>");
		},
		success: function (data) {
			if(data.metaData.code==200){
				var res = '';
				if (data.response.list.length > 0) {
					$('#formkontrol').hide();
					$('#listkontrol').show();
					for (var i = 0; i <= data.response.list.length - 1; i++) {

						res += "<tr>";
						res += "<td>" + (i + 1) + "</td>";
						res += "<td><button onclick=setKontrol('" + data["response"]["list"][i]['noSuratKontrol'] + "') type='button' class='btn btnView btn-default btn-xs'>" + data["response"]["list"][i].noSuratKontrol + "</button></td>";
						if (data["response"]["list"][i]['jnsKontrol'] == 2) {
							res += "<td>Surat Kontrol</td>";
						} else {
							res += "<td>SPRI</td>";
						}
						res += "<td>" + data["response"]["list"][i]['tglRencanaKontrol'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['tglTerbitKontrol'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['namaPoliTujuan'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['namaDokter'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['terbitSEP'] + "</td>";
						res += "<td><div class='btn-group'>"+
						"<button type='button' class='btn btn-default btn-sm' onclick='cetakSuratKontrol(\""+data["response"]["list"][i].noSuratKontrol+"\")'><span class='fa fa-print'></span> Cetak</button>"+
						"<button type='button' class='btn btn-warning btn-sm' onclick='editSuratKontrol(\""+data["response"]["list"][i].noSuratKontrol+"\")'><span class='fa fa-pencil'></span> Edit</button>"+
						"<button type='button' class='btn btn-danger btn-sm' onclick='hapusSuratKontrol(\""+data["response"]["list"][i].noSuratKontrol+"\")'><span class='fa fa-remove'></span> Hapus</button></div></td>";
						res += "</tr>";
					}
					var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol);
					// if (jnsKontrol == 1) res += '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					// else res += '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
				} else {
					// alert(data.metaData.message);
					var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol)

					// if (jnsKontrol == 1) res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					// else res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
				}
			}else{
				var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol)

					// if (jnsKontrol == 1) res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					// else res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
			}
			
		},
		error: function (jqXHR, ajaxOption, errorThrown) {
			console.log(jqXHR.responseText);
		}
	});
}
function cetakSuratKontrol(nosurat){
	var url=base_url+"vclaim/rencanakontrol/cetak/"+nosurat;
	window.open(url);
}
function hapusSuratKontrol(nosurat){
    swal({
		title: "Konfirmasi",
		text: 'Apakah anda yakin akan Surat Kontrol Dengan No ' + nosurat + '?',
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm) {
		if (isConfirm) {
			var url = base_url+"/vclaim/rencanakontrol/hapus/"+nosurat;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					console.clear();
					console.log(data);
					if(data.metaData.code==200){
						rencanaKontrolBpjs()
						hapusLokal(nosurat)
						tampilkanPesan('success',data.metaData.message)
					}else{
						tampilkanPesan('warning',data.metaData.message)
					}
				}
			});
		}
	})
}

function editSuratKontrol(nosurat="",noKartu=""){
    // alert(nosurat)
	if(nosurat=="") nosurat = $('#editSurat').val();
	$.ajax({
	    url     : base_url+'vclaim/rencanakontrol/nosuratkontrol/'+nosurat,
	    type    : "GET",
	    dataType: "json",
	    data    : {get_param : 'value'},
	    success : function(data){
            if(data.metaData.code==200){
				$('#formkontrol').show();
				$('#listkontrol').hide();
				$('#noSuratKontrol').val(nosurat);
				$('#jenis').val(data.response.jnsKontrol).trigger('change')
				$('#tglRencanaKontrol').val(data.response.tglRencanaKontrol).trigger('change');
				caripoliKontrol(data.response.poliTujuan);
				dokterKontrol(data.response.poliTujuan,data.response.kodeDokterPembuat)
				
            }else{
                tampilkanPesan('warning',data.metaData.message)
            }
			console.log(data)
			// alert(data.jnsPelayanan);
			
			
	    }
	});
}

function updateSuratKontrol(){
	var noSuratKontrol=$('#noSuratKontrol').val();
	swal({
		title: "Konfirmasi",
		text: 'Apakah anda yakin akan Mengedit surat kontrol ' + noSuratKontrol + '?',
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Ya",
		cancelButtonText: "Tidak",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm) {
		if (isConfirm) {
			var jnsKontrol=$('#jenis').val();
			var tglRencanaKontrol = $('#tglRencanaKontrol').val();
			var noSuratKontrol = $('#noSuratKontrol').val();
			var poliKontrol = $('#poliKontrol').val();
			var namapoliKontrol = $('#poliKontrol :selected').html();
			var kodeDokter = $('#kodeDokter').val();
			var namaDokter =$('#kodeDokter :selected').html();
			if(jnsKontrol==1) var noSEP=$('#no_bpjs').val();
			else var noSEP=$('#noSEP').val();
			

			var formData = {
				jnsKontrol : jnsKontrol,
				noSEP : noSEP,
				tglRencanaKontrol : tglRencanaKontrol,
				poliKontrol : poliKontrol,
				namapoliKontrol : namapoliKontrol,
				kodeDokter: kodeDokter, //Dokter yang menangani
				namaDokter: namaDokter, //Nama Dokter yang menangani,
				noSuratKontrol: noSuratKontrol
			}
			console.log(formData);
			// return false;
			// var url = base_url+"/vclaim/rencanakontrol/hapus/"+nosurat;
			$.ajax({
				url         : base_url+"/vclaim/rencanakontrol/update",
				type        : "POST",
				data        : formData,
				dataType    : "JSON",
				success : function(data){
					console.clear();
					console.log(data);
					if(data.metaData.code==200){
						rencanaKontrolBpjs()
						tampilkanPesan('success',data.metaData.message)
					}else{
						tampilkanPesan('warning',data.metaData.message)
					}
				}
			});
		}
	})
}
function tambahSuratKontrol(){
	resetFormKontrol();
	$('#listkontrol').hide();
	$('#formkontrol').show();
}
function spesialistiRujukan(){
	var param1=$('#ppkDirujuk').val();
	var param2=$('#r-tglRencanaKunjungan').val()
	var url = base_url+"vclaim/rujukan/spesialistik/"+param1+"/"+param2;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
        beforeSend: function() {
            // setting a timeout
            $('#cariSpesialistik').prop("disabled",true);
            $('#iconSpesialistik').removeClass('fa fa-search')
            $('#iconSpesialistik').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
	    success : function(data){
	        //menghitung jumlah data
			//console.clear();
			//alert(param1 +" " +param2 + " " + param3);
	        console.log(url);
            
	        if(data.metaData.code==200){
	            var dokter    = data.response.list;
	            var jmlData=dokter.length;
	            var option   = "";
                var no=0;
	            //Create Tabel
	            for(var i=0; i<jmlData;i++){
                    no=i+1;
                    option+='<tr role="row">'+
                    '<td>'+no+'</td>'+
                    '<td><button type="button" class="btn btn-default btn-xs" onclick="setSpesialistik(\''+dokter[i].kodeSpesialis+'\',\''+dokter[i].namaSpesialis+'\')">'+dokter[i].namaSpesialis+'</button></td>'+
                    '<td>'+dokter[i].kapasitas+'</td>'+
                    '<td>'+dokter[i].kapasitas+'</td>'+
                    '<td>'+dokter[i].persentase+'</td>'+
                '</tr>';
            }
                $('#form-list-spesialistik').modal('show');
				$('#list-data-spesialistik').html(option);
				// var faskes=$('#r-faskes').val();
	        }else{
				// var poli=$('#txtnmpoli').val();
				// alert("Error saat pencarian data dokter "+ poli + ' karena ' +data.metaData.message)
			}
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cariSpesialistik').prop("disabled",false);
            $('#iconSpesialistik').removeClass('fa fa-spinner spin')
            $('#iconSpesialistik').addClass('fa fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cariSpesialistik').prop("disabled",false);
            $('#iconSpesialistik').removeClass('fa fa-spinner spin')
            $('#iconSpesialistik').addClass('fa fa-search')
        },
	});
}
function setSpesialistik(kode,nama){
    $('#r-poliRujukan').val(kode);
    $('#namaPoliRujukan').val(nama);
    $('#form-list-spesialistik').modal('hide');
}
function createRujukan(){
	var jnsPelayanan = $("input[name='jnsPelayanan']:checked").val();

	var formData = {
		id_daftar : $('#id_daftar').val(),
		reg_unit : $('#reg_unit').val(),
		noSep 	: $('#r-noSep').val(),
		tglRujukan: $('#r-tglRujukan').val(),
        tglRencanaKunjungan:$('#r-tglRencanaKunjungan').val(),
        ppkDirujuk: $('#ppkDirujuk').val(),
        jnsPelayanan: jnsPelayanan,
        catatan: $('#r-catatan').val(),
        diagRujukan: $('#diagRujukan').val(),
        tipeRujukan: $('#r-tipeRujukan').val(),
        poliRujukan: $('#r-poliRujukan').val(),
	}
	console.clear();
	console.log(formData);
    // return false;
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/rujukan/insert",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#btnBuatRujukan').prop("disabled",true);
            $('#iconBuatrujukan').removeClass('fa fa-save')
            $('#iconBuatrujukan').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
		success     : function(data){
			console.clear();
			console.log(data);
			if(data.metaData.code==200){
				tampilkanPesan('success',data.metaData.message);
				getRujukanKeluar(data.response.rujukan.noRujukan)
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
