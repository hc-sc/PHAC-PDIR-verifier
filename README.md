# Getting Started

Note: A deep dive into this code for developers can be found at https://shutdownhook.com/2023/09/09/anatomy-of-a-smart-health-card-link-viewer/

The shc-web-reader is a create-react-app web application that can run standalone or
as a provider-launched SMART-on-FHIR application. The reader scans SMART Health Card (SHC) QR
Codes sourced from barcode scanners, copy/paste, connected cameras or by
searching a patient record for scanned documents (e.g., an insurance card
scan). Data from the SHC are displayed in a structured way and can be easily
copied to complete structured input forms.

Clone the repo and use `npm install` to cache dependencies.

If the reader it suggests to do a `npm audit fix` or `npm audit fix --force` after caching dependencies, doing  `npm audit fix` is recommended. 

Run the app in development mode using `HTTPS=true npm start`. HTTPS is required
to use important features including the camera and card validation.

Build a static version of the app using `npm run build`. The resulting files in
`build` can be served by any web server; no dynamic server-side capability is
required. Copying it up to Azure Blob Storage with the command `azcopy
sync ./build STORAGE_URL --recursive` is an option.

# Usage

To use the app standalone, just enter the URL into a browser. To embed in an electronic health record (EHR)
(e.g., the [SMART Launcher](https://launch.smarthealthit.org/)), use the launch
URL https://HOST:PORT/launch.html?client=CLIENTID . Any CLIENTID can be used
with the launcher (of course this won't be the case with a real EHR). The app
expects to be connected to an R4 FHIR interface.

Navigate with the tabs at the top of the interface:

## ABOUT 

The SMART Health Card (SHC) viewer is an open source application, developed and maintained by The Commons Project, that can be used as a standalone or embedded within an Electronic Health Record (EHR) to read data from a SMART Health Card and/or Links.  
 
Health Canada has created a Canadian-specific version of the viewer that can be hosted on provincial / territorial systems and used in conjunction with the digital immunization record. This viewer provides both a user-friendly viewer for individuals and health care professionals, and an Application Programming Interface (API) for organizations to read and validate immunization records securely and efficiently. 

## SCAN CARD

This tab sets the default focus to the input box. A barcode scanner can be used to
acquire an shc:/ or shlink:/ string from a QR code, or it can just be pasted in which is
handy for testing purposes. Most scanners can be configured to send a newline
character at the end of a scan; if this is seen the form will be submitted
automatically. Alternatively, click the "Read Code" button to initiate a
parse. Some very simple/naive rules are used to enable/disable the button
(basically the input text starts with shc:/ or contains shlink:/).

## TAKE PHOTO

In standalone mode, the browser will ask for camera access and display a preview
window directly in frame. Because this is disallowed by browser policy when
embedded in an EHR iframe, in that mode an "Open Camera" button is shown that
opens a small popup with for the camera. When a QR code is detected, it is sent
automatically to the [Card Details](#about) tab.

NOTE: During development testing, least when I was last doing this stuff, Epic hosted apps inside an IE
Control for which window.open did not work normally. Instead Epic provided a
snippet of javascrpit that could do this. This is tracked in [github issue
#7](https://github.com/the-commons-project/shc-web-reader/issues/7).

## SEARCH RECORD

This tab appears only if the app is embedded in an EHR. When selected it
initiates a search in the in-context patient record for
[DocumentReference](https://hl7.org/fhir/documentreference.html) resources that
may contain SHC QR Codes.

The code in
[listDocs.js](https://github.com/the-commons-project/shc-web-reader/blob/main/src/lib/listDocs.js)
is authoritative for the rules used to filter and prioritize documents. The code looks for PDF or image files, using metadata if available to prioritize or
exclude documents in descending order by upload date.

As soon as a shc:/ or shlink:/ QR code is found it is sent to [Card
Details](#card-details). If the search fails, a "Search Again" button is
displayed.

## CARD DETAILS

This tab appears only once an shc:/ or shlink:/ string has been captured by one of the other
tabs. It decodes and verifies the string using
[smart-health-card-decoder](https://github.com/smart-on-fhir/smart-health-card-decoder)
and displays the resulting data (or an error).


# Implementation Notes

The [OptionalFhir](https://github.com/the-commons-project/shc-web-reader/blob/main/src/OptionalFhir.js) component at the top level of the React hierarchy provides global access to an authenticated [fhirclient](http://docs.smarthealthit.org/client-js/) (or `undefined` in standalone mode). When the SMART launch sequence is started through launch.html, control ultimately returns back to index.js with OAuth parameters on the query string; the presence of `code` is used to identify this situation. As noted in the code, this approach is derived heavily from [react-fhirclient](https://github.com/zeevo/react-fhirclient). 

Controls and styling use [Google Material UI](https://mui.com/material-ui/getting-started/overview/). 

[App.js](https://github.com/the-commons-project/shc-web-reader/blob/main/src/App.js) handles navigation and routes discovered shc:/ and shlink:/ strings from capture tabs to [Card Details](#card-details). 

Information to help keep the component files clear re: FHIR and SHC can be found under the [src/lib](https://github.com/the-commons-project/shc-web-reader/tree/main/src/lib) directory.

# To Deploy
The Github action creates a release based on the specified tag.

This can be accomplished by using the following commands. Note that this should be executed from the main fork, from the commit that you would like to push.

```
git tag v0.4.4-dev2
```
