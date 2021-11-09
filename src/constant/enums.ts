export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum GuideText {
  FILL_ALL_FORM = '값을 모두 입력해주세요',
  FILL_A_FORM = '값을 입력해주세요',
  FILL_CORRECT_URL = '정확한 리포지토리 URL을 입력해주세요',
  ERROR = '에러가 발생했습니다',
  DELETE_SUCCESS = '삭제를 성공했습니다',
}

export enum ConfirmText {
  DELETE = '지우시겠습니까?',
  UPDATE = '수정하시겠습니까?',
}

export enum UserTab {
  COMMENT,
  SIMILAR_SERVICE,
}
