#  RSSHelper API Doc

##  Convention

Response Format:

    {
        "code": 200,
        "data": {}
    }

Empty Response:

    {"code":200,"data":{}}
    or
    {"code":200,"data":{"title":"","items":[]}}

##  API

No | Description | URL | method | parameter | response format | response text
---- | ---- | ---- | ---- | ---- | ---- | ----
1 | Get RSS & HTML catelogy list | /index | GET | [callback=cb] | JSON/cb(JSON) | `{"code":200,"data":{"masters":[{"name":"barretlee","type":"rss","url":"http:\/\/www.barretlee.com\/rss2.xml"},{"name":"\u5f20\u946b\u65ed","type":"rss","url":"http:\/\/www.zhangxinxu.com\/wordpress\/feed\/"},{"name":"\u5341\u5e74\u8e2a\u8ff9","type":"rss","url":"https:\/\/www.h5jun.com\/rss.html"},{"name":"\u767d\u6811","type":"html","url":"http:\/\/www.cnblogs.com\/PeunZhang\/"},{"name":"\u53f6\u5c0f\u9497","type":"html","url":"http:\/\/www.cnblogs.com\/yexiaochai\/"},{"name":"vajoy","type":"html","url":"http:\/\/www.cnblogs.com\/vajoy\/"},{"name":"\u7a7a\u667a","type":"html","url":"http:\/\/www.cnblogs.com\/tugenhua0707\/"},{"name":"Samaritans","type":"html","url":"http:\/\/www.cnblogs.com\/dolphinX\/"}],"blogs":[{"name":"\u5947\u821e\u56e2","type":"rss","url":"https:\/\/www.75team.com\/rss.html"},{"name":"alinode","type":"html","url":"http:\/\/alinode.aliyun.com\/blog"}],"weeklys":[{"name":"\u5947\u821e\u5468\u520a","type":"rss","url":"https:\/\/weekly.75team.com\/rss.php"},{"name":"FEX\u5468\u520a","type":"html","url":"http:\/\/fex.baidu.com\/weekly\/"}],"jokes":[{"name":"\u6367\u8179\u7b11\u8bdd","type":"html","url":"http:\/\/m.pengfu.com\/"}]}}`
2 | Get feed content | /rss | GET | <url=feedUrl>[callback=cb] | JSON/cb(JSON) | `{"code":200,"data":{"title":"\u5c0f\u80e1\u5b50\u54e5\u7684\u4e2a\u4eba\u7f51\u7ad9","items":[{"title":"\u5173\u4e8e\u5f00\u6e90\u7cbe\u795e\u548c\u5c0f\u5bc6\u5708","link":"http:\/\/www.barretlee.com\/blog\/2017\/04\/03\/about-secret-circle\/","date":"Mon Apr 03 2017 10:13:31 GMT+0800 (CST)","desc":"\u770b\u5230\u6709\u4eba\u5173\u6ce8\u548c\u5410\u69fd\uff0c\u6211\u5c31\u8fc7\u6765\u8bf4\u51e0\u53e5\u5427\uff0c\u5f53\u7136\u6211\u4e5f\u77e5\u9053\uff0c\u4e0d\u7ba1\u6211\u4e0b\u9762\u8bf4\u4ec0\u4e48\uff0c\u90fd\u4f1a\u6709\u4eba\u8d5e\u548c\u8e29\u3002","content":"\u770b\u5230\u6709\u4eba\u5173\u6ce8\u548c\u5410\u69fd\uff0c\u6211\u5c31\u8fc7\u6765\u8bf4\u51e0\u53e5\u5427\uff0c\u5f53\u7136\u6211\u4e5f\u77e5\u9053\uff0c\u4e0d\u7ba1\u6211\u4e0b\u9762\u8bf4\u4ec0\u4e48\uff0c\u90fd\u4f1a\u6709\u4eba\u8d5e\u548c\u8e29\u3002"}]}}`
2 | Get HTML scraping content | /html | GET | <url=docUrl>[callback=cb] | JSON/cb(JSON) | `{"code":200,"data":{"title":"FEX - FEX","items":[{"title":"FEX \u6280\u672f\u5468\u520a - 2017\/04\/17","link":"http:\/\/fex.baidu.com\/blog\/2017\/04\/fex-weekly-17\/\/","date":"2betop \u53d1\u5e03\u4e8e 17 Apr 2017","desc":"<div class=\"bnwrap\"><img src=\"http:\/\/fex.baidu.com\/img\/fex-weekly-27\/cover.jpg\"><\/div>","content":""}]}}`

##  Todo

-  UE Optimizing

    -  UI Style & Theme

    -  Interaction

-  Function Enhancement

    -  Login & User Management

    -  Constom catelogy list

    -  History & Favorite

    -  Feedback