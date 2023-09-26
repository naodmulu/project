# import cv2
import cv2
import numpy as np

class AI():
    
    def segment_video(self, video_path):
        
        # Load the video
        video = cv2.VideoCapture(video_path) 
        # Get the frames per second
        fps = video.get(cv2.CAP_PROP_FPS)
        
        # write a caption to the video
        caption = 'Segmented Video'
        
        # Get the width and height of the video
        width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        # Define the codec and create VideoWriter object
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out_buffer = cv2.VideoWriter_fourcc('M','J','P','G')
        out = cv2.VideoWriter(out_buffer, fourcc, fps, (width, height))
        
        # Read until video is completed
        while(video.isOpened()):
            # Capture frame-by-frame
            ret, frame = video.read()
            if ret == True:
                # Display the resulting frame
                font_scale = 0.4  # Adjust this value for smaller font size
                cv2.putText(frame, caption, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), 1)  # Adjust font scale and thickness
                
                # Add frame to video buffer
                out.write(frame)
        
                # Press Q on keyboard to exit
                if cv2.waitKey(25) & 0xFF == ord('q'):
                    break
        
            # Break the loop
            else:
                break
            
        # When everything done, release the video capture object
        video.release()
        out.release()
        
        return out_buffer
    

if __name__ == '__main__':
    ai_instance = AI()
    output_buffer = ai_instance.segment_video("uploads\0X1A0A263B22CCD966.mp4")
