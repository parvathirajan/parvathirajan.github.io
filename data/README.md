# Parvathirajan's Vault content

Create one folder per topic inside this directory. The folder name becomes the
topic title on the website.

```text
data/
└── Cloud Architecture/
    ├── architecture-notes.pdf
    ├── reference-diagram.png
    └── links.txt
```

Every non-`.txt` file inside a topic folder becomes a downloadable resource.
Put one `http://` or `https://` URL per line in any `.txt` file. Blank lines and
invalid URLs are ignored. Multiple text files and nested resource folders are
supported.

Commit and push the new folder to publish it during the next deployment.
