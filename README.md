# Nori Architecture Diagrams

### About

This repository uses [mermaid](https://mermaidjs.github.io/demos.html) to assist in the ideation and creation of architecture architecture artifacts (such as sequence diagrams, UML, flow charts, gantt charts, etc)

## Create a new diagram

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

## Preview the Diagram

In VSCode, you can use [mermaid preview](https://github.com/vstirbu/vscode-mermaid-preview) to [review the diagram changes in real-time

## Create the diagram image

```bash
npm run generate
```

This will out put the diagram into the `diagrams/` folder.
