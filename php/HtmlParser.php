<?php
use DiDom\Document;

require __DIR__ . '/autoload.php';

/**
* Html Parser
*/
class HtmlParser {
    const MATCH_RULES_URL = 'match_rules.json';
    const LIST_LENGTH = 10;

    function __construct($url) {
        $this->url = $url;
    }

    private function getMatchRules() {
        $row = file_get_contents(self::MATCH_RULES_URL);
        $json = utf8_encode($row);
        //! decode第二个参数转换为数组，方便读取
        return json_decode($json, true);
    }

    function getList($url, $type) {
        

        foreach($list as $item) {
            echo $title = $item->find($rule['item_title'])[0]->text() . '<br>';
            echo $link = $item->find($rule['item_link'])[0]->getAttribute('href') . '<br>';
            echo $date = $item->find($rule['item_date'])[0]->text() . '<br>';
            echo $content = $item->find($rule['item_desc'])[0] . '<br>';
        }
    }

    function get() {
        // 读取匹配规则
        $matchRules = $this->getMatchRules();
        $rule = $matchRules[$this->url];

        // 解析文档
        $doc = new Document($this->url, true);
        $title = $doc->find('title')[0]->text();
        $res = array(
            'title' => $title,
            'items'=>array()
        );

        $list = $doc->find($rule['list']);
        foreach($list as $item) {
            $tmpArr = array(
                'title' => '',
                'link' => '',
                'date' => '',
                'desc' => '',
                'content' => ''
            );
            $tmpArr['title'] = $item->find($rule['item_title'])[0]->text();
            $tmpArr['link'] = $item->find($rule['item_link'])[0]->getAttribute('href');
            $tmpArr['date'] = $item->find($rule['item_date'])[0]->text();
            $tmpArr['desc'] = $item->find($rule['item_desc'])[0]->html();

            array_push($res['items'], $tmpArr);
            if (count($res['items']) >= self::LIST_LENGTH) {
                break;
            }
        }
        
        return $res;
    }
}

// test
// header('Content-Type: text/html; charset=utf-8');
// $url = 'http://alinode.aliyun.com/blog';
// $hp = new HtmlParser($url);
// $res = $hp->get();
// var_dump($res);
?>