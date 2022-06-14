# Source map parsing algo

Solidity source maps take the following form:

> before 0.6.0

```dhall
s:l:f:j
```

> after 0.6.0

```dhall
s:l:f:j:m
```

The format was changed in 0.6.0 to include the modifier depth.

The compiler outputs this in a compressed form which skips repetitions,
as nicely explained in the solidity docs -
[https://docs.soliditylang.org/en/latest/internals/source_mappings.html#source-mappings](https://docs.soliditylang.org/en/latest/internals/source_mappings.html#source-mappings)

## Algorithm

The HEVM parser essentially `uncompresses` this format – it outputs a
list of `s:l:f:j` information (indexed by instruction offset). It is a
state machine parser which builds up the output list as it consumes the
compressed format.

### State 1 (parsing s):

Set `s` to the previous `s` value.

If the following char(s) is:

-   Digits Read and consume them and make them the current `s` value.
    **Remain in state 1.**

-   `:` Consume and go to state 2.

-   `;` Use the values of 'l:f:j:m' from the previous entry and add as a
    new entry with current `s`. **Remain in state 1**

### State 2 (parsing l):

Set `l` to the previous `l` value.

If the following char(s) are:

-   Digits Read and consume them and make them the current `l` value.
    Remain in state 2.

-   `:` Consume and go to state 3.

-   `;` Use the values of 'f:j:m' from the previous entry and add as a
    new entry with current `s` and `l`. Go to state 1

### State 3 (parsing f):

Set `f` to the previous `f` value.

If the following char(s) are:

-   Digits Read and consume them and make them the current `f` value.
    Remain in state 3.

-   `:` Consume and go to state 4.

-   `;` Use the values of 'j:m' from the previous entry and add as a new
    entry with current `s`, `l` and `f`. Go to state 1

#### State 4 (parsing j):

Set `j` to the previous `j` value.

If the following char(s) are:

-   Digits Read and consume them and make them the current `j` value.
    Remain in state 4.

-   `:` Consume and go to state 5.

-   `;` Use the values of 'm' from the previous entry and add as a new
    entry with current `s`, `l`, `f` and `j`. Go to state 1

#### State 5 (parsing m):

Set `m` to the previous `m` value.

If the following char(s) are:

-   Digits Read and consume them and make them the current `j` value.
    Remain in state 5.

-   `;` Add a new entry with current `s`, `l`, `f` and `j` `m`. Go to
    state 1

## Note

Keep in mind that in order to use this format its necessary to know the
instruction offset of the current bytecode position. HEVM maintains a
mapping from bytecode offset to instruction offset. That way the srccode
lookup first looks up the current instruction offset and uses that index
to lookup the srcmap offset.
