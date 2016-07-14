<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test lastRSS</title>
    <style>
    a {
        display: block;
    }
    </style>
</head>
<body>


<?php
require 'simple_html_dom.php';

// 新建一个Dom实例
$html = new simple_html_dom();
 
// 从url中加载
$html->load_file('http://www.cnblogs.com/PeunZhang/');
 
// 从字符串中加载
// $html->load('<html><body>从字符串中加载html文档演示</body></html>');
 
//从文件中加载
// $html->load_file('path/file/test.html');

$title = $html->find('title', 0);
// 每个对象都有4个基本对象属性:
// tag – 返回html标签名
// innertext – 返回innerHTML
// outertext – 返回outerHTML
// plaintext – 返回html标签中的文本

echo '<p>'.$title->plaintext.'</p>';

// 白树
$postTitles = $html->find('div[class=postTitle]');

foreach ($postTitles as $postTitle) {
    echo $postTitle->innertext();
}
?>


</body>
</html>