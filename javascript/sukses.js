$(document).ready(function() {
    
    $("#r-ppkDirujuk").carippk({
		source: function(request, response) {
			var faskes=$('#r-faskes').val();
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
			$("#ppkDirujuk").val(ui.item['kode']);
			$("#r-ppkDirujuk").val(ui.item['nama']);
			$("#r-ppkDirujuk").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
            // alert("spesialis")
			$("#ppkDirujuk").val(ui.item['kode']);
			$("#r-ppkDirujuk").val(ui.item['nama']);
			$("#r-ppkDirujuk").removeClass("ui-autocomplete-loading");
            // spesialistiRujukan();
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

    $("#r-ppkDirujuk").carippk({
        source: function(request, response) {
            var asalRujukan=$('#r-faskes').val();
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
            $("#ppkDirujuk").val(ui.item['kode']);
            $("#r-ppkDirujuk").val(ui.item['nama']);
            $("#r-ppkDirujuk").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#ppkDirujuk").val(ui.item['kode']);
            $("#r-ppkDirujuk").val(ui.item['nama']);
            $("#r-ppkDirujuk").removeClass("ui-autocomplete-loading");
            // spesialistiRujukan();
            return false;
        }
    });

    $("#r-diagRujukan").caridiagnosa({
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
            $("#diagRujukan").val(ui.item['kode']);
            $("#r-diagRujukan").val(ui.item['nama']);
            $("#r-diagRujukan").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#diagRujukan").val(ui.item['kode']);
            $("#r-diagRujukan").val(ui.item['nama']);
            $("#r-diagRujukan").removeClass("ui-autocomplete-loading");
            return false;
        }
    });

});

