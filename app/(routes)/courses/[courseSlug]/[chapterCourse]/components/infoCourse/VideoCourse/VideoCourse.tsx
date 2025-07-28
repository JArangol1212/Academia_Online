import { videoUrlProps } from "./VideoCourse.types";

export function VideoCourse(props:videoUrlProps){

      const {videoUrl} = props

      return (
            
            <video src={videoUrl} controls className="w-full rounded-md shadow-md">

            </video>
      )
}