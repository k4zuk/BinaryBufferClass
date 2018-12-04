/**
 * Binary Buffer Class in JScript
 */
function BinaryBuffer(arrayLength) {
	Array.prototype.push.apply(this, new Array(arrayLength));
}

BinaryBuffer.prototype.length = 0;

var methods = ['push', 'pop', 'unshift', 'shift'];

for(var i = 0; i < methods.length; i++) (function(name) {
	BinaryBuffer.prototype[name] = function() {
		return Array.prototype[name].apply(this, arguments);
	};
})(methods[i]);


/**
 * Read into Array object
 */
BinaryBuffer.prototype.Read = function(filename) {
	var file = new ActiveXObject("ADODB.Stream");
	file.Type = 2;					// 1:adTypeBinary, 2:adTypeText
	file.charset = "iso-8859-1";
	file.LineSeparator = -1;		// 13:adCR, -1:adCRLF, 10:adLF
	file.Open();
	file.loadFromFile(filename);
	var text = file.ReadText(-1);	// -1:adReadAll, -2:adReadLine
	file.Position = 0;
	file.charset = "ascii";
	var text_ascii = file.ReadText(-1);
	file.Close();
	
	// convert from text to code
	for(var i = 0; i < text_ascii.length; i++) {
		var value = text.charCodeAt(i);
		if( value >= 0x80 ) {
			value = text_ascii.charCodeAt(i) | 0x80;
		}
		this[i] = value;
	}
};

/**
 * Write to a binary file
 */
BinaryBuffer.prototype.Write = function(filename) {
	// convert from code to text
	var text = "";
	for(var i = 0; i < this.length; i++) {
		text += String.fromCharCode(this[i] & 0xff);
	}
	
	var file = new ActiveXObject("ADODB.Stream");
	file.Type = 2;					// 1:adTypeBinary, 2:adTypeText
	file.charset = "iso-8859-1";
	file.LineSeparator = -1;		// 13:adCR, -1:adCRLF, 10:adLF
	file.Open();
	file.WriteText(text, 0);		// 0:adWriteChar, 1:adWriteLine
	file.SaveToFile(filename, 2);	// 1:adSaveCreateNotExist, 2:adSaveCreateOverWrite
	file.close();
};

/**
 * Get a multi-byte value
 */
BinaryBuffer.prototype.getUint8 = function(byteOffset) {
	return this.getUint(byteOffset, 1);
};

BinaryBuffer.prototype.getUint16 = function(byteOffset) {
	return this.getUint(byteOffset, 2);
};

BinaryBuffer.prototype.getUint16LE = function(byteOffset) {
	return this.getUintLE(byteOffset, 2);
};

BinaryBuffer.prototype.getUint32 = function(byteOffset) {
	return this.getUint(byteOffset, 4);
};

BinaryBuffer.prototype.getUint32LE = function(byteOffset) {
	return this.getUintLE(byteOffset, 4);
};

BinaryBuffer.prototype.getUint = function(byteOffset, n) {
	var value = 0;
	for(var i = 0; i < n; i++) {
		value <<= 8;
		value += this[byteOffset+i] & 0xff;
	}
	return value;
};

BinaryBuffer.prototype.getUintLE = function(byteOffset, n) {
	var value = 0;
	for(var i = n-1; i >= 0; i--) {
		value <<= 8;
		value += this[byteOffset+i] & 0xff;
	}
	return value;
};

/**
 * Set a multi-byte value
 */
BinaryBuffer.prototype.setUint8 = function(byteOffset, value) {
	this.setUint(byteOffset, value, 1);
};

BinaryBuffer.prototype.setUint16 = function(byteOffset, value) {
	this.setUint(byteOffset, value, 2);
};

BinaryBuffer.prototype.setUint16LE = function(byteOffset, value) {
	this.setUintLE(byteOffset, value, 2);
};

BinaryBuffer.prototype.setUint32 = function(byteOffset, value) {
	this.setUint(byteOffset, value, 4);
};

BinaryBuffer.prototype.setUint32LE = function(byteOffset, value) {
	this.setUintLE(byteOffset, value, 4);
};

BinaryBuffer.prototype.setUint = function(byteOffset, value, n) {
	for(var i = n-1; i >= 0; i--) {
		this[byteOffset+i] = value & 0xff;
		value >>= 8;
	}
};

BinaryBuffer.prototype.setUintLE = function(byteOffset, value, n) {
	for(var i = 0; i < n; i++) {
		this[byteOffset+i] = value & 0xff;
		value >>= 8;
	}
};
