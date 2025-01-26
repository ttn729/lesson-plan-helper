import { Typography } from "@mui/material";
import React, { useState } from "react";
import AnnotationHelper from "./components/AnnotationHelper";
import FillBlankHelper from "./components/FillBlankHelper";

const App: React.FC = () => {
  const [useAnnotation, setUseAnnotation] = useState(true);

  return (
    <>
      <Typography variant="h3" textAlign="center" mb="20px">
        Lesson Plan Helper
      </Typography>

      <button onClick={() => {setUseAnnotation(!useAnnotation); console.log('useAnnotation', useAnnotation)}}>
        {useAnnotation ? "Use Fill Blank" : "Use Annotation"}
      </button>

      {useAnnotation ? <AnnotationHelper /> : <FillBlankHelper />}
    </>
  );
};

export default App;
