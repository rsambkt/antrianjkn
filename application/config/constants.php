<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Display Debug backtrace
|--------------------------------------------------------------------------
|
| If set to TRUE, a backtrace will be displayed along with php errors. If
| error_reporting is disabled, the backtrace will not display, regardless
| of this setting
|
*/
defined('SHOW_DEBUG_BACKTRACE') or define('SHOW_DEBUG_BACKTRACE', TRUE);

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
defined('FILE_READ_MODE')  or define('FILE_READ_MODE', 0644);
defined('FILE_WRITE_MODE') or define('FILE_WRITE_MODE', 0666);
defined('DIR_READ_MODE')   or define('DIR_READ_MODE', 0755);
defined('DIR_WRITE_MODE')  or define('DIR_WRITE_MODE', 0755);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/
defined('FOPEN_READ')                           or define('FOPEN_READ', 'rb');
defined('FOPEN_READ_WRITE')                     or define('FOPEN_READ_WRITE', 'r+b');
defined('FOPEN_WRITE_CREATE_DESTRUCTIVE')       or define('FOPEN_WRITE_CREATE_DESTRUCTIVE', 'wb'); // truncates existing file data, use with care
defined('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE')  or define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE', 'w+b'); // truncates existing file data, use with care
defined('FOPEN_WRITE_CREATE')                   or define('FOPEN_WRITE_CREATE', 'ab');
defined('FOPEN_READ_WRITE_CREATE')              or define('FOPEN_READ_WRITE_CREATE', 'a+b');
defined('FOPEN_WRITE_CREATE_STRICT')            or define('FOPEN_WRITE_CREATE_STRICT', 'xb');
defined('FOPEN_READ_WRITE_CREATE_STRICT')       or define('FOPEN_READ_WRITE_CREATE_STRICT', 'x+b');

/*
|--------------------------------------------------------------------------
| Exit Status Codes
|--------------------------------------------------------------------------
|
| Used to indicate the conditions under which the script is exit()ing.
| While there is no universal standard for error codes, there are some
| broad conventions.  Three such conventions are mentioned below, for
| those who wish to make use of them.  The CodeIgniter defaults were
| chosen for the least overlap with these conventions, while still
| leaving room for others to be defined in future versions and user
| applications.
|
| The three main conventions used for determining exit status codes
| are as follows:
|
|    Standard C/C++ Library (stdlibc):
|       http://www.gnu.org/software/libc/manual/html_node/Exit-Status.html
|       (This link also contains other GNU-specific conventions)
|    BSD sysexits.h:
|       http://www.gsp.com/cgi-bin/man.cgi?section=3&topic=sysexits
|    Bash scripting:
|       http://tldp.org/LDP/abs/html/exitcodes.html
|
*/
defined('EXIT_SUCCESS')        or define('EXIT_SUCCESS', 0); // no errors
defined('EXIT_ERROR')          or define('EXIT_ERROR', 1); // generic error
defined('EXIT_CONFIG')         or define('EXIT_CONFIG', 3); // configuration error
defined('EXIT_UNKNOWN_FILE')   or define('EXIT_UNKNOWN_FILE', 4); // file not found
defined('EXIT_UNKNOWN_CLASS')  or define('EXIT_UNKNOWN_CLASS', 5); // unknown class
defined('EXIT_UNKNOWN_METHOD') or define('EXIT_UNKNOWN_METHOD', 6); // unknown class member
defined('EXIT_USER_INPUT')     or define('EXIT_USER_INPUT', 7); // invalid user input
defined('EXIT_DATABASE')       or define('EXIT_DATABASE', 8); // database error
defined('EXIT__AUTO_MIN')      or define('EXIT__AUTO_MIN', 9); // lowest automatically-assigned error code
defined('EXIT__AUTO_MAX')      or define('EXIT__AUTO_MAX', 125); // highest automatically-assigned error code

/**
 * Custome Constant
 */

