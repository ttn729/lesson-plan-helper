import { Button } from "@mui/material";

interface WordButtonProps {
    word: string;
    lineIndex: number;
    wordIndex: number;
    updateWord: (lineIndex: number, wordIndex: number, newWord: string) => void;
    codingStyle: string;
    tagPosition: string;
  }
  
export const WordButton: React.FC<WordButtonProps> = ({ word, lineIndex, wordIndex, updateWord, codingStyle, tagPosition }) => {
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