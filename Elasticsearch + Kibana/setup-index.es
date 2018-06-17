PUT /mlrpp
{
    "mappings": {
        "log": {
            "properties": {
                "Scored Labels": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "Scored Probabilities": {
                    "type": "long"
                },
                "humidity": {
                    "type": "long"
                },
                "temperature": {
                    "type": "long"
                },
                "timestamp": {
                    "type": "date",
                    "format": "basic_date_time_no_millis"
                }
            }
        }
    }
}
