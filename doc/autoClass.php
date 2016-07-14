// auto load class file
define('APP_DIR', '');
if (function_exists('spl_autoload_register')) {
    spl_autoload_register('autoClass');
} else {
    function __auto_load($className) {
        autoClass($className);
    }
}
function autoClass($className){
    try{
        require_once APP_DIR.'/class/'.$className.'.php';
    } catch (Exception $e) {
        die('Class Auto Load Error:'.$e->getMessage());
    }
}