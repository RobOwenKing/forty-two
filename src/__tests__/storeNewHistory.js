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
  it('should work with a lastPlayed in the past', () => {
    const oldHistory = {
      'lastPlayed': "Mon Apr 11 2022",
      'scores': [4, 5, 6]
    };
    const newHistory = convertStoredHistory(oldHistory);
    expect(newHistory["Mon Apr 11 2022"]['s']).toBe(6);
    expect(newHistory["Sun Apr 10 2022"]['s']).toBe(5);
    expect(newHistory["Sat Apr 09 2022"]['s']).toBe(4);
    expect(Object.entries(newHistory).length).toBe(3);
  });
  /* it('should work over month boundaries') */
  /* it('should ignore days when 0 was scored') */
})
