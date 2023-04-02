import { isArrayOrObject, isEqual, PlainObject, set } from './helpers';
import { expect } from 'chai';
import { beforeEach } from 'mocha';

describe('Helpers', () => {
	let obj = {};
	const path = 'a.b';
	const value = 3;

	beforeEach(() => {
		obj = {};
	});

	it('should set a value by keypath', () => {
		const result = set(obj, path, value) as PlainObject;
		expect(result).to.deep.eq({ ...obj, a: { b: value } });
	});

	it('should return passed `object` parameter if it is not object ', () => {
		const notObj = 'string';
		const result = set(notObj, 'a', 3) as PlainObject;
		expect(result).to.eq(notObj);
	});

	it('should return true for an empty array', () => {
		const arr: [] = [];
		expect(isArrayOrObject(arr)).to.be.true;
	});

	it('should throw an Error if passed `path` parameter is not a string ', () => {
		const path = 3;
		// @ts-ignore // Для теста
		const func = () => set({}, path, 3) as PlainObject;
		expect(func).to.throw(Error);
	});

	it('should mutate passed object, not create a new one', () => {
		set(obj, path, value) as PlainObject;
		// @ts-ignore
		expect(obj.a.b).to.eq(value);
	});

	it('should return true for equal objects', () => {
		const item1: PlainObject = { a: 1, b: { c: 2 } };
		const item2: PlainObject = { a: 1, b: { c: 2 } };
		expect(isEqual(item1, item2)).to.be.true;
	});

	it('should return false for not equal objects', () => {
		const item1: PlainObject = { a: 1, b: { c: 3 } };
		const item2: PlainObject = { a: 1, b: { c: 2 } };
		expect(isEqual(item1, item2)).to.be.false;
	});
});
