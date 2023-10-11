import { BorderClear } from '@mui/icons-material'
import { Container, Grid, Typography, Box, Slider } from '@mui/material'
import React from 'react'
import image from "../image/ana.png"
import { useState } from 'react'


export const Discription = (props) => {
     
  // decode base64 to image
  const [slide , setSlide] = useState(1);

  return (
    <div>
      <Container >
          <Box display={"flex"}
               marginTop={"2px"}
               padding={"auto"}
               maxHeight={"330px"}
               sx={{
                  border:"1px solid",
                  marginBottom:"10px",
                  position:"relative",
                  }}  >
              <Grid item xs={12} sm={6} width={"80%"} padding={"15px 0 15px 0"}>

                  <img 
                  // image center
                  style={{position:"absolute",top:"50%",left:"20%",transform:"translate(-50%,-50%)",}}
                  className="h-full" src={`data:image/png;base64,${props.image[slide-1]}`}  alt="frame ${slide}" />
              </Grid>
              <Grid item xs={12} sm={6}
              sx={{backgroundColor:"whitesmoke",
                   width:"80%",
          }} >
      
          <Typography  sx={{
                  width:"190px",
                  margin:"15px 0 0 10px",
                  fontSize:"20px",
                  textAlign:"center",
                  color:"#ffffff",
                  backgroundColor:"#22d3ee",
                  borderRadius:"15px",
                  padding:"8px 2px",}}
             >frame {slide}</Typography>
                  <Box height={"70%"} overflow={"auto"} padding={"10px"} marginTop={"15px"} >
                      <Typography sx={{padding:"0 15px 0 15px",position:"relative",}}>These conditions include coronary artery disease, heart failure, arrhythmias, and congenital heart defects. Symptoms of heart disease can vary depending on the specific condition, but may include chest pain or discomfort, shortness of breath, fatigue, and swelling in the legs or abdomen. Risk factors for heart disease include high blood pressure, high cholesterol, smoking, diabetes, obesity, and a family history of the condition. Treatment options for heart disease may include lifestyle changes, medications, and surgery. It is important to seek medical attention if you experience any symptoms of heart disease or have any concerns about your heart health.</Typography>
                  </Box>
      
              </Grid>
              </Box >
      </Container>
      <Slider
      // overflow={"auto"}
      style={{overflow:"none"}}
                  aria-label="Temperature"
                  defaultValue={1}
                 
                  step={1}
                  marks
                  min={1}
                  max={props.len}
                  onChange={(e) => setSlide(e.target.value)}
                />
    </div>
  )
}
