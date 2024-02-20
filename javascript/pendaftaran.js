var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

$(document).ready(function() {
    // $(".inputmask").inputmask();
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
    // $('.datepicker').inputmask('yyyy-mm-dd', {
    //     'placeholder': 'yyyy-mm-dd'
    // });
    $('.datepicker').datepicker({
        autoclose: true,
        dateFormat: "yy-mm-dd"
    });
    $('.select2').select2({
        placeholder: '------------ Pilih option ------------'
    });
    // Action Form Pasien 
	var jkn=$('#jkn').val();
	var nobpjs=$('#nobpjs').val();
	if(jkn==1 && nobpjs!=''){
		cekPeserta();
		var jeniskunjungan=$('#jeniskunjungan').val();
		if(jeniskunjungan==1){
			var nomorreferensi=$('#nomorreferensi').val();
			$('#jmlsep').val(0);
			periksaRujukan(nomorreferensi,1,2);
		}
		else if(jeniskunjungan==3){
			var nomorreferensi=$('#nomorreferensi').val();
			$('#jmlsep').val(1);
			setKontrol(nomorreferensi);
		}
		else if(jeniskunjungan==4){
			$('#jmlsep').val(0);
			var nomorreferensi=$('#nomorreferensi').val();
			periksaRujukan(nomorreferensi,2,2);
		}else{

		}
	}
    $('#u_nik').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_nik').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value.length == 16) {
                ceknikbpjs(1);
            } else{
                alert("NIK yang anda masukkan tidak valid "+value.length);
                $('#u_no_ktp').focus();
            }
    
        }
        return true;
    });
    $('#u_no_bpjs').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_no_bpjs').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value.length == 13) {
                ceknomorbpjs(1);
            } 
    
        }
        return true;
    });
    $('#u_tempat_lahir').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_tempat_lahir').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Tempat Lahir Belum Dipilih");
                $('#u_tempat_lahir').focus();
            } else {
                $('#u_tgl_lahir').focus();
            }
    
        }
        return true;
    });
    $('#u_nama').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_nama').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Nama Pasien Belum Dipilih");
                $('#u_nama').focus();
            } else {
                $('#u_tempat_lahir').focus();
            }
    
        }
        return true;
    });
    $('#u_tempat_lahir').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_tempat_lahir').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Tempat Lahir Belum Dipilih");
                $('#u_tempat_lahir').focus();
            } else {
                $('#u_tgl_lahir').focus();
            }
    
        }
        return true;
    });
    $('#u_tgl_lahir').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_tgl_lahir').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Tanggal Lahir Belum Dipilih");
                $('#u_tgl_lahir').focus();
            } else {
                $('#u_jns_kelamin').focus();
            }
    
        }
        return true;
    });
    $('#u_kewarganegaraan').change(function() {
        var x = $(this).val();
        if (x == 'WNI') {
            $('.groupKewarganegaraan').hide();
            $('.groupWNI').show();
        } else if (x == 'WNA') {
            $('.groupKewarganegaraan').hide();
            $('.groupWNA').show();
        } else {
            $('.groupKewarganegaraan').hide();
        }
    });
    $('#u_pekerjaan').change(function() {
        var x = $(this).val();
        if (x == 5) {
            $('#u_divpekerjaan').removeClass('col-md-8')
            $('#u_divpekerjaan').addClass('col-md-4')
            $('#u_divlainnya').show();
        }else {
            $('#u_divpekerjaan').removeClass('col-md-4')
            $('#u_divpekerjaan').addClass('col-md-8')
            $('#u_divlainnya').hide();
        }
    });
    $('#u_agama').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_agama').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Agama Belum Dipilih");
                $('#u_agama').focus();
            } else {
                $('#u_pendidikan').focus();
            }
    
        }
        return true;
    });
    
    $('#u_jns_kelamin').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_jns_kelamin').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                $('#u_jns_kelamin').focus();
            } else {
                $('#u_agama').focus();
            }
    
        }
        return true;
    });
    $('#u_pendidikan').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_pendidikan').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Pendidikan Belum Dipilih");
                $('#u_pendidikan').focus();
            } else {
                $('#u_pekerjaan').focus();
            }
    
        }
        return true;
    });
    $('#u_pendidikan').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_pendidikan').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Pendidikan Belum Dipilih");
                $('#u_pendidikan').focus();
            } else {
                $('#u_pekerjaan').focus();
            }
    
        }
        return true;
    });
    $('#u_pekerjaan').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_pekerjaan').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Pekerjaan masih Kosong");
                $('#u_pekerjaan').focus();
            } else {
                var x = $(this).val();
                if (x == 5) {
                    $('#u_divpekerjaan').removeClass('col-md-8')
                    $('#u_divpekerjaan').addClass('col-md-4')
                    $('#u_divlainnya').show();
                    $('#u_pekerjaanlain').focus();
                }else {
                    $('#u_divpekerjaan').removeClass('col-md-4')
                    $('#u_divpekerjaan').addClass('col-md-8')
                    $('#u_divlainnya').hide();
                    $('#u_status_kawin').focus();
                }
                
            }
    
        }
        return true;
    });
    $('#u_pekerjaanlain').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_pekerjaanlain').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("nama Pekerjaan masih Kosong");
                $('#u_pekerjaanlain').focus();
            } else {
                $('#u_status_kawin').focus();
                // $("#status_kawin").select2('open');
            }
    
        }
        return true;
    });
    $('#u_status_kawin').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_status_kawin').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Status kawin masih Kosong");
                $('#u_status_kawin').focus();
            } else {
                // $('#u_suku').focus();
                $("#u_suku").select2('open');
            }
    
        }
        return true;
    });
    
    $('#u_suku').on('select2:select', function(e) {
        $("#u_bahasa").select2('open');
    });
    $('#u_bahasa').on('select2:select', function(e) {
        $("#u_keterbatasanbahasa").focus();
    });
    $('#u_keterbatasanbahasa').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_status_kawin').val();
        if (evt.keyCode == 13) {
            $('#u_no_telpon').focus();
        }
        return true;
    });
    $('#u_no_telpon').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_no_telpon').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("No telp masih Kosong");
                $('#u_no_telpon').focus();
            } else {
                $('#u_no_hp').focus();
                // $("#kewarganegaraan").select2('open');
            }
    
        }
        return true;
    });
    $('#u_no_hp').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_no_hp').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("No HP masih Kosong");
                $('#u_no_hp').focus();
            } else {
                $('#u_nama_ibu_kandung').focus();
                // $("#kewarganegaraan").select2('open');
            }
    
        }
        return true;
    });
    $('#u_nama_ibu_kandung').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_nama_ibu_kandung').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Nama Ibu Kandung masih Kosong");
                $('#u_nama_ibu_kandung').focus();
            } else {
                $('#u_kewarganegaraan').focus();
                // $("#kewarganegaraan").select2('open');
            }
    
        }
        return true;
    });
    $('#u_kewarganegaraan').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_kewarganegaraan').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Kewarganegaraan Belum Dipilih");
                $('#u_kewarganegaraan').focus();
            } else {
                // alert(value)
                if(value=="WNI") $("#nama_provinsi").select2('open');
                else $("#nama_negara").select2('open');
            }
    
        }
        return true;
    });
    $('#u_nama_provinsi').on('select2:select', function(e) {
        getKabupaten();
    });
    
    $('#u_nama_kab_kota').on('select2:select', function(e) {
        var a = $('#u_nama_kab_kota').val();
        getKecamatan();
    });
    $('#u_nama_kecamatan').on('select2:select', function(e) {
        getKelurahan();
    });
    $('#u_nama_kelurahan').on('select2:select', function(e) {
        $("#alamat").focus();
    });
    
    $('#u_alamat').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_alamat').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Alamat masih kosong");
                $('#u_alamat').focus();
            } else {
                $('#u_rt').focus();
            }
    
        }
        return true;
    });
    
    $('#u_rt').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_rt').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("RT masih kosong");
                $('#u_rt').focus();
            } else {
                $('#u_rw').focus();
            }
    
        }
        return true;
    });
    $('#u_rw').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_rt').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("RT masih kosong");
                $('#u_rw').focus();
            } else {
                $('#u_kodepos').focus();
            }
    
        }
        return true;
    });
    $('#u_kodepos').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_kodepos').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Kode Pos masih kosong");
                $('#u_kodepos').focus();
            } else {
                $('#u_domisilisesuaiktp').focus();
            }
    
        }
        return true;
    });
    $('#u_domisilisesuaiktp').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_domisilisesuaiktp').prop("checked");
        if (evt.keyCode == 13) {
            // alert(value)
            if(value==true){
                $('.domisili').hide();
                $('#u_penanggung_jawab').focus();
                
            }else{
                $('.domisili').show();
                $('#u_nama_provinsi_domisili').select2('open');
            }
        }
        return true;
    });
    $('#u_nama_provinsi_domisili').on('select2:select', function(e) {
        var a = $('#u_nama_provinsi_domisili').val();
        getKabupaten('u_nama_provinsi_domisili','u_nama_kab_kota_domisili')
    
    });
    $('#u_nama_kab_kota_domisili').on('select2:select', function(e) {
        var a = $('#u_nama_kab_kota_domisili').val();
        getKecamatan('u_nama_kab_kota_domisili','u_nama_kecamatan_domisili')
    });
    $('#u_nama_kecamatan_domisili').on('select2:select', function(e) {
        getKelurahan('u_nama_kecamatan_domisili','u_nama_kelurahan_domisili')
        
    });
    $('#u_nama_kelurahan_domisili').on('select2:select', function(e) {
        $("#alamat_domisili").focus();
    });
    $('#u_alamat_domisili').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_alamat_domisili').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Alamat masih kosong");
                $('#u_alamat_domisili').focus();
            } else {
                $('#u_rt_domisili').focus();
            }
    
        }
        return true;
    });
    
    $('#u_rt_domisili').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_rtdomisili').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("RT masih kosong");
                $('#u_rt_domisili').focus();
            } else {
                $('#u_rw_domisili').focus();
            }
    
        }
        return true;
    });
    $('#u_rw_domisili').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_rt').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("RW masih kosong");
                $('#u_rw_domisili').focus();
            } else {
                $('#u_kodepos_domisili').focus();
            }
    
        }
        return true;
    });
    $('#u_kodepos_domisili').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_kodepos_domisili').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Kode Pos masih kosong");
                $('#u_kodepos_domisili').focus();
            } else {
                $('#u_penanggung_jawab').focus();
            }
    
        }
        return true;
    });
    $('#u_penanggung_jawab').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_penanggung_jawab').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("penanggung jawab masih kosong");
                $('#u_penanggung_jawab').focus();
            } else {
                $('#u_umur_pj').focus();
            }
    
        }
        return true;
    });
    $('#u_umur_pj').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_umur_pj').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Umur penanggung jawab masih kosong");
                $('#u_umur_pj').focus();
            } else {
                $('#u_pekerjaan_pj').focus();
            }
    
        }
        return true;
    });
    $('#u_pekerjaan_pj').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_pekerjaan_pj').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Pekerjaan penanggung jawab masih kosong");
                $('#u_pekerjaan_pj').focus();
            } else {
                $('#u_alamat_pj').focus();
            }
    
        }
        return true;
    });
    $('#u_alamat_pj').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_alamat_pj').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("Alamat penanggung jawab masih kosong");
                $('#u_alamat_pj').focus();
            } else {
                $('#u_no_penanggung_jawab').focus();
            }
    
        }
        return true;
    });
    $('#u_no_penanggung_jawab').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_no_penanggung_jawab').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("No penanggung jawab masih kosong");
                $('#u_no_penanggung_jawab').focus();
            } else {
                $('#u_hub_keluarga').focus();
            }
    
        }
        return true;
    });
    $('#u_hub_keluarga').keydown(function(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        var value = $('#u_hub_keluarga').val();
        if (evt.keyCode == 13) {
            console.log(evt.keyCode);
            if (value == '') {
                alert("hubungan keluarga masih kosong");
                $('#u_hub_keluarga').focus();
            } else {
                $('#btnSimpan').focus();
            }
    
        }
        return true;
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
				getAntrian();
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
    $("#e-txtnmdiagnosa").caridiagnosa({
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
            $("#e-diagAwal").val(ui.item['kode']);
            $("#e-txtnmdiagnosa").val(ui.item['nama']);
            $("#e-txtnmdiagnosa").removeClass("ui-autocomplete-loading");
            return false;
        },
        select: function(event, ui) {
            $("#e-diagAwal").val(ui.item['kode']);
            $("#e-txtnmdiagnosa").val(ui.item['nama']);
            $("#e-txtnmdiagnosa").removeClass("ui-autocomplete-loading");
            return false;
        }
    });



    $('#batal').click(function() {
        window.location.href = base_url+'rekammedis/pasien';
    });


    $('#daftar').click(function() {
        var bd=$('#backdate').prop("checked");
        var backdate=bd==true?1:0;
        var formdata = {
            idx_pasien :$('#idx_pasien').val(),
            id_daftar :$('#id_daftar').val(),
            id_cara_daftar :$('#id_cara_daftar').val(),
            jns_layanan:$('#jns_layanan').val(),
            nomr_pasien:$('#nomr').val(),
            nama_pasien:$('#nama_pasien').val(),
            pekerjaan:$('#pekerjaan').val(),
            notelp:$('#notelp').val(),
            tgl_lahir:$('#tgl_lahir').val(),
            provinsi:$('#nama_provinsi').val(),
            kab_kota:$('#nama_kab_kota').val(),
            kecamatan:$('#nama_kecamatan').val(),
            kelurahan:$('#nama_kelurahan').val(),
            id_provinsi:$('#id_provinsi').val(),
            id_kab_kota:$('#id_kab_kota').val(),
            id_kecamatan:$('#id_kecamatan').val(),
            id_kelurahan:$('#id_kelurahan').val(),
            alamat:$('#alamat').val(),
            rt:$('#rt').val(),
            rw:$('#rw').val(),
            kodepos:$('#kodepos').val(),
            tgllayan:$('#tgllayan').val(),
            backdate:backdate,
            provinsi_domisili:$('#provinsi_domisili').val(),
            kab_kota_domisili:$('#kabupaten_domisili').val(),
            kecamatan_domisili:$('#kecamatan_domisili').val(),
            kelurahan_domisili:$('#kelurahan_domisili').val(),
            id_provinsi_domisili:$('#id_provinsi_domisili').val(),
            id_kab_kota_domisili:$('#id_kab_kota_domisili').val(),
            id_kecamatan_domisili:$('#id_kecamatan_domisili').val(),
            id_kelurahan_domisili:$('#id_kelurahan_domisili').val(),
            alamat_domisili:$('#alamat_domisili').val(),
            rt_domisili:$('#rt_domisili').val(),
            kodepos_domisili:$('#kodepos_domisili').val(),
            referensirajal:$('#referensi').val(),
            sepasal:$('#sepasal').val(),
            no_rujuk:$('#noRujukan').val(),
            id_cara_bayar:$('#id_cara_bayar').val(),
            carabayar:$('#id_cara_bayar :selected').html(),
            id_kelas:$('#kelas_layanan').val(),
            kelas_layanan:$('#kelas_layanan :selected').html(),
            id_jenis_peserta:$('#id_jenis_peserta').val(),
            jenis_peserta:$('#jenis_peserta').val(),
            id_rujuk:$('#id_rujuk').val(),
            rujukan:$('#id_rujuk :selected').html(),
            id_poli:$('#id_ruang').val(),
            nama_poli:$('#id_ruang :selected').html(),
            id_dokter:$('#dokterJaga').val(),
            nama_dokter:$('#dokterJaga :selected').html(),
            tgl_daftar:$('#tgl_daftar').val(),
            nobpjs:$('#nobpjs').val(),
            no_surat:$('#no_suratkontrol').val(),
            keluhan:$('#keluhan').val(),
            notelp:$('#no_telpon').val(),
            id_poli_asal:$('#id_poli_asal').val(),
            nama_poli_asal:$('#nama_poli_asal').val(),
            id_dokter_pengirim:$('#id_dokter_pengirim').val(),
            nama_dokter_pengirim:$('#nama_dokter_pengirim').val(),
            kodepoli:$('#kodepoli').val(),
            namapoli:$('#namapoli').val(),
            kodedokter:$('#kodedokter').val(),
            kodebooking:$('#kodebooking').val(),
            terkirim:$('#terkirim').val(),
            no_jaminan:$('#no_jaminan').val()
        }
		// alert(formdata['kodebooking']);
		// return false;
        // console.log(formdata);
        // return false;
        // if (formdata['nomr_pasien'] == "" || formdata['nama_pasien'] == "") {
        //     tampilkanPesan('warning','Ops. No.MR tidak boleh kosong.');
        // } else if (formdata['pjPasienNama'] == "") {
        //     tampilkanPesan('warning','Ops. Nama penanggung jawab pasien tidak boleh kosong.');
        //     $('#pjPasienNama').focus()
        // }else if (formdata['id_cara_daftar'] == "") {
        //     tampilkanPesan('warning','Ops. Cara daftar pasien belum dipilih.');
        //     $('#id_cara_daftar').focus()
        // } else if (formdata['id_cara_bayar'] == "") {
        //     tampilkanPesan('warning','Ops. Cara bayar harus di pilih.');
        // } else if (formdata['id_rujuk'] == "") {
        //     tampilkanPesan('warning','Ops. Rujukan harus di pilih.');
        // } else if (formdata['id_poli'] == "") {
        //     tampilkanPesan('warning','Ops. Tujuan layanan harus di pilih.');
        // } else if (formdata['id_dokter'] == "") {
        //     tampilkanPesan('warning','Ops. Dokter  harus di pilih.');
        // }  else {
            // if ($('#jkn').val() == 1) {
            //     if ($('#status_peserta').val() == '') {
            //         tampilkanPesan('warning','Ops. Status Kepesertaan BPJS Tidak Diketahui');
            //         return false
            //     } else if ($('#status_peserta').val() != 'AKTIF') {
            //         var status = $('#status_peserta').val();
            //         tampilkanPesan('warning','Ops. Status Kepesertaan BPJS ' + status + ' Tidak Dikeahui');
            //         return false;
            //     }
            // }
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
							alert(data.message)
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
        // }
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
        var kewarganegaraan=$('#u_kewarganegaraan').val();
        var nomr=$('#u_nomr').val();
        var tgldaftar=$('#u_tgldaftar').val();
        var id_provinsi=$('#u_nama_provinsi').val()
        var provinsi=$('#u_nama_provinsi :selected').html()
        var id_kab_kota=$('#u_nama_kab_kota').val()
        var nama_kab_kota=$('#u_nama_kab_kota :selected').html()
        var id_kecamatan=$('#u_nama_kecamatan').val()
        var nama_kecamatan=$('#u_nama_kecamatan :selected').html()
        var id_kelurahan=$('#u_nama_kelurahan').val()
        var nama_kelurahan=$('#u_nama_kelurahan :selected').html()
        var alamat=$('#u_alamat').val()
        var rt=$('#u_rt').val()
        var rw=$('#u_rw').val()
        var kodepos=$('#u_kodepos').val()
        var domisilisesuaiktp=$('#u_domisilisesuaiktp').prop("checked");
        if(domisilisesuaiktp==true) domisilisesuaiktp=1; else domisilisesuaiktp=0;
        var id_provinsi_d=$('#u_nama_provinsi_domisili').val()
        var provinsi_d=$('#u_nama_provinsi_domisili :selected').html()
        var id_kab_kota_d=$('#u_nama_kab_kota_domisili').val()
        var nama_kab_kota_d=$('#u_nama_kab_kota_domisili :selected').html()
        var id_kecamatan_d=$('#u_nama_kecamatan_domisili').val()
        var nama_kecamatan_d=$('#u_nama_kecamatan_domisili :selected').html()
        var id_kelurahan_d=$('#u_nama_kelurahan_domisili').val()
        var nama_kelurahan_d=$('#u_nama_kelurahan_domisili :selected').html()
        var alamat_d=$('#u_alamat_domisili').val()
        var rt_d=$('#u_rt_domisili').val()
        var rw_d=$('#u_rw_domisili').val()
        var kodepos_d=$('#u_kodepos_domisili').val()
        var id_negara=360
        var nama_negara='Indonesia';
        if(kewarganegaraan=="WNA"){
            id_negara=$('#u_nama_negara').val();
            nama_negara=$('#u_nama_negara :selected').html();
        }else{
            if(domisilisesuaiktp==1){
                id_provinsi_d=id_provinsi
                provinsi_d=provinsi
                id_kab_kota_d=id_kab_kota
                nama_kab_kota_d=nama_kab_kota
                id_kecamatan_d=id_kecamatan
                nama_kecamatan_d=nama_kecamatan
                id_kelurahan_d=id_kelurahan
                nama_kelurahan_d=nama_kelurahan
                alamat_d=alamat
                rt_d=rt
                rw_d=rw
                kodepos_d=kodepos
            }
        }
        var id_pekerjaan=$('#u_pekerjaan').val();
        if(id_pekerjaan==5) var nama_pekerjaan=$('#u_pekerjaanlain').val();
        else var nama_pekerjaan=$('#u_pekerjaan :selected').html();
		if(id_pekerjaan=="") var nama_pekerjaan='';
        var jns_kelamin=$("#u_jns_kelamin").val();
        var hambatan_bahasa=$('#u_keterbatasanbahasa').prop('checked');
        if(hambatan_bahasa==true) hambatan_bahasa=1; else hambatan_bahasa=0;
        var formdata = {
            idx: $('#u_idx').val(),
            nomr: $('#u_nomr').val(),
            tgldaftar: $('#u_tgldaftar').val(),
            nik: $('#u_nik').val(),
            nobpjs: $('#u_no_bpjs').val(),
            id_jenis_peserta: $('#u_id_jenis_peserta').val(),
            jenis_peserta: $('#u_jenis_peserta').val(),
            kodeppk: $('#u_kodeppk').val(),
            namappk: $('#u_namappk').val(),
            nama: $('#u_nama').val(),
            tempat_lahir: $('#u_tempat_lahir').val(),
            tgl_lahir: $('#u_tgl_lahir').val(),
            jns_kelamin: jns_kelamin,
            id_tk_pddkn: $('#u_pendidikan').val(),
            pendidikan: $('#u_pendidikan :selected').html(),
            id_pekerjaan: $('#u_pekerjaan').val(),
            pekerjaan: nama_pekerjaan,
            id_agama: $('#u_agama').val(),
            agama: $('#u_agama :selected').html(),
            id_status_kawin: $('#u_status_kawin').val(),
            status_kawin: $('#u_status_kawin :selected').html(),
            id_etnis: $('#u_suku').val(),
            suku: $('#u_suku :selected').html(),
            id_bahasa: $('#u_bahasa').val(),
            bahasa: $('#u_bahasa :selected').html(),
            hambatan_bahasa: hambatan_bahasa,
            no_telpon: $('#u_no_telpon').val(),
            no_hp: $('#u_no_hp').val(),
            nama_ibu_kandung: $('#u_nama_ibu_kandung').val(),
            kewarganegaraan: kewarganegaraan,
            id_provinsi: id_provinsi,
            nama_provinsi: provinsi,
            id_negara: id_negara,
            nama_negara: nama_negara,
            id_kab_kota: id_kab_kota,
            nama_kab_kota: nama_kab_kota,
            id_kecamatan: id_kecamatan,
            nama_kecamatan: nama_kecamatan,
            id_kelurahan: id_kelurahan,
            nama_kelurahan: nama_kelurahan,
            alamat:alamat,
            rt:rt,
            rw:rw,
            kodepos:kodepos,
            id_provinsi_domisili: id_provinsi_d,
            nama_provinsi_domisili: provinsi_d,
            id_kab_kota_domisili: id_kab_kota_d,
            nama_kab_kota_domisili: nama_kab_kota_d,
            id_kecamatan_domisili: id_kecamatan_d,
            nama_kecamatan_domisili: nama_kecamatan_d,
            id_kelurahan_domisili: id_kelurahan_d,
            nama_kelurahan_domisili: nama_kelurahan_d,
            alamat_domisili:alamat_d,
            rt_domisili:rt_d,
            rw_domisili:rw_d,
            kodepos_domisili:kodepos_d,
            penanggung_jawab:$('#u_penanggung_jawab').val(),
            umur_pj:$('#u_umur_pj').val(),
            pekerjaan_pj:$('#u_pekerjaan_pj').val(),
            alamat_pj:$('#u_alamat_pj').val(),
            no_penanggung_jawab:$('#u_no_penanggung_jawab').val(),
            hub_keluarga:$('#u_hub_keluarga').val()
        }
        // console.clear();
        // console.log(formdata);
        // return false;
        // if (formdata['nik'] == "") {
        //     tampilkanPesan('warning','Ops. NIK tidak boleh kosong.');
        //     $('#u_nik').focus()
        // } else if (formdata['nama'] == "") {
        //     tampilkanPesan('warning','Ops. Nama pasien tidak boleh kosong.');
        //     $('#u_nama').focus()
        // }else if (formdata['tempat_lahir'] == "") {
        //     tampilkanPesan('warning','Ops. Tempat Lahir tidak boleh kosong.');
        //     $('#u_tempat_lahir').focus()
        // } else if (formdata['tgl_lahir'] == "") {
        //     tampilkanPesan('warning','Ops. Tgl Lahir tidak boleh kosong.');
        //     $('#u_tgl_lahir').focus()
        // } else if (formdata['jns_kelamin'] == "") {
        //     tampilkanPesan('warning','Ops. Jenis Kelamin harus di pilih.');
        //     $('#u_laki').focus()
        // } 
		// else if (formdata['pekerjaan'] == "") {
        //     tampilkanPesan('warning','Ops. Pekerjaan harus di pilih.');
        //     $('#u_pekerjaan').focus()
        // } else if (formdata['agama'] == "") {
        //     tampilkanPesan('warning','Ops. Agama  harus di pilih.');
        //     $('#u_agama').focus()
        // }else if (formdata['suku'] == "") {
        //     tampilkanPesan('warning','Ops. Suku  harus di pilih.');
        //     $('#u_suku').focus()
        // } else if (formdata['bahasa'] == "") {
        //     tampilkanPesan('warning','Ops. Bahasa  harus di pilih.');
        //     $('#u_bahasa').focus()
        // } else if (formdata['notelp'] == "") {
        //     tampilkanPesan('warning','Ops. notelp tidak boleh kosong.');
        //     $('#u_notelp').focus()
        // } else if (formdata['nama_provinsi'] == "") {
        //     tampilkanPesan('warning','Ops. Provinsi  harus di pilih.');
        //     $('#u_nama_provinsi').focus()
        // } else if (formdata['kab_kota'] == "") {
        //     tampilkanPesan('warning','Ops. Kab/Kota harus di pilih.');
        //     $('#u_kab_kota').focus()
        // } else if (formdata['kecamatan'] == "") {
        //     tampilkanPesan('warning','Ops. kecamatan harus di pilih.');
        //     $('#u_kecamatan').focus()
        // } else if (formdata['kelurahan'] == "") {
        //     tampilkanPesan('warning','Ops. Kelurahan/Desa/Nagari harus di pilih.');
        //     $('#u_kelurahan').focus()
        // } else if (formdata['alamat'] == "") {
        //     tampilkanPesan('warning','Ops. alamat tidak boleh kosong.');
        //     $('#u_alamat').focus()
        // } else if (formdata['nama_keluarga'] == "") {
        //     tampilkanPesan('warning','Ops. Nama Keluarga tidak boleh kosong.');
        //     $('#u_nama_keluarga').focus()
        // } else if (formdata['notelp_keluarga'] == "") {
        //     tampilkanPesan('warning','Ops. Notelp keluarga tidak boleh kosong.');
        //     $('#u_notelp_keluarga').focus()
        // } else if (formdata['hub_keluarga'] == "") {
        //     tampilkanPesan('warning','Ops. hubungan keluarga tidak boleh kosong.');
        //     $('#u_hub_keluarga').focus()
        // } 
		// else {
            $.ajax({
                url         : base_url+'/rekammedis/pasien/daftar_pasien_baru',
                type: "POST",
                data: formdata,
                dataType: "JSON",
                beforeSend  : function(){
                    $('#daftarbaru').prop("disabled",true);
                    $('#u_icondaftarbaru').removeClass('fa-arrow-right')
                    $('#u_icondaftarbaru').addClass('fa-spinner fa-spin')
                },
                success     : function(data){
                    // if(data.status==true){
                    //     tampilkanPesan('success',data.message)
                    //     window.location.href = base_url+'rekammedis/pasien/detail/'+data.nomr;
                    // }else{
                    //     tampilkanPesan('warning',data.message);
                    // }

                    if (data.code == 200 || data.code==201) {
						tampilkanPesan('success',data.message)
						var kodebooking=$('#kodebooking').val();
                        window.location.href = base_url+'rekammedis/pasien/registrasi/'+data.nomr+"?kodebooking="+kodebooking;
					}else if(data.code==203){
						$('#err_nama').html(data.error.nama);
						if(data.error.tempat_lahir=="") $('#err_ttl').html(data.error.tgl_lahir);
						else $('#err_ttl').html(data.error.tempat_lahir);
						
						$('#err_no_hp').html(data.error.no_hp);
						$('#err_nama_ibu_kandung').html(data.error.nama_ibu_kandung);
						$('#err_kewarganegaraan').html(data.error.kewarganegaraan);
						$('#err_nama_negara').html(data.error.nama_negara);
						$('#err_nama_provinsi').html(data.error.nama_provinsi);
						$('#err_nama_kab_kota').html(data.error.nama_kab_kota);
						$('#err_nama_kecamatan').html(data.error.nama_kecamatan);
						$('#err_nama_kelurahan').html(data.error.nama_kelurahan);
						$('#err_alamat').html(data.error.alamat);
						$('#err_rt').html(data.error.rt);
						$('#err_rw').html(data.error.rw);
						$('#err_kodepos').html(data.error.kodepos);

						$('#err_nama_provinsi_domisili').html(data.error.nama_provinsi_domisili);
						$('#err_nama_kab_kota_domisili').html(data.error.nama_kab_kota_domisili);
						$('#err_nama_kecamatan_domisili').html(data.error.nama_kecamatan_domisili);
						$('#err_nama_kelurahan_domisili').html(data.error.nama_kelurahan_domisili);
						$('#err_alamat_domisili').html(data.error.alamat_domisili);
						$('#err_rt_domisili').html(data.error.rt_domisili);
						$('#err_rw_domisili').html(data.error.rw_domisili);
						$('#err_kodepos_domisili').html(data.error.kodepos_domisili);
						$('#err_penanggung_jawab').html(data.error.penanggung_jawab);
						$('#err_umur_pj').html(data.error.umur_pj);
						$('#err_pekerjaan_pj').html(data.error.pekerjaan_pj);
						$('#err_alamat_pj').html(data.error.alamat_pj);
						$('#err_no_penanggung_jawab').html(data.error.no_penanggung_jawab);
						$('#err_hub_keluarga').html(data.error.hub_keluarga);

					}else{
                        tampilkanPesan('error',data.message)
                    }
                },
                error: function(xhr) { // if error occured
                    $('#error').modal('show');
			        $('#xhr').html(xhr.responseText)
                    $('#daftarbaru').prop("disabled",false);
                    $('#u_icondaftarbaru').removeClass('fa fa-spinner fa-spin')
                    $('#u_icondaftarbaru').addClass('fa-arrow-right')
                },
                complete: function() {
                    $('#daftarbaru').prop("disabled",false);
                    $('#u_icondaftarbaru').removeClass('fa fa-spinner fa-spin')
                    $('#u_icondaftarbaru').addClass('fa-arrow-right')
                },
            });
        // }
    });
});

