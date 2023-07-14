class JSONReader {
    constructor(filePath) {
        this.filePath = filePath;
    }
  
    readJSON() {
      return fetch(`file://${this.filePath}`)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
}

const jsonReader = new JSONReader('/translocdata/stops.json');

jsonReader.readJSON()
    .then(data => { 
        console.log(data);
});