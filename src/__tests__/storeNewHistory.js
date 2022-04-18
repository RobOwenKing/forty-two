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
  it('should work over month boundaries', () => {
    const oldHistory = {
      'lastPlayed': "Wed Mar 02 2022",
      'scores': [7, 8, 9, 10]
    };
    const newHistory = convertStoredHistory(oldHistory);
    expect(newHistory["Wed Mar 02 2022"]['s']).toBe(10);
    expect(newHistory["Tue Mar 01 2022"]['s']).toBe(9);
    expect(newHistory["Mon Feb 28 2022"]['s']).toBe(8);
    expect(newHistory["Sun Feb 27 2022"]['s']).toBe(7);
    expect(Object.entries(newHistory).length).toBe(4);
  });
  it('should ignore days when 0 was scored', () => {
    const oldHistory = {
      'lastPlayed': new Date().toDateString(),
      'scores': [3, 0, 0, 2, 0, 1, 0]
    };
    const newHistory = convertStoredHistory(oldHistory);
    let d = new Date();
    d.setDate(d.getDate() - 1);
    expect(newHistory[d.toDateString()]['s']).toBe(1);
    d.setDate(d.getDate() - 2);
    expect(newHistory[d.toDateString()]['s']).toBe(2);
    d.setDate(d.getDate() - 3);
    expect(newHistory[d.toDateString()]['s']).toBe(3);
    expect(Object.entries(newHistory).length).toBe(3);
  });
  it('should set correct max value', () => {
    const oldHistory = {
      'lastPlayed': "Fri Apr 15 2022",
      'scores': [24, 27, 27, 28]
    };
    const newHistory = convertStoredHistory(oldHistory);
    expect(newHistory["Fri Apr 15 2022"]['m']).toBeTruthy(); // Max was 28
    expect(newHistory["Thu Apr 14 2022"]['m']).toBeFalsy();  // Max was 28
    expect(newHistory["Wed Apr 13 2022"]['m']).toBeTruthy(); // Max was 27
    expect(newHistory["Tue Apr 12 2022"]['m']).toBeFalsy();  // Max was 26
  });
})
