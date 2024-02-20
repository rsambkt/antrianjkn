
function ulangi(){
    var nomorantri=$('#nomorantri').val();
    var panggil=parseInt(nomorantri)
    bunyi(panggil)
    tampilkanPesan('info','Nomor Antrian '+panggil+" dipanggil...")
}
function panggil(){
    var antrean = $("input[name='antrean']:checked").val();
    var dokter=$('#dokterJaga').val();
    var nomorantri=$('#nomorantri').val();
    var url = base_url + "rajal/home/panggilantrean?dokter="+dokter+"&jns="+antrean+"&nomor="+nomorantri;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            $('#btnPanggil').prop("disabled",true);
			$('#iconPanggil').removeClass('fa fa-ticket')
			$('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                $('#nomorantri').val(data.nomorantrean)
                $('#btnPanggil').prop("disabled",false);
                $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
                $('#iconPanggil').addClass('fa fa-ticket')
                getLastAntrean();
                // bunyi(data.nomorantrean)
                // tampilkanPesan('success',data["message"]);
                tampilkanPesan('info','Nomor Antrian '+data.nomorantrean+" dipanggil...")
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
				
            // $('#error').modal('show');
            // $('#xhr').html(xhr.responseText)
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
        complete: function() {
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
    });

    // bunyi(panggil)
    
}
function panggilAdmisi(){
    var antrean = $("input[name='antrean']:checked").val();
    var loket=$('#loketantri').val();
    var nomorantri=$('#nomorantri').val();
    var kodebooking=$('#kodebooking').val();
    var url = base_url + "rekammedis/home/panggilantrean?loket="+loket+"&jns="+antrean+"&nomor="+nomorantri+"&kodebooking="+kodebooking;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            $('#btnPanggil').prop("disabled",true);
			$('#iconPanggil').removeClass('fa fa-ticket')
			$('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                $('#nomorantri').val(data.nomorantrean)
                $('#btnPanggil').prop("disabled",false);
                $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
                $('#iconPanggil').addClass('fa fa-ticket')
				if(antrean!=3) getLastAntreanAdmisi();
                // bunyi(data.nomorantrean,'admisi')
                // tampilkanPesan('success',data["message"]);
                tampilkanPesan('info','Nomor Antrian '+data.nomorantrean+" dipanggil...")
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
				
            // $('#error').modal('show');
            // $('#xhr').html(xhr.responseText)
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
        complete: function() {
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
    });

    // bunyi(panggil)
    
}
function panggilFarmasi(){
    var antrean = $("input[name='antrean']:checked").val();
    var loket=$('#loketantri').val();
    var nomorantri=$('#nomorantri').val();
    var url = base_url + "farmasi/home/panggilantrean?loket="+loket+"&jns="+antrean+"&nomor="+nomorantri;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            $('#btnPanggil').prop("disabled",true);
			$('#iconPanggil').removeClass('fa fa-ticket')
			$('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                $('#nomorantri').val(data.nomorantrean)
                $('#btnPanggil').prop("disabled",false);
                $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
                $('#iconPanggil').addClass('fa fa-ticket')
                getLastAntreanFarmasi();
                // bunyi(data.nomorantrean,'farmasi')
                // tampilkanPesan('success',data["message"]);
                tampilkanPesan('info','Nomor Antrian '+data.nomorantrean+" dipanggil...")
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
				
            // $('#error').modal('show');
            // $('#xhr').html(xhr.responseText)
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
        complete: function() {
            $('#btnPanggil').prop("disabled",false);
            $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            $('#iconPanggil').addClass('fa fa-ticket')
        },
    });

    // bunyi(panggil)
    
}
function bunyi(panggil,jenis=''){
    totalwaktu=0;
	// alert(panggil)
    //MAINKAN SUARA NOMOR URUT
    setTimeout(function() {
        document.getElementById('bell').pause();
        document.getElementById('bell').currentTime=0;
        document.getElementById('bell').play();
    }, totalwaktu);
    totalwaktu=50;

    var bell = document.getElementById("bell");
    bell.onended = function() {
        setTimeout(function() {
            document.getElementById('suarabelnomorurut').pause();
            document.getElementById('suarabelnomorurut').currentTime=0;
            document.getElementById('suarabelnomorurut').play();
        }, totalwaktu);
    }
    
    
    var label=$('#labelantrean').val();
    if(label==""){
        // var la = document.getElementById("labelantrean");
        // la.onended = function() {
        //     setTimeout(function() {
        //         document.getElementById(la).pause();
        //         document.getElementById(la).currentTime=0;
        //         document.getElementById(la).play();
        //     }, totalwaktu);
        // }
        var suarabelnomorurut = document.getElementById("suarabelnomorurut");
    }else{
        var la = document.getElementById("suarabelnomorurut");
        la.onended = function() {
            setTimeout(function() {
                document.getElementById(label).pause();
                document.getElementById(label).currentTime=0;
                document.getElementById(label).play();
            }, totalwaktu);
        }
        var suarabelnomorurut = document.getElementById(label);
    }

    if(panggil<10){
        suarabelnomorurut.onended = function() {
            setTimeout(function() {
                document.getElementById('angka'+panggil).pause();
                document.getElementById('angka'+panggil).currentTime=0;
                document.getElementById('angka'+panggil).play();
            }, totalwaktu);
        }
        var selesai = document.getElementById('angka'+panggil);
    } else if(panggil==10){
        suarabelnomorurut.onended = function() {
            setTimeout(function() {
                document.getElementById('sepuluh').pause();
                document.getElementById('sepuluh').currentTime=0;
                document.getElementById('sepuluh').play();
            }, totalwaktu);
        }
        var selesai = document.getElementById('sepuluh');
    }else if(panggil==11){
        suarabelnomorurut.onended = function() {
            setTimeout(function() {
                document.getElementById('sebelas').pause();
                document.getElementById('sebelas').currentTime=0;
                document.getElementById('sebelas').play();
            }, totalwaktu);
        }
        var selesai = document.getElementById('sebelas');
    }else if(panggil<20){
        var angka=panggil%10;
        suarabelnomorurut.onended = function() {
            setTimeout(function() {
                document.getElementById('angka'+angka).pause();
                document.getElementById('angka'+angka).currentTime=0;
                document.getElementById('angka'+angka).play();
            }, totalwaktu);
        }
        var angka1=document.getElementById('angka'+angka);
        angka1.onended = function() {
            setTimeout(function() {
                document.getElementById('belas').pause();
                document.getElementById('belas').currentTime=0;
                document.getElementById('belas').play();
            }, totalwaktu);
        }
        var selesai = document.getElementById('belas');
    }else if(panggil<100){
        var mod10=panggil%10;
        // alert (mod10)
        if(mod10==0){
            var angka=panggil/10;
            suarabelnomorurut.onended = function() {
                setTimeout(function() {
                    document.getElementById('angka'+angka).pause();
                    document.getElementById('angka'+angka).currentTime=0;
                    document.getElementById('angka'+angka).play();
                }, totalwaktu);
            }
            var angka1=document.getElementById('angka'+angka);
            angka1.onended = function() {
                setTimeout(function() {
                    document.getElementById('puluh').pause();
                    document.getElementById('puluh').currentTime=0;
                    document.getElementById('puluh').play();
                }, totalwaktu);
            }
            var selesai = document.getElementById('puluh');
        }else{
            var angka=(panggil-mod10)/10;
            suarabelnomorurut.onended = function() {
                setTimeout(function() {
                    document.getElementById('angka'+angka).pause();
                    document.getElementById('angka'+angka).currentTime=0;
                    document.getElementById('angka'+angka).play();
                }, totalwaktu);
                
            }
            var angka1=document.getElementById('angka'+angka);
            angka1.onended = function() {
                setTimeout(function() {
                    document.getElementById('puluh').pause();
                    document.getElementById('puluh').currentTime=0;
                    document.getElementById('puluh').play();
                }, totalwaktu);
            }

            var angka2=document.getElementById('puluh');
            angka2.onended = function() {
                setTimeout(function() {
                    document.getElementById('puluhan'+mod10).pause();
                    document.getElementById('puluhan'+mod10).currentTime=0;
                    document.getElementById('puluhan'+mod10).play();
                }, totalwaktu);
            }
            var selesai = document.getElementById('puluhan'+mod10);
        }
    }else if(panggil==100){
        suarabelnomorurut.onended = function() {
            setTimeout(function() {
                document.getElementById('seratus').pause();
                document.getElementById('seratus').currentTime=0;
                document.getElementById('seratus').play();
            }, totalwaktu);
        }
        var selesai = document.getElementById('seratus');
    }else if(panggil<1000){
        var mod100=panggil%100;
        if(mod100==0){
            var angka=panggil/100;
            if(panggil<200){
                suarabelnomorurut.onended = function() {
                    setTimeout(function() {
                        document.getElementById('seratus').pause();
                        document.getElementById('seratus').currentTime=0;
                        document.getElementById('seratus').play();
                    }, totalwaktu);
                }
                var selesai=document.getElementById('seratus');
            }else{
                suarabelnomorurut.onended = function() {
                    setTimeout(function() {
                        document.getElementById('angka'+angka).pause();
                        document.getElementById('angka'+angka).currentTime=0;
                        document.getElementById('angka'+angka).play();
                    }, totalwaktu);
                }
                var angka1=document.getElementById('angka'+angka);
                angka1.onended = function() {
                    setTimeout(function() {
                        document.getElementById('ratus').pause();
                        document.getElementById('ratus').currentTime=0;
                        document.getElementById('ratus').play();
                    }, totalwaktu);
                }
                var selesai = document.getElementById('ratus');
            }

            
        }else{
            if(panggil<200){
                suarabelnomorurut.onended = function() {
                    setTimeout(function() {
                        document.getElementById('seratus').pause();
                        document.getElementById('seratus').currentTime=0;
                        document.getElementById('seratus').play();
                    }, totalwaktu);
                }
                var ratus=document.getElementById('seratus');
            }else{
                var angka=(panggil-mod100)/100;
                suarabelnomorurut.onended = function() {
                    setTimeout(function() {
                        document.getElementById('angka'+angka).pause();
                        document.getElementById('angka'+angka).currentTime=0;
                        document.getElementById('angka'+angka).play();
                    }, totalwaktu);
                }
                var angka1=document.getElementById('angka'+angka);
                angka1.onended = function() {
                    setTimeout(function() {
                        document.getElementById('ratus').pause();
                        document.getElementById('ratus').currentTime=0;
                        document.getElementById('ratus').play();
                    }, totalwaktu);
                }
                var ratus=document.getElementById('ratus');
            }
            // alert(mod100)
            if(mod100<10){
                
                ratus.onended = function() {
                    setTimeout(function() {
                        document.getElementById('ratusan'+mod100).pause();
                        document.getElementById('ratusan'+mod100).currentTime=0;
                        document.getElementById('ratusan'+mod100).play();
                    }, totalwaktu);
                }
                var selesai = document.getElementById('ratusan'+mod100);
            }else if(mod100==10){
                // var ratus=document.getElementById('ratus');
                ratus.onended = function() {
                    setTimeout(function() {
                        document.getElementById('sepuluh').pause();
                        document.getElementById('sepuluh').currentTime=0;
                        document.getElementById('sepuluh').play();
                    }, totalwaktu);
                }
                var selesai = document.getElementById('sepuluh');
            }else if(mod100==11){
                // var ratus=document.getElementById('ratus');
                ratus.onended = function() {
                    setTimeout(function() {
                        document.getElementById('sebelas').pause();
                        document.getElementById('sebelas').currentTime=0;
                        document.getElementById('sebelas').play();
                    }, totalwaktu);
                }
                var selesai = document.getElementById('sebelas');
            }else if(mod100<20){
                var angkaratusan=parseInt(mod100)%10;
                // var ratus=document.getElementById('ratus');
                ratus.onended = function() {
                    setTimeout(function() {
                        document.getElementById('ratusan'+angkaratusan).pause();
                        document.getElementById('ratusan'+angkaratusan).currentTime=0;
                        document.getElementById('ratusan'+angkaratusan).play();
                    }, totalwaktu);
                }
                var belas=document.getElementById('ratusan'+angkaratusan);
                belas.onended = function() {
                    setTimeout(function() {
                        document.getElementById('belas').pause();
                        document.getElementById('belas').currentTime=0;
                        document.getElementById('belas').play();
                    }, totalwaktu);
                }
                var selesai = document.getElementById('belas');
            }else{
                var mod10=mod100%10;
                // var ratus=document.getElementById('ratus');
                var angkaratusan=(mod100-mod10)/10;
                if(mod10==0){
                    // alert(angkaratusan)
                    ratus.onended = function() {
                        setTimeout(function() {
                            document.getElementById('ratusan'+angkaratusan).pause();
                            document.getElementById('ratusan'+angkaratusan).currentTime=0;
                            document.getElementById('ratusan'+angkaratusan).play();
                        }, totalwaktu);
                    }
                    var puluh=document.getElementById('ratusan'+angkaratusan);
                    puluh.onended = function() {
                        setTimeout(function() {
                            document.getElementById('puluh').pause();
                            document.getElementById('puluh').currentTime=0;
                            document.getElementById('puluh').play();
                        }, totalwaktu);
                    }
                    var selesai = document.getElementById('puluh');
                }else{
                    ratus.onended = function() {
                        setTimeout(function() {
                            document.getElementById('ratusan'+angkaratusan).pause();
                            document.getElementById('ratusan'+angkaratusan).currentTime=0;
                            document.getElementById('ratusan'+angkaratusan).play();
                        }, totalwaktu);
                    }
                    var puluh=document.getElementById('ratusan'+angkaratusan);
                    puluh.onended = function() {
                        setTimeout(function() {
                            document.getElementById('puluh').pause();
                            document.getElementById('puluh').currentTime=0;
                            document.getElementById('puluh').play();
                        }, totalwaktu);
                    }
                    var angka=document.getElementById('puluh');
                    angka.onended = function() {
                        setTimeout(function() {
                            document.getElementById('angka'+mod10).pause();
                            document.getElementById('angka'+mod10).currentTime=0;
                            document.getElementById('angka'+mod10).play();
                        }, totalwaktu);
                    }
                    var selesai=document.getElementById('angka'+mod10);
                }
                
            }
        }
    }

    selesai.onended = function() {
        setTimeout(function() {
            document.getElementById('poliklinik').pause();
            document.getElementById('poliklinik').currentTime=0;
            document.getElementById('poliklinik').play();
        }, totalwaktu);
    }

    var ruang = document.getElementById('poliklinik');
    ruang.onended = function() {
        setTimeout(function() {
            document.getElementById('ruang').pause();
            document.getElementById('ruang').currentTime=0;
            document.getElementById('ruang').play();
        }, totalwaktu);
		if(jenis==''){
			getLastAntrean();
		}else if(jenis=='admisi'){
			getLastAntreanAdmisi();
		}else{
			getLastAntreanFarmasi();
		}
        
    }
}