function getCaraBayar(id_cara_bayar) {
    var url = base_url + "rekammedis/pasien/carabayar/" + id_cara_bayar;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data["status"] == true) {
                $('#jkn').val(data.data[0].jkn);
                if (data.data[0].jkn == 1) {
                    $('.jkn').show();
                    var nobpjs=$('#nobpjs').val();
                    // alert(nobpjs)
                    if(nobpjs!=""){
                        // alert("cek PEserta")
                        var jns_layanan=$('#jns_layanan').val();
                        if(jns_layanan==3) cekPeserta();
                    }
                    // getRujukan();
                } else {
                    $('.jkn').hide();
                }
            } else {
                $('#jkn').val(0);
                tampilkanPesan('warning',data["message"]);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getRujukan() {
    // var layanan = $('input[name="jns_layanan"]:checked').val();
    // var jkn = $('#jkn').val();
    var url = base_url + "rekammedis/pasien/rujukan";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data["status"] == true) {
                var rujukan = data.data;
                var jmlData = rujukan.length;
                var option = "<option value=''>Pilih Rujukan</option>"
                for (var i = 0; i < jmlData;i++){
                    option+="<option value='"+rujukan[i].idx+"'>"+rujukan[i].rujukan+"</option>"
                }
                $('#id_rujuk').html(option);
            } else {
                $('#jkn').val(0);
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
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
function pilihRujukan() {
    
    var id_rujuk=$('#id_rujuk').val();
    var url = base_url + "rekammedis/pasien/pilihrujukan/" + id_rujuk;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data.status == true) {
                // $('#faskes').val(data.data.id_faskes)
                // var jkn = $('#jkn').val();
                
                var jns_layanan=$('#jns_layanan').val();
                // alert(jns_layanan);
                if(jns_layanan<3) {
                    $('#asalRujukan').val(data.data.id_faskes);
                    if(data.data.id_faskes>2){
                        $('.divkontrol').show();
                        // alert("kontrol Ulang")
                    }
                }
                else {
                    $('#asalRujukan').val(1);
                    
                    // $('#divkontrol').show();
                }
                // if(jkn==1 && data.data.id_faskes==3){
                //     var jkn = $('#jkn').val();
                //     /**
                //      * <div class="input-group">
                //      * <input type="hidden" name="faskes" id="faskes" value="1">
                //      * <input type="text" name="jenis_faskes" id="jenis_faskes" class="form-control" value="Faskes Tingkat 1" readonly="">
                //      * <span class="input-group-addon"><input type="checkbox" value="1" name="jarkomdat" id="jarkomdat" onclick="cekJarkodat()" checked="">Jarkomdat</span>
                //      * </div>
                //      */
                //     $('.adarujukan').hide();
                //     $('.kontrolulang').show();
                //     var tingkat="";
                //     // var tingkat="<div class=\"form-group\">"+
                //     // "<label class=\"col-md-4 col-sm-4 col-xs-12 control-label\">Tingkat Faskes</label>"+
                //     // "<div class=\"col-md-8 col-sm-8 col-xs-12\"><div class=\"input-group\">"+
                //     // "<select class='form-control' name='faskes' id='faskes'>"+
                //     // "<option value='1'>Faskes 1 (FKTP)</option>"+
                //     // "<option value='2'>Faskes 2 (FKRTL)</option></select>"+
                //     // '<span class="input-group-addon"><input type="checkbox" value="1" name="jarkomdat" id="jarkomdat" onclick="cekJarkodat()" checked="">Jarkomdat</span>'+
                //     // "</div></div></div>";
                // }else{
                //     // alert("ID FASKES "+data.data.id_faskes +" JKN "+jkn)
                //     if(jkn==1 && data.data.id_faskes>0) {
                //         // alert(data.data.id_faskes)
                //         $('.adarujukan').show();
                //         $('.kontrolulang').hide();
                //         var tingkat="<div class=\"form-group\">"+
                //         "<label class=\"col-md-4 col-sm-4 col-xs-12 control-label\">Tingkat Faskes</label>"+
                //         "<div class=\"col-md-8 col-sm-8 col-xs-12\"><div class=\"input-group\">"+
                //         "<input type=\"hidden\" id=\"faskes\" name=\"faskes\" value=\""+data.data.id_faskes+"\">"+
                //         "<input type='text' name='tf' class='form-control' id='tf' value='"+data.data.faskes+"' readonly />"+
                //         '<span class="input-group-addon"><input type="checkbox" value="1" name="jarkomdat" id="jarkomdat" onclick="cekJarkodat()" checked="">Jarkomdat</span>'+
                //         "</div></div></div>";
                //     }
                //     else {
                        
                //         $('.adarujukan').hide();
                //         var tingkat="<input type=\"hidden\" id=\"faskes\" name=\"faskes\" value=\""+data.data.id_faskes+"\">";
                //     }
                // }
                var tingkat='<input type="hidden" name="faskes" id="faskes" value="'+data.data.id_faskes+'">'
                $('#tingkatfaskes').html(tingkat);
            } else {
                // $('#jkn').val(0);
                $('#tingkatfaskes').html("");
                alert(data["message"]);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function getDokter(idpoli=""){
    if(idpoli=="") idpoli=$('#id_ruang').val();
    // alert(idpoli)
    var jns_layanan=$('#jns_layanan').val();

    var url=base_url+"rekammedis/pasien/dokter/"+idpoli+"/"+jns_layanan ;
    // alert(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data["status"] == true) {
                var rujukan = data.data;
                var jmlData = rujukan.length;
                // if(jmlData==1){
                //     var option="<input type='hidden' id='dokterJaga' name='dokterJaga' value='"+rujukan[0].nrp+"'>"+
                //     "<input type='text' id='namadokterJaga' name='namadokterJaga' class='' value='"+rujukan[0].pgwNama+"'>";
                // }
                var option = "<option value=''>Pilih Dokter</option>"
                for (var i = 0; i < jmlData;i++){
                    option+="<option value='"+rujukan[i].nrp+"'>"+rujukan[i].pgwNama+"</option>"
                }
                $('#dokterJaga').html(option);

                var poli=data.poliklinik;
                console.log(poli);
                // alert(poli.length)
                if(poli!=null){
                    var jns_layanan=$('#jns_layanan').val();
                    if(jns_layanan==2){
                        // JIka Jenis Layanan Rawat Jalan
                        $('#tujuan').val(poli.kode_jkn);
                        $('#kodepoli').val(poli.	kode_jkn);
                        $('#txtnmpoli').val(poli.ruang);
                        $('#namapoli').val(poli.ruang);
                        
                        var tujuanRujukan=$('#tujuanRujukan').val();
                        $('#divRujukan').show();
                        if(tujuanRujukan==""){
                            // Jika Pasien Tidak ada rujukan
                            var asalRujukan=$('#asalRujukan').val();
                            if(asalRujukan=="") $('#divkontrol').show();
                        }else{
                            if(tujuanRujukan!=poli.kode_jkn){
                                // Jika Rujukan Internal
                                // alert('rujukan internal')
                                var jmlsep=$('#jmlsep').val();
                                if(jmlsep==0){
                                    tampilkanPesan('warning',"Kunjungan Pertama Pasien tidak boleh beda dengan rujukan")
                                    $('#txtnmpoli').prop('readonly',false);
                                    $('#divkontrol').hide();
                                    // $('#id_ruang').val("").trigger('change')
                                }else{
                                    $('#txtnmpoli').prop('readonly',false);
                                    $('#divkontrol').hide();
                                }
                                
                            }else{
                                var jmlsep=$('#jmlsep').val();
                                if(jmlsep==0){
                                    // jika Pasien Rujukan Baru
                                    $('#divkontrol').hide();
                                    $('#txtnmpoli').prop('readonly',true);
                                    // alert('kunjungan Pertama')
                                }else{  
                                    // Jika Pasien Kontrol Ulang
                                    // alert('kontrol ulang')
                                    $('#txtnmpoli').prop('readonly',false);
                                    $('#divkontrol').show();
                                }
                            }
                        }
                        
                        getdpjp();
                    }
                    
                }else{
                    tampilkanPesan('warning','Tidak ada poliklinik yang buka hari ini');
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function getJadwal(idpoli=""){
    if(idpoli=="") idpoli=$('#id_ruang').val();
    // alert(idpoli)
    var jns_layanan=$('#jns_layanan').val();
	if(jns_layanan==2){
		var dokterJaga=$('#dokterJaga').val();

		var url=base_url+"rekammedis/pasien/jadwal/"+idpoli+"/"+dokterJaga ;
		// alert(url);
		$.ajax({
			url: url,
			type: "GET",
			dataType: "JSON",
			success: function (data) {
				if (data["status"] == true) {
					$('#kodedokter').val(data.jadwal.dokterjkn)
					$('#dokternama').val(data.jadwal.jadwal_dokter_nama)
					$('#jampraktek').val(data.jadwal.jadwal_jam_mulai+"-"+data.jadwal.jadwal_jam_selesai)
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	}
    
}
function cariPasien(nomr=""){
    if(nomr=="") nomr=$('#u_nomr').val();
    else $('#u_nomr').val(nomr)
    var url=base_url+"rekammedis/pasien/caripasien/"+nomr;
    // alert(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (data["status"] == true) {
                // alert("OK")
                if(data.terdaftar==1){
                    var url=base_url+"rekammedis/pasien/registrasi/"+nomr;
                    location.href=url;
                }else{
                    var prov=data.data.state;
                    var exp=prov.split("_",2);
                    var dob=data.data.date_of_birth;
                    var dex = dob.split(" ");
                    var dex1=dex[0];
                    var dex2=dex1.split("-");
                    var tgl=dex2[2]+"/"+dex2[1]+"/"+dex2[0]
                    var jekel=data.data.gender=="M"?"1":"2";
                    $('#u_nama').val(data.data.title+" "+data.data.first_name+" "+ data.data.last_name)
                    $('#u_alamat').val(data.data.address)
                    $('#u_nama_provinsi').val(exp[1]).trigger('change')
                    $('#u_nama_provinsi_domisili').val(exp[1]).trigger('change')
                    $('#u_tempat_lahir').val(data.data.place_of_birth)
                    $('#u_tgl_lahir').val(tgl)
                    $('#u_jns_kelamin').val(jekel);
                    $('#u_tgldaftar').val(data.data.created_date);
                    $('#u_kodepos').val(data.data.post_code);
                    $('#u_nama_kab_kota').val(data.data.city);
                    $('#u_no_telpon').val(data.data.home_phone);
                    $('#u_no_hp').val(data.data.mobile_phone);
                    $('#u_agama').val(data.data.religion);
                    $('#u_status_kawin').val(data.data.marital);
                    $('#u_pekerjaan').val(data.data.occupation);
                    $('#u_pendidikan').val(data.data.education);
                    $('#u_rt').val(data.data.rt);
                    $('#u_rw').val(data.data.rw);
                    tampilkanPesan("warning","Pasien sudah terdaftar tapi data belum lengkap silahkan lengkapi data terlebih daulu");
                    $('#biodatapasien').show();
                }
            }else{
                tampilkanPesan("error","Nomor MR Pasien tidak ditemukan, silahkan daftarkan pasien sebagai pasien baru");
                $('#u_nomr').val("");
                $('#biodatapasien').show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function pasienBaru(){
    $('#biodatapasien').show();
    $('#u_nomr').prop("readonly",true);
}
//Cek Peserta BPJS
function cekPeserta(){
	var nobpjs=$("#nobpjs").val();
	var tgllayanan=$('#sekarang').val();
	var url= base_url+"vclaim/peserta/nokartu/"+nobpjs+"/"+tgllayanan;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {get_param : 'value'},
        beforeSend: function() {
            // setting a timeout
            $('#cekStatus').prop("disabled",true);
            $('#iconcekStatus').removeClass('fa fa-search')
            $('#iconcekStatus').addClass('fa fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
	    success : function(data){
			console.log(data);
			if(data.metaData.code==200){
				var x=data["response"];
				console.log(x);
                // alert(x.peserta.mr.noMR)
                
                var jns_layanan=$('#jns_layanan').val();
                $('#jnsPelayanan').val(jns_layanan)
				$('#status_peserta').val(x.peserta.statusPeserta.keterangan);
				$('#id_jenis_peserta').val("2."+x.peserta.jenisPeserta.kode);
				$('#jenis_peserta').val(x.peserta.jenisPeserta.keterangan);
				$('#id_pengirim').val(x.peserta.provUmum.kdProvider);
				$('#pjPasienDikirimOleh').val(x.peserta.provUmum.nmProvider);
                // Untuk Diform SEP
                if(jns_layanan!=1){
                    // jika bukan rawat inap
                    $('#ppkRujukan').val(x.peserta.provUmum.kdProvider);
				    $('#txtppkasalrujukan').val(x.peserta.provUmum.nmProvider);
                    $("#jnsPelayanan").val("2"); // jenis layanan rawat jalan
                    $("#asalRujukan").val("1"); //Asal rujukan faskes 1
                    $("#tglRujukan").val("");
                    $("#noRujukan").val("");
                    var tujuan=$('#tujuan').val();
                    // alert(jns_layanan)
                    if(tujuan!="") getdpjp();
                }else{
                    $("#jnsPelayanan").val("1"); // Jenis Pelayanan R. Inap
                    $("#asalRujukan").val("2");
                    getdpjp();
                    // alert(2)
                }
                
				if(x.peserta.statusPeserta.keterangan!="AKTIF"){
					var nomr=$('#nomr').val();
					if(nomr==""){
						var status = '<button id="cekStatus" href="Javascript:cekPeserta()" class="btn btn-primary"><i class="fa fa-remove" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</button>';
					}else{
						var status = '<a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-remove" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</a>';
					}
					
					tampilkanPesan('warning',"Status Peserta Dengan Atas Nama : " + x.peserta.nama + " dengan noKartu : " + x.peserta.noKartu +" " + x.peserta.statusPeserta.keterangan +" Silahkan lakukan pengurusan terlebih dahulu ke kantor BPJS");
				}else{
					var nomr=$('#nomr').val();
					if(nomr==""){
						var status = '<button id="cekStatus" href="Javascript:cekPeserta()" class="btn btn-primary"><i class="fa fa-check" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</button>';
					}else{
						var status = '<a id="cekStatus" href="Javascript:cekPeserta()" ><i class="fa fa-check" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</a>';
					}
					var jns_layanan=$('#jns_layanan').val();
                    var nama = $('#nama_pasien').val();
					if(jns_layanan=='1') {
						// jika jenis layanan Rawat Inap
						$('#hakKelasid').val(x.peserta.hakKelas.kode);
						$('#hakKelas').val(x.peserta.hakKelas.keterangan);
					}
					var nik = $('#nik').val();
					console.clear();
					console.log(data);
					var nomr=$('#nomr').val();
					if(nama!=x.peserta.nama || nik!=x.peserta.nik){
                        tampilkanPesan('warning','Terjadi ketidaksamaan data peserta BPJS dengan Data Pasien di SIMRS untuk peserta dengan \n\nNoPeserta : ' +x.peserta.noKartu +"\nNIK : " +x.peserta.nik +"\nNama Peserta : " +x.peserta.nama );
                    }
					
				}
				
				$('#status').html(status);
				// 
				// Untuk keperluan SEP
				var cobass=x["peserta"]["cob"]["nmAsuransi"];
				if(cobass==null || cobass=="") $('#cob').prop( "checked", false );
				else $('#cob').prop( "checked", true );
				
				$("#noKartu").val(x["peserta"]["noKartu"]);
				
				$("#klsRawatHak").val(x["peserta"]["hakKelas"]["kode"]);
                $("#klsRawatKet").val(x["peserta"]["hakKelas"]["keterangan"]);
				$("#noMR").val(x['peserta']['mr']['noMR']);
				
				$('#noTelp').val(x["peserta"]["mr"]["noTelepon"]);

				$('#noSurat').val('');
                var tglsep=$('#tglSep').val();
                if(tglsep=="") $('#tglSep').val(tgllayanan);

				$('#txtnmdiagnosa').val("");
				$('#diagAwal').val("");

				$('#noTelp').val(x['peserta']['mr']['noTelepon']);

				$('#catatan').val('');
				$('#lakaLantas').prop('selectedIndex',0);

				
			} else {
				tampilkanPesan('warning', data.metaData.message);
			}
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cekStatus').prop("disabled",false);
            $('#iconcekStatus').removeClass('fa fa-spinner spin')
            $('#iconcekStatus').addClass('fa fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cekStatus').prop("disabled",false);
            $('#iconcekStatus').removeClass('fa fa-spinner spin')
            $('#iconcekStatus').addClass('fa fa-search')
        },
	});
}

function naik(){
	// $('#naikKelas').prop("checked", true);
	if ($('#naikKelas').is(':checked')) {
		// alert("naik Kelas")
		var kelasRawat=$('#klsRawat').val();
		kelasRawatNaik=parseInt(kelasRawat)+1;
		// if(kelasRawat==3) var rekomendasi=4;
		// else if(kelasRawat==2) var rekomendasi=3;
		// else var rekomendasi == 2
		var kelasnaik='<div class="form-group">'+
		'<label class="col-md-3 col-sm-3 col-xs-12 control-label">Kelas Layanan</label>'+
		'<div class="col-md-9 col-sm-9 col-xs-12">'+
		'<select class="form-control" id="klsRawatNaik" name="klsRawatNaik" >';
		if(kelasRawatNaik==1) kelasnaik+="<option value='1' selected >VVIP</option>"; else kelasnaik+="<option value='1'>VVIP</option>";
		if(kelasRawatNaik==2) kelasnaik+="<option value='2' selected >VIP</option>"; else kelasnaik+="<option value='2'>VIP</option>";
		if(kelasRawatNaik==3) kelasnaik+="<option value='3' selected >Kelas 1</option>"; else  kelasnaik+="<option value='3'>Kelas 1</option>";
		if(kelasRawatNaik==4) kelasnaik+="<option value='4' selected >Kelas 2</option>"; else kelasnaik+="<option value='4'>Kelas 2</option>";
		if(kelasRawatNaik==5) kelasnaik+="<option value='5' selected >Kelas 3</option>"; else kelasnaik+="<option value='5'>Kelas 3</option>";
		if(kelasRawatNaik==6) kelasnaik+="<option value='6' selected >ICCU</option>"; else kelasnaik+="<option value='6'>ICCU</option>";
		if(kelasRawatNaik==7) kelasnaik+="<option value='7' selected >ICU</option>"; else kelasnaik+="<option value='7'>ICU</option>";
		kelasnaik+="</select>";
		kelasnaik+="</div></div>";
		kelasnaik+='<div class="form-group">'+
		'<label class="col-md-3 col-sm-3 col-xs-12 control-label">Pembiayaan</label>'+
		'<div class="col-md-9 col-sm-9 col-xs-12">'+
		'<select class="form-control" id="pembiayaan" name="pembiayaan" onchange="getPj()">';
		kelasnaik+="<option value='1'>Pribadi</option>";
		kelasnaik+="<option value='2'>Pemberi Kerja</option>";
		kelasnaik+="<option value='3'>Asuransi Kesehatan Tambahan</option>";
		kelasnaik+="</select>"+
		'<input type="hidden" name="penanggungJawab" id="penanggungJawab" value="Pribadi">';
		kelasnaik+="</div></div>";
		$('#divnaikkelas').show();
	}else{
		var kelasnaik='<input type="hidden" name="klsRawatNaik" id="klsRawatNaik" value="">'+
		'<input type="hidden" name="pembiayaan" id="pembiayaan" value="">'+
		'<input type="hidden" name="penanggungJawab" id="penanggungJawab" value="">';
		// alert("Tidak Naik Kelas")
		$('#divnaikkelas').hide();
	}
	$('#divnaikkelas').html(kelasnaik);
	

}
function cariPeserta(){
    var parameter = $("input[name='parameter']:checked").val();
    var keyword=$("#keyword").val();
    var tgllayanan=$('#sekarang').val();
	var url= base_url+"vclaim/peserta/"+parameter+"/"+keyword+"/"+tgllayanan;
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {},
        beforeSend: function() {
            // setting a timeout
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
	    success : function(data){
            console.clear();
			console.log(data);
            $('#biodatapasien').show();
			if(data.metaData.code==200){
				var x=data["response"];
				console.log(x);
                $('#pesertaJkn').show()
                
                $('#u_nik').val(x.peserta.nik);
                $('#u_nama').val(x.peserta.nama);
                var text=x.peserta.tglLahir;
                const t = text.split("-");
                $('#u_tgl_lahir').val(t[2]+'/'+t[1]+'/'+t[0])
                $('#nobpjs').val(x.peserta.noKartu)
                $('#u_no_bpjs').val(x.peserta.noKartu)
                $('#u_no_telpon').val(x.peserta.mr.noTelepon)
                $('#u_id_jenis_peserta').val(x.peserta.jenisPeserta.kode)
                $('#u_jenis_peserta').val(x.peserta.jenisPeserta.keterangan)
                $('#u_kodeppk').val(x.peserta.provUmum.kdProvider)
                $('#u_namappk').val(x.peserta.provUmum.nmProvider)
                $('.statusjkn').html(x.peserta.statusPeserta.keterangan)
                $('#id_cara_bayar').val(2);
                $('#id_cara_bayar').trigger('change');
                if(x.peserta.sex=='L'){
                    // $('#u_laki').prop('checked',true);
                    var jns_kelamin=1;
                    var jekel="<img class=\"profile-user-img img-responsive img-circle\" src=\""+base_url+"assets/images/male.png\" alt=\"User profile picture\">";
                }else{
                    // $('#u_perempuan').prop('checked',true);
                    var jns_kelamin=2;
                    var jekel="<img class=\"profile-user-img img-responsive img-circle\" src=\""+base_url+"assets/images/female.png\" alt=\"User profile picture\">";
                }
                $('#u_jns_kelamin').val(jns_kelamin);
                $('#jekel').html(jekel);
                $('#namaPeserta').html(x.peserta.nama)
                $('#noKartu').html(x.peserta.noKartu);
				$('#nikPeserta').html(x.peserta.nik)
                $('#nama').html(x.peserta.nama)
                $('#noTelp').html(x.peserta.mr.noTelepon)
                $('#tglLahir').html(x.peserta.tglLahir)
                $('#tglCetak').html(x.peserta.tglCetakKartu)
                $('#tat').html(x.peserta.tglTAT)
                $('#tmt').html(x.peserta.tglTMT)
                $('#statusPeserta').html(x.peserta.statusPeserta.keterangan)
                $('#provUmum').html(x.peserta.provUmum.nmProvider)
                $('#jenisPeserta').html(x.peserta.jenisPeserta.keterangan)
                $('#hakKelas').html(x.peserta.hakKelas.keterangan)
                $('#umur').html(x.peserta.umur.umurSekarang)
                $('#nosktm').html(x.peserta.informasi.noSKTM)
                $('#dinsos').html(x.peserta.informasi.dinsos)
                $('#prolanisprb').html(x.peserta.informasi.prolanisPRB)
                $('#noasuransi').html(x.peserta.cob.noasuransi)
                $('#nmasuransi').html(x.peserta.cob.nmasuransi)
                $('#cobtmt').html(x.peserta.tglTMT)
                $('#cobtat').html(x.peserta.tglTAT)
                $('#id_jenis_peserta').val(x.peserta.jenisPeserta.kode)
                $('#jenis_peserta').val(x.peserta.jenisPeserta.keterangan)
				cekBooking(x.peserta.nik);
				if(x.peserta.statusPeserta.keterangan!="AKTIF"){
					// var status = '<a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-remove"></i> '+x.peserta.statusPeserta.keterangan+'</a>';
					tampilkanPesan('warning',"Status Peserta Dengan Atas Nama : " + x.peserta.nama + " dengan noKartu : " + x.peserta.noKartu +" " + x.peserta.statusPeserta.keterangan +" Silahkan lakukan pengurusan terlebih dahulu ke kantor BPJS");
				}else{
					tampilkanPesan('success','Status Peserta Atasa Nama : '+ x.peserta.nama + " " + x.peserta.statusPeserta.keterangan)
				}
                $('#u_tempat_lahir').focus();
                if(x.peserta.mr.noMR!=null){
                    // alert(x.peserta.mr.noMR);
                    cariPasien(x.peserta.mr.noMR);
                }
				//alert("Ok");
			} else {
                $('#pesertaJkn').hide()
				var kodebooking=$('#kodebooking').val();
				if(kodebooking==''){
					$('#u_nik').val('');
                	$('#u_nama').val('');
					$('#nobpjs').val('')
				}
                
                $('#u_tgl_lahir').val('')
                
                $('#u_notelp').val('')
                $('#id_cara_bayar').val('');
                $('#id_cara_bayar').trigger('change');
				tampilkanPesan('warning', data.metaData.message);
                $('#u_nik').focus();
			}
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
	});
}
function cekBooking(nik){
	var url= base_url+"jkn/booking/cekkode/"+nik;
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {},
        beforeSend: function() {
            // setting a timeout
            $('#btnCari').prop("disabled",true);
            $('#iconCari').removeClass('fa-search')
            $('#iconCari').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
	    success : function(data){
			if(data.metadata.code==200){
				var x=data["response"];
				$('#kodebooking').val(x.kodebooking);
				// $('#daftarbaru').prop("disabled",false)
			} else {
                tampilkanPesan("warning",data.metadata.message)
				var pesan=`<div class="row"><div class='col-md-12'>
				<div class="alert alert-warning fade in">
					<a href="#" class="close" data-dismiss="alert">&times;</a>
					<strong>Success!</strong> `+data.metadata.message+`
				</div>
				</div>
				</div>`;
				$('#message').html(pesan)
				// $('#daftarbaru').prop("disabled",true)
			}
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#btnCari').prop("disabled",false);
            $('#iconCari').removeClass('fa-spinner spin')
            $('#iconCari').addClass('fa-search')
        },
	});
}
function getCaraDaftar(){
    var id_cara_daftar=$('#id_cara_daftar').val();
    if(id_cara_daftar==1){
        // Jika cara daftar manual
        var type=$("#jns_layanan").is(":hidden");
        // alert(type);
        if(type==false){
            alert(type)
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
// Wilayah Database Lokal
function getKabupaten(id='u_nama_provinsi',idkab='u_nama_kab_kota'){
	var url= base_url+"rekammedis/pasien/kabupaten";
    // alert(id)
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {provinsi: $("#"+id).val()},
	    success : function(data){
			console.log(data);
            var option="<option value=''>Pilih Kabupaten</option>";
			if(data.status==true){
				var x=data["response"];
				for (var index = 0; index < x.length; index++) {
                    option += "<option value='"+x[index].kode+"'>"+x[index].nama+"</option>";
                }
                $('#'+idkab).html(option);
			} else {
				tampilkanPesan('warning', data.metaData.message);
			}
	    },
		error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
        }
	});
}
function getKecamatan(id='u_nama_kab_kota',idkec='u_nama_kecamatan'){
	var url= base_url+"rekammedis/pasien/kecamatan";
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {kabkota: $("#"+id).val()},
	    success : function(data){
			console.log(data);
            var option="<option value=''>Pilih kecamatan</option>";
			if(data.status==true){
				var x=data["response"];
				for (var index = 0; index < x.length; index++) {
                    option += "<option value='"+x[index].kode+"'>"+x[index].nama+"</option>";
                }
                $('#'+idkec).html(option);
			} else {
				tampilkanPesan('warning', data.metaData.message);
			}
	    }
	});
}
function getKelurahan(id='u_nama_kecamatan',idkel='u_nama_kelurahan'){
	var url= base_url+"rekammedis/pasien/kelurahan";
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {kecamatan: $("#"+id).val()},
	    success : function(data){
			console.log(data);
            var option="<option value=''>Pilih Kelurahan</option>";
			if(data.status==true){
				var x=data["response"];
				for (var index = 0; index < x.length; index++) {
                    option += "<option value='"+x[index].kode+"'>"+x[index].nama+"</option>";
                }
                $('#'+idkel).html(option);
			} else {
				tampilkanPesan('warning', data.metaData.message);
			}
	    }
	});
}

function pilihKWN() {
	var kwn = $('#kewarganegaraan').val();

	if (kwn == "") {
		$('.groupKewarganegaraan').hide();
	} else if (kwn == "WNI") {
		//alert(kwn);
		$('.groupKewarganegaraan').hide();
		$('.groupWNI').show();
	} else {
		//alert(kwn);
		$('.groupKewarganegaraan').hide();
		$('.groupWNA').show();
	}
}

function getListRujukan(){
    
    var faskes=$('#faskes').val();
    var nobpjs=$('#nobpjs').val()
    $.ajax({
        url         : base_url+"vclaim/rujukan/listrujukan/"+faskes+"/"+nobpjs,
        type        : "GET",
        data        : {},
        dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#cariRujukan').prop("disabled",true);
            $('#iconcariRujukan').removeClass('fa-search')
            $('#iconcariRujukan').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success     : function(data){
            
            if(data.metaData.code==200){
                $('#form-list-rujukan').modal('show');
                $('#headRujukan').html("Faskes Tingkat "+faskes);
                var x = data.response.rujukan;
                var res = "";
                var encodedString = "";
                var dataForm = "";
                /** */
                var sekarang=$('#sekarang').val();
                for (var i=0 ; i <= x.length-1; i++) {
                    var noKunjungan = x[i]['noKunjungan'];
                        dataForm = JSON.stringify(x[i]);
                        encodedString = Base64.encode(dataForm);
                        var tk = moment(x[i]['tglKunjungan'],'YYYY-M-D');
                        var sk = moment(sekarang,'YYYY-M-D');
                        var lama = sk.diff(tk, 'days');
                        // alert(diffDays);
                    res += "<tr>";
                    res += "<td>" + (i+1) + "</td>";
                    if(lama > 90) res += "<td><button onclick=setRujukan('"+encodedString+"') type='button' class='btn btnView btn-default btn-xs' disabled>" + x[i]['noKunjungan'] + "</button></td>";
                    else res += "<td><button onclick=setRujukan('"+encodedString+"') type='button' class='btn btnView btn-default btn-xs'>" + x[i]['noKunjungan'] + "</button></td>";
                    res += "<td>" + x[i]['tglKunjungan'] + "</td>";
                    res += "<td>" + x[i]['peserta']['noKartu'] + "</td>";
                    res += "<td>" + x[i]['peserta']['nama'] + "</td>";
                    res += "<td>" + x[i]['provPerujuk']['nama'] + "</td>";
                    res += "<td>" + x[i]['poliRujukan']['nama'] + "</td>";
                    if(lama > 90) res += "<td><span class='btn btn-danger btn-xs'>Expire</span></td>";
                    else res += "<td><span class='btn btn-success btn-xs'>Aktif</span></td>";
                    res += "</tr>";
                }  
                $('tbody#list-data-rujukan').html(res);
            }else{
                tampilkanPesan('warning',data.metaData.message);
                $('tbody#list-data-rujukan').html('<tr class="odd"><td colspan="8" valign="top">No data available in table</td></tr>');
            } 
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cariRujukan').prop("disabled",false);
            $('#iconcariRujukan').removeClass('fa-spinner spin')
            $('#iconcariRujukan').addClass('fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cariRujukan').prop("disabled",false);
            $('#iconcariRujukan').removeClass('fa-spinner spin')
            $('#iconcariRujukan').addClass('fa-search')
        },
    });  
}

function setRujukan(encodedString){
	var jsondata= Base64.decode(encodedString);
	console.clear();
	var x = JSON.parse(jsondata);
	console.log(x);
	$('#txtNorujuk').val(x.noKunjungan);
	$('#id_pengirim').val(x.provPerujuk.kode);
	$('#pjPasienDikirimOleh').val(x.provPerujuk.nama);
	// cekKunjungan(x.noKunjungan);
	// pilihPengirim(x.provPerujuk.kode);
	setTujuanLayanan(x.poliRujukan.kode);
	$('#encryptdata').val(encodedString);
	var id_rujuk=$('#id_rujuk').val();
	if(id_rujuk==6) $('#no_suratkontrol').focus(); 
	else $('#pjPasienDikirimOleh').focus();
	$('#form-list-rujukan').modal('hide');
	// $('#ktglRujukan').val(x.tglKunjungan);
    periksaRujukan()
}
function viewRujukan(norujukan="",faskes=2) {

	// var faskes = $('#faskes').val();
	// if(norujukan=="") norujukan = $('#txtNorujuk').val();
	$.ajax({
		url: base_url + '/vclaim/rujukan/norujuk/' + faskes + '/' + norujukan,
		type: "GET",
		data: {
			get_param: 'value'
		},
		dataType: "JSON",
		beforeSend: function () {
			// $('#cariRujukan').prop("disabled", true);
			// $('#iconcariRujukan').removeClass('fa fa-check')
			// $('#iconcariRujukan').addClass('fa fa-spinner fa-spin')
		},
		success: function (data) {
			// $('#loading').hide();
			// $('#formlistrujukan').show();
			if (data.metaData.code == 200) {
				var x = data.response.rujukan;
				// console.clear();
				console.log(data);
				$('#txtNorujuk').val(data.response.rujukan.noKunjungan);
				// $('#cbasalrujukan').val(data.response.asalFaskes);
				// $('#asalRujukan').val(data.response.asalFaskes).trigger('change');
				$('#asalRujukan').val(faskes).trigger('change');
				// trigger('change')
				$('#noRujukan').val(data.response.rujukan.noKunjungan);
				$('#diagAwal').val(data.response.rujukan.diagnosa.kode);
				$('#txtnmdiagnosa').val(data.response.rujukan.diagnosa.nama);
				$('#tujuan').val(data.response.rujukan.poliRujukan.kode);
				$('#tujuanRujukan').val(data.response.rujukan.poliRujukan.kode);
				$('#txtnmpoli').val(data.response.rujukan.poliRujukan.nama);
				// $('#cbasalrujukan').val(data.response.asalFaskes);
				// $('#asalRujukan').val(data.response.asalFaskes);
				$('#tglRujukan').val(data.response.rujukan.tglKunjungan);
				$('#ppkRujukan').val(data.response.rujukan.provPerujuk.kode)
				$('#txtkdppkasalrujukan').val(x.provPerujuk.kode);
				$('#txtppkasalrujukan').val(x.provPerujuk.nama);
				if(data.response.rujukan.poliRujukan.kode=="MAT"){
					$('#divkatarak').show();
				}else{
					$('#divkatarak').hide();
				}
				$('#jnsPelayanan').val(data.response.rujukan.pelayanan.kode);
                // data Peserta
                var jns_layanan=$('#jns_layanan').val();
				$('#status_peserta').val(x.peserta.statusPeserta.keterangan);
				$('#id_jenis_peserta').val("2."+x.peserta.jenisPeserta.kode);
				$('#jenis_peserta').val(x.peserta.jenisPeserta.keterangan);
				$('#id_pengirim').val(x.peserta.provUmum.kdProvider);
				$('#pjPasienDikirimOleh').val(x.peserta.provUmum.nmProvider);
                // Untuk Diform SEP
                
				if(x.peserta.statusPeserta.keterangan!="AKTIF"){
					var nomr=$('#nomr').val();
					if(nomr==""){
						var status = '<button id="cekStatus" href="Javascript:cekPeserta()" class="btn btn-primary"><i class="fa fa-remove" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</button>';
					}else{
						var status = '<a id="cekStatus" href="Javascript:cekPeserta()"><i class="fa fa-remove" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</a>';
					}
					
					tampilkanPesan('warning',"Status Peserta Dengan Atas Nama : " + x.peserta.nama + " dengan noKartu : " + x.peserta.noKartu +" " + x.peserta.statusPeserta.keterangan +" Silahkan lakukan pengurusan terlebih dahulu ke kantor BPJS");
				}else{
					var nomr=$('#nomr').val();
					if(nomr==""){
						var status = '<button id="cekStatus" href="Javascript:cekPeserta()" class="btn btn-primary"><i class="fa fa-check" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</button>';
					}else{
						var status = '<a id="cekStatus" href="Javascript:cekPeserta()" ><i class="fa fa-check" id="iconcekStatus"></i> '+x.peserta.statusPeserta.keterangan+'</a>';
					}
					var jns_layanan=$('#jns_layanan').val();
                    var nama = $('#nama_pasien').val();
					if(jns_layanan=='1') {
						// jika jenis layanan Rawat Inap
						$('#hakKelasid').val(x.peserta.hakKelas.kode);
						$('#hakKelas').val(x.peserta.hakKelas.keterangan);
					}
					var nik = $('#nik').val();
					console.clear();
					console.log(data);
					var nomr=$('#nomr').val();
					if(nama!=x.peserta.nama || nik!=x.peserta.nik){
                        tampilkanPesan('warning','Terjadi ketidaksamaan data peserta BPJS dengan Data Pasien di SIMRS untuk peserta dengan \n\nNoPeserta : ' +x.peserta.noKartu +"\nNIK : " +x.peserta.nik +"\nNama Peserta : " +x.peserta.nama );
                    }
					
				}
				
				$('#status').html(status);
				// 
				// Untuk keperluan SEP
				var cobass=x["peserta"]["cob"]["nmAsuransi"];
				if(cobass==null || cobass=="") $('#cob').prop( "checked", false );
				else $('#cob').prop( "checked", true );
				
				$("#noKartu").val(x["peserta"]["noKartu"]);
				
				$("#klsRawatHak").val(x["peserta"]["hakKelas"]["kode"]);
                $("#klsRawatKet").val(x["peserta"]["hakKelas"]["keterangan"]);
				$("#noMR").val(x['peserta']['mr']['noMR']);
				
				// $('#noTelp').val(x["peserta"]["mr"]["noTelepon"]);
				getdpjp();
                setTujuanLayanan(data.response.rujukan.poliRujukan.kode)
			} else {
				tampilkanPesan('warning', data.metaData.message);
			}

		},
		error: function (xhr) { // if error occured
			console.log(xhr.responseText);
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
			$('#cariRujukan').prop("disabled", false);
			$('#iconcariRujukan').removeClass('fa fa-spinner fa-spin')
			$('#iconcariRujukan').addClass('fa fa-check')
		},
		complete: function () {
			$('#cariRujukan').prop("disabled", false);
			$('#iconcariRujukan').removeClass('fa fa-spinner fa-spin')
			$('#iconcariRujukan').addClass('fa fa-check')
		},
	});
}
// function periksaRujukan(norujukan="",faskes=""){
// 	if(norujukan=="") norujukan=$('#txtNorujuk').val();
// 	if(faskes=="") faskes=$('#faskes').val();
// 	var jns_layanan=$('#jns_layanan').val();
// 	if(jns_layanan==1){
// 		$('#noRujukan').val(norujukan);
// 	}else{
// 		$.ajax({
// 			url         : base_url+'/vclaim/rujukan/jmlsep/'+norujukan+'/'+faskes,
// 			type        : "GET",
// 			data        : {},
// 			dataType    : "JSON",
// 			beforeSend  : function(){
// 				$('#btnNoKunjungan'+norujukan).prop('disabled',true);
// 				$('#btnNoKunjungan'+norujukan).html("<i class='fa fa-refresh fa-spin' style='font-size:12pt'></i> Loading");
				
// 			},
// 			success     : function(data){
// 				// $('#loading').hide();
// 				// alert(data.metaData.message);
				
// 				$('#btnNoKunjungan'+norujukan).prop('disabled',false);
// 				$('#btnNoKunjungan'+norujukan).html(norujukan);  
				
// 				$('#jmlsep').val(data.response.jumlahSEP);
// 				viewRujukan(norujukan,faskes)
// 				if(data.metaData.code==200){
// 					if(data.response.jumlahSEP>0){
// 						$('#txtnmpoli').prop('readonly',false);
// 						$('#divkontrol').show();
// 					}else{
// 						$('#txtnmpoli').prop('readonly',true);
// 						$('#divkontrol').hide();
// 					}
// 					// cariRujukan(norujukan);
// 				}else{
// 					alert(data.metaData.message);
// 				} 
	
// 			},
// 			error       : function(jqXHR,ajaxOption,errorThrown){
// 				// $('#btnCariRujukanPasien').prop("disabled", false); // Element(s) are now enabled.
// 				// $('#btnCariRujukanPasien').html("Cari");
// 				console.log(jqXHR.responseText);               
// 				$('#btnNoKunjungan'+norujukan).prop('disabled',false);
// 				$('#btnNoKunjungan'+norujukan).html(norujukan);     
// 			}
// 		}); 
// 	}
	
	   
// }

function periksaRujukan(norujukan="",faskes="",jns_layanan=""){
	if(norujukan=="") norujukan=$('#txtNorujuk').val();
	if(faskes=="") faskes=$('#faskes').val();
	if(jns_layanan=="") jns_layanan=$('#jns_layanan').val();
    else $('#jns_layanan').val(jns_layanan).trigger('change')
	if(jns_layanan==1){
		$('#noRujukan').val(norujukan);
	}else{
		$.ajax({
			url         : base_url+'vclaim/rujukan/jmlsep/'+norujukan+'/'+faskes,
			type        : "GET",
			data        : {},
			dataType    : "JSON",
			beforeSend  : function(){
				$('#btnNoKunjungan'+norujukan).prop('disabled',true);
				$('#btnNoKunjungan'+norujukan).html("<i class='fa fa-refresh fa-spin' style='font-size:12pt'></i> Loading");
				
			},
			success     : function(data){
				// $('#loading').hide();
				// alert(data.metaData.message);
				
				$('#btnNoKunjungan'+norujukan).prop('disabled',false);
				$('#btnNoKunjungan'+norujukan).html(norujukan);  
				if(data.metaData.code==200){
                    
					if(data.response.jumlahSEP>0){
						$('#txtnmpoli').prop('readonly',false);
						$('#divkontrol').show();
					}else{
						$('#txtnmpoli').prop('readonly',true);
						$('#divkontrol').hide();
					}
                    $('#jmlsep').val(data.response.jumlahSEP);
                    

                    // $('#jns_layanan').val(jnsLayanan).trigger('change');
                    $('#id_cara_bayar').val(1).trigger('change');
                    // alert(data.response.jumlahSEP);
                    if(data.response.jumlahSEP==0){
                        if(faskes==1){
                            // Rujukan FKTP
                            $('#id_rujuk').val(2).trigger('change');
                        }else{
                            // Rujukan FKRTL
                            $('#id_rujuk').val(3).trigger('change');
                        
                        }
                        
                    }else{
                        // Kontrol Ulang
                        // alert("kontrol Ulang")
                        $('#id_rujuk').val(4).trigger('change');
                    }
                    viewRujukan(norujukan,faskes)
                    // $('#id_rujuk').val(1).trigger('change');
					// cariRujukan(norujukan);
				}else{
					alert(data.metaData.message);
				} 
                
                
			},
			error       : function(jqXHR,ajaxOption,errorThrown){
				// $('#btnCariRujukanPasien').prop("disabled", false); // Element(s) are now enabled.
				// $('#btnCariRujukanPasien').html("Cari");
				console.log(jqXHR.responseText);               
				$('#btnNoKunjungan'+norujukan).prop('disabled',false);
				$('#btnNoKunjungan'+norujukan).html(norujukan);     
			}
		}); 
	}
	
	   
}
function setTujuanLayanan(kode){
	var url= base_url+"rekammedis/pasien/mapruang/"+kode;
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {get_param : 'value'},
	    success : function(data){
	        //menghitung jumlah data
	        //console.clear();
	        console.log(url);
	        if(data["status"]==true){
				var id_ruang = $('#id_ruang').val();
				if (id_ruang != data["data"]["idx"]) $('#id_ruang').val(data["data"]["idx"]).trigger('change');
	        }
	    }
	});
}

function formSEP(){
    var statusPeserta  = $('#status_peserta').val();
    if(statusPeserta=='AKTIF'){
        var jnsPelayanan=$('#jns_layanan').val();
        $('#jnsPelayanan').val(jnsPelayanan);
        var nomr=$("#nomr").val();
		$('#nomr_sep').val(nomr);
		$('#noMr').val(nomr)
        var faskes=$('#faskes').val();
        $('#asalRujukan').val(faskes);
        if ($('#jarkomdat').is(':checked')) {
            var encryptdata=$('#encryptdata').val();
            // alert(encryptdata)
            if(encryptdata==""){
                // alert('test');
                var txtNorujuk=$('#txtNorujuk').val();
                if(txtNorujuk=="") tampilkanPesan('warning','No Rujukan tidak boleh kosong');
                else{
                    // Tampilkan Form SEP dengan mengecek rujukan terlebih dahulu
                    // cekRujukan();
                    var faskes =$('#faskes').val();
                    var norujukan=$('#txtNorujuk').val();
                    $.ajax({
                        url         : base_url+'/vclaim/rujukan/norujuk/'+faskes+'/'+norujukan,
                        type        : "GET",
                        data        : {get_param : 'value'},
                        dataType    : "JSON",
                        beforeSend  : function(){
                            $('#btnCreateSep').prop("disabled",true);
                            $('#iconbtnCreateSep').addClass('fa fa-spinner fa-spin')
                        },
                        success     : function(data){
                            // $('#loading').hide();
                            // $('#formlistrujukan').show();
                            if(data.metaData.code==200){
                                var x = data.response.rujukan;
                                $('#noRujukan').val(x.noKunjungan)
                                $('#tujuan').val(x.poliRujukan.kode)
                                $('#txtnmpoli').val(x.poliRujukan.nama)
                                $('#cbasalrujukan').val(data.response.asalFaskes);
                                $('#cbasalrujukan').trigger('change');
                                $('#ppkRujukan').val(x.provPerujuk.kode)
                                $('#txtppkasalrujukan').val(x.provPerujuk.nama)
                                $('#tglRujukan').val(x.tglKunjungan)
                                $('#diagAwal').val(x.diagnosa.kode)
                                $('#txtnmdiagnosa').val(x.diagnosa.nama)
                                $('#noTelp').val(x.peserta.mr.noTelepon)
                                var id_rujuk=$('#id_rujuk').val();
                                // alert(id_rujuk)
                                if(id_rujuk==2 || id_rujuk==3){
                                    // Jika Kunjungan Pertama
                                    $('#txtnmpoli').prop("readonly",true)
                                }else{
                                    $('#txtnmpoli').prop("readonly",false)
                                    // Jika Kunjungan Kontrol
                                    var noSurat=$('#no_suratkontrol').val();
                                    $('#noSurat').val(noSurat);
                                }
                                $('#form-sep').modal('show');
                                $('#form-sep').on('shown.bs.modal', function (e) {
                                    getdpjp();
                                })
                            }else{
                                tampilkanPesan('warning',data.metaData.message);
                            } 

                        },
                        error: function(xhr) { // if error occured
                            $('#error').modal('show');
			                $('#xhr').html(xhr.responseText)
                            $('#btnCreateSep').prop("disabled",false);
                            $('#iconbtnCreateSep').removeClass('fa fa-spinner fa-spin')
                        },
                        complete: function() {
                            $('#btnCreateSep').prop("disabled",false);
                            $('#iconbtnCreateSep').removeClass('fa fa-spinner fa-spin')
                        },
                    });   
                }
            }else{
                // Tampilkan rujukan dengan mendecrypt data rujukan
                var jsondata= Base64.decode(encryptdata);
                var x = JSON.parse(jsondata);
                $('#divkontrol').hide();
                $('#noRujukan').val(x.noKunjungan)
                $('#tujuan').val(x.poliRujukan.kode)
                $('#tujuanRujukan').val(x.poliRujukan.kode)
                $('#txtnmpoli').val(x.poliRujukan.nama)
                var asalFaskes=$('#faskes').val();
                $('#cbasalrujukan').val(asalFaskes);
                $('#cbasalrujukan').trigger('change');
                $('#ppkRujukan').val(x.provPerujuk.kode)
                $('#txtppkasalrujukan').val(x.provPerujuk.nama)
                $('#tglRujukan').val(x.tglKunjungan)
                $('#diagAwal').val(x.diagnosa.kode)
                $('#txtnmdiagnosa').val(x.diagnosa.nama)
                $('#noTelp').val(x.peserta.mr.noTelepon)
                var id_rujuk=$('#id_rujuk').val();
                if(id_rujuk==2 || id_rujuk==3){
                    $('#txtnmpoli').prop("readonly",true)
                }else{
                    $('#txtnmpoli').prop("readonly",false)
                    var noSurat=$('#no_suratkontrol').val();
                    $('#noSurat').val(noSurat);
                }
                $('#form-sep').modal('show')
                $('#form-sep').on('shown.bs.modal', function (e) {
                    getdpjp();
                })
            }
        }else{
            // Penerbitan SEP NonJarkomdat
            // alert("Non Jarkomdata")
            if(jnsPelayanan==2){
                $('#txtnmpoli').prop('readonly',false);
                $('#noRujukan').prop('readonly',false);
                var tujuan=$('#kode_jkn').val();
                var namaTujuan=$('#nama_ruang').val();
                var faskes=$('#faskes').val();
                var ppkRujukan=$('#id_pengirim').val();
                var namappkRujukan=$('#pjPasienDikirimOleh').val();
                var sekarang=$('#sekarang').val()
                var noRujukan=$('#txtNorujuk').val();
                var nomr=$('#nomr').val();
                var notelp=$('#notelp').val();
                $('#tujuan').val(tujuan);
                $('#txtnmpoli').val(namaTujuan);
                $('#asalRujukan').val(faskes);
                $('#cbasalrujukan').val(faskes);
                $('#cbasalrujukan').trigger('change');
                $('#ppkRujukan').val(ppkRujukan)
                $('#txtppkasalrujukan').val(namappkRujukan);
                $('#txtppkasalrujukan').prop('readonly',false)
                $('#tglRujukan').val(sekarang);
                $('#noRujukan').val(noRujukan);
                $('#noMr').val(nomr)
                $('#noTelp').val(notelp);
                if(tujuan!="MAT") $('#divkatarak').hide();
                else $('#divkatarak').show();
                var id_rujuk=$('#id_rujuk').val();
                if(id_rujuk==4){
                    // Kontrol Ulang
                    var no_suratkontrol=$('#no_suratkontrol').val();
                    setKontrol(no_suratkontrol);
                    $('#noSurat').val(no_suratkontrol)
                        
                    $('#divkontrol').show();
                    $('#tujuanKunj').val(2)
                    $('#tujuanKunj').trigger('change')
                }else{
                    $('#divkontrol').hide();
                }
                $('#divkelasrawat').hide();
                getdpjp(jnsPelayanan,sekarang,tujuan)
            }
            $('#form-sep').modal('show')
        }
        // tampilkanPesan('warning','Maaf Sep Tidak bisa diterbitkan karena status Peserta '+ statusPeserta+ " Silahkan hubungi kantor cabang BPJS untuk melakukan pengurusan")
    }else{
        tampilkanPesan('warning','Maaf Sep Tidak bisa diterbitkan karena status Peserta '+ statusPeserta+ " Silahkan hubungi kantor cabang BPJS untuk melakukan pengurusan")
    }
}

function cekRujukan(){
	
	var faskes =$('#faskes').val();
	var norujukan=$('#txtNorujuk').val();
    $.ajax({
        url         : base_url+'/vclaim/rujukan/norujuk/'+faskes+'/'+norujukan,
        type        : "GET",
        data        : {get_param : 'value'},
        dataType    : "JSON",
        beforeSend  : function(){
            $('#cariRujukan').prop("disabled",true);
            $('#iconcariRujukan').removeClass('fa-check')
            $('#iconcariRujukan').addClass('fa-spinner spin')    
        },
        success     : function(data){
            // $('#loading').hide();
			// $('#formlistrujukan').show();
            if(data.metaData.code==200){
				var x = data.response.rujukan;
				console.clear();
				console.log(data);
                dataForm = JSON.stringify(x);
                encodedString = Base64.encode(dataForm);
                // encodedString = Base64.encode(x);
				$('#txtNorujuk').val(x.noKunjungan);
				
				$('#id_pengirim').val(x.provPerujuk.kode);
				$('#pjPasienDikirimOleh').val(x.provPerujuk.nama);
				var idrujuk=$('#id_rujuk').val();
				// cekKunjungan(x.noKunjungan);
				// pilihPengirim(x.provPerujuk.kode);
				// setTujuanLayanan(x.poliRujukan.kode);
				$('#encryptdata').val(encodedString);
				// $('#form-list-rujukan').modal('hide');     
				var id_rujuk=$('#id_rujuk').val();
				if(id_rujuk==6) $('#no_suratkontrol').focus(); 
				else $('#pjPasienDikirimOleh').focus();
            }else{
                tampilkanPesan('warning',data.metaData.message);
            } 
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cariRujukan').prop("disabled",false);
            $('#iconcariRujukan').removeClass('fa-spinner spin')
            $('#iconcariRujukan').addClass('fa-check')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cariRujukan').prop("disabled",false);
            $('#iconcariRujukan').removeClass('fa-spinner spin')
            $('#iconcariRujukan').addClass('fa-check')
        },
    });    
}
function cariSepSuplesi(){
	
	var noKartu=$('#noKartu').val();
	var tglSep=$('#tglSep').val();
    $.ajax({
        url         : base_url+'vclaim/sep/suplesi',
        type        : "GET",
        data        : {noKartu:noKartu,tglPelayanan:tglSep},
        dataType    : "JSON",
        beforeSend  : function(){
            $('#cariSuplesi').prop("disabled",true);
            $('#iconcariSuplesi').removeClass('fa-search')
            $('#iconcariSuplesi').addClass('fa-spinner spin')    
        },
        success     : function(data){
            // $('#loading').hide();
			// $('#formlistrujukan').show();
            if(data.metaData.code==200){
				$('#modalsupplesi').modal('show');
                var sep = data.response.jaminan;
                var table="";
                var no=0;
                for (let i = 0; i < sep.length; i++) {
                    no++;
                    const ele = sep[i];
                    table+="<tr>"+
                    "<td>"+no+"</td>"+
                    "<td>"+ele.noRegister+"</td>"+
                    "<td><button class='btn btn-default btn-xs' type='button' onclick='setSepSuplesi(\""+ele.noSep+"\")'>"+ele.noSep+"</button></td>"+
                    "<td>"+ele.noSepAwal+"</td>"+
                    "<td>"+ele.noSuratJaminan+"</td>"+
                    "<td>"+ele.tglKejadian+"</td>"+
                    "<td>"+ele.tglSep+"</td>"+
                    "</tr>"
                }
                $('#data-suplesi').html(table)
            }else{
                tampilkanPesan('warning',data.metaData.message);
                // $('#modalsupplesi').modal('show');
            } 
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cariSuplesi').prop("disabled",false);
            $('#iconcariSuplesi').removeClass('fa-spinner spin')
            $('#iconcariSuplesi').addClass('fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cariSuplesi').prop("disabled",false);
            $('#iconcariSuplesi').removeClass('fa-spinner spin')
            $('#iconcariSuplesi').addClass('fa-search')
        },
    });    
}
function e_cariSepSuplesi(){
	
	var noKartu=$('#noKartu').val();
	var tglSep=$('#tglSep').val();
    $.ajax({
        url         : base_url+'vclaim/sep/suplesi',
        type        : "GET",
        data        : {noKartu:noKartu,tglPelayanan:tglSep},
        dataType    : "JSON",
        beforeSend  : function(){
            $('#cariSuplesi').prop("disabled",true);
            $('#iconcariSuplesi').removeClass('fa-search')
            $('#iconcariSuplesi').addClass('fa-spinner spin')    
        },
        success     : function(data){
            // $('#loading').hide();
			// $('#formlistrujukan').show();
            if(data.metaData.code==200){
				$('#modalsupplesi').modal('show');
                var sep = data.response.jaminan;
                var table="";
                var no=0;
                for (let i = 0; i < sep.length; i++) {
                    no++;
                    const ele = sep[i];
                    table+="<tr>"+
                    "<td>"+no+"</td>"+
                    "<td>"+ele.noRegister+"</td>"+
                    "<td><button class='btn btn-default btn-xs' type='button' onclick='e_setSepSuplesi(\""+ele.noSep+"\")'>"+ele.noSep+"</button></td>"+
                    "<td>"+ele.noSepAwal+"</td>"+
                    "<td>"+ele.noSuratJaminan+"</td>"+
                    "<td>"+ele.tglKejadian+"</td>"+
                    "<td>"+ele.tglSep+"</td>"+
                    "</tr>"
                }
                $('#data-suplesi').html(table)
            }else{
                tampilkanPesan('warning',data.metaData.message);
                // $('#modalsupplesi').modal('show');
            } 
            
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            $('#cariSuplesi').prop("disabled",false);
            $('#iconcariSuplesi').removeClass('fa-spinner spin')
            $('#iconcariSuplesi').addClass('fa-search')
            // $(placeholder).append(xhr.statusText + xhr.responseText);
            // $(placeholder).removeClass('loading');
        },
        complete: function() {
            $('#cariSuplesi').prop("disabled",false);
            $('#iconcariSuplesi').removeClass('fa-spinner spin')
            $('#iconcariSuplesi').addClass('fa-search')
        },
    });    
}
function setSepSuplesi(sep){
    $('#noSepSuplesi').val(sep);
}
function e_setSepSuplesi(sep){
    $('#e-noSepSuplesi').val(sep);
}
function daftarBaru(){
    var formdata = {
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
                window.location.href = base_url+'rekammedis/pasien/detail/'.data.nomr;
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
function cekJarkodat(){
	if ($('#jarkomdat').is(':checked')) {
		$("#cariRujukan").prop('disabled', false);
		$('#txtNorujuk').focus();
	}else{
		$("#cariRujukan").prop('disabled', true);
		$('#txtNorujuk').focus();
	}
}

function getdpjp(param1="",param2="",param3="",dpjppilih="") {
	// var jl=$('#jns_layanan').val();
	// if(param3=="IGD") param1=1;
	// else{
	// 	if(param1=="") param1 = $('#jnsPelayanan').val();
	// }
	if(param1=="") param1 = $('#jnsPelayanan').val();
	if(param2=="")  param2 = $('#tglSep').val();
	if(param3=="")  param3 = $('#tujuan').val();
	var url = base_url+"vclaim/referensi/dpjp/"+param1+"/"+param2;
    // alert(url)
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {spesialis : param3},
	    success : function(data){
	        console.log(url);
	        if(data.metaData.code==200){
	            var dokter    = data.response.list;
	            var jmlData=dokter.length;
	            var option   = "<option value=''>Pilih Dokter</option>";
	            //Create Tabel
	            for(var i=0; i<jmlData;i++){
					if(dpjppilih==dokter[i]['kode']) option+="<option value='"+dokter[i]["kode"]+"' selected>"+dokter[i]["nama"]+"</option>";
					else option+="<option value='"+dokter[i]["kode"]+"' >"+dokter[i]["nama"]+"</option>";
	                
	            }
				$('#dpjpLayan').html(option);
				$('.dpjpLayan').html(option);
				$('#kodeDPJP').html(option);
	        }else{
				var poli=$('#txtnmpoli').val();
				tampilkanPesan("warning","Pencarian Dokter Spesialis "+ poli + ' Gagal karena ' +data.metaData.message)
			}
	    },
        error: function(xhr) { // if error occured
            ('#error').modal('show');
			$('#xhr').html(xhr.responseText)
        },
	});
}
// Get Provinsi Bridging BPJS
function getProvinsiVclaim(id='cbprovinsi',pilih=''){
	var url= base_url+"vclaim/referensi/propinsi";
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {get_param : 'value'},
	    success : function(data){
			if(data.metaData.code==200){
				var provinsi=data.response.list;
				var jmlData=provinsi.length;
				var option="<option value='-'>Pilih</option>";
				for(var i=0;i<jmlData;i++){
					if(pilih==provinsi[i]["kode"]) option+="<option value='"+provinsi[i]["kode"]+"' selected>"+provinsi[i]["nama"]+"</option>";
					else option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
				}
				
				$('#'+id).html(option);
			}
			
	    }
	});
	
}
function getKabupatenVaclaim(id="cbkabupaten",idprov='cbprovinsi',pilih=''){
	
	console.log(url);
	var provinsi=$('#'+idprov).val();
	// alert(provinsi);
	// alert("Get Kabupaten "+provinsi)
	var url= base_url+"vclaim/referensi/kabupaten/"+provinsi;
	$.ajax({
	    url     : url,
	    type    : "POST",
	    dataType: "json",
	    data    : {param1: provinsi},
	    success : function(data){
			if(data.metaData.code==200){
				var provinsi=data.response.list;
				var jmlData=provinsi.length;
				var option="<option value=''>Pilih Kabupaten</option>";
				for(var i=0;i<jmlData;i++){
					if(pilih==provinsi[i]["kode"]) option+="<option value='"+provinsi[i]["kode"]+"' selected>"+provinsi[i]["nama"]+"</option>";
					else option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
					// option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
				}
				$('#'+id).html(option);
			}
	    }
	});
}

function getKecamatanVclaim(id="cbkecamatan",id_kab="cbkabupaten",pilih=''){
	
	var provinsi=$('#'+id_kab).val();
	// alert("Get Kecamatan "+provinsi)
	var url= base_url+"vclaim/referensi/kecamatan/"+provinsi;
	console.log(url);
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    : {param: provinsi},
	    success : function(data){
			// console.clear();
			console.log("data kecamatan...");
			console.log(data);
			if(data.metaData.code==200){
				var provinsi=data.response.list;
				var jmlData=provinsi.length;
				var option="<option value=''>Pilih Kecamatan</option>";
				for(var i=0;i<jmlData;i++){
					if(pilih==provinsi[i]["kode"]) option+="<option value='"+provinsi[i]["kode"]+"' selected>"+provinsi[i]["nama"]+"</option>";
					else option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
					// option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
				}
				$('#'+id).html(option);
			}
	    }
	});
}

