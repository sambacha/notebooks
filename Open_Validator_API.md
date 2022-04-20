# Open Validator Service Broker



### Node Instances 

#### Overview
Service Instances

  

#### API 
**PUT**

/v2/service_instances/{instance_id}

provision a service instance

  

**PATCH**

/v2/service_instances/{instance_id}

update a service instance

  

**DELETE**

/v2/service_instances/{instance_id}

deprovision a service instance

  

**GET**

/v2/service_instances/{instance_id}

gets a service instance

  

**GET**

> last requested operation state for service instance

/v2/service_instances/{instance_id}/last_operation

  
  

### Node Bindings


##### Overview 
Service Bindings

  
#### API 
**GET**

> last requested operation state for service binding

  

/v2/service_instances/{instance_id}/service_bindings/{binding_id}/last_operation

  
  

**PUT**

> generation of a service binding

  

/v2/service_instances/{instance_id}/service_bindings/{binding_id}

  
  

**DELETE**

> deprovision of a service binding

/v2/service_instances/{instance_id}/service_bindings/{binding_id}

  
  

**GET**

> gets a service binding

/v2/service_instances/{instance_id}/service_bindings/{binding_id}

  
  
  

## PubKey Identifier

https://github.com/sambacha/metamask-decloak/tree/master/pubkey

Public Key: nGU4tXKN+yi5HA1VNE321h/mpvn/34CMelLbl7Br3Hk=