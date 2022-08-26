export const isMobile = ():boolean => {
  const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobi|Windows CE|Symbian|Windows Phone|POLARIS|lgtelecom|nokia|SonyEricsson|LG|SAMSUNG|Samsung/i
  let flag = navigator.userAgent.match(regex)
  if (flag === null) {
    return false
  } else {
    return true
  }
}