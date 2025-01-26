import { Button, Grid2, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [multilineString, setMultilineString] = useState<string>('');
  const [codingStyle, setCodingStyle] = useState<string>('<++>');

  const SECONDARY_COLOR = 'blue'
  const PRIMARY_COLOR = 'green'

  const createButtons = (multilineString: string) => {
    const lines = multilineString.split('\n');
    
    return lines.map((line, index) => {
      const words = line.split(' ');

      return (
        <div key={index} style={{ marginBottom: '10px' }}>
          {words.map((word: string, wordIndex: number) => (
            <WordButton
              key={wordIndex} 
              word={word} 
              lineIndex={index} 
              wordIndex={wordIndex} 
              updateWord={updateWord} 
              codingStyle={codingStyle}
            />
          ))}
        </div>
      );
    });
  };

  const updateWord = (lineIndex: number, wordIndex: number, newWord: string) => {
    const lines = multilineString.split('\n');

    const words = lines[lineIndex].split(' ');
    words[wordIndex] = newWord;
    lines[lineIndex] = words.join(' ');

    setMultilineString(lines.join('\n'));
  };

  return (
    <>

    <Typography variant='h3' textAlign='center' mb='20px'>Lesson Plan Helper</Typography>

    <Grid2 container spacing={3}>
      

    <Grid2 size={6}>
      <TextField 
        multiline 
        rows={30} 
        value={multilineString}
        onChange={(e) => setMultilineString(e.target.value)} 
        style={{ marginBottom: '20px' }}
        fullWidth

      />
      <Grid2
        container
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        style={{ marginBottom: '20px' }}
      >
        <Button
          variant="contained"
          onClick={() => setCodingStyle('<++>')}
          style={
            codingStyle === '<++>'
              ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
              : { backgroundColor: SECONDARY_COLOR, color: 'white' }
          }
        >
          +word+
        </Button>
        <Button
          variant="contained"
          onClick={() => setCodingStyle('<-->')}
          style={
            codingStyle === '<-->'
            ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
            : { backgroundColor: SECONDARY_COLOR, color: 'white' }
          }
        >
          -word-
        </Button>
        <Button
          variant="contained"
          onClick={() => setCodingStyle('<!!>')}
          style={
            codingStyle === '<!!>'
            ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
            : { backgroundColor: SECONDARY_COLOR, color: 'white' }
          }
        >
          !word!
        </Button>
      </Grid2>

      </Grid2>


      <Grid2 size={6}>
      {createButtons(multilineString)}

      </Grid2>

      </Grid2>

    </>
  );
};

interface WordButtonProps {
  word: string;
  lineIndex: number;
  wordIndex: number;
  updateWord: (lineIndex: number, wordIndex: number, newWord: string) => void;
  codingStyle: string;
}

const WordButton: React.FC<WordButtonProps> = ({ word, lineIndex, wordIndex, updateWord, codingStyle }) => {
  const [wordValue, setWordValue] = useState(word);

  const handleClick = () => {
    const punctuationMatch = wordValue.match(/[.,!?:;]$/);
    const punctuation = punctuationMatch ? punctuationMatch[0] : '';
    let cleanWord = punctuation ? wordValue.slice(0, -1) : wordValue;

    const startTag = codingStyle.slice(0, 2);
    const endTag = codingStyle.slice(2);

    if (cleanWord.startsWith(startTag) && cleanWord.endsWith(endTag)) {
      cleanWord = cleanWord.slice(2, -2); // Remove coding tags
    } else {
      cleanWord = `${startTag}${cleanWord}${endTag}`;
    }

    const newWord = `${cleanWord}${punctuation}`;
    setWordValue(newWord);
    updateWord(lineIndex, wordIndex, newWord);
  };

  return (
    <button onClick={handleClick} style={{ marginRight: '5px' }}>
      {wordValue}
    </button>
  );
};

export default App;
