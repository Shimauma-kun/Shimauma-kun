// overprint_white_check.jsx
// 白にover printがかかっているかチェック

(function main(){

	if (activeDocument.documentColorSpace == DocumentColorSpace.CMYK) {

		const OBJ_TYPE_PATH='OBJ_TYPE_PATH'	//テキストオブジェクト以外
		const OBJ_TYPE_TXT='OBJ_TYPE_TXT'	//テキストオブジェクト
		var err_msg=""
		var result_overPrint=0
		var result
		var theItems
		var flg_ng_obj_msg=false,result_overPrint_msg=false
	
		app.executeMenuCommand("unlockAll")
		app.executeMenuCommand("showAll")
		
		app.executeMenuCommand("selectall")
		// app.executeMenuCommand("noCompoundPath") //複合パス>解除
		do{//グループ化解除
		  grpCnt_mae = app.activeDocument.groupItems.length
		  app.executeMenuCommand("selectall")
		  app.executeMenuCommand("ungroup") 
		}while(app.activeDocument.groupItems.length>=0 && app.activeDocument.groupItems.length!=grpCnt_mae)
		app.executeMenuCommand("deselectall")

		app.executeMenuCommand("selectall")
		theItems=selection
		app.executeMenuCommand("deselectall")
		
		for (var i = 0 ; i < theItems.length; i++){
			
			checkMain(theItems[i])
			//結果判定
			if(result_overPrint>0) {
				flg_ng_obj_msg = true
				result_overPrint_msg=true
			}
		}
		if(flg_ng_obj_msg){
			err_msg=err_msg+"【警告】：以下のオブジェクトが存在します。"+"\r\n"
			result=false
		}
		if(result_overPrint_msg) {
			err_msg=err_msg+"オーバープリントがかかっている白色のオブジェクト"+"\r\n"
		}
		if(err_msg == "") {
			err_msg="NGオブジェクトはありません"
			result=true
		}

		alert(err_msg)

		return result

	}
	else {
		alert("このスクリプトは CMYK モード以外では使用できません。")
		return false
	}

	function checkMain(layerObj){

		if (layerObj.typename == "PathItem"){
			checkPath(layerObj)
		}
		else if (layerObj.typename == "TextFrame"){
			checkTxt(layerObj)
		}

	}

	function checkTxt(txtObj){
		var j=0
		var txtContents=""
		var txtmojiCA
		if (txtObj.locked) return

		for (j = 0; j < txtObj.textRange.characters.length; j++){

			txtmoji=txtObj.textRange.characters[j]
			txtContents=txtObj.textRange.characters[j].contents
			txtmojiCA = txtObj.textRange.characters[j].characterAttributes
			//塗りのチェック
			if(!checkOverPrint(txtmojiCA,OBJ_TYPE_TXT)) txtObj.selected=true	//白色のover print
			//線のチェック
			if(!checkOverPrint(txtmojiCA,OBJ_TYPE_TXT)) txtObj.selected=true	//白色のover print
		}	
	}


	function checkPath(pathObj){
		if (pathObj.guides) return //ガイド

		//塗りのチェック ※特色は使用しないので考慮してません
		if (pathObj.filled) {
			if(!checkOverPrint(pathObj,OBJ_TYPE_PATH)) pathObj.selected=true	//白色のover print
		}
		//線のチェック
		if (pathObj.stroked) {
			if(!checkOverPrint(pathObj,OBJ_TYPE_PATH)) pathObj.selected=true	//白色のover print
		}
	}

	//白色のover printチェック
	function checkOverPrint(Obj,txt_flg) {

		var f_result = true
		var fillcolorObj=Obj.fillColor
		var strokecolorObj=Obj.strokeColor

		if(fillcolorObj.typename=="CMYKColor"){
		//白
			if (fillcolorObj.black == 0 && fillcolorObj.cyan == 0 &&  fillcolorObj.magenta == 0  &&  fillcolorObj.yellow == 0 )  {
				if(txt_flg==OBJ_TYPE_PATH){
					if(Obj.fillOverprint==true) f_result = false
				}
				else{
					if(Obj.overprintFill==true) f_result = false
				}
			}
		}
		if(strokecolorObj.typename=="CMYKColor"){
			//白
			if (strokecolorObj.black == 0 && strokecolorObj.cyan == 0 &&  strokecolorObj.magenta == 0  &&  strokecolorObj.yellow == 0 )  {
				if(txt_flg==OBJ_TYPE_PATH){
					if(Obj.strokeOverprint==true) f_result = false
				}
				else{
					if(Obj.overprintStroke==true) f_result = false
				}
			}
		}
	
		if(!f_result) result_overPrint++

		return f_result
	}
})()