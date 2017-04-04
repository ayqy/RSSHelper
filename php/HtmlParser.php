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
        $this->rootUrl = preg_replace("/^(https?:\/\/[^\/]+)\/\S*/si",
            '${1}',
            $url
        );
    }

    private function getMatchRules() {
        $row = file_get_contents(self::MATCH_RULES_URL);
        $json = utf8_encode($row);
        //! decode第二个参数转换为数组，方便读取
        return json_decode($json, true);
    }

    private function fixRelativeUrl($url) {
        if (stripos($url, '/') === 0) {
            // root path
            $url = $this->rootUrl . $url;
        }
        else {
            // current path
            //!!! 不处理./和../
            if (substr($this->url, -1) === '/') {
                $tmpArr['link'] = $this->url . $url;
            }
            else {
                $aUrl = explode('/', $this->url);
                array_pop($aUrl);
                array_push($aUrl, $url);
                $url = implode('/', $aUrl);
            }
        }

        return $url;
    }

    private function convertImgSrc($html) {
        // 滤掉img标签
        $that = $this;
        $html = preg_replace_callback('/<img[^>]+src="([^"]+)"[^>]*>/si',
            //TD 这个$this好奇怪啊
            function($matches){
                return '<img src="' . $this->fixRelativeUrl($matches[1]) . '">';
            },
            $html
        );

        return $html;
    }

    function get() {
        // 读取匹配规则
        $matchRules = $this->getMatchRules();
        $rule = $matchRules[$this->url];

        // 解析文档
        $row = file_get_contents($this->url);
        // fix charset
        $row = preg_replace('/<head>/si',
            '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">',
            $row
        );
        // 去掉BOM头
        function removeBOM($content) { 
            $charset[1] = substr($content, 0, 1);
            $charset[2] = substr($content, 1, 1);
            $charset[3] = substr($content, 2, 1);
            if (ord($charset[1]) == 239 && ord($charset[2]) == 187 && ord($charset[3]) == 191) { 
                return substr($content, 3);
            }
            return $content;
        }
        $row = removeBOM($row);

        $doc = new Document($row);
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
            !empty($rule['item_title']) && $tmpArr['title'] = $item->find($rule['item_title'])[0]->text();
            !empty($rule['item_link']) && $tmpArr['link'] = $item->find($rule['item_link'])[0]->getAttribute('href');
            !empty($rule['item_date']) && $tmpArr['date'] = $item->find($rule['item_date'])[0]->text();
            !empty($rule['item_desc']) && $tmpArr['desc'] = $item->find($rule['item_desc'])[0]->html();

            // complete relative url
            $tmpArr['desc'] = $this->convertImgSrc($tmpArr['desc']);
            $tmpArr['link'] = $this->fixRelativeUrl($tmpArr['link']);

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