function getLastAntrean(){
    var dokterjaga=$('#dokterJaga').val();
    var antrean = $("input[name='antrean']:checked").val();
    var curent=$('#nomorantri').val();
    if(antrean>1) {
        
        var url = base_url + "rajal/home/lastantrean/"+dokterjaga+"/"+antrean;
    }
    else var url = base_url + "rajal/home/lastantrean/"+dokterjaga+"/"+antrean
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                if(data.data==null){
                    var dokter=$('#dokterJaga :selected').html();
                    $('#v-nomorAntri').html('Kosong');
                    $('#nomorantri').val('0');
                    $('#v-namadokter').html(dokter);
                    $('#v-dokterjuga').html(dokter);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html('-');
                    $('#v-waktudaftar').html('-');
                    $('#v-waktupanggil').html('-');
                    $('#v-nik').html('-');
                    $('#v-nama').html('-');
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="0">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntrean(0);
                    }
                    var btn='<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Antrean Habis</button>';
                    $('#tombolPanggil').html(btn);
                }else{
                    var dokter=$('#dokterJaga :selected').html();
                    if(data.data.labelantrean=='' || data.data.labelantrean == null) $('#v-nomorAntri').html(data.data.nomorantrean);
                    else $('#v-nomorAntri').html(data.data.labelantrean+"."+data.data.nomorantrean);
                    $('#nomorantri').val(data.data.nomorantrean);
                    $('#v-namadokter').html(data.data.namadokter);
                    $('#v-dokterjuga').html(data.data.namadokter);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html(data.data.norm);
                    $('#v-waktudaftar').html(data.sekarang);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nik').html(data.data.nik);
                    $('#v-nama').html(data.data.nama);

                    // $('#id_daftar').val(data.data.id_daftar);
                    $('#idx_pendaftaran').val(data.data.idx_pendaftaran);
                    $('#kodebooking').val(data.data.kodebooking);
                    $('#labelantrean').val(data.data.labelantrean);
                    // $('#reg_unit').val(data.data.reg_unit);
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="'+data.data.nomorantrean+'">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntrean(data.data.nomorantrean);
                    }
                    if(data.data.status==1){
                        if(data.data.taskid==4) {
							var disselesai="";
                            var btn='<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Pasien Sedang Dilayani</button>';
                            var skipdis="disabled";
                            var bataldis="disabled";
                        }else {
							var disselesai="disabled";
                            var btn = '<button type="button" class="btn btn-warning btn-sm btn-block" onclick="panggil()"><span class="fa fa-ticket"></span> Panggil Ulang</button>'
                            var skipdis="";
                            var bataldis="";
                        }
                        if(antrean==1){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-3">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayan()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-3">'+'<button type="button" class="btn btn-primary btn-sm btn-block" onclick="selesaiLayan()" id="btnSelesailayan" '+disselesai+'><span id="iconSelesaiLayan" class="fa fa-check"></span>Selesai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-3"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skip()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-3"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove "></span> Batal</button></div>'+
                            '</div>';
                        }else  if(antrean==2){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayan()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skip()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }else{
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-6">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayan()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }
                        
                    }else{
                        var button='<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggil()"><span class="fa fa-ticket"></span> Panggil Berikutnya</button>';
                        button+='<div class="row top10">'+
                            '<div class="col-md-6">'+'<button type="button" class="btn btn-info btn-sm btn-block" onclick="skip()" id="btnMulailayan"><span  class="fa fa-arrow-right"></span> Lewati</button>'+
                            '</div>'+
                            '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove " ></span> Batal</button></div>'+
                        '</div>'
                    }
                    $('#tombolPanggil').html(button);
                }
                
            } else {
                tampilkanPesan('error',data["message"], 'Error');
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function getLastAntreanAdmisi(){
    var loket=$('#loketantri').val();
    var antrean = $("input[name='antrean']:checked").val();
    var curent=$('#nomorantri').val();
    if(antrean>1) {
        
        var url = base_url + "rekammedis/home/lastantrean/"+loket+"/"+antrean;
    }
    else var url = base_url + "rekammedis/home/lastantrean/"+loket+"/"+antrean
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                if(data.data==null){
                    // var dokter=$('#dokterJaga :selected').html();
                    $('#v-nomorAntri').html('Kosong');
                    $('#nomorantri').val('0');
                    $('#v-namadokter').html('');
                    $('#v-dokterjuga').html('');
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html('-');
                    $('#v-waktudaftar').html('-');
                    $('#v-waktupanggil').html('-');
                    $('#v-nik').html('-');
                    $('#v-nama').html('-');
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="0">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanAdmisi(0);
                    }
                    var btn='<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Antrean Habis</button>';
                    $('#tombolPanggil').html(btn);
                }else{
                    // var dokter=$('#dokterJaga :selected').html();
                    if(data.data.labelantrean=='' || data.data.labelantrean == null) $('#v-nomorAntri').html(data.data.antreanadmisi);
                    else $('#v-nomorAntri').html(data.data.antreanadmisi);
                    $('#nomorantri').val(data.data.angkaantreanadmisi);
                    $('#v-namadokter').html(data.data.namadokter);
                    $('#v-dokterjuga').html(data.data.namadokter);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html(data.data.norm);
                    $('#v-waktudaftar').html(data.sekarang);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nik').html(data.data.nik);
                    $('#v-nama').html(data.data.nama);
                    // $('#id_daftar').val(data.data.id_daftar);
                    $('#idx_pendaftaran').val(data.data.idx_pendaftaran);
                    $('#kodebooking').val(data.data.kodebooking);
                    $('#labelantrean').val(data.data.labelantrianadmisi);
					$('#norm').val(data.data.norm);
					$('#pasienbaru').val(data.data.pasienbaru);
                    // $('#reg_unit').val(data.data.reg_unit);
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="'+data.data.angkaantreanadmisi+'">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanAdmisi(data.data.angkaantreanadmisi);
                    }
                    if(data.data.statusadmisi==1){
                        var btn = '<button type="button" class="btn btn-warning btn-sm btn-block" onclick="panggilAdmisi()"><span class="fa fa-ticket"></span> Panggil Ulang</button>'
                        var skipdis="";
                        var bataldis="";
                        if(antrean==1){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-3">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-3">'+'<button type="button" class="btn btn-primary btn-sm btn-block" onclick="selesaiLayanAdmisi()" id="btnSelesailayan"><span id="iconSelesaiLayan" class="fa fa-check"></span>Selesai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-3"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-3"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove "></span> Batal</button></div>'+
                            '</div>';
                        }else  if(antrean==2){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }else{
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-6">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }
                        
                    }else{
                        var button='<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilAdmisi()"><span class="fa fa-ticket"></span> Panggil Berikutnya</button>';
                        button+='<div class="row top10">'+
                            '<div class="col-md-6">'+'<button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()" id="btnMulailayan"><span  class="fa fa-arrow-right"></span> Lewati</button>'+
                            '</div>'+
                            '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove " ></span> Batal</button></div>'+
                        '</div>'
                    }
                    $('#tombolPanggil').html(button);
                }
                
            } else {
                tampilkanPesan('error',data["message"], 'Error');
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function getNextAntreanAdmisi(){
    var loket=$('#loketantri').val();
    var antrean = $("input[name='antrean']:checked").val();
    var curent=$('#nomorantri').val();
    if(antrean>1) {
        
        var url = base_url + "rekammedis/home/nextantrean/"+loket+"/"+antrean+"/"+curent;
    }
    else var url = base_url + "rekammedis/home/nextantrean/"+loket+"/"+antrean+"/"+curent
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                if(data.data==null){
                    // var dokter=$('#dokterJaga :selected').html();
                    $('#v-nomorAntri').html('Kosong');
                    $('#nomorantri').val('0');
                    $('#v-namadokter').html('');
                    $('#v-dokterjuga').html('');
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html('-');
                    $('#v-waktudaftar').html('-');
                    $('#v-waktupanggil').html('-');
                    $('#v-nik').html('-');
                    $('#v-nama').html('-');
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="0">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanAdmisi(0);
                    }
                    var btn='<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Antrean Habis</button>';
                    $('#tombolPanggil').html(btn);
                }else{
                    // var dokter=$('#dokterJaga :selected').html();
                    if(data.data.labelantrean=='' || data.data.labelantrean == null) $('#v-nomorAntri').html(data.data.antreanadmisi);
                    else $('#v-nomorAntri').html(data.data.antreanadmisi);
                    $('#nomorantri').val(data.data.angkaantreanadmisi);
                    $('#v-namadokter').html(data.data.namadokter);
                    $('#v-dokterjuga').html(data.data.namadokter);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html(data.data.norm);
                    $('#v-waktudaftar').html(data.sekarang);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nik').html(data.data.nik);
                    $('#v-nama').html(data.data.nama);

                    // $('#id_daftar').val(data.data.id_daftar);
                    $('#idx_pendaftaran').val(data.data.idx_pendaftaran);
                    $('#kodebooking').val(data.data.kodebooking);
                    $('#labelantrean').val(data.data.labelantrianadmisi);
                    // $('#reg_unit').val(data.data.reg_unit);
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="'+data.data.angkaantreanadmisi+'">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanAdmisi(data.data.angkaantreanadmisi);
                    }
                    if(data.data.statusadmisi==1){
                        var btn = '<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilAdmisi()"><span class="fa fa-ticket"></span> Panggil Ulang</button>'
                        var skipdis="";
                        var bataldis="";
                        if(antrean==1){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove "></span> Batal</button></div>'+
                            '</div>';
                        }else  if(antrean==2){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }else{
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-6">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanAdmisi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Mulai Layani</button>'+
                                '</div>'+
                                '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }
                        
                    }else{
                        var button='<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilAdmisi()"><span class="fa fa-ticket"></span> Panggil Berikutnya</button>';
                        button+='<div class="row top10">'+
                            '<div class="col-md-6">'+'<button type="button" class="btn btn-info btn-sm btn-block" onclick="skipAdmisi()" id="btnMulailayan"><span  class="fa fa-arrow-right"></span> Lewati</button>'+
                            '</div>'+
                            '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove " ></span> Batal</button></div>'+
                        '</div>'
                    }
                    $('#tombolPanggil').html(button);
                }
                
            } else {
                tampilkanPesan('error',data["message"], 'Error');
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}

