---
title: "Pick an export format before you click the table"
description: "When to save a captured web table as Excel, CSV, JSON, Markdown, PNG, or a clipboard paste, and how to avoid sending the wrong file to the next step."
category: "Software"
tags: ["xlsx", "csv", "json", "chrome", "export"]
author: "Security Tech Team"
coverImage: "https://picsum.photos/seed/xlsx-csv-json-from-a-browser-table/1200/675"
pubDate: "2026-08-30"
relatedPosts: []
---

# Pick an export format before you click the table

I used to hit CSV for everything because it felt neutral. Then I sent a CSV to a finance manager who opened it in Excel and lost leading zeros on account codes. Then I sent an XLSX to a script that expected UTF-8 text. Then I pasted a "clean" table into a document and spent ten minutes fighting column widths that should have been a Markdown block.

The capture is the same. The destination is not. Choose the format first and the rest of the session gets shorter.

## A map I actually use

| Destination | Format I pick | Why |
| --- | --- | --- |
| A person in Excel | XLSX | They double-click and start filtering |
| A script or import | CSV | Boring rows, quoted fields |
| A small program I control | JSON | Objects, not a grid |
| A note or changelog | Markdown | Reads as a table in text |
| A slide | PNG | Nobody should calculate from a screenshot, but they will look at it |
| A printout | PDF | When the table has to travel as a page |
| A sheet that is already open | Clipboard | Paste, then stop |

HTML export is the odd one. I use it when I need a clean `<table>` to drop into an internal page and I do not want the original site's classes.

## XLSX is for humans and for leading zeros

Excel will still try to be clever. Account codes like `000441` become `441` if the column is typed as a number. If I care about those zeros, I check the column in Table Studio and keep it as text, or I prefix a note in the header (`account_code_text`).

XLSX is still the right default for anyone who will not open a text editor. I do not send them CSV and a lecture.

## CSV is a contract

I want a header row, stable names, and quoted fields when a product name contains a comma.

I peek at the first lines:

```csv
sku,name,net_gbp
BR-220,"Clamp, stainless",4.80
BR-441,Washer,0.12
```

If I see `Clamp, stainless` without quotes, I recapture or I fix the name. An unquoted comma splits the row and every later column slides.

I save CSV as UTF-8. Excel on Windows may still ask about encoding. That is an Excel problem. I do not switch the whole team to a different format because of one import wizard.

## JSON when the table was always objects

A comparison page with nested "features" is a bad rectangle. If the extractor gives me a reasonable row-per-item structure, JSON is easier to loop over than CSV with twenty empty cells.

I do not use JSON for finance. They will ask what program opens it.

## Markdown is for writing, not for analysis

Six to fifteen rows. Then it belongs in a note. Bigger than that, people stop reading and you should have sent a file.

I scan the Markdown for pipes inside cell text. They break the table. I replace them in the editor before export.

## PNG and PDF are messages, not datasets

I generate a PNG when the table has to appear in a deck and the audience will not get a workbook. I keep the source XLSX in the same folder so I can answer the inevitable "can you add a column" without OCR.

PDF export of a captured table is useful when someone needs a printable grid that is not the original branded page. It is not a substitute for the XLSX.

## Clipboard and Google Sheets

Copy, open Sheets, paste. I do this more than I download. The repair still happens first. Pasting a dirty table into a shared sheet is how dirty tables become institutional.

If I need Sheets and I want a dedicated paste target, I open a blank spreadsheet first. I do not paste into a dashboard tab.

## One extension, many exits

[**Table Capture Chrome**](https://tablecapture.co/) currently exports Excel, CSV, JSON, HTML, clipboard, Markdown, PNG, and PDF. You can copy TSV as well if you are pasting into a tool that prefers tabs.

I do not need every format every week. I need the list so I stop forcing CSV into jobs that hate CSV.

Planned destinations like Notion or Airtable are not a reason to wait. If I needed those today I would export CSV and import there. The local file is enough.

## A short decision I make out loud

Before I click the table I say the destination. "This is for Maya in finance, so XLSX." "This is for the import job, so CSV." "This is for the note, so Markdown."

It sounds theatrical. It prevents the `data.csv` that later becomes `data.xlsx` that later becomes `data_final.xlsx` with no memory of why the first file existed.

Pick the exit. Then capture. Then repair only as much as that exit requires. A PNG needs readable headers. A CSV needs honest types. They are not the same job.

## Encoding, locales, and the silent Excel import

A CSV that looks perfect in Notepad can still open wrong in Excel. The usual causes are a BOM that Excel wanted and did not get, or a delimiter that Excel treated as a decimal.

I keep a test row with a pound amount and a date in British order. After someone else opens the file, I ask them what they see in that row. If `30/08/2026` became the first of an invalid month, the locale guessed US. I then send XLSX or I send ISO dates.

JSON sidesteps some of this because the consumer is code. It introduces another problem: numbers that should stay strings. SKUs with leading zeros belong in quotes. I check the first object before I call the file done.

```json
{"sku": "000441", "net_gbp": 4.8, "name": "Clamp, stainless"}
```

If `sku` is a number, the zeros are already gone. That is not an export format problem. That is a type problem I should have fixed in the editor.

## Two files when the audience is mixed

If finance and a script both need the table, I export twice. I do not give finance the CSV and I do not give the script the XLSX with a cover sheet. Two files cost ten seconds. One file costs a conversation.

I keep the same header names in both so a later join is possible. I do not "pretty" the XLSX headers (`Net price (GBP)`) while the CSV says `net_gbp` unless I enjoy maintaining a dictionary.

## When I refuse PNG

If someone asks for a PNG of a 40-row table, I send XLSX and a cropped PNG of the first twelve rows. A 40-row image in a slide is not readable and it will still be used as a source of numbers. That is how transcription errors enter a deck.

PDF of a captured table is for a print pack. I put the date in the filename and I keep the XLSX beside it.

## A failed CSV I still think about

I exported a product table with a column `notes`. One note contained a newline. The CSV was valid. A fragile importer split that row. The next SKU landed in the notes field. Totals were poetry.

I now look at `notes` in the editor and flatten newlines to spaces when I know the consumer is fragile. A strict importer would have been better. I do not control every importer.

Format choice is not taste. It is matching the next program's assumptions so you do not spend Thursday explaining why column C moved.