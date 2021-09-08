if(!localStorage.getItem('file-explorer'))
{
    localStorage.setItem('file-explorer','newFile');
    localStorage.setItem('newFile','start typing you notes here')
}

function isIn(element, array) {
    for(var i=0; i<array.length; i++) {
        if(element == array[i]) return true;
    }

    return false;
}

function saveFile() {
    localStorage.setItem(document.getElementsByClassName('file-name')[0].value, document.getElementsByClassName('file-input')[0].value)

    var savedFiles = localStorage.getItem('file-explorer');
    savedFiles = savedFiles.split(',')
    if(!isIn(document.getElementsByClassName('file-name')[0].value, savedFiles))
    {
        savedFiles = localStorage.getItem('file-explorer');
        savedFiles += ','+document.getElementsByClassName('file-name')[0].value;
        localStorage.setItem('file-explorer', savedFiles);
    }
    readFilesToExplorer();
}

function loadFile(filename) {
    document.getElementsByClassName('file-name')[0].value = filename;
    document.getElementsByClassName('file-input')[0].value = localStorage.getItem(filename);
    document.getElementsByClassName('file')[0].style.display = 'inherit';
    document.getElementsByClassName('file-explorer')[0].style.display = 'none';
}

function newFile() {
    document.getElementsByClassName('file-name')[0].value = 'newfile';
    document.getElementsByClassName('file-input')[0].value = 'Start typing your notes here';
}

function closeFile() {
    document.getElementsByClassName('file')[0].style.display = 'none';
    document.getElementsByClassName('file-explorer')[0].style.display = 'inherit';
}

function readFilesToExplorer() {
    var savedFiles = localStorage.getItem('file-explorer');
    savedFiles = savedFiles.split(',');
    while(document.getElementsByClassName('file-thumb').length>0){
        document.getElementsByClassName('file-thumb')[0].remove();
    }
    for(var i=0; i<savedFiles.length; i++) {
        var filethumb = document.createElement('div');
        filethumb.className = 'file-thumb';
        filethumb.innerHTML = `<button onclick="loadFile('`+savedFiles[i]+`')"><i class="glyphicon glyphicon-file"></i><div class="explorer-file-name">`+savedFiles[i]+`</div></button>`;
        document.getElementsByClassName('file-thumb-container')[0].appendChild(filethumb);
    }
}

function deleteFile() {
    var filename = document.getElementsByClassName('file-name')[0].value;
    console.log(filename);
    var savedFiles = localStorage.getItem('file-explorer');
    savedFiles = savedFiles.split(',');
    console.log(savedFiles)
    for(var i=0; i<savedFiles.length; i++){
        if(savedFiles[i] == filename){
            if(savedFiles[i] !='newFile') localStorage.removeItem(savedFiles[i])
            while(i<savedFiles.length-1){
                savedFiles[i] = savedFiles[i+1];
                i++;
            }
        }
    }
    savedFiles.pop();
    if(savedFiles.length == 0) savedFiles.push('newFile');
    closeFile();
    savedFiles = savedFiles.toString();
    console.log(savedFiles);
    savedFiles = savedFiles.replace(/ /g, ',');
    console.log(savedFiles)
    localStorage.setItem('file-explorer', savedFiles);
    readFilesToExplorer();
}
