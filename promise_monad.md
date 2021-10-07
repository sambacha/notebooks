## async/await is just the do-notation of the Promise monad

> [source gist](https://gist.githubusercontent.com/MaiaVictor/bc0c02b6d1fbc7e3dbae838fb1376c80/raw/0cace9c7c992f9ee8121afc6adf90395e7264ae0/promise_monad.md)

[CertSimple](https://certsimple.com) just wrote a [blog post](https://certsimple.com/blog/javascript-equals-async-await) arguing ES2017's async/await was the best thing to happen with JavaScript. I wholeheartedly agree.

In short, one of the (few?) good things about JavaScript used to be how well it handled asynchronous requests. This was mostly thanks to its Scheme-inherited implementation of functions and closures. That, though, was also one of its worst faults, because it led to the "callback hell", an seemingly unavoidable pattern that made highly asynchronous JS code almost unreadable. Many solutions attempted to solve that, but most failed. Promises almost did it, but failed too. Finally, async/await is here and, combined with Promises, it solves the problem for good. On this post, I'll explain why that is the case and trace a link between promises, async/await, the do-notation and monads.

First, let's illustrate the 3 styles by implementing a function that returns the balances of all your Ethereum accounts.

## Wrong solution: callback hell

```javascript
function getBalances(callback) {
  web3.eth.accounts(function (err, accounts) {
    if (err) {
      callback(err);
    } else {
      var balances = {};
      var balancesCount = 0;
      accounts.forEach(function(account, i) {
        web3.eth.getbalance(function (err, balance) {
          if (err) {
            callback(err);
          } else {
            balances[account] = balance;
            if (++balancesCount === accounts.length) {
              callback(null, balances);
            }
          }
        });
      });
    }
  });
};
```

The earliest way to solve this problem was to use callbacks, which caused the dreaded "callback hell", evident from the ugliness of the code above. There are 3 major issues to blame:

1. Explicit error propagation;

2. Keeping track of multiple async values with a counter;

3. Unavoidable nesting.

### Almost correct solution: Promises

```javascript
function getBalances() {
  return web3.eth.accounts()
    .then(accounts => Promise.all(accounts.map(web3.eth.getBalance))
      .then(balances => Ramda.zipObject(accounts, balances)));
}
```

Promises are first-class terms representing future values. They can be created at will, chained and returned from functions. They almost solve the 3 problems above.

1. Errors are propagated automatically through `.then()` chains;

2. `Promise.all()` tracks multiple async values cleanly;

3. Nesting is almost always avoidable by clever usage of `.then()`.

There is one leftover problem, though: `.then()` still requires nesting in some cases. On my example, for one, the second `.then()` had to be inside the first, otherwise `accounts` wouldn't be in scope. This forced me to indent the code right. This situation can sometimes be fixed by passing the value ahead:

```javascript
function getBalances() {
  return web3.eth.accounts()
    .then(accounts => Promise.all(accounts.map(web3.eth.getBalance).then(balances => [accounts, balances])))
    .then(([accounts, balances]) => Ramda.zipObject(accounts, balances));
}
```

But that is verbose and, as such, won't work if you have a complex dependency tree, forcing you to indent everything again. In short, Promises solve the callback hell for most cases, but not all.

### Correct solution: async/await

```javascript
async function getBalances() {
  const accounts = await web3.eth.accounts();
  const balances = await Promise.all(accounts.map(web3.eth.getBalance));
  return Ramda.zipObject(balances, accounts);
}
```

The new `async` functions allow you to use `await`, which causes the function to wait for the promise to resolve before continuing its execution. With that, we're able to solve the indenting problem once for all, for any arbitrary code. Now, I'll explain why that is the case. Before, though, let's talk about the actual origin of the problem.

## The origins of the callback hell

Many associate the "callback hell" with asynchronous values, but the problem is much more widespread than that: it naturally arises anytime computation must be performed on "wrapped" values that are accessed through callbacks. For a simple example, suppose that you wanted to print all the combinations of numbers from the arrays `[1,2,3]`, `[4,5,6]`, `[7,8,9]`. This is a way to do it: 


```javascript
[1,2,3].map((x) => {
  [4,5,6].map((y) => {
    [7,8,9].map((z) => { 
      console.log(x,y,z);
    })
  })
});
```

Notice how the familiar nesting shows up here: it is caused by the same inherent issue that causes the callback hell. Compare `[1,2,3].map(x => ...)` to `promise.then(x => ...)`. If mapping over nested arrays was as common as dealing with asynchronous values, by 2018 we'd probably have an `multi/pick` syntax:

```javascript
multi function () {
  x = pick [1, 2, 3];
  y = pick [4, 5, 6];
  z = pick [7, 8, 9];
  console.log(x, y, z);
}
```

... which is exactly equivalent to `async/await`, except that, instead of implementing terms that can be defined in a future, it implements terms that can have multiple values simultaneously.

## Monads and do-notation

In some languages such as Haskell and Idris, values which can be wrapped and chained in arbitrary ways are much more common. As such, they had to develop a way to deal with all of them, not just a specific case. Their solution was to specify an "interface" for wrappeable/chainable values, and a special syntax to flatten arbitrary chains of wrapped values. 

```typescript
// Pseudo-code of an interface for wrappeable/chainable values.
// `wrap` receives a value and wraps it.
// `chain` receives a wrapped value, a callback and returns a wrapped value.
interface Wrapper<W> {
  wrap<A>(value:A): W<A>,
  chain<A,B>(value:W<A>, callback: A => W<B>): W<B>
}
```

The syntax was called the [do-notation](https://en.wikibooks.org/wiki/Haskell/do_notation), and the interface was named "Monad". Thanks those 2 insights, they have, since [1995](http://code.haskell.org/~dons/haskell-1990-2000/msg01481.html), been free from their "callback hell" problem. That is why JavaScript finally did it too. If you squint a little bit, JS Promises are just monads of future values that can throw: `Promise.resolve(value)` implements `wrap`, and `value.then(callback)` implements `chain`. Under that point of view, `async/await` is just the `do-notation` for that specific monad, providing the same kind of arbitrary chain flattening. It is, ultimately, the same solution and, given that it worked so well on Haskell, it is reasonable to assume it will work on JavaScript too.


```haskell
-- Monad is just a fancy name for the Wrapper interface above
class Monad m where
  return :: a -> m a                 -- wrap
  (>>=)  :: m a -> (a -> m b) -> m b -- chain
  
-- Promises are monads, so we can make an instance for it
instance Monad Promise where
  return value       = Promise.resolve value
  value >>= callback = Promise.then value callback

-- Then the do-syntax becomes equivalent to async/await
getBalances :: Promise (Map String String)
getBalances = do
  accounts <- getAccounts
  balances <- getBalance accounts
  return (Map.fromList (zip accounts balances))
```



Now everything is good and JavaScript is great again, yet I wonder why it took so long. If only the community listened [that crazy guy](https://github.com/promises-aplus/promises-spec/issues/94) about 5 years ago...
