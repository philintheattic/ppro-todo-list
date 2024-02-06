# To Do list Panel for Adobe Premiere Pro
A simple to-do-list as a CEP extension panel for Adobe Premiere Pro

## Installation
1. Enable the debug mode in your host application so that Adobe doesn't prevent unsigned extension from loading. See [here](https://blog.developer.adobe.com/debugging-your-adobe-panel-cf73f00f6961) for more details on how to do this. 
2. Download the repository as a zip file
3. Go to the Adobe CEP extensions folder:
    - Mac: */Library/Application Support/Adobe/CEP/extensions*
    - Win: *C:\Program Files\Common Files\Adobe\CEP\extensions*
4. Extract the contents of the zip file to the extensions folder.

## Usage
It's a to-do list that uses localstorage to save the state even if you restart the application. I just needed a simple way to keep track of my editing notes without always changing back and forth between different apps or emails. When I found out that CEP panels are basically HTML websites I figured I could code this myself. Maybe this comes in handy to some.

