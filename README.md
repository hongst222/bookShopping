### 1 ) Express

``` shell
yarn add axios body-parser cookie-parser cors dayjs dotenv express express-session express-useragent method-override multer node-schedule node-thumbnail nodemailer serve-favicon serve-static winston winston-daily-rotate-file mysql2 mybatis-mapper express-mysql-session 
```

### 2 ) React.js

``` shell
yarn add react-router-dom react-helmet-async sass styled-reset styled-components styled-components-breakpoints dayjs classnames lodash axios react-loader-spinner axios-hooks react-redux @reduxjs/toolkit redux-devtools-extension chart.js react-chartjs-2 react-intersection-observer react-modal
```

### 3) proxy 설정
``` shell
yarn add http-proxy-middleware
```

### 4) 로그인 관련
``` shell
    jwt 토큰 방식을 사용하였다.
    
    jwt 토큰 accessToken, refreshToken 두가지를 발급받음
    그리고 accessToken이 만료될 때 axios.interceptor을 사용하여 refreshToken을 이용하여 accessToken을 재발급함.
    
```