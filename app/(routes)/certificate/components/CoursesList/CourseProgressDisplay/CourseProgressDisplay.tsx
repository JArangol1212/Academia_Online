import { Progress } from "@radix-ui/react-progress";
import { CourseProgressDisplayProps } from "./CourseProgressDisplay.types";
import { DownloadCertificate } from "./DownloadCertificate";

export function CourseProgressDisplay(props: CourseProgressDisplayProps) {
  const { progress, titleCourse, userName } = props;
  

  const showProgress = true;
  
  return (
          showProgress ? (

            <DownloadCertificate titleCourse={titleCourse} userName={userName}/>
          ):(
            <>
            <Progress value={progress} className="[&>*]:bg-violet-300"/>
            <p className="text-xs">{progress} % Completado</p>
            
            </>
          )
  );
}