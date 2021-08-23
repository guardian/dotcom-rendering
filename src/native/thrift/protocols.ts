import type {
	Int64,
	IThriftField,
	IThriftList,
	IThriftMap,
	IThriftMessage,
	IThriftSet,
	IThriftStruct,
	TTransport,
	TType,
} from '@creditkarma/thrift-server-core';
import { MessageType, TProtocol } from '@creditkarma/thrift-server-core';

export abstract class TProtocolDecorator extends TProtocol {
	private concreteProtocol: TProtocol;

	constructor(protocol: TProtocol) {
		super(protocol.getTransport());
		this.concreteProtocol = protocol;
	}

	getTransport(): TTransport {
		return this.concreteProtocol.getTransport();
	}
	flush(): Buffer {
		return this.concreteProtocol.flush();
	}
	writeMessageBegin(name: string, type: MessageType, seqid: number): void {
		return this.concreteProtocol.writeMessageBegin(name, type, seqid);
	}
	writeMessageEnd(): void {
		return this.concreteProtocol.writeMessageEnd();
	}
	writeStructBegin(name: string): void {
		return this.concreteProtocol.writeStructBegin(name);
	}
	writeStructEnd(): void {
		return this.concreteProtocol.writeStructEnd();
	}
	writeFieldBegin(name: string, type: TType, id: number): void {
		return this.concreteProtocol.writeFieldBegin(name, type, id);
	}
	writeFieldEnd(): void {
		return this.concreteProtocol.writeFieldEnd();
	}
	writeFieldStop(): void {
		return this.concreteProtocol.writeFieldStop();
	}
	writeMapBegin(keyType: TType, valueType: TType, size: number): void {
		return this.concreteProtocol.writeMapBegin(keyType, valueType, size);
	}
	writeMapEnd(): void {
		return this.concreteProtocol.writeMapEnd();
	}
	writeListBegin(elementType: TType, size: number): void {
		return this.concreteProtocol.writeListBegin(elementType, size);
	}
	writeListEnd(): void {
		return this.concreteProtocol.writeListEnd();
	}
	writeSetBegin(elementType: TType, size: number): void {
		return this.concreteProtocol.writeSetBegin(elementType, size);
	}
	writeSetEnd(): void {
		return this.concreteProtocol.writeSetEnd();
	}
	writeBool(bool: boolean): void {
		return this.concreteProtocol.writeBool(bool);
	}
	writeByte(b: number): void {
		return this.concreteProtocol.writeByte(b);
	}
	writeI16(i16: number): void {
		return this.concreteProtocol.writeI16(i16);
	}
	writeI32(i32: number): void {
		return this.concreteProtocol.writeI32(i32);
	}
	writeI64(i64: number | Int64): void {
		return this.concreteProtocol.writeI64(i64);
	}
	writeDouble(dbl: number): void {
		return this.concreteProtocol.writeDouble(dbl);
	}
	writeString(arg: string): void {
		return this.concreteProtocol.writeString(arg);
	}
	writeBinary(arg: string | Buffer): void {
		return this.concreteProtocol.writeBinary(arg);
	}
	readMessageBegin(): IThriftMessage {
		return this.concreteProtocol.readMessageBegin();
	}
	readMessageEnd(): void {
		return this.concreteProtocol.readMessageEnd();
	}
	readStructBegin(): IThriftStruct {
		return this.concreteProtocol.readStructBegin();
	}
	readStructEnd(): void {
		return this.concreteProtocol.readStructEnd();
	}
	readFieldBegin(): IThriftField {
		return this.concreteProtocol.readFieldBegin();
	}
	readFieldEnd(): void {
		return this.concreteProtocol.readFieldEnd();
	}
	readMapBegin(): IThriftMap {
		return this.concreteProtocol.readMapBegin();
	}
	readMapEnd(): void {
		return this.concreteProtocol.readMapEnd();
	}
	readListBegin(): IThriftList {
		return this.concreteProtocol.readListBegin();
	}
	readListEnd(): void {
		return this.concreteProtocol.readListEnd();
	}
	readSetBegin(): IThriftSet {
		return this.concreteProtocol.readSetBegin();
	}
	readSetEnd(): void {
		return this.concreteProtocol.readSetEnd();
	}
	readBool(): boolean {
		return this.concreteProtocol.readBool();
	}
	readByte(): number {
		return this.concreteProtocol.readByte();
	}
	readI16(): number {
		return this.concreteProtocol.readI16();
	}
	readI32(): number {
		return this.concreteProtocol.readI32();
	}
	readI64(): Int64 {
		return this.concreteProtocol.readI64();
	}
	readDouble(): number {
		return this.concreteProtocol.readDouble();
	}
	readBinary(): Buffer {
		return this.concreteProtocol.readBinary();
	}
	readString(): string {
		return this.concreteProtocol.readString();
	}
	skip(type: TType): void {
		return this.concreteProtocol.skip(type);
	}
}

export class TMultiplexedProtocol extends TProtocolDecorator {
	static readonly separator = ':';
	readonly serviceName: string;

	constructor(protocol: TProtocol, serviceName: string) {
		super(protocol);
		this.serviceName = serviceName;
	}

	writeMessageBegin(name: string, type: MessageType, seqid: number): void {
		if (type === MessageType.CALL || type === MessageType.ONEWAY) {
			super.writeMessageBegin(
				this.serviceName + TMultiplexedProtocol.separator + name,
				type,
				seqid,
			);
		} else {
			super.writeMessageBegin(name, type, seqid);
		}
	}
}
