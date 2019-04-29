# Nori Architecture Diagrams

### About

This repository uses [mermaid](https://mermaidjs.github.io/demos.html) and [plant uml](http://plantuml.com/class-diagram) to assist in the ideation and creation of architecture architecture artifacts (such as sequence diagrams, UML, flow charts, gantt charts, etc)

- Generated diagrams can be found [here (PNGs)](https://github.com/nori-dot-eco/nori-architecture/tree/master/diagrams)
- Diagrams input specifications can be found [here (Mermaid format)](https://github.com/nori-dot-eco/nori-architecture/tree/master/mermaid) and [here (PlantUML format)](https://github.com/nori-dot-eco/nori-architecture/tree/master/plantuml)

## Mermaid

Mermaid is best used for sequence diagrams and flow charts

### Create a new diagram

Write the diagram in the `mermaid/` folder. An example sequence diagram can be written like the following

```
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```

### Preview the Diagram

In VSCode, you can use [mermaid preview](https://github.com/vstirbu/vscode-mermaid-preview) to review the diagram changes in real-time

Or [do it live here](https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbkFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuQiAtLT4gQ3tMZXQgbWUgdGhpbmt9XG5DIC0tPnxPbmV8IERbTGFwdG9wXVxuQyAtLT58VHdvfCBFW2lQaG9uZV1cbkMgLS0-fFRocmVlfCBGW2ZhOmZhLWNhciBDYXJdXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

### Create the diagram image

```bash
yarn run generate
```

This will out put the diagram into the `diagrams/` folder.

## PlantUML

PlantUML is best used for UML and relation diagrams

### Create a new diagram

See [here](http://plantuml.com/sitemap-language-specification) for language specification

### Preview the diagram

You can use [vscode-plantuml](https://github.com/qjebbs/vscode-plantuml) to review the diagram changes in real-time

Or [do it live here](https://www.planttext.com/)

### Create the diagram image

You do this the same way described in the Mermaid section
