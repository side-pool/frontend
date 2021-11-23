import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import Typography from '@src/components/common/Typography';

import MiddleArea from './MiddleArea';

import styles from './SideCard.module.scss';
import LabelTag from '@src/components/common/LabelTag';
import { Side } from '@src/models';
import { useHistory } from 'react-router-dom';

const PRIMARY_PICK = ['primary1', 'primary2', 'primary3', 'primary4'];

export type SideCardProps = Side;

const SideCard = ({
  active,
  category,
  logoUrl,
  recruiting,
  summary,
  title,
  id,
}: SideCardProps) => {
  const history = useHistory();
  const pickNumber = useMemo(() => Math.floor(Math.random() * 4), []);
  const [imageUrl, setImageUrl] = useState(logoUrl);

  return (
    <div
      className={styles.SideCard}
      onClick={() => history.push(`/side/${id}`)}
      aria-hidden
    >
      <div
        className={cn(
          styles.sideCardTopArea,
          !imageUrl && styles.isPadding,
          !imageUrl && PRIMARY_PICK[pickNumber],
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            onError={() => setImageUrl('')}
            loading="lazy"
          />
        ) : (
          <Typography fontSize="xhl" textColor="white">
            {summary.slice(0, 100)}
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
          {summary.slice(0, 100)}
        </Typography>
      </div>
    </div>
  );
};

export default SideCard;
