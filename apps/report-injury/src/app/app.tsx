import { useState } from 'react';
import axios from 'axios';
import { environment } from '../environments/environment';

async function callGPTAPI(prompt: string): Promise<string> {
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const response = await axios.post(
    endpoint,
    {
      model: 'gpt-3.5-turbo',
      temperature: 1,
      max_tokens: 100,
      messages: [{ role: 'user', content: `format as json: ${prompt}` }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.chatGptApiKey}`,
      },
    }
  );

  return response.data;
}

interface InjuryReport {
  employeeInfo: {
    // Employee information fields
  };
  employerInfo: {
    // Employer information fields
  };
  incidentDetails: {
    // Incident details fields
  };
  injuryInfo: {
    // Injury information fields
  };
  witnesses: {
    // Witness information fields
  };
  supervisorInfo: {
    // Supervisor information fields
  };
  otherRelevantInfo: {
    // Other relevant information fields
  };
}

export function App() {
  // const [injuryReport, setInjuryReport] = useState<InjuryReport>({
  //   // Initialize the fields with empty values or appropriate defaults
  // });

  const [injuryReport, setInjuryReport] = useState<any>(null);

  // const [text, setText] = useState<string>('Steve Jones was injured on 10/10/2021 at 10:00 AM. He was working on the assembly line when he slipped and fell. He was taken to the hospital by ambulance.');
  // const [text, setText] = useState<string>('Steve Jones, 123 main st Indianapolis, Indiana 46202, 317-555-5555, 10/10/2021, 10:00 AM, assembly line, slipped and fell, ambulance');
  const [text, setText] = useState<string>('Steve Jones, 123 main st Indianapolis, Indiana 46202, 317-555-5555');

  async function handleUserInput(input: string, category: keyof InjuryReport) {
    const gptResponse = (await callGPTAPI(input)) as any;
    // Process the gptResponse and extract the relevant information
    // ...
    // console.log('!!!', gptResponse.choices[0].message.content);

    setInjuryReport(gptResponse.choices[0].message.content);

    // Update the injury report object with the new information
    // setInjuryReport((prevState) => ({
    //   ...prevState,
    //   [category]: {
    //     // Update the fields with the new information
    //   },
    // }));
  }

  // convert the text to a js object
  console.log('!!!', injuryReport, typeof injuryReport, JSON.parse(injuryReport));
  const injuryReportObj = JSON.parse(injuryReport);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUserInput(text, 'employeeInfo');
        }}
      >
        <textarea rows={10} onChange={(e) => setText(e.target.value)} value={text} />
        <button type="submit">Submit</button>
      </form>
      {injuryReportObj &&
        <>
          <input type="text" readOnly value={injuryReportObj.name} />
          <input type="text" readOnly value={injuryReportObj.address} />
          <input type="text" readOnly value={injuryReportObj.phone} />
        </>
      }
      {/* {injuryReport} */}
    </div>
  );
}

export default App;
