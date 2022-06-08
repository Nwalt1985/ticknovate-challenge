import { loadEvents } from '../lib/events';

describe('LoadEvents', () => {
  it('should throw an error', async () => {
    const account = '00000';

    try {
      await loadEvents(account);
    } catch ({ message }) {
      expect(message).toEqual('Account not found');
    }
  });

  it('should return account details', async () => {
    const account = '02609001';
    const result = await loadEvents(account);

    expect(result).toEqual([
      {
        accountId: '02609001',
        type: 'AccountOpened',
        ownerName: 'Mertie Smitham',
        time: '2020-03-25T03:45:34.842Z',
        position: 0,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 30,
        time: '2020-03-30T23:11:28.060Z',
        position: 1,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 320,
        time: '2020-04-01T00:13:03.603Z',
        position: 2,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 175,
        time: '2020-04-07T23:17:11.557Z',
        position: 3,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 65,
        time: '2020-04-09T15:42:00.070Z',
        position: 4,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 309,
        time: '2020-04-09T16:39:19.368Z',
        position: 5,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 220,
        time: '2020-04-15T20:09:48.527Z',
        position: 6,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 355,
        time: '2020-04-21T22:09:53.531Z',
        position: 7,
      },
    ]);
  });
});

describe('GET', () => {
  it('should return bank details', () => {});
});
