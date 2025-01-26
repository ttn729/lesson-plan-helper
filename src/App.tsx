import { Button, Grid2, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [multilineString, setMultilineString] = useState<string>('');
  const [codingStyle, setCodingStyle] = useState<string>('<++>');
  const [tagPosition, setTagPosition] = useState<string>('full');

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
              tagPosition={tagPosition}
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
              onClick={() => setTagPosition('full')}
              style={
                tagPosition === 'full'
                  ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
                  : { backgroundColor: SECONDARY_COLOR, color: 'white' }
              }
            >
              Full
            </Button>
            <Button
              variant="contained"
              onClick={() => setTagPosition('front')}
              style={
                tagPosition === 'front'
                  ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
                  : { backgroundColor: SECONDARY_COLOR, color: 'white' }
              }
            >
              Front
            </Button>
            <Button
              variant="contained"
              onClick={() => setTagPosition('back')}
              style={
                tagPosition === 'back'
                  ? { backgroundColor: PRIMARY_COLOR, color: 'white' }
                  : { backgroundColor: SECONDARY_COLOR, color: 'white' }
              }
            >
              Back
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
  tagPosition: string;
}

const WordButton: React.FC<WordButtonProps> = ({ word, lineIndex, wordIndex, updateWord, codingStyle, tagPosition }) => {
  const handleClick = () => {
    const punctuationMatch = word.match(/[.,!?:;]$/);
    const punctuation = punctuationMatch ? punctuationMatch[0] : '';
    let cleanWord = punctuation ? word.slice(0, -1) : word;

    const startTag = codingStyle.slice(0, 2);
    const endTag = codingStyle.slice(2);

    switch(tagPosition) {
      case 'full':
        if (cleanWord.startsWith(startTag) && cleanWord.endsWith(endTag)) {
          cleanWord = cleanWord.slice(2, -2); // Remove coding tags
        } else {
          cleanWord = `${startTag}${cleanWord}${endTag}`;
        }
        break;
      case 'front':
        if (cleanWord.startsWith(startTag)) {
          cleanWord = cleanWord.slice(2);
        } else {
          cleanWord = `${startTag}${cleanWord}`;
        }
        break;
      case 'back':
        if (cleanWord.endsWith(endTag)) {
          cleanWord = cleanWord.slice(0, -2);
        } else {
          cleanWord = `${cleanWord}${endTag}`;
        }
        break;
      default:
        break;
    }

    const newWord = `${cleanWord}${punctuation}`;
    updateWord(lineIndex, wordIndex, newWord);
  };

  return (
    <Button onClick={handleClick} style={{ marginRight: '5px' }} variant='outlined' size='small'>
      {word}
    </Button>
  );
};

export default App;
