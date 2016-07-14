<?php
include_once('../simple_html_dom.php');

header('Content-type: text/html; charset=utf-8');

$html = file_get_html('http://m.pengfu.com/zuixin/');

echo $html->find('section.text section.textdl div.tex1', 0)->innertext;
?>