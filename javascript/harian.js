$(document).ready(function() {
    // $('#param').select2();
    $('.datepicker').inputmask('yyyy-mm-dd', {
        'placeholder': 'yyyy-mm-dd'
    });
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });

    // $.widget("custom.parameter", $.ui.autocomplete, {
    //     _create: function() {
    //         this._super();
    //         this.widget().menu("option", "items", "> li:not(.ui-autocomplete-header)");
    //     },
    //     _renderMenu(ul, items) {
    //         var self = this;
    //         ul.addClass("container");

    //         let header = {
    //             field_label: "Paramter",
    //             isheader: true
    //         };
    //         self._renderItemData(ul, header);
    //         $.each(items, function(index, item) {
    //             self._renderItemData(ul, item);
    //         });

    //     },
    //     _renderItemData(ul, item) {
    //         return this._renderItem(ul, item).data("ui-autocomplete-item", item);
    //     },
    //     _renderItem(ul, item) {
    //         var $li = $("<li class='ui-menu-item' role='presentation'></li>");
    //         if (item.isheader)
    //             $li = $("<li class='ui-autocomplete-header' role='presentation'  style='font-weight:bold !important; width:100%'></li>");
    //         var $content = "<div class='col-md-12 ui-menu-item-wrapper'>" +
    //             "<div class='col-md-12'>" + item.field_label + "</div>" +
    //             "</div>";
    //         $li.html($content);


    //         return $li.appendTo(ul);
    //     }
        
    // });

    // $("#kelompok").parameter({
	// 	source: function(request, response) {
	// 		$.ajax({
	// 			url: base_url+"rekammedis/rekapitulasi/parameter",
	// 			dataType: "JSON",
	// 			method: "GET",
	// 			data: {
	// 				param: request.term
	// 			},
	// 			success: function(data) {
	// 				response(data.slice(0, 15));
	// 			},
	// 			error: function(jqXHR, ajaxOption, errorThrown) {
	// 				console.log(errorThrown);
	// 			}
	// 		});
	// 	},
	// 	minLength: 0,
	// 	focus: function(event, ui) {
	// 		$("#kelompok").val(ui.item['field_label']);
	// 		$("#kelompok").removeClass("ui-autocomplete-loading");
	// 		return false;
	// 	},
	// 	select: function(event, ui) {
	// 		$("#kelompok").val('');
	// 		$("#kelompok").removeClass("ui-autocomplete-loading");
	// 		// spesialistiRujukan()
    //         var param='<tr ><td class="baris"><div class="btn-group">'+
    //             '<input type="hidden" name="group[]" value="'+ui.item['field']+'">'+
    //             '<button type="button" class="btn btn-danger btn-xs btnremove"><span class="fa fa-remove"></span></button>'+
    //             '<button type="button" class="btn btn-default btn-xs">'+ui.item['field_label']+'</button>'+
    //         '</div></td></tr>';
    //         $('#listparameter').append(param);
    //         getDataHarian()
	// 		return false;
	// 	}
	// });

    // $('#listparameter').on('click', '.btnremove', function(e) {
    //     e.preventDefault();
    //     $(this).parent().parent().remove();
    //     getDataHarian()
    // });
    getDataHarian();
});

function getDataHarian(){
    var url;
    url = base_url + "rekammedis/rekapitulasi/dataharian";
    var formData = new FormData($('#form')[0]);
    $.ajax({
        url : url,
        type: "POST",
        data : formData,
        processData: false,
        contentType: false,
        dataType: 'JSON',
        beforeSend: function() {
            $('#iconcari').removeClass('fa fa-search')
            $('#iconcari').addClass('fa fa-spinner spin')
        },
        success: function(data)
        {
            $('#headerriwayat').html(data.header);
            let row=data.data
            let tabel='';
            let no=0;
            for (let index = 0; index < row.length; index++) {
                no++;
                const ele = row[index];
                tabel+='<tr>'+
                '<td>'+no+'</td>'+
                '<td>'+ele.tgl_kunjungan+'</td>';
                if(data.group.jenispasien==1){
                    tabel+='<td>'+ele.pasienbaru+'</td><td>'+ele.pasienlama+'</td>';
                }
                
                if(data.group.pekerjaan==1){
                    console.clear();
                    for (let p = 0; p < data.groupfield.pekerjaan.length; p++) {
                        const elep = data.groupfield.pekerjaan[p];
                        tabel+='<td>'+ele[elep]+'</td>'
                        console.log(p)
                    }
                }

                if(data.group.caradaftar==1){
                    console.clear();
                    for (let p = 0; p < data.groupfield.caradaftar.length; p++) {
                        const elep = data.groupfield.caradaftar[p];
                        tabel+='<td>'+ele[elep]+'</td>'
                    }
                }

                if(data.group.carabayar==1){
                    console.clear();
                    for (let p = 0; p < data.groupfield.carabayar.length; p++) {
                        const elep = data.groupfield.carabayar[p];
                        tabel+='<td>'+ele[elep]+'</td>'
                    }
                }

                if(data.group.rujukan==1){
                    console.clear();
                    for (let p = 0; p < data.groupfield.rujukan.length; p++) {
                        const elep = data.groupfield.rujukan[p];
                        tabel+='<td>'+ele[elep]+'</td>'
                    }
                }
                if(data.group.ruangan==1){
                    console.clear();
                    for (let p = 0; p < data.groupfield.ruangan.length; p++) {
                        const elep = data.groupfield.ruangan[p];
                        tabel+='<td>'+ele[elep]+'</td>'
                    }
                }
                if(data.group.wilayah==1){
                    console.clear();
                    tabel+='<td>'+ele.padangpariaman+'</td><td>'+
                    ele.pariaman+'</td><td>'+ele.padang+'</td><td>'+
                    ele.wilayahlain+'</td><td>'+ele.pariaman+'</td>';
                }
                tabel+='<td>'+ele.jmlpasien+'</td>'
                '</tr>';
            }
            $('#datarekapitulasi').html(tabel);
        },
        error: function(xhr) { // if error occured
            $('#iconcari').removeClass('fa fa-spinner spin')
            $('#iconcari').addClass('fa fa-search')
        },
        complete: function() {
            $('#iconcari').removeClass('fa fa-spinner spin')
            $('#iconcari').addClass('fa fa-search')
        }
    });
}