# node.jsで色々作ってみるおもちゃ箱

### http.Serverクラスの使い方のテスト

* helloworld1.js: createServer時にrequestListenerを登録する方法
* helloworld2.js: requestListenerを登録せずcreateServerしてあとから登録する方法
* helloworld3.js: Content-Typeをtext/plainにした場合のwrite(の挙動の違い（1と比較）)

### 写経

* fortune.js: おみくじ
↓をアレンジしながら写経(サニタイズを自前の関数→validatorモジュールに替えたり細々)
https://osdn.jp/users/hylom/pf/node_sample_fortune/scm/blobs/d5e2c7fe120c990fa623671c3ef65bc7dbd
* twithash: キーワードにひっかかるtweet垂れ流し
↓をアレンジしながら写経
http://d.hatena.ne.jp/miruto824/20110608/1307526558
