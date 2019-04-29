# WIP - do not reference

# Proxy Baselines

## What?

An exploration and requirements estimation around the idea of generating "proxy" baselines for a supplier.

## Why?

Currently, data collection for filling in the supplier intake data sheet is time consuming and difficult. We need a way to automatically populate as much of this data as possible.

## How?

There are several projects which allow us to query for cropland data in a particular region. Using some combination of these resources should allow us to feed in geographic information (i.e., geojson, kmz, etc) and output common land use practices for that geographic location. This information won't always be perfect, but it should allow us to:

- at minimum: generate recommendations for various intake sheet fields (i.e irrigation, tillage, crop name)
- at maximum: generate an entire intake sheet via some combination of the following:
  - verbatim crop data
  - data translations (i.e. translating crop names to acceptable proxy crop names that can be used in COMET's API)
  - data transformations (i.e. the combination of data from multiple data sources)

## What does a finished version look like?

A working proxy baseline generator would be able to accept geographic input, and output one or more of the following:

- a completed data intake sheet for a supplier
- a completed COMET farm output (i.e. on the CRC Estimation tab)
- Recommendations for various crop inputs either in the sheet or in the UI elsewhere

## Technical Pre-reqs

- GeoJSON to KMZ converter
