/**
 * Make BMP File
 */
function makeBmpFile(filename, imageWidth, imageHeight) {
	var imageSize = imageWidth * imageHeight;

	// read image data
	var imageBuffer = new BinaryBuffer(imageSize);
	imageBuffer.Read(filename);

	var bmpBuffer = makeBmpData(imageBuffer, imageWidth, imageHeight);

	// write to a bmp file
	bmpBuffer.Write(filename + ".bmp");
}

/**
 * Make BMP Data
 */
function makeBmpData(imageBuffer, imageWidth, imageHeight) {
	var headerSize = 14 + 40 + 256*4;
	var imageSize = ((imageWidth+3)/4)*4 * imageHeight;
	var fileSize = headerSize + imageSize;

	var bmpBuffer = new BinaryBuffer(fileSize);

	// set bmp header
	setBmpHeader(bmpBuffer, imageWidth, imageHeight);

	// set image data
	var pt = headerSize;
	for(var i = 0; i < imageHeight; i++) {
		for(var j = 0; j < imageWidth; j++) {
			bmpBuffer[pt++] = imageBuffer[imageWidth * (imageHeight-1-i) + j];
		}
		for(var k = j % 4; k > 0 & k < 4; k++) {
			bmpBuffer[pt++] = 0;
		}
	}

	return bmpBuffer;
}

/**
 * Set BMP Header
 */
function setBmpHeader(bmpBuffer, imageWidht, imageHeight) {
	var headerSize = 14 + 40 + 256*4;
	var imageSize = ((imageWidth+3)/4)*4 * imageHeight;
	var fileSize = headerSize + imageSize;
	
	// BITMAPFILEHEADER
	bmpBuffer.setUint8   ( 0, 'B'.charCodeAt(0));	// bfType
	bmpBuffer.setUint8   ( 1, 'M'.charCodeAt(0));	// bfType
	bmpBuffer.setUint32LE( 2, fileSize);			// bfSize
	bmpBuffer.setUint16LE( 6, 0);					// bfReserved1
	bmpBuffer.setUint16LE( 8, 0);					// bfReserved2
	bmpBuffer.setUint32LE(10, headerSize);			// bfOffBits
	
	// BITMAPINFOHEADER
	bmpBuffer.setUint32LE(14, 40);					// biSize
	bmpBuffer.setUint32LE(18, imageWidth);			// biWidth
	bmpBuffer.setUint32LE(22, imageHeight);			// biHeight
	bmpBuffer.setUint16LE(26, 1);					// biPlanes
	bmpBuffer.setUint16LE(28, 8);					// biBitCount
	bmpBuffer.setUint32LE(30, 0);					// biCompression
	bmpBuffer.setUint32LE(34, imageSize);			// biSizeImage
	bmpBuffer.setUint32LE(38, 0);					// biXPelsPerMeter
	bmpBuffer.setUint32LE(42, 0);					// biYPelsPerMeter
	bmpBuffer.setUint32LE(46, 0);					// biClrUsed
	bmpBuffer.setUint32LE(50, 0);					// biClrImportant
	
	// RGBQUAD
	for (var i = 0; i < 256; i++) {
		var value = (i << 24) + (i << 16) + (i << 8) + 0;
		bmpBuffer.setUint32(54+i*4, value);
	}
}