function lakalantas(){
	var lakalantas = $('#lakaLantas').val();
	if(lakalantas=="-") var kll=0;
	else var kll=parseInt(lakalantas);
	
	if(parseInt(kll)>0){
		$('#divJaminan').show();
		getProvinsikll();
	}else{
		$('#divJaminan').hide();
	}
}
function e_lakalantas(){
	var lakalantas = $('#e-lakaLantas').val();
	if(lakalantas=="-") var kll=0;
	else var kll=parseInt(lakalantas);
	
	if(parseInt(kll)>0){
		$('#e-divJaminan').show();
		getProvinsikll('e-cbprovinsi');
	}else{
		$('#e-divJaminan').hide();
	}
}
function createSEP(){
	var eksekutif = $('#eksekutif:checked').val();
	var cob = $('#cob:checked').val();
	var katarak = $('#chkkatarak:checked').val();
	var lakaLantas = $('#lakaLantas').val();
	if(cob!=1) cob=0;
	if(katarak!=1) katarak=0;
	// if(lakaLantas!=1) lakaLantas=0;
	if(eksekutif!=1) eksekutif=0;
	if(lakaLantas==""){
		// alert(lakaLantas)
		tampilkanPesan('warning','Status Kecelakaan Masih Kosong, silahkan pilih Bukan Kecelakaan, Kecelakaan LaluLintas dan Bukan Kecelakaan Kerja, Kecelakaan LaluLintas dan Kecelakaan Kerja, Kecelakaan Kerja')
		return false
	}
	if(lakaLantas>0){
		// lakaLantas=1;
		var penjamin = $('#penjamin').val();
		var tglKejadian=$('#txtTglKejadian').val();
		var keterangan=$('#txtketkejadian').val();
		var suplesi=$('#suplesi:checked').val();
		if(suplesi!=1) suplesi=0;
		if(suplesi==1){
			var noSepSuplesi=$('#noSepSuplesi').val();
		}else {
			var noSepSuplesi="";
		}
		var kdPropinsi=$('#cbprovinsi').val();
		var kdKabupaten=$('#cbkabupaten').val();
		var kdKecamatan=$('#cbkecamatan').val();
	}else{
		var penjamin = "";
		var tglKejadian="";
		var keterangan="";
		var suplesi=0;
		var noSepSuplesi="";
		var kdPropinsi="";
		var kdKabupaten="";
		var kdKecamatan="";
		
	}
	var jns_layanan = $('#jns_layanan').val();
    // alert(jns_layanan)
	if(jns_layanan=="2" || jns_layanan=="1"){
		var kodeDPJP = $('#kodeDPJP').val();
		var namaDPJP = $('#kodeDPJP :selected').html();
		var kodeDokter = $('#kodeDokter').val();
		var namaDokter = $('#kodeDokter :selected').html();
	}else{
		var kodeDPJP = $('#kodeDPJP').val();
		var namaDPJP = $('#txtnmdpjp').val();
		var kodeDokter = $('#kodeDokter').val();
		var namaDokter = $('#txtnmDokter').val();
	}
	if(jns_layanan=="2"){
		var noRujukan=$('#noRujukan').val();
		if(noRujukan==""){
			tampilkanPesan('warning',"No Rujukan Tidak Boleh Kosong");
			return false;
		}
		var tujuan=$('#tujuan').val();
		var tujuanRujukan=$('#tujuanRujukan').val();
		if(tujuan==tujuanRujukan){
			var tujuanKunj=$('#tujuanKunj').val();
			if(tujuanKunj==2){
				var no_surat=$('#no_suratkontrol').val();
				if(no_surat==""){
					tampilkanPesan('warning','No Surat Kontrol Tidak Boleh Kosong');
					return false;
				}
				var assesmentPel=$('#assesmentPel').val();
				if(assesmentPel==""){
					$('#asspel').modal('show');
					return false;
				}
				var kodeDPJP=$('#kodeDPJP').val();
				if(kodeDPJP==""){
					tampilkanPesan('warning','Dokter DPJP Tidak Boleh Kosong');
					return false;
				}
			}
			
		}
	}
	var dpjpLayan=$('#dpjpLayan').val();
		if(dpjpLayan==""){
			tampilkanPesan('warning',"Dpjp Yang Melayani Tidak Boleh Kosong");
			return false;
		}
	// var klsRawat=$('#klsRawat').val();
	// alert(klsRawat);
	var formData = {
		idx : $('#idx').val(),
		noKartu : $('#noKartu').val(),
		tglSep 	: $('#tglSep').val(),
		ppkPelayanan: $('#ppkPelayanan').val(),
		jnsPelayanan: $('#jnsPelayanan').val(),
		klsRawatHak: $('#klsRawatHak').val(), //Baru
		klsRawatNaik: $('#klsRawatNaik').val(), //Baru
		pembiayaan: $('#pembiayaan').val(), //Baru
		penanggungJawab: $('#penanggungJawab').val(), //Baru
		noMR: $('#noMr').val(),
		asalRujukan	: $('#asalRujukan').val(),
		tglRujukan: $('#tglRujukan').val(),
		noRujukan : $('#noRujukan').val(),	
		ppkRujukan : $('#ppkRujukan').val(),
		catatan : $('#catatan').val(),
		diagAwal : $('#diagAwal').val(),
		tujuan : $('#tujuan').val(),
		eksekutif : eksekutif,
		cob : cob,
		katarak : katarak,
		lakaLantas : lakaLantas,
		penjamin : penjamin,
		tglKejadian : tglKejadian,
		keterangan : keterangan,
		suplesi : suplesi,
		noSepSuplesi : noSepSuplesi, 
		kdPropinsi :kdPropinsi,
		kdKabupaten : kdKabupaten,
		kdKecamatan :kdKecamatan,
		tujuanKunj : $('#tujuanKunj').val(), //Baru
		flagProcedure : $('#flagProcedure').val(), //Baru
		kdPenunjang: $('#kdPenunjang').val(), //Baru
		assesmentPel: $('#assesmentPel').val(), //Baru
		noSurat : $('#no_suratkontrol').val(),
		kodeDPJP : kodeDPJP,
		dpjpLayan : $('#dpjpLayan').val(), //Baru
		namaDpjpLayan : $('#dpjpLayan :selected').html(), //Baru
		noTelp : $('#noTelp').val(),
		namaTujuan: $('#txtnmpoli').val(),
		kodeDokter: kodeDokter, //Dokter yang menangani
		namaDokter: namaDokter, //Nama Dokter yang menangani
		namaPpkRujukan: $('#txtppkasalrujukan').val(),
		namaDPJP: namaDPJP
	}
	console.clear();
	console.log(formData);
    return false;
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"vclaim/sep/insert",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
		success     : function(data){
			console.clear();
			console.log(data);
			if(data.metaData.code==200){
				$('#no_jaminan').val(data.response.sep.noSep);
                var idx=$('#idx').val();
                if(idx>0){
                    location.reload();
                }else{
                    $('.registrasi').hide();
                    $('.daftar').show();
                }
				// $('#tgl_jaminan').val(data.response.sep.tglSep);
				// $('#form-sep').modal('hide');
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
function cekTujuanKunjungan(){
	var tujuanKunj=$('#tujuanKunj').val();
	if(tujuanKunj==0){
		var prosedure="<input type='hidden' id='flagProcedure' name='flagProcedure' value=''> "
		$('#prosedure').html(prosedure);

		var penunjang="<input type='hidden' id='kdPenunjang' name='kdPenunjang' value=''> "
		$('#penunjang').html(penunjang);
		var jns_layanan=$('#jns_layanan').val();
		if(jns_layanan=="3"){
			var asesmen="<input type='hidden' id='assesmentPel' name='assesmentPel' value=''>";
		}else{
            var tujuanRujukan=$('#tujuanRujukan').val();
            var tujuan=$('#tujuan').val();
            if(tujuanRujukan==tujuan){
                // Jika Pembuatan SEP Kunjungan Pertama
                var asesmen="<input type='hidden' id='assesmentPel' name='assesmentPel' value=''>";
            }else{
                // Jika Rujukan Internal
                var asesmen="<div class=\"form-group\">"+
                "<label class=\"col-md-3 col-sm-3 col-xs-12 control-label\">Asesmen <label style=\"color:red;font-size:small\">*</label></label>"+
                "<div class=\"col-md-9 col-sm-9 col-xs-12\">"+
                "<select id='assesmentPel' name='assesmentPel' class='form-control'>"+
                "<option value=''>Pilih</option>"+
                "<option value='1'>Poli spesialis tidak tersedia pada hari sebelumnya</option>"+
                "<option value='2'>Jam Poli telah berakhir pada hari sebelumnya</option>"+
                "<option value='3'>Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya</option>"+
                "<option value='4'>Atas Instruksi RS</option>"+
                "<option value='5'>Tujuan Kontrol</option>"+
                "</select></div></div>";
            }
			
		}
		
		// var asesmen="<input type='hidden' id='assesmentPel' name='assesmentPel' value=''> "
		$('#asesmen').html(asesmen);
		$('.divkontrol').hide();
	}else if(tujuanKunj==1){
        // Kontrol Prosedure
		var prosedure="<div class=\"form-group\">"+
		"<label class=\"col-md-3 col-sm-3 col-xs-12 control-label\">Flag Prosedure <label style=\"color:red;font-size:small\">*</label></label>"+
		"<div class=\"col-md-9 col-sm-9 col-xs-12\">"+
		"<select name='flagProcedure' id='flagProcedure' class='form-control'>"+
		"<option value=''>Tidak Ada</option>"+
		"<option value='0'>Prosedur Tidak Berkelanjutan</option>"+
		"<option value='1'>Prosedur dan Terapi Berkelanjutan</option>"+
		"</select></div></div>";
		$('#prosedure').html(prosedure);
		var penunjang="<div class=\"form-group\">"+
		"<label class=\"col-md-3 col-sm-3 col-xs-12 control-label\">Penunjang <label style=\"color:red;font-size:small\">*</label></label>"+
		"<div class=\"col-md-9 col-sm-9 col-xs-12\">"+
		"<select name='kdPenunjang' id='kdPenunjang' class='form-control'>"+
		"<option value=''>Tidak Ada</option>"+
		"<option value='1'>Radioterapi</option>"+
		"<option value='2'>Kemoterapi</option>"+
		"<option value='3'>Rehabilitasi Medik</option>"+
		"<option value='4'>Rehabilitasi Psikososial</option>"+
		"<option value='5'>Rehabilitasi Psikososial</option>"+
		"<option value='6'>Pelayanan Gigi</option>"+
		"<option value='7'>Laboratorium</option>"+
		"<option value='8'>USG</option>"+
		"<option value='9'>Farmasi</option>"+
		"<option value='10'>Lain-Lain</option>"+
		"<option value='11'>MRI</option>"+
		"<option value='12'>HEMODIALISA</option>"+
		"</select></div></div>";
		$('#penunjang').html(penunjang);

		var asesmen="<input type='hidden' id='assesmentPel' name='assesmentPel' value=''> "
		$('#asesmen').html(asesmen);
		var tujuan=$('#tujuan').val();
		var tujuanRujukan=$('#tujuanRujukan').val();
		if(tujuan==tujuanRujukan){
			$('.divkontrol').show();
		}
		else $('.divkontrol').hide();
		
	}else{
		// alert(tujuanKunj)
        // Kontrol Ulang
		$('#asesmen').show();
		var prosedure="<input type='hidden' id='flagProcedure' name='flagProcedure' value=''> "
		$('#prosedure').html(prosedure);

		var penunjang="<input type='hidden' id='kdPenunjang' name='kdPenunjang' value=''> "
		$('#penunjang').html(penunjang);

		var asesmen="<div class=\"form-group\">"+
		"<label class=\"col-md-3 col-sm-3 col-xs-12 control-label\">Asesmen <label style=\"color:red;font-size:small\">*</label></label>"+
		"<div class=\"col-md-9 col-sm-9 col-xs-12\">"+
		"<select name='assesmentPel' id='assesmentPel' class='form-control'>"+
		"<option value=''>Tidak Ada</option>"+
		"<option value='1'>Poli spesialis tidak tersedia pada hari sebelumnya</option>"+
		"<option value='2'>Jam Poli telah berakhir pada hari sebelumnya</option>"+
		"<option value='3'>Dokter Spesialis yang dimaksud tidak praktek pada hari sebelumnya</option>"+
		"<option value='4'>Atas Instruksi RS</option>"+
		"<option value='5'>Tujuan Kontrol</option>"+
		"</select></div></div>";
		// var asesmen="<input type='hidden' id='assesmentPel' name='assesmentPel' value=''> "
		$('#asesmen').html(asesmen);
		$('.divkontrol').show();
	}
}

function riwayatKunjunganPeserta(tglMulai='',tglSelesai=''){
    var noKartu=$('#nobpjs').val();
    // alert(noKartu)
	// var tglMulai=$('#tglMulai').val()
    // var tglSelesai=$('#tglSelesai').val()
	if(noKartu==''){
		tampilkanPesan("warning","No Kartu Pasien Tidak Ditemukan");
		return false;
	}
	if(tglMulai=='' || tglSelesai=='') var url = base_url+"vclaim/monitoring/historipelayanan/"+noKartu;
	else var url = base_url+"vclaim/monitoring/historipelayanan/"+noKartu+"/"+tglMulai+"/"+tglSelesai;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        if(data.metaData.code==200){
	            var histori    = data.response.histori;
	            var jmlData=histori.length;
	            var table   = "";
	            //Create Tabel
	            for(var i=0; i<jmlData;i++){
					if(histori[i].jnsPelayanan==1) jnslayanan='Rawat Inap';
                    else jnslayanan='Rawat Jalan';
					table+='<li class="list-group-item"><div class="row"><div class="col-md-4">No Sep </div><div class="col-md-8">: '+
					histori[i].noSep+"</div><div class='col-md-4'>Tgl Sep </div><div class='col-md-8'> : "+
					histori[i].tglSep+"</div><div class='col-md-4'>No Rujukan </div><div class='col-md-8'> : "+
					histori[i].noRujukan+"</div><div class='col-md-4'>Jns Layanan </div><div class='col-md-8'> : "+
					jnslayanan+"</div><div class='col-md-4'>Poli </div><div class='col-md-8'> : "+
					histori[i].poli+"</div><div class='col-md-4'>Diagnosa </div><div class='col-md-8'> : "+
					histori[i].diagnosa+"</div><div class='col-md-4'>PPK Pelayanan </div><div class='col-md-8'> : "+
					histori[i].ppkPelayanan+"</div></div>"+
					'</li>';
					
	            }
				// alert(table)
				$('#riwayatkunjungan').html(table);
				// var faskes=$('#r-faskes').val();
	        }else{
                $('#riwayatkunjungan').html('<div class="alert alert-danger">'+data.metaData.message+'</div>')
				// tampilkanPesan('warning',data.metaData.message)
			}
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            
        }
	});
}

