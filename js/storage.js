/* Save data in the browser */
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

/* Get saved data from the browser */
function getData(name) {
    var data = localStorage.getItem(name);

    if (data) {
        return JSON.parse(data);
    }

    return [];
}