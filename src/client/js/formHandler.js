import { checkForName } from './nameChecker';

const result = document.getElementById('results-section');

function handleSubmit(event) {
        event.preventDefault()
        console.log("clicked");
        const input = document.getElementById('url').value;
        console.log(input);
        
        if(checkForName(input)){
            alert("Please enter a valid URL")
        }
        else
         {  
            result.innerHTML = `<p class="loadingText">We are analyzing...patience is the key<p>
                                    <div class="loader"></div>`;
            const data ={ input:input};
            postData('/api', data)
            .then( async function(data){
                console.log(`url in then is ${data.url}`)
                const response = await fetch(data.url);
                const output = await response.json();
                console.log(output);
                  result.innerHTML =  `<strong>Analysis..</strong>
                      <table id="table">
                          <tr>
                            <th class="table-header">Attribute</th>
                            <th class="table-header">Value</th>
                          </tr>
                          <tr>
                            <td>Subjectivity</td>
                            <td class="output">${output.subjectivity}</td>
                          </tr>
                          <tr>
                            <td>Agreement</td>
                            <td class="output">${output.agreement}</td>
                          </tr>
                          <tr>
                              <td>Confidence</td>
                              <td class="output">${output.confidence}</td>
                            </tr>
                        </table>`
            });
         }
}
export { handleSubmit }

async function postData( url = '', data = {}){
     
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
        try{
            const newData = await response.json();
            console.log("inside post")
            console.log(newData)
            return newData;
        }
        catch(err){
            console.log("error occured", err);
        }
    }