function cekHistoriPelayanan(tglMulai='',tglSelesai=''){
    var noKartu=$('#nobpjs').val();
    // alert(noKartu)
	// var tglMulai=$('#tglMulai').val()
    // var tglSelesai=$('#tglSelesai').val()
	if(tglMulai=='' || tglSelesai=='') var url = base_url+"vclaim/monitoring/historipelayanan/"+noKartu;
	else var url = base_url+"vclaim/monitoring/historipelayanan/"+noKartu+"/"+tglMulai+"/"+tglSelesai;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        if(data.metaData.code==200){
	            var histori    = data.response.histori;
	            var jmlData=histori.length;
	            var table   = "";
	            //Create Tabel
                var namappkPelayanan=$('#namappkPelayanan').val()
                var ppkPelayanan=$('#ppkPelayanan').val();
	            for(var i=0; i<jmlData;i++){
                    if(histori[i].ppkPelayanan==namappkPelayanan){
                        // Jika dilayani bukan rumah sakit lain
                        // alert(histori[i].ppkPelayanan+"="+namappkPelayanan)
                        var tujuanRujukan=$('#tujuanRujukan').val();
                        var tujuan=$('#tujuan').val();
                        // alert(tujuanRujukan +" = "+ tujuan)
                        if(tujuanRujukan==tujuan) $('#divkontrol').show();
                        else $('#divkontrol').hide()
                        if(histori[i].jnsPelayanan==1){
                            // Jika Layanan Terakhir Rawat Inap
                            // alert("rawat Jalan")
                            $('#divRujukan').hide();
                            $('#divkontrol').show();
                            $('#ppkRujukan').val(ppkPelayanan);
                            $('#txtppkasalrujukan').val(namappkPelayanan);
                            $('#tglRujukan').val(histori[i].tglSep)
                            $('#noRujukan').val(histori[i].noSep)
                            $('#txtNorujuk').val(histori[i].noSep)
                        }else{
                            $('#divRujukan').show();
                        }
                        break;
                    }else{
                        // alert(histori[i].ppkPelayanan+"="+namappkPelayanan)
                        $('#divRujukan').show();
                    }
				}
	        }
	    },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
            
        }
	});
}
function allrujukan(faskes=1){
    // var faskes=$('#faskes').val();
    var nobpjs=$('#nobpjs').val()
	if(nobpjs==''){
		tampilkanPesan("warning","No Kartu Pasien Tidak Ditemukan");
		return false;
	}
    $.ajax({
        url         : base_url+"vclaim/rujukan/listrujukan/"+faskes+"/"+nobpjs,
        type        : "GET",
        data        : {},
        dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            // $('#cariRujukan').prop("disabled",true);
            // $('#iconcariRujukan').removeClass('fa-search')
            // $('#iconcariRujukan').addClass('fa-spinner spin')
            // $(placeholder).addClass('loading');
        },
        success     : function(data){
            
            if(data.metaData.code==200){
                var table="";
                var x = data.response.rujukan;
                for (var i=0 ; i <= x.length-1; i++) {
                    
                    // if(histori[i].jnsPelayanan==1) jnslayanan='Rawat Inap';
                    // else jnslayanan='Rawat Jalan';
					table+='<li class="list-group-item"><div class="row"><div class="col-md-4">No Rujukan </div><div class="col-md-8">: '+
					'<button type="button" class="btn btn-default btn-xs" onclick="periksaRujukan(\''+x[i]["noKunjungan"]+'\','+faskes+','+x[i]['pelayanan']['kode']+')">'+
                    x[i]['noKunjungan']+"</button></div><div class='col-md-4'>Tgl Rujukan </div><div class='col-md-8'> : "+
					x[i]['tglKunjungan']+"</div><div class='col-md-4'>Prov Perujuk </div><div class='col-md-8'> : "+
					x[i]['provPerujuk']['nama']+"</div><div class='col-md-4'>Poli Perujuk </div><div class='col-md-8'> : "+
					x[i]['poliRujukan']['nama']+"</div>"+
                    "<div class='col-md-4'>Keluhan </div><div class='col-md-8'> : "+
					x[i]['keluhan']+"</div>"+
                    "<div class='col-md-4'>Jns Layanan </div><div class='col-md-8'> : "+
					x[i]['pelayanan']['nama']+"</div>"+
                    "<div class='col-md-4'>Diagnosa </div><div class='col-md-8'> : "+
					x[i]['diagnosa']['nama']+"</div></div>"+
					'</li>';
                }  
                if(faskes==1){
                    
                    $('#list_rujukan_faskes1').html(table);
                }else{
                    $('#list_rujukan_faskes2').html(table);
                }
                
            }else{
                
                // tampilkanPesan('warning',data.metaData.message);
                // $('tbody#list-data-rujukan').html('<tr class="odd"><td colspan="8" valign="top">No data available in table</td></tr>');
            } 
        },
        error: function(xhr) { // if error occured
            $('#error').modal('show');
			$('#xhr').html(xhr.responseText)
        },
        complete: function() {
            // $('#cariRujukan').prop("disabled",false);
            // $('#iconcariRujukan').removeClass('fa-spinner spin')
            // $('#iconcariRujukan').addClass('fa-search')
        },
    });  
}

