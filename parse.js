class Transcript {
  constructor(id, name, scores) {
    this.id = id;
    this.name = name;
    this.chinese = scores.chinese;
    this.english = scores.english;
    this.math = scores.math;
    this.social = scores.social;
    this.science = scores.science;
  }
}

// read JSON and handle data
let rawData
fetch('./raw_data.json')
    .then((response) =>  response.json())
    .then((json) => {
      rawData = json
      allTranscripts = new Object();

      Object.keys(rawData).forEach(student => {
        let name = student;
        let id = rawData[student].id;
        let scoreList = new Object();
        Object.values(rawData[student].transcript).forEach(value => {
          scoreList[value.subject] = parseInt(value.score);
        })
        
        let transcript = new Transcript(id, name, scoreList);
        allTranscripts[id] = transcript;
      });

      // order by id
      allTranscripts = Object.keys(allTranscripts).sort().reduce(
        (obj, key) => { 
          obj[key] = allTranscripts[key]; 
          return obj;
        }, 
        {}
      );

      // build .csv
      csvContent = "id, name, chinese, english, math, social, science\n"
      Object.values(allTranscripts).forEach( transcript => {
        csvContent += `${transcript.id}, ${transcript.name}, ${transcript.chinese}, ${transcript.english}, ${transcript.math}, ${transcript.social}, ${transcript.science}\n`
      })

      let fileName = 'clean_data.csv';

      let link = document.createElement('a');
      link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
      link.setAttribute('download', fileName);
      link.click();
    });


