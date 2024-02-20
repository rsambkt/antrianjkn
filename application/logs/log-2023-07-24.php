<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

ERROR - 2023-07-24 09:41:28 --> Query error: Table 'db_antrian_online.pasien' doesn't exist - Invalid query: SELECT *
FROM `pasien`
WHERE `nik` = '1304060908860002'
ERROR - 2023-07-24 09:41:55 --> Query error: Table 'db_antrian_online.pasien' doesn't exist - Invalid query: SELECT *
FROM `pasien`
WHERE `nik` = '1304060908860002'
ERROR - 2023-07-24 09:42:06 --> Query error: Table 'db_antrian_online.pasien' doesn't exist - Invalid query: SELECT *
FROM `pasien`
WHERE `nik` = '1304060908860002'
ERROR - 2023-07-24 09:43:51 --> Query error: Unknown column 'nik' in 'where clause' - Invalid query: SELECT *
FROM `pasien`
WHERE `nik` = '1304060908860002'
ERROR - 2023-07-24 09:45:53 --> Query error: Table 'db_antrian_online.ruang' doesn't exist - Invalid query: SELECT `jadwal_poly_id`, `jadwal_subspesialis_jkn` as `kodepoli`, `jadwal_poly_nama` as `namapoli`, `icon`
FROM `jkn_jadwalhafis`
JOIN `ruang` ON `jadwal_poly_id`=`ruang`.`idx`
WHERE   (
`jadwal_pekan` = 0
OR `jadwal_pekan` = 2
 )
GROUP BY `jadwal_poly_id`
ERROR - 2023-07-24 09:57:54 --> 404 Page Not Found: Welcome/login
ERROR - 2023-07-24 09:58:56 --> Query error: Table 'db_antrian_online.users_admin' doesn't exist - Invalid query: SELECT *
FROM `users_admin` `a`
JOIN `pegawai` `b` ON `a`.`nrp`=`b`.`nrp`
JOIN `acc_level` `c` ON `a`.`levelid`=`c`.`idx`
WHERE `a`.`nrp` = 'NRP1910460'
AND `userStatus` = 1
AND `userPasw` = '827ccb0eea8a706c4c34a16891f84e7b'
ERROR - 2023-07-24 09:58:59 --> Query error: Table 'db_antrian_online.users_admin' doesn't exist - Invalid query: SELECT *
FROM `users_admin` `a`
JOIN `pegawai` `b` ON `a`.`nrp`=`b`.`nrp`
JOIN `acc_level` `c` ON `a`.`levelid`=`c`.`idx`
WHERE `a`.`nrp` = 'NRP1910460'
AND `userStatus` = 1
AND `userPasw` = '827ccb0eea8a706c4c34a16891f84e7b'
ERROR - 2023-07-24 09:59:05 --> Query error: Table 'db_antrian_online.users_admin' doesn't exist - Invalid query: SELECT *
FROM `users_admin` `a`
JOIN `pegawai` `b` ON `a`.`nrp`=`b`.`nrp`
JOIN `acc_level` `c` ON `a`.`levelid`=`c`.`idx`
WHERE `a`.`nrp` = 'NRP1910460'
AND `userStatus` = 1
AND `userPasw` = '827ccb0eea8a706c4c34a16891f84e7b'
ERROR - 2023-07-24 10:03:54 --> Query error: Table 'db_antrian_online.admisi' doesn't exist - Invalid query: SELECT *
FROM `admisi`
WHERE `jns_layanan` = 'RJ'
AND DATE_FORMAT(tgl_masuk,"%Y-%m-%d") = '2023-07-24'
ERROR - 2023-07-24 10:04:57 --> Query error: Table 'db_antrian_online.loket' doesn't exist - Invalid query: SELECT *
FROM `loket`
ERROR - 2023-07-24 06:41:55 --> Severity: error --> Exception: Too few arguments to function getField(), 3 passed in C:\laragon\www\antrianjkn\application\controllers\Console.php on line 712 and exactly 4 expected C:\laragon\www\antrianjkn\application\helpers\bridging_helper.php 139
ERROR - 2023-07-24 06:51:44 --> Severity: error --> Exception: Too few arguments to function getField(), 3 passed in C:\laragon\www\antrianjkn\application\controllers\Console.php on line 712 and exactly 4 expected C:\laragon\www\antrianjkn\application\helpers\bridging_helper.php 139
ERROR - 2023-07-24 06:52:07 --> Severity: error --> Exception: Too few arguments to function getField(), 3 passed in C:\laragon\www\antrianjkn\application\controllers\Console.php on line 712 and exactly 4 expected C:\laragon\www\antrianjkn\application\helpers\bridging_helper.php 139
ERROR - 2023-07-24 06:55:02 --> Severity: Notice --> Undefined variable: loketid C:\laragon\www\antrianjkn\application\controllers\Console.php 728
ERROR - 2023-07-24 14:56:09 --> Query error: Table 'rsam_mr_registrasi_v3.pasien' doesn't exist - Invalid query: SELECT *
FROM `pasien`
WHERE `nomr` = '282818'
ERROR - 2023-07-24 14:56:35 --> Query error: Table 'rsam_mr_registrasi_v3.pasien' doesn't exist - Invalid query: SELECT *
FROM `pasien`
WHERE `nomr` = '282818'
ERROR - 2023-07-24 15:26:34 --> Severity: Notice --> Undefined variable: kodepoli C:\laragon\www\antrianjkn\application\controllers\Console.php 580
ERROR - 2023-07-24 08:26:58 --> Severity: Notice --> Undefined property: Console::$Mandiri_model C:\laragon\www\antrianjkn\application\controllers\Console.php 694
ERROR - 2023-07-24 08:26:58 --> Severity: error --> Exception: Call to a member function getAntrian() on null C:\laragon\www\antrianjkn\application\controllers\Console.php 694
ERROR - 2023-07-24 15:29:45 --> 404 Page Not Found: Console/assets
ERROR - 2023-07-24 15:29:47 --> 404 Page Not Found: Console/assets
ERROR - 2023-07-24 15:44:21 --> Query error: Table 'db_antrian_online.permintaankonsul' doesn't exist - Invalid query: SELECT *
FROM `permintaankonsul`
WHERE `nomr_pasien` = '112223'
