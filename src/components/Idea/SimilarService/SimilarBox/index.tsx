import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import styles from './SimilarBox.module.scss';
import { Similar, SimilarState } from '@src/models';
import ArrowIcon from '@src/assets/Arrow.svg';
import Author from '@src/components/common/Author';
import Typography from '@src/components/common/Typography';
import { getDiffTime } from '@src/utils/common';
import Button from '@src/components/common/Button';
import Input from '@src/components/common/Input';

interface SimilarBoxProps {
  // 서버에서 패치받은 데이터
  similar: Similar;
  isMine: boolean;
  // UI 조작을 위한 데이터
  isEditing: boolean;
  editTarget: SimilarState;
  setEditTarget: Dispatch<SetStateAction<SimilarState>>;
  // 버튼 이벤트 핸들러
  clickUpdateBtn?: () => void;
  clickDeleteBtn?: () => void;
  clickCancelUpdateBtn?: () => void;
  clickCompleteUpdateBtn?: () => void;
}

const SimilarBox = ({
  similar,
  isMine,
  isEditing,
  editTarget,
  setEditTarget,
  clickUpdateBtn,
  clickDeleteBtn,
  clickCancelUpdateBtn,
  clickCompleteUpdateBtn,
}: SimilarBoxProps) => {
  return (
    <div className={cn(styles.SimilarBox)}>
      <div className={styles.topArea}>
        <div className={styles.topLeftArea}>
          <Author nickname={similar.author.nickname} />
          <Typography textColor="gray" fontSize="xxs">
            {getDiffTime({
              newDate: new Date(),
              oldDate: new Date(similar.updatedDate),
            })}
          </Typography>
        </div>
        <div className={styles.topRightArea}>
          {isMine && (
            <>
              <div className={styles.updownBorder} />
              {isEditing ? (
                <>
                  <Button
                    labelText="수정완료"
                    variant="text"
                    onClick={clickCompleteUpdateBtn}
                  />
                  <Button
                    labelText="수정취소"
                    variant="text"
                    onClick={clickCancelUpdateBtn}
                  />
                </>
              ) : (
                <>
                  <Button
                    labelText="수정"
                    variant="text"
                    onClick={clickUpdateBtn}
                  />
                  <Button
                    labelText="삭제"
                    variant="text"
                    onClick={clickDeleteBtn}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.bottomArea}>
        {isEditing ? (
          <>
            <div className={styles.similarInput}>
              <Input
                maxWidth
                placeholder="https://"
                value={editTarget.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditTarget({
                    ...editTarget,
                    url: e.target?.value,
                  })
                }
              />
              <hr />
              <Input
                maxWidth
                placeholder=""
                value={editTarget.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditTarget({
                    ...editTarget,
                    description: e.target?.value,
                  })
                }
              />
            </div>
          </>
        ) : (
          <>
            <div className={styles.urlContainer}>
              <ArrowIcon />
              <Typography fontSize="xs">
                <a href={similar.url}>비슷한 서비스 바로가기</a>
              </Typography>
            </div>
            <Typography fontSize="xs">{similar.description}</Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default SimilarBox;
