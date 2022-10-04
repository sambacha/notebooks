### parity / open ethereum

[source, parity](https://github.com/openethereum/parity-ethereum/blob/73db5dda8c0109bb6bc1392624875078f973be14/ethcore/src/verification/verification.rs#L296-L307)

```rust
	if is_full {
		const ACCEPTABLE_DRIFT: Duration = Duration::from_secs(15);
		let max_time = SystemTime::now() + ACCEPTABLE_DRIFT;
		let invalid_threshold = max_time + ACCEPTABLE_DRIFT * 9;
		let timestamp = UNIX_EPOCH + Duration::from_secs(header.timestamp());

// Tomasz Drwięga, 3 years ago: • Mark future blocks as temporarily invalid.
		if timestamp > invalid_threshold {
			return Err(From::from(BlockError::InvalidTimestamp(OutOfBounds { max: Some(max_time), min: None, found: timestamp })))
		}

		if timestamp > max_time {
			return Err(From::from(BlockError::TemporarilyInvalid(OutOfBounds { max: Some(max_time), min: None, found: timestamp })))
		}Igor Artamonov, 4 years ago: • invalidate blocks from future
	}
```
