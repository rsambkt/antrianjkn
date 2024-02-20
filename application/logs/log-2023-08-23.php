<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2023-08-23 15:43:16 --> Query error: Table 'db_antrian_online.jkn_jadwalhafis1' doesn't exist - Invalid query: SELECT `jadwal_poly_id`, `jadwal_subspesialis_jkn` as `kodepoli`, `jadwal_poly_nama` as `namapoli`, `icon`
FROM `jkn_jadwalhafis1`
JOIN `ruang` ON `jadwal_poly_id`=`ruang`.`idx`
WHERE   (
`jadwal_pekan` = 0
OR `jadwal_pekan` = 2
 )
GROUP BY `jadwal_poly_id`
