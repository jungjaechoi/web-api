export const secretKey = 'KounoSofT' // 원하는 시크릿 키
export const   option = {
    'algorithm' : "HS256", // 해싱 알고리즘
    'expiresIn' : "30m",  // 토큰 유효 기간 => 30분 지나면 토큰 만료됨. 로그인 다시 해야함
    'issuer' : "issuer", // 발행자
    'master' : "a@naver.com" // 관리자 계정 => 아직 구현 안됨.
}