// KOntrol Ulang

function getListKontrol(){
	console.clear();
	var status=$('#status_peserta').val()
	if(status==""){
		tampilkanPesan('warning','Status Peserta Tidak DIketahui Silahkan Klik Tombol CEK');
		return false
	}else if(status=="AKTIF"){
		$('#form-list-kontrol').modal('show');
		var jnsKontrol=$('#jnsKontrol').val();
		resetFormKontrol();
		if(jnsKontrol==2){
			$('.step').hide();
			$('#listkontrol').show();
			rencanaKontrolBpjs();
            $('#headkontrol').html("Surat Kontrol");
            $('#headnomor').html("No SEP");
		}else{
			var noKartu = $('#nobpjs').val();
			// alert(noKartu)
			$('.step').hide();
			$('#listkontrol').show();
			rencanaKontrolBpjs();
			$('#noSEP').val(noKartu);

            $('#headkontrol').html("SPRI")
            $('#headnomor').html("No Kartu")
		}
	}else{
		tampilkanPesan('warning','Pencarian / Pembuatan Surat Kontrol / SPRI tidak bisa dilanjutkan karena status peserta '+ status);
		return false
	}
}
function resetFormKontrol(){
	$('.step').hide();
	$('#listkontrol').show();
	$('#formkontrol')[0].reset();
	$('#tglRencanaKontrol').val("");
	$('#poliKontrol').html("");
	$('#kodeDokter').html("");
}
function rencanaKontrol(){
	var nobpjs=$('#nobpjs').val();
	$.ajax({
		url         : base_url+"vclaim/monitoring/permintaankontrol/"+nobpjs,
		type        : "GET",
		data    : {get_param : 'value'},
		dataType    : "JSON",
		beforeSend  : function(){
			$('tbody#datakontrol').html("<tr><td colspan=4><i class='fa fa-refresh fa-spin'></i> Permintaan sedang diproses... Silahkan ditunggu</td></tr>");
		},
		success     : function(data){
			
			var res = '';
			if(data.length>0){
				for (var i=0 ; i <= data.length-1; i++) {
					
					res += "<tr>";
					res += "<td>" + (i+1) + "</td>";
					if(data[i]['jnsKontrol']==2){
						res += "<td>Surat Kontrol</td>";
					}else{
						res += "<td>SPRI</td>";
					}
					res += "<td><button onclick=setKontrol('"+data[i].noSuratKontrol+"') type='button' class='btn btnView btn-default btn-xs'>" + data[i].noSuratKontrol + "</button></td>";
					res += "<td>" + data[i]['namapoliKontrol'] + "</td>";
					res += "<td>" + data[i]['namaDokter'] + "</td>";
					res += "</tr>";
				}  
				var jnsKontrol=$('#jnsKontrol').val();
				// alert(jnsKontrol);
				if(jnsKontrol==1) res+='<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
				else res+='<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
				$('tbody#datakontrol').html(res);
			}else{
				// alert(data.metaData.message);
				var jnsKontrol=$('#jnsKontrol').val();
				// alert(jnsKontrol)
				
				if(jnsKontrol==1) res='<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
				else res='<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
				$('tbody#datakontrol').html(res);
			} 
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}
function riwayatKunjungan(){
	$('.step').hide();
	$('#riwayat').show();
	var a = $('#nobpjs').val();
	var dari =$('#dari').val();
	var sampai=$('#sampai').val();	
    $.ajax({
		url         : base_url+"vclaim/monitoring/historipelayanan/"+a+"/"+dari+"/"+sampai,
		type        : "GET",
		data        : {get_param : 'value'},
		dataType    : "JSON",
		beforeSend  : function(){
			$('tbody#datariwayat').html("<tr><td colspan=7><i class='fa fa-refresh fa-spin'></i> Permintaan sedang diproses... Silahkan ditunggu</td></tr>");
		},
		success     : function(data){
			
			if(data.metaData.code==200){
				var x = data.response.histori;
				// alert(x.length);
				var res = "";
				// var encodedString = "";
				// var dataForm = "";
				/** */
				for (var i=0 ; i <= x.length-1; i++) {
					res += "<tr>";
					res += "<td>" + (i+1) + "</td>";
					res += "<td>" + x[i]['tglSep'] + "</td>";
					if(x[i]['jnsPelayanan']==2) res += "<td>R. Jalan</td>";
					else res += "<td>R. Inap</td>";
					res += "<td>" + x[i]['noRujukan'] + "</td>";
					res += "<td><button onclick=setSep('"+ x[i]['noSep']+"') type='button' class='btn btnView btn-default btn-xs'>" + x[i]['noSep'] + "</button></td>";
					res += "<td>" + x[i]['poli'] + "</td>";
					res += "<td>" + x[i]['ppkPelayanan'] + "</td>";
					res += "<td>" + x[i]['diagnosa'] + "</td>";
					res += "</tr>";
				}  
				$('tbody#datariwayat').html(res);
			}else{
				tampilkanPesan('warning',data.metaData.message);
				$('tbody#datariwayat').html('<tr class="odd"><td colspan="6" valign="top">No data available in table</td></tr>');
			} 
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}
function cekKontrol(){
	var jenis=$('#jenis').val();
	if(jenis==1){
		// SPRI
		formSPRI();
	}else{
		riwayatKunjungan();
	}
}
function formSPRI(){
	$('.step').hide();
	var noSEP=$('#nobpjs').val();
	$('#noSEP').val(noSEP);
    $('#headkontrol').html("SPRI")
    $('#headnomor').html("No Kartu")
	$('#formsuratkontrol').show();
}
function setSep(nosep){
	
	if ($('#jarkomdat').is(':checked')) {
		$('.step').hide();
		$('#formsuratkontrol').show();
		$('#noSEP').val(nosep);
	}else{
		cekSep(nosep)
	}
}
function cekSep(nosep){
	$.ajax({
		url         : base_url+"vclaim/rencanakontrol/sep/"+nosep,
		type        : "GET",
		data        : {},
		dataType    : "JSON",
		beforeSend  : function(){
			// $('tbody#list-data-rujukan').html("<tr><td colspan=7><i class='fa fa-refresh fa-spin'></i> Permintaan sedang diproses... Silahkan ditunggu</td></tr>");
		},
		success     : function(data){
			if(data.metaData.code==200){
				// alert(data.metaData.message)
				$('.step').hide();
				$('#formsuratkontrol').show();
				$('#noSEP').val(nosep);
				let text = data.response.poli;
				const poli = text.split(" - "); 
				var option='<option value="">Pilih</option><option value="'+poli[0]+'">'+poli[1]+'</option>';
				$('#poliKontrol').html(option);
				$('#txtNorujuk').val(data.response.provPerujuk.noRujukan)
				$('#id_pengirim').val(data.response.provPerujuk.kdProviderPerujuk)
				$('#pjPasienDikirimOleh').val(data.response.provPerujuk.nmProviderPerujuk)
				// pilihPengirim(data.response.provPerujuk.kdProviderPerujuk);
				setTujuanLayanan(poli[0]);
				// alert(poli[0])
			}else{
				alert(data.metaData.message);
			} 
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}
function caripoliKontrol(){
	var jnsKontrol=$('#jnsKontrol').val();
	var nomor=$('#noSEP').val();
	// var tglRujukan=$('#tglRujukan').val();
	// alert(tglRujukan);
	var tglRencanaKontrol=$('#tglRencanaKontrol').val();
	$.ajax({
	    url     : base_url+'vclaim/rencanakontrol/spesialistik/'+jnsKontrol+"/"+nomor+"/"+tglRencanaKontrol,
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
					option+="<option value='"+provinsi[i]["kodePoli"]+"'>"+provinsi[i]["namaPoli"]+"</option>";
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
function dokterKontrol(){
	var jnsKontrol=$('#jnsKontrol').val();
	var poli = $('#poliKontrol').val();
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
					option+="<option value='"+provinsi[i]["kodeDokter"]+"'>"+provinsi[i]["namaDokter"]+"</option>";
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

function buatSuratKontrol(){
	var jnsKontrol=$('#jnsKontrol').val();
	var noSEP = $('#noSEP').val();
	var tglRencanaKontrol = $('#tglRencanaKontrol').val();
	var poliKontrol = $('#poliKontrol').val();
	var namapoliKontrol = $('#poliKontrol :selected').html();
	var kodeDokter = $('#kodeDokter').val();
	var namaDokter =$('#kodeDokter :selected').html();
	
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
				setKontrol(sk);
				$('#no_suratkontrol').val(sk);
				$('#form-list-kontrol').modal('hide');
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
}
// function setKontrol(no){
// 	$('#no_suratkontrol').val(no);
// 	var url= base_url+"vclaim/rencanakontrol/nosuratkontrol/"+no;
// 	$.ajax({
// 		url     : url,
// 		type    : "GET",
// 		dataType: "json",
// 		data    : { get_param: 'value' },
// 		success : function(data){
// 			console.log(data);
// 			if(data.metaData.code==200){
// 				$('#txtNorujuk').val(data.response.sep.provPerujuk.noRujukan);
// 				$('#id_pengirim').val(data.response.sep.provPerujuk.kdProviderPerujuk);
// 				$('#pjPasienDikirimOleh').val(data.response.sep.provPerujuk.nmProviderPerujuk);
// 				$('#tglRujukan').val(data.response.sep.provPerujuk.tglRujukan)
// 				$('#noRujukan').val(data.response.sep.provPerujuk.noRujukan);
//                 $('#tujuanKunj').val(2);
//                 $('#tujuanKunj').trigger('change');
//                 $('#assesmentPel').val(5)
//                 $('.adarujukan').show();
//                 $('#asalRujukan').val(data.response.sep.provPerujuk.asalRujukan);
//                 $('#cbasalrujukan').val(data.response.sep.provPerujuk.asalRujukan);
//                 $('#cbasalrujukan').trigger('change');
//                 var diagnosa=data.response.sep.diagnosa;
//                 var diagAwal=diagnosa.split(" - ");
//                 $('#diagAwal').val(diagAwal[0]);
//                 $('#txtnmdiagnosa').val(diagnosa);
// 				// $('#diagAwal').val()
//                 // if(data.response.sep.provPerujuk.asalRujukan==1)
//                 var tingkat="<div class=\"form-group\">"+
//                         "<label class=\"col-md-4 col-sm-4 col-xs-12 control-label\">Tingkat Faskes</label>"+
//                         "<div class=\"col-md-8 col-sm-8 col-xs-12\"><div class=\"input-group\">"+
//                         "<input type=\"hidden\" id=\"faskes\" name=\"faskes\" value=\""+data.response.sep.provPerujuk.asalRujukan+"\">"+
//                         "<input type='text' name='tf' class='form-control' id='tf' value='Faskes Tingkat "+data.response.sep.provPerujuk.asalRujukan+"' readonly />"+
//                         '<span class="input-group-addon"><input type="checkbox" value="1" name="jarkomdat" id="jarkomdat" onclick="cekJarkodat()" checked="">Jarkomdat</span>'+
//                         "</div></div></div>";
//                         $('#tingkatfaskes').html(tingkat);
// 			}else{
// 				tampilkanPesan('warning',data.metaData.message)
// 			}
// 		}
// 	});
// 	$('#form-list-kontrol').modal('hide');
// }
function setKontrol(no) {
	var idx = $('#idx').val();
	// if (idx == '') {
	// 	$('#no_suratkontrol').val(no);
	// 	$('#noSurat').val(no);
	// }
	// else $('#noSurat').val(no);
    $('#no_suratkontrol').val(no);
	$('#noSurat').val(no);
	var url = base_url + "vclaim/rencanakontrol/nosuratkontrol/" + no;
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			get_param: 'value'
		},
		beforeSend: function () {
			// $('#btnbuatkontrol').prop("disabled",true);
			// $('#iconkontrol').removeClass('fa fa-save')
			// $('#iconkontrol').addClass('fa fa-spinner fa-spin')
		},
		success: function (data) {
			console.log("5. " + data);
			if (data.metaData.code == 200) {
				if(data.response.jnsKontrol==2){
					$("#tglRujukan").val(data.response.sep.provPerujuk.tglRujukan);
					
					$("#ppkRujukan").val(data.response.sep.provPerujuk.kdProviderPerujuk);
					// var tujuan=$('#tujuan').val();
					var nomr=$('#nomr').val();
					if(nomr!=null) $('#noMr').val(nomr)
					$('#tujuan').val(data.response.poliTujuan);
					$('#txtnmpoli').val(data.response.namaPoliTujuan);
					$('#txtnmpoli').prop("readonly", false);

					if (data.response.poliTujuan == "MAT") $('#divkatarak').show();
					else $('#divkatarak').hide();
					$('#divPoli').show();
					var faskes = data.response.sep.provPerujuk.asalRujukan;
					if(faskes==null) faskes=$('#faskes').val();
					$('#cbasalrujukan').val(faskes).trigger('change'); //asalRujukan
					$('#asalRujukan').val(faskes);
					$('#txtkdppkasalrujukan').val(data.response.sep.provPerujuk.kdProviderPerujuk);
					$('#txtppkasalrujukan').val(data.response.sep.provPerujuk.nmProviderPerujuk);
					// 1. Cek
					// $('#txtppkasalrujukan').val(data.response.sep.provPerujuk.nmProviderPerujuk);
					// $('#txtppkasalrujukan').val("");
					// $('#noSurat').val('');
					// Belum ditemukan
					$('#txtidkontrol').val('');
					$('#noSuratlama').val('');
					$('#txtpoliasalkontrol').val('');
					$('#txttglsepasalkontrol').val('');
					// $('#txttglsep').val(tgllayanan);
					var diagnosa = data.response.sep.diagnosa;
					var diagAwal = diagnosa.split(" - ");
					$('#txtnmdiagnosa').val(diagAwal[1]);
					$('#diagAwal').val(diagAwal[0]);
					$('#divkelasrawat').hide();
					$('#divRujukan').show();
					$('#divkontrol').show();
					$("#jnsPelayanan").val(data.response.jnsKontrol);
					// alert(data.response.sep.jnsPelayanan);
					if(data.response.sep.jnsPelayanan=='Rawat Inap'){
						// Jika Kunjungan Pertama Pasc Rawat Inap
						$("#noRujukan").val(data.response.sep.noSep);
						// alert("POST RANAP")
						$('#jmlsep').val(0);
					}else{
						$("#noRujukan").val(data.response.sep.provPerujuk.noRujukan);
                        
					}
					// getdpjp();
                    getdpjp(data.response.jnsKontrol, data.response.tglRencanaKontrol, data.response.poliTujuan, data.response.kodeDokter);
					// $('#txtNorujuk').val(data.response.sep.provPerujuk.noRujukan);
					
					// $('#id_pengirim').val(data.response.sep.provPerujuk.kdProviderPerujuk);
					// $('#pjPasienDikirimOleh').val(data.response.sep.provPerujuk.nmProviderPerujuk);
					// $('#tglRujukan').val(data.response.sep.provPerujuk.tglRujukan)
					// $('#noRujukan').val(data.response.sep.provPerujuk.noRujukan);
					// $('#txtkdppkasalrujukan').val(data.response.sep.provPerujuk.kdProviderPerujuk);
					// $('#txtppkasalrujukan').val(data.response.sep.provPerujuk.nmProviderPerujuk);
					// $('#cbasalrujukan').val(data.response.sep.provPerujuk.asalRujukan);
					// $('#tujuan').val(data.response.poliTujuan);
					// $('#txtnmpoli').val(data.response.namaPoliTujuan);
					// $('#divkelasrawat').hide();
					// $('#divPoli').show();
				}else{
					$('#divkelasrawat').show();
					$('#divPoli').hide();
					$('#tujuan').val('');
					$('#txtnmpoli').val('');
				}
				$('#dpjpLayan').val(data.response.kodeDokter);
				$('#kodeDPJP').val(data.response.kodeDokter);
                $('#dpjpLayan').trigger('change');
                $('#kodeDPJP').trigger('change');
				$('#tglSep').val(data.response.tglRencanaKontrol);
				if(data.response.sep.provPerujuk.noRujukan==null) $('#tglRujukan').val(data.response.tglRencanaKontrol);
				else $('#tglRujukan').val(data.response.sep.provPerujuk.tglRujukan)
			} else {
				tampilkanPesan('warning', data.metaData.message)
			}
		},
		error: function (xhr) { // if error occured
			console.log(xhr.responseText);
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
		},
		complete: function () {
			// $('#btnbuatkontrol').prop("disabled",false);
			// $('#iconkontrol').removeClass('fa fa-spinner fa-spin')
			// $('#iconkontrol').addClass('fa fa-save')
		}
	});
	$('#form-list-kontrol').modal('hide');
}
function rencanaKontrolPeserta(){
    var nobpjs=$('#nobpjs').val();
	if(nobpjs==''){
		tampilkanPesan("warning","No Kartu Pasien Tidak Ditemukan");
		return false;
	}
	$.ajax({
		url         : base_url+"vclaim/monitoring/permintaankontrol/"+nobpjs,
		type        : "GET",
		data    : {get_param : 'value'},
		dataType    : "JSON",
		beforeSend  : function(){
			$('#rencanaKontrol').html("<i class='fa fa-refresh fa-spin'></i> Permintaan sedang diproses... Silahkan ditunggu");
		},
		success     : function(data){
			if(data.length>0){
				for (var i=0 ; i <= data.length-1; i++) {
					if(data[i].jnsKontrol==1) jnsKontrol='SPRI';
                    else jnsKontrol='Surat Kontrol';
					res+='<li class="list-group-item"><div class="row"><div class="col-md-4">No Surat </div><div class="col-md-8">: '+
					data[i].noSuratKontrol+"</div><div class='col-md-4'>Tgl Rencana Kontrol </div><div class='col-md-8'> : "+
					data[i].tglRencanaKontrol+"</div><div class='col-md-4'>No Sep </div><div class='col-md-8'> : "+
					data[i].noSEP+"</div><div class='col-md-4'>Jns Kontrol </div><div class='col-md-8'> : "+
					jnsKontrol+"</div><div class='col-md-4'>Poli </div><div class='col-md-8'> : "+
					data[i].namapoliKontrol+"</div><div class='col-md-4'>Dokter </div><div class='col-md-8'> : "+
					data[i].namaDokter+"</div></div>"+
					'</li>';
				}  
				var jnsKontrol=$('#jnsKontrol').val();
				$('#rencanaKontrol').html(res);
			}else{
                // alert("test")
				// alert(data.metaData.message);
				// var jnsKontrol=$('#jnsKontrol').val();
				// alert(jnsKontrol)
				var res = '<div class="alert alert-info">'+
                    '<strong>Info!</strong> Rencana Kontrol Hari Ini Belum ada'+
                '</div>';
				// if(jnsKontrol==1) res='Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a>';
				// else res='Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a>';
				$('#rencanaKontrol').html(res);
			} 
		},
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);                    
		}
	});
}

function getSep(nosep=""){
    if(nosep==""){
        // jika belum buat sep
        getdpjp();  
        $('#editsep').hide();
        $('#newsep').show();
    }else{
        $.ajax({
            url     : base_url+'vclaim/sep/edit/'+nosep,
            type    : "POST",
            dataType: "json",
            data    : {get_param : 'value'},
            success : function(data){
                console.log(data)
                if(data!=null){
                    if(data.jnsPelayanan=='R.Inap') var jp=1; else var jp=2;
                    getdpjp(jp,data.tglSep,data.tujuan,data.dpjpLayan);
                    $('#e-noSep').val(data.noSep);
                    if(data.jnsPelayanan=='R.Jalan'){
                        $('.ranap').hide();
                        $('#e-tujuan').val(data.tujuan);
                        $('#e-txtnmpoli').val(data.poli);
                        $('#divPoli').show();
                        $('#e-klsRawatHak').val(3);
                        $('#e-klsRawatNaik').val("");
                        $('#e-pembiayaan').val("");
                        $('#e-penanggungJawab').val("");
                        if(data.eksekutif==1) $("#e-eksekutif").prop('checked', true);
                        else $("#e-eksekutif").prop('checked', false);
                    }else{
                        // $('#e-klsRawatNaik').val(data.klsRawatHak);
                        $('#divPoli').hide();
                        $('#divkelasrawat').show();
                        // $('.ranap').show();
                        $('#e-klsRawatHak').val(data.klsRawatHak);
                        $('#e-klsRawatKet').val("Kelas "+ data.klsRawatHak);
                        if(data.klsRawatNaik==0) var naik=""; else var naik=data.klsRawatNaik;
                        if(data.pembiayaan==0) var pembiayaan=""; else pembiayaan=data.pembiayaan;
                        // alert(data.klsRawatNaik);
                        if(parseInt(data.klsRawatNaik)>0){
                            // alert('Naik Kelas')
                            $("#e-naikKelas").prop('checked', true);
                        }else{
                            $("#e-naikKelas").prop('checked', false);
                        }
                        e_naik()
                        $('#e-klsRawatNaik').val(naik);
                        $('#e-pembiayaan').val(pembiayaan);
                        $('#e-penanggungJawab').val(data.penanggungJawab);
                    }
                    
                    $('#e-noMR').val(data.noMr);
                    
                    // $('#e-tujuan').val(data.tujuan);
                    // alert(data.tujuan);
                    $('#e-catatan').val(data.catatan);
                    
                    // $('#tgl_lahir').val(tgl[2] +"-" +tgl[1]+"-"+tgl[0]);
                    // $('#e-diagAwal').val(data.diagAwal);
                    
                    // alert(data.cob)
                    if(data.cob==1) $("#e-cob").prop('checked', true);
                    else $("#e-cob").prop('checked', false);
                    if(data.tujuan=='MAT'){
                        $('#e-divkatarak').show();
                        if(data.eksekutif==1) $("e-katarak").prop('checked', true);
                        else $("e-katarak").prop('checked', false);
                    }else{
                        $('#e-divkatarak').hide();
                    }
                    
                    
                    $('#e-lakaLantas').val(data.lakaLantas);
                    $('#e-txtTglKejadian').val(data.tglKejadian);
                    $('#e-txtketkejadian').val(data.keterangan);
                    if(data.suplesi==1) $('#e-suplesi').prop('checked',true); else $('#e-suplesi').prop('checked',false);
                    // $('#e-suplesi').val(data.suplesi);
                    // e_lakalantas();
                    if(data.lakaLantas>0){
                        $('#e-divJaminan').show();
                        getProvinsikll('e-cbprovinsi',data.kdPropinsi);
                        getKabupatenkll('e-cbkabupaten',data.kdPropinsi,data.kdKabupaten)
                        getKecamatankll('e-cbkecamatan',data.kdKabupaten,data.kdKecamatan)
                    }else{
                        $('#e-divJaminan').hide();
                    }
                    
                    $('#e-noSepSuplesi').val(data.noSepSuplesi);
                    // $('#e-kdPropinsi').val(data.kdPropinsi);
                    // $('#e-kdKabupaten').val(data.kdKabupaten);
                    // $('#e-kdKecamatan').val(data.kdKecamatan);
                    $('#tglSep').val(data.tglSep);
                    var diagnosa=data.diagnosa;
                    if(diagnosa!=''){
                        var diagAwal=diagnosa.split(" - ");
                        $('#e-diagAwal').val(diagAwal[0]);
                        $('#e-txtnmdiagnosa').val(data.diagnosa);
                    }
                    
                    $('#e-dpjpLayan').val(data.dpjpLayan);
                    $('#e-noTelp').val(data.noTelp);
                    $('#editsep').show();
                    $('#newsep').hide();
                }else{
                    getdpjp();
                    $('#editsep').hide();
                    $('#newsep').show();
                }
                // $('#editsep').modal('show');
            }
        });
    }
	
}

function updateSEP(){
	var eksekutif = $('#e-eksekutif:checked').val();
	var cob = $('#e-cob:checked').val();
	var katarak = $('#e-katarak:checked').val();
	var lakaLantas = $('#e-lakaLantas').val();
	if(cob!=1) cob=0;
	if(katarak!=1) katarak=0;
	if(lakaLantas!=1) lakaLantas=0;
	if(eksekutif!=1) eksekutif=0;

	if(lakaLantas>0){
		lakaLantas=1;
		var penjamin = $('#e-penjamin').val();
		var tglKejadian=$('#e-txtTglKejadian').val();
		var keterangan=$('#e-txtketkejadian').val();
		var suplesi=$('#e-suplesi:checked').val();
		if(suplesi!=1) suplesi=0;
		if(suplesi==1){
			var noSepSuplesi=$('#e-noSepSuplesi').val();
		}else {
			var noSepSuplesi="";
		}
		var kdPropinsi=$('#e-cbprovinsi').val();
		var kdKabupaten=$('#e-cbkabupaten').val();
		var kdKecamatan=$('#e-cbkecamatan').val();
	}else{
		var penjamin = "";
		var tglKejadian="";
		var keterangan="";
		var suplesi=0;
		var noSepSuplesi="";
		var kdPropinsi="";
		var kdKabupaten="";
		var kdKecamatan="";
	}
	
	// var klsRawat=$('#klsRawat').val();
	// alert(klsRawat);
	var formData = {
		idx : $('#e-idx').val(),
		noSep : $('#e-noSep').val(),
		klsRawatHak: $('#e-klsRawatHak').val(), //Baru
		klsRawatNaik: $('#e-klsRawatNaik').val(), //Baru
		pembiayaan: $('#e-pembiayaan').val(), //Baru
		penanggungJawab: $('#e-penanggungJawab').val(), //Baru
		noMR: $('#e-noMR').val(),
		catatan : $('#e-catatan').val(),
		diagAwal : $('#e-diagAwal').val(),
		diagnosa: $('#e-txtnmdiagnosa').val(),
		tujuan : $('#e-tujuan').val(),
		poli : $('#e-txtnmpoli').val(),
		eksekutif : eksekutif,
		cob : cob,
		katarak : katarak,
		lakaLantas : lakaLantas,
		penjamin : penjamin,
		tglKejadian : tglKejadian,
		keterangan : keterangan,
		suplesi : suplesi,
		noSepSuplesi : noSepSuplesi, 
		kdPropinsi :kdPropinsi,
		kdKabupaten : kdKabupaten,
		kdKecamatan :kdKecamatan,
		dpjpLayan : $('#e-dpjpLayan').val(), //Baru
		namaDpjpLayan : $('#e-dpjpLayan :selected').html(), //Baru
		noTelp : $('#e-noTelp').val(),
		namaTujuan: $('#e-txtnmpoli').val(),
	}
	// console.clear();
	// console.log(formData);
    // return false;
	// var formData = new FormData($('#theform')[0]);
	$.ajax({
		url         : base_url+"/vclaim/sep/update",
		type        : "POST",
		data        : formData,
		dataType    : "JSON",
        beforeSend: function() {
            // setting a timeout
            $('#e-btnSimpan').prop('disabled',true);
            $('#iconBtnsimpan').removeClass("fa fa-save")
            $('#iconBtnsimpan').addClass("fa fa-spinner fa-spin")
        },
		success     : function(data){
			console.clear();
			console.log(data);
			if(data.metaData.code==200){
				tampilkanPesan('warning',data.metaData.message);
				// $('#editsep').modal('hide');
			}else{
				//alert(data.metaData.message);
				tampilkanPesan('warning',data.metaData.message);
			}  
		},
        complete: function() {
            $('#e-btnSimpan').prop('disabled',false);
            $('#iconBtnsimpan').removeClass("fa fa-spinner fa-spin")
            $('#iconBtnsimpan').addClass("fa fa-save")
        },
		error       : function(jqXHR,ajaxOption,errorThrown){
			console.log(jqXHR.responseText);  
            $('#e-btnSimpan').prop('disabled',false);
            $('#iconBtnsimpan').removeClass("fa fa-spinner fa-spin")
            $('#iconBtnsimpan').addClass("fa fa-save")                  
		}
	});
}

function batalkanSep(no_jaminan,nosurat='') {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan membatalkan No Sep ' + no_jaminan + '?',
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
				var url=base_url + "vclaim/sep/hapus/"+no_jaminan;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
                    beforeSend: function() {
                        // setting a timeout
                        $('#e-btnBatal').prop('disabled',true);
                        $('#btnBatalSep').removeClass("fa fa-print")
                        $('#btnBatalSep').addClass("fa fa-spinner fa-spin")
                    },
					success: function(data) {
						console.log(data);
                        if(data.metaData.code==200){
                            tampilkanPesan('success', data.metaData.message);
                            batalSepLokal(no_jaminan);
                            if(nosurat!=''){
                                hapusSurat(nosurat);
                            }
                        }else{
                            // batalSepLokal(no_jaminan);
                            tampilkanPesan('warning', data.metaData.message);
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

function batalDaftar(idx) {
	swal({
			title: "Konfirmasi",
			text: 'Apakah anda yakin akan membatalkan pendaftaran ini ?',
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
				var url=base_url + "rekammedis/pasien/bataldaftar/"+idx;
				$.ajax({
					url: url,
					type: "GET",
					data: {get_param : 'value'},
					dataType: "JSON",
					success: function(data) {
						tampilkanPesan('success', data.message);
						location.href=base_url+"rekammedis/pasien"
					},
					error: function(jqXHR, ajaxOption, errorThrown) {
						console.log(jqXHR.responseText);
						// alert(url)
					}
				});
			}
		});
}
function batalSepLokal(nosep){
	var url = base_url+"vclaim/sep/hapuslokal/"+nosep;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					console.clear();
					console.log(data);
					tampilkanPesan('success',data.message)
				}
			});
}
function backDate(){
    var pilih=$('#backdate').prop("checked");
    if(pilih==true){
        $('#tgllayan').prop("disabled",false);
    }else {
        var waktu=$('#waktusekarang').val();
        var sekarang=$('#u_sekarang').val();
        $('#tgllayan').val(waktu);
        $('#tglSep').val(sekarang);
        $('#tgllayan').prop("disabled",true);
    }
}
function hapusSurat(nosurat){
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
			var url = base_url+"vclaim/rencanakontrol/hapus/"+nosurat;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					console.clear();
					console.log(data);
					if(data.metaData.code==200){
						// riwayatKontrol()
						hapusSuratLokal(nosurat)
						tampilkanPesan('success',data.metaData.message)
					}else{
						tampilkanPesan('warning',data.metaData.message)
					}
				}
			});
		}
	})
}
function hapusSuratLokal(nosurat){
	var url = base_url+"vclaim/rencanakontrol/hapuslokal/"+nosurat;
			$.ajax({
				url     : url,
				type    : "GET",
				dataType: "json",
				data    :  {},
				success : function(data){
					console.clear();
					console.log(data);
					if(data.metaData.code==200){
						// riwayatKontrol()
						tampilkanPesan('success',data.metaData.message)
					}else{
						tampilkanPesan('warning',data.metaData.message)
					}
				}
			});
}
function pilihTipeRujukan(){
	var tipeRujukan=$('#r-tipeRujukan').val();
	$('#r-ppkDirujuk').val("");
	$('#ppkDirujuk').html("");
	if(tipeRujukan==2){
		$('#r-poliRujukan').val("");
		$('.inputPoli').hide();
	}else{
		$('.inputPoli').show();
	}
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
				getRujukanKeluar(data.response.rujukan.noRujukan);
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

function riwayatKunjunganRs(start,nomr){
    $('#start').val(start);
    var search = $('#q').val();
    var limit = $('#limit').val();
    var param = $('#param').val();
    var url = base_url+'rekammedis/pasien/datariwayat/'+nomr+'?keyword=' + search + "&start=" + start + "&limit=" + limit + "&param=" + param;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            $('#data').html(tabel);
            $('#pagination').html('');
        },
        success : function(data){
            //menghitung jumlah data
            if(data["status"]==true){
                $('#data').html('');
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
                    tabel+="<td><a class='btn btn-default btn-block btn-xs' href='"+base_url+"rekammedis/pasien/suksesdaftar/"+res[i]['idx']+"'>"+res[i]['reg_unit']+"</a></td>";
                    tabel+="<td>"+res[i]['jns_layanan']+"</td>";
                    tabel+="<td>"+res[i]['nama_poli']+"</td>";
                    tabel+="<td>"+res[i]['nama_dokter']+"</td>";
                    tabel+="<td>"+res[i]["tgl_lahir"]+"</td>";
                    tabel+="<td>"+res[i]['alamat']+"</td>";tabel+="</tr>";
                    $('#data').append(tabel);
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
                    /*curIdx  = Math.ceil((data["start"]/data["limit"])+1);
                    prev    = (curIdx-2) * data["limit"];
                    next    = (curIdx) * data["limit"];*/
        
                    
                    //var curSt=(curIdx*data["limit"])-jmlData;
                    //var mulai = start;
                    var curIdx = start;
                    var btn="btn-default";
                    //var lastSt=jmlPage;
                    var btnFirst="<button class='btn btn-default btn-sm' onclick='getData(1)'><span class='fa fa-angle-double-left'></span></button>";
                    if (curIdx > 1) {
                        var prevSt=curIdx-1;
                        btnFirst+="<button class='btn btn-default btn-sm' onclick='getData("+prevSt+")'><span class='fa fa-angle-left'></span></button>";
                    }
        
                    var btnLast="";
                    if(curIdx<jmlPage){
                        var nextSt=curIdx+1;
                        btnLast+="<button class='btn btn-default btn-sm' onclick='getData("+nextSt+")'><span class='fa fa-angle-right'></span></button>";
                    }
                    console.log(curIdx);
                    btnLast+="<button class='btn btn-default btn-sm' onclick='getData("+jmlPage+")'><span class='fa fa-angle-double-right'></span></button>";
                    
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
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getData("+ j +")'>" + j +"</button>";
                        }
                    }else{
        
                        for (var j = 1; j<=jmlPage; j++) {
                            if(curIdx==j)  btn="btn-success"; else btn= "btn-default";
                            btnIdx+="<button class='btn " +btn +" btn-sm' onclick='getData("+ j +")'>" + j +"</button>";
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

function getRujukanByNoSep(noSep){
    var url = base_url+'rekammedis/pasien/rujukankeluar/'+noSep;
    $.ajax({
        url     : url,
        type    : "GET",
        dataType: "json",
        data    : {get_param : 'value'},
        beforeSend: function () {
            // var tabel = "<tr id='loading'><td colspan='8'><b>Loading...</b></td></tr>";
            // $('#data').html(tabel);
            // $('#pagination').html('');
        },
        success : function(data){
            if(data.status==true){
                $('#r-tglRujukan').val(data.data.tglRujukan);
                $('#r-tglRencanaKunjungan').val(data.data.tglRencanaKunjungan);
                $('#r-tipeRujukan').val(data.data.tipeRujukan);
                $('#r-faskes').val(2);
                $('#ppkDirujuk').val(data.data.kodetujuanRujukan)
                $('#r-ppkDirujuk').val(data.data.namatujuanRujukan)
                $('#r-catatan').val(data.data.catatan)
                $('#diagRujukan').val(data.data.diagnosakode)
                $('#r-diagRujukan').val(data.data.diagnosanama)
                $('#r-poliRujukan').val(data.data.poliRujukan)
                // alert(data.data.poliRujukan)
                $('#namaPoliRujukan').val(data.data.namapoliTujuan);
                $('#r-noRujukan').val(data.data.noRujukan);
                var jnsPelayanan=data.data.jnsPelayanan;
                // alert(jnsPelayanan);
                if(jnsPelayanan==2) $('#rj').prop('checked',true);
                else $('#gd').prop('checked',true);
                var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="updateRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Update Rujukan</button>'+
                '<button type="button" class="btn btn-warning" id="btnCetakRujukan" onclick="cetakRujukan(\''+data.data.noRujukan+'\')"><span class="fa fa-print" ></span> Cetak Rujukan</button>'+
                '<button type="button" class="btn btn-danger" id="btnBatalRujukan"  onclick="batalRujukan(\''+data.data.noRujukan+'\')"><span class="fa fa-remove"></span> Batal</button>';
            }else{
                var tombol='<button type="button" class="btn btn-primary" id="btnBuatRujukan" onclick="createRujukan()"><span class="fa fa-save" id="iconBuatrujukan"></span> Buat Rujukan</button>';
            }
            
            $('#btnRujukan').html(tombol)
        },
        complete : function(){
            //$('#loading').hide();
        }
    });
}

function cetakRujukan(norujuk){
    window.open(base_url+"vclaim/rujukan/cetakrujukan/"+norujuk);
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
						getRujukanKeluar(norujukan);
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
function getRuangan(){
	var jns_layanan=$('#jns_layanan').val()
    if(jns_layanan==3) {
        $('#tujuan').val("IGD");
        $('#txtnmpoli').val("INSTALASI GAWAT DARURAT");
        $('#txtnmpoli').prop('readonly',true);
        $('#divkontrol').hide();
        $('#divRujukan').hide();
        $('#divnaikkelas').hide();
        $('#divkelasrawat').hide();
        $('#txtppkasalrujukan').prop('readonly',false)
        $('#jnsPelayanan').val(2)
        $('#cbAsalRujukan').val(1)
        $('#asalRujukan').val(1)
        $('.ranap').hide();
        $('#divPoli').show();
        getdpjp()
    }else{
        $('#jnsPelayanan').val(jns_layanan)
        if(jns_layanan==1){
            $('.ranap').show();
            $('#divnaikkelas').show();
            $('#divkelasrawat').show();
            $('#divRujukan').show();
            $('#divkontrol').show();
            $('#divPoli').hide();
            $('#tujuan').val('');
            $('#txtnmpoli').val('')
            $('#asalRujukan').val(2)
            $('#jnsKontrol').val(1)
            var ppkPelayanan = $('#ppkPelayanan').val();
            var namappkPelayanan=$('#namappkPelayanan').val();
            $('#ppkRujukan').val(ppkPelayanan);
            $('#txtppkasalrujukan').val(namappkPelayanan);
            $('#cariRujukan').prop('disabled',true)
            getdpjp();
        }else{
            $('.ranap').hide();
            $('#divPoli').show();
            $('#jnsKontrol').val(2)
            $('#divnaikkelas').hide();
            $('#divkelasrawat').hide();
			var nomr=$('#nomr').val();
			var nik=$('#nik').val();
			var nobpjs=$('#nobpjs').val();
            // alert(nomr);
			var kodebooking=$('#kodebooking').val();
			if(kodebooking=="") getAntrian(nomr,nik,nobpjs);
        }
    }
	var url = base_url+"rekammedis/pasien/ruangan/"+jns_layanan;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        if(data.status==true){
                var res=data.data;
                if(res.length==1){
                    getDokter(res[0].idx)
                }
                var option="<option value=''>Pilih Ruangan</option>";
                for (let i = 0; i < res.length; i++) {
                    const ele = res[i];
                    option+="<option value='"+ele.idx+"'>"+ele.ruang+"</option>";
                }
                $('#id_ruang').html(option);
                $('#jnsPelayanan').val(res[0].jnsPelayanan)

                var rujukan=data.rujukan;
                var ruj="<option value=''>Pilih Rujukan</option>";
                for (let i = 0; i < rujukan.length; i++) {
                    const ele = rujukan[i];
                    ruj+="<option value='"+ele.idx+"'>"+ele.rujukan+"</option>";
                }
                $('#id_rujuk').html(ruj)
            }
	    }
	});

}
function getAntrian(nomr,nik,nobpjs){
	var url = base_url+"rekammedis/pasien/booking/"+nomr+"/"+nik+"/"+nobpjs;
	$.ajax({
	    url     : url,
	    type    : "GET",
	    dataType: "json",
	    data    :  {},
	    success : function(data){
	        if(data.status==true){
                $('#kodebooking').val(data.data.kodebooking);
                $('#terkirim').val(data.data.terkirim);
            }else{
				$('#kodebooking').val("")
				alert(data.message);
			}
	    }
	});
}
function cekDomisili(){
    var domisilisesuaiktp=$('#u_domisilisesuaiktp').prop('checked');
    if(domisilisesuaiktp==true) $('.domisili').hide();
    else $('.domisili').show();
}
function showFormSEP(){
	$('.registrasi').removeClass('active');
	$('.sep').addClass('active');
    var jns_layanan = $('#jns_layanan').val();
    if(jns_layanan==2){
        cekHistoriPelayanan();
		// alert("Disini")
    }
    
}
function asesmenSep(){
	var jmlsep=$('#jmlsep').val();
	$('#asesmenTujuanKunjungan').val("");
	$('#asesmenJenisProsedure').val("");
	$('#asesmenKdPenunjang').val("");
	$('#asesmenPelayanan').val("");
	if(jmlsep>0){
		var tujuan = $('#tujuan').val();
		var tujuanRujukan = $('#tujuanRujukan').val();
		var tglRujukan=$('#tglRujukan').val();
		var tglSep=$('#tglSep').val();
		if(tglRujukan==tglSep){
			if(tujuan==tujuanRujukan){
				$('#asesmenProsedure').modal('show');
				return false;
			}
		}else{
			if(tujuan==tujuanRujukan && jmlsep>0){
				$('#asemenTujuanKunj').modal('show');
				var option='<option value="">Pilih </option>'+
				'<option value="1">Poli Spesialis tidak tersedia pada hari sebelumnya</option>'+
				'<option value="2">Jam poli telah berakhir pada hari sebelumnya</option>'+
				'<option value="3">Dokter spesialis dimaksud tidak praktek pada hari sebelumnya</option>'+
				'<option value="4">Atas instruksi rumah sakit</option>'+
				'<option value="5">Tujuan Kontrol</option>';
				$('#asesmenPelayanan').html(option);
				return false;
			}else{
				$('#asesmenTujuanLayanan').modal('show');
				var option='<option value="">Pilih </option>'+
				'<option value="1">Poli Spesialis tidak tersedia pada hari sebelumnya</option>'+
				'<option value="2">Jam poli telah berakhir pada hari sebelumnya</option>'+
				'<option value="3">Dokter spesialis dimaksud tidak praktek pada hari sebelumnya</option>'+
				'<option value="4">Atas instruksi rumah sakit</option>';
				$('#asesmenPelayanan').html(option);
			}
		}
	}else{
		createSEP();
	}
	
}
function pilihAsesmen() {
	var pilih = $('#c-assesmentPel').val();
	$('#assesmentPel').val(pilih);
	$('#asspel').modal('hide');
}

function cekKontrol() {
	var noSurat = $('#noSurat').val();
	var rujukan = $('#reg_unit').val();
	var url = base_url + "vclaim/rencanakontrol/nosuratkontrol/" + noSurat;
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			get_param: 'value'
		},
		beforeSend: function () {
			// setting a timeout
			$('#cariKontrol').prop("disabled", true);
			$('#iconCariKontrol').removeClass('fa fa-check')
			$('#iconCariKontrol').addClass('fa fa-spinner spin')
		},
		success: function (data) {
			console.log("6. " + data);
			if (data.metaData.code == 200) {
				var tgllayanan = $('#sekarang').val();
				$('#divkelasrawat').show();
				// $('.norujukan').hide();
				$("#asalRujukan").val("2");
				$("#tglRujukan").val("");
				$("#noRujukan").val(rujukan);
				$('#noRujukan').prop('readonly', false);
				$("#ppkRujukan").val('0304R001');
				// var tujuan=$('#tujuan').val();

				$('#tujuan').val("");
				$('#txtnmpoli').val("");
				$('#txtnmpoli').prop("readonly", true);

				if (data.response.poliTujuan == "MAT") $('#divkatarak').show();
				else $('#divkatarak').hide();

				$('#divPoli').hide();
				$('#cbasalrujukan').val("2").trigger('change'); //asalRujukan
				$('#txtkdppkasalrujukan').val('0304R001');
				$('#txtppkasalrujukan').val("RS ACHMAD MOCHTAR BUKITTINGGI");
				// $('#noSurat').val('');
				// Belum ditemukan
				$('#txtidkontrol').val('');
				$('#noSuratlama').val('');
				$('#txtpoliasalkontrol').val('');
				$('#txttglsepasalkontrol').val('');
				$('#txtnmdpjp').val('');
				$('#kodeDPJP').val('');
				$('#txttglsep').val(tgllayanan);
				$('#txtnmdiagnosa').val("");
				$('#diagAwal').val("");

				$('#divkelasrawat').show();
				$('#divRujukan').show();
				$('#divkontrol').show();
				$("#jnsPelayanan").val("1");
				getdpjp(data.response.jnsKontrol, data.response.tglRencanaKontrol, data.response.poliTujuan, data.response.kodeDokter);
			} else {
				tampilkanPesan('warning', data.metaData.message)
			}
		},
		error: function (xhr) { // if error occured
			$('#error').modal('show');
			$('#xhr').html(xhr.responseText)
			$('#cariKontrol').prop("disabled", false);
			$('#iconCariKontrol').removeClass('fa fa-spinner spin')
			$('#iconCariKontrol').addClass('fa fa-check')
		},
		complete: function () {
			$('#cariKontrol').prop("disabled", false);
			$('#iconCariKontrol').removeClass('fa fa-spinner spin')
			$('#iconCariKontrol').addClass('fa fa-check')
		},
	});
}
function rencanaKontrolBpjs() {
	var nokartu = $('#nobpjs').val();
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
					for (var i = 0; i <= data.response.list.length - 1; i++) {

						res += "<tr>";
						res += "<td>" + (i + 1) + "</td>";
						if (data["response"]["list"][i]['jnsKontrol'] == 2) {
							res += "<td>Surat Kontrol</td>";
						} else {
							res += "<td>SPRI</td>";
						}
						res += "<td><button onclick=setKontrol('" + data["response"]["list"][i]['noSuratKontrol'] + "') type='button' class='btn btnView btn-default btn-xs'>" + data["response"]["list"][i].noSuratKontrol + "</button></td>";
						res += "<td>" + data["response"]["list"][i]['namaPoliTujuan'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['namaDokter'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['tglTerbitKontrol'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['tglRencanaKontrol'] + "</td>";
						res += "<td>" + data["response"]["list"][i]['terbitSEP'] + "</td>";
						res += "</tr>";
					}
					var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol);
					if (jnsKontrol == 1) res += '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					else res += '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
				} else {
					// alert(data.metaData.message);
					var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol)

					if (jnsKontrol == 1) res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					else res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
				}
			}else{
				var jnsKontrol = $('#jnsKontrol').val();
					// alert(jnsKontrol)

					if (jnsKontrol == 1) res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="formSPRI()">Disini</a></td></tr>';
					else res = '<tr class="odd"><td colspan="4" valign="top">Untuk membuat surat kontrol baru klik <a href="#" onclick="riwayatKunjungan()">Disini</a></td></tr>';
					$('tbody#datakontrol').html(res);
			}
			
		},
		error: function (jqXHR, ajaxOption, errorThrown) {
			console.log(jqXHR.responseText);
		}
	});
}
function pilihAsesmenTujuan(){
	var asesmenTujuanKunjungan=$('#asesmenTujuanKunjungan').val();
	$('#tujuanKunj').val(asesmenTujuanKunjungan);
	$('#asemenTujuanKunj').modal('hide');
	if(asesmenTujuanKunjungan==1){
		// Munculkan Popup asesmen Prosedure
		$('#asesmenProsedure').modal('show')
	}else{
		// Munculkan Pop up AsesmenPelayanan
		$('#asesmenTujuanLayanan').modal('show')
	}
}
function pilihAsesmenPelayanan(){
	var asesmenPelayanan=$('#asesmenPelayanan').val();
	$('#assesmentPel').val(asesmenPelayanan);
	$('#asesmenTujuanLayanan').modal('hide');
	createSEP();
}
function pilihAsesmenProsedure(){
	var asesmenJenisProsedure=$('#asesmenJenisProsedure').val();
	$('#flagProcedure').val(asesmenJenisProsedure)
	if(asesmenJenisProsedure==0){
		$('#asesmenProsedure').modal('hide')
		$('#asesmenFalgProsedure').modal('show')
		
		// Prosedure tidak berkelanjutan
		
		var option="<option value=''>Pilih Poli</option>"
		+"<option value='7'>Laboratorium</option>"
		+"<option value='8'>USG</option>"
		+"<option value='9'>Farmasi</option>"
		+"<option value='10'>Lain-Lain</option>"
		+"<option value='11'>MRI</option>"
		$('#asesmenKdPenunjang').html(option);
		
	}else if(asesmenJenisProsedure==1){
		$('#asesmenProsedure').modal('hide')
		$('#asesmenFalgProsedure').modal('show')
		var option="<option value=''>Pilih Poli</option>"
		+"<option value='1'>Radioterapi</option>"
		+"<option value='2'>Kemoterapi</option>"
		+"<option value='3'>Rehabilitasi Medik</option>"
		+"<option value='4'>Rehabilitasi Psikososial</option>"
		+"<option value='5'>Transfusi Darah</option>"
		+"<option value='6'>Pelayanan Gigi</option>"
		$('#asesmenKdPenunjang').html(option);
	}else{
		return false;
	}
}
function pilihKdPenunjang(){
	var asesmenKdPenunjang=$('#asesmenKdPenunjang').val();
	$('#kdPenunjang').val(asesmenKdPenunjang);
	$('#asesmenFalgProsedure').modal('hide');
	createSEP();
}
function closeModal(){
    $('#form-sep').modal('hide');
}
function getListReservasi(){
    var nomr=$('#nomr').val();
    $.ajax({
		url: base_url + "rekammedis/pasien/reservasirajal/"+nomr,
		type: "GET",
		data: {
			get_param: 'value'
		},
		dataType: "JSON",
		beforeSend: function () {
			$('#cariReservasi').prop('disabled',true);
            $('#iconcariReservasi').removeClass('fa fa-search');
            $('#iconcariReservasi').addClass('fa-spinner fa-spin');

		},
		success: function (data) {
			if(data.status==true){
                var reservasi=data.data;
                var table="";
                $('#form-reservasi').modal('show')
                for (let i = 0; i < reservasi.length; i++) {
                    const ele = reservasi[i];
                    table+="<tr>"+
                        "<td>"+ele.jenislayanan+"</td>"+
                        "<td>"+ele.id_daftar+"</td>"+
                        "<td><button class='btn btn-default btn-xs' type='button' onclick='pilihReservasi(\""+ele.id_daftar+"\",\""+ele.reg_unit+"\",\""+ele.id_poli+"\",\""+ele.nama_poli+"\",\""+ele.id_dokter+"\",\""+ele.nama_dokter+"\",\""+ele.id_cara_bayar+"\",\""+ele.tgl_kunjungan+"\",\""+ele.no_sep+"\")'>"+ele.reg_unit+"</button></td>"+
                        "<td>"+ele.tgl_kunjungan+"</td>"+
                        "<td>"+ele.nama_poli+"</td>"+
                        "<td>"+ele.nama_dokter+"</td>"+
                    "</tr>"
                }
                $('#listreservasi').html(table);
            }
		},
        complete: function() {
            $('#cariReservasi').prop("disabled",false);
            $('#iconcariReservasi').removeClass('fa fa-spinner fa-spin')
            $('#iconcariReservasi').addClass('fa fa-search')
        },
		error: function (jqXHR, ajaxOption, errorThrown) {
			console.log(jqXHR.responseText);
		}
	});
}

