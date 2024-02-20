<?php 
function bridgingbpjs($url,$method="GET",$jsonData="",$serv="aplicare"){
    date_default_timezone_set('UTC');
    $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));
    // Create Signature
    $contentType = "application/json";
    $signature = hash_hmac('sha256', CONS_ID_VC."&".$tStamp, SECREET_ID_VC, true);
    $encodedSignature = base64_encode($signature);
    $header = "";
    if($serv=="aplicare") $header .= "Content-Type: " . $contentType . "\r\n";
    $header .= "X-cons-id: " . CONS_ID_VC . "\r\n";
    $header .= "X-timestamp: " . $tStamp . "\r\n";
    $header .= "X-signature: " . $encodedSignature ."\r\n";
	if($serv=="vclaim") {
		$header .= "user_key: ".KEY_VC;
		// echo HOST_VC.$url; exit;
		$curl = curl_init(HOST_VC.$url) ;
	}
	else if($serv=="antrian") {
		$header .= "user_key: ".KEY_JKN;
		$curl = curl_init(HOST_JKN.$url);
		// echo HOST_JKN.$url; exit;
	}else if($serv=="aplicare"){
		$curl = curl_init(HOST_APPLICARE.$url);
	}else{
        $curl = curl_init(HOST_APOTEK.$url);
    }
	
    // $serv=="vclaim" ? $header .= "user_key: ".KEY_VC :false;
    // $serv=="vclaim" ? $curl = curl_init(HOST_VC.$url) : $curl = curl_init(HOST_APPLICARE.$url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $method!="GET" && $method!="POST" ? curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method):"";
    curl_setopt($curl, CURLOPT_HTTPHEADER, array($header));

    if($method!="GET"){
        curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
    }
    $json_response = curl_exec($curl);
    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }
    curl_close($curl);
    if (!empty($error_msg)) {
        $error = array('metaData' => array('code' => 504, 'message' => $error_msg));
        $json_response = json_encode($error);
    }
    if($serv=="vclaim"){
        if(isJSON($json_response)){
            // echo $json_response; exit;
            $arr=json_decode($json_response);
            if($arr->metaData->code==200){
                if(!empty($arr->response)){
                    $data=stringDecryptBpjs(CONS_ID_VC.SECREET_ID_VC.$tStamp,$arr->response);
                    // echo $data; exit;
                    // echo hasil($data); exit;
                    $json_response=json_encode(array('metaData'=>$arr->metaData,'response'=>json_decode(hasil($data))));
                }
                
            }
        }
    }else if($serv=="antrian"){
		if(isJSON($json_response)){
            $arr=json_decode($json_response);
			// print_r($arr); exit;
            if($arr->metadata->code==200 || $arr->metadata->code==1){
                if(!empty($arr->response)){
                    $data=stringDecryptBpjs(CONS_ID_JKN.SECREET_ID_JKN.$tStamp,$arr->response);
                    $json_response=json_encode(array('metadata'=>$arr->metadata,'response'=>json_decode(hasil($data))));
                }
                $req=array(
					'urlrequest'=>HOST_JKN.$url,
					'tipereq'=>'',
					'httpheader'=>$header,
					'jsonreq'=>$jsonData,
					'jsonres'=>$json_response
				);
				$CI =& get_instance();
    			$CI->db->insert('jkn_logreq',$req);
            }else{
				$req=array(
					'urlrequest'=>HOST_JKN.$url,
					'tipereq'=>'',
					'httpheader'=>$header,
					'jsonreq'=>$jsonData,
					'jsonres'=>$json_response
				);
				$CI =& get_instance();
    			$CI->db->insert('jkn_logreq',$req);
			}
        }
	}
    
    return $json_response;
}