function getLastAntreanFarmasi(){
    var loket=$('#loketantri').val();
    var antrean = $("input[name='antrean']:checked").val();
    var curent=$('#nomorantri').val();
    if(antrean>1) {
        var url = base_url + "farmasi/home/lastantrean/"+antrean;
    }
    else var url = base_url + "farmasi/home/lastantrean/"+antrean
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                if(data.data==null){
                    // var dokter=$('#dokterJaga :selected').html();
                    $('#v-nomorAntri').html('Kosong');
                    $('#nomorantri').val('0');
                    $('#v-namadokter').html('');
                    $('#v-dokterjuga').html('');
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html('-');
                    $('#v-waktudaftar').html('-');
                    $('#v-waktupanggil').html('-');
                    $('#v-nik').html('-');
                    $('#v-nama').html('-');
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="0">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanFarmasi(0);
                    }
                    var btn='<button type="button" class="btn btn-danger btn-sm btn-block" disabled><span class="fa fa-ticket"></span> Antrean Habis</button>';
                    $('#tombolPanggil').html(btn);
                }else{
                    // var dokter=$('#dokterJaga :selected').html();
                    $('#v-nomorAntri').html(data.data.antreanfarmasi);
                    $('#nomorantri').val(data.data.angkaantreanfarmasi);
                    $('#v-namadokter').html(data.data.namadokter);
                    $('#v-dokterjuga').html(data.data.namadokter);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nomr').html(data.data.norm);
                    $('#v-waktudaftar').html(data.sekarang);
                    $('#v-waktupanggil').html(data.sekarang);
                    $('#v-nik').html(data.data.nik);
                    $('#v-nama').html(data.data.nama);

                    // $('#id_daftar').val(data.data.id_daftar);
                    $('#idx_pendaftaran').val(data.data.idx_pendaftaran);
                    $('#kodebooking').val(data.data.kodebooking);
                    $('#labelantrean').val(data.data.labelantrianfarmasi);
                    // $('#reg_unit').val(data.data.reg_unit);
                    if(antrean==1){
                        var nomor='<input type="hidden" name="nomorantri" id="nomorantri" class="form-control pull-right" value="'+data.data.angkaantreanadmisi+'">';
                        $('#v-nomorantrean').html(nomor);
                    }else{
                        // listAntreanFarmasi(data.data.angkaantreanadmisi);
                    }
                    if(data.data.statusfarmasi==1){
                        var btn = '<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilFarmasi()"><span class="fa fa-ticket"></span> Panggil Ulang</button>'
                        var skipdis="";
                        var bataldis="";
                        if(antrean==1){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanFarmasi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Selesai Serahkan Resep</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipFarmasi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove "></span> Batal</button></div>'+
                            '</div>';
                        }else  if(antrean==2){
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-4">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanFarmasi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Selesai Serahkan Resep</button>'+
                                '</div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-info btn-sm btn-block" onclick="skipFarmasi()"><span class="fa fa-arrow-right " '+skipdis+'></span> Lewati</button></div>'+
                                '<div class="col-md-4"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }else{
                            var button=btn+
                            '<div class="row top10">'+
                                '<div class="col-md-6">'+'<button type="button" class="btn btn-success btn-sm btn-block" onclick="mulaiLayanFarmasi()" id="btnMulailayan"><span id="iconMulaiLayan" class="fa fa-check"></span>Selesai Serahkan Resep</button>'+
                                '</div>'+
                                '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()" '+bataldis+'><span class="fa fa-remove " ></span> Batal</button></div>'+
                            '</div>';
                        }
                        
                    }else{
                        var button='<button type="button" class="btn btn-success btn-sm btn-block" onclick="panggilFarmasi()"><span class="fa fa-ticket"></span> Panggil Berikutnya</button>';
                        button+='<div class="row top10">'+
                            '<div class="col-md-6">'+'<button type="button" class="btn btn-info btn-sm btn-block" onclick="skipFarmasi()" id="btnMulailayan"><span  class="fa fa-arrow-right"></span> Lewati</button>'+
                            '</div>'+
                            '<div class="col-md-6"><button type="button" class="btn btn-danger btn-sm btn-block" onclick="batalAntrean()"><span class="fa fa-remove " ></span> Batal</button></div>'+
                        '</div>'
                    }
                    $('#tombolPanggil').html(button);
                }
                
            } else {
                tampilkanPesan('error',data["message"], 'Error');
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function listAntrean(pilih){
    var dokterjaga=$('#dokterJaga').val();
    var antrean = $("input[name='antrean']:checked").val();
    var url = base_url + "rajal/home/listantrean/"+dokterjaga+"/"+antrean;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                var row=data.data;
                var option='<div class="form-group">'+
                '<label class="control-label col-sm-2" for="pwd">Nomor Antrian:</label>'+
                '<div class="col-sm-10">'+
                '<select name="nomorantri" id="nomorantri" class="form-control" onchange="getLastAntrean()">';
                for (let index = 0; index < row.length; index++) {
                    const baris = row[index];
                    if(baris.nomorantrean==pilih) option+='<option value="'+baris.nomorantrean+'" selected>'+baris.nomorantrean+'</option>';
                    else option+='<option value="'+baris.nomorantrean+'">'+baris.nomorantrean+'</option>';
                }
                option+="</select></div></div>";
                $('#v-nomorantrean').html(option)
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function listAntreanAdmisi(pilih){
    var loketantri=$('#loketantri').val();
    var antrean = $("input[name='antrean']:checked").val();
    var url = base_url + "rekammedis/home/listantrean/"+loketantri+"/"+antrean;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                var row=data.data;
                var option='<div class="form-group">'+
                '<label class="control-label col-sm-2" for="pwd">Nomor Antrian:</label>'+
                '<div class="col-sm-10">'+
                '<select name="nomorantri" id="nomorantri" class="form-control" onchange="getLastAntreanAdmisi()">';
                for (let index = 0; index < row.length; index++) {
                    const baris = row[index];
                    if(baris.nomorantrean==pilih) option+='<option value="'+baris.nomorantrean+'" selected>'+baris.nomorantrean+'</option>';
                    else option+='<option value="'+baris.nomorantrean+'">'+baris.nomorantrean+'</option>';
                }
                option+="</select></div></div>";
                $('#v-nomorantrean').html(option)
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function listAntreanFarmasi(pilih){
    var loketantri=$('#loketantri').val();
    var antrean = $("input[name='antrean']:checked").val();
    var url = base_url + "farmasi/home/listantrean/"+loketantri+"/"+antrean;
    console.log(url);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
            // setting a timeout
            // $('#btnPanggil').prop("disabled",true);
			// $('#iconPanggil').removeClass('fa fa-arrow-right')
			// $('#iconPanggil').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if (data.status == true) {
                var row=data.data;
                var option='<div class="form-group">'+
                '<label class="control-label col-sm-2" for="pwd">Nomor Antrian:</label>'+
                '<div class="col-sm-10">'+
                '<select name="nomorantri" id="nomorantri" class="form-control" onchange="getLastAntreanAdmisi()">';
                for (let index = 0; index < row.length; index++) {
                    const baris = row[index];
                    if(baris.nomorantrean==pilih) option+='<option value="'+baris.nomorantrean+'" selected>'+baris.nomorantrean+'</option>';
                    else option+='<option value="'+baris.nomorantrean+'">'+baris.nomorantrean+'</option>';
                }
                option+="</select></div></div>";
                $('#v-nomorantrean').html(option)
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
			// $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
        complete: function() {
            // $('#btnPanggil').prop("disabled",false);
            // $('#iconPanggil').removeClass('fa fa-spinner fa-spin')
            // $('#iconPanggil').addClass('fa fa-arrow-right')
        },
    });
}
function mulaiLayanAdmisi(){
	var pasienbaru=$('#pasienbaru').val();
	// alert(pasienbaru)
	if(pasienbaru==1){
		var kodebooking = $('#kodebooking').val();
		var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+2;
		$.ajax({
			url: url,
			type: "GET",
			data: {},
			dataType: 'JSON',
			beforeSend: function () {
				// setting a timeout
				$('#btnMulailayan').prop("disabled",true);
				$('#iconMulaiLayan').removeClass('fa fa-check')
				$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
			},
			success: function (data) {
				if(data.metadata.code==200){
					var idx=$('#idx_pendaftaran').val();
					tampilkanPesan('success',data.metadata.message);
					window.location.href=base_url + "rekammedis/pasien/tambah?kodebooking="+kodebooking;
				}else{
					// tampilkanPesan('warning',data.metadata.message,'');
					swal({
						title: data.metadata.message,
						text: "Apakah anda akan melanjutkan proses layanan!",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: '#DD6B55',
						confirmButtonText: 'Yes, I am sure!',
						cancelButtonText: "No, cancel it!",
						closeOnConfirm: false,
						closeOnCancel: false
					},
					function(isConfirm){
						if (isConfirm){
							var idx=$('#idx_pendaftaran').val();
							// alert(idx);
							window.location.href=base_url + "rekammedis/pasien/tambah?kodebooking="+kodebooking
						} else {
							tampilkanPesan('warning','Ok')
						}
					});
				}
			},
			error: function(xhr) { // if error occured
				$('#btnMulailayan').prop("disabled",false);
				$('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
				$('#iconMulaiLayan').addClass('fa fa-check');
			},
			complete: function() {
				$('#btnMulailayan').prop("disabled",false);
				$('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
				$('#iconMulaiLayan').addClass('fa fa-check')
			},
		});
	}else{
		var nomr=$('#norm').val();
		var kodebooking=$('#kodebooking').val();
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
						var url=base_url+"rekammedis/pasien/registrasi/"+nomr+"?kodebooking="+kodebooking;
						location.href=url;
					}else{
						var url=base_url+"rekammedis/pasien/tambah?nomr="+nomr+"&kodebooking="+kodebooking;
						location.href=url;
					}
				}else{
					var url=base_url+"rekammedis/pasien/tambah";
					location.href=url;
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {

			}
		});
	}
	
}
function cetakAntrian()
{
	var printContents = document.getElementById('cetakantrian').innerHTML;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
}
function selesaiLayanAdmisi(){
	var pasienbaru=$('#pasienbaru').val();
	// alert(pasienbaru)
	var kodebooking = $('#kodebooking').val();
	var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+3;
	$.ajax({
		url: url,
		type: "GET",
		data: {},
		dataType: 'JSON',
		beforeSend: function () {
			// setting a timeout
			$('#btnSelesailayan').prop("disabled",true);
			$('#iconSelesaiLayan').removeClass('fa fa-check')
			$('#iconSelesaiLayan').addClass('fa fa-spinner fa-spin')
		},
		success: function (data) {
			if(data.metadata.code==200){
				var idx=$('#idx_pendaftaran').val();
				tampilkanPesan('success',data.metadata.message);
				location.reload();
			}else{
				// tampilkanPesan('warning',data.metadata.message,'');
				
			}
		},
		error: function(xhr) { // if error occured
			$('#btnSelesailayan').prop("disabled",false);
			$('#iconSelesaiLayan').removeClass('fa fa-spinner fa-spin')
			$('#iconSelesaiLayan').addClass('fa fa-check');
		},
		complete: function() {
			$('#btnSelesailayan').prop("disabled",false);
			$('#iconSelesaiLayan').removeClass('fa fa-spinner fa-spin')
			$('#iconSelesaiLayan').addClass('fa fa-check')
		},
	});
	
}
function selesaiLayan(){
	var pasienbaru=$('#pasienbaru').val();
	// alert(pasienbaru)
	var kodebooking = $('#kodebooking').val();
	var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+5;
	$.ajax({
		url: url,
		type: "GET",
		data: {},
		dataType: 'JSON',
		beforeSend: function () {
			// setting a timeout
			$('#btnSelesailayan').prop("disabled",true);
			$('#iconSelesaiLayan').removeClass('fa fa-check')
			$('#iconSelesaiLayan').addClass('fa fa-spinner fa-spin')
		},
		success: function (data) {
			if(data.metadata.code==200){
				var idx=$('#idx_pendaftaran').val();
				tampilkanPesan('success',data.metadata.message);
				location.reload();
			}else{
				// tampilkanPesan('warning',data.metadata.message,'');
			}
		},
		error: function(xhr) { // if error occured
			$('#btnSelesailayan').prop("disabled",false);
			$('#iconSelesaiLayan').removeClass('fa fa-spinner fa-spin')
			$('#iconSelesaiLayan').addClass('fa fa-check');
		},
		complete: function() {
			$('#btnSelesailayan').prop("disabled",false);
			$('#iconSelesaiLayan').removeClass('fa fa-spinner fa-spin')
			$('#iconSelesaiLayan').addClass('fa fa-check')
		},
	});
	
}

