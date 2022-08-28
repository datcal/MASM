const { ipcRenderer } = require('electron');
var loadAudioFile = document.getElementById('loadAudioFile');


const fs = require("fs");

//upon clicking upload file, request the file from the main process
loadAudioFile.addEventListener('click', () => {
  ipcRenderer.send('file-request');
});

//upon receiving a file, process accordingly
ipcRenderer.on('file', (event, file) => {
  console.log('obtained file from main process: ' + file);
    /*fs.copyFile(file, './save/file1.wav', (err) => {
        if (err) throw err;
        alert("File Uploaded");
        document.location.href = "play.html";
    }
    );*/
    alert("File selected");
    document.location.href = "play.html";
    localStorage.audioFile = JSON.stringify(
        {
            file: file
        }
    );
});




/*
saveAnnotationOLD.addEventListener('click', (event) => {
    // Resolves to a Promise<Object>
    dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '/save/annotation.json'),
        // defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Save',
        // Restricting the user to only Text Files.
        filters: [
            {
                name: 'Text Files',
                extensions: ['json', 'txt']
            }, ],
        properties: []
    }).then(file => {
        // Stating whether dialog operation was cancelled or not.
        console.log(file.canceled);
        if (!file.canceled) {
            console.log(file.filePath.toString());
              
            // Creating and Writing to the sample.txt file
            fs.writeFile(file.filePath.toString(), 
                         'This is a Sample File', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }).catch(err => {
        console.log(err)
    });
});*/