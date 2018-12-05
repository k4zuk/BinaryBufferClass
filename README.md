# BinaryBufferClass
Binary Buffer Class in JScript. Read, Write, Modify data in an Array-like object.

#### Class members
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
