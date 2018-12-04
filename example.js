var imageWidth = 128;
var imageHeight = 128;

var filename0 = "example0.bin";
var filename1 = "example1.bin";

var imageBuffer = new BinaryBuffer(imageWidth * imageHeight);

// グラデーションデータの生成
for(var i = 0; i < imageHeight; i++) {
	for(var j = 0; j < imageWidth; j++) {
		imageBuffer[imageWidth * i + j] = i + j;
	}
}
// データを出力
imageBuffer.Write(filename0);

// [デバッグ用] ファイル読み書きの正常性確認
for(var i = 0; i < imageWidth * imageHeight; i++) {
	imageBuffer[i] = 0;
}
imageBuffer.Read(filename0);
imageBuffer.Write(filename1);

// BMPファイルに変換
makeBmpFile(filename1, imageWidth, imageHeight);

WScript.Quit();
