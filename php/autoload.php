<?php
// Composer autoloading
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    /** @var Composer\Autoload\ClassLoader $loader */
    $loader = include __DIR__ . '/vendor/autoload.php';

// 添加其它需要引入的文件夹
    // $loader->add('App', __DIR__);
}