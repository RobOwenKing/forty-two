import { areBracketsBalanced } from '../helpers/areBracketsBalanced';

describe('areBracketsBalanced()', () => {
  it('should return true in the null case', () => {
    expect(areBracketsBalanced("2 + 2 = 4")).toBeTruthy();
  });
})
