<?php 
function http_request($data, $url,$method="GET")
{
    $data_string = json_encode($data);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if(empty($token)){
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string)
        ));
    }else{
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string),
            'Authorization: ' .$token
        ));
    }
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        $error=array('status'=>false,'message'=>curl_error($ch));
        $result=json_encode($error);
        // $error_msg = curl_error($ch);
    }
    curl_close($ch);
    return $result;
}


?>