function pilihReservasi(id_daftar,reg_unit,id_poli,nama_poli,id_dokter,nama_dokter,id_cara_bayar,tgl_kunjungan,sep){
    $('#id_daftar').val(id_daftar);
    $('#referensi').val(reg_unit);
    $('#id_cara_bayar').val(id_cara_bayar);
    $('#id_cara_bayar').trigger('change');
    $('#id_poli_asal').val(id_poli);
    $('#nama_poli_asal').val(nama_poli);
    $('#id_dokter_pengirim').val(id_dokter);
    $('#nama_dokter_pengirim').val(nama_dokter);
    $('#tglRujukan').val(tgl_kunjungan);
    if(sep=="") $('#noRujukan').val(reg_unit);
    else $('#noRujukan').val(sep)
    $('#sepasal').val(sep);
    $('#form-reservasi').modal('hide')
}

function e_naik() {
	// $('#naikKelas').prop("checked", true);
	if ($('#e-naikKelas').is(':checked')) {
		// alert("naik Kelas")
		var kelasRawat = $('#e-klsRawatHak').val();
		kelasRawatNaik = parseInt(kelasRawat) + 1;
		// if(kelasRawat==3) var rekomendasi=4;
		// else if(kelasRawat==2) var rekomendasi=3;
		// else var rekomendasi == 2
		var kelasnaik = '<div class="form-group">' +
			'<label class="col-md-3 col-sm-3 col-xs-12 control-label">Kelas Layanan</label>' +
			'<div class="col-md-9 col-sm-9 col-xs-12">' +
			'<select class="form-control" id="e-klsRawatNaik" name="klsRawatNaik" >';
		if (kelasRawatNaik == 1) kelasnaik += "<option value='1' selected >VVIP</option>";
		else kelasnaik += "<option value='1'>VVIP</option>";
		if (kelasRawatNaik == 2) kelasnaik += "<option value='2' selected >VIP</option>";
		else kelasnaik += "<option value='2'>VIP</option>";
		if (kelasRawatNaik == 3) kelasnaik += "<option value='3' selected >Kelas 1</option>";
		else kelasnaik += "<option value='3'>Kelas 1</option>";
		if (kelasRawatNaik == 4) kelasnaik += "<option value='4' selected >Kelas 2</option>";
		else kelasnaik += "<option value='4'>Kelas 2</option>";
		if (kelasRawatNaik == 5) kelasnaik += "<option value='5' selected >Kelas 3</option>";
		else kelasnaik += "<option value='5'>Kelas 3</option>";
		if (kelasRawatNaik == 6) kelasnaik += "<option value='6' selected >ICCU</option>";
		else kelasnaik += "<option value='6'>ICCU</option>";
		if (kelasRawatNaik == 7) kelasnaik += "<option value='7' selected >ICU</option>";
		else kelasnaik += "<option value='7'>ICU</option>";
		kelasnaik += "</select>";
		kelasnaik += "</div></div>";

		kelasnaik += '<div class="form-group">' +
			'<label class="col-md-3 col-sm-3 col-xs-12 control-label">Pembiayaan</label>' +
			'<div class="col-md-9 col-sm-9 col-xs-12">' +
			'<select class="form-control" id="e-pembiayaan" name="pembiayaan" onchange="getPj()">';
		kelasnaik += "<option value='1'>Pribadi</option>";
		kelasnaik += "<option value='2'>Pemberi Kerja</option>";
		kelasnaik += "<option value='3'>Asuransi Kesehatan Tambahan</option>";
		kelasnaik += "</select>";
		kelasnaik += "</div></div>";

        kelasnaik += '<div class="form-group">' +
			'<label class="col-md-3 col-sm-3 col-xs-12 control-label">Penanggung Jawab</label>' +
			'<div class="col-md-9 col-sm-9 col-xs-12">' +
			'<input type="text" class="form-control" name="penanggungJawab"  id="e-penanggungJawab" value="Pribadi">';
		kelasnaik += "</div></div>";

		$('#e-divnaikkelas').show();
	} else {
		var kelasnaik = '<input type="hidden" name="klsRawatNaik" id="e-klsRawatNaik" value="">' +
			'<input type="hidden" name="pembiayaan" id="e-pembiayaan" value="">' +
			'<input type="hidden" name="penanggungJawab" id="e-penanggungJawab" value="">';
		// alert("Tidak Naik Kelas")
		$('#e-divnaikkelas').hide();
	}
	$('#e-divnaikkelas').html(kelasnaik);


}

