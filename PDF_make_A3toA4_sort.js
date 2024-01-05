/* ページ総数が4の倍数になるように調整する */
var Crop = this.getPageBox("Crop");
for ( var i = 0; i < this.numPages % 4; i++) {
 this.newPage(this.numPages, Crop[2], Crop[1]);
}

var N = this.numPages/2;

//本来のページ順を取得
var PageOrder = funGetOrder(N);

//ページの入れ替え
var temp
for (var i = 0; i < PageOrder.length; i++) {
    for (var j = i+1; j < PageOrder.length; j++) {
      if (PageOrder[i] > PageOrder[j]) {
        temp = PageOrder[i];
        this.movePage (PageOrder[j]-1,PageOrder[i]-1)
        PageOrder[i] = PageOrder[j];
        PageOrder[j] = temp;
      }
    }
  }

//国語とか、右開きの場合はここのコメントアウト外す↓↓↓↓↓
//for (var i = this.numPages - 1; i >= 0; i--) this.movePage(i);
//国語とか、右開きの場合はここのコメントアウト外す↑↑↑↑↑

function funGetOrder(N)
{
    var k;
    k=new Array(N*2-1)
    for(var i=1;i<=N;i++) k[i-1] = 2*i - i%2;
    for(var i=N+1;i<=2*N;i++) k[i-1] = 2*N - 2*(i-N-1) - (i-N)%2;
    return k;
}