defined('COMPANY_NAME')            or define('COMPANY_NAME', 'RSUD Dr. ACHMAD MOCHTAR');
defined('LOGO')                    or define('LOGO', 'assets/images/logo.png');
defined('REPORT_ADDRESS_1')     or define('REPORT_ADDRESS_1', 'Jl. Dr. A.Rivai No.1 Bukittinggi');
defined('REPORT_ADDRESS_2')     or define('REPORT_ADDRESS_2', 'Telp : 0752-21720');
defined('FOOTER_APP')             or define('FOOTER_APP', 'IT Developer &copy; 2021');
defined('FOOTER_RS')             or define('FOOTER_RS', 'RSUD Dr. Achmad Mochtar');
defined('VERSION_APP')             or define('VERSION_APP', 'Version 1.0');

/**
 * Webservice Testing
 */
defined('HOST_APPLICARE')   or define('HOST_APPLICARE', 'https://apijkn-dev.bpjs-kesehatan.go.id/aplicaresws/');
defined('HOST_APOTEK')   or define('HOST_APOTEK', 'https://apijkn-dev.bpjs-kesehatan.go.id/apotek-rest-dev');
/**
 * HOST Vclaim Production
 */
defined('HOST_VC')     		or define('HOST_VC', 'https://new-apijkn.bpjs-kesehatan.go.id/vclaim-rest/');
defined('CONS_ID_VC')   	or define('CONS_ID_VC', '20419');
defined('SECREET_ID_VC')   	or define('SECREET_ID_VC', '9wXA881141');
defined('KEY_VC')   		or define('KEY_VC', 'ff9ae516a85700c6931e1a8a7d87bad6');

/**
 * HOST Vclaim Testing
 */
// defined('HOST_VC')     		or define('HOST_VC', 'https://apijkn-dev.bpjs-kesehatan.go.id/vclaim-rest-dev/');
// defined('CONS_ID_VC')   	or define('CONS_ID_VC', '16095');
// defined('SECREET_ID_VC')   	or define('SECREET_ID_VC', '5iO913C770');
// defined('KEY_VC')   		or define('KEY_VC', '56d8b4f7ac72b41102ac5800d73fe0fd');

defined('KODERS_VC')        or define('KODERS_VC', '0304R001');
defined('FASKES_VC')        or define('FASKES_VC', 'RSUD DR ACHMAD MOCHTAR BUKITTINGGI');
defined('STATUS_VC')        or define('STATUS_VC', '1');
defined('SELISIH_WAKTU')    or define('SELISIH_WAKTU', '0');

/**
 * HOST Antrian Production
 */
// defined('HOST_JKN')     	or define('HOST_JKN', 'https://new-apijkn.bpjs-kesehatan.go.id/antreanrs/');
defined('HOST_JKN')     	or define('HOST_JKN', 'https://apijkn.bpjs-kesehatan.go.id/antreanrs/');
defined('CONS_ID_JKN')   	or define('CONS_ID_JKN', '20419');
defined('SECREET_ID_JKN')   or define('SECREET_ID_JKN', '9wXA881141');
defined('KEY_JKN')   		or define('KEY_JKN', '52d2fce7944eeea3342bdb3038db4b17');

/**
 * HOST Antrian testing
 */
// defined('HOST_JKN')     	or define('HOST_JKN', 'https://apijkn-dev.bpjs-kesehatan.go.id/antreanrs_dev/');
// defined('CONS_ID_JKN')   	or define('CONS_ID_JKN', '16095');
// defined('SECREET_ID_JKN')   or define('SECREET_ID_JKN', '5iO913C770');
// defined('KEY_JKN')   		or define('KEY_JKN', '382ef0547906193cacb957f2b2e3e9d7');

defined('STATUS_JKN')   	or define('STATUS_JKN', '0');
defined('AUTO_REGISTER')   	or define('AUTO_REGISTER', '0');

/**
 * Webservice Production
 */


