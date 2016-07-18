<?php
use DiDom\Document;

include __DIR__ . '/autoload.php';

header("Content-type: text/html; charset=utf-8");

define('MATCH_RULES_URL', 'match_rules.json');


function getMatchRules() {
    $row = file_get_contents(MATCH_RULES_URL);
    $json = utf8_encode($row);
    //! decode第二个参数转换为数组，方便读取
    return json_decode($json, true);
}

function getList($url, $type) {
    $matchRules = getMatchRules();
    $rule = $matchRules[$url];

    $doc = new Document($url, true);
    $list = $doc->find($rule['list']);

    foreach($list as $item) {
        echo $title = $item->find($rule['item_title'])[0]->text() . '<br>';
        echo $link = $item->find($rule['item_link'])[0]->getAttribute('href') . '<br>';
        echo $date = $item->find($rule['item_date'])[0]->text() . '<br>';
        echo $content = $item->find($rule['item_desc'])[0] . '<br>';

        // break;
    }
}

// test
getList('http://m.pengfu.com/');


// 加载xml
// new Document()->loadXml() | loadXmlFile()

// 节点方法
//     [1] => appendChild
//     [2] => has
//     [3] => find
//     [4] => first
//     [5] => xpath
//     [6] => hasAttribute
//     [7] => setAttribute
//     [8] => getAttribute
//     [9] => removeAttribute
//     [10] => attr
//     [11] => html
//     [12] => innerHtml
//     [13] => xml
//     [14] => text
//     [15] => setValue
//     [16] => is
//     [17] => parent
//     [18] => previousSibling
//     [19] => nextSibling
//     [20] => child
//     [21] => firstChild
//     [22] => lastChild
//     [23] => children
//     [24] => remove
//     [25] => replace
//     [26] => cloneNode
//     [27] => getNode
//     [28] => getDocument
//     [29] => toDocument
//     [35] => __invoke
?>