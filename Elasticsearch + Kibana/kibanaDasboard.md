# This is the guide to setup kibana dashboard  
> We recieved all data from kafka pipeline to elastic search now how to use that data for awesome visualisation.
  
  ### Make a index pattern (mlr**)
> Management > index patterns > create new > mlr**

## Dashboard

#### Tempreture
> Visualisation tab > Metric > select pattern > Data > metric > Aggreagtion - Top Hit > Field - Tempreture > Average > size 1 > Sort on - Timestamp > Order - Descending > Custom label - Tempreture

#### Humidity
> Visualisation tab > Metric > select pattern > Data > metric > Aggreagtion - Top Hit > Field - Humdity > Average > size 1 > Sort on - Timestamp > Order - Descending > Custom label - Humidity

#### Will it rain ?
>Visualisation tab > Metric > select pattern > Data > metric > Aggreagtion - Top Hit > Field - Scored Labels.keyword > Average > size 1 > Sort on - Timestamp > Order - Descending > Custom label - Will it rain

#### Tempreture Variation