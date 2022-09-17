# `registerValidator` errors

Probably shows up in mev-boost logs as 502 errors in `registerValidator` request.

### logs contain `not a known validator`

This means the relay doesn't know about this validator. 

Steps to resolve:

* Make sure you can find the validator like this: https://prater.beaconcha.in/validator/0x982dd72a5e4fd203113e309dacd5268c3d84c4404425deec858e26dc2e982e3ff17f1f412881664fe0f18c9a0d17632f
* If the validator is found in prater.beaconcha.in, then create a Github issue with the beaconcha.in link and the mev-boost logs

### logs contain `failed to verify validator signature `

See also https://github.com/flashbots/mev-boost/issues/281 - make sure you are setting the correct network flags to both your beacon node and validator client.

### logs contain `context deadline exceeded`

Might look similar to this in the logs:

* This means that the the request didn't finish in time until the mev-boost request timeout expires.
* Sending 1k validator registrations is about 500KB of data
* Slow connections from server to the relay might take more than 2 seconds to establish the connection and send the data

**Solution:**
- ensure your server has good connectivity (and bandwidth) to the US
- configure a smaller validatorRegistration bucket size on the beacon node (instead of sending up to 1k at once, try with 500)
- higher mev-boost request timeout - eg. 3.5s: `-request-timeout 3500`

# Other issues

Please create an issue for it here: https://github.com/flashbots/mev-boost/issues/new