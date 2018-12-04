// イメージデータの画サイズを設定
var imageWidth = 128;
var imageHeight = 128;

var objArgs = WScript.Arguments;
if (objArgs.length != 1) {
	WScript.Echo("not enough arguments...");
	WScript.Quit();
}
var filename = objArgs(0);

makeBmpFile(filename, imageWidth, imageHeight);

WScript.Quit();
