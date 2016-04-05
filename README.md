# node.jsで色々作ってみるおもちゃ箱

### http.Serverクラスの使い方のテスト

* helloworld1.js: createServer時にrequestListenerを登録する方法
* helloworld2.js: requestListenerを登録せずcreateServerしてあとから登録する方法
* helloworld3.js: Content-Typeをtext/plainにした場合のwrite(の挙動の違い（1と比較）)

### 直列処理の実装のテスト

* without_promise.js: before 何も気にせず実行したい順に記述しただけ
* with_promise.js: after 想定通りに実行されるように、Promiseやcoを使って直列にした

### 写経

* fortune.js: おみくじ
↓をアレンジしながら写経
https://osdn.jp/users/hylom/pf/node_sample_fortune/scm/blobs/d5e2c7fe120c990fa623671c3ef65bc7dbd

### その他

* ideone.js:
ideoneでコードを書く際に使っている雛形を使って挙動の確認  
readlineモジュールを使った標準入力の読み込みと、  
readlineのcloseとprocess.stdinのendが呼ばれるタイミングの確認  
実行例:  
  * node ideone.js を実行して標準入力を行い、Ctrl+Dで終了  
  * node ideone.js < text  
  * cat text | node ideone.js  
