# LAMPS

More about LAMPS [can be found here](https://alm.engr.colostate.edu/cb/item/13580)

## Example usage

[Preview the kmz (as a geojson) that was used here](./input/map.geojson)

### Using curl

```bash
curl -X POST -H "Accept:application/json" "http://csip.engr.colostate.edu:8087/csip-lamps/m/lamps/1.0" -F param=@input/req.json  -F file1=@input/map.kmz
```

The above outputs the following response

```
{
    "metainfo": {
        "keep_workspace": true,
        "attachments": "req.json, map.kmz",
        "status": "Finished",
        "suid": "0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c",
        "cloud_node": "10.39.128.15",
        "request_ip": "208.54.4.138",
        "service_url": "http://csip.engr.colostate.edu:8087/csip-lamps/m/lamps/1.0",
        "tstamp": "2019-04-29 16:35:07",
        "cpu_time": 449784,
        "expiration_date": "2019-04-29 16:46:37"
    },
    "parameter": [
        {
            "name": "geometry",
            "description": "geometry / polygon information file; .shp / .kmz / .kml / .geojson (required)",
            "value": "map.kmz"
        },
        {
            "name": "delta",
            "description": "delta factor to adjust the possible crop rotation order in the matching list (optional)",
            "min": "0.0",
            "max": "0.9",
            "value": "0.15"
        },
        {
            "name": "start_year",
            "description": "to generate an user-selected time period with the matching crop rotation; Start Year (optional)",
            "min": "2000",
            "max": "2100",
            "value": "2000"
        },
        {
            "name": "end_year",
            "description": "to generate an user-selected time period with the matching crop rotation; End Year (optional)",
            "min": "2001",
            "max": "2101",
            "value": "2014"
        },
        {
            "name": "ages_files",
            "description": "AgES-W input file generation (optional)",
            "min": "FALSE",
            "max": "TRUE",
            "value": "TRUE"
        }
    ],
    "result": [
        {
            "name": "application time",
            "value": " 449.0 s"
        },
        {
            "name": "hrus_rot.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/hrus_rot.csv"
        },
        {
            "name": "AOI_NASS_dominant_crop.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_dominant_crop.csv",
            "description": "output file1"
        },
        {
            "name": "management.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/management.csv"
        },
        {
            "name": "croprotation.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/croprotation.csv"
        },
        {
            "name": "AOI_NASS_LMOD_generic.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_LMOD_generic.csv",
            "description": "output file3"
        },
        {
            "name": "AOI_NASS_plain.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_plain.csv",
            "description": "output file4"
        },
        {
            "name": "AOI_LAMPS_conf.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_LAMPS_conf.csv",
            "description": "output file5"
        },
        {
            "name": "till.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/till.csv"
        },
        {
            "name": "kmztokml.kml",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/kmztokml.kml"
        },
        {
            "name": "map.kmz",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/map.kmz"
        },
        {
            "name": "AOI_NASS_dominant_crop.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_dominant_crop.csv",
            "description": "output file1"
        },
        {
            "name": "AOI_NASS_LMOD_generic.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_LMOD_generic.csv",
            "description": "output file3"
        },
        {
            "name": "AOI_NASS_plain.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_NASS_plain.csv",
            "description": "output file4"
        },
        {
            "name": "AOI_LAMPS_conf.csv",
            "value": "http://csip.engr.colostate.edu:8087/csip-lamps/q/0a2bae40-6acf-11e9-a8f4-b3b08a7ab34c/AOI_LAMPS_conf.csv",
            "description": "output file5"
        }
    ]
}
```

#### Output

[Output files](./output) are accessed using the URLs specified in "value" fields. Files seem to only be accessible for a few minutes.
