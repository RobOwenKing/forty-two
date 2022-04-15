import { convertStoredHistory } from '../helpers/storeNewHistory.js';

describe('convertStoredHistory()', () => {
  it('should work with a lastPlayed of today', () => {
    const oldHistory = {
      'lastPlayed': new Date().toDateString(),
      'scores': [1, 2, 3]
    };
    const newHistory = convertStoredHistory(oldHistory);
    let d = new Date();
    expect(newHistory[d.toDateString()]['s']).toBe(3);
    d.setDate(d.getDate() - 1);
    expect(newHistory[d.toDateString()]['s']).toBe(2);
    d.setDate(d.getDate() - 1);
    expect(newHistory[d.toDateString()]['s']).toBe(1);
  });
  /* it('should work with a lastPlayed in the past') */
  /* it('should work over month boundaries') */
  /* it('should ignore days when 0 was scored') */
})
