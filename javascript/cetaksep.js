
        $(document).ready(function() {

        });

        // function printPDF() {
        //     jspdfctk();
        // }


        // function cetakanSEP(nosep, tglsep, nokartu, nmpst, tgllahir, jnskelamin, notelp, poli, faskesperujuk, dxawal, catatan, jnspst, cob, jnsrawat, klsrawat, prolanis, eksekutif, penjamin, statuskll, katarak, potensiprb, dokter, kunjungan, berkelanjutan, poliPerujuk = "") {

        //     jspdfctk(nosep, tglsep, nokartu, nmpst, tgllahir, jnskelamin, notelp, poli, faskesperujuk, dxawal, catatan, jnspst, cob, jnsrawat, klsrawat, prolanis, eksekutif, penjamin, statuskll, katarak, potensiprb, 1, dokter, kunjungan, berkelanjutan, poliPerujuk)
        // }

        function cetaksep(nosep,tgl) {
            
            var imgData = 'data:image/png;base64,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';

            var url = base_url+"rekammedis/pasien/datacetaksep/"+nosep+"/"+tgl;
            $.ajax({
                url     : url,
                type    : "GET",
                dataType: "json",
                data    :  {},
                beforeSend: function() {
                    // setting a timeout
                    $('#btnCetakSep').prop('disabled',true);
                    $('#iconCetakSep').removeClass("fa fa-print")
                    $('#iconcetakSep').addClass("fa fa-spinner fa-spin")
                },
                success : function(data){
                    if(data.status==true){
                        var doc = new jsPDF('l', 'mm', [100, 210]);
                        doc.addImage(imgData, 'PNG', 10, 6, 45, 10);

                        doc.setProperties({
                            title: 'Cetak SEP',
                            subject: 'SEP'
                        });
                        if(data.local==1){
                            potensiprb = data.response.prolanisPRB;
                            nosep = data.seponline.noSep;
                            tglsep = data.seponline.tglSep;
                            nokartu = data.seponline.peserta.noKartu;
                            nmpst = data.seponline.peserta.nama;
                            tgllahir = data.seponline.peserta.tglLahir;
                            jnskelamin = data.seponline.peserta.kelamin;
                            notelp = data.response.noTelp;
                            poli = data.seponline.poli;
                            eksekutif = data.seponline.poliEksekutif;
                            dokter = data.response.namaDpjpLayan;
                            faskesperujuk = data.response.namaPpkRujukan;
                            dxawal = data.seponline.diagnosa;
                            catatan = data.seponline.catatan;
                            katarak = data.seponline.katarak;
                            prolanis = data.response.prolanisPRB;
                            jnspst = data.seponline.peserta.jnsPeserta;
                            cob = data.response.cob;
                            jnsrawat = data.seponline.jnsPelayanan;
                            kunjungan = data.response.tujuanKunj;
                            berkelanjutan = data.response.flagProcedure;
                            poliPerujuk = '';
                            hakKelas=data.seponline.klsRawat.klsRawatHak;
                            klsrawat = data.seponline.kelasRawat;
                            penjamin = data.response.penjamin;
                            noMr=data.response.noMr;
                            cetakan = parseInt(data.response.cetakke) + 1;
                        }else{
                            potensiprb = '';
                            nosep = data.seponline.noSep;
                            tglsep = data.seponline.tglSep;
                            nokartu = data.seponline.peserta.noKartu;
                            nmpst = data.seponline.peserta.nama;
                            tgllahir = data.seponline.peserta.tglLahir;
                            noMr=data.seponline.peserta.noMr;
                            if(data.seponline.kelamin=='L') jnskelamin='Laki-Laki';
                            else jnskelamin='Perempuan';
                            // jnskelamin = data.seponline.kelamin;
                            notelp = '';
                            poli = data.seponline.poli;
                            eksekutif = data.seponline.poliEksekutif;
                            dokter = data.seponline.dpjp.nmDPJP;
                            faskesperujuk = '';
                            dxawal = data.seponline.diagnosa;
                            catatan = data.seponline.catatan;
                            katarak = data.seponline.katarak;
                            prolanis = '';
                            jnspst = data.seponline.peserta.jnsPeserta;
                            cob = data.seponline.cob;
                            jnsrawat = data.seponline.jnsPelayanan;
                            kunjungan = '';
                            berkelanjutan = '';
                            poliPerujuk = '';
                            hakKelas=data.seponline.peserta.hakKelas;
                            klsrawat = data.seponline.kelasRawat;
                            penjamin = data.seponline.penjamin;
                            cetakan = 1;
                        }
                        

                        // alert(data.response.prolanisPRB)

                        doc.setFontSize(11);
                        doc.text(58, 10, 'SURAT ELEGIBILITAS PESERTA');
                        doc.text(58, 15, data.namafaskes);
                        doc.setFontSize(16);
                        doc.text(130, 10, potensiprb == 'Potensi PRB' ? 'PASIEN POTENSI PRB' : '');

                        doc.setFontSize(9);
                        doc.text(10, 25, 'No.SEP');
                        doc.text(10, 30, 'Tgl.SEP');
                        doc.text(10, 35, 'No.Kartu');
                        doc.text(10, 40, 'Nama Peserta');
                        doc.text(10, 45, 'Tgl.Lahir');
                        doc.text(10, 50, 'No.Telepon');
                        doc.text(10, 55, 'Sub/Spesialis');
                        doc.text(10, 60, 'Dokter');
                        doc.text(10, 65, 'Faskes Perujuk');
                        doc.text(10, 70, 'Diagnosa Awal');
                        doc.text(10, 75, 'Catatan');

                        doc.text(40, 25, ': ' + nosep);
                        doc.text(40, 30, ': ' + tglsep);
                        doc.text(40, 35, ': ' + nokartu + ' (MR. '+noMr+')');
                        doc.text(40, 40, ': ' + nmpst);
                        doc.text(40, 45, ': ' + tgllahir + ' Kelamin : '+ jnskelamin);
                        doc.text(40, 50, ': ' + notelp);
                        // doc.text(40, 55, ': ' + poli + eksekutif);
                        doc.text(40, 55, ': ' + poli);
                        doc.text(40, 60, ': ' + dokter);
                        doc.text(40, 65, ': ' + faskesperujuk);
                        doc.text(40, 70, ': ' + dxawal);
                        doc.text(40, 75, ': ' + catatan);
                        doc.setFontSize(8);
                        doc.text(120, 25, katarak == '1' ? '* PASIEN OPERASI KATARAK' : '');
                        doc.setFontSize(9);
                        doc.text(120, 30, 'Peserta ');
                        // doc.text(120, 35, 'COB ');
                        doc.text(120, 40, 'Jns.Rawat ');

                        doc.text(120, 45, 'Jns.Kunjungan ');

                        doc.text(120, 55, 'Poli Perujuk ');
                        doc.text(120, 60, 'Kls.Hak ');
                        doc.text(120, 65, 'Kls.Rawat ');
                        doc.text(120, 75, 'Penjamin ');
                        // doc.text(145, 15, prolanis);
                        doc.text(145, 30, ': ' + jnspst);
                        // doc.text(145, 35, ': ' + cob.substring(0, 30));
                        doc.text(145, 40, ': ' + jnsrawat);

                        var kunjunganText;
                        switch (kunjungan) {
                            case '0':
                                kunjunganText = "Konsultasi dokter (pertama)";
                                break;
                            case '1':
                                kunjunganText = "Kunjungan rujukan internal";
                                break;
                            case '2':
                                kunjunganText = "Kunjungan Kontrol (ulangan)";
                                break;
                            default:
                                kunjunganText = "";
                                break;
                        }
                        doc.text(145, 45, ': - ' + kunjunganText);
                        // alert(data.response.tujuanKunj);
                        // alert(berkelanjutan)
                        if (berkelanjutan != null || berkelanjutan!='') {
                            // alert(berkelanjutan)
                            if (berkelanjutan == '0')
                                doc.text(145, 50, ': - ' + "Prosedur tidak berkelanjutan");
                            else if (berkelanjutan == '1')
                                doc.text(145, 50, ': - ' + "Prosedur dan terapi berkelanjutan");
                            else{
                                if(cetakan>1){
                                    doc.text(145, 50, ': - ' + "Prosedur tidak berkelanjutan");
                                }
                            }
                        }else{
                            if(cetakan>1){
                                doc.text(145, 50, ': - ' + "Prosedur tidak berkelanjutan");
                            }
                        }

                        doc.text(145, 55, ': ' + poliPerujuk);
                        doc.text(145, 60, ': ' + hakKelas);
                        doc.text(145, 65, ': ' + klsrawat);

                        if (penjamin != null) {
                            if (penjamin != '-') {
                                // var _penjamin = penjamin.split(';');
                                // var col = 65;
                                // var _infoJKK = '';
                                // for (var i = 0; i < _penjamin.length; i++) {
                                //     var nama = nmPenjaminan(_penjamin[i]);
                                //     if (i == 0) {
                                //         doc.text(145, col, ': ' + nama);
                                //         _infoJKK = nama;
                                //     } else {
                                //         doc.text(145, col, '  ' + nama);
                                //         _infoJKK = _infoJKK + ',' + nama;
                                //     }
                                //     col = col + 4;
                                // }
                                // if (_penjamin.length > 0) {
                                //     doc.setFontSize(6);
                                //     doc.text(10, 90, _nmstatuskll(statuskll));
                                //     doc.text(10, 92, ' dgn ' + _infoJKK + ' terlebih dahulu.');
                                // }
                                doc.text(145, 75, ': ' + penjamin);
                            }
                        }else{
                            doc.text(145, 70, ': ');
                        }
                        
                        doc.setFontSize(9);
                        doc.text(150, 80, 'Pasien/Keluarga Pasien');
                        doc.text(150, 85, '________________');
                        doc.setFontSize(6);
                        doc.text(10, 80, '*Saya menyetujui BPJS Kesehatan menggunakan infomasi medis pasien jika diperlukan.');
                        doc.text(10, 83, '*SEP Bukan sebagai bukti penjaminan peserta.');

                        if (jnsrawat.toLowerCase().includes("r.inap")) {
                            doc.text(10, 85, '** Dengan diterbitkannya SEP ini, Peserta rawat inap telah mendapatkan informasi dan menempati');
                            doc.text(10, 87, 'kelas rawat sesuai hak kelasnya (terkecuali kelas penuh atau naik kelas sesuai aturan yang berlaku)');
                        }

                        doc.text(10, 95, 'Cetakan ke ' + cetakan +' '+data.tgl);

                        var string = doc.output('datauristring');
                        var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
                        var x = window.open('', '_blank', 'width=1024,height=600,directories=0,status=0,titlebar=0,scrollbars=0,menubar=0,toolbar=0,location=0,resizable=1');
                        x.focus();
                        x.document.write(iframe);
                        x.document.close();
                    }else{
                        tampilkanPesan('warning',data.message);
                    }
                },
                complete: function() {
                    $('#btnCetakSep').prop('disabled',false);
                    $('#iconCetakSep').removeClass("fa fa-spinner fa-spin")
                    $('#iconCetakSep').addClass("fa fa-print")
                },
                error       : function(jqXHR,ajaxOption,errorThrown){
                    console.log(jqXHR.responseText);  
                    $('#btnCetakSep').prop('disabled',false);
                    $('#iconCetakSep').removeClass("fa fa-spinner fa-spin")
                    $('#iconCetakSep').addClass("fa fa-print")                  
                }
            });
        }
    