import {deepCopy} from '../client/utils/helperFunctions';

describe('Deep Copy Test', () => {
  it('deep copy should return constants', () => {
    expect(deepCopy(5)).toBe(5);
  });

  it('should return deep copy of an array', () => {
    expect(deepCopy([1,2,3,4,5])).not.toBe([1,2,3,4,5]);
    expect(deepCopy([1,2,3,4,5])).toEqual([1,2,3,4,5]);
  });

  it('should return deep copy of nested array', () => {
    expect(deepCopy([1,2,[3,4,5, ['yellow', 'red']], 6,7])).not.toBe([1,2,[3,4,5, ['yellow', 'red']], 6,7]);
    expect(deepCopy([1,2,[3,4,5, ['yellow', 'red']], 6,7])).toEqual(([1,2,[3,4,5, ['yellow', 'red']], 6,7]));
  });

  it('should return deep copy of object', () => {
    expect(deepCopy({color: 'red', size: 'large'})).not.toBe({color: 'red', size: 'large'});
    expect(deepCopy({color: 'red', size: 'large'})).toEqual({color: 'red', size: 'large'});
  });

  it('should return deep copy of nested objects', () => {
    expect(deepCopy({color: 'red', size: 'large', features: { texture: 'rough', }})).not.toBe({color: 'red', size: 'large', features: { texture: 'rough', }});
    expect(deepCopy({color: 'red', size: 'large', features: { texture: 'rough', }})).toEqual({color: 'red', size: 'large', features: { texture: 'rough', }});
  });
});