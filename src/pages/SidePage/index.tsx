import React from 'react';

import styles from './SidePage.module.scss';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';

import useModalControl from '@src/hooks/useModalControl';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';

import SideList from '@src/components/SideList';

const SidePage = () => {
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  return (
    <div className={styles.SidePage}>
      <SideList />
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
      />
      <Button
        className={styles.createSideButton}
        onClick={() => showIdeaForm()}
        variant="floating"
        iconName="add"
      />
      {isIdeaFormVisible && (
        <IdeaFormModal
          hideIdeaForm={hideIdeaForm}
          showAlert={showAlert}
          isCreate
        />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </div>
  );
};

export default SidePage;
