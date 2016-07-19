<?php
use HtmlParser\ParserDom;

include __DIR__ . '/autoload.php';

header("Content-type: text/html; charset=utf-8");

define('MATCH_RULES_URL', 'match_rules.json');


function getMatchRules() {
    $row = file_get_contents(MATCH_RULES_URL);
    $json = utf8_encode($row);
    //! decode第二个参数转换为数组，方便读取
    return json_decode($json, true);
}

// fix selector
function find($ele, $str) {
    $arr = explode(' ', $str);
    $tEle = $ele;
    while (($selector = array_shift($arr)) !== null) {
        $tEle = $tEle->find($selector, 0);
        echo '<hr>';
        var_dump($tEle);
    }

    return $tEle;
}

function getList($url) {
    $matchRules = getMatchRules();
    $rule = $matchRules[$url];

    $html = file_get_contents($url);
    $doc = new ParserDom($html);
    $list = find($doc, $rule['list']);

    foreach($list as $item) {
        var_dump($item);
        // echo '<hr>';
        // var_dump($item->find('.head-name', 0)->find('h1', 0)->getPlainText());
        // var_dump(find($item, $rule['item_title'])->getPlainText());
        echo $title = find($item, $rule['item_title'])->getPlainText() . '<br>';
        echo $link = find($item, $rule['item_link'])->getAttr('href') . '<br>';
        echo $date = find($item, $rule['item_date'])->getPlainText() . '<br>';
        echo $content = find($item, $rule['item_desc'])->innerHtml() . '<br>';

        break;
    }
}

// test
$url = 'http://m.pengfu.com/';
$url = 'http://www.cnblogs.com/PeunZhang/';
getList($url);

?>

<?php
// use HtmlParser\ParserDom;

// require __DIR__ . '/autoload.php';

// header('Content-Type: text/html; charset=utf-8');

// $html = '<html>
//   <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
//     <title>test</title>
//   </head>
//   <body>
//     <p class="test_class test_class1">p1</p>
//     <p class="test_class test_class2">p2</p>
//     <p class="test_class test_class3">p3</p>
//     <div id="test1">测试1</div>
//   </body>
// </html>';
// $html_dom = new ParserDom($html);
// $p_array = $html_dom->find('p.test_class');
// $p1 = $html_dom->find('p.test_class1',0);
// $div = $html_dom->find('div#test1',0);
// foreach ($p_array as $p){
//     echo $p->getPlainText() . "\n";
// }
// echo $div->getPlainText() . "\n";
// echo $p1->getPlainText() . "\n";
// echo $p1->getAttr('class') . "\n";
// echo "show html:\n";
// echo $div->innerHtml() . "\n";
// echo $div->outerHtml() . "\n";
?>