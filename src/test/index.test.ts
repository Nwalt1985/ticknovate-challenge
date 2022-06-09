import {
  getAccountBalance,
  formatDateToMillisecond,
  formatTransactions,
} from '../helpers';
import { loadEvents } from '../lib/events';
import {
  BankAccountEventBase,
  EventTransaction,
  FormattedEvent,
  IBankAccountEventShared,
} from '../types';

const event = [
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
] as unknown as BankAccountEventBase[];

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

    expect(result).toEqual(event);
  });
});

describe('getAccountBalance', () => {
  it('should return balance of account', () => {
    const balance = getAccountBalance(event as EventTransaction[]);

    expect(balance).toEqual(-156);
  });
});

describe('formatDateToMillisecond', () => {
  it('should format all dates', () => {
    expect(
      formatDateToMillisecond(event as unknown as IBankAccountEventShared[])
    ).toEqual([
      {
        accountId: '02609001',
        type: 'AccountOpened',
        ownerName: 'Mertie Smitham',
        time: '1585107934842',
        position: 0,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 30,
        time: '1585609888060',
        position: 1,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 320,
        time: '1585699983603',
        position: 2,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 175,
        time: '1586301431557',
        position: 3,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 65,
        time: '1586446920070',
        position: 4,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 309,
        time: '1586450359368',
        position: 5,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 220,
        time: '1586981388527',
        position: 6,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 355,
        time: '1587506993531',
        position: 7,
      },
    ]);
  });
});

describe('formatTransactions', () => {
  it('should return array of formatted transactions', () => {
    const formattedEvent = [
      {
        accountId: '02609001',
        type: 'AccountOpened',
        ownerName: 'Mertie Smitham',
        time: '1585107934842',
        position: 0,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 30,
        time: '1585609888060',
        position: 1,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 320,
        time: '1585699983603',
        position: 2,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 175,
        time: '1586301431557',
        position: 3,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 65,
        time: '1586446920070',
        position: 4,
      },
      {
        accountId: '02609001',
        type: 'MoneyCredited',
        value: 309,
        time: '1586450359368',
        position: 5,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 220,
        time: '1586981388527',
        position: 6,
      },
      {
        accountId: '02609001',
        type: 'MoneyDebited',
        value: 355,
        time: '1587506993531',
        position: 7,
      },
    ] as unknown as FormattedEvent[];

    expect(formatTransactions(formattedEvent)).toEqual([
      { type: 'credit', value: 30, timestamp: '1585609888060' },
      { type: 'credit', value: 320, timestamp: '1585699983603' },
      { type: 'debit', value: 175, timestamp: '1586301431557' },
      { type: 'debit', value: 65, timestamp: '1586446920070' },
      { type: 'credit', value: 309, timestamp: '1586450359368' },
      { type: 'debit', value: 220, timestamp: '1586981388527' },
      { type: 'debit', value: 355, timestamp: '1587506993531' },
    ]);
  });
});
