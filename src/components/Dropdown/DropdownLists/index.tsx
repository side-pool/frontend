import React, { HTMLAttributes } from 'react';

import Typography from '@src/components/common/Typography';
import styles from './DropdownLists.module.scss';
import { DropdownEach } from '@src/components/Dropdown';

export interface DropdownListsProps extends HTMLAttributes<HTMLInputElement> {
  dropdwonLists: DropdownEach[];
}

const DropdownLists = ({ dropdwonLists, ...props }: DropdownListsProps) => {
  return (
    <div className={styles.DropdownLists}>
      {dropdwonLists.length === 0 ? (
        <div className={styles.eachList}>
          <div className={styles.checkboxContainer}>
            <Typography fontSize="xs" lineHeight="wide">
              선택할 목록이 없습니다.
            </Typography>
          </div>
        </div>
      ) : (
        dropdwonLists?.map(({ name, checked, id }) => (
          <div key={id} className={styles.eachList}>
            <label className={styles.checkboxContainer}>
              <Typography fontSize="xs" lineHeight="wide">
                {name}
              </Typography>
              <>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={checked}
                  id={String(id)}
                  {...props}
                />
                <span className={styles.checkmark} />
              </>
            </label>
          </div>
        ))
      )}
    </div>
  );
};

export default DropdownLists;
