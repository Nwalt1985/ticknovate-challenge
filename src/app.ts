import express from 'express';
import { expressErrorHandler } from './lib/errorHandling';
import { loadEvents } from './lib/events';
import {
  BankAccountEventBase,
  IBankAccount,
  EventTransaction,
  FormattedEvent,
  ReturnedAccount,
  Transactions,
} from './types';
import {
  formatDateToMillisecond,
  getAccountBalance,
  formatTransactions,
} from './helpers';

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.contentType('text/html');
  res.send(`
    <style>
      html { font-family: sans-serif; }
      body { padding: 4rem; line-height: 1.5; }
    </style>

    <h1>Ticknovate test</h1>

    <p>Hello! Add your two routes to this app to complete the test.</p>
    
    <p>The boilerplate of the <a href="/accounts/12060626">first one</a> has been done for you, but you'll
    have to complete the implementation, and add the second route for
    changing an account owner's name. See the README for more information.</p>
    
    <p>Good luck!</p>
  `);
});

app.get('/accounts/:id', async (req, res, next) => {
  try {
    const events = await loadEvents(req.params.id);
    const balance = getAccountBalance(events as EventTransaction[]);
    const isOverdrawn = balance < 0 ? true : false;
    const eventFormattedDates = formatDateToMillisecond(events);
    const transactions = formatTransactions(
      eventFormattedDates
    ) as unknown as Transactions[];

    const account: ReturnedAccount = {
      status: 'open',
      accountId: eventFormattedDates[0].accountId,
      ownerName: eventFormattedDates[0].ownerName,
      balance,
      isOverdrawn,
      openedAt: parseInt(eventFormattedDates[0].time),
      transactions,
    };

    res.json(account);
  } catch (err) {
    next(err);
  }
});

app.use(expressErrorHandler);
