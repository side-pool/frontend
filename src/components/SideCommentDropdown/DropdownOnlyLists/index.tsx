import React from 'react';

import Typography from '@src/components/common/Typography';
import styles from './DropdownOnlyLists.module.scss';
import { setSide, useAppDispatch } from '@src/store';

export interface DropdownOnlyListsProps {
  dropdwonLists: string[];
  setDropdownHide: () => void;
}

const DropdownOnlyLists = ({
  dropdwonLists,
  setDropdownHide,
}: DropdownOnlyListsProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.DropdownOnlyLists}>
      {dropdwonLists?.length === 0 ? (
        <div className={styles.eachList}>
          <div className={styles.checkboxContainer}>
            <Typography fontSize="xs" lineHeight="wide">
              선택할 목록이 없습니다.
            </Typography>
          </div>
        </div>
      ) : (
        dropdwonLists?.map((each, index) => (
          <div
            key={each}
            className={styles.eachList}
            data-index={index}
            onClick={() => {
              dispatch(setSide({ commentTag: index }));
              setDropdownHide();
            }}
            aria-hidden
          >
            <label className={styles.checkboxContainer}>
              <Typography fontSize="xs" lineHeight="wide">
                {each}
              </Typography>
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default DropdownOnlyLists;
