# Graphing our way through the ICIJ offshore jurisdiction data - graphgists

> ## Excerpt
> In 2013 the International Consortium of Investigative Journalism (ICIJ) released a subset of the leaked dataset on offshore jurisdictions to the public.
This dataset contains ownership information about companies created in 10 offshore jurisdictions including the British Virgin Islands, the Cook Islands and Singapore.
It covers nearly 30 years until 2010.

---
## [](https://neo4j.com/graphgists/graphing-our-way-through-the-icij-offshore-jurisdiction-data/#_introduction)Introduction

In 2013 the [International Consortium of Investigative Journalism](http://www.icij.org/) (ICIJ) released a subset of the leaked dataset on offshore jurisdictions to the public. This dataset contains ownership information about companies created in 10 offshore jurisdictions including the British Virgin Islands, the Cook Islands and Singapore. It covers nearly 30 years until 2010.

The [publicly released dataset](http://offshoreleaks.icij.org/about/caveats) is a small part of a cache of 2.5 million leaked offshore files that ICIJ analysed. Even so, it still contains around 250k nodes, 500k edges and 1.2 million properties. This size and relational nature of the complex, international networks between offshore entities make it an excellent match for graph databases such as Neo4j.

This GraphGist explores a very small subset of this public dataset and demonstrate how this data can be modeled, queried, and displayed.

## [](https://neo4j.com/graphgists/graphing-our-way-through-the-icij-offshore-jurisdiction-data/#_simplified_data_model)Simplified Data Model

The simplified ICIJ data model consists of three node types: `Entity` nodes, `Location` nodes and `Jurisdiction` nodes, which are linked by seven relationship types.

![p5icHev](http://i.imgur.com/p5icHev.png)

Figure 1. The Simplified Data Model

An `Entity` can be a natural person, organization, or juridical entity and is related to other entities, either as a _OFFICER_ of the other entity, a _CLIENT_ of the other entity or as a related entity (e.g. two daughter companies). Both the _OFFICER_ and the _CLIENT_ relationships have subtypes indicated with a "type"-property on the edge, e.g. "Shareholder", "Beneficial Owner", etc. and can have a "start" and "end"-property indicating the duration of the relationship.

``Entity`s are related to a geographical `Location`` through a `LOCATED`\-relationship, based on a non-normalized address string. This `Location` can have a bi-directional `COLLOCATED`\-relationship with another `Location`, indicating that while the address-string is not the same, the geographical location is. For instance: two entities may be in the same building, but use different postal addresses.

Each location is `PARTOF` a `Jurisdiction`, which can be a country, or a somewhat independent subnational territorial unit that is `PARTOF` a larger jurisdiction/country. Making this distinction in the datamodel is highly relevant, given the structure of offshore networks. The most popular jurisdictions are neither well-established, large jurisdictions such as countries, nor small and possibly unstable independent territories, but those in between: semi-independent territories that have a certain degree of juridical and fiscal autonomy. Examples of such territories include British Crown dependencies such as [Jersey](http://en.wikipedia.org/wiki/Jersey) or [Guernsey](http://en.wikipedia.org/wiki/Guernsey).

Apart from their geographical location, \`Entity\`s are related to a jurisdiction through a _INJURD_\-relationship ("in jurisdiction"), indicating that they have a tax obligation to this jurisdiction.