function getProvinsikll(id = 'cbprovinsi', pilih = '') {
	var url = base_url + "vclaim/referensi/propinsi";
	console.log(url);
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			get_param: 'value'
		},
		success: function (data) {
			if (data.metaData.code == 200) {
				var provinsi = data.response.list;
				var jmlData = provinsi.length;
				var option = "<option value='-'>Pilih</option>";
				for (var i = 0; i < jmlData; i++) {
					if (pilih == provinsi[i]["kode"]) option += "<option value='" + provinsi[i]["kode"] + "' selected>" + provinsi[i]["nama"] + "</option>";
					else option += "<option value='" + provinsi[i]["kode"] + "'>" + provinsi[i]["nama"] + "</option>";
				}

				$('#' + id).html(option);
			}

		}
	});

}

function getKabupatenkll(id = "cbkabupaten", idprov = 'cbprovinsi', pilih = '') {

	console.log(url);
	var provinsi = $('#' + idprov).val();
	// alert(provinsi);
	// alert("Get Kabupaten "+provinsi)
	var url = base_url + "vclaim/referensi/kabupaten/" + provinsi;
	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		data: {
			param1: provinsi
		},
		success: function (data) {
			if (data.metaData.code == 200) {
				var provinsi = data.response.list;
				var jmlData = provinsi.length;
				var option = "<option value=''>Pilih Kabupaten</option>";
				for (var i = 0; i < jmlData; i++) {
					if (pilih == provinsi[i]["kode"]) option += "<option value='" + provinsi[i]["kode"] + "' selected>" + provinsi[i]["nama"] + "</option>";
					else option += "<option value='" + provinsi[i]["kode"] + "'>" + provinsi[i]["nama"] + "</option>";
					// option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
				}
				$('#' + id).html(option);
			}
		}
	});
}

