#### 1. Define the architecture of the communication between consensus client, execution client, and mev-boost. 

:heavy_check_mark: mev-boost will be a sidecar. The consensus client opts-in to use mev-boost. If it fails for any reason, the consensus client falls back to direct communication to the execution client.

#### 2. Write a basic specification that is conservative, centralized, and trusted.
  
:heavy_check_mark: [Specification v0.2](https://github.com/flashbots/mev-boost/blob/main/docs/specification.md)

#### 3. Move the API to Ethereum specs, polish and make it ready to be implemented.

:heavy_check_mark: https://github.com/ethereum/builder-specs

#### 4. Implement the specification in mev-boost and mergemock.

[Milestone: merge-ready.]

:heavy_check_mark: https://github.com/flashbots/mev-boost

:heavy_check_mark: https://github.com/protolambda/mergemock

#### 5. Implement the specification in the flashbots builder.

:heavy_check_mark: https://builder-relay-ropsten.flashbots.net/ + https://builder-relay-kiln.flashbots.net/

[Milestone: merge-ready.]

#### 6. Audit the version of mev-boost implementing the builder API v0.1.0.

:heavy_check_mark: https://github.com/flashbots/mev-boost/pull/223

[Milestone: merge-ready.]

#### 7. Test with kiln and ropsten. 

:heavy_check_mark: Flashbots builder on Kiln and Ropsten is up and running.

[Milestone: end-to-end-ready. Expected deadline, end of june]

#### 8. Implement the specification in the consensus clients. 

:hourglass_flowing_sand: in progress, currently live testing

See also the consensus client implementation status table here: https://github.com/flashbots/mev-boost/wiki#implementation-status

[Milestone: [all-client-support](https://github.com/flashbots/mev-boost/milestone/4). Expected deadline, end of june]

#### 9. Add requirements specific for validator pools.

[Milestone: [validator-pool-extras](https://github.com/flashbots/mev-boost/milestone/6). Expected deadline, mid july]

#### 10. Add requirements specific for big validators.

[Milestone: big-extras. Expected deadline, end of july]

#### 11. Add a second independent builder. [Expected deadline, mid august]

#### 12. Explore the options for decentralization of the builders. [Expected deadline, september]

#### 13. Explore the options for decentralization of the orderflow. [Expected deadline, october]

#### 14. Second audit

https://github.com/flashbots/mev-boost/issues/224

[Milestone: [safer-merge](https://github.com/flashbots/mev-boost/milestone/7). Expected deadline, september]

#### 15. Implement a relay monitor

[Milestone: [safer-merge](https://github.com/flashbots/mev-boost/milestone/7). Expected deadline, september]

#### 16. Circuit breaker in consensus clients

[Milestone: [safer-merge](https://github.com/flashbots/mev-boost/milestone/7). Expected deadline, september]

#### 17. [...]

#### 18. Magic. [daily during sunset :sun_with_face:]
 
#### 19. In protocol PBS. [Expected deadline, 2023]