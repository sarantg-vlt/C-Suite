export const findFileType = (file) => {
  if (file.type?.startsWith("video/")) return "video";
  if (file.type === "application/pdf") return "pdf";
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type === "application/vnd.ms-powerpoint"
  )
    return "ppt";
};

export const convertToUTC = (timeLimit) => {
  let hours = 0;
  let minutes = timeLimit / 60;
  if (minutes > 60) hours = Math.round(minutes / 60);
  minutes = minutes - hours * 60;
  return { hours: hours, minutes: minutes };
};

// export const convertToCourseFormData = (courseData)=>{
//   const formData = new FormData()
//   formData.append('image',courseData?.thumbnail)
//   formData.append('title',courseData?.title)
//   formData.append('description',courseData?.description)
//   formData.append('price',JSON.stringify(courseData?.price))
//   formData.append('overviewPoints',JSON.stringify(courseData?.overviewPoints))
//   formData.append('lessons',JSON.stringify(courseData?.lessons))
//   return formData
// }


export const convertToCourseFormData = (courseData) => {
  const formData = new FormData();
  formData.append("image", courseData?.thumbnail);
  formData.append("title", courseData?.title);
  formData.append("description", courseData?.description);
  formData.append("price", JSON.stringify(courseData?.price));
  formData.append("overviewPoints", JSON.stringify(courseData?.overviewPoints));
  formData.append("whatYouGet", JSON.stringify(courseData?.whatYouGet));
  formData.append("whoIsThisFor", JSON.stringify(courseData?.whoIsThisFor));
  formData.append("lessons", JSON.stringify(courseData?.lessons));
  return formData;
};





export const hasNullField = (obj) => {
  for (const key in obj) {
    if (obj[key] === null) {
      return true;
    }
  }
  return false;
};