function mulaiLayan(){
    var kodebooking = $('#kodebooking').val();
    var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+4;
	var idx=$('#idx_pendaftaran').val();
    // alert(idx);
	// return false;
    $.ajax({
        url: url,
        type: "GET",
        data: {},
        dataType: 'JSON',
        beforeSend: function () {
            // setting a timeout
            $('#btnMulailayan').prop("disabled",true);
			$('#iconMulaiLayan').removeClass('fa fa-check')
			$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if(data.metadata.code==200){
				var idx=$('#idx_pendaftaran').val();
                tampilkanPesan('success',data.metadata.message);
				if(idx==""){
					location.reload();
				}else{
					window.location.href=base_url + "rajal/kunjungan/detail/"+idx
				}
            }else{
                // tampilkanPesan('warning',data.metadata.message,'');
                swal({
                    title: data.metadata.message,
                    text: "Apakah anda akan melanjutkan proses layanan!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, I am sure!',
                    cancelButtonText: "No, cancel it!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm){
                        var idx=$('#idx_pendaftaran').val();
						// alert(idx);

                        window.location.href=base_url + "rajal/kunjungan/detail/"+idx
                    } else {
                        tampilkanPesan('warning','Ok')
                    }
                });
            }
        },
        error: function(xhr) { // if error occured
			$('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check');
        },
        complete: function() {
            $('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check')
        },
    });
}
function mulaiLayanFarmasi(){
    var kodebooking = $('#kodebooking').val();
    var url=base_url+"jkn/booking/updatetask/"+kodebooking+"/"+7;
	var idx=$('#idx_pendaftaran').val();
    // alert(idx);
	// return false;
    $.ajax({
        url: url,
        type: "GET",
        data: {},
        dataType: 'JSON',
        beforeSend: function () {
            // setting a timeout
            $('#btnMulailayan').prop("disabled",true);
			$('#iconMulaiLayan').removeClass('fa fa-check')
			$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if(data.metadata.code==200){
				var idx=$('#idx_pendaftaran').val();
                tampilkanPesan('success',data.metadata.message);
				location.reload();
                // window.location.href=base_url + "rajal/kunjungan/detail/"+idx
            }else{
                // tampilkanPesan('warning',data.metadata.message,'');
                swal({
                    title: data.metadata.message,
                    text: "Apakah anda akan melanjutkan proses layanan!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, I am sure!',
                    cancelButtonText: "No, cancel it!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm){
                        var idx=$('#idx_pendaftaran').val();
						// alert(idx);

                        window.location.href=base_url + "rajal/kunjungan/detail/"+idx
                    } else {
                        tampilkanPesan('warning','Ok')
                    }
                });
            }
        },
        error: function(xhr) { // if error occured
			$('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check');
        },
        complete: function() {
            $('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check')
        },
    });
}


