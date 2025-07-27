import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PasswdParserApp() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const parseText = () => {
    const lines = inputText.split('\n');
    const result = [];

    for (let line of lines) {
      if (line.startsWith('#')) continue;
      const fields = line.split(':');
      if (fields.length >= 3) {
        result.push({ user: fields[0], uid: fields[2] });
      }
    }

    setParsedData(result);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-6">
      <h1 className="text-4xl mb-2 border-b border-green-500 pb-2 font-bold text-center md:text-left">Parse It!</h1>
      <p className="text-green-300 mb-4 text-sm md:text-base">
        Paste your <code>/etc/passwd</code>-style data below (colon-separated lines).
        We'll extract the username and UID from each valid line and display it below.
        Lines starting with <code>#</code> or malformed ones are ignored.
      </p>

      <Textarea
        className="w-full bg-zinc-900 text-green-300 border border-green-600 mb-4 p-3"
        rows={10}
        placeholder="e.g.\nroot:x:0:0:root:/root:/bin/bash\nuser1:x:1001:1001::/home/user1:/bin/bash"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="mb-6">
        <Button
          className="bg-green-600 hover:bg-green-400 text-black font-bold py-2 px-4 rounded"
          onClick={parseText}
        >
          Parse
        </Button>
      </div>

      <Card className="bg-zinc-800 border border-green-600 overflow-x-auto">
        <CardContent className="p-4">
          <pre className="whitespace-pre-wrap">
            {parsedData.length > 0
              ? parsedData.map((item, index) => `${item.user}\t${item.uid}`).join('\n')
              : 'Parsed output will appear here.'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
