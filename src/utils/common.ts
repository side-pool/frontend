import { HttpStatusCode } from '@src/constant/enums';
import { AxiosError } from 'axios';

/**
 *
 * 일반적인 에러들에 대한 문구를 제공한다
 * @param error
 * @returns {string}
 */
export const getErrorText = (error: AxiosError<unknown>) => {
  const NOT_FOUND_TEXT = '페이지를 찾을 수 없습니다 😅';
  const UNAUTHORIZED_TEXT =
    '인증 오류가 발생했습니다. 다시 로그인 해주세요. 😭';
  const REST_ERROR_TEXT = '알 수 없는 오류가 발생했습니다 😭';

  switch (error.response?.status) {
    case HttpStatusCode.NOT_FOUND:
      return NOT_FOUND_TEXT;
    case HttpStatusCode.UNAUTHORIZED:
      return UNAUTHORIZED_TEXT;
    case HttpStatusCode.BAD_REQUEST:
    default:
      return REST_ERROR_TEXT;
  }
};

export const isValidPasswd = (passwd: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  return re.test(passwd);
};

interface GetDiffTimeProps {
  newDate: Date;
  oldDate: Date;
}

const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MON = DAY * 30;
const YEAR = DAY * 365;

export const getDiffTime = ({ newDate, oldDate }: GetDiffTimeProps) => {
  const diff = newDate.getTime() - oldDate.getTime();

  if (diff <= SEC) {
    // 1초보다 차이가 적다면
    return `방금 전`;
  }
  if (diff < MIN) {
    return `${Math.round(diff / SEC)} 초 전`; // 1분보다 차이가 적다면 초 반환
  }
  if (diff < HOUR) {
    return `${Math.round(diff / MIN)} 분 전`; // 1시간 보다 차이가 적다면 분 반환
  }
  if (diff < DAY) {
    return `${Math.round(diff / HOUR)} 시간 전`; // 1시간 보다 차이가 적다면 분 반환
  }
  if (diff < WEEK) {
    return `${Math.round(diff / DAY)} 일 전`; // 일
  }
  if (diff < MON) {
    return `${Math.round(diff / WEEK)} 주 전`; // 주
  }
  if (diff < YEAR) {
    return `${Math.round(diff / MON)} 달 전`; // 월
  }
  return `${Math.round(diff / YEAR)} 년 전`; // 년
};

interface getActiveTimeProps {
  active: string;
}

export const getActiveTime = ({ active }: getActiveTimeProps): string => {
  const activeTime = new Date(active);
  const currentTime = new Date();

  const diff = currentTime.getTime() - activeTime.getTime();

  if (diff < WEEK) {
    return 'oneWeek';
  }
  if (diff < MON) {
    return 'oneMonth';
  }
  if (diff < MON * 6) {
    return 'sixMonth';
  }
  return 'rest';
};
