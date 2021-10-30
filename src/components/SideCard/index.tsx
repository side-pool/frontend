import React from 'react';
import cn from 'classnames';
import Typography from '@src/components/common/Typography';

import MiddleArea from './MiddleArea';

import styles from './SideCard.module.scss';
import LabelTag from '@src/components/common/LabelTag';
import { Side } from '@src/models';

const PRIMARY_PICK = ['primary1', 'primary2', 'primary3', 'primary4'];

export type SideCardProps = Side;

const SideCard = ({
  active,
  category,
  logoUrl,
  recruiting,
  summary,
  title,
}: SideCardProps) => {
  return (
    <div className={styles.SideCard}>
      <div
        className={cn(
          styles.topArea,
          !logoUrl && styles.isPadding,
          PRIMARY_PICK[Math.floor(Math.random() * 4)],
        )}
      >
        {logoUrl ? (
          <img src={logoUrl} alt={title} />
        ) : (
          <Typography fontSize="xhl" textColor="white">
            {summary}
          </Typography>
        )}
      </div>
      <MiddleArea title={title} active={active} />
      <div className={styles.bottomArea}>
        <div className={styles.tagContainer}>
          <Typography
            className={styles.ellipse}
            fontSize="xs"
            textColor="blueActive"
          >
            {category.join(' • ')}
          </Typography>
          {recruiting && (
            <LabelTag wrapperColor="white" textColor="green">
              팀원모집중
            </LabelTag>
          )}
        </div>
        <Typography fontSize="xs" textColor="black" lineHeight="wider">
          {summary}
        </Typography>
      </div>
    </div>
  );
};

export default SideCard;
