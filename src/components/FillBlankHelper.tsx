import React, { useState } from "react";
import { Button, Grid2, TextField } from "@mui/material";

interface WordButtonProps {
  word: string;
  lineIndex: number;
  wordIndex: number;
  handleToggle: (lineIndex: number, wordIndex: number) => void;
}

const WordButton: React.FC<WordButtonProps> = ({
  word,
  lineIndex,
  wordIndex,
  handleToggle,
}) => (
  <Button
    onClick={() => handleToggle(lineIndex, wordIndex)}
    style={{ marginRight: "5px" }}
    variant="outlined"
    size="small"
  >
    {word}
  </Button>
);

const FillBlankHelper: React.FC = () => {
  const [text, setText] = useState("");
  const [selectedWords, setSelectedWords] = useState<{ word: string; index: number }[]>([]);

  const handleToggle = (lineIndex: number, wordIndex: number) => {
    const lines = text.split("\n");
    const words = lines[lineIndex].split(" ");
    const originalWord = words[wordIndex];

    const isPlaceholder = words[wordIndex] === "<?>";

    words[wordIndex] = isPlaceholder ? selectedWords.find(w => w.index === lineIndex * 1000 + wordIndex)?.word ?? originalWord : "<?>";
    lines[lineIndex] = words.join(" ");
    
    setText(lines.join("\n"));

    setSelectedWords(prevSelectedWords => {
      const newSelectedWords = isPlaceholder
        ? prevSelectedWords.filter(w => w.index !== lineIndex * 1000 + wordIndex)
        : [...prevSelectedWords, { word: originalWord, index: lineIndex * 1000 + wordIndex }];
      
      // Sort selected words by index
      return newSelectedWords.sort((a, b) => a.index - b.index);
    });
  };

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={6}>
        <TextField
          multiline
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </Grid2>
      <Grid2 size={6}>
        {text.split("\n").map((line, lineIndex) => (
          <div key={lineIndex}>
            {line.split(" ").map((word, wordIndex) => (
              <WordButton
                key={wordIndex}
                word={word}
                lineIndex={lineIndex}
                wordIndex={wordIndex}
                handleToggle={handleToggle}
              />
            ))}
          </div>
        ))}
        <div>
          {selectedWords.map((selectedWord, index) => (
            <div key={index}>{selectedWord.word}</div>
          ))}
        </div>
      </Grid2>
    </Grid2>
  );
};

export default FillBlankHelper;
