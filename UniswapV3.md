
# UniswapV3 Notes


but this is pretty jank anyway, the nice thing about harmonic mean liquidity is that it is extremely biased towards lower values, but if you can get the block ending liquidity to be high on a pool you can bias the result a lot. then again i guess that's why we'll call this one dangerous. https://www.wolframalpha.com/input/?i=harmonic+mean+of+%7B1%2C+2%5E128%2C+2%5E128%2C+2%5E128%2C+2%5E128%2C+2%5E128%2C+2%5E128%7D

[source](https://github.com/Uniswap/v3-periphery/pull/207/files#r718702058)



In addition to all the complexities already discussed in the issue linked above, a medianizing scheme might make sense for this use case.

It probably makes the most sense to derive a single canonical price per USD-stable asset, and then input these into a medianizer/weighting function? as opposed to using pool-level observations across assets.




