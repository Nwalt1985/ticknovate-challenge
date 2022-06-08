import express from 'express';
import { expressErrorHandler } from './lib/errorHandling';
import { loadEvents } from './lib/events';
import { IBankAccount } from './types';

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

    /**
     * TODO: helper functions
     * balance - loop through and return the balance of the account
     * isOverdrawn - if account is in credit return true else false
     * date format - format dates to milliseconds
     * transactions - create new array with formatted transactions
     *
     * create tests for new methods.
     **/

    const account: IBankAccount = {
      status: 'open',
      accountId: '',
      ownerName: '',
      balance: 0,
      isOverdrawn: true || false,
      openedAt: Date.now(), // replace with timestamp
      transactions: [
        {
          type: 'debit' || 'credit',
          value: 0,
          timestamp: Date.now(), // replace
        },
      ],
    };

    res.json(account);
  } catch (err) {
    next(err);
  }
});

app.use(expressErrorHandler);
