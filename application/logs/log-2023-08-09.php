<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2023-08-09 09:30:18 --> Query error: Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'db_antrian_online.jkn_jadwalhafis.jadwal_subspesialis_jkn' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `jadwal_poly_id`, `jadwal_subspesialis_jkn` as `kodepoli`, `jadwal_poly_nama` as `namapoli`, `icon`
FROM `jkn_jadwalhafis`
JOIN `ruang` ON `jadwal_poly_id`=`ruang`.`idx`
WHERE   (
`jadwal_pekan` = 0
OR `jadwal_pekan` = 2
 )
GROUP BY `jadwal_poly_id`
ERROR - 2023-08-09 09:30:37 --> Query error: Expression #2 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'db_antrian_online.jkn_jadwalhafis.jadwal_subspesialis_jkn' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by - Invalid query: SELECT `jadwal_poly_id`, `jadwal_subspesialis_jkn` as `kodepoli`, `jadwal_poly_nama` as `namapoli`, `icon`
FROM `jkn_jadwalhafis`
JOIN `ruang` ON `jadwal_poly_id`=`ruang`.`idx`
WHERE   (
`jadwal_pekan` = 0
OR `jadwal_pekan` = 2
 )
GROUP BY `jadwal_poly_id`
ERROR - 2023-08-09 03:05:42 --> Severity: Notice --> Undefined variable: jenispasien C:\laragon\www\antrianjkn\application\controllers\Console.php 469
ERROR - 2023-08-09 03:08:28 --> Severity: Notice --> Undefined variable: jenispasien C:\laragon\www\antrianjkn\application\controllers\Console.php 469
