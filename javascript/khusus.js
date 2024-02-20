$(document).ready(function() {
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
	$("#s_diagnosa").autocomplete({
		source: function(request, response) {
			$.ajax({
				url: base_url+"vclaim/referensi/diagnosa",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					var fk = data.response.diagnosa;
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
			$("#s_icd").val(ui.item['kode']);
			$("#s_diagnosa").val(ui.item['nama']);
			$("#s_diagnosa").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#s_icd").val(ui.item['kode']);
			$("#s_diagnosa").val(ui.item['nama']);
			$("#s_diagnosa").removeClass("ui-autocomplete-loading");
			return false;
		}
	})
	.autocomplete("instance")._renderItem = function(table, item) {
		return $("<tr class='autocomplete'>")
			.append("<td style='width:100px'>" + item['kode'] + "</td><td style='width:300px'>" + item['nama'] + "</td>")
			.appendTo(table);
	};

    $("#p_diagnosa").autocomplete({
		source: function(request, response) {
			$.ajax({
				url: base_url+"vclaim/referensi/diagnosa",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					var fk = data.response.diagnosa;
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
			$("#p_icd").val(ui.item['kode']);
			$("#p_diagnosa").val(ui.item['nama']);
			$("#p_diagnosa").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#p_icd").val(ui.item['kode']);
			$("#p_diagnosa").val(ui.item['nama']);
			$("#p_diagnosa").removeClass("ui-autocomplete-loading");
			return false;
		}
	})
	.autocomplete("instance")._renderItem = function(table, item) {
		return $("<tr class='autocomplete'>")
			.append("<td style='width:100px'>" + item['kode'] + "</td><td style='width:300px'>" + item['nama'] + "</td>")
			.appendTo(table);
	};

    $("#nmprocedure").autocomplete({
		source: function(request, response) {
			$.ajax({
				url: base_url+"vclaim/referensi/procedure",
				dataType: "JSON",
				method: "GET",
				data: {
					param: request.term
				},
				success: function(data) {
					console.clear();
					console.log(data);
					var fk = data.response.procedure;
					// console.log(diagnosa);
					response(fk.slice(0, 15));
				},
				error: function(jqXHR, ajaxOption, errorThrown) {
					console.log(errorThrown);
				}
			});
		},
		minLength: 3,
		focus: function(event, ui) {
			$("#procedure").val(ui.item['kode']);
			$("#nmprocedure").val(ui.item['nama']);
			$("#nmprocedure").removeClass("ui-autocomplete-loading");
			return false;
		},
		select: function(event, ui) {
			$("#procedure").val(ui.item['kode']);
			$("#nmprocedure").val(ui.item['nama']);
			$("#nmprocedure").removeClass("ui-autocomplete-loading");
			return false;
		}
	})
	.autocomplete("instance")._renderItem = function(table, item) {
		return $("<tr class='autocomplete'>")
			.append("<td style='width:100px'>" + item['kode'] + "</td><td style='width:300px'>" + item['nama'] + "</td>")
			.appendTo(table);
	};
});