function skip(){
    var postData = {}
    postData["kodebooking"] = $('#kodebooking').val();
    console.clear()
    console.log(postData);
    var url=base_url+"rajal/home/skipantrian";
    $.ajax({
        url: url,
        type: "POST",
        data: postData,
        dataType: 'JSON',
        beforeSend: function () {
            // setting a timeout
            $('#btnMulailayan').prop("disabled",true);
			$('#iconMulaiLayan').removeClass('fa fa-check')
			$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if(data.status==true){
                // location.reload(); 
                tampilkanPesan('success',data.message);
                
                getLastAntrean();
                
            }else{
                tampilkanPesan('warning',data.message);
            }
        },
        error: function(xhr) { // if error occured
			$('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check');
        },
        complete: function() {
            $('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check')
        },
    });
}
function skipAdmisi(){
    var postData = {}
    postData["kodebooking"] = $('#kodebooking').val();
    console.clear()
    console.log(postData);
    var url=base_url+"rekammedis/home/skipantrian";
    $.ajax({
        url: url,
        type: "POST",
        data: postData,
        dataType: 'JSON',
        beforeSend: function () {
            // setting a timeout
            $('#btnMulailayan').prop("disabled",true);
			$('#iconMulaiLayan').removeClass('fa fa-check')
			$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if(data.status==true){
                // location.reload(); 
                tampilkanPesan('success',data.message);
                var antrean = $("input[name='antrean']:checked").val();
				// alert(antrean)
				if(antrean==3){
					// antreanBerikut();
					// alert('antrean Berikut')
					getNextAntreanAdmisi();
				}else{
					getLastAntreanAdmisi();
				}
                
                
            }else{
                tampilkanPesan('warning',data.message);
            }
        },
        error: function(xhr) { // if error occured
			$('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check');
        },
        complete: function() {
            $('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check')
        },
    });
}
function skip(){
    var postData = {}
    postData["kodebooking"] = $('#kodebooking').val();
    console.clear()
    console.log(postData);
    var url=base_url+"rajal/home/skipantrian";
    $.ajax({
        url: url,
        type: "POST",
        data: postData,
        dataType: 'JSON',
        beforeSend: function () {
            // setting a timeout
            $('#btnMulailayan').prop("disabled",true);
			$('#iconMulaiLayan').removeClass('fa fa-check')
			$('#iconMulaiLayan').addClass('fa fa-spinner fa-spin')
        },
        success: function (data) {
            if(data.status==true){
                // location.reload(); 
                tampilkanPesan('success',data.message);
                
                getLastAntrean();
                
            }else{
                tampilkanPesan('warning',data.message);
            }
        },
        error: function(xhr) { // if error occured
			$('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check');
        },
        complete: function() {
            $('#btnMulailayan').prop("disabled",false);
            $('#iconMulaiLayan').removeClass('fa fa-spinner fa-spin')
            $('#iconMulaiLayan').addClass('fa fa-check')
        },
    });
}

