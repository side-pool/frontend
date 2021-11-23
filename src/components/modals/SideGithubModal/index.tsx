import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './SideGithubModal.module.scss';
import Card from '@src/components/common/Card';
import { convertPortal } from '@src/utils/portalUtils';
import Overlay from '@src/components/common/Overlay';
import ModalTop from '@src/components/modals/ModalTop';
import ModalBottom from '@src/components/modals/ModalBottom';
import Input, { ParentRef } from '@src/components/common/Input';
import { GuideText } from '@src/constant/enums';
import { useHistory } from 'react-router-dom';
import { setInitSide, useAppDispatch } from '@src/store';
import {
  useIsExistRepository,
  useReadGithubInfo,
} from '@src/hooks/useGithubQuery';

export interface SideGithubModalProps {
  hideModal: () => void;
  showAlert: (title: string) => void;
  className?: string;
}

const Template = ({
  hideModal,
  showAlert,
  className,
}: SideGithubModalProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [url, setUrl] = useState('');
  const urlRef = useRef({} as ParentRef);

  const { isError, data } = useReadGithubInfo(url);
  const { data: isExist, isLoading } = useIsExistRepository(data?.id || 0);

  useEffect(() => {
    if (data && !isLoading) {
      if (isExist?.duplicated) return showAlert(GuideText.DUPLICATE_SIDE);

      dispatch(setInitSide());
      history.push({
        pathname: '/side/create',
        state: data,
      });
    }
  }, [data, isExist]);

  useEffect(() => {
    if (isError) {
      showAlert(GuideText.FILL_CORRECT_URL);
      setUrl('');
    }
  }, [isError]);

  const handleConfirm = () => {
    const path = urlRef.current.get() || '';

    if (!path.includes('https://github.com')) {
      showAlert(GuideText.FILL_CORRECT_URL);
      return;
    }

    setUrl(path.replace('https://github.com/', ''));
  };

  return (
    <div
      className={cn(styles.SideGithubModal, className)}
      data-testid="modal"
      aria-hidden="true"
    >
      <Overlay onClick={hideModal} />
      <Card className={styles.alertCard}>
        <ModalTop title="깃헙 불러오기" />
        <div className={styles.content}>
          GitHub URL을 입력해주세요
          <Input placeholder="https://" ref={urlRef} />
        </div>
        <ModalBottom handleConfirm={handleConfirm} />
      </Card>
    </div>
  );
};

const SideGithubModal = ({ ...props }: SideGithubModalProps) =>
  convertPortal(<Template {...props} />);

export default SideGithubModal;
