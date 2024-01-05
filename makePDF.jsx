// makePDF.jsx
// オブジェクトを選択したまま実行すると、アートボードをそのオブジェクトのサイズに変更するか選択できます
// aiファイル名と同じ名前で出力しますが、同じpdfファイルが既に存在する場合は後ろに現在日時を付けます

// (function(){

/////変数宣言
const PDF_PrisetName = "[illustrator 初期設定]"  //AdobePDFプリセット名

var actDoc = activeDocument
var SelectObj = actDoc.selection
var exec_result = true

/////メイン処理
if (!activeDocument.saved) {
  result = Window.confirm("保存がされていません。PDF出力を行いますか？",true,"確認")
  if (!result){
    exec_result = false
  }
}

if (SelectObj.length > 0){
  result = Window.confirm("【確認】アートボードのサイズを選択オブジェクトに合わせますか？",false,"確認")
  if(result){
    if (SelectObj.length != 1){
      alert("オブジェクトは１つだけ選択してください")
      exec_result = false
    }
    else{
    SelectObj[0].stroked=false
    app.executeMenuCommand("Fit Artboard to selected Art")
    SelectObj[0].remove()
    }
  }
}

if(exec_result){
  //pdfで書き出し
  //aiと同じ場所に吐き出す
  var saveFolder = actDoc.path; // アクティブなドキュメントの保存フォルダ
  var actDocName = actDoc.name; // アクティブなドキュメントの名前
  var fname = (actDocName).substr(0, (actDocName).lastIndexOf("."))
  if (saveFolder != null){
          var options = new PDFSaveOptions();
        options.pDFPreset = PDF_PrisetName
        options.preserveEditability = false;
          //ファイル有無チェック（既に同ファイル名のpdfがある場合は"_1"を付ける）

          var outputFile = new File(saveFolder+"/"+fname+".pdf")
          var rslt = outputFile.exists
          // for (var i=1; i>10 || rslt; i++){
          //   outputFile = new File(saveFolder+"/"+fname+"_"+i+".pdf")
          //   rslt = outputFile.exists
          // }
          if(rslt){
            var now = new Date()
            var Year = now.getFullYear()
            var Month = now.getMonth()+1
            var dDate = now.getDate()
            var Hour = now.getHours()
            var Min = now.getMinutes()
            var Sec = now.getSeconds()
            outputFile = new File(saveFolder+"/"+fname+"_"+Year+Month+dDate+Hour+Min+Sec+".pdf")
          }
          actDoc.saveAs(outputFile,options)
  }
  
  alert("処理が完了しました")
}
/////関数群

// })();