function getKecamatankll(id = "cbkecamatan", id_kab = "cbkabupaten", pilih = '') {

	var provinsi = $('#' + id_kab).val();
	// alert("Get Kecamatan "+provinsi)
	var url = base_url + "vclaim/referensi/kecamatan/" + provinsi;
	console.log(url);
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		data: {
			param: provinsi
		},
		success: function (data) {
			// // console.clear();
			console.log("data kecamatan...");
			console.log(data);
			if (data.metaData.code == 200) {
				var provinsi = data.response.list;
				var jmlData = provinsi.length;
				var option = "<option value=''>Pilih Kecamatan</option>";
				for (var i = 0; i < jmlData; i++) {
					if (pilih == provinsi[i]["kode"]) option += "<option value='" + provinsi[i]["kode"] + "' selected>" + provinsi[i]["nama"] + "</option>";
					else option += "<option value='" + provinsi[i]["kode"] + "'>" + provinsi[i]["nama"] + "</option>";
					// option+="<option value='"+provinsi[i]["kode"]+"'>"+provinsi[i]["nama"]+"</option>";
				}
				$('#' + id).html(option);
			}
		}
	});
}

function cekSuplesi() {
	// var sup=$('#suplesi:checked').val();
	if ($('#suplesi').prop('checked')) var sup = 1;
	else var sup = 0
	if (sup == 1) {
		$("#noSepSuplesi").prop("readonly", false)
		$("#cariSuplesi").prop("disabled", false)
	} else {
		$("#noSepSuplesi").prop("readonly", true)
		$("#cariSuplesi").prop("disabled", true)
	}
}
function e_cekSuplesi() {
	// var sup=$('#suplesi:checked').val();
	if ($('#e-suplesi').prop('checked')) var sup = 1;
	else var sup = 0
	if (sup == 1) {
		$("#e-noSepSuplesi").prop("readonly", false)
		$("#e-cariSuplesi").prop("disabled", false)
	} else {
		$("#e-noSepSuplesi").prop("readonly", true)
		$("#e-cariSuplesi").prop("disabled", true)
	}
}

function pilihTglBackdate(){
    var tgllayan=$('#tgllayan').val();
    $('#tglSep').val(tgllayan);
}