function batalAntreanAdmisi(){
	// alert("Batalkan antrean")
    // $('#modalbatalantrean').modal('show');
    // var kodebooking=$('#kodebooking').val();
    // var id_daftar=$('#id_daftar').val();
    // var reg_unit=$('#reg_unit').val();
    // $('#btlkodebooking').val(kodebooking);
    // $('#btlid_daftar').val(id_daftar);
    // $('#btlreg_unit').val(reg_unit);
	swal({
		title: "Konfirmasi",
		text: "Apakah anda yakin akan mebatalkan antrian!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Ya Saya Yakin!',
		cancelButtonText: "Tidak, Batalkan!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
		if (isConfirm){
			var postData = {}
			postData["kodebooking"] = $('#kodebooking').val();
			var url=base_url+"rekammedis/home/batalkanantrean";
			$.ajax({
				url: url,
				type: "POST",
				data: postData,
				dataType: 'JSON',
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconBatal').removeClass('fa fa-remove')
					$('#iconBatal').addClass('fa fa-spinner fa-spin')
				},
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconbatal').removeClass('fa fa-remove')
					$('#iconbatal').addClass('fa fa-spinner fa-spin')
				},
				success: function (data) {
					if(data.metadata.code==200){
						// location.reload(); 
						tampilkanPesan('success',data.metadata.message,'Berhasil');
						
						getLastAntreanAdmisi();
						
					}else{
						tampilkanPesan('warning',data.metadata.message,'info');
					}
				},
				error: function(xhr) { // if error occured
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove');
				},
				complete: function() {
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove')
				},
			});
		} else {
			tampilkanPesan('warning','Ok')
		}
	 });
		
}
function batalAntrean(){
	// alert("Batalkan antrean")
    // $('#modalbatalantrean').modal('show');
    // var kodebooking=$('#kodebooking').val();
    // var id_daftar=$('#id_daftar').val();
    // var reg_unit=$('#reg_unit').val();
    // $('#btlkodebooking').val(kodebooking);
    // $('#btlid_daftar').val(id_daftar);
    // $('#btlreg_unit').val(reg_unit);
	swal({
		title: "Konfirmasi",
		text: "Apakah anda yakin akan mebatalkan antrian!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Ya Saya Yakin!',
		cancelButtonText: "Tidak, Batalkan!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
		if (isConfirm){
			var postData = {}
			postData["kodebooking"] = $('#kodebooking').val();
			var url=base_url+"rajal/home/batalkanantrean";
			$.ajax({
				url: url,
				type: "POST",
				data: postData,
				dataType: 'JSON',
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconBatal').removeClass('fa fa-remove')
					$('#iconBatal').addClass('fa fa-spinner fa-spin')
				},
				beforeSend: function () {
					// setting a timeout
					$('#btnBatal').prop("disabled",true);
					$('#iconbatal').removeClass('fa fa-remove')
					$('#iconbatal').addClass('fa fa-spinner fa-spin')
				},
				success: function (data) {
					if(data.metadata.code==200){
						// location.reload(); 
						tampilkanPesan('success',data.metadata.message,'Berhasil');
						
						getLastAntrean();
						
					}else{
						tampilkanPesan('warning',data.metadata.message,'info');
					}
				},
				error: function(xhr) { // if error occured
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove');
				},
				complete: function() {
					$('#btnBatal').prop("disabled",false);
					$('#iconbatal').removeClass('fa fa-spinner fa-spin')
					$('#iconbatal').addClass('fa fa-remove')
				},
			});
		} else {
			tampilkanPesan('warning','Ok')
		}
	 });
		
}

