<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Permintaan_model extends CI_Model
{

	function __construct()
	{
		parent::__construct();
	}
	function getPermintaanLabor($limit=0, $mulai=0, $keyword="", $param=""){
		$this->db->select("b.`idx`,a.id_daftar,a.reg_unit,b.`idx_pendaftaran`,a.nomr,b.`nama`,b.`tgllahir`,(CASE WHEN b.`jnskelamin`=1 THEN 'Laki-Laki' ELSE 'Perempuan' END) AS jnskelamin,b.`id_ruang_asal`,b.`nama_ruang_asal`,
		b.`diagnosa_keterangan_klinis`,b.`jenis_sample`,b.`tglpengambilansample`,b.`cara_bayar`,b.`namadokterpengirim`, 
		CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS nama_pemeriksaan, 
		(CASE WHEN status_permintaan=0 THEN '<span class=\"btn btn-danger btn-xs\">Belum Diresponse</span>' ELSE '<span class=\"btn btn-success btn-xs\">Sudah Diresponse</span>' END) AS status_permintaan");
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nomr', $keyword);
			$this->db->or_like('b.nama', $keyword);
			$this->db->or_like('b.tgllahir', $keyword);
			$this->db->or_like('b.nama_ruang_asal', $keyword);
            $this->db->or_like('b.diagnosa_keterangan_klinis', $keyword);
            $this->db->or_like('b.jenis_sample', $keyword);
            $this->db->or_like('b.tglpengambilansample', $keyword);
            $this->db->or_like('b.cara_bayar', $keyword);
            $this->db->or_like('b.namadokterpengirim', $keyword);
			$this->db->group_end();
			
		}
		$this->db->join("rm_permintaanlabor b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanlabordetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("b.idx");
		$this->db->order_by("b.idx","DESC");
		$this->db->limit($limit, $mulai);
		return $this->db->get("pendaftaran a")->result();
	}
	function countPermintaanLabor($keyword="",$param=""){
		$this->db->select("COUNT(b.idx) AS jml");
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nomr', $keyword);
			$this->db->or_like('b.nama', $keyword);
			$this->db->or_like('b.tgllahir', $keyword);
			$this->db->or_like('b.nama_ruang_asal', $keyword);
            $this->db->or_like('b.diagnosa_keterangan_klinis', $keyword);
            $this->db->or_like('b.jenis_sample', $keyword);
            $this->db->or_like('b.tglpengambilansample', $keyword);
            $this->db->or_like('b.cara_bayar', $keyword);
            $this->db->or_like('b.namadokterpengirim', $keyword);
			$this->db->group_end();
			
		}
		$this->db->join("rm_permintaanlabor b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanlabordetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("b.idx");
		$jml = $this->db->get("pendaftaran a")->row();
		if(empty($jml)) return 0;
		else return $jml->jml;
	}
	function getPermintaanLaborById($idx){
		$this->db->select("b.`idx`,a.id_daftar,a.reg_unit,b.`idx_pendaftaran`,a.nomr,b.`nama`,b.`tgllahir`,b.`jnskelamin`,b.`id_ruang_asal`,b.`nama_ruang_asal`,
		b.`diagnosa_keterangan_klinis`,b.`jenis_sample`,b.`tglpengambilansample`,b.`cara_bayar`,b.`namadokterpengirim`, tglminta,namadokterlabor,
		CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS nama_pemeriksaan, 
		(CASE WHEN status_permintaan=0 THEN '<span class=\"btn btn-danger btn-xs\">Belum Diresponse</span>' ELSE '<span class=\"btn btn-success btn-xs\">Sudah Diresponse</span>' END) AS status_permintaan,
		kesan,kesimpulan,kodedokterlabor");
		$this->db->where('b.idx', $idx);
		$this->db->join("rm_permintaanlabor b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanlabordetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("a.idx");
		return $this->db->get("pendaftaran a")->row();
	}
	function getDataPermintaanRadiologiById($detid){
		return $this->db->select("a.*,b.*,c.nomr")
		->where("b.idx",$detid)
		->join("rm_permintaanradiologidetail b","a.idx=idx_permintaan")
		->join("pendaftaran c","c.idx=a.idx_pendaftaran")
		->get("rm_permintaanradiologi a")
		->row();
	}
	function getPermintaanRadiologi($limit=0, $mulai=0, $keyword="", $param=""){
		$this->db->select("b.`idx`,a.id_daftar,a.reg_unit,b.`idx_pendaftaran`,a.nomr,b.`nama`,b.`tgllahir`,
		(CASE WHEN b.`jnskelamin`=1 THEN 'Laki-Laki' ELSE 'Perempuan' END) AS jnskelamin,b.`id_ruang_asal`,b.`nama_ruang_asal`,
		b.`diagnosa_klinis`,b.`cara_bayar`,b.`namadokterpengirim`, 
		CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS nama_pemeriksaan, 
		(CASE WHEN status_permintaan=0 THEN '<span class=\"btn btn-danger btn-xs\">Belum Diresponse</span>' ELSE '<span class=\"btn btn-success btn-xs\">Sudah Diresponse</span>' END) AS status_permintaan");
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nomr', $keyword);
			$this->db->or_like('b.nama', $keyword);
			$this->db->or_like('b.tgllahir', $keyword);
			$this->db->or_like('b.nama_ruang_asal', $keyword);
            $this->db->or_like('b.diagnosa_klinis', $keyword);
            $this->db->or_like('b.cara_bayar', $keyword);
            $this->db->or_like('b.namadokterpengirim', $keyword);
			$this->db->group_end();
			
		}
		$this->db->join("rm_permintaanradiologi b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanradiologidetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("b.idx");
		$this->db->order_by("b.idx","DESC");
		$this->db->limit($limit, $mulai);
		return $this->db->get("pendaftaran a")->result();
	}
	function countPermintaanRadiologi($keyword="",$param=""){
		$this->db->select("COUNT(b.idx) AS jml");
		if (!empty($param)) $this->db->like($param, $keyword);
		else {
			$this->db->group_start();
			$this->db->like('nomr_pasien', $keyword);
			$this->db->or_like('a.nomr', $keyword);
			$this->db->or_like('b.nama', $keyword);
			$this->db->or_like('b.tgllahir', $keyword);
			$this->db->or_like('b.nama_ruang_asal', $keyword);
            $this->db->or_like('b.diagnosa_klinis', $keyword);
            $this->db->or_like('b.cara_bayar', $keyword);
            $this->db->or_like('b.namadokterpengirim', $keyword);
			$this->db->group_end();
		}
		$this->db->join("rm_permintaanradiologi b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanradiologidetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("b.idx");
		$jml = $this->db->get("pendaftaran a")->row();
		if(empty($jml)) return 0;
		else return $jml->jml;
	}
	function getPermintaanRadiologiById($idx){
		$this->db->select("b.*,b.`idx`,a.id_daftar,a.reg_unit,b.`idx_pendaftaran`,a.nomr,b.`nama`,b.`tgllahir`,
		(CASE WHEN b.`jnskelamin`=1 THEN 'Laki-Laki' ELSE 'Perempuan' END) AS jnskelamin,b.`id_ruang_asal`,b.`nama_ruang_asal`,
		b.`diagnosa_klinis`,b.`cara_bayar`,b.`namadokterpengirim`, 
		CONCAT('<ol>',GROUP_CONCAT(CONCAT('<li>',nama_pemeriksaan,'</li>') SEPARATOR ''),'</ol>') AS nama_pemeriksaan, 
		(CASE WHEN status_permintaan=0 THEN '<span class=\"btn btn-danger btn-xs\">Belum Diresponse</span>' ELSE '<span class=\"btn btn-success btn-xs\">Sudah Diresponse</span>' END) AS status_permintaan");
		$this->db->where('b.idx', $idx);
		$this->db->join("rm_permintaanradiologi b","a.`idx`=b.`idx_pendaftaran`");
		$this->db->join("rm_permintaanradiologidetail c","b.`idx`=c.`idx_permintaan`");
		$this->db->group_by("a.idx");
		return $this->db->get("pendaftaran a")->row();
	}

	function getDetailPemeriksaan($id){
		return $this->db->select("a.*,c.*,c.idx as variabel_id,d.idx as idx_hasil,hasil")
		->where("a.idx_permintaan",$id)
		->join("pemeriksaan_labor b","kode_pemeriksaan=kode")
		->join("variabel_pemeriksaan_labor c","kode=pemeriksaan_kode")
		->join("(SELECT * FROM rm_hasilpermintaanlabordetail WHERE idx_permintaan=$id) AS d","c.idx=d.kodevariabel","LEFT")
		->get("rm_permintaanlabordetail a")
		->result();
	}
	function getDetailPemeriksaanRadiologi($id){
		return $this->db->select("*,a.idx as idx_detail")
		->where("a.idx_permintaan",$id)
		->join("pemeriksaan_radiologi b","kode_pemeriksaan=kode")
		->get("rm_permintaanradiologidetail a")
		->result();
	}
	function simpanHasilPemeriksaanRadiologi($data,$idx){
		$cek=$this->db->where("idx",$idx)->get("rm_permintaanradiologidetail")->row();
		if(!empty($cek)){
			$this->db->where("idx",$idx)->update("rm_permintaanradiologidetail",$data);
			// Update Status Response
			$st=array('status_permintaan'=>1);
			$this->db->where("idx",$cek->idx_permintaan)->update("rm_permintaanradiologi",$st);
			return true;
		}else{
			return false;
		}
		
		
	}
	function getPegawaiByProfesi($profid){
		return $this->db->where("profId",$profid)->get("pegawai")->result();
	}
	function insertHasilLabor($data){
		$this->db->insert_batch('rm_hasilpermintaanlabordetail',$data);
	}
	function updateKesimpulanLabor($data,$idx){
		$this->db->where("idx",$idx)->update("rm_permintaanlabor",$data);
	}
	function updateHasilLabor($data){
		$this->db->update_batch("rm_hasilpermintaanlabordetail",$data,'idx');
	}

	function upload_files($path, $title, $files, $allow_types)
    {
        $config = array(
            'upload_path'   => $path,
            'allowed_types' => $allow_types,
            'overwrite'     => 1,
        );
        $this->load->library('upload', $config);
        $images = array();
        $i = 0;
        $sukses=0;
        $gagal=0;
		$error="";
        foreach ($files['name'] as $key => $image) {
            $i++;
            $_FILES['images[]']['name'] = $files['name'][$key];
            $_FILES['images[]']['type'] = $files['type'][$key];
            $_FILES['images[]']['tmp_name'] = $files['tmp_name'][$key];
            $_FILES['images[]']['error'] = $files['error'][$key];
            $_FILES['images[]']['size'] = $files['size'][$key];

            $fileName = $title . '_' . $i . "_" . str_replace(' ', '_', $_FILES['images[]']['name']);
            //$ext = explode('/', $_FILES['images[]']['type']);
            //$images = $fileName;

            $config['file_name'] = $fileName;

            $this->upload->initialize($config);

            if ($this->upload->do_upload('images[]')) {
                $upload_data = $this->upload->data();
                $file_name[]=$upload_data["file_name"];
                $sukses++;
                // $images = array('status' => true, 'message' => $path . $upload_data["file_name"]);
				// return false;
            } else {
                $gagal++;
				$error=$this->upload->display_errors();
                // $images = array('status' => false, 'message' => $this->upload->display_errors());
            }
        }
        if($sukses>0){
			$message="Berhasil upload data";
            // $response= array('status'=>true,'message'=>$message,'images'=>$images);
        }else{
            $message="$sukses dari $i file berhasil di upload";
        }
        if(empty($file_name)) return array('status'=>false,'message'=>$error);
        else return array('status'=>true,'message'=>$message, 'path'=>$path,'images'=>$file_name);
    }
}
