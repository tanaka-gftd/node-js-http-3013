
'use strict';
const http = require('http');
const server = http
  .createServer((req, res) => {

    //他のログでも同じ日付を利用できるよう、Dateオブジェクトを変数に格納
    const now = new Date();

    console.info( `[${new Date()}] Requested by ${req.socket.remoteAddress}`);
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });

    //reqオブジェクト（リクエストが格納）内のmethodを元に、switch文で条件分岐
    switch(req.method){

      //methodがGETなら、そのURLをクライアント側にレスポンスとして返す
      case 'GET':  
        res.write(`GET ${req.url}`);
        break;

      /* 
        methodがPOSTなら、まずはURLをクライアント側にレスポンスとして返す。
        次に、送られてくる細切れになったデータを変数chunkに格納。
        さらに、細切れになったデータを変数rawDataに格納していく事で、元の文字列を再構築。
        最後に、 console.infoで元の文字列をサーバ側にログとして出力。
      */
      case 'POST':
        res.write(`POST ${req.url}`);
        let rawData = '';
        req
          .on('data', chunk => {
            rawData += chunk;
          })
          .on('end', () => {
            console.info(`[${now}] Data posted: ${rawData}`);
          });
          break;
        default:
          break;
    }
    res.end();
  })
  .on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
const port = 8000;
server.listen(port, () => {
  console.info(`[${new Date()}] Listening on ${port}`);
});