function stringDecryptBpjs($key, $string){
    $encrypt_method = 'AES-256-CBC';
    // hash
    $key_hash = hex2bin(hash('sha256', $key));
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    $iv = substr(hex2bin(hash('sha256', $key)), 0, 16);
    $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key_hash, OPENSSL_RAW_DATA, $iv);
    return $output;
}
function estimasi($number){
	$ms=$number/1000;
	// $offset=5*60*60;
	// $ms=$ms-$offset;
	return date("H:i:s", $ms);
}
function getPoliByID($idx){
    $CI =& get_instance();
    $CI->db->where('idx',$idx);
    $cekQuery = $CI->db->get('ruang');
    if($cekQuery->num_rows() > 0){
        $res = $cekQuery->row_array();
        return $res['ruang'];
    }else{
        return "";
    }    
}
function getLokasiByID($idx){
    $CI =& get_instance();
    $CI->db->where('idx',$idx);
    $cekQuery = $CI->db->get('depo');
    if($cekQuery->num_rows() > 0){
        $res = $cekQuery->row_array();
        return $res['namadepo'];
    }else{
        return "";
    }    
}
function getAntreanDokter($ruangid=""){
	$CI =& get_instance();
	$CI->db->select("dokterJaga,namaDokterJaga");
	$CI->db->where("id_ruang",$ruangid);
	$CI->db->where("DATE_FORMAT(tgl_masuk,'%Y-%m-%d')",date('Y-m-d'));
	$CI->db->group_by('dokterJaga');
	return $CI->db->get('pendaftaran')->result();
}
function getField($field,$param,$paramval,$table){
	$CI =& get_instance();
	$CI->db->select($field);
	$CI->db->where($param,$paramval);
	$data = $CI->db->get($table)->row();
	if(empty($data)) return "";
	else {
        $jmlfield=explode(",",$field);
        if(count($jmlfield)==1) return $data->$field;
        return $data;
    }
}
// getRow(){
//     $CI =& get_instance();
// 	$CI->db->select($field);
// 	$CI->db->where($param,$paramval);
// 	$data = $CI->db->get($table)->row();
// 	if(empty($data)) return "";
// 	else return $data->$field;
// }
function getField2($nama_field, $kondisi, $namatabel)
    {
		$CI =& get_instance();
		$CI->db->select($nama_field);
		$CI->db->where($kondisi);
		$data = $CI->db->get($namatabel)->row();
		if(empty($data)) return "";
		else return $data->$nama_field;
    }
function getRujukanInternal(){
	$CI =& get_instance();
	$CI->db->select("norujukaninternal");
	$CI->db->like("norujukaninternal",KODERS_VC .date('my')."KS");
	$CI->db->order_by("norujukaninternal","DESC");
	$CI->db->limit(1);
	$data = $CI->db->get("permintaankonsul")->row();
	if(empty($data)) {
		return KODERS_VC .date('my')."KS00001";
	}
	else {
		$nr=$data->norujukaninternal;
		$na=explode("KS",$nr);
		$nan=intval($na[1])+1;
		return KODERS_VC .date('my')."KS".str_pad($nan,5,"0",STR_PAD_LEFT);
	}
}

// function getResult()
// {
//     $data = CONS_ID_VC;
//     $tStamp = getTimestamp();
//     $encodedSignature = getSignature();
//     $result = "";
//     $result .= "X-cons-id: " . $data . "\r\n";
//     $result .= "X-timestamp: " . $tStamp . "\r\n";
//     $result .= "X-signature: " . $encodedSignature;
//     return $result;
// }
// function getTimestamp()
// {
//     $scretId = CONS_ID_VC;
//     $scretKey = SECREET_ID_VC;
//     date_default_timezone_set('UTC');
//     $tStamp = strval(time() - strtotime('1970-01-01 00:00:00'));
//     return $tStamp;
// }
// function getSignature()
// {
//     $scretId = CONS_ID_VC;
//     $scretKey = SECREET_ID_VC;
//     date_default_timezone_set('UTC');
//     $tStamp = strval(time() - strtotime('1970-01-01 00:00:00'));
//     $signature = hash_hmac('sha256', $scretId . "&" . $tStamp, $scretKey, true);
//     $encodedSignature = base64_encode($signature);
//     return $encodedSignature;
// }
function http_request($url,$jsondata=""){
    $contentType = "application/json";
    if(empty($jsondata)){
        $result = getResult1();
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array($result));
        $json_response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);
        if (!empty($error_msg)) {
            $error = array('metaData' => array('code' => 201, 'message' => $error_msg));
            $json_response = json_encode($error);
        }
        return $json_response;
    }else{
        $consID = CONS_ID_VC;
        $tStamp = getTimestamp();
        $encodedSignature = getSignature();

        $result = "";
        $result .= "Content-Type: " . $contentType . "\r\n";
        $result .= "X-cons-id: " . $consID . "\r\n";
        $result .= "X-timestamp: " . $tStamp . "\r\n";
        $result .= "X-signature: " . $encodedSignature;

        $curl = curl_init(HOST_APPLICARE.$url); 
        curl_setopt($curl, CURLOPT_HEADER, false); 
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE); 
        curl_setopt($curl, CURLOPT_HTTPHEADER,array($result));
        curl_setopt($curl, CURLOPT_POST, false); 
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); 
        curl_setopt($curl, CURLOPT_POSTFIELDS, $jsondata); 
        $return = curl_exec($curl); 
        if (curl_errno($curl)) {
            $return = curl_error($curl);
        }
        curl_close($curl);
        return $return;
        
    }

    
    
}

function bacadblama($url){
    $curl = curl_init($url); 
    curl_setopt($curl, CURLOPT_HEADER, false); 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE); 
    curl_setopt($curl, CURLOPT_TIMEOUT, 30); 
    $return = curl_exec($curl); 
    if (curl_errno($curl)) {
        $return = curl_error($curl);
    }
    curl_close($curl);
    return $return;
}
?>
