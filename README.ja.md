# BinaryBufferClass
バイナリファイルの読み込み／書き出し／編集を行うJScriptのArray-likeオブジェクト。

#### クラスメンバ
	BinaryBuffer.prototype.length
	BinaryBuffer.prototype.push()
	BinaryBuffer.prototype.pop()
	BinaryBuffer.prototype.unshift()
	BinaryBuffer.prototype.shift()

	BinaryBuffer.prototype.Read()           // Read into this BinaryBuffer
	BinaryBuffer.prototype.Write()          // Write to a binary file
	BinaryBuffer.prototype.setUint8()       // set the Uint8 value
	BinaryBuffer.prototype.setUint16()      // set the Uint16 value (big-endian)
	BinaryBuffer.prototype.setUint16LE()    // set the Uint16 value (little-endian)
	BinaryBuffer.prototype.setUint32()      // set the Uint32 value (big-endian)
	BinaryBuffer.prototype.setUint32LE()    // set the Uint32 value (little-endian)
	BinaryBuffer.prototype.getUint8()       // get the Uint8 value
	BinaryBuffer.prototype.getUint16()      // get the Uint16 value (big-endian)
	BinaryBuffer.prototype.getUint16LE()    // get the Uint16 value (little-endian)
	BinaryBuffer.prototype.getUint32()      // get the Uint32 value (big-endian)
	BinaryBuffer.prototype.getUint32LE()    // get the Uint32 value (little-endian)

## その他
言語の仕様により素直に実装できないため ここでは少し工夫した実装をして解消している。

以下は素直に実装しようとした場合に問題となる点。
* Arrayを継承するとlength=0のまま変化しない。
* adTypeBinaryの読み書きは特殊なオブジェクト型のためデータ編集できない。
* charCodeAt()0x80以降に戻り値が16bit値になる個所がある。またその値に規則性がない。

#### charCodeAt()の戻り値

.Type = adTypeText  
.charset = "iso-8859-1"

	Character    charCodeAt()
	0x00-0x7f -> 0x00-0x7f
	0x80-0xff -> 0x80-0xff (ただし下記コードを除く)
	
	0x80      -> 0x20ac
	0x82      -> 0x201a
	0x83      -> 0x0192
	0x84      -> 0x201e
	0x85      -> 0x2026
	0x86      -> 0x2020
	0x87      -> 0x2021
	0x88      -> 0x02c6
	0x89      -> 0x2030
	0x8a      -> 0x0160
	0x8b      -> 0x2039
	0x8c      -> 0x0152
	0x8e      -> 0x017d
	0x91      -> 0x2018
	0x92      -> 0x2019
	0x93      -> 0x201c
	0x94      -> 0x201d
	0x95      -> 0x2022
	0x96      -> 0x2013
	0x97      -> 0x2014
	0x98      -> 0x02dc
	0x99      -> 0x2122
	0x9a      -> 0x0161
	0x9b      -> 0x203a
	0x9c      -> 0x0153
	0x9e      -> 0x017e
	0x9f      -> 0x0178

.Type = adTypeText  
.charset = "ascii"

	Character    charCodeAt()
	0x00-0x7f -> 0x00-0x7f
	0x80-0xff -> 0x00-0x7f
