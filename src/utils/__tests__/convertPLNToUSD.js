import { convertPLNToUSD } from '../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is a text', () => {
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('-6')).toBeNaN();
  });
  it('should return NaN when when missing input', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should retun Error when input is not a string or a number', () =>{
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });
  it('should retun $0.00 when input value is lower than 0', () =>{
    expect(convertPLNToUSD(-5)).toBe('$0.00');
    expect(convertPLNToUSD(-5.5)).toBe('$0.00');
    expect(convertPLNToUSD(-12)).toBe('$0.00');
  });
});