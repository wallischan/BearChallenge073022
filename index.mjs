import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const choiceArray = ["I'm not here", "I'm still here"]

const accBob =
  await stdlib.newTestAccount(startingBalance);

const accAlice = 
  await stdlib.newTestAccount(stdlib.parseCurrency(6000));

const getbalance = async (who) => stdlib.formatCurrency(await balanceof(who));

console.log("Alice's balance before is ${await getBalance(accAlice)}");

console.log("Bob's balance before is ${await getBalance(accBob)}");

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

const shared = () => ({
  showtime: (t) => {
    //parseInteger
    console.log(parseInt(t));
  },
});

console.log('Starting backends...');

await Promise.all([
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    ...shared,
    // implement Alice's interact object here
    inherit: stdlib.parseCurrency(5000),
    getchoice: () => {
      const choice = Math.floor(Math.random() * 2);
      console.log('Alice choice is ${choiceArray[choice]} ')
      return(choice === 0? false:true)
    }
  }),
  backend.Bob(ctcBob, {
    ...stdlib.hasRandom,
    ...shared,
    // implement Bob's interact object here
    accept_terms: (num) => {
      console.log('Bob accepts the terms of the vault for ${stdlib.formatCurrency(num)}');
      return true;
    }
  }),
]);

console.log("Alice's balance after is ${await getBalance(accAlice)}");
console.log("Bob's balance after is ${await getBalance(accBob)}");
console.log('Goodbye, Alice and Bob!');