function batalkanAntrean(){
    var postData = {}
        postData["kodebooking"] = $('#kodebooking').val();
        var url=base_url+"rajal/home/batalkanantrean";
        $.ajax({
            url: url,
            type: "POST",
            data: postData,
            dataType: 'JSON',
            beforeSend: function () {
                // setting a timeout
                $('#btnBatalAntrean').prop("disabled",true);
                $('#iconBatalAntrean').removeClass('fa fa-check')
                $('#iconBatalAntrean').addClass('fa fa-spinner fa-spin')
            },
            success: function (data) {
                if(data.metadata.code==200){
                    // location.reload(); 
                    tampilkanPesan('success',data.metadata.message,'Berhasil');
                    
                    getLastAntrean();
                    
                }else{
                    tampilkanPesan('info',data.metadata.message,'info');
                }
            },
            error: function(xhr) { // if error occured
                $('#btnBatalAntrean').prop("disabled",false);
                $('#iconBatalAntrean').removeClass('fa fa-spinner fa-spin')
                $('#iconBatalAntrean').addClass('fa fa-check');
            },
            complete: function() {
                $('#btnBatalAntrean').prop("disabled",false);
                $('#iconBatalAntrean').removeClass('fa fa-spinner fa-spin')
                $('#iconBatalAntrean').addClass('fa fa-check')
            },
        });
    
}
function batalkanAntreanAdmisi(){
    var ket=$('#btlketerangan').val();;
    if(ket==''){
        tampilkanPesan('warning','Keterangan Tidak Boleh Kosong','Peringatan');
        return false;
    }else{
        var postData = {}
        postData["kodebooking"] = $('#btlkodebooking').val();
        postData["id_daftar"] = $('#btlid_daftar').val();
        postData["keterangan"] = $('#btlketerangan').val();
        postData["reg_unit"] = $('#btlreg_unit').val();
        var url=base_url+"rekammedis/home/batalkanantrean";
        $.ajax({
            url: url,
            type: "POST",
            data: postData,
            dataType: 'JSON',
            beforeSend: function () {
                // setting a timeout
                $('#btnBatalAntrean').prop("disabled",true);
                $('#iconBatalAntrean').removeClass('fa fa-check')
                $('#iconBatalAntrean').addClass('fa fa-spinner fa-spin')
            },
            success: function (data) {
                if(data.metadata.code==200){
                    // location.reload(); 
                    tampilkanPesan('success',data.metadata.message,'Berhasil');
                    
                    getLastAntrean();
                    
                }else{
                    tampilkanPesan('info',data.metadata.message,'info');
                }
            },
            error: function(xhr) { // if error occured
                $('#btnBatalAntrean').prop("disabled",false);
                $('#iconBatalAntrean').removeClass('fa fa-spinner fa-spin')
                $('#iconBatalAntrean').addClass('fa fa-check');
            },
            complete: function() {
                $('#btnBatalAntrean').prop("disabled",false);
                $('#iconBatalAntrean').removeClass('fa fa-spinner fa-spin')
                $('#iconBatalAntrean').addClass('fa fa-check')
            },
        });
    }
    
}
function getAntrian(){
	var nomor=$('#nomor').val();
	var url=base_url+"farmasi/home/antrian/"+nomor;
	$.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        beforeSend: function () {
			// setting a timeout
			$('#btnCariAntrean').prop("disabled",true);
			$('#iconCariAntrean').removeClass('fa fa-plus')
			$('#iconCariAntrean').addClass('fa fa-spinner fa-spin')
		},
        success: function (data) {
            if (data.status == true) {
                $('#antrianfarmasi').modal('show');
				$('#booking').val(data.data.kodebooking)
				$('#taskaktif').val(data.data.taskid)
				$('#idx_pendaftaran').val(data.data.idx_pendaftaran)
            } else {
                tampilkanPesan('error',data["message"]);
            }
        },
        error: function(xhr) { // if error occured
			$('#btnCariAntrean').prop("disabled",false);
			$('#iconCariAntrean').removeClass('fa fa-spinner fa-spin')
			$('#iconCariAntrean').addClass('fa fa-plus');
		},
		complete: function() {
			$('#btnCariAntrean').prop("disabled",false);
			$('#iconCariAntrean').removeClass('fa fa-spinner fa-spin')
			$('#iconCariAntrean').addClass('fa fa-plus')
		},
    });
}
function bookingAntrianFarmasi(){
	var kodebooking = $('#booking').val();
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
