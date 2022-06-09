import type {
  EventTransaction,
  FormattedEvent,
  IBankAccountEventShared,
} from '../types';
import { cloneDeep } from 'lodash';

export function getAccountBalance(event: EventTransaction[]) {
  let balanceCredited: number;
  let balanceDebited: number;

  const balanceCreditedFiltered = event.filter(
    (a) => a.type === 'MoneyCredited'
  );

  const balanceDebitedFiltered = event.filter((a) => a.type === 'MoneyDebited');

  if (balanceCreditedFiltered.length) {
    balanceCredited = balanceCreditedFiltered
      .map((a) => a.value)
      .reduce((a, b) => a + b);
  } else {
    balanceCredited = 0;
  }

  if (balanceDebitedFiltered.length) {
    balanceDebited = balanceDebitedFiltered
      .map((a) => a.value)
      .reduce((a, b) => a + b);
  } else {
    balanceDebited = 0;
  }

  return balanceCredited - balanceDebited;
}

export function formatDateToMillisecond(event: IBankAccountEventShared[]) {
  const dataClone = cloneDeep(event);

  dataClone.forEach((transaction) => {
    transaction.time = Date.parse(transaction.time).toString();
  });

  return dataClone as FormattedEvent[];
}

export function formatTransactions(event: FormattedEvent[]) {
  return event.slice(1).map((obj) => ({
    type: obj.type === 'MoneyDebited' ? 'debit' : 'credit',
    value: obj.value || 0,
    timestamp: obj.time,
  }));
}
