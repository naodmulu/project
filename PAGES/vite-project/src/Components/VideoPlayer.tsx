import React, { useState, useRef } from "react";
import { Container, Grid, Slider, Button, Paper } from "@mui/material";
import { useEffect } from "react";

function VideoPlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = [useRef(null), useRef(null)];
  const [videoUrl, setVideoUrl] = useState('');
  
  const fetchVideo = async () => {
    try {
      const response = await fetch('http://localhost:5000/upload');
      const blob = await response.blob();
      setVideoUrl(URL.createObjectURL(blob));
      console.log("success");
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // load video
  useEffect(() => {
    fetchVideo();
  }, []);

  const videoUrls = [videoUrl, videoUrl];
  // Handle play/pause for both videos
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    videoRefs.forEach((ref) => {
      if (ref.current) {
        isPlaying ? ref.current.pause() : ref.current.play();
      }
    });
  };

  // Handle seek change
  const handleSeekChange = (e, newValue) => {
    setCurrentTime(newValue);
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.currentTime = newValue;
        if (isPlaying) {
          ref.current.play();
        }
      }
    });
  };

  // Handle video end (loop)
  const handleVideoEnd = () => {
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.currentTime = 0;
        ref.current.play();
      }
    });
  };

  // Calculate the maximum duration based on the first video (assuming all videos have the same duration)
  const maxDuration = videoRefs[0].current?.duration || 0;

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {videoUrls.map((url, index) => (
          <Grid item xs={6} key={index}>
            <Paper elevation={3}>
              <video
                ref={videoRefs[index]}
                src={url}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onTimeUpdate={() => setCurrentTime(videoRefs[0].current.currentTime)}
                onEnded={handleVideoEnd} // Call the handleVideoEnd function when the video ends
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center" display={"flex"} flexDirection={"column"} item>
        <Grid item width={"100%"}  >
          <Slider
            value={currentTime}
            onChange={handleSeekChange}
            min={0}
            max={maxDuration}
            step={0.1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => value.toFixed(1)}
          />
        </Grid>
        <Grid width={"30%"} >
          <Button variant="contained"  onClick={handlePlayPause} fullWidth>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VideoPlayer;
