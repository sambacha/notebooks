# Issues and Edge Cases

-   [postgres issue#227](https://github.com/lib/pq/issues/227)

-   [web3 getBlock and getBlockTimestamp can only store 53 bits](https://github.com/ChainSafe/web3.js/issues/3512)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Change the time zone of your Amazon RDS DB instance to local time. <a href="https://t.co/JBq4JSgCRl">https://t.co/JBq4JSgCRl</a> 🕰 <a href="https://t.co/eIqyKBczPP">pic.twitter.com/eIqyKBczPP</a></p>&mdash; Amazon Web Services (@awscloud) <a href="https://twitter.com/awscloud/status/997174917908004864?ref_src=twsrc%5Etfw">May 17, 2018</a></blockquote>
<br>
<br>

### 1937-01-01T12:00:27.87+00:20

> Netherlands TimeZone edge case

This represents the same instant of time as noon, January 1, 1937,
Netherlands time. Standard time in the Netherlands was exactly 19
minutes and 32.13 seconds ahead of UTC by law from 1909-05-01 through
1937-06-30. This time zone cannot be represented exactly using the HH:MM
format, and this timestamp uses the closest representable UTC offset.
