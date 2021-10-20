import { httpStatusCode } from '@src/constant/enums';
import { AxiosError } from 'axios';

/**
 *
 * 일반적인 에러들에 대한 문구를 제공한다
 * @param error
 * @returns {string}
 */
export const getErrorText = (error: AxiosError<unknown>) => {
  const NOT_FOUND_TEXT = '페이지를 찾을 수 없습니다 😅';
  const REST_ERROR_TEXT = '알 수 없는 오류가 발생했습니다 😭';

  switch (error.response?.status) {
    case httpStatusCode.NOT_FOUND:
      return NOT_FOUND_TEXT;
    case httpStatusCode.BAD_REQUEST:
    case httpStatusCode.UNAUTHORIZED:
    default:
      return REST_ERROR_TEXT;
  }
};

export const isValidPasswd = (passwd: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  return re.test(passwd);
};
