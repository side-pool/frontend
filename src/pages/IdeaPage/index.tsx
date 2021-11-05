import React from 'react';
import styles from './IdeaPage.module.scss';
import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';
import useModalControl from '@src/hooks/useModalControl';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';
import IdeaCardContainer from '@src/components/Idea/IdeaCardContainer';
import { useAuth } from '@src/hooks/useUserQuery';

const IdeaPage = () => {
  const { data: isAuth } = useAuth();

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
    <div className={styles.IdeaPage}>
      <IdeaCardContainer />
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
      />
      {isAuth && (
        <>
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
        </>
      )}
    </div>
  );
};

export default IdeaPage;
