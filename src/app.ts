import express from 'express';
import { expressErrorHandler } from './lib/errorHandling';
import { loadEvents, saveEvents } from './lib/events';
import { IBankAccount, EventTransaction, UpdateUserRequest } from './types';
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
    const transactions = formatTransactions(eventFormattedDates);

    const updatedName = events
      .filter((obj) => obj.type === 'AccountNameUpdated')
      .pop()?.ownerName;

    const account: IBankAccount = {
      status: 'open',
      accountId: eventFormattedDates[0].accountId,
      ownerName: updatedName || eventFormattedDates[0].ownerName,
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

app.post('/accounts/update', async (req, res, next) => {
  try {
    const { account, ownerName } = req.body as UpdateUserRequest;
    const events = await loadEvents(account);

    const recentUpdatedName = events
      .filter((obj) => obj.type === 'AccountNameUpdated')
      .pop()?.ownerName;

    if (ownerName === events[0].ownerName || ownerName === recentUpdatedName) {
      res.json('Owner name already exists');
    }

    const lastEvent = events.pop()!;

    const update = [
      {
        accountId: account,
        type: 'AccountNameUpdated',
        ownerName,
        time: new Date().toISOString(),
        position: lastEvent.position > 0 ? lastEvent.position + 1 : 1,
      },
    ];

    await saveEvents(update);

    res.json(`Account: ${account} successfully updated.`);
  } catch (err) {
    next(err);
  }
});

app.use(expressErrorHandler);
