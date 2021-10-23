import { useState } from 'react';

const useModalControl = (initialState = false) => {
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(initialState);

  const showModal = (message?: string) => {
    message && setModalMessage(message);
    setIsModalVisible(true);
  };

  const hideModal = () => setIsModalVisible(false);

  return { isModalVisible, modalMessage, showModal, hideModal };
};

export default useModalControl;
