import { Button, Grid2, TextField } from '@mui/material';
import React, { useState } from 'react';
import { WordButton } from './WordButton';

const AnnotationHelper: React.FC = () => {
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



export default AnnotationHelper;
